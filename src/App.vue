<template>
  <div>
  <div v-if="!auth">
    <v-parallax
        max-height="2000"
        src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
    >
      <h1 class="greeting">NICE TO MEET YOU!</h1>
      <br>
      <h3 class="greeting-text">It's time to make a TODO LIST and go to your GOAL {{auth}}</h3>
      <br>
    </v-parallax>
    <v-btn class="center" >
      <a href="http://localhost:8080/oauth2/authorization/google">Click here to log in</a></v-btn>
      <div color="deep-orange" class="quote">“  If you're going through hell, keep going  ”</div>
  </div>

  <v-app id="inspire" v-if="auth">
    <v-parallax
        height="400"
        img :src="getImg()"
    >
      <v-navigation-drawer
          v-model="drawer"
          app
          :color=getColour()
      >
        <div class="menu">
          <v-btn x-large @click="createTask"  elevation="24"  large block="true" >
            <v-icon left>
              mdi-plus
            </v-icon>
            Create new task</v-btn>
          <br>
          <v-btn @click="showTasks" block="true" x-large>
            <v-icon left>
              mdi-format-list-bulleted-square
            </v-icon>
             Tasks</v-btn>
          <br>
          <v-btn @click="showTags" block="true" x-large>
            <v-icon left>
              mdi-dialpad
            </v-icon>
            Tags</v-btn>
          <br>

        <v-btn @click="showCalendar" block="true" x-large>
          <v-icon left>
            mdi-calendar
          </v-icon>
          Calendar</v-btn>
        <br>
          <v-btn icon class="bulb" x-large outlined>
            <v-icon large @click="changeTheme">mdi-lightbulb</v-icon>
          </v-btn>
          <br>

        </div>
      </v-navigation-drawer>
    </v-parallax>
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-row>
      <v-toolbar-title class="text-md-center">ToDo</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-col
            cols="12"
            sm="2" >
          <v-btn large @click="logOut" color="red" >Log out</v-btn>
        </v-col>

       </v-row>
    </v-app-bar>
    <v-main>

      <TaskManager v-if="showTaskManager()" :tagsList="tagsList" :mode="taskManagerMode" @newTagCreated="PushTag" ></TaskManager>
      <TagManager v-if="flag==='showTags'" @deletedTag="onTagDeleted"></TagManager>
      <TaskCalendar v-if="flag ==='calendar'" ></TaskCalendar>

    </v-main>

  </v-app>
 </div>
</template>


<script>
import {getAllTags, getTasksByCriteria, getUser, logOut} from "@/components/js/api";
import TaskManager from "@/components/TaskManager";
import TagManager from "@/components/TagManager";
import TaskCalendar from "@/components/TaskCalendar";


export default {
  components:{
    TaskCalendar,
    TaskManager,
    TagManager,
  },

  data(){
    return {
      user: {
        id:"",
        userName:"",
        email:"",
      },
      auth: false,
      drawer: null,
      tasksList:[],
      tagsList: [],
      flag:"show",
      theme: { dark: false },
      taskManagerMode:"show",
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
    this.auth = await this.isAuthorized()
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


    showCalendar(){
      this.flag="calendar"
    },

    PushTag(value){
      const newTag = {
        tagName:value.tagName
      }
      this.tagsList.push(newTag)
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
    },

    async onTagDeleted(){
      const tags = await getAllTags();
      console.log(tags);
      this.tagsList = tags.data;
    },

    async isAuthorized(){
      this.user = await getUser()
      console.log("CHECK USER")
      console.log(this.user)
      return this.user.data.email
    },

    async logOut(){
      await logOut()
      this.auth = false
    },

    changeTheme(){
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      this.theme.dark = !this.theme.dark
    },

    getColour(){
      if(this.theme.dark){
          return "grey darken-3"
      }
      if(!this.theme.dark){
        return "deep-orange"
      }
    },

    getImg(){
      console.log(this.theme.dark)
      if(this.theme.dark){
        return require("./assets/flow.jpg")
      }
      if(!this.theme.dark){
        return require("./assets/geometry.jpg")
      }
    }
  }
}

</script>

<style scoped>
.center{
  display: flex;
  justify-content: center;
  /*margin: -60px auto;*/
  margin-top: -180px;
  margin-left: 20px;
  font-size: large;
  font-style: revert;
}

.quote{
  display: flex;
  color:orangered;
  justify-content: center;
  margin-top: 240px;
  font-size: xxx-large;
  font-style: revert;
}

.menu{
  margin-top: 60px;
}

.bulb{
  margin-top: 330px;
  margin-left: 30px;
}

.text-md-center{
  font-size: xx-large;
  font-style: revert;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  margin-left: 500px;
  margin-top: 7px;
}

.greeting{
  font-size: xxx-large;
  font-style: revert;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  margin-top: 7px;
}
.greeting-text{
  font-size: x-large;
  font-style: revert;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  margin-top: 7px;
}
</style>