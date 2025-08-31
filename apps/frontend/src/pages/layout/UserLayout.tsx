import { ReactNode } from 'react';
import { Navbar } from '../common/Navbar';
import { Footer } from '../common/Footer';

export const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};
