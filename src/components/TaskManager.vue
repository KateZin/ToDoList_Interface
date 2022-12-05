<template>
  <div >
    <template v-if="mode==='show'">
      <p class="text-md-center" >
        You CAN do it!
      </p>
      <v-container
          class="px-0"
          fluid
      >
        <v-switch
            v-model="switch1"
            :label="`Change the display of tasks`"
        ></v-switch>
      </v-container>
      <SortingTask
          :tagsList="tagsList"
          @selectedTag="onTagSelect"
          @selectedDate="onSelectedDate"
      ></SortingTask>
      <TasksList
          v-if="switch1===false && calendar===false"
          v-bind:tasksList="tasksList"
          title="Tasks" @deleteTask="onDeleteTask"
          @editTask="onEditTask"
      ></TasksList>
      <TasksCard
          v-if="switch1===true && calendar===false"
          v-bind:tasksList="tasksList"
          title="Cards"
          @deleteTask="onDeleteTask"
          @editTask="onEditTask" ></TasksCard>
    </template>
    <template v-if="mode==='add'">
      <NewTask
          :tagsList="tagsList"
          @newTaskCreated="onNewTaskCreated"
          @newTagCreated="CreateNewTag"
      ></NewTask>
    </template>
  </div>
</template>

<script>

/* eslint-disable */
import TasksList from "@/components/TasksList";
import {deleteTask, getTasksByCriteria, editTask} from "@/components/js/api";
import SortingTask from "@/components/SortingTask";
import NewTask from "@/components/NewTask";
import TasksCard from "@/components/TasksCard";

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
    TasksCard,
  },

  data(){
    return {
      switch1: false,
      calendar: false,
      showMode: "list",
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

    showCalendar(){
      if(this.calendar === true){
        this.calendar = false
      }
      if(this.calendar === false){
        this.calendar = true
      }
    },

    CreateNewTag(value){
      this.$emit("newTagCreated", value)
    },

    onNewTaskCreated(event) {
      console.log(event);
      const newTask={
        id:event.id,
        name:event.name,
        comment:event.comment,
        tagName:event.tag,
        eventDate:event.eventDate
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
    },

    async onSelectedDate(dateValue){
      console.log("TaskManager::onDateSelected")
      this.date = dateValue
      this.tasksList = await this.getTasks()
    },

    async onDeleteTask(item){
      await deleteTask(item)
      this.tasksList = await this.getTasks()
    },

    async onEditTask(item){
      await editTask(item.id, item)
      this.tasksList = await this.getTasks()
    }
  }
}
</script>

<style scoped>
.text-md-center{
  font-size: xxx-large;
  font-style: revert;
  font-family: 'Courier New', monospace;
  font-weight: bold;
}
</style>