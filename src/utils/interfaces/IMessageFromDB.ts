export interface IMessageFromDB {
  id: number,
  text: string,
  createdAt: Date,
  userId: number,
  roomId: string,
  user: {
      name: string,
  }
}
