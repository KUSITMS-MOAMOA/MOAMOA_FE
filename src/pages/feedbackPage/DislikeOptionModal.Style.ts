import { Colors } from '@/styles/colors';
import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.0625rem;
  color: ${Colors.gray700};
`;

export const Icon = styled.img`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 1.125rem;
  height: 1.125rem;
  cursor: pointer;
`;

export const TextContainer = styled.div`
  align-items: flex-start;
`

export const Title = styled.p`
  font-size: 14px;
  color: ${Colors.blue400};
  text-align: left;
  margin-bottom: 0.5rem;
`

export const Text = styled.span`
  font-size: 1rem;
  font-weight: 600;
  line-height: 140%;
  margin-right: 2rem;
`;

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 0.5rem;
`;

export const OptionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const OptionInput = styled.input.attrs({ type: "radio" })`
  appearance: none;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 2px solid #ccc;
  background-color: #fff;
  cursor: pointer;
  transition: 0.5s;

  &:checked {
    background-color: ${Colors.blue500};
  }
`;

export const OptionLabel = styled.label`
  font-size: 13px;
  color: ${Colors.gray800};
`;

export const FeedbackTextArea = styled.textarea`
  width: 250px;
  height: 84px;
  padding: 10px;
  font-size: 12px;
  border-radius: 8px;
  background-color: ${Colors.gray25};
  outline: none;
  
  &:placeholder {
    color: ${Colors.gray200};
  }
`;

export const FeedbackTextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
