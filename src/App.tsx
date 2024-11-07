import { Dashboard } from './components/Dashboard';
import { ThemeProvider } from './components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Dashboard />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;