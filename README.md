# pointing-poker-be

Routes for FE:

Routes for FE:

| route               | description                |
| ------------------- | -------------------------- |
| /api/task?roomId=\* | get all tasks from room \* |

Socket events:

| Server event name | description                                                          |
| ----------------- | -------------------------------------------------------------------- |
| 'game:started'    | request from BE to send started game (object room) to all room users |
| 'game:finished'   | request from BE to send finished game (object room) to all users     |
| 'game:user-voted' | request from BE to send updated User Score to all room users         |
| 'error:not-data'  | request from BE to send error to user                                |

| Client event name | description                                                                |
| ----------------- | -------------------------------------------------------------------------- |
| 'startGame'       | request from FE to start game to room (id room)                            |
| 'finishGame'      | request from FE to finish game to room (id room)                           |
| 'userVote'        | request from FE to update score user to user score (userId, taskId, score) |

Backend part for Pointing Poker  
Staging: https://pointing-poker-app-be.herokuapp.com
