import { render, act } from '@testing-library/react-native';
import { CopilotProvider, CopilotContext } from '../CopilotContext';

describe('CopilotProvider', () => {
  it('provides initial state', () => {
    let contextValue;

    render(
      <CopilotProvider>
        <CopilotContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </CopilotContext.Consumer>
      </CopilotProvider>
    );

    expect(contextValue).toMatchObject({
      messages: [],
      isLoading: false,
      error: null,
    });
  });

  it('adds messages when sendMessage is called', async () => {
    let contextValue: any;

    render(
      <CopilotProvider>
        <CopilotContext.Consumer>
          {(value) => {
            contextValue = value;
            return null;
          }}
        </CopilotContext.Consumer>
      </CopilotProvider>
    );

    await act(async () => {
      await contextValue.sendMessage('Hello');
    });

    expect(contextValue.messages).toHaveLength(2); // User message and assistant response
    expect(contextValue.messages[0].role).toBe('user');
    expect(contextValue.messages[1].role).toBe('assistant');
  });
});
