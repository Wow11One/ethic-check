import { EthicForm } from "@/types/formTypes";
import { sendRequestToChatGpt } from "./chatGPTService";

export const requestAIs = async (data: EthicForm) => {
  const chatGptResponse = await sendRequestToChatGpt(data);

  return {
    chatGptResponse,
  };
};
