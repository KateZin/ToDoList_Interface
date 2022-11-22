<template>
<div>
  <v-row>
    <v-col
        cols="12"
        sm="6"
    >
      <TagsList v-bind:tagsList="tagsList" title="Tags"  @selected="onSelectTag" ></TagsList>
    </v-col>
    <v-col
        cols="12"
        lg="6"
    >
      <v-menu
          v-model="menu"
          :close-on-content-click="false"
          max-width="290"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
              :value="date"
              clearable
              label="Date"
              readonly
              v-bind="attrs"
              v-on="on"
              @click:clear="date = null, onSelectDate()"
          ></v-text-field>
        </template>
        <v-date-picker
            v-model="date"
            @change="menu = false, onSelectDate()"
        ></v-date-picker>
      </v-menu>
    </v-col>
  </v-row>
</div>
</template>

<script>
import TagsList from "@/components/TagsList";

export default {
  name: "SortingTask",
  components: {TagsList},
  props:{
    tagsList: Array
  },

  data () {
    return {
      date: null,
      menu: false,
      selectedTag: null,
    }
  },

  methods:{
    onSelectTag(value){
      this.selectedTag=value
      this.$emit("selectedTag", this.selectedTag)
    },

    onSelectDate(){
      console.log(this.date)
      this.$emit("selectedDate", this.date)
    },

  }

}
</script>

<style scoped>

</style>