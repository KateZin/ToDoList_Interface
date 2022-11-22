<template>
  <div>
    <v-container>
    <H2>Add new Task</H2>
    <v-text-field label="Enter task" v-model="name"></v-text-field>
    <v-text-field label="Comment" v-model="comment"></v-text-field>
    <v-row>
    <v-col
        cols="12"
        sm="4"
    >
    <TagsList v-bind:tagsList="tagsList" title="Tags"  @selected="onSelectTag"></TagsList>

    </v-col>
    <v-col
        cols="12"
        sm="2" >
    <v-btn @click="onNewTag" >Create new tag</v-btn>
    </v-col>

    <v-col
        cols="12"
        sm="4" >
   <NewTag v-if="flag==='newTag'" @newTagCreated="onNewTagCreated" ></NewTag>
    </v-col>
    </v-row>

    <v-btn @click="onDateAdd" v-madel="date">Add date</v-btn>
      <br>
      <v-row>
        <v-col
            cols="12"
            sm="4" >
      <template v-if="flag==='showCalendar'">
        <v-date-picker
            v-model="date"
            color="deep-orange"
            header-color="deep-orange"
            no-title
            scrollable
        ></v-date-picker>
      </template>
        </v-col>
      </v-row>
<br>


  <v-btn @click="createNewTask">Add  task</v-btn>
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
     flag:""
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
      await addTask(task)
      console.log("a have added a new task!")
      this.$emit("newTaskCreated", task)
    },

    onNewTagCreated(value) {
      this.$emit("newTagCreated", value)
    },

    onSelectTag(value){
      this.tag=value.tagName
    },

    onNewTag(){
      console.log("flag = new tag")
      this.flag="newTag"
    },

    onDateAdd(){
      this.flag="showCalendar"
    }
  },
};
</script>

<style></style>