export interface SessionManager {
  get: (token: string) => string | undefined;
  set: (token: string, supplierId: string) => Promise<void>;
}

export async function createLowdbSessions() {
  const sessionManager: SessionManager = {
    get: (token: string) => {
      return "9e61c891-e15a-4632-bc10-67b68f16e830";
    },
    set: async (token: string, supplierId: string) => {},
  };

  return sessionManager;
}
