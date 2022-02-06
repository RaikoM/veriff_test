import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

export const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // No need to retry fetching in tests so turn it off
        retry: false,
        cacheTime: Infinity
      }
    }
  });
  // eslint-disable-next-line react/display-name
  return ({ children }: { children: ReactNode }) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
