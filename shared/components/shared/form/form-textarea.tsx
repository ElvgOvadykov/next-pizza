import { useFormContext } from "react-hook-form";
import { Textarea } from "../../ui";
import { ErrorText } from "../error-text";
import { RequiredSymbol } from "../required-symbol";
import { ClearButton } from "../clear-button";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormTextarea: React.FC<Props> = ({
  className,
  label,
  name,
  required,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const errorText = errors[name]?.message as string;
  const text = watch(name);
  const onClickClear = () => {
    setValue(name, "", { shouldValidate: true });
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}
      <div className="relative">
        <Textarea className="text-base" {...register(name)} {...props} />

        {text && <ClearButton onClick={onClickClear} className="top-7" />}
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
