<template>
  <div>
    <v-row>
      <v-col
          cols="12"
          sm="12"
      >
  <v-text-field
      label="New Tag"
      v-model="newTag"
  ></v-text-field>
    <v-btn @click="createNewTag"> Create </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {addTag} from "@/components/js/api";
export default {
  name: "NewTag",
  data(){
    return{
      newTag: ''
    }
  },

  methods: {
    async createNewTag() {
      const tag = {
        tagName: this.newTag,
      }
      await addTag(tag)
      this.$emit("newTagCreated", tag)
      this.newTag = ''
    },
  }

}
</script>

<style scoped>
</style>