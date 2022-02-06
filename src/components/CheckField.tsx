import React, { useEffect, useState } from 'react';
import Button from './Button';
import { FieldRenderProps, useForm, useFormState } from 'react-final-form';
import { CheckResult } from '../types';
import { joinClassNames } from '../utils';

interface CheckProps extends FieldRenderProps<CheckResult> {
  checkId: string;
  description: string;
  index: number;
}

const CheckField = ({ checkId, description, index, input }: CheckProps) => {
  const [disableField, setDisableField] = useState(true);
  const { change } = useForm();
  const {
    active,
    values: { checks }
  } = useFormState<{ checks: CheckResult[] }>();
  const {
    value: { value },
    onFocus,
    onBlur,
    name
  } = input;

  useEffect(() => {
    const previousFields = checks.slice(0, index);
    // Disable field if every previous check answer is not yes OR one of the previous check answer is no
    const arePreviousValid = !previousFields.every(({ value }) => value === 'yes') || previousFields.some(({ value }) => value === 'no');
    // Never disable first checks field
    setDisableField(index !== 0 && arePreviousValid);
  }, [checks, index]);

  return (
    <div
      className={joinClassNames(disableField ? '' : active === name ? 'bg-highlight' : 'hover:bg-lightgrey', 'py-2 px-4')}
      id="checkField"
    >
      <p className={`pb-2 cursor-default ${disableField ? 'opacity-40' : ''}`}>{description}</p>
      <Button
        disabled={disableField}
        selected={value === 'yes'}
        onFocus={onFocus}
        onBlur={onBlur}
        type="button"
        onClick={() => change(input.name, { checkId, value: 'yes' })}
        className="rounded-none rounded-tl rounded-bl border-r-0"
      >
        Yes
      </Button>
      <Button
        disabled={disableField}
        selected={value === 'no'}
        onFocus={onFocus}
        onBlur={onBlur}
        type="button"
        onClick={() => change(input.name, { checkId, value: 'no' })}
        className="rounded-none rounded-tr rounded-br"
      >
        No
      </Button>
    </div>
  );
};

export default CheckField;
