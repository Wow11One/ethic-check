'use client';

import { CheckboxForm } from '@/components/CheckboxForm';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { Button } from '../Button';
import { FormInput } from '../FormInput';
import { useEffect, useMemo, useState } from 'react';
import axios, { HttpStatusCode } from 'axios';
import { ErrorMessage } from '@hookform/error-message';
import { toast } from 'react-toastify';
import { CheckResults, EthicForm } from '@/types/formTypes';
import { ChevronDown, Cog } from 'lucide-react';
import { useOutsideClick } from '@/hooks/dom.hooks';
import { useWalletModal, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useAuth } from '@clerk/nextjs';
import { Transaction } from '@solana/web3.js';
import { v4 } from 'uuid';
import { RequestHistory } from '@/types/apiResponseTypes';

export interface IAIRequestFormState {
  data: {
    language: boolean;
    colorsAndSymbolism: boolean;
    usability: boolean;
    contentAndImagery: boolean;
    localization: boolean;
    country?: string;
    url?: string;
  };
  errors?: any;
}

interface IAIRequestFormProps {
  setLoading: (loading: boolean) => void;
  loading: boolean;
  checkResult: {
    geminiResponse: CheckResults[];
  };
  setCheckResults: (checkResult: { geminiResponse: CheckResults[] }) => void;
}

export const initialState: IAIRequestFormState = {
  data: {
    language: false,
    colorsAndSymbolism: false,
    usability: false,
    contentAndImagery: false,
    localization: false,
  },
};

export function AIRequestForm({ loading, setLoading, setCheckResults }: IAIRequestFormProps) {
  const { handleSubmit, register, control, formState } = useForm<EthicForm>();
  const [isCountriesDropdownVisible, setIsCoutnriesDropdownVisible] = useState(false);
  const countriesDropdownListRef = useOutsideClick(() => setIsCoutnriesDropdownVisible(false));
  const [state, setState] = useState(initialState);
  const walletModal = useWalletModal();
  const wallet = useWallet();
  const user = useAuth();
  const { connection } = useConnection();
  const PAGE_LIMIT = 1;

  const handleNFTMint = async () => {
    if (wallet.publicKey && wallet.signTransaction) {
      const { status, data } = await axios.post('api/onchain/soulbound', {
        userId: v4(),
        address: wallet.publicKey,
      });

      if (status !== HttpStatusCode.Created) {
        throw new Error('Failed mint soulbound request');
      }

      const { serializedTransaction } = data;

      const decodedTransaction = Buffer.from(serializedTransaction, 'base64');
      const transaction = Transaction.from(decodedTransaction);

      const signedTransaction = await wallet.signTransaction(transaction);
      const signature = await wallet.sendTransaction(signedTransaction, connection);

      console.log(signature);
    }
  };

  const onSubmit: SubmitHandler<EthicForm> = async (_formData: EthicForm) => {
    try {
      if (
        !state.data.language &&
        !state.data.colorsAndSymbolism &&
        !state.data.usability &&
        !state.data.contentAndImagery &&
        !state.data.localization
      ) {
        return toast.error('Please select at least one check criteria');
      }

      if (!state.data.country?.trim()) {
        return toast.error('Please select the country');
      }

      if (!state.data.url?.trim()) {
        return toast.error('Please select the url');
      }

      setLoading(true);
      toast.info('Check in progress, please wait a bit');

      const checkRequest = await axios.post('api/check-site', state.data);

      setCheckResults({
        geminiResponse: checkRequest.data.geminiResponse.map((el: any) => ({
          content: el.content,
        })),
      });

      toast.success('Check successfully finished');
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const countries = useMemo(() => countryList().getData(), []);

  return (
    <div className='flex flex-col'>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col rounded-lg'>
        <h2 className='inline-flex gap-3 font-semibold text-lg items-center dark:text-white px-5 pt-5'>
          <Cog className='size-6' />
          <span>Cultural requirements</span>
        </h2>
        <div className='flex flex-col p-5 gap-2'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10 mt-5'>
            <label className='inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                value=''
                className='sr-only peer'
                defaultChecked={state.data.language}
                onChange={event =>
                  setState({ ...state, data: { ...state.data, language: event.target.checked } })
                }
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              <span className='ms-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
                Language
              </span>
            </label>
            <label className='inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                value=''
                className='sr-only peer'
                defaultChecked={state.data.colorsAndSymbolism}
                onChange={event =>
                  setState({
                    ...state,
                    data: { ...state.data, colorsAndSymbolism: event.target.checked },
                  })
                }
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              <span className='ms-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
                Colors and symbolism
              </span>
            </label>
            <label className='inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                value=''
                className='sr-only peer'
                defaultChecked={state.data.usability}
                onChange={event =>
                  setState({ ...state, data: { ...state.data, usability: event.target.checked } })
                }
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              <span className='ms-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
                Usability
              </span>
            </label>
            <label className='inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                value=''
                className='sr-only peer'
                defaultChecked={state.data.colorsAndSymbolism}
                onChange={event =>
                  setState({
                    ...state,
                    data: { ...state.data, colorsAndSymbolism: event.target.checked },
                  })
                }
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              <span className='ms-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
                Content and imagery
              </span>
            </label>
            <label className='inline-flex items-center cursor-pointer'>
              <input
                type='checkbox'
                value=''
                className='sr-only peer'
                defaultChecked={state.data.localization}
                onChange={event =>
                  setState({
                    ...state,
                    data: { ...state.data, localization: event.target.checked },
                  })
                }
              />
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
              <span className='ms-3 text-sm font-medium text-gray-900 dark:text-gray-300'>
                Localization
              </span>
            </label>
          </div>
          <div className='flex flex-col'>
            <label
              htmlFor='check-url'
              className='-mb-2 ms-2 px-1 bg-white dark:bg-zinc-800 rounded relative z-2 inline-flex self-start font-medium text-xs text-zinc-400'
            >
              Url
            </label>
            <input
              defaultValue={state.data.url}
              type='text'
              id='check-url'
              placeholder='https://google.com'
              className='border p-2 rounded-lg dark:bg-zinc-50/10 dark:text-white dark:ring-zinc-100/30 dark:border-zinc-100/10 border-zinc-100 focus:ring-2 focus:ring-zinc-800 outline-none text-zinc-600'
              onChange={event => {
                setState({
                  ...state,
                  data: { ...state.data, url: event.target.value },
                });
              }}
            />
          </div>
          <div className='flex flex-col relative'>
            <label
              htmlFor='check-country'
              className='-mb-2 ms-2 px-1 bg-white dark:bg-zinc-800 relative z-2 inline-flex self-start font-medium text-xs text-zinc-400 rounded'
            >
              Country
            </label>
            <span
              id='check-country'
              className='select-none bg-zinc-50 dark:bg-zinc-50/10 dark:text-white dark:ring-zinc-100/30 dark:border-zinc-100/10 cursor-pointer border p-2 rounded-lg border-zinc-100 focus:ring-zinc-800 focus:ring-[2px] focus:border-transparent text-zinc-600 inline-flex justify-between items-center'
              onClick={() => setIsCoutnriesDropdownVisible(true)}
              tabIndex={0}
            >
              {countries.find(country => country.label === state.data.country)?.label ||
                'Choose country...'}
              <ChevronDown className='size-4' />
            </span>
            {isCountriesDropdownVisible && (
              <div
                ref={countriesDropdownListRef as any}
                className='absolute flex z-100 flex-col w-full top-full mt-2 bg-white dark:bg-zinc-800 dark:border-zinc-100/10 rounded-lg max-h-[150px] overflow-y-auto shadow border border-zinc-100 p-1'
              >
                {countries.map((country, index) => (
                  <span
                    key={index}
                    onClick={() => {
                      setState({ ...state, data: { ...state.data, country: country.label } });
                      setIsCoutnriesDropdownVisible(false);
                    }}
                    className='py-1 px-2 hover:bg-zinc-50 dark:hover:bg-zinc-100/10 rounded dark:text-white transition-all duration-300 cursor-pointer text-sm text-zinc-500'
                  >
                    {country.label}
                  </span>
                ))}
              </div>
            )}
          </div>
          <Button
            className='mt-2 border cursor-pointer px-5 py-2 bg-zinc-950 text-white border-zinc-950 dark:hover:bg-gray-200 hover:bg-zinc-800 rounded-lg dark:bg-white dark:text-black transition-all duration-300'
            disabled={loading}
            type='submit'
          >
            Submit
          </Button>
          {!wallet.publicKey ? (
            <Button
              className='mt-2 border cursor-pointer px-5 py-2 text-black border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-100/10 dark:border-gray-100/10 rounded-lg dark:text-white transition-all duration-300'
              disabled={loading}
              type='button'
              onClick={() => {
                walletModal.setVisible(true);
              }}
            >
              Choose Wallet
            </Button>
          ) : (
            <Button
              className='mt-2 border cursor-pointer px-5 py-2 text-black border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-100/10 dark:border-gray-100/10 rounded-lg dark:text-white transition-all duration-300'
              disabled={loading}
              type='button'
              onClick={() => handleNFTMint()}
            >
              Upgrade to "Enterprise" (1 SOL + NFT minting fee)
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
