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
  font-size: 0.875rem;
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
  width: 0.9375rem;
  height: 0.9375rem;
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
  font-size: 0.8125rem;
  color: ${Colors.gray800};
`;

export const FeedbackTextArea = styled.textarea`
  width: 15.625rem;
  height: 5.25rem;
  padding: 0.625rem;
  font-size: 0.75rem;
  border-radius: 0.5rem;
  background-color: ${Colors.gray25};
  outline: none;
  
  &:placeholder {
    color: ${Colors.gray200};
  }
`;

export const FeedbackTextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;
