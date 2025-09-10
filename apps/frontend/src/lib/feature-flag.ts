import { env } from './env';

const FEATURES = {
  USER_DASHBOARD: 'USER_DASHBOARD',
  CHEF_DASHBOARD: 'CHEF_DASHBOARD',
  ADMIN_DASHBOARD: 'ADMIN_DASHBOARD',
} as const;

type TFeature = keyof typeof FEATURES;

export function getFeatureFlagFn(flags: string) {
  return (featureName: TFeature) => {
    const featuresInEnv = flags.split(';');

    const feature = featuresInEnv.find((f) => f.split(':')[0] === featureName);

    if (!feature) {
      return false;
    }

    return feature.split(':')[1] === 'true';
  };
}

export const isFeatureEnabled = getFeatureFlagFn(env.VITE_FEATURE_FLAGS);
