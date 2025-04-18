import { CheckResults } from '@/types/formTypes';
import { downloadBlob, parseFilename } from '@/utils/downloadUtils';
import axios from 'axios';
import { MoveLeftIcon, Presentation } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';

export const AIResponseDisplay = ({
  onReturn,
  checkResult,
  loading,
  requestId,
}: {
  onReturn: () => void;
  checkResult: {
    geminiResponse: CheckResults[];
  };
  loading: boolean;
  requestId: string;
}) => {
  const [isDownloadingPresentation, setIsDownloadingPresentation] = useState<boolean>(false);

  const handlePresentationDownload = async () => {
    try {
      setIsDownloadingPresentation(() => true);
      const response = await axios.get('api/presentation', {
        responseType: 'blob',
        params: { requestId },
      });
      const blob = response.data;
      downloadBlob(blob, 'Culture check presentation.pptx');
    } catch (exception: any) {
      toast.error('Error occurred while generating presentation');
    } finally {
      setIsDownloadingPresentation(() => false);
    }
  };

  return (
    <div className={`flex flex-col ${loading ? 'justify-center items-center' : ''}`}>
      {loading ? (
        <div role='status'>
          <svg
            aria-hidden='true'
            className='w-16 h-16 text-white animate-spin dark:text-gray-600 fill-blue-600'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
          <span className='sr-only'>Loading...</span>
        </div>
      ) : null}
      {checkResult.geminiResponse.length > 0 ? (
        <div className='bg-white dark:bg-zinc-950 text-black dark:text-white'>
          <h2 className='inline-flex gap-3 font-semibold text-lg items-center dark:text-white px-5 pt-5'>
            <button
              onClick={onReturn}
              className='p-1 border-2 border-gray-700 rounded-xl transition-all duration-300 hover:text-white hover:bg-gray-700'
            >
              <MoveLeftIcon className='size-5' />
            </button>

            <span>Results</span>
          </h2>
          <div className='p-5'>
            {checkResult.geminiResponse.map((el, index) => (
              <div
                className='prose prose-h3:mt-0 prose-h2:mt-0 !min-w-full dark:prose-invert'
                key={index}
                dangerouslySetInnerHTML={{
                  __html: el.content?.replace(/```html/i, '')?.replace(/```/i, ''),
                }}
              />
            ))}
          </div>
        </div>
      ) : null}

      <hr className='mb-5 w-[90%] mx-auto' />
      <div className='flex justify-center mb-5'>
        <button
          className='flex items-center gap-3 border-2 border-gray-700 p-2 text-gray-700 rounded-xl transition-all duration-300 hover:text-white hover:bg-gray-700 dark:hover:bg-white dark:hover:!text-black dark:border-white group'
          onClick={handlePresentationDownload}
        >
          {isDownloadingPresentation && <Spinner sizeClasses='size-6' />}
          {!isDownloadingPresentation && (
            <Presentation className='size-6 dark:text-white dark:group-hover:text-black' />
          )}
          <div className='font-bold dark:text-white dark:group-hover:text-black'>
            Download presentation
          </div>
        </button>
      </div>
    </div>
  );
};
