import { ReactNode } from 'react';
import { Navbar } from '../common/landing/components/Navbar';
import { Footer } from '../common/landing/components/Footer';

export const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};
