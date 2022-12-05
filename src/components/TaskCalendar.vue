<template>
<div>
  <h2 class="text-md-center">Calendar</h2>
  <v-sheet
    tile
    height="54"
    class="d-flex"
  >
    <v-btn
      icon
      class="ma-2"
      @click="$refs.calendar.prev()"
    >
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
    <v-select
      v-model="weekday"
      :items="weekdays"
      dense
      outlined
      hide-details
      label="weekdays"
      class="ma-2"
    ></v-select>
    <v-btn
      icon
      class="ma-2"
      @click="$refs.calendar.next()"
    >
      <v-icon>mdi-chevron-right</v-icon>
    </v-btn>
  </v-sheet>
  <v-sheet height="600">
      <div
          class="ma-4"
          style="height: 100%"
      >
        <v-calendar
            :events="tasks"
            ref="calendar"
            v-model="value"
            :weekdays="weekday"
            :type="type"
            event-color="deep-orange"
            @click:event="showEvent"
        ></v-calendar>
      </div>
  <v-menu
      v-model="selectedOpen"
      :close-on-content-click="false"
      :activator="selectedElement"
      offset-x
  >
    <v-card
        color="deep-orange"
        min-width="350px"
        flat
    >
      <v-toolbar>
        <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-textarea
            :value="selectedEvent.comment"
            readonly
            class="comment"
            auto-grow
            outlined=true
            append-icon="mdi-comment"
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-btn
            text
            color="deep-orange"
            @click="selectedOpen = false"
        >
          Cancel
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</v-sheet>
</div>
</template>

<script>
import {getTasksByCriteria} from "@/components/js/api";

export default {
  name: 'TaskCalendar',

  data: () => {
    return {
      tasksList:[],
      tasks:[],
      type: 'month',
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { text: 'Sunday - Saturday', value: [0, 1, 2, 3, 4, 5, 6] },
        { text: 'Monday - Sunday', value: [1, 2, 3, 4, 5, 6, 0] },
        { text: 'Monday - Friday', value: [1, 2, 3, 4, 5] },
        { text: 'Monday, Wednesday, Friday', value: [1, 3, 5] },
      ],
      value: '',
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
    };
  },

  async created(){
    this.tasksList =  await this.getTasks()
    for(let item of this.tasksList){
      console.log(item)
      if(item.eventDate) {
        const task = {
          name: item.name,
          comment: item.comment,
          start: this.processDate(item.eventDate),
          timed: false
        }
        console.log(task)
        this.tasks.push(task)
      }
    }
  },

  methods: {
    async getTasks(){
      const params = {}
      const res = await getTasksByCriteria(params);
      return res.data
    },

    processDate(date){
      if(date !== null)
        return date.substr(0, 10);
    },

    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
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
</style>
