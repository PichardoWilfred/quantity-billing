<template>
    <header class="bg-dark p-2 text-white bg-black">
        <nav class="flex">
            <button class="flex items-center rounded-full lg:rounded-md hover:bg-black-2 py-3 px-4 transition-all">
                <i class="fa-solid fa-magnifying-glass text-[20px] lg:pr-3"></i>
                <span class="max-lg:hidden lg:flex font-medium text-lg">
                    Buscar tabla
                </span>
            </button>
            <button @click.prevent="add_list()" class="flex items-center ml-auto p-3 hover:bg-black-2 rounded-full lg:rounded-md transition-all">
                <img src="../assets/add-table.svg" class="h-7 max-lg:w-7 lg:mr-3" alt="" srcset="">
                <span class="max-lg:hidden lg:flex text-md font-medium">Añadir tabla</span>
            </button>
            <div class="relative flex items-center ml-2">
                <button @click="() => { config.show = true }" class="flex items-center py-3 px-2 lg:px-3 rounded-full lg:rounded-md hover:bg-black-2 transition-all">
                    <i class="fa-solid fa-ellipsis-vertical text-[20px] lg:pr-3 max-lg:w-7"></i>
                    <span class="max-lg:hidden lg:flex text-md font-medium">Configuración</span>
                </button>
                <OnClickOutside @trigger="() => { config.show = false }">
                    <Transition>
                        <ul v-show="config.show"
                        class="absolute rounded-md top-0 right-0 bg-white text-black-1 border border-gray-2 divide-y divide-gray-2 shadow-[10px_8px_24px_rgba(149,157,165,0.2)] transition-all z-40">
                            <li v-for="({title, action, icon, version}, index) in config.options" :key="index" @click="() => { action(); close_config()}"
                            class="flex items-center px-3 py-2 w-full min-w-max cursor-pointer">
                            <i class="fa-solid mr-3 m-2" :class="icon"></i>
                                <span class="font-medium text-base">
                                    {{ title }} 
                                </span>
                                <span v-if="version" class="text-gray-4 ml-2">
                                    {{ version }}
                                </span>
                            </li>
                        </ul>
                    </Transition>
                </OnClickOutside>
            </div>
        </nav>
    </header>  
</template>
<script>

import { mapActions } from 'vuex';
import { OnClickOutside } from '@vueuse/components';
export default {
    name: 'Header',
    components:{OnClickOutside},
    data() {
        return {
            config: {
                show: false,
                options: [
                    {
                        title: 'Reiniciar aplicación',
                        icon: 'fa-arrows-rotate',
                        action: () => {
                        }
                    },
                    {
                        title: 'Descargar aplicación',
                        icon: 'fa-download',
                        action: () => {
                        }
                    },
                    {
                        title: 'Versión',
                        version: 'v0.1.0',
                        icon: 'fa-code-merge',
                        action: () => {
                        }
                    },
                ]
            }
        }
    },
    methods: {
        close_config(){
            this.config.show = false;
        },
        ...mapActions(['add_list'])
    }
}
</script>
<style scoped>
</style>