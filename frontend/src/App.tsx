import Routes from '@/routes';
import { Toaster } from 'sonner';
import '@/config/i18n';
import { ThemeProvider } from './components/themes/Theme.provider';

const App = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Toaster richColors position="top-right" duration={3500} />
        <Routes />
      </ThemeProvider>
    </>
  );
};

export default App;
