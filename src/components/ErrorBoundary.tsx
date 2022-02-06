import React, { ReactNode } from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { useQueryErrorResetBoundary } from 'react-query';
import Button from './Button';

interface ErrorBoundaryProps {
  children: ReactNode;
}

const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ReactErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary }) => (
        <div className="flex flex-col align-middle justify-center">
          There was an error!
          <Button className="mt-4" onClick={() => resetErrorBoundary()}>
            Try again
          </Button>
        </div>
      )}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
