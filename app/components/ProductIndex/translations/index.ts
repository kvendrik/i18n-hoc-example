export interface Translation {
  title: string;
  yourLocale(locale: string): string;
  formattedDate(date: string): string;
  formattedNumber(formattedNumber: string): string;
}

export {default as nl} from './nl';
export {default as en} from './en';
