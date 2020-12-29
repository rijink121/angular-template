import { User } from './User';
import { UserType } from './UserType';
import { Cms } from './Cms';
import { Template } from './Template';
import { State } from './State';


export interface ApiResponse {
  data?: any;
  error?: any;
  message?: any;
}

export interface ApiGetAllData {
  count: number;
  limit: number;
  offset: number;
  users?: User[];
  user_types?: UserType[];
  cms?: Cms[];
  templates?: Template[];
  states?: State[];
}

export interface ApiGetAllResponse {
  data?: ApiGetAllData;
  error?: any;
  message?: any;
}

export interface ApiGetOneData {
  template?: Template;
  user?: User;
}

export interface ApiGetOneResponse {
  data?: ApiGetOneData;
  error?: any;
  message?: any;
}

export interface ApiGetCountData {
  count: number;
}

export interface ApiGetCountResponse {
  data?: ApiGetCountData;
  error?: any;
  message?: any;
}

export interface LoginData {
  token: string;
  expires: string;
  userdata: User;
  session_id: string;
}

export interface LoginResponse {
  data?: LoginData;
  error?: any;
  message?: any;
}
