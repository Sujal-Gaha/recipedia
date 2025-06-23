import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from '../routes/routes';
import { ThemeProvider } from '../components/theme-provider';

const router = createBrowserRouter(routes);

function App() {
  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
