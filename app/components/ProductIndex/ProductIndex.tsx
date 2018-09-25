import * as React from 'react';
import compose from '@shopify/react-compose';
import {withI18n, WithI18nProps} from '@kv/i18n';
import {Translation} from './translations';

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

export default compose<Props>(
  withI18n({
    async getLanguageData(language: string) {
      let data;
      if (language === 'nl') {
        data = await import('./translations/nl');
        return data.default;
      }
      data = await import('./translations/en');
      return data.default;
    },
  }),
)(ProductIndex);
