# pointing-poker-be

Routes for FE:

| route                     | description                     | request | response |
| ------------------------- | ------------------------------- | -------- | --------- |
| /api/tasks?roomId=uuid    | get all tasks from room uuid    |  | {id, title, description, roomId, score, avg_score, is_active } |
| /api/messages?roomId=uuid | get all messages from room uuid |  | { id, text,  date, userId, roomId, name }: ISendMessage[] |
| /api/rooms/create         | create room                     | { title } | { id, title } |
| /api/rooms/:uuid          | get room by id                  |  | { id, titlee, state? } ? |
| /api/users?roomId=uuid    | get all users from room *       | | {id, role, name, roomId} : IUser[] |
| /api/users/:id            | get user by his id              | { id } | { id: number, name: string } |

Socket events:

| Event name        | description                                                |
| ----------------- | ---------------------------------------------------------- |
| 'task_create'     | request from FE to create task to room                     |
| 'task_delete'     | request from FE to delete task to all users                |
| 'task_set_score'  | request from FE to update score task to all room users     |
| 'task_set_active' | request from FE to update is_active task to all room users |
| 'message_create'  | request from FE to add new message to room                                         |
| 'room_create'     | request from FE to create new room                         |
| 'room_join'       | request from FE to join user in room                       |
| 'room_leave'      | request from FE to leave user in room                      |
| 'room_start'      | request from FE to start game to room (id room)                                    |
| 'room_finish'     | request from FE to finish game to room (id room)                                   |
| 'room_restart'    | request from FE to restart game to room (id room)                                  |
| 'user_vote'        | request from FE to update score user to user score (userId, taskId, score, roomId) |
| 'error_not_data' | request from FE for sender to error |

Backend part for Pointing Poker  
Staging: https://pointing-poker-app-be.herokuapp.com
