import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '../components/theme-provider';
import { enhancedRouter } from '../routes/router';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <RouterProvider router={enhancedRouter} />
    </ThemeProvider>
  );
}

export default App;
