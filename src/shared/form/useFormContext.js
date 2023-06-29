import { useContext } from 'react';
import { FormContext } from './FormProvider';

export default function useFormContext() {
  return useContext(FormContext);
}
