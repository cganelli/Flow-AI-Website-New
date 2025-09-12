declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement | null;
        prefill?: Record<string, string>;
        utm?: Record<string, string>;
      }) => void;
      closePopupWidget: () => void;
      showPopupWidget: (url: string) => void;
    };
  }
}

export {};
