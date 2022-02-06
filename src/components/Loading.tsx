import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col justify-center align-middle">
      <span className="text-lg text-center">Loading</span>
      <div className="inline-block relative w-20 h-20 loader">
        <div className="left-2 animate-ellipsis_1" />
        <div className="left-2 animate-ellipsis_2" />
        <div className="left-8 animate-ellipsis_2" />
        <div className="left-14 animate-ellipsis_3" />
      </div>
    </div>
  );
};

export default Loading;
