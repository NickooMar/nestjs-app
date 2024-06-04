import useAuth from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import Header from '@/components/header/Header';
import { ModeToggle } from '@/components/themes/Theme.toggle';

const Home = () => {
  const { t } = useTranslation();
  const { handleLogout } = useAuth();

  return (
    <>
      <Header />
      <div className="flex justify-center">
        <ModeToggle />

        <Link to="/auth/signin">
          <Button variant="outline">{t('home.signin')}</Button>
        </Link>
        <Link to="/auth/signup">
          <Button variant="outline">{t('home.signup')}</Button>
        </Link>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </>
  );
};

export default Home;
