import { isEmpty } from "@/utils/helpers";
import toast from "react-hot-toast";
import { Prisma } from "db";
import { useForm } from "react-hook-form";
import { Form, Input, Textarea, Required } from "./AppForm";
import { AppModal } from "./AppModal";

export const RoutineModal = () => {
  const form = useForm<Prisma.RoutineCreateInput>();

  // const createMutation = api.routine.createRoutine.useMutation();

  const createRoutine = () => {};

  const closeModal = () => {
    (window as any).routineModal.close();
    form.reset();
  };

  const submit = async (data: Prisma.RoutineCreateInput) => {
    const formData = {
      name: data.name,
      ...(!isEmpty(data.duration) && data.duration > 0
        ? { duration: data.duration }
        : {}),
      ...(!isEmpty(data.note.create.text) ? { note: { ...data.note } } : {}),
    } satisfies Prisma.RoutineCreateInput;

    try {
      await createMutation.mutateAsync(formData);
      toast.success("Routine created!");
    } catch (err) {
      console.error(err);
      // toast.error((err as AppError).message);
    }
  };

  return (
    <AppModal
      modalId="routineModal"
      modalMode="create"
      resource="Routine"
      closeHandler={closeModal}
    >
      <Form className="full" form={form} onSubmit={submit}>
        <label htmlFor="name" className="w-full">
          <Required name="Name" />
          <Input
            type="text"
            className="w-full"
            id="name"
            name="name"
            register={form.register}
            required
          />
        </label>
        <label htmlFor="duration" className="w-full">
          Duration (minutes)
          <Input
            type="number"
            className="w-full"
            id="duration"
            name="duration"
            register={form.register}
          />
        </label>
        <label htmlFor="note" className="w-full">
          Note
          <Textarea
            type="text"
            rows={5}
            className="w-full"
            id="note"
            name="note.create.text"
            register={form.register}
          />
        </label>
      </Form>
    </AppModal>
  );
};
