import type { HTMLAttributes } from 'react'
import { classMerge } from '../../lib/utils'

export default function Subheading({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <h2
      className={classMerge(
        'mt-2 text-lg font-semibold text-blue-100',
        className
      )}
      {...props}
    >
      {children}
    </h2>
  )
}
