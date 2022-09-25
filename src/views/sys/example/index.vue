<template>
  <PageWrapper>
    <p>{{ resp }}</p>
    <AForm
      :model="name"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
    >
      <AFormItem
        label="Name"
        name="name"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="name" />
      </AFormItem>

      <AFormItem :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" @click="SayHello">Submit</a-button>
      </AFormItem>
    </AForm>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import { ref } from 'vue';
  import { Hello } from '/@/api/sys/example';

  const name = ref<string>('');
  const resp = ref<string>('');

  async function SayHello() {
    const result = await Hello({ name: name.value }, 'message');
    resp.value = 'Hello ' + result.msg;
    console.log(result);
  }
</script>
