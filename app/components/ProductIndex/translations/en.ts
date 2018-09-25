import {Translation} from './';

const en: Translation = {
  title: 'Great product!',
  yourLocale: (locale: string) => `Your locale is: ${locale}.`,
  formattedDate: (date: string) =>
    `A formatted date in the locale looks like this: ${date}.`,
  formattedNumber: (formattedNumber: string) =>
    `A formatted number in the locale looks like this: ${formattedNumber}.`,
};

export default en;
