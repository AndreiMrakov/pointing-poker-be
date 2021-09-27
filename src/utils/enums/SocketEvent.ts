export enum SocketEvent {
  GameStart = 'game_start',
  GameFinish = 'game_finish',
  GameRestart = 'game_restart',
  UserVote = 'user_vote',
  TaskCreate = 'task_create',
  TaskDelete = 'task_delete',
  TaskUpdateScore = 'task_set_score',
  TaskUpdateActive = 'task_set_active',
  ErrorNotData = 'error_not_data',
  MessageCreate = 'message:create',
  MessageCreated = 'message:created'
};
