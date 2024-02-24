/* eslint-disable prettier/prettier */
export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
  clientMessage: (data: {
    message: string, 
    room_id: string,
    receiver_id: number,
    sender_id: number
  }) => void
}

export interface ServerToClientEvents {
    serverMessage: (data: {
      message: string, 
      room_id: string,
      receiver_id: number,
      sender_id: number
    }) => void
  }

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}

export interface UserOnlineEvent {
  online: (data: {
    user_id: number, 
  }) => void
}
