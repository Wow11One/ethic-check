import { EthicForm } from "@/types/formTypes";
import { constructRequestToAI } from "@/utils/constructRequestToAI";
import OpenAI from "openai";

export const sendRequestToChatGpt = async (body: EthicForm) => {
  const requestString = constructRequestToAI(body.url, body.country.label, {
    localization: body.localization,
    language: body.language,
    colorsAndSymbolism: body.colorsAndSymbolism,
    contentAndImagery: body.contentAndImagery,
    usability: body.usability,
  });

  const chatGPTClient = new OpenAI({
    apiKey: process.env.CHAT_GPT_SECRET,
  });

  const aiResponse = await chatGPTClient.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: requestString,
      },
    ],
  });
  return aiResponse.choices;
};
