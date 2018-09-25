import {Translation} from './';

const nl: Translation = {
  title: 'Geweldig product!',
  yourLocale: (locale: string) => `Jouw locale is: ${locale}.`,
  formattedDate: (date: string) =>
    `Een geformatteerde datum in deze locale ziet er zo uit: ${date}.`,
  formattedNumber: (formattedNumber: string) =>
    `Een geformatteerd nummer in deze locale ziet er zo uit: ${formattedNumber}.`,
};

export default nl;
