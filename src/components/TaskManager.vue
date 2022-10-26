<template>
  <div >
    <template v-if="mode==='show'">
      <SortingTask :tagsList="tagsList" @selectedTag="onTagSelect"></SortingTask>

      <TasksList  v-bind:tasksList="tasksList" title="Tasks" ></TasksList>

    </template>

  <template v-if="mode==='add'">
      <NewTask @newTaskCreated="onNewTaskCreated" ></NewTask>
  </template>

  </div>
</template>

<script>

/* eslint-disable */
import TasksList from "@/components/TasksList";
import {getTasksByCriteria} from "@/components/js/api";
import SortingTask from "@/components/SortingTask";
import NewTask from "@/components/NewTask";

export default {
  name: "TaskManager",
  props:{
    tagsList:Array,
    mode:String
  },

  components:{

    NewTask,
    SortingTask,
    TasksList,
  },

  data(){
    return {
      tasksList:[],
      flag:"",
      tag : null,
      date : null,
    }
  },

  async created(){
    console.log("I am in created");
    this.tasksList =  await this.getTasks()
  },

  methods: {
   async getTasks(){

     const params = {}
     if(!!this.tag || !!this.date) {
       if(!!this.tag){
         params.tagName = this.tag.tagName
       }
       if(!!this.date){
         params.date = this.date
       }
     }
     const res = await getTasksByCriteria(params);
      return res.data
    },

    onNewTaskCreated(event) {
      console.log(event);
      const newTask={
        name:event.name,
        comment:event.comment,
        tagName:event.tag
      }
      this.tasksList.push(newTask)
    },

    showTasks(){
      console.log("show")
      this.flag="show"
    },

    createTask(){
      console.log("add")
      this.flag="add"
    },

    async onTagSelect(tagValue){
      console.log("TaskManager::onTagSelected")
      this.tag = tagValue
      this.tasksList = await this.getTasks()

    }
  }
}


</script>

<style scoped>

</style>