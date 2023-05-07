<template>
  <CropperImage ref="refCropper" :src="img" @cropend="handleCropend" style="width: 40vw" />
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { CropperImage } from '/@/components/Cropper';
  import img from '/@/assets/images/header.jpg';

  export default defineComponent({
    components: {
      CropperImage,
    },
    setup() {
      const info = ref('');
      const cropperImg = ref('');

      function handleCropend({ imgBase64, imgInfo }) {
        info.value = imgInfo;
        cropperImg.value = imgBase64;
      }

      return {
        img,
        info,
        cropperImg,
        handleCropend,
      };
    },
  });
</script>
