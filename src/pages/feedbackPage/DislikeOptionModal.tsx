import { Modal } from "@/components/common/modal/Modal";
import * as S from "./DislikeOptionModal.Style";
import CloseIcon from "@icons/CloseIcon.svg";
import { Button } from "@/components/common/button/Button";
import { useState } from "react";

interface DislikeOptionModalProps {
  onClose: () => void;
  feedbackType: "CHAT" | "ANALYSIS" | null; // feedbackType prop 정의
}

export const DislikeOptionModal = ({ onClose, feedbackType }: DislikeOptionModalProps) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userFeedback, setUserFeedback] = useState<string>("");
  // feedbackType이 없으면 모달을 렌더링하지 않음
  // if (!feedbackType) return null;

  const handleClose = () => {
    onClose(); // 모달 닫기
  };

  // feedbackType에 따라 제목 변경
  const title = feedbackType === "CHAT" ? "AI 채팅" : "AI 분석";

  const chatOptions = [
    { id: "Option 1", label: "제 경험과 관련없는 답변을 해요" },
    { id: "Option 2", label: "채팅 내용이 질문이 너무 모호하거나 단순해요" },
    { id: "Option 3", label: "자연스럽지 않고 같은 질문을 반복해요" },
    { id: "Option 4", label: "경험을 더 구체적으로 정리할 수 없었어요" },
  ];

  const analysisOptions = [
    { id: "Option 1", label: "경험과 관련없는 역량 키워드에요" },
    { id: "Option 2", label: "코멘트가 짧고 피드백이 구체적이지 않아요" },
    { id: "Option 3", label: "문장이 자연스럽지 않고 어색해요" },
    { id: "Option 4", label: "코멘트가 모호해서 개선할 점을 모르겠어요" },
  ];

  // feedbackType에 따라 옵션 목록을 선택
  const options = feedbackType === "CHAT" ? chatOptions : analysisOptions;

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserFeedback(e.target.value);
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

        <Button styleType='basic'>제출하기</Button>
      </S.Content>
    </Modal>
  );
};
