import { useCreateMeso, useGetMesos } from "@/api/mesos";
import { ApiError, Meso, ValidationError } from "@/types";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Path, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Form, Input, Toggle } from "./AppForm";
import { toCamelCase } from "@/utils/helpers";

export const MesoForm = () => {
  const form = useForm<Meso>();
  const [mesos, setMesos] = useState<Meso[]>([]);
  const { data, error } = useGetMesos();

  const mutateAdd = useCreateMeso((oldData, newData) => [...oldData, newData]);

  const onSubmit = async (formData: Meso) => {
    try {
      await mutateAdd.mutateAsync({
        ...formData,
        startDate: Number.parseInt(`${formData.startDate}`),
        endDate: Number.parseInt(`${formData.endDate}`),
        maxMicros: Number.parseInt(`${formData.maxMicros}`),
        isActive: Boolean(formData.isActive) ?? false,
      });
    } catch (err) {
      const apiError: ApiError = (err as AxiosError)?.response
        ?.data as ApiError;
      console.log("API ERROR", (err as AxiosError)?.response?.data);
      apiError.fields?.forEach((f) => {
        const e = (apiError.stack as unknown as ValidationError[])?.find(
          (s: ValidationError) => s.path.toLowerCase() === f.toLowerCase(),
        );

        if (e)
          form.setError(toCamelCase(e.path) as Path<Meso>, {
            type: "custom",
            message: e.message,
          });
      });
      toast.error("Unable to create mesocyle");
    }
  };

  useEffect(() => {
    if (data) setMesos(data);
  }, [data]);

  useEffect(() => {
    if (error) toast.error("Unable to retrieve mesocycles");
  }, [error]);

  return (
    <>
      <Form form={form} onSubmit={onSubmit} className="col centered">
        <Input id="goal" name="goal" label="Goal" />
        <Input id="description" name="description" label="Description" />
        <Input
          id="startDate"
          name="startDate"
          label="Start Date"
          type="number"
        />
        <Input id="endDate" name="endDate" label="End Date" type="number" />
        <Input
          id="maxMicros"
          name="maxMicros"
          label="Max Micros"
          type="number"
        />
        <Toggle id="isActive" name="isActive" label="Is Active?" />
      </Form>
      <div style={{ marginTop: "8rem" }}>
        <h2>Mesos</h2>
        <ul>
          {mesos.length > 0 ? (
            mesos.map((m, idx) => <li key={idx}>{m.goal}</li>)
          ) : (
            <li key={0}>No data</li>
          )}
        </ul>
      </div>
    </>
  );
};
