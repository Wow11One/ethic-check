import { register } from "module";
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface ICheckboxForm {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  validation?: RegisterOptions<any, string> | undefined;
  disabled?: boolean;
}

export const CheckboxForm = ({
  name,
  register,
  label,
  disabled,
}: ICheckboxForm) => {
  return (
    <div className="p-2">
      <label htmlFor="">{label}</label>
      <input
        disabled={disabled}
        type="checkbox"
        placeholder={name}
        {...register(name, {})}
        className="mx-3"
      />
    </div>
  );
};
