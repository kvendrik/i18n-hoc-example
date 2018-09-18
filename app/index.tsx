import * as React from 'react';
import {render} from 'react-dom';
import {Provider as I18nProvider} from '@kv/i18n';
import ProductIndex from './components/ProductIndex';

render(
  <I18nProvider>
    <ProductIndex />
  </I18nProvider>,
  document.getElementById('app'),
);
