import { Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { _FULL_ROUTES } from '@/constants/routes';

export const CTASection = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <Card className="p-16">
          <CardContent className="p-0">
            <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Zap className="h-10 w-10 text-primary-foreground" />
            </div>
            <h2 className="text-5xl font-bold mb-6">Ready to Start Your Culinary Journey?</h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of home cooks sharing their favorite recipes, discovering new flavors, and building lasting
              culinary memories together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-12 py-4 text-lg font-medium" asChild>
                <Link to={_FULL_ROUTES.REGISTER}>Start Cooking Today</Link>
              </Button>
              <Button size="lg" variant="outline" className="px-12 py-4 text-lg font-medium" asChild>
                <Link to={_FULL_ROUTES.RECIPE}>Explore Recipes</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
