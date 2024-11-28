import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { ChatMessageProps } from '../../types';

export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  //   isLoading = false,
  //   animate = true,
  style,
  textStyle,
}) => {
  const isUser = message.role === 'user';

  return (
    <View
      style={[
        styles.container,
        isUser ? styles.userMessage : styles.assistantMessage,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          isUser ? styles.userText : styles.assistantText,
          textStyle,
        ]}
      >
        {message.content}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 12,
    maxWidth: '80%',
    marginVertical: 4,
  },
  userMessage: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  assistantMessage: {
    backgroundColor: '#E9E9EB',
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
  },
  userText: {
    color: '#FFFFFF',
  },
  assistantText: {
    color: '#000000',
  },
});
