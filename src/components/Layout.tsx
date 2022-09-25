import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';
import { authActions, selectUsername } from '../app/auth.slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import AppBar from './AppBar';

export default function Layout() {
  const dispatch = useAppDispatch();
  const username = useAppSelector(selectUsername);

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  return (
    <div>
      <Container>
        <AppBar username={username!} onLogout={handleLogout} />
        <Outlet />
      </Container>
    </div>
  );
}
