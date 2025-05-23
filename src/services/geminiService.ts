import { saveNewRequestToUserHistory } from '@/repository/userRequestsHistory';
import { EthicForm } from '@/types/formTypes';
import { constructRequestToAI } from '@/utils/constructRequestToAI';
import { DynamicRetrievalMode, GenerateContentResult, GoogleGenerativeAI } from '@google/generative-ai';

export const sendRequestToGemini = async (body: EthicForm) => {
  const requestString = constructRequestToAI(body.url, body.country.label, {
    localization: body.localization,
    language: body.language,
    colorsAndSymbolism: body.colorsAndSymbolism,
    contentAndImagery: body.contentAndImagery,
    usability: body.usability,
  });

  const response = await sendRequestToGeminiWithCustomRequest(requestString);

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
    [{ content: response.response.text() }],
  );

  return [{ content: response.response.text() }];
};

export const sendRequestToGeminiWithCustomRequest = async (requestString: string): Promise<GenerateContentResult> => {
  const geminiClient = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY || '');
  const model = geminiClient.getGenerativeModel({
    model: 'gemini-2.0-flash',
  });

  return model.generateContent([requestString]);
};
