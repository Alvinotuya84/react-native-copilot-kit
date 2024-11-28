import type { CopilotMessage } from '../../types';

describe('Types', () => {
  it('should properly type a message', () => {
    const message: CopilotMessage = {
      id: '1',
      content: 'Hello',
      role: 'user',
      createdAt: new Date(),
    };

    expect(message.role).toBe('user');
  });
});
