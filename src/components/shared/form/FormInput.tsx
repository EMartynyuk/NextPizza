"use client";

import { Input } from "@/components/ui";
import { ClearButton, ErrorText, RequiredSymbol } from "..";
import { ComponentProps } from "react";
import { useFormContext } from "react-hook-form";

interface IFormInput extends ComponentProps<"input"> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput = ({
  className,
  name,
  label,
  required,
  ...props
}: IFormInput) => {
  const {
    register,
    formState: { errors },
    watch,
    resetField,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  return (
    <label className={className}>
      {label && (
        <span className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </span>
      )}

      <span className="relative block">
        <Input {...register(name)} className="h-12 text-md" {...props} />
        {value && <ClearButton onClick={() => resetField(name)} />}
      </span>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </label>
  );
};
