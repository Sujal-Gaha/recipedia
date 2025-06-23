import { ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LandingPageFooter = () => {
  return (
    <footer className="bg-muted py-16 px-6 mt-20">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <ChefHat className="h-6 w-6 text-primary" />
              <span className="text-2xl font-semibold">Recipedia</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Your ultimate destination for discovering and sharing amazing recipes from around the world.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-6 text-lg">Recipes</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <Link to="/recipes?difficulty=easy" className="hover:text-foreground transition-colors">
                  Easy Recipes
                </Link>
              </li>
              <li>
                <Link to="/recipes?difficulty=medium" className="hover:text-foreground transition-colors">
                  Medium Recipes
                </Link>
              </li>
              <li>
                <Link to="/recipes?difficulty=hard" className="hover:text-foreground transition-colors">
                  Hard Recipes
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-6 text-lg">Community</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <Link to="/create" className="hover:text-foreground transition-colors">
                  Share Recipe
                </Link>
              </li>
              <li>
                <Link to="/users" className="hover:text-foreground transition-colors">
                  Top Chefs
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-foreground transition-colors">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-6 text-lg">Support</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <Link to="/help" className="hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 Recipedia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
