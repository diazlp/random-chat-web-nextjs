import { RandomParticipantType } from '@/store/slices/peerSlice';

/**
 * Creates a system message object with specified content and timestamp.
 * @param message - The content of the system message.
 * @returns A system message object containing client ID, message content, and timestamp.
 */
const createSystemMessage = (message: string) => {
  return {
    clientId: RandomParticipantType.System,
    message,
    time: new Date().toISOString(),
  };
};

export default createSystemMessage;
