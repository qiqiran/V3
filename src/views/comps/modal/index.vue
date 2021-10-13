<template>
  <div style="width: 500px; height: 500px">
    <a-button @click="openModal">openModal</a-button>
    <a-button @click="openModal2">openModal2</a-button>
  </div>
  <BasicModal :title="`BaiscModal`" @register="register" centered>
    <h1>This is WIoT BaiscModal</h1>
  </BasicModal>
  <BasicModal :title="`BaiscModal2`" @register="register2" width="70vw" @height-change="modalHeightChange" @visible-change="visibleChange" @ok="ok" @cancel="cancel">
    <h1>This is WIoT BaiscModal2</h1>
    <div class="background"></div>
    <h2 class="h-20" v-for="index in 100" :key="index">根据屏幕高度自适应</h2>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';

  import { BasicModal, useModal } from 'src/components/Modal';

  export default defineComponent({
    components: { BasicModal },
    setup() {
      const [register, { openModal, setModalProps }] = useModal();
      const [register2, { openModal: openModal2 }] = useModal();
      const visibleRef = ref(false);

      /**
       * not ref：
       * title
       * loading
       */
      setTimeout(() => {
        // setModalProps({ title: "false" });can`t
        setModalProps({ helpMessage: ['helpme', 'help'] });
        setModalProps({ loading: true });
        setModalProps({ loadingTip: '加载中' });
        setModalProps({ canFullscreen: false });

        setModalProps({ okType: 'dashed' });
        setModalProps({ okText: '禁止' });
        setModalProps({ showCancelBtn: false });
        setModalProps({ confirmLoading: true });
        setModalProps({ destroyOnClose: true });
        setModalProps({ width: '80vw' });

        // setModalProps({ showOkBtn: false });
        // setModalProps({ footer: null });

        // setModalProps({ visible: false });
      }, 2000);
      function modalHeightChange(height: number) {
        console.log('height', height);
      }
      function ok(e) {
        console.log('ok', e);
      }
      function cancel(e) {
        console.log('cancel', e);
      }
      function visibleChange(visible: boolean) {
        console.log('visible', visible);
      }

      return {
        register,
        openModal,
        visibleRef,
        register2,
        openModal2,

        modalHeightChange,
        ok,
        cancel,
        visibleChange,
      };
    },
  });
</script>

<style lang="less" scoped>
  .background {
    position: sticky;
    top: 0;
    background-color: @primary-color;
    border-radius: 100px;
    margin: 1rem;
    height: 200px;
    width: calc(100% - 2rem);
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 50px;
      color: #fff;
    }
  }
</style>
