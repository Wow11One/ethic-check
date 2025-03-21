import { EthicForm } from "@/types/formTypes";
import { saveNewRequestToUserHistory } from "@/repository/userRequestsHistory";
import { sendRequestToChatGpt } from "./chatGPTService";

export const requestAIs = async (data: EthicForm) => {
  const chatGptResponse = await sendRequestToChatGpt(data);
  saveNewRequestToUserHistory(
    data.url,
    data.country.label,
    {
      colorsAndSymbolism: data.colorsAndSymbolism,
      contentAndImagery: data.colorsAndSymbolism,
      language: data.language,
      usability: data.usability,
      localization: data.localization,
    },
    chatGptResponse.reduce<{ content: string }[]>((acc, curr) => {
      acc.push({ content: curr.message.content || "" });
      return acc;
    }, [])
  );
  return {
    chatGptResponse,
  };
};
