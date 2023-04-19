import React from 'react'

export const Group = ({
  label,
  className,
  children,
}: {
  label: string
  className?: string
  children: React.ReactNode
}) => {
  return (
    <div className={className} role="group" aria-label={label}>
      {children}
    </div>
  )
}
