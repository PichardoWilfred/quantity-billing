<script>
import Navbar from "./components/Navbar.vue"
import TablesList from "./components/TablesList.vue"
import TableContent from "./components/table/TableContent.vue"
import TableHeader from "./components/table/TableHeader.vue"

export default {
  name: 'App',
  components: { Navbar, TablesList, TableHeader, TableContent }
}
</script>

<template>
  <div class="flex flex-col h-screen">
    <Navbar />
    <TablesList />
    <TableHeader />
    <TableContent />
  </div>
</template>

<style scoped>

</style>
