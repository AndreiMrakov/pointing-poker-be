# pointing-poker-be

Routes for FE:

| route                   | description                   |
| ----------------------- | ----------------------------- |
| /api/task?roomId=uuid     | get all tasks from room uuid    |
| /api/messages?roomId=uuid | get all messages from room uuid |
| /api/room/create        | create room                   |
| /api/room/join          | join at room                  |
| /api/room/leave         | leave room                    |
| /api/room/:id           | get room by id                |
| /api/users?roomId=uuid    | get all users from room * |  {userId: number, role: string, name: string, roomId: string}[] |
| /api/users/:id    | get user by his id| {userId: number, name: string, roomId: string} |

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
