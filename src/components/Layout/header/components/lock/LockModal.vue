<template>
  <BasicModal :footer="null" title="锁定屏幕" v-bind="$attrs" :class="prefixCls" @register="register">
    <div :class="`${prefixCls}__entry`">
      <div :class="`${prefixCls}__header`">
        <img :src="headerImg" :class="`${prefixCls}__header-img`" />
        <p :class="`${prefixCls}__header-name`">{{ getRealName }}</p>
      </div>

      <a-form layout="vertical">
        <a-form-item label="锁屏密码" v-bind="validateInfos.password" :autoLink="true">
          <a-input v-model:value="modelRef.password" />
        </a-form-item>
      </a-form>
      <div :class="`${prefixCls}__footer`">
        <a-button type="primary" block class="mt-2" @click.prevent="handleLock">锁定</a-button>
      </div>
    </div>
  </BasicModal>
</template>
<script lang="ts">
import { defineComponent, computed, reactive } from "vue";
import { useDesign } from "src/hooks/web/useDesign";
import { BasicModal, useModalInner } from "src/components/Modal/index";
// import { BasicForm, useForm } from '/@/components/Form/index';

import { userStore } from "#/store/modules/system/user";
import { lockStore } from "#/store/modules/lock";
const headerImg = require("static/images/app/logo.png");

import { Form } from "ant-design-vue";
import { error } from "src/hooks/web/useMessage";

export default defineComponent({
  name: "LockModal",
  components: {
    BasicModal,
    // BasicForm,
  },

  setup() {
    const { prefixCls } = useDesign("header-lock-modal");

    const getRealName = computed(() => userStore.getUserInfoState?.Name);
    const [register, { closeModal }] = useModalInner();

    const modelRef = reactive({
      password: "",
    });

    const { resetFields, validate, validateInfos } = Form.useForm(
      modelRef,
      reactive({
        password: [
          {
            required: true,
            message: "请输入锁屏密码",
          },
        ],
      })
    );

    async function handleLock() {
      validate()
        .then((values) => {
          const password: string | undefined = values.password;
          closeModal();
          lockStore.setLockInfo({
            isLock: true,
            pwd: password,
          });
          resetFields();
        })
        .catch((err) => {
          err?.errorFields.forEach((field) => field?.errors.forEach((tip) => error(tip)));
        });
    }

    return {
      prefixCls,
      register,
      getRealName,
      handleLock,
      headerImg,

      modelRef,
      validateInfos,
    };
  },
});
</script>
<style lang="less">
@prefix-cls: ~"@{namespace}header-lock-modal";

.@{prefix-cls} {
  &__entry {
    position: relative;
    height: 240px;
    padding: 130px 30px 60px 30px;
    border-radius: 10px;
  }

  &__header {
    position: absolute;
    top: 0;
    left: calc(50% - 85px);
    width: auto;
    text-align: center;

    &-img {
      width: 170px;
      border-radius: 50%;
    }

    &-name {
      margin-top: 5px;
      font-size: 16px;
    }
  }

  &__footer {
    text-align: center;
  }
}
</style>
