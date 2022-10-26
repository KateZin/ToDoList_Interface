<template>
  <div >
    <TagsList v-bind:tagsList="tagsList" title="Tags"></TagsList>
  </div>
</template>

<script>
import TagsList from "@/components/TagsList";
import {getAllTags} from "@/components/js/api";

export default {
  name: "TagManager",
  components: {
    TagsList,
  },

  data() {
    return {
      tagsList: [],
      flag: ""
    }
  },
  async created(){
    console.log("I am in created");
    const res = await getAllTags();
    console.log(res);
    this.tagsList = res.data;
  },
}
</script>