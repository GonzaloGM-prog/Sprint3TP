import { useState } from "react";

function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);

  const toggle = () => {
    setValue((previousValue) => !previousValue);
  };

  return [value, toggle];
}

export default useToggle;