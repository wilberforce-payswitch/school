import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="w-full h-[2px] overflow-hidden">
      <div
        className="h-full w-full bg-blue-700 animate-[loaderMove_2s_infinite_linear] blur-[1px]"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent, white 30%, white 70%, transparent)",
          maskImage:
            "linear-gradient(to right, transparent, white 30%, white 70%, transparent)",
        }}
      ></div>
    </div>
  );
};

export default Loader;
