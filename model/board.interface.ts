export interface Board {
  id: number;
  title: string;
  desc: string;
  status: BoardStatus;
}

export enum BoardStatus {
  PUBLIC = 1,
  PRIVATE = 2,
}
