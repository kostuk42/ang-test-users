export interface User {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  user_type: UserType | string;
  id?: number | string;
}

export type UserAction = 'create' | 'update' | 'delete';
export interface UserActionPayload {
  action: UserAction;
  user: User;
}

export interface ModalConfig {
  title: string;
  isCreateMode: boolean;
}

export type UserType = 'admin' | 'driver';

