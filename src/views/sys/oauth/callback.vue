<template>
  <div></div>
</template>
<script lang="ts">
  import { message } from 'ant-design-vue';
  import { defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { oauthLoginCallback } from '/@/api/sys/oauthProvider';
  import { PageEnum } from '/@/enums/pageEnum';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useGo } from '/@/hooks/web/usePage';
  import { useUserStore } from '/@/store/modules/user';

  export default defineComponent({
    name: 'OauthCallbackPage',
    components: {},
    setup() {
      const { currentRoute } = useRouter();
      const go = useGo();
      const { t } = useI18n();
      const query = ref<string>('');
      query.value += '?state=' + currentRoute.value.query.state;
      query.value += '&code=' + currentRoute.value.query.code;

      async function login(url: string) {
        try {
          const result = await oauthLoginCallback(url, 'message');
          const { token } = result;
          const userStore = useUserStore();
          // save token
          userStore.setToken(token);
          await userStore.afterLoginAction(false);
          go(PageEnum.BASE_HOME);
        } catch (e) {
          message.error(t('sys.oauth.createAccount'), 5);
          go(PageEnum.BASE_LOGIN);
        }
      }

      login(query.value);
      return {
        // t,
      };
    },
  });
</script>
