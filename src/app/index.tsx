import React, { Suspense } from 'react';
import './styles/index.scss';
import { AppRouter } from 'app/providers/router';
import { classNames } from 'shared/lib';
import { useTheme } from 'features/Theme';

const Index = () => {
  const { theme } = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback={<div>Translate...</div>}>
        <div className="container-content">
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
};

export default Index;
