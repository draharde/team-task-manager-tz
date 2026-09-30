const ISO_DATE_LOCALE = 'sv-SE';

const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

const isDateOnly = (value: string) => !value.includes('T');

export const parseDate = (value: string) =>
  new Date(isDateOnly(value) ? `${value}T00:00:00` : value);

export const formatDate = (isoDate: string) => dateFormatter.format(parseDate(isoDate));

export const toDateInputValue = (date: Date = new Date()) =>
  date.toLocaleDateString(ISO_DATE_LOCALE);
