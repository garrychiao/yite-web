import { createContext } from 'react';

export const FormContext = createContext(null);

export default function FormProvider({ form, children }) {
  return <FormContext.Provider value={form}>{children}</FormContext.Provider>;
}
