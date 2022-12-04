<template>
  <div>

  <v-expansion-panels class="list">
    <v-expansion-panel
        v-for="(item,i) in tasksList"
        :key="i"
        :item = "item"
    >
      <v-expansion-panel-header >
        <v-row>
          <v-col
              cols="12"
              sm="6"
          >
        <span class="text" v-text="item.name" ></span>
          </v-col>
          <v-spacer></v-spacer>
          <v-col
              cols="12"
              sm="2"
          >
        <v-chip v-if="item.tagName"  color="deep-orange"
               left text-color="white" >{{item.tagName}}
          </v-chip>
          </v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-btn icon >
          <v-icon v-if="item.comment" @click="changeComment(item)" :color=getCommentColour() large>mdi-comment</v-icon>
        </v-btn>
        <span v-if="!readOnly && item.comment" >You can edit comment</span>
        <span v-if="readOnly && item.comment" >Click to edit comment</span>
        <v-textarea
            v-if="item.comment"
            :value="item.comment"
            v-model="item.comment"
            class="comment"
            :readonly="readOnly"
            auto-grow
            outlined=true
        ></v-textarea>

        <div v-if="item.eventDate">
        <v-chip v-text="processDate(item.eventDate)"></v-chip>
        </div>
        <v-row>
          <v-col
              cols="12"
              sm="2"
          >
            <br>
            <v-btn large @click.stop="dialogWindow=true">Edit</v-btn>
              <EditTask v-model="dialogWindow" :old-task="item" @editTask="onEditTask"/>
          </v-col>
          <v-col
              cols="12"
              sm="2"
          >
            <br>
            <v-btn @click="onDeleteTask(item)" color="red">Done</v-btn>
          </v-col>
        </v-row>

      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
  </div>
</template>

<script>

import EditTask from "@/components/EditTask";
export default {
  name: "TasksList",
  components: {
    EditTask
  },

  data(){
    return{
      dialogWindow: false,
      readOnly:true
    }
  },

  props:{
    tasksList: Array,
    title: String
  },

  methods:{
    async onDeleteTask(item){
     this.$emit("deleteTask", item)
    },

    async onEditTask(item){
      this.$emit("editTask", item);
    },

    processDate(date){
        return date.substr(0, 10);
    },

    async changeComment(item){
      if(this.readOnly === false) {
        this.$emit("editTask", item);
      }
      this.readOnly = !this.readOnly
    },

   getCommentColour(){
      if(this.readOnly){
        return "grey"
      }
      else if(!this.readOnly){
        return "deep-orange"
      }
    }

  }

}
</script>

<style >
chipStyle {
  position: absolute; right: 0;
}
.list{
  margin-bottom: 500px;
}
.text{
  font-family: Verdana;
  font-size: 20px;
  font-weight: bold;
}

textarea{
  font-family: Verdana;
  height:5px;
  font-size: 18px
}
</style>


