import { VuexModule, getModule, Module, Mutation, Action } from 'vuex-module-decorators';
import store from '#/store';

const NAME = 'user-manage';
@Module({ dynamic: true, namespaced: true, store, name: NAME })
class App extends VuexModule {
  private users: any[] = [
    {
      id: 'demo-001',
      username: 'demo-001',
      password: 'demo-001',
      name: '示例一',
      email: 'demo-01-email@163.com',
      roles: 'supadmin,sysadmin',
      department: 'lyht',
      remark: '一段无关紧要的备注',
      createTime: '2021-09-12 18:00',
    },
    {
      id: 'demo-002',
      username: 'demo-002',
      password: 'demo-002',
      name: '示例二',
      email: 'demo-02-email@163.com',
      roles: 'supadmin,sysadmin',
      department: 'lyht',
      remark: '一段无关紧要的备注',
      createTime: '2021-09-12 18:00',
    },
  ];

  get getUsers(): any[] {
    return this.users || [];
  }

  @Mutation
  commitUsers(users: any[]): void {
    this.users = users;
  }

  @Mutation
  commitUser(user: any[]): void {
    this.users.push(user);
  }

  @Action
  loadUsers(): Promise<any[]> {
    console.log('getUsersApi');

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.getUsers);
      }, 500);
    });
  }

  @Action
  delUsers(ids: string[]): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.commitUsers(this.getUsers.filter(({ id }) => !ids.includes(id)));
        resolve(true);
      }, 500);
    });
  }

  @Action
  addUser(user: any): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.commitUser(user);
        resolve(true);
      }, 500);
    });
  }
}
export const userManageStore = getModule<App>(App);
