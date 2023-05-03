<template>
    <header class="bg-dark p-2 text-white bg-black">
        <nav class="flex">
            <button class="flex items-center rounded-full lg:rounded-md hover:bg-black-2 py-3 px-4 transition-all">
                <i class="fa-solid fa-magnifying-glass text-[20px] lg:pr-3"></i>
                <span class="max-lg:hidden lg:flex font-medium text-lg">
                    Buscar tabla
                </span>
            </button>
            <button class="flex items-center ml-auto p-3 hover:bg-black-2 rounded-full lg:rounded-md transition-all">
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
                        class="absolute rounded-md top-0 right-0 bg-white text-black-1 border border-gray-2 divide-y divide-gray-2 shadow-[10px_8px_24px_rgba(149,157,165,0.2)] transition-all">
                            <li v-for="({title, action, icon}, index) in config.options" :key="index" @click="action"
                            class="flex items-center px-3 py-2 w-max cursor-pointer">
                            <i class="fa-solid mr-3 m-2" :class="icon"></i>
                                <span class="font-medium text-base">
                                    {{ title }}
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
import { OnClickOutside } from '@vueuse/components'
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
                            console.log('clicked reboot');
                            this.close_config();
                        }
                    },
                    {
                        title: 'Descargar aplicación',
                        icon: 'fa-download',
                        action: () => {
                            console.log('clicked other');
                            this.close_config();
                        }
                    },
                ]
            }
        }
    },
    methods: {
        close_config(){
            this.config.show = false;
        }
    }
}
</script>
<style scoped>
    .v-enter-active,
.v-leave-active {
  transition: opacity 0.15s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>