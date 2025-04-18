import { saveNewRequestToUserHistory } from '@/repository/userRequestsHistory';
import { EthicForm } from '@/types/formTypes';
import { constructRequestToAI } from '@/utils/constructRequestToAI';
import OpenAI from 'openai';

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
    model: 'gpt-4o-search-preview',
    messages: [
      {
        role: 'user',
        content: requestString,
      },
    ],
  });

  saveNewRequestToUserHistory(
    body.url,
    body.country.label,
    {
      colorsAndSymbolism: body.colorsAndSymbolism,
      contentAndImagery: body.colorsAndSymbolism,
      language: body.language,
      usability: body.usability,
      localization: body.localization,
    },
    aiResponse.choices.reduce<{ content: string }[]>((acc, curr) => {
      acc.push({ content: curr.message.content || '' });
      return acc;
    }, []),
  );

  return aiResponse.choices;
};
