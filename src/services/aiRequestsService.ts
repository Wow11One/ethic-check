import { EthicForm } from '@/types/formTypes';
import { saveNewRequestToUserHistory } from '@/repository/userRequestsHistory';
import { sendRequestToChatGpt } from './chatGPTService';
import { sendRequestToGemini } from '@/services/geminiService';

export const requestAIs = async (data: EthicForm) => {
  // const chatGptResponse = await sendRequestToChatGpt(data);
  const geminiResponse = await sendRequestToGemini(data);

  return {
    // chatGptResponse,
    geminiResponse,
  };
};
