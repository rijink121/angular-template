import { UserType } from './UserType';
import { Cms } from './Cms';
import { Template } from './Template';
import { State } from './State';
import { Member } from 'app/modules/members/member/member.model';

export interface ApiResponse {
  data?: any;
  error?: any;
  message?: any;
}

export interface ApiGetAllData {
  count: number;
  limit: number;
  offset: number;
  users?: Member[];
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
  user?: Member;
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
  userdata: Member;
  session_id: string;
}

export interface LoginResponse {
  data?: LoginData;
  error?: any;
  message?: any;
}
