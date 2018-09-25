import * as React from 'react';
import {bind} from 'lodash-decorators';
import {Context, I18nData} from '../Provider';

interface Settings<Dictionary> {
  getDictionary(): Dictionary;
}

export interface I18nProps<Translation> extends I18nData {
  translation: Translation;
  formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string;
  formatNumber(value: number): string;
}

export interface WithI18nProps<Translation> {
  i18n: I18nProps<Translation>;
}

function withI18n<ComponentProps, Translation, Dictionary>({
  getDictionary,
}: Settings<Dictionary>) {
  function addWithI18n(WrappedComponent: React.SFC<any>) {
    type ComposedProps = ComponentProps & {
      i18n: I18nData;
    };

    interface State {
      translationData: Translation | null;
    }

    class I18nWrapper extends React.Component<ComposedProps, State> {
      state = {
        translationData: null,
      };

      async componentWillMount() {
        const {
          i18n: {language},
        } = this.props;
        const dictionary = await getDictionary();
        const translationData = (dictionary as any)[language];
        this.setState({translationData});
      }

      render() {
        const {i18n} = this.props;
        const {translationData} = this.state;

        if (!translationData) {
          return null;
        }

        const i18nProps = {
          ...(i18n as I18nData),
          translation: translationData,
          formatDate: this.formatDate,
          formatNumber: this.formatNumber,
        };

        return <WrappedComponent {...this.props} i18n={i18nProps} />;
      }

      @bind()
      private formatDate(date: Date, options: Intl.DateTimeFormatOptions) {
        const {
          i18n: {locale},
        } = this.props;
        return date.toLocaleDateString(locale, options);
      }

      @bind()
      private formatNumber(value: number) {
        return value.toLocaleString();
      }
    }

    function ContextWrapper(props: ComponentProps) {
      return (
        <Context.Consumer>
          {({locale, region, language}: I18nData) => (
            <I18nWrapper
              i18n={{
                locale,
                region,
                language,
              }}
              {...props}
            />
          )}
        </Context.Consumer>
      );
    }

    return ContextWrapper;
  }

  return addWithI18n;
}

export default withI18n;
