export enum Action {
  Create,
  Update,
  Remove,
}

export enum TileMode {
  create,
  modify,
}

export type Todo = {
  Id: number;
  Name: string;
  Description: string;
  CreationDate: string;
};

export type Recording = {
  todoItem: Todo;
  action: Action;
};

export type RecordedAction = {
  date: Date;
  todoId: number;
};

export const todoDBName = 'todoDB';
export const todoStoreName = 'recordingStore';
