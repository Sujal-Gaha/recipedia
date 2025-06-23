import { LandingPageNavbar } from '../components/landing/Navbar';
import { HeroSection } from '../components/landing/HeroSection';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { FeaturedRecipesSection } from '../components/landing/FeaturedRecipesSection';
import { StatsSection } from '../components/landing/StatsSection';
import { CTASection } from '../components/landing/CTASection';
import { LandingPageFooter } from '../components/landing/Footer';
import { TrendingIngredientsSection } from '../components/landing/TrendingIngredientsSection';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingPageNavbar />
      <HeroSection />
      <TrendingIngredientsSection />
      <FeaturesSection />
      <FeaturedRecipesSection />
      <StatsSection />
      <CTASection />
      <LandingPageFooter />
    </div>
  );
};
