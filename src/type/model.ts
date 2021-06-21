export type CurrentUser = {
  id: number;
  name: string;
};

export enum StatusStateENUM {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}

export type AuthState = {
  accessToken: string;
  currentUser: CurrentUser;
  status: StatusStateENUM;
  refreshToken?: string;
  error?: string;
};

export type AlertState = {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'warning';
};

export type MenuItem = {
  code: string;
  label: string;
};

export type DrawerState = {
  list: MenuItem[];
  open: boolean;
  status: StatusStateENUM;
};

export type UIState = {
  alert: AlertState;
  drawer: DrawerState;
  error?: string;
};

export type TaskState = {
  accessToken: string;
  currentUser: CurrentUser;
  status: StatusStateENUM;
  refreshToken?: string;
  error?: string;
};

export enum TaskStatusENUM {
  OPEN = 'OPEN',
  INPROGRESS = 'inprogress',
  COMPLETE = 'complete',
}

export type Task = {
  id: number;
  name: string;
  description: string;
  status: TaskStatusENUM;
  categoryId: number;
  ownerId: number;
  authorID: number;
  deadline: Date | null;
  createdAt: Date;
  updateAt: Date;
};
