export const earthVertexShader = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const earthFragmentShader = `
uniform float uPulse;      // Heartbeat intensity (0 to 1)
uniform float uForest;     // Vegetation coverage/color (0 to 1)
uniform float uOcean;      // Water clarity (0 to 1)
uniform float uAir;        // Atmosphere/Clouds (0 to 1)
uniform float uTime;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vec3 normal = normalize(vNormal);
  
  // Lighting
  vec3 lightDir = normalize(vec3(1.0, 0.5, 1.0));
  float intensity = max(dot(normal, lightDir), 0.0);
  
  // Base Continents Noise
  float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
  float isLand = step(0.5, noise + 0.2); // 1 = Land, 0 = Ocean

  // Ocean Logic: Polluted (brown/grey) to Healthy (deep blue)
  vec3 pollutedOcean = vec3(0.2, 0.15, 0.1); 
  vec3 healthyOcean = vec3(0.01, 0.25, 0.55);
  vec3 oceanColor = mix(pollutedOcean, healthyOcean, uOcean);
  
  // Land Logic: Polluted (grey/dry) to Healthy (lush green)
  vec3 pollutedLand = vec3(0.3, 0.25, 0.2);
  vec3 healthyLand = vec3(0.1, 0.5, 0.2);
  vec3 landColor = mix(pollutedLand, healthyLand, uForest);

  // Combine Base Earth
  vec3 earthColor = mix(oceanColor, landColor, isLand);
  
  // Atmosphere (Air Quality)
  float fresnel = dot(cameraPosition, normal);
  fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
  fresnel = pow(fresnel, 3.0);
  
  vec3 badAirColor = vec3(0.6, 0.5, 0.4); // Smog
  vec3 goodAirColor = vec3(0.3, 0.7, 1.0); // Clear blue
  vec3 atmosphere = mix(badAirColor, goodAirColor, uAir) * fresnel;

  // Clouds
  float cloudNoise = fract(sin(dot(vUv + vec2(uTime * 0.02, 0.0), vec2(2.989, 7.233))) * 437.545);
  float cloudIntensity = smoothstep(0.7, 1.0, cloudNoise) * 0.8;
  vec3 cloudColor = mix(vec3(0.5, 0.5, 0.4), vec3(1.0, 1.0, 1.0), uAir); // Smoggy clouds to white
  
  vec3 finalColor = earthColor * intensity + atmosphere + (cloudColor * cloudIntensity);
  
  gl_FragColor = vec4(finalColor, 1.0);
}
`;
