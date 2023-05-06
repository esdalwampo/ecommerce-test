import { SvgIconProps } from "../interfaces/types";

const ChevronDoubleRight = ({
  className = "",
  size = 20
}: SvgIconProps) => {

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 17l5-5-5-5M6 17l5-5-5-5"/>
    </svg>
  )
}

export default ChevronDoubleRight;