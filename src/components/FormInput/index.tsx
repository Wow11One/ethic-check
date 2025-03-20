import { ErrorMessage } from "@hookform/error-message";
import { FieldErrors, RegisterOptions, UseFormRegister } from "react-hook-form";

interface IFormInput {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  validation?: RegisterOptions<any, string> | undefined;
  errors?: FieldErrors;
  disabled?: boolean;
}

export const FormInput = ({ label, name, register, errors, validation, disabled }: IFormInput) => {
  return (
    <div className="md:flex md:items-center mb-6">
      <div>
        <label className="block md:text-right mb-1 md:mb-0 pr-4">
          {label}
        </label>
      </div>
      <div>
        <input
          {...register(name, validation)}
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          type="text"
          disabled={disabled}
        />
      </div>
      <ErrorMessage errors={errors} name={name} />
    </div>
  );
};
