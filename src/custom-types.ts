class ConfirmationModalData {
  title: string;
  content: string;
}

class State {
  fetching?: boolean;
  error?: string | null;
  [key: string]: any;
}

export {
  ConfirmationModalData,
  State,
};
