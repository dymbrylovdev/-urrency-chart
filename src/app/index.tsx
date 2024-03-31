import React, { Suspense } from 'react';
import './styles/index.scss';
import { AppRouter } from 'app/providers/router';
import { classNames } from 'shared/lib';
import { useTheme } from 'features/Theme';
import { LangSwitcher } from 'features/LangSwitcher';

const Index = () => {
  const { theme } = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <div className="container-content">
        <AppRouter />
      </div>
    </div>
  );
};

export default Index;
