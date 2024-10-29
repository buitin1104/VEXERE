import React from 'react';
import 'react-phone-input-2/lib/style.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ModalProvider } from './context/ModalContext';
import routesConfig from './router/routes.config';
const App = () => {
  return (
    <AuthProvider>
      <ModalProvider>
        <Router>
          <Routes>
            {routesConfig.map(
              (
                {
                  layout: LayoutComponent,
                  layoutProps,
                  element: PageComponent,
                  ...route
                },
                index,
              ) => (
                <Route
                  key={index}
                  {...route}
                  element={
                    LayoutComponent ? (
                      <LayoutComponent {...layoutProps}>
                        <PageComponent />
                      </LayoutComponent>
                    ) : (
                      <PageComponent />
                    )
                  }
                />
              ),
            )}
          </Routes>
        </Router>
      </ModalProvider>
    </AuthProvider>
  );
};

export default App;
