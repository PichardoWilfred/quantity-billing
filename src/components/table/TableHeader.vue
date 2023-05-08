<template lang="">
    <div class="flex items-center px-3 py-4 bg-white border-b-2 border-gray-2 shadow-[0_1px_4px_rgba(0,0,0,0.16)]">
        <input v-model="selected_list.label.value" type="text" class="w-[175px] h-[40px] rounded-[5px] bg-gray-1 border-2 border-gray-3 pl-2 py-0 focus-within:outline-none font-semibold">
        <button class="flex items-center justify-center hover:bg-gray-1 rounded-full lg:rounded-md max-lg:w-[50px] ml-1 lg:ml-2 mr-auto lg:pr-3 p-3 transition-all">
            <i class="fa-solid fa-print text-xl"></i>
            <span class="max-lg:hidden lg:flex text-md font-medium ml-2">Imprimir</span>
        </button>
        <button @click="open_modal" class="flex items-center justify-center hover:bg-gray-1 rounded-full lg:rounded-md max-lg:w-[50px] lg:pr-3 p-3 transition-all">
            <i class="fa-solid fa-trash text-xl"></i>
            <span class="max-lg:hidden lg:flex text-md font-medium ml-2">Eliminar tabla</span>
        </button>
    </div>
    <Modal_ @close="() => { modal = false }"></Modal_>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name: "TableHeader",
    data() {
        return {
            name: 'Lista #2',
            modal: false,
        }
    },
    computed: {
        ...mapGetters(['selected_list']),
    },
    methods: {
        open_modal(){
            this.modal = true;
        }
    }
}
</script>
<style lang="">
    
</style>