import { StatusInterface } from "../interfaces/StatusInterface.js";

export class Status implements StatusInterface {
  constructor(public description: String, public dateTime: Date = new Date()) {}
}