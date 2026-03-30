type SectionHeaderProps = {
  accent: string
  neutral: string
  className?: string
}

export function SectionHeader({ accent, neutral, className = "" }: SectionHeaderProps) {
  return (
    <h2 className={`text-[30px] leading-none font-light text-[#151515] lg:text-[42px] ${className}`.trim()}>
      <span className="font-normal text-[#17b2c0]">{accent}</span>{" "}
      <span className="font-normal text-[#1e1e1e]">{neutral}</span>
    </h2>
  )
}
