<script lang="ts">
  import { defineComponent, unref } from 'vue';

  import { useRouter } from 'vue-router';
  import { useGo } from 'src/hooks/web/usePage';

  export default defineComponent({
    name: 'Redirect',
    setup() {
      const go = useGo();
      const { currentRoute } = useRouter();
      const {
        params: { path },
        query,
        meta,
      } = unref(currentRoute);

      const _path = Array.isArray(path) ? path.join('/') : path;

      go(
        {
          path: '/' + _path,
          query,
          meta,
        },
        true,
      );
    },
  });
</script>
