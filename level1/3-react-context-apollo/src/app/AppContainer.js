import React from "react";

const AppContainer = ({ nav, main }) => {
  console.log("### AppContainer:");
  return (
    <div>
      <div>{nav}</div>
      <div>{main}</div>
    </div>
  );
};

export default React.memo(AppContainer);
