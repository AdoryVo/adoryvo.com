import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function classMerge(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isoDateToString(date: string) {
  if (isNaN(Date.parse(date))) {
    return date
  }

  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
