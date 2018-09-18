import * as React from 'react';
import compose from '@shopify/react-compose';
import {withI18n, WithI18nProps} from '@kv/i18n';

type Props = {};
type ComposedProps = WithI18nProps;

function ProductIndex({
  i18n: {translate, locale, formatDate, formatNumber},
}: ComposedProps) {
  return (
    <>
      <h1>{translate('title')}</h1>
      <p>
        {translate('yourLocale', {
          locale,
        })}
      </p>
      <p>
        {translate('formattedDate', {
          date: formatDate(new Date()),
        })}
      </p>
      <p>
        {translate('formattedNumber', {
          number: formatNumber(1000000),
        })}
      </p>
    </>
  );
}

export default compose<Props>(
  withI18n({
    getLanguageData(locale: string) {
      if (locale === 'en') {
        return import(`./languages/en.json`);
      } else if (locale === 'nl') {
        return import(`./languages/nl.json`);
      }
      return import(`./languages/en.json`);
    },
  }),
)(ProductIndex);
