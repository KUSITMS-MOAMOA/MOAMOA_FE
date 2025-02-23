import { Modal } from "@/components/common/modal/Modal";
import * as S from "./DislikeOptionModal.Style";
import CloseIcon from "@icons/CloseIcon.svg";
import { Button } from "@/components/common/button/Button";
import { useState } from "react";
import { submitFeedback } from "@/api/Feedback";

interface DislikeOptionModalProps {
  closeAllModals: () => void;
  feedbackType: "CHAT" | "ANALYSIS";
  recordId: number;
  satisfaction: 'GOOD' | 'BAD';
}

export const DislikeOptionModal = ({ closeAllModals, feedbackType, recordId, satisfaction }: DislikeOptionModalProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userFeedback, setUserFeedback] = useState<string>("");

  const handleClose = () => {
    closeAllModals();
  };

  const title = feedbackType === "CHAT" ? "AI 채팅" : "AI 분석";

  const chatOptions = [
    { id: "IRRELEVANT_ANSWER", label: "제 경험과 관련없는 답변을 해요" },
    { id: "TOO_SIMPLE", label: "채팅 내용이 질문이 너무 모호하거나 단순해요" },
    { id: "REPETITIVE", label: "자연스럽지 않고 같은 질문을 반복해요" },
    { id: "NO_SPECIFIC", label: "경험을 더 구체적으로 정리할 수 없었어요" },
  ];

  const analysisOptions = [
    { id: "IRRELEVANT_KEYWORD", label: "경험과 관련없는 역량 키워드에요" },
    { id: "TOO_SHORT", label: "코멘트가 짧고 피드백이 구체적이지 않아요" },
    { id: "AWKWARD", label: "문장이 자연스럽지 않고 어색해요" },
    { id: "VAGUE_COMMENT", label: "코멘트가 모호해서 개선할 점을 모르겠어요" },
  ];

  const options = feedbackType === "CHAT" ? chatOptions : analysisOptions;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserFeedback(e.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedOption && !userFeedback.trim()) {
      return;
    }

    try {
      await submitFeedback({
        recordId,
        satisfaction,
        feedbackType,
        ...(selectedOption && { issue: selectedOption }),
        ...(userFeedback.trim() && { comment: userFeedback }),
      });
      closeAllModals();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal onClick={handleClose}>
      <S.Content>
        <S.Icon src={CloseIcon} alt="close" onClick={handleClose} />
        <S.TextContainer>
          <S.Title>{title}</S.Title>
          <S.Text>어떤 점이 마음에 들지 않으셨나요?</S.Text>
        </S.TextContainer>

        <S.OptionContainer>
          {options.map((option) => (
            <S.OptionWrapper key={option.id}>
              <S.OptionInput
                type="radio"
                id={option.id}
                name="dislikeOption"
                checked={selectedOption === option.id}
                onChange={() => setSelectedOption(option.id)}
              />
              <S.OptionLabel htmlFor={option.id}>{option.label}</S.OptionLabel>
            </S.OptionWrapper>
          ))}
        </S.OptionContainer>

        <S.FeedbackTextArea
          value={userFeedback}
          onChange={handleTextChange}
          placeholder={`마음에 들지 않은 이유를 설명해주세요.\n보완해볼게요.`}
        />

        <Button
          styleType='basic'
          onClick={handleSubmit}
          disabled={!selectedOption && !userFeedback.trim()}
        >
          제출하기
        </Button>
      </S.Content>
    </Modal>
  );
};
