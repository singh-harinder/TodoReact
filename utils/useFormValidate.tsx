import { useState } from 'react';

export default function useFormValidate() {
  // Create a state to handle errors
  const [formError, setFormError] = useState(false);

  //   Check for errors and handle them
  function handleError(inputs) {
    if (inputs.password.length < 8) {
      setFormError(true);
      return true;
    }
  }

  return {
    formError,
    setFormError,
    handleError,
  };
}
