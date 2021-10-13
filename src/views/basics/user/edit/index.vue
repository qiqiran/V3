<template>
  <BasicModal :title="title" @register="register" @ok="ok" :loading="isLoading">
    <ElementModel ref="ElementRef" />
  </BasicModal>
</template>

<script lang="ts">
  import type { ModalProps } from '@/components/Modal';

  import { defineComponent, Ref, ref, unref } from 'vue';

  import { warn } from '@/hooks/web/useMessage';

  import { BasicModal, useModal } from '@/components/Modal';

  import ElementModel from './Element.vue';

  export default defineComponent({
    components: { BasicModal, ElementModel },
    emits: ['ok'],
    setup(_, { emit }) {
      const ElementRef = ref<typeof ElementModel>(ElementModel);
      const title: Ref<string> = ref('-');
      const isLoading = ref(false);
      console.log('model-我初始化了！');

      const [register, { openModal, closeModal, setModalProps, getVisible }] = useModal();

      const defaultProps: Partial<ModalProps> = { width: '500px', destroyOnClose: true, helpMessage: '猜猜我是谁' };

      function open({ type }) {
        setModalProps({ ...defaultProps, okText: '保存' });
        switch (type) {
          case 'add':
            title.value = '新增用户';
            openModal();
            break;
          case 'edit':
          case 'add':
            title.value = '编辑用户';
            openModal();
            break;
          default:
            warn('未知的操作类别！');
            return;
        }
      }

      function ok() {
        isLoading.value = true;

        unref(ElementRef)
          .submit()
          .then(() => {
            closeModal();
            emit('ok');
          })
          .finally(() => {
            isLoading.value = false;
          });
      }

      return { register, open, ok, ElementRef, isLoading, getVisible, title };
    },
  });
</script>

<style></style>
