<template lang="">
    <div class="d-print flex justify-between items-center bg-white">

        <img src="../../assets/bill_logo.png" alt="" srcset="" class="bill-logo">
        <date class="font-bold">
            {{ date }}
        </date>

    </div>
    <div class="flex items-center px-3 py-4 bg-white border-b-2 border-gray-2 shadow-[0_1px_4px_rgba(0,0,0,0.16)]">
        <OnClickOutside @trigger="remove_focus">
            <input v-model="label" @click="add_focus" @keyup.enter="enter" type="text" class="w-[175px] h-[40px] rounded-[5px] bg-gray-1 border-2 border-gray-3 pl-2 py-0 focus-within:outline-none font-semibold mr-0">
        </OnClickOutside>
        
        <button class="header-button ml-1 lg:ml-2" @click="open_modal('print')">
            <i class="fa-solid fa-print text-xl"></i>
            <span class="max-lg:hidden lg:flex text-md font-medium ml-2">Imprimir</span>
        </button>

        <template v-if="!select">
            <button @click="open_modal('delete')" class="header-button delete ml-auto">
                <i class="fa-solid fa-trash text-xl"></i>
                <span class="max-lg:hidden lg:flex text-md font-medium ml-2">Eliminar</span>
            </button>
        </template>
        <template v-else>
            <button @click="() => { $emit('unselect') }" class="header-button ml-auto">
                <i class="fa-solid fa-xmark text-xl"></i>
                <span class="max-lg:hidden lg:flex text-md font-medium ml-2">Cancelar</span>
            </button>
        </template>
        <div class="d-print flex flex-col items-start mr-auto">
            <h4 class="text-gray-4 text-sm font-bold">
                CAJAS
            </h4>
            <h3 class="text-dark text-3xl font-bold">
                {{ box_quantity }}
            </h3>
        </div>
        <div class="d-print flex flex-col items-start">
            <h4 class="text-gray-4 text-sm font-bold">
                TOTAL
            </h4>
            <h3 class="text-dark text-3xl font-bold">
                {{ total }}
            </h3>
        </div>
    </div>

    <Transition>
        <AltModal_ v-show="modal.delete" title="Selecciona una opción"  @close="close_modal('delete')">
            <ul class="mb-1">   
                <li v-for="(option, index) in modal.delete_options" :key="index"
                @click="option.action"
                class="flex items-center space-x-3 px-4 py-2 hover:bg-gray-1 active:bg-gray-1">
                    <i :class="option.icon" class="text-lg"></i>
                    <span class="text-lg">{{ option.label }}</span>
                </li>
            </ul>
        </AltModal_>
    </Transition>

    <Transition>
        <AltModal_ v-if="modal.print" title="Selecciona una opción"  @close="close_modal('print')" class="non-printable">
            <ul class="mb-1">
                <li v-for="(option, index) in modal.print_options" :key="index"
                @click="option.action"
                class="flex items-center space-x-3 px-4 py-2 hover:bg-gray-1 active:bg-gray-1">
                    <i :class="option.icon" class="text-lg"></i>
                    <span class="text-lg">{{ option.label }}</span>
                </li>
            </ul>
        </AltModal_>
    </Transition>

    <Transition>
        <Modal_ v-if="modal.confirm" title="Eliminar lista" @close="close_modal('confirm')" @accept="accept_confirm">
            <p class="text-md font-light">
                ¿Estás seguro de que quieres eliminar la lista con el nombre: <b class="font-semibold">{{ selected_list.label }}</b> ?
            </p>
        </Modal_>
    </Transition>

</template>
<script>

import { mapActions, mapGetters } from 'vuex';
import { OnClickOutside } from '@vueuse/components'

import AltModal_ from "../AltModal.vue";
import Modal_ from "../Modal.vue"
import '../../lib/files-saver';

export default {
    name: "TableHeader",
    components: { Modal_, AltModal_, OnClickOutside },
    props: {
        select: Boolean
    },
    data() {
        return {
            name: 'Lista #2',
            modal: {
                delete: false,
                delete_options: [
                    {   
                        icon: 'fa-regular fa-circle-check', 
                        label: 'Eliminar items', 
                        action: () => {
                            this.$emit("selecting");
                            this.close_modal('delete');
                        }
                    },
                    {
                        icon: 'fa-solid fa-table-columns', 
                        label: 'Eliminar tabla', 
                        action: () => {
                            this.open_modal('confirm');
                            this.close_modal('delete');
                        }
                    },
                ],
                print: false,
                print_options: [
                    {   
                        icon: 'fa-solid fa-print', 
                        label: 'Imprimir factura', 
                        action: () => {
                            this.close_modal('print');
                            printJS({
                                printable: 'printable-list', 
                                scanStyles: false, 
                                css: './print.css', 
                                type: 'html', 
                                documentTitle:`InduCarg_${ new Date().getTime() }`, 
                                repeatTableHeader: false,
                            })
                        }
                    },                   
                    {   
                        icon: 'fa-solid fa-file-excel mr-1', 
                        label: 'Exportar a Excel', 
                        action: () => {
                            this.export_excel();
                            this.close_modal('print');
                        }
                    },
                ],
                confirm: false,
            },
            
            focus: false,
            label: '',
        }
    },
    computed: {     
        ...mapGetters(['selected_list', 'lists', 'box_quantity', 'total', 'date']),
    },
    watch: {
        selected_list(new_value) {
            this.label = new_value.label;
        }
    },
    methods: {
        open_modal(option) {
            this.modal[option] = true;
            window.scrollTo(0, document.body.scrollHeight);
        },
        close_modal(option) {
            this.modal[option] = false;
        },
        accept_confirm() {
            this.remove_list(this.selected_list.id);
            this.close_modal('confirm');
        },
        add_focus() {
            this.focus = true;
        },
        remove_focus() {
            if (!this.focus) return;
            this.enter();
            this.focus = false;
        },
        enter() {
            const valid = this.label.replace(/,+/g,'').replace(/\s+/g, ' ').trim();
            if (valid && valid !== '' && valid !== ' ') {
                this.change_label(valid);
            };
        },
        export_excel() {
            const old_quantities = JSON.parse(JSON.stringify(this.selected_list.items));
            const data = old_quantities.map((item, index) => {
                return { nombre: `Caja #${(index + 1)}`, cantidad: item.quantity }
            });
            const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            const EXCEL_EXTENSION = '.xlsx';
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = {
                Sheets: {
                    'data' : worksheet
                },
                SheetNames: ['data']
            };
            const excelBuffer = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});
            
            const data_ = new Blob([excelBuffer], {type: EXCEL_TYPE});
            saveAs(data_, `InduCarg_${new Date().getTime()}` + EXCEL_EXTENSION);
        },
        ...mapActions(['remove_list','change_label'])
    },
    mounted() {
        this.label = this.selected_list.label;
    },
}
</script>
<style scoped>
    .header-button {
        @apply flex items-center justify-center hover:bg-gray-1 rounded-full lg:rounded-md max-lg:w-[50px] lg:pr-3 p-3 transition-all;
    }
</style>