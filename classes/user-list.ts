import { User } from './user';

export class UserList {
  private listUser: User[] = [];

  constructor() {}

  // add user
  public add(user: User) {
    this.listUser.push(user);
    return user;
  }

  // update name user
  public updateName(id: string, name: string) {
    for (const user of this.listUser) {
      if (user.id === id) {
        user.name = name;
        break;
      }
    }
  }

  // get all user
  public getAllUser() {
    return this.listUser.filter((user) => user.name !== 'no-name');
  }

  // get user by id
  public getUserById(id: string) {
    return this.listUser.find((user) => user.id === id);
  }

  // get users by room
  public getUsersByRoom(room: string) {
    return this.listUser.find((user) => user.room === room);
  }

  // delete user by id
  public deleteUser(id: string) {
    const tempUser = this.getUserById(id);

    this.listUser = this.listUser.filter((user) => user.id !== id);

    return tempUser;
  }
}
