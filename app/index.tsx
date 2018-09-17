import * as React from 'react';
import {render} from 'react-dom';
import {TranslationProvider} from 'utilities/translation';
import ProductIndex from './components/ProductIndex';

render(
  <TranslationProvider>
    <ProductIndex />
  </TranslationProvider>,
  document.getElementById('app'),
);
