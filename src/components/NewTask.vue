<template>
  <div>
    <v-container class="container">
    <H2 class="text-md-center">Add new Task</H2>
    <v-text-field
        class='task'
        label="Enter task"
        v-model="name"
        :rules="rules"
    ></v-text-field>
      <br>
      <v-textarea
          class='comment'
          placeholder="Comment"
          outlined
          auto-grow
          v-model="comment"></v-textarea>
    <v-row>
    <v-col
        cols="12"
        sm="4"
    >
    <TagsList
        v-bind:tagsList="tagsList"
        title="Tags"
        @selected="onSelectTag"
    ></TagsList>
    </v-col>
    <v-col
        cols="12"
        sm="2" >
    <v-btn @click="onNewTag">Create new tag</v-btn>
    </v-col>
    <v-col
        cols="12"
        sm="4" >
   <NewTag
       v-if="flag==='newTag'"
       @newTagCreated="onNewTagCreated"
   ></NewTag>
    </v-col>
    </v-row>
      <v-row>
      <h3>{{date}}</h3>
      <v-btn icon v-if="date">
        <v-icon @click="onDeleteDate">mdi-delete</v-icon>
      </v-btn>
      </v-row>
      <br>
    <v-btn @click="onDateAdd">Add date</v-btn>
      <br>
      <v-row>
        <v-col
            cols="12"
            sm="4" >
      <template v-if="showCalendar==='show'">
        <v-date-picker
            v-model="date"
            color="deep-orange"
            header-color="deep-orange"
            no-title
            scrollable
            :allowed-dates="disablePastDates"
        ></v-date-picker>
      </template>
        </v-col>
      </v-row>
      <br>
      <v-btn
          @click="createNewTask"
          color="deep-orange"
          x-large
      >
        Add  task
      </v-btn>
    </v-container>
  </div>
</template>

<script>
import {addTask} from "@/components/js/api";
import TagsList from "@/components/TagsList";
import NewTag from "@/components/NewTag";

export default {
  name: "NewTask",
  components: {
    NewTag,
    TagsList
  },
  props: {
    tagsList:Array
  },

  data() {
   return {
     name: "",
     comment: "",
     tag: "",
     date:"",
     flag:"",
     showCalendar: 'hide',
     rules: [
       value => !!value || 'Required.',
       value => (value && value.length >= 1) || 'Min 3 characters',
     ]
   }
  },

  methods: {
    async createNewTask(){
      const task = {
       name:this.name,
        comment:this.comment,
        tag:this.tag,
        eventDate:this.date
      }
      const newTask = await addTask(task)
      task.id = newTask.id
      this.$emit("newTaskCreated", task)
      this.name = ''
      this.comment = ''
      this.date = ''
    },

    onNewTagCreated(value) {
      this.$emit("newTagCreated", value)
      this.flag = ''
    },

    disablePastDates(val) {
      return val >= new Date().toISOString().substr(0, 10)
    },

    onSelectTag(value){
      this.tag=value.tagName
    },

    onDeleteDate(){
      this.date = ''
    },

    onNewTag(){
      this.flag="newTag"
    },

    onDateAdd(){
      if(this.showCalendar==='hide') {
        this.showCalendar = 'show'
      }
      else if(this.showCalendar==='show') {
        this.showCalendar = 'hide'
      }
    }
  },
};
</script>

<style>
.text-md-center{
  font-size: xxx-large;
  font-style: revert;
  font-family: 'Courier New', monospace;
  font-weight: bold;
}
.comment {
  color: white;
  font-family: Verdana;
  font-size: 20px;
  height:160px;
  width: 500px;
}
.task{
  margin-top: 20px;
  color: white;
  font-family: Verdana;
  font-size: 20px;
  width: 500px;
}
.container{
  margin-bottom: 50px;
}
</style>