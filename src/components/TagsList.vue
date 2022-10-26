<template>
  <div>
    <v-select
        label="Tags"
        v-bind:items="tagsList"
        v-model="selectedItem"
        item-text="tagName"
        return-object
        single-line
        clearable="true"
        @change="changeTag"
    ></v-select>

  </div>
</template>

<script>
export default {
  name: "TagsList",

  props:{
    tagsList: Array,
    selectedTag: Object,
    title: String
  },

  // model:{
  //   prop:"selectedTag",
  //   event:"selected"
  // },

  data(){
    return {
     tagNames: Array,
      selectedItem: this.selectedTag
    }
  },

  methods:{
    changeTag(){
      console.log("TagsList::changeTag")
      this.$emit("selected", this.selectedItem)
    }
  }

}

</script>

<style scoped>

</style>