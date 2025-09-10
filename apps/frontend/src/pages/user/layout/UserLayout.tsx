import { ReactNode } from 'react';
import { Navbar } from '@/pages/common/Navbar';
import { Footer } from '@/pages/common/Footer';

export const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};
