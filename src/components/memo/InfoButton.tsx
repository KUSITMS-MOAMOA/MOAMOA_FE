import { useState, useEffect } from "react"
import * as S from "./InfoButton.Style"

interface InfoButtonProps {
  content: string | React.ReactNode
  position?: "top" | "right" | "bottom" | "left"
  triggerOnClick?: boolean
  $isPc?: boolean
}

export const InfoButton = ({ content, position = 'bottom', triggerOnClick, $isPc }: InfoButtonProps) => {
  const [isVisible, setIsVisible] = useState(false)

  const dynamicPosition = $isPc ? position : 'left';

  const handleMouseEnter = () => {
    if (!triggerOnClick) {
      setIsVisible(true)
    }
  }

  const handleMouseLeave = () => {
    if (!triggerOnClick) {
      setIsVisible(false)
    }
  }

  const handleClick = () => {
    if (triggerOnClick) {
      setIsVisible(!isVisible)
    }
  }

  useEffect(() => {
    if (triggerOnClick && isVisible) {
      const handleClickOutside = (event: MouseEvent) => {
        if (!(event.target as Element).closest("button")) {
          setIsVisible(false)
        }
      }

      document.addEventListener("click", handleClickOutside)
      return () => {
        document.removeEventListener("click", handleClickOutside)
      }
    }
  }, [triggerOnClick, isVisible])

  return (
    <S.InfoIcon
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      aria-label="Information"
      aria-expanded={isVisible}
      $isPc={$isPc}
    >
      i
      <S.TooltipContainer position={dynamicPosition} $isVisible={isVisible} $isPc={$isPc}>
        {content}
      </S.TooltipContainer>
    </S.InfoIcon>
  )
}
