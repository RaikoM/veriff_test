import React from 'react';

const Success = () => {
  return (
    <div className="h-1/6">
      <div className="flex justify-center align-middle">
        <div className="w-16 h-16 rounded-full z-0 absolute bg-primary scale-110 animate-success" />
        <div className="w-16 h-16 rounded-full z-10 relative bg-white scale-100 animate-success">
          <div
            className="before:content-[''] before:block before:h-1 before:bg-primary before:absolute before:w-4 before:top-[58%] before:left-[23%] before:rotate-[50deg]
                    after:content-[''] after:block after:h-1 after:bg-primary after:absolute after:w-8 after:top-1/2 after:left-[33%] after:rotate-[-50deg]"
          />
        </div>
      </div>
      <h3 className="text-xl py-6">Success</h3>
    </div>
  );
};

export default Success;
