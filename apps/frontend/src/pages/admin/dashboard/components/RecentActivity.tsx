import { Activity, AlertTriangle, CheckCircle, ChefHat, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const RecentActivity = ({
  recentActivity,
}: {
  recentActivity: {
    id: string;
    type: string;
    message: string;
    timestamp: string;
    avatar: string;
  }[];
}) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_joined':
        return <Users className="h-4 w-4 text-green-500" />;
      case 'recipe_published':
        return <ChefHat className="h-4 w-4 text-blue-500" />;
      case 'content_flagged':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'user_verified':
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      default:
        return <Activity className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5" />
          Recent Activity
        </CardTitle>
        <CardDescription>Latest platform events and user actions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/50">
              <Avatar className="w-10 h-10">
                <AvatarImage src={activity.avatar || '/placeholder.svg'} />
                <AvatarFallback>{getActivityIcon(activity.type)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{activity.message}</p>
                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
              </div>
              {getActivityIcon(activity.type)}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
