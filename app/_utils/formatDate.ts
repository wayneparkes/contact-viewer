export function dateToISOString(date = '') {
  return date && new Date(date).toISOString().split('T')[0]
}

export default function formatDate(date: string, showYear = true) {
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric'
  }

  if (showYear) {
    options.year = 'numeric'
  }

  try {
    return new Intl.DateTimeFormat('en-GB', options).format(new Date(date))
  } catch {
    return date
  }
}
