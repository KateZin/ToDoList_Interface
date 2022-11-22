<template>
  <v-dialog v-model="show" max-width="700px" >
    <v-card >
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
              <h3>Task: </h3>
              <h3 contenteditable @input="setName($event)">
                {{ oldTask.name }}
              </h3>
            </v-col>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
            </v-col>
            <v-col cols="12">
              <h3>Comment: </h3>
              <h2 v-if="oldTask.comment!==''" contenteditable @input="setComment($event)">
                {{ oldTask.comment }}
              </h2>
              <div v-if="oldTask.comment === ''" contentEditable=true data-text="Enter comment here"></div>
            </v-col>
            <v-btn @click="onDateAdd" v-model="date">Add date</v-btn>
            <br>
                <template v-if="flag==='showCalendar'">
                  <v-date-picker
                      v-model="date"
                      color="deep-orange"
                      header-color="deep-orange"
                      no-title
                      scrollable
                  ></v-date-picker>
                </template>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <br>
        <br>
        <br>
        <v-btn color="deep-orange" flat @click.stop="show=false; eraseValues">Cancel</v-btn>
        <v-btn color="deep-orange" flat @click="saveValues" @click.stop="show=false">Save</v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script>
import {editTask} from "@/components/js/api";
export default {
  props: {
    value: Boolean,
    oldTask:Object,
  },

  data(){
    return{
      flag:'',
      editingName:false,
      tag:'',
      name:'',
      comment:'',
      date:'',
      editedTask:{}
    }
  },
  computed: {
    show: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      },
      setProperty(){
        this.name = this.oldTask.name;
      }
    }
  },

  methods: {
    setName(e) {
      const inputText = e.target.innerText;
      this.name = inputText;
      editTask.name=inputText
    },
    onDateAdd(){
      this.flag="showCalendar"
    },
    setTag(e){
      const inputText = e.target.innerText;
      this.tag = inputText;
    },
    setComment(e){
      const inputText = e.target.innerText;
      this.comment = inputText;
      editTask.comment=inputText
    },
    eraseValues(){
      this.name = "";
      this.comment = "";
      this.tag = "";
      this.eventDate = ""
    },

    async saveValues() {
      let newTask = {
        name: this.name,
        comment: this.comment,
        date: this.date
      }
      console.log(this.editedTask)
      await editTask(newTask);
      this.$emit("editTask", newTask)
    }
  }
}
</script>

<style>
[contentEditable=true]:empty:not(:focus):before {
  content: attr(data-text)
}
</style>