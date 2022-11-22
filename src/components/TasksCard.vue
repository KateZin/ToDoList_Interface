<template >
  <v-row class="fill-height overflow-auto" id="container">
    <v-col
        v-for="(item,i) in tasksList"
        :key="i"
        :item = "item"
        :cols="(12/itemsPerRow)"
    >
      <v-card min-height="200">
        <v-card-title>
                  <span >
                    <span v-text="item.name"></span>
                    <span v-text="item.tagName"></span>
                  </span>
        </v-card-title>
        <v-card-text>
          <v-divider v-if="item.comment!==null"></v-divider>
          <span v-text="item.comment"></span>
          <br>
          <v-divider v-if="item.eventDate!==null"></v-divider>
          <br>
          <br>
          <v-chip v-if="item.eventDate!==null" v-text="processDate(item.eventDate)"></v-chip>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn icon>
            <v-icon @click="onDeleteTask(item)">mdi-delete</v-icon>
          </v-btn>

        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

export default {
  name: "TasksCard",
  props:{
    tasksList: Array,
  },

  data(){
    return {
      quantityPerRow:5,
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
    }
  },

  created() {
    window.addEventListener('resize', () => {
      this.calcRowsPerPage()
    })
  },
}
</script>

<style >

</style>


