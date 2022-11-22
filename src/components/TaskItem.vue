<template>
  <v-card
      color="deep-orange">
    {{task}}
    id:{{task.name}}
    itemId:{{task.id}}
    <br>
    Comment:{{task.comment}}
    <br>
    Tag:{{task.tagName}}
    Date:{{task.eventDate}}
    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-bookmark</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>

</template>

<script>
export default {
  name: "TaskItem",
  props: {
    task: Object,
  },
}
</script>

<style scoped>

</style>
