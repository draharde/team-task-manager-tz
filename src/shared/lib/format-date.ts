const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

export const formatDate = (isoDate: string) => dateFormatter.format(new Date(isoDate));
