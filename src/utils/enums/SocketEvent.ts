export enum SocketEvent {
  TaskCreate = 'task_create',
  TaskDelete = 'task_delete',
  TaskUpdateScore = 'task_set_score',
  TaskUpdateActive = 'task_set_active',
  ErrorNotData = 'error_not_data',
  MessageCreate = 'message:create',
  MessageCreated = 'message:created',
  RoomCreate = 'room:create',
  RoomCreated = 'room:created',
  RoomJoin = 'room:join',
  RoomLeave = 'room:leave'
};
