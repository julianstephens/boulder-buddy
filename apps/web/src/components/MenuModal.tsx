import { NavMenu } from "@/components/NavMenu";

export const MenuModal = () => {
  return (
    <dialog id="menuModal" className="modal modal-bottom sm:modal-middle">
      <form method="dialog" className="modal-box">
        <h3 className="mb-10">Menu</h3>
        <NavMenu />
        <div className="modal-action">
          <button className="btn">Close</button>
        </div>
      </form>
    </dialog>
  );
};
