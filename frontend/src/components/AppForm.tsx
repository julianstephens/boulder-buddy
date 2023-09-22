import type { ChildrenProps } from "@/types";
import React, { ComponentProps } from "react";
import {
  Controller,
  FieldValues,
  FormProvider,
  Path,
  SubmitHandler,
  UseFormRegister,
  UseFormReturn,
  useFormContext,
} from "react-hook-form";
import ReactSelect from "react-select";

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
  register?: UseFormRegister<T>;
};

type InputProps<T extends FieldValues> = Omit<ComponentProps<"input">, "name"> &
  ControlProps<T> & {
    label?: string;
  };

type TextareaProps<T extends FieldValues> = Omit<
  ComponentProps<"textarea">,
  "name"
> &
  ControlProps<T>;

type SelectProps<T extends FieldValues> = Omit<
  ComponentProps<"select">,
  "name"
> &
  Omit<ControlProps<T>, "register"> & {
    options: Record<string, string>;
    control: any;
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
      <form
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        {...props}
      >
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
        <div className="row mt-4 justify-end">
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
    <span className={`px-1 text-red-400 ${className}"`}>{`${
      error.message as string
    }`}</span>
  );
};

export const Required = ({ name }: { name: string }) => (
  <span className="required">{name}</span>
);

export const Input = <T extends FieldValues>({
  name,
  label,
  register,
  ...rest
}: InputProps<T>) => {
  if (!register) return;
  return (
    <div className="col justify-start w-fit">
      {label && <label htmlFor={name}>{label}</label>}
      <input {...register(name)} {...rest} />
      <FieldError name={name} />
    </div>
  );
};

export const Textarea = <T extends FieldValues>({
  name,
  register,
  ...rest
}: TextareaProps<T>) => {
  if (!register) return;
  return <textarea {...register(name)} {...rest} />;
};

// export const Select = <T extends FieldValues>({
//   register,
//   name,
//   options,
//   ...rest
// }: SelectProps<T>) => (
//   <select {...register(name)} {...rest}>
//     {Object.entries(options).map(([label, val], idx) => (
//       <option key={idx} value={val}>
//         {label}
//       </option>
//     ))}
//   </select>
// );

export const Select = <T extends FieldValues>({
  name,
  options,
  control, // ...rest
}: SelectProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value } }) => (
      <ReactSelect onChange={onChange} value={value} options={options as any} />
    )}
  />
);

export const Toggle = <T extends FieldValues>(props: InputProps<T>) => {
  return <Input {...props} type="checkbox" className="toggle" />;
};
