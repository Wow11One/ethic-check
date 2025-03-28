'use client';

import { CheckboxForm } from '@/components/CheckboxForm';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Select from 'react-select';
import countryList from 'react-select-country-list';
import { Button } from '../Button';
import { FormInput } from '../FormInput';
import { useMemo, useState } from 'react';
import axios from 'axios';
import { ErrorMessage } from '@hookform/error-message';
import { toast } from 'react-toastify';
import { CheckResults, EthicForm } from '@/types/formTypes';
import OpenAI from 'openai';

interface IAIRequestFormProps {
  setLoading: (loading: boolean) => void;
  loading: boolean;
  checkResult: {
    geminiResponse: CheckResults[];
  };
  setCheckResults: (checkResult: { geminiResponse: CheckResults[] }) => void;
}

export const AIRequestForm = ({ loading, setLoading, setCheckResults }: IAIRequestFormProps) => {
  const { handleSubmit, register, control, formState } = useForm<EthicForm>();

  const onSubmit: SubmitHandler<EthicForm> = async (formData: EthicForm) => {
    try {
      if (
        !formData.language &&
        !formData.colorsAndSymbolism &&
        !formData.usability &&
        !formData.contentAndImagery &&
        !formData.localization
      ) {
        toast.error('Please select at least one check criteria!!!');
      }
      setLoading(true);
      toast.info('Check in progress, please wait a bit');
      const checkRequest = await axios.post('api/check-site', formData);

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
  const options = useMemo(() => countryList().getData(), []);

  return (
    <div className='flex justify-center items-center min-h-screen bg-black'>
      {/* <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-opacity-80 shadow-lg sm:rounded-3xl sm:p-3 w-full"> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col bg-gray-500/50 shadow-lg p-4 rounded-lg shadow-md max-w-2xl mx-auto'
      >
        <h2 className='text-xl text-center font-bold'>Cultural requirements</h2>
        <div className='grid grid-cols-2 gap-4'>
          <CheckboxForm
            disabled={loading}
            name='language'
            label='Language check'
            register={register}
          />
          <CheckboxForm
            disabled={loading}
            name='colorsAndSymbolism'
            label='Colors and symbolism check'
            register={register}
          />
          <CheckboxForm
            disabled={loading}
            name='usability'
            label='Usability check'
            register={register}
          />
          <CheckboxForm
            disabled={loading}
            name='contentAndImagery'
            label='Content and imagery check'
            register={register}
          />
          <CheckboxForm
            disabled={loading}
            name='localization'
            label='Localization check'
            register={register}
          />
        </div>
        <FormInput
          disabled={loading}
          validation={{ required: 'This is required.' }}
          name='url'
          label='Site url'
          register={register}
          errors={formState.errors}
        />
        <Controller
          name='country'
          control={control}
          rules={{
            required: 'This is required.',
          }}
          render={({ field }: { field: any }) => (
            <div className='flex items-center gap-3'>
              <label htmlFor='country' className='block mb-2'>
                Country
              </label>
              <Select
                isDisabled={loading}
                {...field}
                styles={{
                  option: styles => ({ ...styles, color: 'black' }),
                  control: styles => ({ ...styles, minWidth: 300 }),
                }}
                options={options}
              />
              <ErrorMessage errors={formState.errors} name='country' />
            </div>
          )}
        />
        <Button className='mt-2' disabled={loading} type='submit'>
          Submit
        </Button>
      </form>
    </div>
    //   </div>
    // </div>
  );
};
