# pointing-poker-be

Routes for FE:

| route                   | description                   |
| ----------------------- | ----------------------------- |
| /api/task?roomId=\*     | get all tasks from room \*    |
| /api/messages?roomId=\* | get all messages from room \* |

Socket events:

| Event name        | description                                                                        |
| ----------------- | ---------------------------------------------------------------------------------- |
| 'task_create'     | request from FE to create task to room                                             |
| 'task_delete'     | request from FE to delete task to all users                                        |
| 'task_set_score'  | request from FE to update score task to all room users                             |
| 'task_set_active' | request from FE to update is_active task to all room users                         |
| 'message:create'  | request from FE to add new message to room                                         |
| 'message:created' | request from BE to send new message to all room users                              |
| 'game_start'      | request from FE to start game to room (id room)                                    |
| 'game_finish'     | request from FE to finish game to room (id room)                                   |
| 'game_restart'    | request from FE to restart game to room (id room)                                  |
| 'userVote'        | request from FE to update score user to user score (userId, taskId, score, roomId) |

Backend part for Pointing Poker  
Staging: https://pointing-poker-app-be.herokuapp.com
