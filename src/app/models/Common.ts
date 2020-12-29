import { Moment } from 'moment-timezone';

export interface DateRange {
  $gte?: Moment;
  $lte?: Moment;
}

export interface DropDown {
  id: any;
  title: string;
}

export interface FieldLabel {
  field: string;
  label: string;
  pipe?: string;
  value?: number;
}

export interface MapModel {
  id: number | string;
  name: string;
  id_field: string;
  field: string;
}