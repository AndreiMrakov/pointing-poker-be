# pointing-poker-be

Routes for FE:

| route               | description                |
| ------------------- | -------------------------- |
| /api/task?roomId=\* | get all tasks from room \* |

Socket events:

| Server event name | description                                             |
| ----------------- | ------------------------------------------------------- |
| 'task_created'    | request from BE to send created task to all room users  |
| 'task_deleted'    | request from BE to send id to deleted task to all users |
| 'task_get_score'  | request from BE to send updated task to all room users  |
| 'task_get_active' | request from BE to send updated task to all room users  |

| Client event name | description                                                |
| ----------------- | ---------------------------------------------------------- |
| 'task_create'     | request from FE to create task to room                     |
| 'task_delete'     | request from FE to delete task to all users                |
| 'task_set_score'  | request from FE to update score task to all room users     |
| 'task_set_active' | request from FE to update is_active task to all room users |

Backend part for Pointing Poker  
Staging: https://pointing-poker-app-be.herokuapp.com
