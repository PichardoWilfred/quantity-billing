<template>
    <ul class="flex flex-shrink-0 space-x-10 px-4 flex-nowrap overflow-scroll pt-6">
        <li v-for="(table, index) in tables" :key="index" class="flex-shrink-0 first:mr-0 font-light text-lg max-w-[100%] mb-1" :class="{'selected': table.selected}">
            {{ table.name }}
        </li>
    </ul>
</template>
<script>
export default {
    name: "TablesList",
    data() {
        return {
            tables: [
                { name: 'table 1', selected: true },
                { name: 'table 2', selected: false },
                { name: 'table 3', selected: false },
                { name: 'table 3', selected: false },
                { name: 'table 3', selected: false },
                { name: 'table 3', selected: false },
                { name: 'table 3', selected: false },
                { name: 'table 3', selected: false },
                { name: 'table 3', selected: false },
            ]
        }
    },
}
</script>
<style scoped>
    .selected {
        @apply font-bold relative
        after:content-['']
        after:absolute
        after:top-[1.6rem]
        after:bg-black
        after:h-[4px]
        after:w-[130%]
        after:left-[50%] after:translate-x-[-50%];
    }
</style>