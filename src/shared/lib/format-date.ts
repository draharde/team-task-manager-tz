const dateFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

const isDateOnly = (value: string) => !value.includes('T')

const parseDate = (value: string) => new Date(isDateOnly(value) ? `${value}T00:00:00` : value)

export const formatDate = (isoDate: string) => dateFormatter.format(parseDate(isoDate))
