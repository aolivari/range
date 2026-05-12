import React from "react";

interface RangeProps {
  isFixed?: boolean;
}

const Range: React.FC<RangeProps> = ({ isFixed = false }) => {
  return (
    <div
      style={{
        padding: "1rem",
        border: "1px solid var(--primary)",
        borderRadius: "8px",
        margin: "1rem 0",
      }}
    >
      {isFixed ? (
        <p>Soy un range con valores fijos</p>
      ) : (
        <p>Soy un range normal</p>
      )}
    </div>
  );
};

export default Range;
