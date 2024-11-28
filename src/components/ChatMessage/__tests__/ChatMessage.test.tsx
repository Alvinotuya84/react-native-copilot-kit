import { render } from '@testing-library/react-native';
import { ChatMessage } from '../';
import type { CopilotMessage } from '../../../types';

describe('ChatMessage', () => {
  it('renders user message correctly', () => {
    const message: CopilotMessage = {
      id: '1',
      content: 'Hello!',
      role: 'user',
      createdAt: new Date(),
    };

    const { getByText } = render(<ChatMessage message={message} />);
    expect(getByText('Hello!')).toBeTruthy();
  });

  it('renders assistant message correctly', () => {
    const message: CopilotMessage = {
      id: '2',
      content: 'Hi there!',
      role: 'assistant',
      createdAt: new Date(),
    };

    const { getByText } = render(<ChatMessage message={message} />);
    expect(getByText('Hi there!')).toBeTruthy();
  });
});
