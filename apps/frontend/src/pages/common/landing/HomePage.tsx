import { HeroSection } from './components/HeroSection';
import { FeaturesSection } from './components/FeaturesSection';
import { FeaturedRecipesSection } from './components/FeaturedRecipesSection';
import { StatsSection } from './components/StatsSection';
import { CTASection } from './components/CTASection';
import { TrendingIngredientsSection } from './components/TrendingIngredientsSection';
import { useMeQuery } from '../../../apis/auth/query';

export const HomePage = () => {
  const data = useMeQuery();

  return (
    <div>
      <HeroSection />
      <TrendingIngredientsSection />
      <FeaturesSection />
      <FeaturedRecipesSection />
      <StatsSection />
      <CTASection />
    </div>
  );
};
