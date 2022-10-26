<template>
  <div>
    <h3>You CAN do it!</h3>
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
        Comment:{{item.comment}}
        <br>
        Tag:{{item.tagName}}
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

  </div>
</template>

<script>

export default {
  name: "TasksList",
  components: {
  },

  props:{
    tasksList: Array,
    title: String
  },

}
</script>

<style scoped>

</style>


