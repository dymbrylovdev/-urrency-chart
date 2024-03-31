import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
import { I18nextProvider } from 'react-i18next';
import { ErrorBoundary } from 'app/providers/errorBoundary';
import { StoreProvider } from 'app/providers/StoreProvider';
import i18n from './shared/config/i18n/i18n';

const App = lazy(async () => import('./app'));

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ErrorBoundary>
    <StoreProvider>
      <I18nextProvider i18n={i18n}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </I18nextProvider>
    </StoreProvider>
  </ErrorBoundary>,
);
