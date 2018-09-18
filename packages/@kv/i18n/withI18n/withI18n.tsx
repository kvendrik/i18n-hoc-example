import * as React from 'react';
import {bind} from 'lodash-decorators';
import {get, template, templateSettings} from 'lodash';
import {Context, I18nData} from '../Provider';

interface Fields {
  [key: string]: string;
}

interface Settings {
  getLanguageData(locale: string): void;
}

export interface I18nProps extends I18nData {
  translate(path: string, fields?: Fields): string | null;
  formatDate(date: Date, options?: Intl.DateTimeFormatOptions): string;
  formatNumber(value: number): string;
}

export interface WithI18nProps {
  i18n: I18nProps;
}

templateSettings.interpolate = /{([\s\S]+?)}/g;

function withI18n<ComponentProps>({getLanguageData}: Settings) {
  function addWithI18n(WrappedComponent: React.SFC<any>) {
    type ComposedProps = ComponentProps & {
      i18n: I18nData;
    };

    interface State {
      languageData: any;
    }

    class I18nWrapper extends React.Component<ComposedProps, State> {
      state = {
        languageData: null,
      };

      async componentWillMount() {
        const {
          i18n: {language},
        } = this.props;
        const languageData = await getLanguageData(language);
        this.setState({languageData});
      }

      render() {
        const {i18n} = this.props;
        const {languageData} = this.state;

        if (!languageData) {
          return null;
        }

        const i18nProps: I18nProps = {
          ...(i18n as I18nData),
          translate: this.translate,
          formatDate: this.formatDate,
          formatNumber: this.formatNumber,
        };

        return <WrappedComponent {...this.props} i18n={i18nProps} />;
      }

      @bind()
      private translate(path: string, fields: Fields) {
        const {languageData} = this.state;
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
