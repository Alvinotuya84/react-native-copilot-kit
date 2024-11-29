import React, { createContext, useReducer, useCallback } from 'react';
import type {
  CopilotContextValue,
  CopilotMessage,
  CopilotConfig,
  CopilotContextState,
} from '../types';

const initialState: CopilotContextState = {
  messages: [],
  isLoading: false,
  error: null,
};

type Action =
  | { type: 'ADD_MESSAGE'; message: CopilotMessage }
  | { type: 'SET_LOADING'; isLoading: boolean }
  | { type: 'SET_ERROR'; error: Error | null }
  | { type: 'RESET_CHAT' };

const reducer = (
  state: CopilotContextState,
  action: Action
): CopilotContextState => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.error,
      };
    case 'RESET_CHAT':
      return initialState;
    default:
      return state;
  }
};

export const CopilotContext = createContext<CopilotContextValue | null>(null);

export interface CopilotProviderProps {
  children: React.ReactNode;
  config?: CopilotConfig;
}

export const CopilotProvider: React.FC<CopilotProviderProps> = ({
  children,
  config,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    messages: config?.defaultMessages || [],
  });

  const sendMessage = useCallback(async (content: string) => {
    try {
      dispatch({ type: 'SET_LOADING', isLoading: true });

      const userMessage: CopilotMessage = {
        id: Date.now().toString(),
        content,
        role: 'user',
        createdAt: new Date(),
      };

      dispatch({ type: 'ADD_MESSAGE', message: userMessage });

      // TODO: Implement AI service call here
      // For now, just echo back the message
      const assistantMessage: CopilotMessage = {
        id: (Date.now() + 1).toString(),
        content: `Received: ${content}`,
        role: 'assistant',
        createdAt: new Date(),
      };

      dispatch({ type: 'ADD_MESSAGE', message: assistantMessage });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', error: error as Error });
    } finally {
      dispatch({ type: 'SET_LOADING', isLoading: false });
    }
  }, []);

  const resetChat = useCallback(() => {
    dispatch({ type: 'RESET_CHAT' });
  }, []);

  const setError = useCallback((error: Error | null) => {
    dispatch({ type: 'SET_ERROR', error });
  }, []);

  return (
    <CopilotContext.Provider
      value={{
        ...state,
        sendMessage,
        resetChat,
        setError,
      }}
    >
      {children}
    </CopilotContext.Provider>
  );
};
