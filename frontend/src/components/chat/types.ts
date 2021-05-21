export type MessageType = {
  createdAt: string;
  messageId: string;
  messageText: string;
  senderName: string;
  userId: string;
  currentUser?: string;
};

export type usersType = userType[];
export type userType = { username: string; online: boolean };

export type messageType = {
  createdAt: string;
  messageId: string;
  messageText: string;
  senderName: string;
  userId: string;
};
export type messagesType = messageType[];

export type removeMessageType = (id: string) => void;
export type sendMessageType = ({
  messageText,
  senderName,
}: {
  messageText: string;
  senderName: string;
}) => void;
