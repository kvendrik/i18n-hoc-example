import * as React from 'react';

interface Props {
  children: React.ReactNode;
}

export interface IntlData {
  languageData: any;
  locale: string;
}

interface State {
  intlData: IntlData | null;
}

export const TranslationContext = React.createContext();

class TranslationProvider extends React.Component<Props, State> {
  state = {
    intlData: null,
  };

  async componentWillMount() {
    const {locale} = this;
    const languageData = await import(`./data/${locale}.json`);
    this.setState({
      intlData: {
        languageData,
        locale,
      },
    });
  }

  private get locale() {
    const actualLocale = navigator.language.split('-')[0];
    const supportedLocales = ['en', 'nl'];
    return supportedLocales.includes(actualLocale)
      ? actualLocale
      : supportedLocales[0];
  }

  render() {
    const {children} = this.props;
    const {intlData} = this.state;

    if (!intlData) {
      return null;
    }

    return (
      <TranslationContext.Provider value={intlData}>
        {children}
      </TranslationContext.Provider>
    );
  }
}

export default TranslationProvider;
