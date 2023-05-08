<template>
    <main class="flex max-lg:flex-col justify-start items-start content-start lg:flex-wrap bg-gray-1 overflow-y-scroll flex-grow-[2] h-max">
        <div v-for="(item, index) in selected_list.items" :key="index" 
        class="flex items-center justify-between flex-shrink-0 w-full lg:w-[33.33%] xl:w-[20%] px-3 py-4 bg-white hover:bg-gray-2 cursor-pointer border-r border-b border-gray-2 max-lg:last:border-white shadow-[0_1px_4px_rgba(0,0,0,0.16)]">
            <h4 class="font-bold text-lg">
                Item #{{ index + 1 }}
            </h4>
            <input v-model="item.quantity" type="text" class="focus-within:outline-none w-[40%] px-3 py-2 bg-gray-1 rounded-sm">
        </div>
    </main>
    <footer class="flex justify-center lg:justify-between max-lg:flex-col bg-white p-4 border-t-2 border-gray-3 shadow-[0_1px_4px_rgba(0,0,0,0.16)]">
        <div class="max-lg:flex hidden items-center justify-between">
            <div class="flex">
                <button v-if="delete_.active" class="flex items-center border-2 px-3 py-2 rounded-md border-gray-5 text-gray-5 lg:mx-3 max-lg:mr-3">
                    <i class="fa-solid fa-xmark text-xl mr-3"></i>
                    <span class="text-md font-semibold">
                        Eliminar item
                    </span>
                </button>
            </div>
            <div class="flex flex-col items-end">
                <h4 class="text-gray-4 text-md font-bold">
                    TOTAL
                </h4>
                <h3 class="text-dark text-3xl font-bold">
                    100.00
                </h3>
            </div>
        </div>
        
        <button class="hidden lg:flex items-center border-2 px-3 py-2 rounded-md border-gray-5 text-gray-5 lg:mx-3 max-lg:mr-3">
            <i class="fa-solid fa-xmark text-xl mr-3"></i>
            <span class="text-md font-semibold">
                Eliminar item
            </span>
        </button>

        <div class="flex lg:w-[380px] lg:items-center mt-2 lg:mx-auto">
            <input v-model="new_value" @keyup.enter="enter()" type="number" class="lg:h-[40px] pl-3 border-gray-4 border mr-2 flex-grow-[2] rounded-md focus-within:outline-none max-w-[280px]">
            <button class="bg-black hover:bg-black-2 text-white rounded-md flex-grow-2" @click.prevent="enter">
                <i class="fa-solid fa-paper-plane p-3 px-5"></i>
            </button>
        </div>

        <div class="hidden lg:flex flex-col items-end">
            <h4 class="text-gray-4 text-md font-bold">
                TOTAL
            </h4>
            <h3 class="text-dark text-3xl font-bold">
                100.00
            </h3>
        </div>
    </footer>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import {toRaw} from "vue"
export default {
    name: 'TableContent',
    data() {
        return {
            delete_: { active: false, items: [] },
            new_value: 0
        }
    },
    computed: {
        ...mapGetters(['selected_list']),
    },
    methods: {
        enter(){ // adding the quantity to the selected_list
            this.add_item({ new_value: this.new_value });
        },  
        ...mapActions(['add_item'])
    },
    created() {
        console.log(toRaw(this.selected_list));
    }
}
</script>
<style scoped>
    
</style>