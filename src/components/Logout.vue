<template :key="show">

</template>

<script>
    export default {
        created() {
            this.$store.commit('userChanged', null);

            this.$router.push('/admin');
        }
    };
</script>