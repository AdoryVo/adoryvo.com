import type { AllHTMLAttributes } from 'react'
import { classMerge } from '../../lib/utils'

export default function Base({
  className,
  children,
  ...props
}: AllHTMLAttributes<HTMLDivElement>) {
  return (
    <div className={classMerge('mt-2', className)} {...props}>
      {children}
    </div>
  )
}
