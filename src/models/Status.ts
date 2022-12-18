import { StatusInterface, UnityInterface } from '../interfaces/StatusInterface.js';

export class Status implements StatusInterface {
  constructor(
    public code: string,
    public description: string,
    public dateTime: Date,
    public unity: UnityInterface,
    public destiny?: UnityInterface
  ) {}
}