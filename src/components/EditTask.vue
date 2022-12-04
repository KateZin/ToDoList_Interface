<template>
  <v-dialog v-model="show" max-width="700px"  >
    <v-card >
      <v-card-text class="v-card-text">

        <v-container>
              <br>
          <H2 class="text-md-center">Edit Task</H2>
              <br>
              <br>
              <v-text-field
                  v-model="name"
                  label="Task"
                  outlined
                  clearable
                  :rules="rules"
              ></v-text-field>


              <v-textarea class="comment"
                          placeholder="Comment"
                          v-model="comment"
                          auto-grow
                          outlined=true
                          append-icon="mdi-comment"
              ></v-textarea>

            <v-btn @click="onDateAdd">Add date</v-btn>
            <br>
                <template v-if="flag==='showCalendar'">
                  <v-date-picker
                      v-model="date"
                      color="deep-orange"
                      header-color="deep-orange"
                      no-title
                      scrollable
                  ></v-date-picker>
                </template>

        </v-container>
      </v-card-text>
      <v-card-actions>
        <br>
        <br>
        <br>
        <v-btn color="deep-orange" flat @click.stop="show=false; eraseValues">Cancel</v-btn>
        <v-btn color="deep-orange" flat @click="saveValues" >Save</v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script>

export default {
  props: {
    value: Boolean,
    oldTask:Object,
  },

  data(){
    return{
      flag:'',
      editingName:false,
      name: this.oldTask?.name,
      comment: this.oldTask?.comment,
      date: this.oldTask?.eventDate,
      rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
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
      setProperty(){
        console.log("i am in set property task")
        this.name = this.oldTask.name;
      }
    }
  },

  methods: {

    onDateAdd(){
      this.flag="showCalendar"
    },

    eraseValues(){
      this.name = "";
      this.comment = "";
      this.tag = "";
      this.eventDate = ""
    },

    async saveValues() {
      if(!this.name){
        return
      }
      const editTask = {
        id: this.oldTask.id
      };
      if(this.oldTask.name !== this.name){
        editTask.name = this.name;
      }
      if(this.oldTask.comment !== this.comment){
        editTask.comment = this.comment || "";
      }
      if(this.oldTask.eventDate !== this.date){
        editTask.eventDate = this.date;
      }
      this.$emit("editTask", editTask)
      this.show=false
    }
  }
}
</script>

<style>
[contentEditable=true]:empty:not(:focus):before {
  content: attr(data-text)
}


.comment{
  font-family: Verdana;
  font-size: 12px;
}


</style>