<template>
  <PageWrapper>
    <template #headerContent> <WorkbenchHeader /> </template>
    <div class="lg:flex">
      <div class="lg:w-7/10 w-full !mr-4 enter-y">
        <ProjectCard class="enter-y" />
      </div>
      <div class="lg:w-3/10 w-full enter-y">
        <QuickNav class="enter-y" />
      </div>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import WorkbenchHeader from './components/WorkbenchHeader.vue';
  import ProjectCard from './components/ProjectCard.vue';
  import QuickNav from './components/QuickNav.vue';
</script>
