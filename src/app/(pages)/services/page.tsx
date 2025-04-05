'use client';

import { AIRequestForm } from '@/components/AIRequestForm';
import { AIResponseDisplay } from '@/components/AIResponseDisplay/AIResponseDisplay';
import { CheckResults } from '@/types/formTypes';
import { CircleX, FolderClock } from 'lucide-react';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { v7 as uuid } from 'uuid';

const requests: {
  id: string;
  url: string;
  datetime: Date;
}[] = [
  {
    id: uuid(),
    url: 'https://api.example.com/users',
    datetime: new Date('2025-04-05T22:12:00Z'),
  },
  {
    id: uuid(),
    url: 'https://api.example.com/logs',
    datetime: new Date('2025-04-04T17:45:13Z'),
  },
  {
    id: uuid(),
    url: 'https://api.example.com/notifications_3',
    datetime: new Date('2025-04-04T09:30:00Z'),
  },
  {
    id: uuid(),
    url: 'https://api.example.com/files',
    datetime: new Date('2025-04-03T18:00:00Z'),
  },
  {
    id: uuid(),
    url: 'https://api.example.com/messages',
    datetime: new Date('2025-04-03T08:45:00Z'),
  },
  {
    id: uuid(),
    url: 'https://api.example.com/notifications_2',
    datetime: new Date('2025-04-02T14:10:00Z'),
  },
  {
    id: uuid(),
    url: 'https://api.example.com/settings',
    datetime: new Date('2025-04-01T23:55:00Z'),
  },
  {
    id: uuid(),
    url: 'https://api.example.com/notifications',
    datetime: new Date('2025-03-29T11:20:00Z'),
  },
  {
    id: uuid(),
    url: 'https://api.example.com/reports',
    datetime: new Date('2025-03-28T13:00:00Z'),
  },
  {
    id: uuid(),
    url: 'https://api.example.com/comments',
    datetime: new Date('2025-03-26T07:30:00Z'),
  },
  {
    id: uuid(),
    url: 'https://api.example.com/profile',
    datetime: new Date('2025-03-24T15:45:00Z'),
  },
  {
    id: uuid(),
    url: 'https://api.example.com/auth',
    datetime: new Date('2025-03-20T06:15:00Z'),
  },
  {
    id: uuid(),
    url: 'https://api.example.com/analytics',
    datetime: new Date('2025-03-17T02:05:00Z'),
  },
  {
    id: uuid(),
    url: 'https://api.example.com/posts',
    datetime: new Date('2025-03-01T12:00:00Z'),
  },
];

const ServicesPage = () => {
  const [checkResult, setCheckResults] = useState<{
    geminiResponse: CheckResults[];
  }>({
    geminiResponse: [],
  });

  const [loading, setIsLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [showTopShadow, setShowTopShadow] = useState(false);
  const [showBottomShadow, setShowBottomShadow] = useState(false);

  const datetimeFormatter = useMemo(
    () => new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }),
    [],
  );

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    setShowTopShadow(el.scrollTop > 0);
    setShowBottomShadow(el.scrollTop + el.clientHeight < el.scrollHeight);
  };

  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <div className='flex flex-1 bg-white dark:bg-zinc-950 border-red-500 relative'>
      <aside className='max-w-[320px] flex flex-col flex-1 bg-white dark:bg-zinc-950 text-zinc-800 sticky top-0 gap-5 border-r border-r-gray-100 dark:border-r-gray-100/5 dark:border-t dark:border-t-gray-100/5'>
        <h2 className='inline-flex gap-3 font-semibold text-lg items-center dark:text-white px-5 pt-5'>
          <FolderClock className='size-6' />
          <span>Requests history</span>
        </h2>
        <div className='flex flex-col gap-2 flex-1 w-full relative px-5 pb-5'>
          {requests.length > 0 && showTopShadow && (
            <div className='pointer-events-none absolute top-0 left-0 right-0 h-4 z-10 bg-gradient-to-b from-black/10 to-transparent dark:from-gray-100/10' />
          )}
          {requests.length > 0 && showBottomShadow && (
            <div className='pointer-events-none absolute bottom-0 left-0 right-0 h-4 z-10 bg-gradient-to-t from-black/10 to-transparent dark:from-gray-100/10' />
          )}
          <div className='flex flex-col gap-2 flex-1 w-full relative'>
            <div
              ref={scrollRef}
              className='absolute overflow-y-auto pe-5 -me-5 left-0 right-0 top-0 bottom-0 rounded'
              onScroll={handleScroll}
            >
              <div className='flex flex-col gap-2 h-full'>
                {!requests.length && (
                  <div className='flex flex-col flex-1 border-2 border-dashed rounded-xl justify-center items-center gap-3 text-center'>
                    <CircleX className='size-10 text-stone-600' />
                    <span className='text-stone-600'>The request history is empty</span>
                  </div>
                )}
                {requests[0] &&
                  (new Date().getDate() !== requests[0].datetime.getDate() ||
                    new Date().getMonth() !== requests[0].datetime.getMonth() ||
                    new Date().getFullYear() !== requests[0].datetime.getFullYear()) && (
                    <span className='text-xs text-gray-500 dark:text-gray-300 mt-2'>Today</span>
                  )}
                {requests.map((request, index) => (
                  <Fragment key={request.id}>
                    <div
                      key={request.id}
                      className='border rounded-lg p-2 inline-flex justify-between hover:bg-gray-100 transition-all duration-300 cursor-pointer dark:hover:bg-gray-100/5 dark:text-white'
                    >
                      <span className='text-sm'>{request.url}</span>
                    </div>
                    {requests[index + 1] &&
                      (request.datetime.getDate() !== requests[index + 1].datetime.getDate() ||
                        request.datetime.getMonth() !== requests[index + 1].datetime.getMonth() ||
                        request.datetime.getFullYear() !==
                          requests[index + 1].datetime.getFullYear()) && (
                        <span className='text-xs text-gray-500 dark:text-gray-300 mt-2'>
                          {datetimeFormatter.format(requests[index + 1].datetime)}
                        </span>
                      )}
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>
      <div className='flex flex-col flex-1'>
        {showResult ? (
          <div className='flex flex-col relative flex-1'>
            <div className='absolute left-0 top-0 right-0 bottom-0 overflow-y-auto'>
              <div className='flex flex-col'>
                <AIResponseDisplay checkResult={checkResult} loading={loading} />
              </div>
            </div>
          </div>
        ) : (
          <div className='flex flex-col'>
            <AIRequestForm
              setCheckResults={result => {
                setShowResult(true);
                setCheckResults(result);
              }}
              setLoading={setIsLoading}
              loading={loading}
              checkResult={checkResult}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
