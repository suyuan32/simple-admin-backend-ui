<template>
  <div></div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  // import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import { oauthLoginCallback } from '/@/api/sys/oauth';
  import { PageEnum } from '/@/enums/pageEnum';
  import { useGo } from '/@/hooks/web/usePage';
  import { useUserStore } from '/@/store/modules/user';

  export default defineComponent({
    name: 'OauthCallbackPage',
    components: {},
    setup() {
      const { currentRoute } = useRouter();
      const go = useGo();
      // console.log(currentRoute.value.query);
      const query = ref<string>('');
      query.value += '?state=' + currentRoute.value.query.state;
      query.value += '&code=' + currentRoute.value.query.code;

      async function login(url: string) {
        try {
          const result = await oauthLoginCallback(url);
          const { token } = result;
          const userStore = useUserStore();
          // save token
          userStore.setToken(token);
          userStore.afterLoginAction(false);
          go(PageEnum.BASE_HOME);
          console.log(result);
        } catch (e) {
          console.log(e);
        }
      }

      login(query.value);
      return {
        // t,
      };
    },
  });
</script>
