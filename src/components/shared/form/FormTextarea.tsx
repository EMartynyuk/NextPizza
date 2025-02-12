"use client";

import React from "react";
import { Textarea } from "@/components/ui";
import { useFormContext } from "react-hook-form";
import { ClearButton } from "..";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  name: string;
  label?: string;
  required?: boolean;
}

export const FormTextarea: React.FC<Props> = ({
  className,
  name,
  label,
  required,
  ...props
}) => {
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
      <span className="font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </span>

      <span className="relative">
        <Textarea {...register(name)} className="h-12 text-md" {...props} />

        {value && <ClearButton onClick={() => resetField(name)} />}
      </span>

      {errorText && <p className="text-red-500 text-sm mt-2">{errorText}</p>}
    </label>
  );
};
