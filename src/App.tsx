import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import LoginRoute from './components/LoginRoute';
import ProtectedRoute from './components/ProtectedRoute';
import Charts from './features/charts/Charts';
import Login from './features/login/Login';
import NewOperation from './features/new-operation/NewOperation';
import Overview from './features/overview/Overview';

export default function App() {
  return (
    <Routes>
      <Route
        index
        element={
          <LoginRoute>
            <Login />
          </LoginRoute>
        }
      ></Route>
      <Route
        path="login"
        element={
          <LoginRoute>
            <Login />
          </LoginRoute>
        }
      ></Route>
      <Route element={<Layout />}>
        <Route
          path="overview"
          element={
            <ProtectedRoute>
              <Overview />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="new-operation"
          element={
            <ProtectedRoute>
              <NewOperation />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="charts"
          element={
            <ProtectedRoute>
              <Charts />
            </ProtectedRoute>
          }
        ></Route>
      </Route>
    </Routes>
  );
}
