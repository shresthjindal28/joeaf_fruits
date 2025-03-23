import React from 'react'
import { memo } from 'react';

const Loader = memo(() => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white bg-opacity-80 fixed top-0 left-0 z-50">
      <div className="h-16 w-16 animate-spin rounded-full border-8 border-solid border-primary border-t-transparent"></div>
    </div>
  );
});

Loader.displayName = 'Loader';
export default Loader;