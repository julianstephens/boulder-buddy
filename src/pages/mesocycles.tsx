import { Loader } from "@/components/Loader";
import { CardButton } from "@/components/CardButton";
import { useMeso } from "@/hooks/useMeso";
import { api } from "@/utils/api";
import { formatTimestamp, isEmpty } from "@/utils/helpers";
import { Mesocycle } from "@prisma/client";
import { useEffect, useState } from "react";

const MesocyclePage = () => {
  const { update, updateMesoState } = useMeso();
  const [activeCycle, setActiveCycle] = useState<Mesocycle | null>(null);
  const [cycles, setCyles] = useState<Mesocycle[] | null>(null);
  const { data, isLoading } = api.cycle.getMesos.useQuery({});

  useEffect(() => {
    if (data) {
      const active = data.cycles.find((c: Mesocycle) => c.isActive);
      if (active) setActiveCycle(active);
      setCyles(
        active
          ? data.cycles.filter((c: Mesocycle) => c.id !== active.id)
          : data.cycles,
      );
    }
  }, [data]);

  const openModal = (m: Mesocycle) => {
    update(m);
    updateMesoState("show");
    (window as any).mesoModal.showModal();
  };

  return (
    <>
      <h3 className="mb-16">Mesocyles</h3>
      {isLoading ? (
        <Loader fullPage={true} />
      ) : (
        <>
          {activeCycle && (
            <div className="mb-10 w-full">
              <h4 className="mb-4 self-start font-bold">Active</h4>
              <CardButton
                onClick={(e) => {
                  openModal(activeCycle);
                }}
                className="success"
                data={[
                  activeCycle.schema,
                  activeCycle.goal,
                  `${formatTimestamp(
                    activeCycle.startDate,
                  )} - ${formatTimestamp(activeCycle.endDate)}`,
                ]}
              />
            </div>
          )}
          {cycles && !isEmpty(cycles) && (
            <>
              <h4 className="mb-4 self-start">Inactive cycles</h4>
              <div className="col w-full gap-4">
                {cycles.map((c, idx) => (
                  <div className="w-full" key={idx}>
                    <CardButton
                      onClick={(e) => {
                        openModal(c);
                      }}
                      data={[
                        c.schema,
                        c.goal,
                        `${formatTimestamp(c.startDate)} - ${formatTimestamp(
                          c.endDate,
                        )}`,
                      ]}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default MesocyclePage;
