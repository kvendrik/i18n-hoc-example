import * as React from 'react';
import compose from '@shopify/react-compose';
import {withTranslation, WithTranslationProps} from 'utilities/translation';

type Props = {};
type ComposedProps = WithTranslationProps;

function ProductIndex({translate, locale}: ComposedProps) {
  return (
    <>
      <h1>{translate('ProductIndex.title')}</h1>
      <p>Your locale is: {locale}.</p>
    </>
  );
}

export default compose<Props>(withTranslation())(ProductIndex);
