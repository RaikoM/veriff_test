import React from 'react';
import { useMutation, useQuery } from 'react-query';
import { fetchChecks, submitCheckResults } from '../api';
import { Form } from 'react-final-form';
import ChecksForm from './ChecksForm';
import { CheckResult } from '../types';
import { toast } from 'react-hot-toast';
import Success from './Success';
import Loading from './Loading';

const Checks = () => {
  const { data = [], isLoading } = useQuery('checks', fetchChecks, {
    retry: false,
    useErrorBoundary: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  });
  const { mutateAsync, isSuccess } = useMutation('submit', (checks: CheckResult[]) => submitCheckResults(checks));

  const handleSubmit = async ({ checks }: { checks: CheckResult[] }) => {
    try {
      // Filter out checks that have no value.
      const selectedChecks = checks.filter(({ value }) => value);
      await mutateAsync(selectedChecks);
    } catch (e) {
      toast.error('Something went wrong!');
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isSuccess) {
    return <Success />;
  }

  return (
    <div className="w-90">
      <Form
        onSubmit={handleSubmit}
        keepDirtyOnReinitialize
        initialValues={{ checks: data.map(({ id }) => ({ checkId: id })) }}
        render={({ handleSubmit }) => <ChecksForm data={data} onSubmit={handleSubmit} />}
      />
    </div>
  );
};

export default Checks;
