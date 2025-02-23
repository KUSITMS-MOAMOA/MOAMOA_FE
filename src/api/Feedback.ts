import api from './instance';

interface FeedbackRequest {
  recordId: number;
  satisfaction: "GOOD" | "BAD";
  feedbackType?: "CHAT" | "ANALYSIS";
  issue?: string;
  comment?: string;
}

interface FeedbackResponse {
  is_success: boolean;
  code: string;
  message: string;
}

/**
 * [2.3] AI 만족도 조사 결과 제출
 * @param {FeedbackRequest} data - 피드백 데이터
 * @returns {Promise<FeedbackResponse>} - API 응답 데이터
 */
export async function submitFeedback(data: FeedbackRequest): Promise<FeedbackResponse> {
  try {
    const response = await api.post('/api/feedback', data);

    if (response.data.is_success) {
      return response.data
    } else {
      throw new Error(`2.3 API 에러: ${response.data.message} (코드: ${response.data.code})`)
    }
  }
  catch (error) {
    console.error(error);
    throw error;
  }
}