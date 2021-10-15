import { BasicColumn } from '@/components/Table';

export const columns: BasicColumn[] = [
  { title: '用户名', dataIndex: 'username', width: 150, helpMessage: '一段没什么用的提示信息' },
  { title: '昵称', dataIndex: 'name', width: 150, helpMessage: '右边有个筛选功能' },
  { title: '邮箱', dataIndex: 'email', width: 250 },
  { title: '角色', dataIndex: 'roles', width: 250, align: 'left' },
  { title: '创建时间', dataIndex: 'createTime', width: 150 },
  { title: '备注', dataIndex: 'remark', align: 'left' },
];
