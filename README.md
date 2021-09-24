# pointing-poker-be

routes for FE:

| route    | description          |
| ------------- | -------------------- |
| /api/messages?roomId=*    | get all messages from room * |
| /api/users?roomId=*    | get all users from room * |
| /api/users/user?userId=*    | get user by his id|

socket events:

| Event name    | description          |
| ------------- | -------------------- |
| 'message:create'    | request from FE to add new message to room  |
| 'message:created'   | request from BE to send new message to all room users|

Backend part for Pointing Poker  
Staging: https://pointing-poker-app-be.herokuapp.com
