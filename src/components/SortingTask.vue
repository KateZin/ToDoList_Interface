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
        sm="6"
    >
      <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="dates"
          transition="scale-transition"
          offset-y
          min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-combobox
              v-model="dates"
              multiple
              chips
              small-chips
              label="Multiple picker in menu"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
          ></v-combobox>
        </template>
        <v-date-picker
            v-model="dates"
            multiple
            no-title
            scrollable
        >
          <v-spacer></v-spacer>
          <v-btn
              text
              color="primary"
              @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
              text
              color="primary"
              @click="$refs.menu.save(dates)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-col>
  </v-row>
</div>
</template>

<script>
// import TagManager from "@/components/TagManager";
import TagsList from "@/components/TagsList";

export default {
  name: "SortingTask",
  components: {TagsList},
  props:{
    tagsList: Array
  },

  data () {
    return {
      dates: [],
      menu: false,
      selectedTag: null
    }
  },

  methods:{
    onSelectTag(value){
      this.selectedTag=value
      this.$emit("selectedTag", this.selectedTag)
    }
  }

}
</script>

<style scoped>

</style>