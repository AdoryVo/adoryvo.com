import type { InputHTMLAttributes } from 'react'
import { classMerge } from '../../lib/utils'

export default function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={classMerge(
        'mt-1 block w-full rounded-md border-2 border-blue-200 text-primary shadow-xs focus:border-blue-100 focus:ring focus:ring-blue/300 focus:ring-black/50',
        className
      )}
      {...props}
    />
  )
}
