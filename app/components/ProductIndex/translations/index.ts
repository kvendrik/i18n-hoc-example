export interface Translation {
  title: string;
  yourLocale(locale: string): string;
  formattedDate(date: string): string;
  formattedNumber(formattedNumber: string): string;
}
