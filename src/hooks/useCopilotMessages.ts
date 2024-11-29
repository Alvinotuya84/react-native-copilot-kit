import { useCopilot } from './useCopilot';

export const useCopilotMessages = () => {
  const { messages, sendMessage } = useCopilot();
  return { messages, sendMessage };
};
