import React, { useEffect, useState } from 'react';
import Button from './Button';
import { useFormState } from 'react-final-form';
import { CheckResult } from '../types';

const Submit = () => {
  const {
    values: { checks = [] },
    submitting
  } = useFormState<{ checks: CheckResult[] }>();
  const [enabled, setEnabled] = useState<boolean>(false);

  useEffect(() => {
    setEnabled(checks.every(({ value }) => value === 'yes') || checks.some(({ value }) => value === 'no'));
  }, [checks]);

  return (
    <div className="flex justify-end mt-20 mr-2">
      <Button
        selected={enabled}
        disabled={!enabled || submitting}
        type="submit"
        className="disabled:bg-lightgrey border-none h-full py-1 px-6 uppercase"
      >
        submit
      </Button>
    </div>
  );
};

export default Submit;
