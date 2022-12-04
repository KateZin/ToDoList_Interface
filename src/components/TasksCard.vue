<template >
  <div class="list">
  <v-row class="fill-height overflow-auto" id="container">
    <v-col
        v-for="(item,i) in tasksList"
        :key="i"
        :item = "item"
        :cols="(12/itemsPerRow)"
    >
      <v-card min-height="100" raised="true"  >
        <v-card-title class="header"  >
                  <span  >
                    <span class="text" v-text="item.name"></span>
                  </span>
        </v-card-title>
        <v-divider v-if="item.eventDate!==null"></v-divider>
        <br v-if="item.eventDate">
        <v-chip v-if="item.eventDate" v-text="processDate(item.eventDate)" class="date"></v-chip>
        <v-card-text>
          <br v-if="item.comment && !item.eventDate">
          <v-textarea
              v-if="item.comment"
              :value="item.comment"
              readonly
              class="comment"
              auto-grow
              outlined=true
              append-icon="mdi-comment"
          ></v-textarea>

        </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn icon outlined>
                    <v-icon @click.stop="()=>{dialogWindow=true; itemToEdit=item}">mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon outlined>
                    <v-icon @click="onDeleteTask(item)">mdi-check</v-icon>
                  </v-btn>
                </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  <EditTask v-if="dialogWindow" v-model="dialogWindow" :oldTask="itemToEdit" @editTask="onEditTask"/>
  </div>
</template>

<script>

import EditTask from "@/components/EditTask";

export default {
  name: "TasksCard",
  components: {
    EditTask
  },

  props:{
    tasksList: Array,
  },

  data(){
    return {
      quantityPerRow:5,
      dialogWindow:false,
      itemToEdit:''
    }
  },

  computed:{
    rowsNum(){
      return Math.ceil(this.tasksList.length / this.quantityPerRow)
    },

    numberOfPages () {
      return Math.ceil(this.beers.length / this.ipp)
    },

    rowsPerPage () {
      return this.rpp
    },

    itemsPerRow() {
      return 4;
    },

    ipp () {
      return Math.ceil(this.rowsPerPage * this.itemsPerRow)
    },
  },


  methods:{
    async onDeleteTask(item){
      this.$emit("deleteTask", item)
    },

    itemPosition(rowNum, colNum){
      return rowNum * this.quantityPerRow + colNum;
    },

    calcRowsPerPage () {
      let container = document.getElementById('container')
      let minItemHeight = 170
      if (container) {
        let containerHeight = parseInt(container.clientHeight, 0)
        this.rpp = Math.floor(containerHeight/minItemHeight)
      }
      else {
        this.rpp = 4
      }
    },

    processDate(date){
      if(date !== null)
      return date.substr(0, 10);
    },

    async onEditTask(item){
      this.$emit("editTask", item);
      this.itemToEdit = null
    },

  },

  created() {
    window.addEventListener('resize', () => {
      this.calcRowsPerPage()
    })
  },
}
</script>

<style >
.list{
  margin-bottom: 100px;
}

.text{
  font-family: Verdana;
  font-size: 20px;
  font-weight: bold;
}

.comment{
  font-family: Verdana;
  font-size: 12px;
}
.date{
  margin-left: 15px;
}

.header{
  background-color: orangered;
}
</style>


