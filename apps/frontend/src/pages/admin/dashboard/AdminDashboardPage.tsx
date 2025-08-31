import { RecentActivity } from './components/RecentActivity';
import { SystemHealth } from './components/SystemHealth';
import { OverViewStats } from './components/OverviewStats';
import { ManagementCards } from './components/ManagementCards';

export const AdminDashboardPage = () => {
  const stats = {
    totalUsers: 1247,
    totalRecipes: 3456,
    totalIngredients: 892,
    flaggedContent: 12,
    activeUsers: 234,
    newUsersToday: 18,
    recipesPublishedToday: 45,
    systemHealth: 98.5,
  };

  const recentActivity = [
    {
      id: '1',
      type: 'user_joined',
      message: 'New user Sarah Chen joined',
      timestamp: '2 minutes ago',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: '2',
      type: 'recipe_published',
      message: "Recipe 'Thai Green Curry' was published",
      timestamp: '5 minutes ago',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: '3',
      type: 'content_flagged',
      message: 'Recipe flagged for review',
      timestamp: '12 minutes ago',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: '4',
      type: 'user_verified',
      message: 'Chef Maria Rodriguez was verified',
      timestamp: '1 hour ago',
      avatar: '/placeholder.svg?height=40&width=40',
    },
  ];

  return (
    <div className="container mx-auto px-6 py-8 max-w-7xl">
      <OverViewStats stats={stats} />

      <ManagementCards stats={stats} />

      <div className="grid lg:grid-cols-2 gap-8">
        <RecentActivity recentActivity={recentActivity} />

        <SystemHealth stats={stats} />
      </div>
    </div>
  );
};
