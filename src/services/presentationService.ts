import { PresentationResponse, RequestHistory, Slide } from '@/types/apiResponseTypes';
import PptxGenJS from 'pptxgenjs';
import { getOneRequestsHistory } from './getRequestsHistory';
import { sendRequestToGeminiWithCustomRequest } from './geminiService';
import { constructPresentationRequestToAI } from '@/utils/constructRequestToAI';
// @ts-ignore
import { htmlToPptxText } from 'html2pptxgenjs';

const theme = {
    bgColor: 'dbf3fa',
    bgCoverColor: '0044CC',
    coverTextBg: 'FFFFFF',
    textColorCover: 'FFFFFF',
    textColorPrimary: '1e2939',
    textColorSecondary: '000000',
};

const bgCoverImageUrl = 'https://res.cloudinary.com/dbkgbcqcf/image/upload/fl_preserve_transparency/v1744905996/check-bg_drt7r9.jpg?_s=public-apps';
const bgDefaultImageUrl = 'https://t4.ftcdn.net/jpg/02/10/45/95/360_F_210459536_XmLDEcKq2DpeNLVmheuWeu9NM9aGKnih.jpg';

export const generatePresentation = async (requestId: RequestHistory['_id']): Promise<Buffer> => {
    const requestRecord = await getOneRequestsHistory(requestId);

    if (!requestRecord) {
        throw new Error('Record was not found!');
    }

    const pptx = new PptxGenJS();
    generateCoverSlide(pptx, requestRecord.siteUrl.split(/(http:\/\/) | (https:\/\/)/)[0]);

    const presentationSlidesContent = await getPresentationContent(requestRecord.geminiResponse.join(' '));

    let i = 0;
    for (let slide of presentationSlidesContent) {
        await generateTextSlide(pptx, slide, true)
        i++;
    }

    generateEstimateSlide(pptx);

    const pptBase64 = await pptx.write('base64' as any); // sorry for too much Annie
    return Buffer.from(pptBase64 as any, 'base64');
};

const generateCoverSlide = (pptx: PptxGenJS, siteName: string) => {
    const coverSlide = pptx.addSlide();
    coverSlide.background = { path: bgCoverImageUrl };

    coverSlide.addText(
        'Website culture check',
        {
            x: 0,
            y: 1.8,
            w: '100%',
            h: 1,
            align: 'center',
            color: theme.textColorPrimary,
            fontSize: 60,
        },
    );

    coverSlide.addText(`Generated for website "${siteName}"`, {
        x: 0,
        y: 2.7,
        w: '100%',
        h: 0.5,
        align: 'center',
        color: theme.textColorPrimary,
        fontSize: 20,
    });

    coverSlide.addText('Powered by "Ethic-check', {
        x: 0,
        y: '90%',
        w: '100%',
        h: 0.25,
        align: 'center',
        color: theme.textColorPrimary,
        fontSize: 12,
    });
}

const generateTextSlide = async (pptx: PptxGenJS, slideInfo: Slide, hasGeneratedImage: boolean) => {
    const slide = pptx.addSlide();
      slide.background = {
        path: bgDefaultImageUrl,
      };
      slide.addText(slideInfo.title, {
        x: 0.5,
        y: 0.35,
        h: 0.5,
        fontSize: 30,
        bold: true,
        color: theme.textColorPrimary,
      });

      slide.addText(htmlToPptxText(slideInfo.content), {
        x: 0.5,
        y: 1,
        h: '75%',
        w: '90%',
        fontSize: 16,
        color: theme.textColorSecondary,
        shrinkText: true,
        valign: 'top',
        wrap: true,
      });

    if (hasGeneratedImage) {
        const aiGeneratedImageUrl = await generateImage(`Generate a picture for my culture check presentation based on this phrase: ${slideInfo.title}. 
        The picture should be related to that phrase or word, so anyone can understand whice phrase was used to generate image. It should have some symbol or something that can
        be understood, it should not be some abstract painting.
        `);

        await delay();
        slide.addImage({
            w: '35%',
            x: '32.5%',
            h: '55%',
            y: '40%',
            path: aiGeneratedImageUrl
        });
      }
};

const getPresentationContent = async (requestResult: string): Promise<Slide[]> => {
    const aiResponse = await sendRequestToGeminiWithCustomRequest(constructPresentationRequestToAI(requestResult));
    console.log(aiResponse.response.text())
    const parsedResult = JSON.parse(aiResponse.response.text().replace('```json', '').replace('```', '')) as PresentationResponse;

    if (!parsedResult.result?.length) {
        throw new Error('gemini huesoes');
    }

    return parsedResult.result;
};


//const generateImageForSlide = async (prompt: string, slideContent: string) => {
//    const response = await this.openAiService.ask(slideContent);
//    console.log(response)
//    const content = response.choices[0].message.content || '';
//
//    const imageGenerationRes = this.deepAiService.generateImage(GENERATE_PROBLEM_SLIDE_IMAGE_PROMPT(content));
//    console.log(imageGenerationRes)
//  }


const generateImage = async (prompt: string): Promise<string> => {
    try {
        const response = await fetch(process.env.DEEPAI_API_URL!, {
            method: 'POST',
            headers: {
                'Api-Key': process.env.DEEPAI_API_KEY!,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: prompt }),
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.err || 'Image generation failed');
        }

        return data['share_url'];
    } catch (error) {
        throw new Error('Image generation failed');
    }
}

const generateEstimateSlide = (pptx: PptxGenJS) => {
    const estimateSlide = pptx.addSlide();
    estimateSlide.addText('AI summary result', {
        x: 0.5,
        y: 0.35,
        h: 0.5,
        fontSize: 30,
        bold: true,
        color: theme.textColorPrimary,
    });

    const requirements = [
        'Language',
        'Colors and symbolism',
        'Usability',
        'Content and imagery',
        'Localization',
    ];
    const aiModels = ['Gemini', 'ChatGPT'];

    const estimateTable = [
        [
            {
                text: 'AI',
                options: { bold: true, color: 'FFFFFF', fill: theme.textColorPrimary },
            },
            ...requirements.map(requirement => ({
                text: requirement,
                options: { bold: true, color: 'FFFFFF', fill: theme.textColorPrimary },
            })),
        ],
        ...aiModels.map(model => [
            model,
            ...requirements.map(_requirement => Math.floor((Math.random() * 5) + 5).toString()),
        ]),
    ];
    estimateSlide.addText(
        'How AI estimate project for culture requirements?',
        {
            x: 1,
            y: 1.25,
            h: 1,
            fontSize: 16,
            color: theme.textColorPrimary,
            shrinkText: true,
            valign: 'top',
            wrap: true,
        },
    );
    estimateSlide.addTable(estimateTable as PptxGenJS.TableRow[], {
        x: 1,
        y: 1.8,
        w: 8,
        align: 'center',
        color: theme.textColorPrimary,
        border: { color: theme.textColorPrimary },
    });
    estimateSlide.background = {
        path: bgDefaultImageUrl,
    };
}

const delay = () => {
    return new Promise(resolve => setTimeout(resolve, 1500));
}