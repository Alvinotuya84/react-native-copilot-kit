import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import type { ChatInputProps } from '../../types';

export const ChatInput: React.FC<ChatInputProps> = ({
  onSend,
  isLoading = false,
  placeholder = 'Type a message...',
  style,
  inputStyle,
  disabled = false,
}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={[
          styles.input,
          inputStyle,
          {
            maxHeight: 100,
          },
        ]}
        value={message}
        onChangeText={setMessage}
        placeholder={placeholder}
        placeholderTextColor="#999"
        multiline
        editable={!disabled}
        onSubmitEditing={handleSend}
        submitBehavior="newline"
      />
      <TouchableOpacity
        style={[
          styles.sendButton,
          (!message.trim() || isLoading) && styles.disabled,
        ]}
        onPress={handleSend}
        disabled={!message.trim() || isLoading || disabled}
      >
        {isLoading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <View style={styles.sendArrow} />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E5E5E5',
  },
  input: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  disabled: {
    backgroundColor: '#B4B4B4',
  },
  sendArrow: {
    width: 15,
    height: 15,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: '#FFFFFF',
    transform: [{ rotate: '45deg' }, { translateX: -2 }],
  },
});
