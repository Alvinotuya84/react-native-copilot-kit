import { useContext } from 'react';
import { CopilotContext } from '../contexts/CopilotContext';

export const useCopilot = () => {
  const context = useContext(CopilotContext);
  if (!context) {
    throw new Error('useCopilot must be used within a CopilotProvider');
  }
  return context;
};
