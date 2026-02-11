import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router/Router.jsx';
import AuthProvider from './Context/AuthProvider.jsx';
import LenisProvider from './components/LenisProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <LenisProvider>
        <RouterProvider router={router} />
      </LenisProvider>
    </AuthProvider>
  </StrictMode>
);
