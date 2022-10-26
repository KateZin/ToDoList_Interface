<template>
  <v-app id="inspire">
    <v-navigation-drawer
        v-model="drawer"
        app
        color = "deep-orange"
    >

      <v-btn @click="showTasks" block="true">Show all tasks</v-btn>
      <br>
      <v-btn @click="showTags" block="true">Show all tags</v-btn>
      <br>
      <v-btn @click="createTask" block="true">Create new task</v-btn>


    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>ToDo</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <TaskManager v-if="showTaskManager()" :tagsList="tagsList" :mode="taskManagerMode" ></TaskManager>
      <TagManager v-if="flag==='showTags'"></TagManager>

    </v-main>
  </v-app>
</template>


<script>
 // import TasksList from "@/components/TasksList";
import {getTasksByCriteria} from "@/components/js/api";
 import {getAllTags} from "@/components/js/api";
 import TaskManager from "@/components/TaskManager";
 import TagManager from "@/components/TagManager";

export default {
  components:{
    TaskManager,
    TagManager,
  },

  data(){
    return {
      drawer: null,
      tasksList:[],
      tagsList: [],
      flag:"show",
      taskManagerMode:"show"
    }
  },

  async created(){
    console.log("I am in created");
    const res = await getTasksByCriteria({date:"2020-12-10"});
    console.log(res);
    this.tasksList = res.data;
    const tags = await getAllTags();
    console.log(tags);
    this.tagsList = tags.data;
  },

  methods:{
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
      this.flag="show"
      this.taskManagerMode='show'
      console.log(this.flag)
    },

    createTask(){
      console.log("add")
      this.flag="add"
      this.taskManagerMode='add'
    },

    showTags(){
      this.flag="showTags"
    },

    showTaskManager(){
      console.log("check btn " + this.flag==='show' || this.flag==='add')
      return this.flag==='show' || this.flag==='add'
    }

  }
}


</script>