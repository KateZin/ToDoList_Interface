<template>
  <div>
    <v-select
        label="Tags"
        v-bind:items="tagsList"
        v-model="selectedItem"
        item-text="tagName"
        return-object
        single-line
        clearable=true
        @change="changeTag"
    ></v-select>

  </div>
</template>

<script>
export default {
  name: "TagsList",

  props:{
    tagsList: Array,
    title: String
  },

  data(){
    return {
      tagNames: Array,
      selectedItem: ''
    }
  },

  methods:{
    changeTag(){
      console.log("TagsList::changeTag")
      this.$emit("selected", this.selectedItem)
      this.selectedItem = ''
    }
  }

}

</script>

<style scoped>

</style>