import * as React from 'react';

interface Props {
  children: React.ReactNode;
}

export interface I18nData {
  locale: string;
  language: string;
  region: string;
}

export const Context = React.createContext();

class Provider extends React.Component<Props> {
  private get locale() {
    return navigator.language;
  }

  private get region() {
    return this.locale.split('-')[1];
  }

  private get language() {
    return this.locale.split('-')[0];
  }

  render() {
    const {children} = this.props;
    const {locale, language, region} = this;
    const i18nData = {
      locale,
      language,
      region,
    };

    return <Context.Provider value={i18nData}>{children}</Context.Provider>;
  }
}

export default Provider;
