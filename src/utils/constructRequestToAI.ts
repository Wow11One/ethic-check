import { CheckParams } from '@/types/formTypes';

const AI_REQUEST_PROPERTY_BY_PARAMETER: Record<keyof CheckParams, string> = {
  language: 'language',
  colorsAndSymbolism: 'colors and symbolism',
  usability: 'usability',
  contentAndImagery: 'content and imagery',
  localization: 'localization',
};

export const constructRequestToAI = (
  url: string,
  country: string,
  checkParameters: CheckParams,
) => {
  const baseRequestString = `Please, check the website URL ${url} for each of such cultural requirements as`;
  const endOfRequestString = `for use in ${country}. If needed advise on what to fix up for each requirement. You MUST answer me ONLY in HTML format so I could insert it to react component html, and do not add \`\`\`html to response. 
  You can also add a little amount of basic CSS styles or HTML tags for styling.
  Be more specific with your answers, provide some real example or descriptions from the URL I provided you.
  `;
  const requestStringWithParameters = (
    Object.entries(checkParameters) as Array<[keyof CheckParams, boolean]>
  ).reduce((acc, [key, value]) => {
    if (value) {
      return `${acc} ${AI_REQUEST_PROPERTY_BY_PARAMETER[key]},`;
    }
    return acc;
  }, baseRequestString);
  return `${requestStringWithParameters} ${endOfRequestString}`;
};


export const constructPresentationRequestToAI = (
  requestResult: string,
): string => {
  const baseRequestString = `
    I am building a web site, which will analyse links for culture requirements (using AI) and return a result in html format.
    I want to be able to generate a text for the presentation based on AI html result. So, i am going to provide you the text in HTML format
    and you should return a JSON object, which contains array with info about slide. The result should look like:
    {
      result: [
        {
          "title": "Usability"
          "content": "<p><b>Analysis:</b> The website appears to have a standard layout, clear navigation, and is generally user-friendly. The search functionality is visible, and content is organized into logical categories.</p>"
        },
        {
          "title": "Colors and Symbolism"
          "content": "<p><b>Analysis:</b> The website uses the EU's official colors (blue and yellow/gold) which are generally considered to be culturally neutral within the EU. The European flag and related symbols are also used appropriately.</p>"
        },
        {
          "title": "Language"
          "content": "<p><b>Potential Improvements:</b></p> <ul><li><span class="font-semibold">Clarity of Translation:</span> Ensure consistently high-quality translations to avoid misinterpretations or awkward phrasing.  Consider user feedback mechanisms for translation quality.</li><li><span class="font-semibold">Language Consistency:</span> Verify that all elements, including metadata and alt text, are properly translated for each language.</li></ul>"
        },
      ]
    }

    So, you should return the array of objects, where the "title" is a plain string and "content" is HTML-formatted output. Do not add markdown tags to the slides content.
    The content should be not be big, from 2 to 4 sentences. You should always follow the structure of your result, nevertheless, the title and content should be based on the URL-link analysis, i gave you.
    The titles can't be different from example, but it should describe the slide topic. You should generate from 3 to 5 slides, based on how much data you were provided.

    Here is the HTML-formatted analysis: ${requestResult}
  `;
  
  return baseRequestString;
};
