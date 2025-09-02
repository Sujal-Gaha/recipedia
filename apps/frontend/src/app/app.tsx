import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '../components/theme-provider';
import { enhancedRouter } from '../routes/router';
import { QueryProvider } from '../lib/query-provider';
import { Toaster } from '../components/ui/sonner';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryProvider>
        <Toaster />
        <RouterProvider router={enhancedRouter} />
      </QueryProvider>
    </ThemeProvider>
  );
}

export default App;
