<template>
  <div class="main">
    <div class="header">
      <div id="login-headline" class="headline"></div>
    </div>
    <div class="container">
      <div class="back">
        <div class="items_login">
          <div id="login-background" class="item_login">
            <div class="login-body">
              <div id="login-title-body" class="login-title-body">
                <div id="login-title"></div>
              </div>
              <div id="login_form">
                <form id="login-form">
                  <div class="login-inline">
                    <a-input
                      v-model:value="loginForm.account"
                      @keyup.enter="login"
                      placeholder="请输入您的账号"
                      size="large"
                    >
                      <template #prefix>
                        <UserOutlined />
                      </template>
                    </a-input>
                  </div>
                  <div class="login-inline">
                    <a-input
                      v-model:value="loginForm.password"
                      type="password"
                      @keyup.enter="login"
                      placeholder="请输入您的密码"
                      size="large"
                    >
                      <template #prefix>
                        <LockOutlined />
                      </template>
                    </a-input>
                  </div>
                  <div class="login-inline">
                    <a-input
                      v-model:value="loginForm.verifyCode"
                      @keyup.enter="login"
                      placeholder="请输入验证码"
                      prefix-icon="el-icon-key"
                      size="large"
                    >
                      <template #prefix>
                        <KeyOutlined />
                      </template>
                      <template #addonAfter>
                        <canvas
                          id="verificationCode"
                          width="100"
                          height="32"
                          @click="initVerifyPage(answer, 'verificationCode')"
                        ></canvas>
                      </template>
                    </a-input>
                  </div>
                  <div class="login-inline" style="margin-bottom:15px;">
                    <a-button
                      id="login"
                      :loading="loading"
                      @click="login()"
                      type="primary"
                      shape="round"
                      size="large"
                    >登录</a-button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <p class="footer-content">
        <img src="static/images/login/left.png" />
        &nbsp;&nbsp;{{ loginForm.account }}
        <span class="footer-text">中国电建集团中南勘测设计研究院有限公司版权所有</span>
        &nbsp;&nbsp;{{ loginForm.password }}
        <img src="static/images/login/right.png" />
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { PageEnum } from "src/enums/pageEnum";

import { defineComponent, onMounted, reactive, ref } from "vue";

import router from "@/framework/router";

import { userStore } from "#/store/modules/system/user";

import { initVerifyPage } from "src/utils/verify";
import Message, { error, warn, info, loading, success } from "src/hooks/web/useMessage";

import { loginApi } from "src/api/system/login";

export default defineComponent({
  name: "Login",
  setup() {
    let answer = ref([]);
    let loading = ref(false);

    onMounted(() => {
      initVerifyPage(answer.value, "verificationCode");
    });

    const loginForm = reactive({
      account: "yxh",
      password: "yxh@123888",
      verifyCode: "",
    });

    async function login() {
      loading.value = true;
      const res = await loginApi({ NM: loginForm.account, PW: loginForm.password }).finally(() => (loading.value = false));
      userStore.commitUserInfoState(res);

      // userStore.commitUserInfoState({
      //   Admin: 1,
      //   KEY: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImFkbWluX3VzZXJuYW1lIjoieXhoIiwiZXhwIjoxNjIyODkxMDMyLCJpYXQiOjE2MjI4MDQ2MzJ9.oeDkB8ktufhRm1F-XK4zQdcxooV3n6T75AQx4RDuUiQ",
      //   NM: "yxh",
      //   Name: "阎晓辉",
      //   TP: 100,
      // });
      router.push(PageEnum.BASE_HOME);
    }

    return { initVerifyPage, login, loginForm, answer, loading };
  },
});
</script>
<style lang='less'>
@import "~src/assets/css/login/login-style.css";
</style>