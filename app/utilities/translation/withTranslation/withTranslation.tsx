import * as React from 'react';
import {get} from 'lodash';
import {TranslationContext, IntlData} from '../TranslationProvider';

export interface WithTranslationProps {
  locale: string;
  translate(path: string): string;
}

function withTranslation<ComponentProps>() {
  function addWithTranslation(WrappedComponent: React.SFC<any>) {
    return (props: ComponentProps) => (
      <TranslationContext.Consumer>
        {({languageData, locale}: IntlData) => {
          function translate(path: string) {
            return get(languageData, path);
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
