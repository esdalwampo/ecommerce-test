import { SvgIconProps } from "../interfaces/types";

const ChevronDoubleLeft = ({
  className = "",
  size = 20
}: SvgIconProps) => {

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
    </svg>
  )
}

export default ChevronDoubleLeft;
