<template>
<div v-if="!!task">
  <div> Name:{{task.name}}</div>
  <div> Tag:{{task.tagName}}</div>
</div>
</template>

<script>
export default {
  name: "TaskItem",
  props: {
    task: Object
  },
}
</script>

<style scoped>

</style>
