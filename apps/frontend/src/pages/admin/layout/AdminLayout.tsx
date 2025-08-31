import { ReactNode } from 'react';
import { AdminNavbar } from '../components/Navbar';

export const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <AdminNavbar />
      {children}
    </div>
  );
};
