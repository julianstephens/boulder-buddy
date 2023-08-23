import { useBoundStore } from "@/store";
import { ButtonHandler } from "@/types";

export const useMetadata = () => {
  const pageTitle = useBoundStore((state) => state.pageTitle);
  const updatePageTitle = useBoundStore((state) => state.updatePageTitle);
  const actionButton = useBoundStore((state) => state.actionButton);
  const updateActionButton = useBoundStore((state) => state.updateActionButton);
  const showActionButton = useBoundStore((state) => state.showActionButton);
  const updateShowActionButton = useBoundStore(
    (state) => state.updateShowActionButton,
  );
  const actionHandler = useBoundStore((state) => state.actionHandler);
  const updateActionHandler = useBoundStore(
    (state) => state.updateActionHandler,
  );

  const updateTitle = (t: string) => {
    updatePageTitle(t);
  };
  const updateButton = (b: string) => {
    updateActionButton(b);
  };
  const updateShowButton = (s: boolean) => {
    updateShowActionButton(s);
  };
  const updateHandler = (h: ButtonHandler) => {
    updateActionHandler(h);
  };

  const initialize = (
    title: string,
    showButton: boolean,
    button?: string,
    handler?: ButtonHandler,
  ) => {
    updateTitle(title);
    updateShowButton(showButton);

    if (button && handler) {
      updateButton(button);
      updateHandler(handler);
    }
  };

  return {
    pageTitle,
    updatePageTitle: updateTitle,
    actionButton,
    updateActionButton: updateButton,
    showActionButton,
    updateShowActionButton: updateShowButton,
    actionHandler,
    updateActionHandler: updateHandler,
    initialize,
  };
};
