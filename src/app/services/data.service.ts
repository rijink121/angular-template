import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UserType } from '../models/UserType';
import { Cms } from '../models/Cms';
import { State } from '../models/State';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  userTypes: UserType[];
  states: State[];
  cmsList: Cms[];

  constructor(private api: ApiService) { }

  clear(): void {
    this.userTypes = undefined;
  }

  async getStateList(): Promise<State[]> {
    if (!!this.states) {
      return this.states;
    }
    const { error, data } = await this.api.getAll('state', {
      limit: -1,
      sort: [['state_name', 'ASC']]
    });
    return this.states = !!error ? [] : data.states;
  }

  async getUserTypeList(): Promise<UserType[]> {
    if (!!this.userTypes) {
      return this.userTypes;
    }
    const { error, data } = await this.api.getAll('usertype', {
      limit: -1,
      sort: [['user_type_title', 'ASC']]
    });
    return this.userTypes = !!error ? [] : data.user_types;
  }

  async getCmsData(name?: string): Promise<Cms> {
    if (!!this.cmsList) {
      return this.cmsList.find(x => x.name === name);
    }
    const { error, data } = await this.api.getAll('cms', {
      where: {
        active: 'Y'
      },
      limit: -1,
    });
    this.cmsList = !!error ? [] : data.cms;
    return this.cmsList.find(x => x.name === name);
  }
}
