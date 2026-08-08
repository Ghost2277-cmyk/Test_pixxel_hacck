import { create } from 'zustand';
import type { InventoryItem } from '@/lib/db';

interface Mission {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  coinReward: number;
  completed: boolean;
  type: 'air' | 'water' | 'ocean' | 'forest' | 'pulse' | 'biodiversity';
}

interface EarthState {
  // Global unified health (0 to 1) for legacy / simple calculations
  health: number; 
  
  // The 5 Independent Indicators (0 to 1)
  planetPulse: number;
  forestVitality: number;
  oceanHealth: number;
  airQuality: number;
  biodiversity: number;

  // Gamification stats
  xp: number;
  level: string;
  greenCoins: number;
  gems: number;
  streak: number;
  petStatus: string;
  islandLevel: number;
  lifeTreeLevel: number;
  lastClaimDate: string | null;
  inventory: InventoryItem[];
  
  // Missions
  dailyMissions: Mission[];
  
  // Game Home & Gaia State
  theme: 'nature-light' | 'forest-night';
  energy: number;
  currentEvent: string | null;
  gaiaEmotion: 'idle' | 'happy' | 'sleeping' | 'celebrating' | 'surprised' | 'concerned';
  gaiaMessage: string | null;

  // Setters
  setHealth: (health: number) => void;
  syncProfile: (profile: any) => void;
  updateFromAnswers: (answers: Record<string, string>) => void;
  completeMission: (id: string, uid?: string) => Promise<void>;
  addNotification: (message: string) => void;
  toggleTheme: () => void;
  claimDaily: (uid?: string) => Promise<boolean>;
  rewardTrigger: number; // Timestamp to trigger effects
  setGaiaState: (emotion: EarthState['gaiaEmotion'], message?: string | null) => void;
  triggerRandomEvent: (eventName: string) => void;
  
  // Inventory Methods
  grantItem: (item: Omit<InventoryItem, 'quantity' | 'isPlaced' | 'isEquipped'>, uid?: string) => Promise<void>;
  equipItem: (itemId: string, uid?: string) => Promise<void>;
  placeOnIsland: (itemId: string, uid?: string) => Promise<void>;
  
  rewardModalItem: InventoryItem | null;
  clearRewardModal: () => void;
  
  // UI State
  notifications: string[];

  // Game specific
  addXP: (xpToAdd: number, coinsToAdd: number, uid?: string) => Promise<void>;
}

const initialMissions: Mission[] = [
  { id: '1', title: 'Meatless Meal', description: 'Swap one meal for a 100% plant-based alternative.', xpReward: 50, coinReward: 10, completed: false, type: 'forest' },
  { id: '2', title: '5-Minute Shower', description: 'Cut your shower time to under 5 minutes.', xpReward: 30, coinReward: 5, completed: false, type: 'water' },
  { id: '3', title: 'Zero Single-Use Plastic', description: 'Use reusable alternatives all day.', xpReward: 100, coinReward: 20, completed: false, type: 'ocean' },
  { id: '4', title: 'Cycle to Work', description: 'Use a bicycle instead of a car today.', xpReward: 80, coinReward: 15, completed: false, type: 'air' },
];

function calculateLevel(xp: number): string {
  if (xp > 2000) return "Earth Legend";
  if (xp > 1300) return "Planet Protector";
  if (xp > 850) return "Forest Hero";
  if (xp > 500) return "Guardian";
  if (xp > 250) return "Eco Explorer";
  if (xp > 100) return "Sprout";
  return "Seed";
}

export const useEarthStore = create<EarthState>((set, get) => ({
  health: 0.2, // Overall
  planetPulse: 0.3,
  forestVitality: 0.2,
  oceanHealth: 0.2,
  airQuality: 0.1,
  biodiversity: 0.2,
  
  xp: 0,
  level: 'Seed',
  greenCoins: 0,
  gems: 10,
  streak: 0,
  petStatus: 'Happy',
  islandLevel: 1,
  lifeTreeLevel: 1,
  lastClaimDate: null,
  inventory: [],
  rewardModalItem: null,
  
  theme: 'nature-light',
  energy: 100,
  currentEvent: null,
  gaiaEmotion: 'idle',
  gaiaMessage: "Welcome back! The forest has been waiting for you.",
  rewardTrigger: 0,

  dailyMissions: initialMissions,
  notifications: [],
  
  setHealth: (health) => set({ health }),
  
  syncProfile: (profile) => set({
    xp: profile.xp || 0,
    level: profile.level || 'Seed',
    greenCoins: profile.coins || 0,
    streak: profile.streak || 0,
    lastClaimDate: profile.lastClaimDate || null,
    islandLevel: profile.islandLevel || 1,
    lifeTreeLevel: profile.lifeTreeLevel || 1,
    inventory: profile.inventory || [],
  }),

  clearRewardModal: () => set({ rewardModalItem: null }),

  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'nature-light' ? 'forest-night' : 'nature-light' 
  })),

  grantItem: async (item, uid) => {
    const state = get();
    const existingItem = state.inventory.find(i => i.id === item.id);
    let newInventory;

    if (existingItem) {
      newInventory = state.inventory.map(i => 
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      newInventory = [...state.inventory, { ...item, quantity: 1, isPlaced: false, isEquipped: false }];
    }

    if (uid) {
      const { updateUserProgress } = await import('@/lib/db');
      await updateUserProgress(uid, { inventory: newInventory });
    }

    set({ 
      inventory: newInventory,
      rewardModalItem: { ...item, quantity: existingItem ? existingItem.quantity + 1 : 1 }
    });
    get().addNotification(`Unlocked: ${item.name}!`);
  },

  equipItem: async (itemId, uid) => {
    const state = get();
    const newInventory = state.inventory.map(item => {
      // Unequip other items in the same category if it's an exclusive category like Pet or Avatar
      if (item.category === 'Pets') {
        if (item.id === itemId) return { ...item, isEquipped: true };
        return { ...item, isEquipped: false };
      }
      return item;
    });

    if (uid) {
      const { updateUserProgress } = await import('@/lib/db');
      await updateUserProgress(uid, { inventory: newInventory });
    }
    set({ inventory: newInventory });
  },

  placeOnIsland: async (itemId, uid) => {
    const state = get();
    const newInventory = state.inventory.map(item => {
      if (item.id === itemId) return { ...item, isPlaced: !item.isPlaced };
      return item;
    });

    if (uid) {
      const { updateUserProgress } = await import('@/lib/db');
      await updateUserProgress(uid, { inventory: newInventory });
    }
    set({ inventory: newInventory });
  },

  claimDaily: async (uid) => {
    const state = get();
    const today = new Date().toISOString().split('T')[0];
    
    if (state.lastClaimDate === today) {
      return false; // Already claimed today
    }
    
    // Check if streak is broken (more than 1 day diff)
    let newStreak = state.streak + 1;
    if (state.lastClaimDate) {
      const lastDate = new Date(state.lastClaimDate);
      const currentDate = new Date(today);
      const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      if (diffDays > 1) {
        newStreak = 1; // Streak broken
      }
    }

    const rewardCoins = 50 + (Math.min(newStreak, 7) * 25);
    const rewardXp = 50;

    const newXp = state.xp + rewardXp;
    const newCoins = state.greenCoins + rewardCoins;
    const newLevel = calculateLevel(newXp);

    // Save to DB if uid is provided
    if (uid) {
      const { updateUserProgress } = await import('@/lib/db');
      await updateUserProgress(uid, {
        streak: newStreak,
        coins: newCoins,
        xp: newXp,
        level: newLevel,
        lastClaimDate: today
      });
    }

    get().addNotification(`+${rewardXp} XP and ${rewardCoins} Coins for Daily Login!`);
    get().setGaiaState('happy', "Yay! You claimed your daily reward!");
    
    set({
      lastClaimDate: today,
      streak: newStreak,
      xp: newXp,
      greenCoins: newCoins,
      level: newLevel,
      rewardTrigger: Date.now()
    });

    // Random Drops or Milestones
    if (newStreak % 7 === 0) {
      // 7-day milestone drops a rare item
      get().grantItem({
        id: `rare-seed-${Date.now()}`,
        name: "Golden Oak Seed",
        category: "Seeds",
        rarity: "Epic",
        description: "A rare seed awarded for a 7-day streak!",
      }, uid);
    } else if (Math.random() > 0.7) {
      // 30% chance for a common drop
      get().grantItem({
        id: `common-water-${Date.now()}`,
        name: "Pure Water Drop",
        category: "Collectibles",
        rarity: "Common",
        description: "A drop of pure water found during your daily login.",
      }, uid);
    }
    
    return true;
  },

  setGaiaState: (emotion, message = null) => {
    set({ gaiaEmotion: emotion });
    if (message !== null) {
      set({ gaiaMessage: message });
      // Reset message after 5 seconds
      setTimeout(() => {
        set({ gaiaMessage: null });
      }, 5000);
    }
  },

  triggerRandomEvent: (eventName) => {
    set({ currentEvent: eventName });
    get().addNotification(`Random Event: ${eventName}!`);
    get().setGaiaState('surprised', `Look! A ${eventName} is happening!`);
    
    // End event after 15 seconds
    setTimeout(() => {
      set({ currentEvent: null });
      get().setGaiaState('idle', null);
    }, 15000);
  },
  
  addNotification: (message) => {
    set((state) => ({ notifications: [...state.notifications, message] }));
    // Auto remove after 3s
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter(n => n !== message)
      }));
    }, 3000);
  },
  
  completeMission: async (id: string, uid?: string) => {
    const state = get();
    const mission = state.dailyMissions.find(m => m.id === id);
    if (!mission || mission.completed) return; // Already completed
    
    // Mark completed
    const updatedMissions = state.dailyMissions.map(m => 
      m.id === id ? { ...m, completed: true } : m
    );
    
    // Add Rewards
    const newXp = state.xp + mission.xpReward;
    const newLevel = calculateLevel(newXp);
    const newCoins = state.greenCoins + mission.coinReward;
    
    // Boost specific Earth Metric (+0.1 max 1.0)
    let newPulse = state.planetPulse;
    let newForest = state.forestVitality;
    let newOcean = state.oceanHealth;
    let newAir = state.airQuality;
    let newBio = state.biodiversity;
    
    if (mission.type === 'forest') newForest = Math.min(1, newForest + 0.15);
    if (mission.type === 'water') newOcean = Math.min(1, newOcean + 0.15);
    if (mission.type === 'ocean') newOcean = Math.min(1, newOcean + 0.2);
    if (mission.type === 'air') newAir = Math.min(1, newAir + 0.15);
    
    // Pulse increases slightly on any completion
    newPulse = Math.min(1, newPulse + 0.05);
    
    // Recalculate global health average
    const newHealth = (newPulse + newForest + newOcean + newAir + newBio) / 5;

    // Trigger Notification & Effects
    get().addNotification(`+${mission.xpReward} XP: ${mission.title} Completed!`);
    get().setGaiaState('celebrating', "Amazing job! You're making a real difference.");
    
    if (newLevel !== state.level) {
      get().addNotification(`Level Up! You are now a ${newLevel}`);
      get().setGaiaState('celebrating', `Incredible! You reached ${newLevel}!`);
    }

    if (uid) {
      const { updateUserProgress } = await import('@/lib/db');
      await updateUserProgress(uid, {
        coins: newCoins,
        xp: newXp,
        level: newLevel
      });
    }
    
    set({
      dailyMissions: updatedMissions,
      xp: newXp,
      level: newLevel,
      greenCoins: newCoins,
      planetPulse: newPulse,
      forestVitality: newForest,
      oceanHealth: newOcean,
      airQuality: newAir,
      health: newHealth,
      rewardTrigger: Date.now()
    });
  },
  
  updateFromAnswers: (answers) => set((state) => {
    // Basic fallback logic from Phase 2 (modified to fit 5 stats)
    let newHealth = state.health;
    
    // Modify based on answers just to show something in onboarding...
    return { health: newHealth };
  }),

  addXP: async (xpToAdd, coinsToAdd, uid) => {
    const state = get();
    const newXp = state.xp + xpToAdd;
    const newCoins = state.greenCoins + coinsToAdd;
    const newLevel = calculateLevel(newXp);
    
    if (newLevel !== state.level) {
      get().addNotification(`Level Up! You are now a ${newLevel}`);
      get().setGaiaState('celebrating', `Incredible! You reached ${newLevel}!`);

      // Grant a level-up reward
      get().grantItem({
        id: `level-reward-${newLevel.replace(/\s+/g, '-').toLowerCase()}`,
        name: `${newLevel} Badge`,
        category: "Collectibles",
        rarity: "Epic",
        description: `Awarded for reaching the rank of ${newLevel}.`,
      }, uid);
    }

    if (uid) {
      const { updateUserProgress } = await import('@/lib/db');
      await updateUserProgress(uid, {
        xp: newXp,
        coins: newCoins,
        level: newLevel
      });
    }

    set({
      xp: newXp,
      greenCoins: newCoins,
      level: newLevel,
      rewardTrigger: Date.now()
    });
  }
}));
