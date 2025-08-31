import { Activity, Database, Server, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import { Button } from '../../../../components/ui/button';

export const SystemHealth = ({
  stats,
}: {
  stats: {
    totalUsers: number;
    totalRecipes: number;
    totalIngredients: number;
    flaggedContent: number;
    activeUsers: number;
    newUsersToday: number;
    recipesPublishedToday: number;
    systemHealth: number;
  };
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Server className="mr-2 h-5 w-5" />
          System Health
        </CardTitle>
        <CardDescription>Platform performance and status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Health</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-sm font-medium">{stats.systemHealth}%</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Database</span>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                <Database className="mr-1 h-3 w-3" />
                Healthy
              </Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">API Response</span>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                <TrendingUp className="mr-1 h-3 w-3" />
                Fast
              </Badge>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Storage</span>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                <Activity className="mr-1 h-3 w-3" />
                Normal
              </Badge>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="text-sm text-muted-foreground mb-2">Quick Actions</div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                View Logs
              </Button>
              <Button variant="outline" size="sm">
                System Settings
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
