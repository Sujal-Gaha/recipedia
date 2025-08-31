import { Activity, Shield } from 'lucide-react';
import { Badge } from '../../../components/ui/badge';

export const AdminNavbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage your Recipedia platform</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
              <Activity className="mr-1 h-3 w-3" />
              System Healthy
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
};
