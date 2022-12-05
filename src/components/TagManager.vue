<template>
  <div >
    <h2 class="text-md-center">Tags</h2>
    <TagsList
        v-bind:tagsList="tagsList"
        title="Tags"
    ></TagsList>
    <v-container class="list">
      <v-row class="fill-height overflow-auto">
        <v-col
          v-for="(item,i) in tagsList"
          :key="i"
          :item = "item"
          :cols="(12/itemsPerRow)"
        >
          <v-card min-height="20">
            <v-card-title>
              <span v-text="item.tagName" ></span>
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon
                  @click="()=>{ dialogWindow=true, itemToEdit=item}"
                >
                mdi-pencil
                </v-icon>
              </v-btn>
              <v-btn icon>
                <v-icon
                  @click="onDeleteTag(item)"
                >
                mdi-delete
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <EditTag
          v-if="dialogWindow"
          v-model="dialogWindow"
          :oldTag="itemToEdit"
          @editedTag="updateTags"
      ></EditTag>
    </v-container>
  </div>
</template>

<script>
import TagsList from "@/components/TagsList";
import {deleteTag, getAllTags} from "@/components/js/api";
import EditTag from "@/components/EditTag";

export default {
  name: "TagManager",
  components: {
    EditTag,
    TagsList,
  },

  data() {
    return {
      tagsList: [],
      flag: "",
      edit: false,
      itemToEdit:{},
      dialogWindow: false
    }
  },

  async created(){
    console.log("I am in created in tag manager to get tags");
    const res = await getAllTags();
    console.log(res.data);
    this.tagsList = res.data;
  },

  computed:{
    rowsNum(){
      return Math.ceil(this.tasksList.length / this.quantityPerRow)
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

  methods: {
    itemPosition(rowNum, colNum) {
      return rowNum * this.quantityPerRow + colNum;
    },

    calcRowsPerPage() {
      let container = document.getElementById('container')
      let minItemHeight = 170
      if (container) {
        let containerHeight = parseInt(container.clientHeight, 0)
        this.rpp = Math.floor(containerHeight / minItemHeight)
      } else {
        this.rpp = 4
      }
    },

    processDate(date) {
      if (date !== null)
        return date.substr(0, 10);
    },

    async updateTags(){
      const res = await getAllTags();
      this.tagsList = res.data;
      this.itemToEdit = null;
    },

    async onDeleteTag(item){
        await deleteTag(item)
      const res = await getAllTags();
      this.tagsList = res.data;
      this.$emit("deletedTag")
    },
  }

}
</script>

<style>
.text-md-center{
  font-size: xxx-large;
  font-style: revert;
  font-family: 'Courier New', monospace;
  font-weight: bold;
}
.list{
  margin-bottom: 500px;
}
</style>