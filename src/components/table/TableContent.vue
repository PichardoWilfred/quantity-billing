<template>
    <main class="main-container flex max-lg:flex-col justify-start items-start content-start lg:flex-wrap bg-gray-1 overflow-y-scroll flex-grow-[2] h-max">
        <template v-if="selected_list.items.length">
            <div v-for="(item, index) in selected_list.items" :key="index" @click="select_item(index)"
            :class="{'selected': is_selected(index)}"
            class="item-container flex items-center justify-between flex-shrink-0 w-full lg:w-[33.33%] xl:w-[20%] px-5 py-2 bg-white cursor-pointer lg:border-r border-gray-2 max-lg:last:border-white shadow-[0_1px_4px_rgba(0,0,0,0.16)]"> 
                <h4 class="item-title font-bold text-base">
                    Caja #{{ index + 1 }}
                </h4>
                <input v-model="item.quantity" :disabled="this.delete_.active" @blur="update_quantity" type="number" class="focus-within:outline-none w-4/12 px-3 py-2 border-gray-2 border-2 rounded-[4px]">
            </div>
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
                <button v-if="delete_.active" @click="delete_selected" class="flex items-center border-2 px-3 py-2 rounded-md border-gray-5 text-gray-5 lg:mx-3 max-lg:mr-3">
                    <i class="fa-solid fa-xmark text-xl mr-3"></i>
                    <span class="text-md font-semibold">
                        Eliminar item
                    </span>
                </button>
                <div v-if="!delete_.active" class="flex flex-col items-start">
                    <h4 class="text-gray-4 text-sm font-bold">
                        CAJAS
                    </h4>
                    <h3 class="text-dark text-3xl font-bold">
                        {{ box_quantity }}
                    </h3>
                </div>
            </div>
            <div class="flex flex-col items-end">
                <h4 class="text-gray-4 text-sm font-bold">
                    TOTAL
                </h4>
                <h3 class="text-dark text-3xl font-bold">
                    {{ total }}
                </h3>
            </div>
        </div>
        
        <div class="hidden lg:flex">
            <button v-if="delete_.active" @click="delete_selected" class="flex items-center border-2 px-3 py-2 rounded-md border-gray-5 text-gray-5 lg:mx-3 max-lg:mr-3">
                <i class="fa-solid fa-xmark text-xl mr-3"></i>
                <span class="text-md font-semibold">
                    Eliminar item
                </span>
            </button>
            <div v-if="!delete_.active" class="flex flex-col items-start">
                <h4 class="text-gray-4 text-sm font-bold">
                    CAJAS
                </h4>
                <h3 class="text-dark text-3xl font-bold">
                    {{ box_quantity }}
                </h3>
            </div>
        </div>

        <div class="non-printable flex justify-center lg:w-[380px] lg:items-center mt-2 lg:mx-auto">
            <input v-model="new_value" @keyup.enter="enter" @click="reset_list" type="number" class="lg:h-[40px] pl-3 border-gray-4 border mr-2 flex-grow-[2] rounded-md focus-within:outline-none max-w-[280px]">
            <button class="bg-black hover:bg-black-2 text-white rounded-md flex-grow-2" @click.prevent="enter">
                <i class="fa-solid fa-paper-plane p-3 px-5"></i>
            </button>
        </div>

        <div class="hidden lg:flex flex-col items-end">
            <h4 class="text-gray-4 text-sm font-bold">
                TOTAL
            </h4>
            <h3 class="text-dark text-3xl font-bold">
                {{ total }}
            </h3>
        </div>
    </footer>

    <Transition>
        <Modal_ v-if="modal.limit" title="Límite de items excedido" @close="() => { modal.limit = false }" @accept="() => { modal.limit = false }" single_option>
            <p class="text-md font-light">
                Haz excedido el límite de items por lista, para seguir registrando cajas, porfavor crea otra lista presionando el ícono 
                <img src="../../assets/add-table-black.svg" class="inline h-7 max-lg:w-7" alt="" /> en la barra superior.
            </p>
        </Modal_>
    </Transition>

</template>
<script>
import Modal_ from "../Modal.vue"
import { mapGetters, mapActions } from 'vuex';
import { OnLongPress, OnClickOutside } from '@vueuse/components'
export default {
    name: 'TableContent',
    components: {OnLongPress, OnClickOutside, Modal_},
    data() {
        return {
            delete_: { active: false, items: [] },
            new_value: 0,
            modal: {
                limit: false
            }
        }
    },
    computed: {
        ...mapGetters(['selected_list','total','box_quantity']),
    },
    methods: {
        enter(){ // adding the quantity to the selected_list
            this.reset_list();
            if ( this.selected_list.items.length >= 800 ) {
                this.modal.limit = true;
                return;
            }; 
            // validating the number
            if ((this.new_value * 1) === 0) return;
            this.add_item({ new_value: this.new_value });
            this.new_value = 0;
        },
        enable_delete_mode(index) { //used from App.vue in a ref
            this.delete_.active = true;
        },
        select_item(index) {
            if (!this.delete_.active) return;
            if (this.delete_.items.indexOf(index) !== -1) {
                const index_ = this.delete_.items.indexOf(index);
                this.delete_.items.splice(index_, 1);
                if (this.delete_.items.length === 0) this.reset_list();
            }else {
                this.delete_.items.push(index);
            }
        },
        delete_selected() {
            this.delete_items(this.delete_.items);
            this.reset_list();
        },
        update_quantity() {
            this.update_lists({ field: 'items', data: this.selected_list.items })
        },
        is_selected(index) {
            return this.delete_.items.indexOf(index) !== -1;
        },
        reset_list() {
            if (this.delete_.active) {
                this.delete_.active = false;
                this.delete_.items = [];
                this.$emit("select_finished")
            }
        },
        ...mapActions(['add_item','delete_items','update_lists'])
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