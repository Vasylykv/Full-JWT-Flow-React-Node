import $api from '../api';
import type { AxiosResponse } from 'axios';
import type { IUser } from '../models/IUser.ts';

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>('/users');
  }
}
