import React from "react";

function WrapperContainer({ children }) {
  return <div className="px-10 md:px-16 lg:px-40">{children}</div>;
}

export default WrapperContainer;
