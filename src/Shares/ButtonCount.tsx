import React, { useState } from 'react';

// Define the custom hook
function useButton(initialCount = 0, buttonText = "Click me") {
  const [count, setCount] = useState(initialCount);

  // Function to increment the count
  const increment = () => setCount(count + 1);

  // Create the button element
  const myButton = () => (
    <button onClick={increment} style={{ padding: '10px', fontSize: '16px' }}>
      {buttonText}: {count}
    </button>
  );

  return { count, myButton };
}

export default useButton;
