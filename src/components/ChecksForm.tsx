import React, { useEffect } from 'react';
import { Field, useForm, useFormState } from 'react-final-form';
import { Check, CheckResult } from '../types';
import CheckField from './CheckField';
import Submit from './Submit';

interface FormFieldsProps {
  data: Check[];
  onSubmit: () => void;
}

const getActiveFieldIndex = (active?: string) => +(active?.match(/\d+/g) ?? 0);

const ChecksForm = ({ data, onSubmit }: FormFieldsProps) => {
  const { focus, blur, change } = useForm();
  const {
    active,
    values: { checks }
  } = useFormState();

  useEffect(() => {
    const handleArrowKeyPress = (key: 'ArrowDown' | 'ArrowUp') => {
      // Field name has a format of `checks[0]`. Active field value will be its name.
      const activeFieldIndex = getActiveFieldIndex(active);

      // If no field is active focus on first field. This usually happens at the start of form.
      if (!active) {
        focus('checks[0]');
      } else if (key === 'ArrowDown') {
        // Only move to next field if it is enabled. Otherwise, keep current field selected.
        const isNextFieldEnabled = checks[activeFieldIndex].value === 'yes';
        // Move down one field if not on last field
        if (activeFieldIndex + 1 < checks.length && isNextFieldEnabled) {
          // final-form decides to not focus on visited/touched fields unless current active field is blurred
          blur(active ?? '');
          focus(`checks[${activeFieldIndex + 1}]`);
        }
        // Move up one field if not on first field
      } else if (activeFieldIndex > 0) {
        // final-form decides to not focus on visited/touched fields unless current active field is blurred
        blur(active ?? '');
        focus(`checks[${activeFieldIndex - 1}]`);
      }
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowUp':
          handleArrowKeyPress(e.key);
          return;
        case '1':
        case '2': {
          if (active) {
            change(active, { ...checks[getActiveFieldIndex(active)], value: e.key === '1' ? 'yes' : 'no' });
          }
          return;
        }
        default:
          return;
      }
    };
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [active, data.length, focus, blur, change, checks]);

  return (
    <form onSubmit={onSubmit} id="checks-form">
      {data
        .sort((a, b) => a.priority - b.priority)
        .map(({ id, description }, index) => (
          <Field name={`checks[${index}]`} key={id} component={CheckField} description={description} checkId={id} index={index} />
        ))}
      <Submit />
    </form>
  );
};

export default ChecksForm;
