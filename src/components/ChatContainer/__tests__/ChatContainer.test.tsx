import { render, fireEvent } from '@testing-library/react-native';
import { ChatContainer } from '../';
import type { CopilotMessage } from '../../../types';

describe('ChatContainer', () => {
  const mockMessages: CopilotMessage[] = [
    {
      id: '1',
      content: 'Hello',
      role: 'user',
      createdAt: new Date(),
    },
    {
      id: '2',
      content: 'Hi there!',
      role: 'assistant',
      createdAt: new Date(),
    },
  ];

  it('renders messages correctly', () => {
    const { getByText } = render(
      <ChatContainer messages={mockMessages} onSendMessage={() => {}} />
    );

    expect(getByText('Hello')).toBeTruthy();
    expect(getByText('Hi there!')).toBeTruthy();
  });

  it('calls onSendMessage when sending a message', () => {
    const onSendMessage = jest.fn();
    const { getByPlaceholderText } = render(
      <ChatContainer messages={mockMessages} onSendMessage={onSendMessage} />
    );

    const input = getByPlaceholderText('Type a message...');
    fireEvent.changeText(input, 'New message');
    fireEvent(input, 'submitEditing');

    expect(onSendMessage).toHaveBeenCalledWith('New message');
  });
});
