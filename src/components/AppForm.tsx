import type { ChildrenProps, EventHandler } from "@/types";
import React, { ComponentProps } from "react";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  UseFormRegister,
  useForm,
  Path,
  UseFormProps as UseHookFormProps,
  UseFormReturn,
  SubmitHandler,
  useFormContext,
} from "react-hook-form";

type FormProps<T extends FieldValues> = Omit<
  ComponentProps<"form">,
  "onSubmit"
> & {
  form: UseFormReturn<T>;
  onSubmit: SubmitHandler<T>;
  submitLabel?: string;
};

type ControlProps<T extends FieldValues> = {
  name: Path<T>;
  register: UseFormRegister<T>;
};

type InputProps<T extends FieldValues> = Omit<ComponentProps<"input">, "name"> &
  ControlProps<T>;
  
type TextareaProps<T extends FieldValues> = Omit<ComponentProps<"textarea">, "name"> &
  ControlProps<T>;

type SelectProps<T extends FieldValues> = Omit<
  ComponentProps<"select">,
  "name"
> &
  ControlProps<T> & {
    options: Record<string, string>;
  };

export const Form = <T extends FieldValues>({
  form,
  children,
  onSubmit,
  submitLabel = "Submit",
  ...props
}: ChildrenProps & FormProps<T>) => {
  return (
    <FormProvider {...form}>
      <form method="dialog" onSubmit={form.handleSubmit(onSubmit)} {...props}>
        {React.Children.map(children, (child) => {
          return (child as unknown as JSX.Element)?.props?.name
            ? React.createElement((child as unknown as JSX.Element)?.type, {
                ...{
                  ...(child as unknown as JSX.Element).props,
                  register: form.register,
                  key: (child as unknown as JSX.Element).props.name,
                },
              })
            : child;
        })}
        <div className="mt-4 row justify-end">
          <button type="submit" className="btn">
            {submitLabel}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export const FieldError = ({
  name,
  className,
}: {
  name?: string;
  className?: string;
}) => {
  const { formState } = useFormContext();

  if (!name) return null;

  const error = formState?.errors[name];
  if (!error) return null;

  return (
    <span
      className={`px-1 text-red-400 ${className}"`}
    >{`${error.message}`}</span>
  );
};

export const Required = ({ name}: { name: string }) => (
  <span className="required">{name}</span>
)

export const Input = <T extends FieldValues>({
  register,
  name,
  ...rest
}: InputProps<T>) => <input {...register(name)} {...rest} />;

export const Textarea = <T extends FieldValues>({
  register,
  name,
  ...rest
}: TextareaProps<T>) => <textarea {...register(name)} {...rest} />;

export const Select = <T extends FieldValues>({
  register,
  name,
  options,
  ...rest
}: SelectProps<T>) => (
  <select {...register(name)} {...rest}>
    {Object.entries(options).map(([label, val], idx) => (
      <option key={idx} value={val}>
        {label}
      </option>
    ))}
  </select>
);
