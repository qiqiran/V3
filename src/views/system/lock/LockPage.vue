<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}__unlock`" @click="handleShowForm(false)" v-show="showDate">
      <LockOutlined />
      <span>点击解锁</span>
    </div>

    <div :class="`${prefixCls}__time`">
      <div :class="`${prefixCls}__hour`">
        <span>{{ hour }}</span>
        <span :class="`meridiem`" v-show="showDate">{{ meridiem }}</span>
      </div>
      <div :class="`${prefixCls}__minute`">
        <span>{{ minute }}</span>
      </div>
    </div>
    <transition name="fade-bottom">
      <div :class="`${prefixCls}-entry`" v-show="!showDate">
        <div :class="`${prefixCls}-entry-content`">
          <div :class="`${prefixCls}-entry__header`">
            <img :src="headerImg" :class="`${prefixCls}-entry__header-img`" />
            <p :class="`${prefixCls}-entry__header-name`">{{ realName }}</p>
          </div>
          <InputPassword :placeholder="'请输入锁屏密码或者用户密码'" v-model:value="password" />
          <span :class="`${prefixCls}-entry__err-msg `" v-if="errMsg">锁屏密码错误</span>
          <div :class="`${prefixCls}-entry__footer`">
            <a-button type="link" size="small" :disabled="loading" @click="handleShowForm(true)">返回</a-button>
            <a-button type="link" size="small" :disabled="loading" @click="goLogin">返回登录</a-button>
            <a-button type="link" size="small" @click="unLock()" :loading="loading">进入系统</a-button>
          </div>
        </div>
      </div>
    </transition>

    <div :class="`${prefixCls}__date`">
      <div :class="`${prefixCls}__date-time`" class="text-5xl mb-4" v-show="!showDate">
        {{ hour }}:{{ minute }}
        <span :class="`${prefixCls}__date-meridiem`">{{ meridiem }}</span>
      </div>
      <div>{{ year }}/{{ month }}/{{ day }} {{ week }}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watchEffect, watch } from "vue";
import { Input } from "ant-design-vue";

import { userStore } from "#/store/modules/system/user";
import { lockStore } from "#/store/modules/lock";

import { useNow } from "./useNow";
import { useDesign } from "src/hooks/web/useDesign";

import { LockOutlined } from "@ant-design/icons-vue";
const headerImg = require("static/images/app/logo.png");

export default defineComponent({
  name: "LockPage",
  components: { LockOutlined, InputPassword: Input.Password },

  setup() {
    const password = ref("");
    const loading = ref(false);
    const errMsg = ref(false);
    const showDate = ref(true);

    const { prefixCls } = useDesign("lock-page");

    const { ...state } = useNow(true);

    const realName = computed(() => {
      const { Name } = userStore.getUserInfoState || {};
      return Name;
    });

    watchEffect(() => {
      password;
    });

    watch(
      () => password.value,
      () => {
        errMsg.value = false;
      }
    );

    /**
     * @description: unLock
     */
    async function unLock() {
      if (!password.value) {
        return;
      }
      let pwd = password.value;
      try {
        loading.value = true;
        errMsg.value = false;
        const res = await lockStore.unLock(pwd);
        errMsg.value = !res;
      } finally {
        loading.value = false;
      }
    }

    function goLogin() {
      userStore.logout();
      lockStore.resetLockInfo();
    }

    function handleShowForm(show = false) {
      password.value = "";
      showDate.value = show;
    }

    return {
      goLogin,
      realName,
      unLock,
      errMsg,
      loading,
      prefixCls,
      showDate,
      password,
      handleShowForm,
      headerImg,
      ...state,
    };
  },
});
</script>
<style lang="less" scoped>
@prefix-cls: ~"@{namespace}lock-page";

.@{prefix-cls} {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 1);
  align-items: center;
  justify-content: center;

  z-index: @lock-page-z-index;

  &__unlock {
    position: absolute;
    top: 0;
    left: 50%;
    display: flex;
    padding-top: 1.25rem;
    height: 4rem;
    align-items: center;
    justify-content: center;
    color: @white;
    flex-direction: column;
    cursor: pointer;
    transform: translate(-50%, 0);
    @media (min-width: @screen-md) {
      font-size: 1.25rem;
      line-height: 1.75rem;
    }
  }

  &__time {
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
  }
  &__hour {
    position: relative;
    margin-right: 1.25rem;

    @media (min-width: 768px) {
      margin-right: 5rem;
    }
  }
  &__hour,
  &__minute {
    display: flex;
    font-weight: 700;
    color: #bababa;
    background-color: #141313;
    border-radius: 30px;
    justify-content: center;
    align-items: center;

    @media (min-width: 768px) {
      height: 80%;
    }
    width: 40%;
    height: 40%;

    @media screen and (max-width: @screen-md) {
      span:not(.meridiem) {
        font-size: 160px;
      }
    }

    @media screen and (min-width: @screen-md) {
      span:not(.meridiem) {
        font-size: 160px;
      }
    }

    @media screen and (max-width: @screen-sm) {
      span:not(.meridiem) {
        font-size: 90px;
      }
    }
    @media screen and (min-width: @screen-lg) {
      span:not(.meridiem) {
        font-size: 220px;
      }
    }

    @media screen and (min-width: @screen-xl) {
      span:not(.meridiem) {
        font-size: 260px;
      }
    }
    @media screen and (min-width: @screen-xxl) {
      span:not(.meridiem) {
        font-size: 320px;
      }
    }
  }

  .meridiem {
    position: absolute;
    left: 1.25rem;
    top: 1.25rem;
    font-size: 1.25rem;
    line-height: 1.75rem;
  }

  &__date {
    position: absolute;
    bottom: 1.25rem;
    width: 100%;
    color: rgba(212, 212, 216, 1);
    font-size: 1.5rem;
    line-height: 2rem;
    text-align: center;

    &-time {
      font-size: 3rem;
      line-height: 1;
      margin-bottom: 1rem;
    }
    &-meridiem {
      font-size: 1.875rem;
      line-height: 2.25rem;
    }
  }

  &-entry {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(8px);
    justify-content: center;
    align-items: center;

    &-content {
      width: 260px;
    }

    &__header {
      text-align: center;

      &-img {
        width: 70px;
        margin: 0 auto;
        border-radius: 50%;
      }

      &-name {
        margin-top: 5px;
        font-weight: 500;
        color: #bababa;
      }
    }

    &__err-msg {
      display: inline-block;
      margin-top: 10px;
      color: @error-color;
    }

    &__footer {
      display: flex;
      justify-content: space-between;
      margin-top: 0.5rem;
    }
  }
}
</style>
