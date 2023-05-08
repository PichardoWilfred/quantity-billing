<template>
    <div class="position-fixed bg-[#00000033]">
        <h4 class="font-bold text-lg"> {{ title }}</h4>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: "Modal",
    props: {
        title: {
            type: String,
            default: 'uwu'
        }
    },
}
</script>
<style scoped>
    
</style>