<template>
    <div class="fixed flex items-center content-center justify-center h-screen w-screen">
        <div class="relative bg-white z-40 p-4 rounded-lg w-11/12 max-w-[600px]"> <!-- content -->
            <div class="flex justify-between mb-2">
                <h4 class="font-bold text-xl">{{ title }}</h4>
                <button @click="close()" class="px-[9px] hover:bg-gray-1 active:bg-gray-1 rounded-full">
                    <i class="fa-solid fa-xmark text-[22px]"></i>
                </button>
            </div>
            <slot></slot>
            <div class="flex justify-end space-x-2 mt-3">
                <button class="flex-shrink-0 border-2 text-black text-sm rounded px-4 py-1.5 font-semibold" @click="close()">Cancelar</button>
                <button class="flex-shrink-0 bg-black text-white text-sm rounded px-4 py-1.5" @click="accept()">Aceptar</button>
            </div>
        </div>
        <div @click="close" class="absolute top-0 left-0 bg-[#0909098a] w-full h-full z-20"></div> <!-- mask -->
    </div>
</template>
<script>
export default {
    name: "Modal",
    props: {
        title: {
            type: String,
            default: 'Elija una opción'
        }
    },
    methods: {
        close() {
            this.$emit("close");
        },
        accept() {
            this.$emit("accept")
        }
    },
}
</script>
<style scoped>
    
</style>