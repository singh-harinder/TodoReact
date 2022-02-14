import { ChangeEvent, useEffect, useState } from 'react';

type TodoInputs = {
  title?: string;
  description?: string;
};

type UserInputs = {
  name?: string;
  email?: string;
  password?: string;
};

type Inputs = TodoInputs & UserInputs;

export default function useForm(initialState: Inputs) {
  const [inputs, setInputs] = useState<Inputs>(initialState);

  const initialValues = Object.values(initialState).join('');

  useEffect(() => {
    setInputs(initialState);
  }, [initialValues]);

  function handleChange(
    e: ChangeEvent<HTMLInputElement> & ChangeEvent<HTMLTextAreaElement>
  ) {
    const { value, name, type } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initialState);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key, value]) => [key, ''])
    );
    setInputs(blankState);
  }

  return {
    inputs,
    handleChange,
    clearForm,
    resetForm,
  };
}
