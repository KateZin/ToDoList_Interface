<template>
  <nav>
  <v-toolbar
      class="flex-grow-0"
      color="purple accent-4"
      dense
  >
    <v-toolbar-title>Your ToDo List</v-toolbar-title>
    <v-spacer></v-spacer>
 <TaskManager></TaskManager>
  </v-toolbar>
  </nav>
</template>

<script>
import TaskManager from "@/components/TaskManager";
export default {
  name: "NavigationBar",
  components: {TaskManager}
}
</script>

<style scoped>

</style>