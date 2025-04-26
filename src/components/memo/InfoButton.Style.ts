import styled from "styled-components"
import { Colors } from "@/styles/colors"

interface TooltipContainerProps {
  position: "top" | "right" | "bottom" | "left"
  $isVisible: boolean
  $isPc?: boolean
}

interface InfoIconProps {
  $isPc?: boolean;
}

export const InfoIcon = styled.button.withConfig({ shouldForwardProp: (prop) => prop !== '$isPc' }) <InfoIconProps>`
  width: ${(props) => (props.$isPc ? '24px' : '18px')};
  height: ${(props) => (props.$isPc ? '24px' : '18px')};
  border-radius: 50%;
  background-color: ${Colors.blue200};
  color: ${Colors.white};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => (props.$isPc ? '14px' : '12px')};
  font-weight: 400;
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${Colors.blue100};
  }

  &:focus {
    outline: none;
  }
`

export const TooltipContainer = styled.div<TooltipContainerProps>`
  position: absolute;
  background-color: ${Colors.gray300};
  padding: 8px 12px;
  border-radius: 4px;
  text-align: left;
  font-size: 14px;
  font-weight: 400;
  width: max-content;
  max-width: ${(props) => (props.$isPc ? '350px' : '250px')};
  z-index: 1000;
  opacity: ${(props) => (props.$isVisible ? 1 : 0)};
  visibility: ${(props) => (props.$isVisible ? "visible" : "hidden")};
  transition: opacity 0.2s, visibility 0.2s;
  
  ${(props) => {
    switch (props.position) {
      case "top":
        return `
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(-8px);
          
          &::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: ${Colors.gray300} transparent transparent transparent;
          }
        `
      case "right":
        return `
          left: 100%;
          top: 50%;
          transform: translateY(-50%) translateX(8px);
          
          &::after {
            content: '';
            position: absolute;
            top: 50%;
            right: 100%;
            margin-top: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: transparent ${Colors.gray300} transparent transparent;
          }
        `
      case "bottom":
        return `
          top: 100%;
          left: 50%;
          transform: translateX(-50%) translateY(8px);
          
          &::after {
            content: '';
            position: absolute;
            bottom: 100%;
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: transparent transparent ${Colors.gray300} transparent;
          }
        `
      case "left":
        return `
          right: 100%;
          top: 50%;
          transform: translateY(-20%) translateX(-8px);
          
          &::after {
            content: '';
            position: absolute;
            top: 20%;
            left: 100%;
            margin-top: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: transparent transparent transparent ${Colors.gray300};
          }
        `
      default:
        return ""
    }
  }
  }
`
