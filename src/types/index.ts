import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface CopilotMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  createdAt: Date;
}

export interface CopilotConfig {
  apiKey?: string;
  baseURL?: string;
  defaultMessages?: CopilotMessage[];
}
export interface ChatMessageProps {
  message: CopilotMessage;
  isLoading?: boolean;
  animate?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}
export interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
}
export interface ChatContainerProps {
  messages: CopilotMessage[];
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  inputProps?: Partial<ChatInputProps>;
  messageProps?: Partial<ChatMessageProps>;
}
