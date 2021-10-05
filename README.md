# pointing-poker-be

Routes for FE:

| route                     | | description                     | request | response |
| ------------------------- | - | ------------------------------- | -------- | --------- |
| /api/tasks?roomId=uuid    | GET | get all tasks from room uuid    |  | {id, title, description, roomId, score, avg_score, is_active, createdAt }: ITask |
| /api/messages?roomId=uuid | GET | get all messages from room uuid |  | { id, text,  date, userId, roomId, name }: ISendMessage[] |
| /api/rooms/               | POST | create room                     | { title } | { id, title, state, roomStateId }: IRoom |
| /api/rooms/:uuid          | GET | get room by id                  |  | { id, title, state, roomStateId }: IRoom |
| /api/users?roomId=uuid    | GET | get all users from room       | | {id, role, name} : IUser[] |
| /api/users/:id            | GET| get user by his id              |  | { id, name }: IUser |
| /api/users/               | POST | create user                     | { name } | { id, name }: IUser |

Socket events:

| Event name        | description                                                |  request | response  |
| ----------------- | ---------------------------------------------------------- | -------- | --------- |
| 'task_create'     | request from FE to create task to room                     | { title, description?, roomId }: ITask | {id, title, description, roomId, score, avg_score, is_active, createdAt }: ITask |
| 'task_delete'     | request from FE to delete task to all users                | { id } | { id } |
| 'task_set_score'  | request from FE to update score task to all room users     | { id, score }: ITask | {id, title, description, roomId, score, avg_score, is_active, createdAt }: ITask |
| 'task_set_active' | request from FE to update is_active task to all room users | { id } | {id, title, description, roomId, score, avg_score, is_active, createdAt }: ITask |
| 'message_create'  | request from FE to add new message to room                 | { text, roomId, userId }: IMessage |  { id, text,  date, userId, roomId, name }: ISendMessage |
| 'room_join'       | request from FE to join user in room                       | { roomId, userId }: IJoinRoom | {id, role, name, isOnline }: IUser |
| 'room_leave'      | request from FE to leave user in room                      | { roomId, userId }: IJoinRoom | {id, name}: IUser or { false } |
| 'room_start'      | request from FE to start game to room (id room)            | { id } | { id, title }: IRoomState |
| 'room_finish'     | request from FE to finish game to room (id room)           | { id } | { id, title }: IRoomState |
| 'room_restart'    | request from FE to restart game to room (id room)          | { id } | { id, title }: IRoomState |
| 'user_vote'        | request from FE to update score user to user score        | { userId, taskId, score }: IUserScore | { userId, taskId, score }: IUserScore |
| 'user_add_role' | request from FE to update role user to room | { userId, roomId, role }: IJoinRoom |  {id, role, name, isOnline}: IUser |
| 'room_admin' | request from FE to new admin to room | userId: number, roomId: string | { id } - user |
| 'error_not_data' | request from FE for sender to error | | { message: 'Not found payload' } |
| 'user_kick' | request from FE to kick user from room | { roomId, userId }: IJoinRoom | true |

Backend part for Pointing Poker  
Staging: https://pointing-poker-app-be.herokuapp.com
