type BadgeProps = {
  children: string
  className?: string
}

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full bg-[#dff4f6] px-3 py-1 text-sm font-medium text-[#0f5f68] ${className}`.trim()}
    >
      {children}
    </span>
  )
}
