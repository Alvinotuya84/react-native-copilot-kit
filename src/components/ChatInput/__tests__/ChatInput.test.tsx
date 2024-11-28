import { render, fireEvent } from '@testing-library/react-native';
import { ChatInput } from '../';

describe('ChatInput', () => {
  it('calls onSend when send button is pressed', () => {
    const onSend = jest.fn();
    const { getByPlaceholderText } = render(<ChatInput onSend={onSend} />);

    const input = getByPlaceholderText('Type a message...');
    fireEvent.changeText(input, 'Hello World');
    fireEvent(input, 'submitEditing');

    expect(onSend).toHaveBeenCalledWith('Hello World');
  });

  it('disables send button when input is empty', () => {
    const onSend = jest.fn();
    const { getByTestId } = render(<ChatInput onSend={onSend} />);

    const sendButton = getByTestId('send-button');
    expect(sendButton.props.disabled).toBeTruthy();
  });
});
