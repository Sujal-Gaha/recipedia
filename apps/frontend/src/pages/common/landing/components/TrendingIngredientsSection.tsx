import { Card, CardContent } from '@/components/ui/card';

const trendingIngredients = [
  {
    name: 'Avocado',
    image: 'https://png.pngtree.com/png-clipart/20230114/ourmid/pngtree-photo-of-avocado-png-image_6561465.png',
    recipes: 234,
  },
  {
    name: 'Carrot',
    image:
      'https://media.istockphoto.com/id/1388403435/photo/fresh-carrots-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=XmrTb_nASc7d-4zVKUz0leeTT4fibDzWi_GpIun0Tlc=',
    recipes: 189,
  },
  {
    name: 'Tomato',
    image: 'https://t3.ftcdn.net/jpg/00/34/61/76/360_F_34617669_p9r4GrR83TBEXCZrRny6AaigqPUEPFp5.jpg',
    recipes: 156,
  },
  {
    name: 'Mushrooms',
    image:
      'https://media.istockphoto.com/id/1276597176/photo/button-mushrooms.jpg?s=612x612&w=0&k=20&c=ilDpArGu1tDBzSAZR8zxr5VXjet7tb7U7Erx-vsRY4E=',
    recipes: 298,
  },
  {
    name: 'Onion',
    image:
      'https://media.istockphoto.com/id/499146870/photo/red-onions.jpg?s=612x612&w=0&k=20&c=OaZUynAtxIJyPaSgAsAGWwAbpTs_EfKF5zT_UvBDpbY=',
    recipes: 167,
  },
  {
    name: 'Spinach',
    image:
      'https://images.unsplash.com/photo-1576045057995-568f588f82fb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpbmFjaHxlbnwwfHwwfHx8MA%3D%3D',
    recipes: 203,
  },
];

export const TrendingIngredientsSection = () => {
  return (
    <section className="py-16 px-6 bg-muted/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Trending Ingredients</h2>
          <p className="text-lg text-muted-foreground">Popular ingredients our community is cooking with</p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
          {trendingIngredients.map((ingredient, index) => (
            <div key={index} className="text-center group cursor-pointer">
              <Card className="p-4 hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <CardContent className="p-0">
                  <img
                    src={ingredient.image || '/placeholder.svg'}
                    alt={ingredient.name}
                    width={80}
                    height={80}
                    className="mx-auto rounded-xl mb-3 h-20 w-20 object-contain"
                  />
                  <h3 className="font-semibold text-sm mb-1">{ingredient.name}</h3>
                  <p className="text-xs text-muted-foreground">{ingredient.recipes} recipes</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
