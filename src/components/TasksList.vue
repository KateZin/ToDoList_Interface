<template>
  <div>
  <v-expansion-panels>
    <v-expansion-panel
        v-for="(item,i) in tasksList"
        :key="i"
        :item = "item"
    >
      <v-expansion-panel-header>
        {{item.name}}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        id:{{item.id}}
        itemId:{{item.id}}
        <br>
        Comment:{{item.comment}}
        <br>
        Tag:{{item.tagName}}
        Date:{{item.eventDate}}

        <v-row>
          <v-col
              cols="12"
              sm="2"
          >
            <br>
            <v-btn large @click.stop="dialogWindow=true">Edit</v-btn>
              <EditTask v-model="dialogWindow" :old-task="item" />
          </v-col>
          <v-col
              cols="12"
              sm="2"
          >
            <br>
            <v-btn @click="onDeleteTask(item)" color="red">Delete</v-btn>
          </v-col>
        </v-row>

      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

    <EditTask v-if="dialogWindow===true" v-bind:dialogWindow="dialogWindow"></EditTask>
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
      dialogWindow: false
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

    async editTask(item){
      this.$emit("editTask", item);
    },

    showDialogWindow(){
      this.dialogWindow=true
      console.log(this.dialogWindow)
    }
  }

}
</script>

<style >

</style>


