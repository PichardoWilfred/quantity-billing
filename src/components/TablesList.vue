<template>
    <ul class="flex flex-shrink-0 space-x-10 px-4 flex-nowrap overflow-x-scroll pt-6 non-printable">
        <li v-for="(list, index) in lists" :key="index" class="flex-shrink-0 first:mr-0 font-light text-lg max-w-[90px] px-[5px] cursor-pointer truncate" 
        :class="{'selected': list.id === selected_list.id}" @click="save_and_select_list(list)">
            {{ list.label }}
        </li>
    </ul>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    name: "TablesList",
    data() {
        return {}
    },
    computed: {
        ...mapGetters(['lists','selected_list'])
    },
    methods: {
        save_and_select_list(list){
            this.update_lists({ field: 'items', data: this.selected_list.items })
            this.select_list(list)
        },
        ...mapActions(['select_list','update_lists'])
    }

}
</script>
<style scoped>
    .selected {
        @apply
        font-bold 
        relative
        pb-1
        after:content-['']
        after:absolute
        after:top-[1.69rem]
        after:bg-black
        after:h-[4px]
        after:w-[130%]
        after:left-[50%] 
        after:translate-x-[-50%]
        ;
    }
</style>