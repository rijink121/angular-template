
export interface User {
  user_id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  user_type: number;
  dealer_id: number;
  division_id: number;
  office_id: number;
  region_id: number;
  image: string;
}

export interface UserFilter {
  populate?: boolean;
  user_type?: number;
  user_types?: number[];
  division_id?: number;
  office_id?: number;
  region_id?: number;
  user_id?: number;
  managers?: boolean;
}
