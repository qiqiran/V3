<template>
  <a-form ref="FormRef" style="width: 100%" :model="formState" :rules="rules" :wrapperCol="{ span: 24 }" :label-col="{ span: 4 }">
    <a-form-item label="用户名" name="username">
      <a-input v-model:value="formState.username" placeholder="请输入" autocomplete="new-username" />
    </a-form-item>
    <a-form-item label="密码" name="password">
      <a-input type="password" v-model:value="formState.password" placeholder="请输入" autocomplete="new-password" />
    </a-form-item>
    <a-form-item label="姓名" name="name">
      <a-input v-model:value="formState.name" placeholder="请输入" />
    </a-form-item>
    <a-form-item label="性别">
      <a-select v-model:value="formState.sex" :options="sexOptions" placeholder="请选择" />
    </a-form-item>
    <a-form-item label="出生日期">
      <a-date-picker v-model:value="formState.birthday" placeholder="请选择" style="width: 100%" />
    </a-form-item>
    <a-form-item label="手机号码">
      <a-input v-model:value="formState.phone" placeholder="请输入" />
    </a-form-item>
    <a-form-item label="邮箱">
      <a-input v-model:value="formState.email" placeholder="请输入" />
    </a-form-item>
    <a-form-item label="地址">
      <a-input v-model:value="formState.address" placeholder="请输入" />
    </a-form-item>
    <a-form-item label="角色" name="roles">
      <a-select
        mode="multiple"
        v-model:value="formState.roles"
        :options="roleOptions"
        :filterOption="(inputValue, { label }) => label.includes(inputValue)"
        placeholder="请选择"
      />
    </a-form-item>
    <a-form-item label="部门" name="department">
      <a-tree-select v-model:value="formState.department" :tree-data="deptOptions" placeholder="请选择" tree-default-expand-all />
    </a-form-item>
    <a-form-item label="备注">
      <a-input v-model:value="formState.remark" placeholder="请输入" />
    </a-form-item>
  </a-form>
</template>

<script lang="ts">
  import type { Ref } from 'vue';

  import { defineComponent, ref, reactive, toRaw, unref } from 'vue';

  import { isArray } from 'src/utils/is';
  import { addUserApi } from '@/api/basics/userManage';
  import { success, error } from 'src/hooks/web/useMessage';
  import { dateUtil, formatToDateTime } from '@/utils/dateUtil';

  interface FormState {
    username: string;
    password: string;
    name: string | null;
    sex: string;
    birthday: string;
    phone: string;
    email: string;
    address: string;
    roles: string[];
    remark: string;
  }

  const rules = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { max: 16, message: '用户名长度应小于16位', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, max: 16, message: '密码长度应介于6~16位之间', trigger: 'blur' },
    ],
    name: [
      { required: true, message: '请输入姓名', trigger: 'blur' },
      { max: 16, message: '姓名长度应小于16位', trigger: 'blur' },
    ],
    roles: [
      {
        required: true,
        validator: (_, value) => {
          return new Promise((resolve, reject) => {
            if (isArray(value) && value.length) {
              resolve(true);
            } else {
              reject();
            }
          });
        },
        message: '请选择角色',
        trigger: 'blur',
      },
    ],
    department: [{ required: true, message: '请选择部门', trigger: 'blur' }],
  };

  interface TreeDataItem {
    value: string;
    key: string;
    title?: string;
    slots?: Record<string, string>;
    children?: TreeDataItem[];
  }

  const roleOptions = ref([
    { label: '超级管理员', value: 'supadmin' },
    { label: '系统管理员', value: 'sysadmin' },
    { label: '日志管理员', value: 'logadmin' },
    { label: '游客', value: 'visitor' },
    { label: '施工单位成员', value: 'custom-role-1' },
    { label: '施工单位分管领导', value: 'custom-role-2' },
    { label: '监理单位成员', value: 'custom-role-3' },
    { label: '监理单位分管领导', value: 'custom-role-4' },
    { label: '设计单位成员', value: 'custom-role-3' },
  ]);

  const deptOptions: Ref<TreeDataItem[]> = ref([
    {
      title: '蓝宇汇通',
      value: 'lyht',
      key: 'lyht',
      children: [
        {
          title: '软件项目部',
          value: 'lyht-1',
          key: 'lyht-1',
        },
        {
          title: '市场部',
          value: 'lyht-2',
          key: 'lyht-2',
        },
        {
          title: '运维部',
          value: 'lyht-3',
          key: 'lyht-3',
        },
      ],
    },
    {
      title: '和升达',
      value: 'hsd',
      key: 'hsd',
      children: [
        {
          title: '软件项目部',
          value: 'hsd-1',
          key: 'hsd-1',
        },
        {
          title: '市场部',
          value: 'hsd-2',
          key: 'hsd-2',
        },
        {
          title: '运维部',
          value: 'hsd-3',
          key: 'hsd-3',
        },
      ],
    },
  ]);

  const sexOptions = ref([
    { label: '保密', value: '' },
    { label: '男', value: 'man' },
    { label: '女', value: 'woman' },
  ]);

  export default defineComponent({
    setup() {
      const FormRef = ref();

      const formState: FormState = reactive({
        username: '',
        password: '',
        name: null,
        sex: '',
        phone: '',
        birthday: '',
        email: '',
        address: '',
        roles: [],
        department: null,
        remark: '',
      });

      function submit() {
        return new Promise((resolve, reject) => {
          unref(FormRef)
            .validate()
            .then(() => {
              const userData = toRaw(formState);

              Object.assign(userData, { id: new Date().getTime(), roles: userData.roles.join(), createTime: formatToDateTime(dateUtil()) });
              addUserApi(userData).then(() => {
                success('保存成功');
                resolve(true);
              });
            })
            .catch(() => {
              error('操作失败');
              reject(false);
            });
        });
      }
      return {
        FormRef,
        rules,
        sexOptions,
        roleOptions,
        deptOptions,

        formState,
        submit,
      };
    },
  });
</script>
