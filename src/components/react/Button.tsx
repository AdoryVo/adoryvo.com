import type { ButtonHTMLAttributes } from 'react'
import { classMerge } from '../../lib/utils'

export default function Button({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={classMerge('rounded-sm px-4 py-2 transition-colors', className)}
      {...props}
    >
      {children}
    </button>
  )
}
