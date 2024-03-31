import React, { memo, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { LoaderPage } from 'pages/loader';
import { RouterConfig } from 'shared/config';

const AppRouter = () => (
  <Suspense fallback={(
    <div style={{ flex: 1 }}>
      <LoaderPage />
    </div>
  )}
  >
    <Routes>
      {Object.values(RouterConfig).map(({ element, path }) => (
        <Route
          key={path}
          path={path}
          element={element}
        />
      ))}
    </Routes>
  </Suspense>
);
export default memo(AppRouter);
