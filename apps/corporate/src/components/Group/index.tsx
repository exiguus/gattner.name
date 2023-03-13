import React from 'react'

export const Group = ({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) => {
  return (
    <div role="group" aria-label={label}>
      {children}
    </div>
  )
}
