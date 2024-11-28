import React, { useRef, useEffect } from 'react';
import {
  //   View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import type { ChatContainerProps } from '../../types';
import { ChatInput } from '../ChatInput';
import { ChatMessage } from '../ChatMessage';

export const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  onSendMessage,
  isLoading = false,
  style,
  containerStyle,
  inputProps,
  messageProps,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <KeyboardAvoidingView
      style={[styles.container, style]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <ScrollView
        ref={scrollViewRef}
        style={[styles.messagesContainer, containerStyle]}
        contentContainerStyle={styles.messagesContent}
        keyboardShouldPersistTaps="handled"
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} {...messageProps} />
        ))}
      </ScrollView>

      <ChatInput onSend={onSendMessage} isLoading={isLoading} {...inputProps} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
});
