import { create } from 'zustand';

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
  
  // Missions
  dailyMissions: Mission[];
  
  // Game Home & Gaia State
  theme: 'nature-light' | 'forest-night';
  energy: number;
  hasClaimedDaily: boolean;
  currentEvent: string | null;
  gaiaEmotion: 'idle' | 'happy' | 'sleeping' | 'celebrating' | 'surprised' | 'concerned';
  gaiaMessage: string | null;

  // Setters
  setHealth: (health: number) => void;
  updateFromAnswers: (answers: Record<string, string>) => void;
  completeMission: (id: string) => void;
  addNotification: (message: string) => void;
  toggleTheme: () => void;
  claimDaily: () => void;
  rewardTrigger: number; // Timestamp to trigger effects
  setGaiaState: (emotion: EarthState['gaiaEmotion'], message?: string | null) => void;
  triggerRandomEvent: (eventName: string) => void;
  
  // UI State
  notifications: string[];
}

const initialMissions: Mission[] = [
  { id: '1', title: 'Meatless Meal', description: 'Swap one meal for a 100% plant-based alternative.', xpReward: 50, coinReward: 10, completed: false, type: 'forest' },
  { id: '2', title: '5-Minute Shower', description: 'Cut your shower time to under 5 minutes.', xpReward: 30, coinReward: 5, completed: false, type: 'water' },
  { id: '3', title: 'Zero Single-Use Plastic', description: 'Use reusable alternatives all day.', xpReward: 100, coinReward: 20, completed: false, type: 'ocean' },
  { id: '4', title: 'Cycle to Work', description: 'Use a bicycle instead of a car today.', xpReward: 80, coinReward: 15, completed: false, type: 'air' },
];

function calculateLevel(xp: number): string {
  if (xp > 1000) return "Earth Legend";
  if (xp > 750) return "Planet Protector";
  if (xp > 500) return "Forest Hero";
  if (xp > 250) return "Guardian";
  if (xp > 100) return "Explorer";
  return "Seed";
}

export const useEarthStore = create<EarthState>((set, get) => ({
  health: 0.2, // Overall
  planetPulse: 0.3,
  forestVitality: 0.2,
  oceanHealth: 0.2,
  airQuality: 0.1,
  biodiversity: 0.2,
  
  xp: 45,
  level: 'Seed',
  greenCoins: 120,
  gems: 10,
  streak: 6,
  petStatus: 'Happy',
  
  theme: 'nature-light',
  energy: 100,
  hasClaimedDaily: false,
  currentEvent: null,
  gaiaEmotion: 'idle',
  gaiaMessage: "Welcome back! The forest has been waiting for you.",
  rewardTrigger: 0,

  dailyMissions: initialMissions,
  notifications: [],
  
  setHealth: (health) => set({ health }),
  
  toggleTheme: () => set((state) => ({ 
    theme: state.theme === 'nature-light' ? 'forest-night' : 'nature-light' 
  })),

  claimDaily: () => set((state) => {
    if (state.hasClaimedDaily) return state;
    get().addNotification("+50 XP and 20 Coins for Daily Login!");
    get().setGaiaState('happy', "Yay! You claimed your daily reward!");
    return {
      hasClaimedDaily: true,
      xp: state.xp + 50,
      greenCoins: state.greenCoins + 20,
      level: calculateLevel(state.xp + 50)
    };
  }),

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
  
  completeMission: (id) => set((state) => {
    const mission = state.dailyMissions.find(m => m.id === id);
    if (!mission || mission.completed) return state; // Already completed
    
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
    set({ rewardTrigger: Date.now() });
    
    if (newLevel !== state.level) {
      get().addNotification(`Level Up! You are now a ${newLevel}`);
      get().setGaiaState('celebrating', `Incredible! You reached ${newLevel}!`);
    }
    
    return {
      dailyMissions: updatedMissions,
      xp: newXp,
      level: newLevel,
      greenCoins: newCoins,
      planetPulse: newPulse,
      forestVitality: newForest,
      oceanHealth: newOcean,
      airQuality: newAir,
      health: newHealth
    };
  }),
  
  updateFromAnswers: (answers) => set((state) => {
    // Basic fallback logic from Phase 2 (modified to fit 5 stats)
    let newHealth = state.health;
    
    // Modify based on answers just to show something in onboarding...
    return { health: newHealth };
  })
}));
