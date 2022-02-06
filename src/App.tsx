import React from 'react';
import { Toaster } from 'react-hot-toast';
import Checks from './components/Checks';
import ErrorBoundary from './components/ErrorBoundary';

export default function App() {
  return (
    <div className="font-sans bg-gray-50 flex flex-col items-center justify-center h-screen mx-auto">
      <Toaster />
      <ErrorBoundary>
        <Checks />
      </ErrorBoundary>
    </div>
  );
}
