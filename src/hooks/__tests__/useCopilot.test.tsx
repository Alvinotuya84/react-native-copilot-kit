import { renderHook, act } from '@testing-library/react-hooks';
import { CopilotProvider } from '../../contexts/CopilotContext';
import { useCopilot } from '../useCopilot';

describe('useCopilot', () => {
  it('throws error when used outside provider', () => {
    const { result } = renderHook(() => useCopilot());
    expect(result.error).toEqual(
      Error('useCopilot must be used within a CopilotProvider')
    );
  });

  it('provides copilot context', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CopilotProvider>{children}</CopilotProvider>
    );

    const { result } = renderHook(() => useCopilot(), { wrapper });

    expect(result.current).toHaveProperty('messages');
    expect(result.current).toHaveProperty('sendMessage');
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('error');
  });

  it('sends message successfully', async () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <CopilotProvider>{children}</CopilotProvider>
    );

    const { result } = renderHook(() => useCopilot(), { wrapper });

    await act(async () => {
      await result.current.sendMessage('Hello');
    });

    expect(result.current.messages).toHaveLength(2);
    expect(result?.current?.messages[0]?.content ?? '').toBe('Hello');
  });
});
