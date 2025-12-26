declare module 'alpinejs' {
  export interface Alpine {
    data(name: string, component: () => AlpineComponent): void;
    store(name: string, store?: object): any;
    magic(name: string, callback: () => any): void;
    start(): void;
  }

  export interface AlpineComponent {
    [key: string]: any;
    $nextTick?: (callback: () => void) => void;
  }

  const Alpine: Alpine;
  export default Alpine;
}

interface Window {
  Alpine: import('alpinejs').Alpine;
}
