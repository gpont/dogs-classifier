const TIME = 500;

// A mock function to mimic making an async request for data
export const fetchCount = async (amount: number = 1) =>
  new Promise<{ data: number }>((resolve: (res: { data: number }) => void) =>
    setTimeout(() => resolve({ data: amount }), TIME),
  );
