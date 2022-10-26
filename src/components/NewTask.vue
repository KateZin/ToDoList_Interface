<template>
  <div>
    <H2>Add new Task</H2>
    <v-text-field label="Enter task" v-model="name"></v-text-field>
    <v-text-field label="Comment" v-model="comment"></v-text-field>
    <v-text-field label="Enter tag" v-model="tag"></v-text-field>
<v-btn @click="createNewTask">Add  task</v-btn>
  </div>
</template>

<script>
import {addTask} from "@/components/js/api";

export default {
  name: "NewTask",
  components: "",
  props: {},

  data() {
   return {
     name: "",
     comment: "",
     tag: ""
   }
  },
  methods: {
    async createNewTask(){
      const task = {
       name:this.name,
        comment:this.comment,
        tag:this.tag
      }
      await addTask(task)
      console.log("a have added a new task!")
      this.$emit("newTaskCreated", task)
    }
  },
  computed: {}
};
</script>

<style></style>