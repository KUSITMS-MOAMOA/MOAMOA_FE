import api from './instance';

/** [4.4] 경험 기록하기 (채팅 + 메모)
 * @returns
 */

interface PostRecordResponse {
  is_success: boolean;
  data: {
    analysisDto: {
      analysisId: number;
    };
    chatRecordCount: number;
  };
}

export async function postRecord({
  title,
  content,
  folderId,
  recordType,
  chatRoomId,
}: {
  title: string;
  content: string;
  folderId: number;
  recordType: string;
  chatRoomId?: number;
}): Promise<PostRecordResponse> {
  try {
    const response = await api.post('/api/records',
      {
        title,
        content,
        folderId,
        recordType,
        ...(chatRoomId && { chatRoomId }),
      });
    if (response.data.is_success) {
      return response.data;
    }
    throw new Error('4.4 API request failed');
  } catch (error) {
    console.error(error);
    throw error;
  }
}
