export interface ITask {
  id: string;
  title: string;
  dateCreated: Date;
  dateDue: Date;
  listIDs: string[];
  completed: boolean;
  note?: string;
  steps?: IStep[];
}

export interface IStep {
  title: string;
  completed: boolean;
}
