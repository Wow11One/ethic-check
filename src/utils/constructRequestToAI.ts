import { CheckParams } from "@/types/formTypes";

const AI_REQUEST_PROPERTY_BY_PARAMETER: Record<keyof CheckParams, string> = {
  language: "language",
  colorsAndSymbolism: "colors and symbolism",
  usability: "usability",
  contentAndImagery: "content and imagery",
  localization: "localization",
};

export const constructRequestToAI = (
  url: string,
  country: string,
  checkParameters: CheckParams
) => {
  const baseRequestString = `Please, check the website URL ${url} for each of such cultural requirements as`;
  const endOfRequestString = `for use in ${country}. If needed advise on what to fix up for each requirement`
  const requestStringWithParameters = (Object.entries(checkParameters) as Array<[keyof CheckParams, boolean]>).reduce(
    (acc, [key, value]) => {
      if (value) {
        return `${acc} ${AI_REQUEST_PROPERTY_BY_PARAMETER[key]},`;
      }
      return acc;
    },
    baseRequestString
  );
  return `${requestStringWithParameters} ${endOfRequestString}`
};




