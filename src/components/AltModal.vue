<template>
    <div class="fixed flex items-end content-center justify-center h-screen w-screen">
        <div class="modal-content relative bg-white z-40 rounded-lg w-11/12 max-w-[600px] transition-all"> <!-- content -->
            <div class="flex flex-col items-center justify-center border-b border-gray-2 py-3 text-center"> <!-- header -->
                <h4 class="font-bold text-lg"> {{ title }}</h4>
            </div>
            <div class="">
                <slot></slot>
            </div>
        </div>
        <div @click="close" class="absolute top-0 left-0 bg-[#0909098a] w-full h-full z-20"></div> <!-- mask -->
    </div>
</template>
<script>
export default {
    name: "AltModal",
    props:  {
        title: {
            type: String,
            default: 'Elija una opción alternativa'
        },
    },
    methods: {
        close() {
            this.$emit("close");
        },
    },
}
</script>
<style scoped>
    .v-enter-active .modal-content {
        animation: from-bottom 0.15s ease-in-out;
    }
    .v-leave-active .modal-content {
        animation: from-bottom 0.15s ease-in-out reverse;
    }
    @keyframes from-bottom {
        from { transform: translateY(100%); } 
        to { transform: translateY(0%); }
    }
</style>