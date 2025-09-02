import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '../components/theme-provider';
import { enhancedRouter } from '../routes/router';
import { QueryProvider } from '../lib/query-provider';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <QueryProvider>
        <RouterProvider router={enhancedRouter} />
      </QueryProvider>
    </ThemeProvider>
  );
}

export default App;
