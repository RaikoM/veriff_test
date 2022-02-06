import React from 'react';
import { createWrapper } from '../test-utils';
import App from '../App';
import * as api from '../api';
import { toast } from 'react-hot-toast';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, within } from '@testing-library/react';

// react-hot-toast required matchMedia
// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, 'matchMedia', { value: jest.fn() });

const mockChecks = [
  {
    id: 'aaa',
    priority: 10,
    description: 'Face on the picture matches face on the document'
  },
  {
    id: 'bbb',
    priority: 5,
    description: 'Veriff supports presented document'
  },
  {
    id: 'ccc',
    priority: 7,
    description: 'Face is clearly visible'
  },
  {
    id: 'ddd',
    priority: 3,
    description: 'Document data is clearly visible'
  }
];

const fetchSpy = jest.spyOn(api, 'fetchChecks');
const submitSpy = jest.spyOn(api, 'submitCheckResults');
const toastSpy = jest.spyOn(toast, 'error');

describe('App test', () => {
  test('Next check and submit are disabled if previous check is unanswered', async () => {
    fetchSpy.mockResolvedValueOnce(mockChecks);
    render(<App />, { wrapper: createWrapper() });
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    // Total of 4 checks
    const checks = screen.getAllByTestId('checkField');
    const submit = screen.getByRole('button', { name: /submit/i });
    checks.forEach((check, index) => {
      // Expect current check to not be disabled
      expect(check).not.toHaveAttribute('disabled');
      const nextChecks = checks.slice(index + 1);
      nextChecks.forEach(next => {
        // Expect every following check to be disabled
        expect(within(next).getByRole('button', { name: /yes/i })).toHaveAttribute('disabled');
        expect(within(next).getByRole('button', { name: /no/i })).toHaveAttribute('disabled');
        // Expect submit to be disabled until all checks have value
        expect(submit).toHaveAttribute('disabled');
      });
      userEvent.click(within(check).getByRole('button', { name: /yes/i }));
    });
    // Expect submit to be enabled after all checks are answered with yes
    expect(submit).not.toHaveAttribute('disabled');
  });

  test('Navigation works with arrow function', async () => {
    fetchSpy.mockResolvedValueOnce(mockChecks);
    render(<App />, { wrapper: createWrapper() });
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    const checks = screen.getAllByTestId('checkField');
    userEvent.keyboard('[ArrowUp]');
    // Because no other check was selected first one will be highlighted by arrow press
    expect(checks[0]).toHaveClass('bg-highlight');
    expect(checks[0]).not.toHaveClass('bg-primary');
    userEvent.keyboard('1');
    // Expects Yes to have received primary color and be checked
    expect(within(checks[0]).getByRole('button', { name: /yes/i })).toHaveClass('bg-primary');
    // After selecting value user can move down to next check
    userEvent.keyboard('[ArrowDown]');
    expect(checks[1]).toHaveClass('bg-highlight');
    // User can click 2 to select no
    userEvent.keyboard('2');
    expect(within(checks[1]).getByRole('button', { name: /no/i })).toHaveClass('bg-primary');

    // Because next check is disabled, arrow down does not change highlight
    userEvent.keyboard('[ArrowDown]');
    expect(checks[2]).not.toHaveClass('bg-highlight');

    // User can press 1 on highlighted field with selected check and value will change to yes
    userEvent.keyboard('1');
    expect(within(checks[1]).getByRole('button', { name: /no/i })).not.toHaveClass('bg-primary');
    expect(within(checks[1]).getByRole('button', { name: /yes/i })).toHaveClass('bg-primary');

    // Moving back up also move highlight to upper field
    userEvent.keyboard('[ArrowUp]');
    expect(checks[0]).toHaveClass('bg-highlight');
  });

  test('Submit displays success message', async () => {
    fetchSpy.mockResolvedValueOnce(mockChecks);
    submitSpy.mockRejectedValueOnce({ success: false });
    render(<App />, { wrapper: createWrapper() });
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    const checks = screen.getAllByTestId('checkField');
    const submit = screen.getByRole('button', { name: /submit/i });

    userEvent.click(within(checks[0]).getByRole('button', { name: /no/i }));
    userEvent.click(submit);
    // If submit fails, user will be shown error toast
    await waitFor(() => {
      expect(toastSpy).toHaveBeenCalledWith('Something went wrong!');
    });

    submitSpy.mockResolvedValueOnce([]);
    userEvent.click(submit);
    // Expect to see success message when submit succeeds
    await waitFor(() => {
      expect(screen.getByText(/success/i)).toBeInTheDocument();
    });
  });

  test('Display error when fetch fails', async () => {
    fetchSpy.mockRejectedValueOnce({ success: false });
    render(<App />, { wrapper: createWrapper() });
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(fetchSpy).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    // Expect submit button to be visible after clicking try again
    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    fetchSpy.mockResolvedValue([]);
    userEvent.click(tryAgainButton);

    expect(fetchSpy).toHaveBeenCalled();
    await waitFor(() => {
      expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });
});
