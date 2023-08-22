import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import Datepicker from "react-tailwindcss-datepicker";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { CycleSchema, Mesocycle, Prisma } from "@prisma/client";
import { useSession } from "next-auth/react";
import { api } from "@/utils/api";
import toast from "react-hot-toast";
import { TRPCClientError } from "@trpc/client";
import { AppError } from "@/types";
import { fromTimestamp, toTimestamp, isEmpty } from "@/utils/helpers";
import { useMeso } from "@/hooks/useMeso";

type Mode = "create" | "update";

export const MesoModal = () => {
  const { meso, mesoState, update, updateMesoState } = useMeso();

  const { data: session } = useSession();

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [formMode, setMode] = useState<Mode>("create");

  const { register, handleSubmit, getValues, setValue, reset } = useForm<
    Prisma.MesocycleCreateInput | Prisma.MesocycleUpdateInput
  >({
    defaultValues: {
      ...(!isEmpty(meso)
        ? {
            goal: meso.goal,
            description: meso.description,
            isActive: meso.isActive,
            schema: meso.schema,
            startDate: fromTimestamp(meso.startDate),
          }
        : {}),
      user: {
        connect: {
          id: session?.user.id,
        },
      },
    },
  });

  const createMutation = api.cycle.createMeso.useMutation();
  const updateMutation = api.cycle.updateMeso.useMutation();

  const handleDates = (dates: any) => {
    const { startDate: start } = dates;

    if (start) {
      const selectedSchema = getValues().schema;
      const cycleDuration =
        selectedSchema === CycleSchema.BOULDER_GAIN
          ? 6
          : selectedSchema === CycleSchema.ROUTE_GAIN
          ? 10
          : 1;
      setStartDate(start);
      const end = dayjs(start).add(cycleDuration, "w").toDate();
      setValue("startDate", toTimestamp(start));
      setValue("endDate", toTimestamp(end));
    }
  };

  const createMeso = async (data: Prisma.MesocycleCreateInput) => {
    const formData = {
      ...data,
      description: data.description || null,
    } satisfies Prisma.MesocycleCreateInput;

    try {
      await createMutation.mutateAsync(formData);
      closeModal();
      toast.success("Mesocycle created!");
    } catch (err) {
      toast.error((err as AppError).message);
      handleDates({ startDate: dayjs.unix(formData.startDate).toDate() });
    }
  };

  const updateMeso = async (data: Prisma.MesocycleUpdateInput) => {
    debugger;
    const formData = {
      ...data,
      description: data.description || null,
    } satisfies Prisma.MesocycleUpdateInput;

    try {
      await updateMutation.mutateAsync({ data: formData, id: meso.id });
      closeModal();
      toast.success("Mesocycle updated!");
    } catch (err) {
      toast.error((err as AppError).message);
      handleDates({ startDate: dayjs.unix(formData.startDate).toDate() });
    }
  };

  const formLabel = () => (formMode === "create" ? "Create" : "Update");

  const closeModal = () => {
    (window as any).mesoModal.close();
    updateMesoState("hide");
    reset();
    setStartDate(null);
  };

  useEffect(() => {
    if (!isEmpty(meso)) {
      setValue("description", meso.description);
      setValue("goal", meso.goal);
      setValue("isActive", meso.isActive);
      setValue("schema", meso.schema);
      setStartDate(fromTimestamp(meso.startDate));
      setMode("update");
    }
  }, [meso, mesoState]);

  return (
    <dialog id="mesoModal" className="modal">
      <form
        method="dialog"
        onSubmit={
          formMode === "create"
            ? handleSubmit(createMeso)
            : handleSubmit(updateMeso)
        }
        className="col max-h-3/4 modal-box max-w-5xl justify-between overflow-y-scroll"
      >
        <div className="row w-full justify-between">
          <h3 className="text-lg font-bold">{formLabel()} Mesocycle</h3>
          <button
            type="button"
            onClick={closeModal}
            className="btn tooltip tooltip-left bg-transparent hover:bg-transparent"
            data-tip="Close"
          >
            <FiX size={20} />
          </button>
        </div>
        <div className="col h-full w-full gap-5">
          <div className="row w-full">
            <div className="col w-full">
              <label htmlFor="desc">
                Description
                <input
                  {...register("description")}
                  className="required w-full"
                  type="text"
                  name="description"
                  id="description"
                />
              </label>
            </div>
          </div>
          <div className="row w-full">
            <div className="col w-full">
              <label htmlFor="goal">
                <span className="required">Goal</span>
                <input
                  {...register("goal")}
                  className="w-full"
                  type="text"
                  name="goal"
                  id="goal"
                  required
                />
              </label>
            </div>
          </div>
          <div className="row w-full">
            <div className="col w-2/4">
              <label htmlFor="end">
                <span className="required">Cycle Schema</span>
                <select
                  {...register("schema")}
                  name="schema"
                  id="schema"
                  required
                >
                  <option value={CycleSchema.BOULDER_GAIN}>
                    6 Week Boulder Gain Training (3-2-1)
                  </option>
                  <option value={CycleSchema.ROUTE_GAIN}>
                    10 Week Route Gain Training (4-3-2-1)
                  </option>
                  <option value={CycleSchema.DUP}>
                    1 Week Daily Undulating Periodization (Maintenance)
                  </option>
                </select>
              </label>
            </div>
            <div className="col w-2/4">
              <label htmlFor="start">
                <span className="required">Start Date</span>
                <Datepicker
                  asSingle={true}
                  inputClassName="input input-bordered w-full text-base-content"
                  toggleClassName="absolute right-0 top-1 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
                  displayFormat="DD.MM.YYYY"
                  value={{
                    startDate:
                      typeof startDate === "number"
                        ? fromTimestamp(startDate)
                        : startDate,
                    endDate:
                      typeof startDate === "number"
                        ? fromTimestamp(startDate)
                        : startDate,
                  }}
                  onChange={handleDates}
                />
              </label>
            </div>
          </div>
          <div className="row w-full">
            <div className="col w-full items-start">
              <label className="row label w-fit cursor-pointer">
                Activate Cycle?
                <input
                  {...register("isActive")}
                  type="checkbox"
                  className="checkbox h-8 w-6"
                />
              </label>
            </div>
          </div>
        </div>
        <div className="self-end">
          <button type="submit" className="btn">
            {formLabel()}
          </button>
        </div>
      </form>
    </dialog>
  );
};
