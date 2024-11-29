import { useCopilot } from './useCopilot';

export const useCopilotState = () => {
  const { isLoading, error, setError } = useCopilot();
  return { isLoading, error, setError };
};
