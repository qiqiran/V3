import { userManageStore } from "#/store/modules/basics/userManage";

export function getUsersApi() {
  return userManageStore.loadUsers();
}

export function addUserApi(user: any) {
  return userManageStore.addUser(user);
}

export function delUsersApi(ids: string[]) {
  return userManageStore.delUsers(ids);
}