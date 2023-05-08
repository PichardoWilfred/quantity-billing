<template lang="">
    <div class="flex items-center px-3 py-4 bg-white border-b-2 border-gray-2 shadow-[0_1px_4px_rgba(0,0,0,0.16)]">
        
        <input v-model="selected_list.label.value" @keyup.enter="enter" type="text" class="w-[175px] h-[40px] rounded-[5px] bg-gray-1 border-2 border-gray-3 pl-2 py-0 focus-within:outline-none font-semibold">
        
        <button class="header-button lg:ml-2">
            <i class="fa-solid fa-print text-xl"></i>
            <span class="max-lg:hidden lg:flex text-md font-medium ml-2">Imprimir</span>
        </button>
        <button class="header-button lg:ml-2 mr-auto">
            <i class="fa-solid fa-file-excel text-xl"></i>
            <span class="max-lg:hidden lg:flex text-md font-medium ml-2">Importar Excel</span>
        </button>
        <button @click="open_modal" class="header-button">
            <i class="fa-solid fa-trash text-xl"></i>
            <span class="max-lg:hidden lg:flex text-md font-medium ml-2">Eliminar tabla</span>
        </button>
    </div>
    <Modal_ v-if="modal" title="Eliminar lista" @close="close_modal()" @accept="accept()">
        <p class="text-md font-light">
            ¿Estás seguro de que quieres eliminar la lista llamada: <b class="font-semibold">{{selected_list.label.value}}</b> ?
        </p>
    </Modal_>
</template>
<script>
import Modal_ from "../Modal.vue"
import { mapActions, mapGetters } from 'vuex';
export default {
    name: "TableHeader",
    components: { Modal_ },
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
        },
        close_modal(){
            this.modal = false;
        },
        accept(){
            this.remove_list(this.selected_list.id);
            this.close_modal();
        },
        enter() {
            const valid = this.selected_list.label.value.replace(/,+/g,'').replace(/\s+/g, ' ').trim();
            if (valid) {
                console.log('asdasd');
            };
                // const new_label = quantity
        },
        ...mapActions(['remove_list'])
    }
}
</script>
<style scoped>
    .header-button {
        @apply flex items-center justify-center hover:bg-gray-1 rounded-full lg:rounded-md max-lg:w-[50px] lg:pr-3 p-3 transition-all;
    }
</style>