// pages/posts/1-experiment.tsx
import React from "react";

export const title = "Experiment";

const Experiment: React.FC = () => {
  return (
    <div>
      <h2>Hello, World!</h2>
      <p>This is the Experiment component.</p>
      <iframe
        src="/sketches/3-explode.html"
        style={{ width: "100%", height: "400px", border: "none" }}
      ></iframe>
    </div>
  );
};

export default Experiment;
