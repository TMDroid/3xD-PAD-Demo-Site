<template>

    <div class="container">

        <CustomNav/>

        <h2>Create new comment</h2>
        <br>

        <form class="form-horizontal" action="" v-on:submit.prevent="onSubmit">
            <div class="form-group">
                <label class="control-label col-sm-2" for="continut">Postare:</label>
                <div class="col-sm-10">
                    <select name="post" id="post" required v-model="comment.postare" class="form-control">
                        <option value="">--- Alege ---</option>

                        <option :value="post.id" v-for="post in posts">{{ post.titlu }}</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2" for="continut">Continut:</label>
                <div class="col-sm-10">
                    <textarea name="continut" id="continut" cols="30" rows="10" v-model="comment.continut" class="form-control"></textarea>
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
                posts: [],

                comment: {
                    id: null,
                    continut: null,
                    autor: null,
                    postare: null,
                    likes: 0
                }
            };
        },
        mounted() {
            this.getAllPosts();
        },
        methods: {
            cancel() {
                this.$router.back();
            },
            onSubmit() {
                this.comment.autor = this.$store.getters.user.id;
                let encodedPost = this.encodeObject(this.comment);

                let url = `/api/insert/comments?${encodedPost}`;


                this.axios.get(url).
                    then(response => this.cancel())
            },

            encodeObject(obj) {
                return Object.keys(obj).map(function(key) {
                    return key + '=' + obj[key];
                }).join('&');
            },
            getAllPosts() {
                this.axios.get(`/api/posts`)
                    .then(response => {
                        this.posts = response.data;
                    });
            },
        }
    };
</script>