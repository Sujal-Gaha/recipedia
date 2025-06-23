import { HeroSection } from '../components/landing/HeroSection';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { FeaturedRecipesSection } from '../components/landing/FeaturedRecipesSection';
import { StatsSection } from '../components/landing/StatsSection';
import { CTASection } from '../components/landing/CTASection';
import { TrendingIngredientsSection } from '../components/landing/TrendingIngredientsSection';

export const HomePage = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <HeroSection />
      <TrendingIngredientsSection />
      <FeaturesSection />
      <FeaturedRecipesSection />
      <StatsSection />
      <CTASection />
      {/* <Footer /> */}
    </div>
  );
};
