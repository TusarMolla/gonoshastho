interface FBQ {
  (method: 'init', pixelId: string): void;
  (method: 'track', eventName: string, parameters?: Record<string, any>): void;
  (method: 'trackCustom', eventName: string, parameters?: Record<string, any>): void;
  (method: 'set', parameters: Record<string, any>): void;
  callMethod?: (method: string, ...args: any[]) => void;
  queue?: any[];
  loaded?: boolean;
  version?: string;
}

declare global {
  interface Window {
    fbq: FBQ;
    _fbq: FBQ;
  }
}

export {};