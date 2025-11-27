const storageService = {
  getItem: (key: string): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(key);
  },
  setItem: (key: string, value: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, value);
  },
  removeItem: (key: string): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  },
  clear: (): void => {
    if (typeof window === "undefined") return;
    localStorage.clear();
  },
  getAllItems: (): Record<string, string> => {
    if (typeof window === "undefined") return {};
    const items: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        items[key] = localStorage.getItem(key) || "";
      }
    }
    return items;
  },
};

export default storageService;
