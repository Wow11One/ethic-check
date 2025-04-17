import { EthicForm } from '@/types/formTypes';
import { saveNewRequestToUserHistory } from '@/repository/userRequestsHistory';
import { sendRequestToChatGpt } from './chatGPTService';
import { sendRequestToGemini } from '@/services/geminiService';
import { AIProviders } from '@/utils/constants';

export const requestAIs = async (data: EthicForm, selectedAi?: AIProviders) => {
  // const chatGptResponse = await sendRequestToChatGpt(data);
  const geminiResponse = await sendRequestToGemini(data);
  console.log('geminiResponse', geminiResponse)
  console.log('data', data)
  
  return {
    // chatGptResponse,
    geminiResponse,
  };
};
