import type { ChildrenProps, EventHandler } from "@/types";
import type { EditMode } from "@/types/store";
import { capitalCase } from "@/utils/helpers";
import { FiX } from "react-icons/fi";

type Props = {
  modalId: string;
  modalMode: EditMode;
  resource: string;
  closeHandler: EventHandler;
};

export const AppModal = ({
  children,
  modalId,
  modalMode,
  resource,
  closeHandler,
}: ChildrenProps & Props) => {
  return (
    <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
      <div className="col max-h-3/4 modal-box max-w-5xl justify-between overflow-y-scroll">
        <div className="row w-full justify-between">
          <h3 className="text-lg font-bold">
            {`${capitalCase(modalMode)} ${resource}`}
          </h3>
          <button
            type="button"
            onClick={closeHandler}
            className="btn tooltip tooltip-left bg-transparent hover:bg-transparent"
            data-tip="Close"
          >
            <FiX size={20} />
          </button>
        </div>
        <div className="row full">{children}</div>
      </div>
    </dialog>
  );
};
