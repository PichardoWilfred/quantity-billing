<template>
    <main class="flex max-lg:flex-col justify-start items-start content-start lg:flex-wrap bg-gray-1 overflow-y-scroll flex-grow-[2] h-max">
        <template v-if="selected_list.items.length">
            <OnLongPress as="div" v-for="(item, index) in selected_list.items" :key="index" 
            @trigger="long_handler(index)" :options="{ delay: 800 }" @click="selectItem(index)"
            :class="{'selected': isSelected(index)}"
            class="flex items-center justify-between flex-shrink-0 w-full lg:w-[33.33%] xl:w-[20%] px-3 py-4 bg-white hover:bg-gray-2 cursor-pointer border-r border-b border-gray-2 max-lg:last:border-white shadow-[0_1px_4px_rgba(0,0,0,0.16)]"> 
                <h4 class="font-bold text-lg">
                    Item #{{ index + 1 }}
                </h4>
                <input v-model="item.quantity" type="number" class="focus-within:outline-none w-[40%] px-3 py-2 bg-gray-1 rounded-[4px]">
            </OnLongPress>
        </template>
        <template v-else>
        <div class="flex flex-col text-center items-center justify-center my-auto w-full h-full transition-all"> 
            <img src="../../assets/not-found-quantities.svg" class="w-16" alt="" srcset="">
            <h2 class="font-bold text-black-1 text-lg p-4">
                Esta tabla aún no tiene items agregados.
            </h2>
        </div>
        </template>
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
                <div v-if="!delete_.active" class="flex flex-col">
                    <h4 class="text-gray-4 text-sm font-bold">
                        CAJAS
                    </h4>
                    <h3 class="text-dark text-3xl font-bold">
                        {{ box_quantity }}
                    </h3>
                </div>
            </div>
            <div class="flex flex-col items-end">
                <h4 class="text-gray-4 text-md font-bold">
                    TOTAL
                </h4>
                <h3 class="text-dark text-3xl font-bold">
                    {{ total }}
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
            <input v-model="new_value" @keyup.enter="enter()" @click="reset_list" type="number" class="lg:h-[40px] pl-3 border-gray-4 border mr-2 flex-grow-[2] rounded-md focus-within:outline-none max-w-[280px]">
            <button class="bg-black hover:bg-black-2 text-white rounded-md flex-grow-2" @click.prevent="enter">
                <i class="fa-solid fa-paper-plane p-3 px-5"></i>
            </button>
        </div>

        <div class="hidden lg:flex flex-col items-end">
            <h4 class="text-gray-4 text-md font-bold">
                TOTAL
            </h4>
            <h3 class="text-dark text-3xl font-bold">
                {{ total }}
            </h3>
        </div>
    </footer>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { OnLongPress, OnClickOutside } from '@vueuse/components'
export default {
    name: 'TableContent',
    components: {OnLongPress, OnClickOutside},
    data() {
        return {
            delete_: { active: false, items: [] },
            new_value: 0,
        }
    },
    computed: {
        total() {
            let total = 0;
            this.selected_list.items.map((element) => {
                total += (element.quantity || 0) * 1;
            });
            return total;
        },
        box_quantity() {
            let box_quantity = 0;
            this.selected_list.items.map((element) => {
                if ((element.quantity * 1) !== 0) {
                    box_quantity += 1;
                };
            });
            return box_quantity;
        },
        ...mapGetters(['selected_list']),
    },
    methods: {
        enter(){ // adding the quantity to the selected_list
            this.reset_list();
            // validating the number
            if ((this.new_value * 1) === 0) return;
            this.add_item({ new_value: this.new_value });
            this.new_value = 0;
        },
        long_handler(index) {
            this.$emit("selecting")
            this.delete_.active = true;
            this.delete_.items.push(index);
        },
        selectItem(index) {
            if (!this.delete_.active) return;
            console.log(this.delete_.items);
            console.log('afteR:');
            if (this.delete_.items.indexOf(index) !== -1) {
                this.delete_.items.splice(index, 1);
                if (this.delete_.items.length === 0) this.reset_list();
            }else {
                this.delete_.items.push(index);
            }
            console.log(this.delete_.items);
        },
        isSelected(index) {
            return this.delete_.items.indexOf(index) !== -1;
        },
        reset_list() {
            if (this.delete_.active) {
                this.delete_.active = false;
                this.delete_.items = [];
            }
        },
        papo(){
            console.log('papo');
        },
        ...mapActions(['add_item'])
    },
    mounted(){
    }
}
</script>
<style scoped>
    .selected input {
        border: 2px solid var(--black-1);
    }
</style>