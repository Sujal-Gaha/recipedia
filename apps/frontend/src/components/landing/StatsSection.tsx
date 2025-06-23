import { Card, CardContent } from '../ui/card';

export const StatsSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <Card className="p-12 text-center">
          <CardContent className="p-0">
            <h2 className="text-3xl font-bold mb-8">Join Our Growing Food Community</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">12,543</div>
                <div className="font-medium">Home Chefs</div>
                <div className="text-sm text-muted-foreground mt-1">Sharing their passion</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-emerald-600 mb-2">8,921</div>
                <div className="font-medium">Recipes Shared</div>
                <div className="text-sm text-muted-foreground mt-1">From around the world</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">1,247</div>
                <div className="font-medium">Ingredients</div>
                <div className="text-sm text-muted-foreground mt-1">In our database</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
