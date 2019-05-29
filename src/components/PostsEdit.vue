<template>

    <div class="container">

        <CustomNav/>

        <h2>Edit User: {{ post.nume }}</h2>
        <br>

        <form class="form-horizontal" action="" v-on:submit.prevent="onSubmit">
            <div class="form-group">
                <label class="control-label col-sm-2" for="titlu">Titlu:</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="titlu" placeholder="Titlu" name="titlu"
                           v-model="post.titlu">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2" for="continut">Continut:</label>
                <div class="col-sm-10">
                    <textarea name="continut" id="continut" cols="30" rows="10" v-model="post.continut" class="form-control"></textarea>
                </div>
            </div>

            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" class="btn btn-default" @click="cancel()">Anulează</button>
                    &nbsp;
                    <button type="submit" class="btn btn-primary">Salveaza</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import CustomNav from './CustomNav.vue';

    export default {
        components: {
            CustomNav
        },
        data() {
            return {
                post: {
                    id: null,
                    titlu: null,
                    continut: null,
                }
            };
        },
        mounted() {
            let id = this.$route.params.id;

            this.axios.get(`/api/posts?id=${id}`)
                .then(response => this.post = response.data[0]);
        },
        methods: {
            cancel() {
                this.$router.back();
            },
            onSubmit() {
                let encodedPost = this.encodeObject(this.post);

                let url = `/api/update/posts?id=${this.post.id}&${encodedPost}`;

                this.axios.get(url).
                    then(response => this.cancel())
            },

            encodeObject(obj) {
                return Object.keys(obj).map(function(key) {
                    return key + '=' + obj[key];
                }).join('&');
            }
        }
    };
</script>