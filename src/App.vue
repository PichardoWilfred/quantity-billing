<script>
import { mapGetters } from 'vuex';
import Navbar from "./components/Navbar.vue"
import TablesList from "./components/TablesList.vue"
import TableContent from "./components/table/TableContent.vue"
import TableHeader from "./components/table/TableHeader.vue"

export default {
  name: 'App',
  components: { Navbar, TablesList, TableHeader, TableContent },
  data() {
    return {
      select: false
    }
  },
  computed: {
    ...mapGetters(['selected_list']),
  },
  methods: {
    isValid(list) {
      return Boolean(Object.keys(list).length);
    },
    unselect() { // this whole logic is flopped should be change eventually
      if (this.select) {
        this.select = false;
        this.$refs.table_content.reset_list();
      }
    },
    enable_select() {
      this.select = true;
      this.$refs.table_content.enable_delete_mode();
    },
    select_finished() {
      this.select = false;
    }
  },

}
</script>
<template>
  <div class="flex flex-col h-screen">
    <Navbar @click="unselect" />
    <template v-if="isValid(selected_list)">
        <TablesList @click="unselect" />
        <TableHeader @click="unselect" @selecting="enable_select" @unselect="unselect" :select="select" />
        <TableContent ref="table_content" @select_finished="select_finished"/>
    </template>
    <template v-else>
      <div class="flex flex-col text-center items-center justify-center my-auto transition-all" @click="unselect"> 
        <img src="./assets/not-found-alt-bill.svg" class="translate-x-3 w-40" alt="" srcset="">
        <h2 class="font-bold text-black-1 text-lg p-4">
          No pudimos encontrar ninguna tabla en esta sesión.
        </h2>
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>
