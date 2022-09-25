import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { selectUsername } from '../app/auth.slice';
import { useAppSelector } from '../app/hooks';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const username = useAppSelector(selectUsername);

  return username ? (
    (children as JSX.Element)
  ) : (
    <Navigate to="/login" replace />
  );
}
