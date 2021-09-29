# pointing-poker-be

Routes for FE:

| route                   | description                   | payload                   |
| ----------------------- | ----------------------------- |-------------------------- |
| /api/task?roomId=\*     | get all tasks from room \*    |                           |
| /api/messages?roomId=\* | get all messages from room \* |                           |
| /api/users?roomId=*    | get all users from room * |  {userId: number, role: string, name: string, roomId: string}[] |
| /api/users/:*    | get user by his id|                           |

Socket events:

| Event name        | description                                                |
| ----------------- | ---------------------------------------------------------- |
| 'task_create'     | request from FE to create task to room                     |
| 'task_delete'     | request from FE to delete task to all users                |
| 'task_set_score'  | request from FE to update score task to all room users     |
| 'task_set_active' | request from FE to update is_active task to all room users |
| 'message:create'  | request from FE to add new message to room                 |
| 'message:created' | request from BE to send new message to all room users      |

Backend part for Pointing Poker  
Staging: https://pointing-poker-app-be.herokuapp.com
