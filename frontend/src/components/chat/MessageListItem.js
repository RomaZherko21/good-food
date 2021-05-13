// форматирование даты и времени
import TimeAgo from 'react-timeago';
// стили
import { ListGroup, Card, Button } from 'react-bootstrap';
// иконки
import { AiOutlineDelete } from 'react-icons/ai';

// функция принимает объект сообщения и функцию для удаления сообщений
export const MessageListItem = ({ msg, removeMessage }) => {
  // обрабатываем удаление сообщений
  const handleRemoveMessage = (id) => {
    removeMessage(id);
  };

  const { messageId, messageText, senderName, createdAt, currentUser } = msg;
  return (
    <ListGroup.Item
      className={`d-flex ${currentUser ? 'justify-content-end' : ''}`}
    >
      <Card
        bg={`${currentUser ? 'primary' : 'secondary'}`}
        text="light"
        style={{ width: '55%' }}
      >
        <Card.Header className="d-flex justify-content-between align-items-center">
          {/* передаем TimeAgo дату создания сообщения */}
          <Card.Text as={TimeAgo} date={createdAt} className="small" />
          <Card.Text>{senderName}</Card.Text>
        </Card.Header>
        <Card.Body className="d-flex justify-content-between align-items-center">
          <Card.Text>{messageText}</Card.Text>
          {/* удалять сообщения может только отправивший их пользователь */}
          {currentUser && (
            <Button
              variant="none"
              className="text-warning"
              onClick={() => handleRemoveMessage(messageId)}
            >
              <AiOutlineDelete />
            </Button>
          )}
        </Card.Body>
      </Card>
    </ListGroup.Item>
  );
};
