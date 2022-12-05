<template>
  <v-dialog
      v-model="show"
      max-width="700px"
  >
    <v-card>
      <v-card-text>
        <v-container>
          <H2 class="text-md-center">Edit Tag</H2>
          <v-row>
            <v-col
                cols="12"
                sm="6"
                md="4"
            >
              <v-text-field
                  v-model="name"
                  label="Tag"
                  outlined
                  clearable
                  :rules="rules"
                  class="v-text"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <br>
        <br>
        <br>
        <v-btn
            color="deep-orange"
            flat @click.stop="() => {eraseValues}"
        >
          Cancel
        </v-btn>
        <v-btn
            color="deep-orange"
            flat @click="saveValues"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import {editTag} from "@/components/js/api";

export default {
  name: "EditTag",

  props: {
    value: Boolean,
    oldTag:Object,
  },

  data(){
    return{
      flag:'',
      editingName:false,
      name: this.oldTag?.tagName,
      curTag: this.oldTag,
      rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 1) || 'Min 1 characters',
      ]
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
    },
  },

  methods: {
    eraseValues(){
      this.name = "";
      this.curTag = null
      this.show=false;
    },

    async saveValues() {
      if(this.name!==this.oldTag.tagName) {
        const tagToEdit = {
          id: this.oldTag.id,
          tagName: this.name
        }
        await editTag(tagToEdit.id, tagToEdit)
      }
      this.show=false
      this.name = ""
      this.curTag = null
      console.log(this.curTag)
      this.$emit("editedTag")
    },
  }
}
</script>

<style scoped>
.v-text{
  margin-top: 50px;
  text-align: center;
}
.text-md-center{
  margin-top: 20px;
}
</style>