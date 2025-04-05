import { MouseEvent, PropsWithChildren } from 'react';

interface IButtonProps {
  onClick?: (e: MouseEvent) => void;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
  className?: string;
}

export const Button = ({
  onClick,
  children,
  type,
  disabled,
  className,
}: PropsWithChildren<IButtonProps>) => {
  return (
    <button disabled={disabled} type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
};
