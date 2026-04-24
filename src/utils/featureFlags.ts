export const featureFlags = {
  auth: import.meta.env.VITE_FEATURE_AUTH === 'true',
  purchase: import.meta.env.VITE_FEATURE_PURCHASE === 'true',
  profile: import.meta.env.VITE_FEATURE_PROFILE === 'true',
  results: import.meta.env.VITE_FEATURE_RESULTS === 'true',
};
