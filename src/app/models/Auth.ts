import { DeviceInfo } from 'ngx-device-detector';

export interface Auth {
  username: string;
  password: string;
  info?: DeviceInfo;
}
