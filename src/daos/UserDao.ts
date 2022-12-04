import { UserInterface } from "../interfaces/UserInterface.js";
import { User } from "../models/User.js";

export abstract class UserDao {
  static async create(model: UserInterface): Promise<UserInterface> {
    const user = await User.create(model);
    return user;
  }
  
  static async read(keys: Object): Promise<Array<UserInterface>> {
    const users = await User.find(keys);
    return users;
  }

  static async update(keys: Object, model: UserInterface): Promise<Array<UserInterface>> {
    const users = await User.find(keys);
    users.map(async user => {
      return await user.update(model);
    });
    return await User.find(keys);
  }

  static async delete(keys: Object): Promise<void> {
    const users = await User.find(keys);
    users.forEach(async user => {
      return await user.delete();
    });
  }
}