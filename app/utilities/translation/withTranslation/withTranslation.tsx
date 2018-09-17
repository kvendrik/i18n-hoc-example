import * as React from 'react';
import {get, template, templateSettings} from 'lodash';
import {TranslationContext, IntlData} from '../TranslationProvider';

interface Fields {
  [key: string]: string;
}

export interface WithTranslationProps {
  locale: string;
  translate(path: string, fields?: Fields): string;
}

templateSettings.interpolate = /{([\s\S]+?)}/g;

function withTranslation<ComponentProps>() {
  function addWithTranslation(WrappedComponent: React.SFC<any>) {
    return (props: ComponentProps) => (
      <TranslationContext.Consumer>
        {({languageData, locale}: IntlData) => {
          function translate(path: string, fields: Fields) {
            const rawValue = get(languageData, path);
            if (!rawValue) {
              return null;
            }
            if (!fields) {
              return rawValue;
            }
            const compiled = template(rawValue);
            return compiled(fields);
          }

          return (
            <WrappedComponent
              translate={translate}
              locale={locale}
              {...props}
            />
          );
        }}
      </TranslationContext.Consumer>
    );
  }

  return addWithTranslation;
}

export default withTranslation;
