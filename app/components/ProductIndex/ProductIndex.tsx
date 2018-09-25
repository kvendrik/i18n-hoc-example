import * as React from 'react';
import {withI18n, WithI18nProps, Dictionary} from 'utilities/i18n';
import {Translation, nl, en} from './translations';

type Props = {};
type ComposedProps = WithI18nProps<Translation>;

function ProductIndex({
  i18n: {translation, locale, formatDate, formatNumber},
}: ComposedProps) {
  return (
    <>
      <h1>{translation.title}</h1>
      <p>{translation.yourLocale(locale)}</p>
      <p>{translation.formattedDate(formatDate(new Date()))}</p>
      <p>{translation.formattedNumber(formatNumber(1000000))}</p>
    </>
  );
}

export default withI18n<Props, Translation, Dictionary<Translation>>({
  getDictionary: () => ({nl, en}),
})(ProductIndex);
