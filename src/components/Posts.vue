<template :key="show">
    <div class="container">

        <CustomNav/>

        <router-link to="/posts/create" class="btn btn-success pull-left">Adaga Postare</router-link>
        <br>
        <br>



        <table class="table table-responsive table-striped">
            <thead>
            <tr>
                <th>Id</th>
                <th>Titlu</th>
                <th>Continut</th>
                <th>Autor</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="post in goodPosts">
                <td>{{ post.id }}</td>
                <td>{{ post.titlu }}</td>
                <td>{{ post.continut }}</td>
                <td>{{ post.autor }}</td>
                <td>
                    <router-link :to='getEditLink(post)' class="btn btn-primary">Edit</router-link>
                    &nbsp;
                    <a :href="getDeleteLink(post)" class="btn btn-danger" @click.prevent="deletePost(post)">Delete</a>
                </td>
            </tr>
            </tbody>
        </table>

    </div> <!-- /container -->
</template>

<script>
    import CustomNav from './CustomNav.vue';

    export default {
        data() {
            return {
                posts: [],
                goodPosts: [],
                show: true
            };
        },
        watch: {
            async posts(changedPosts) {
                this.goodPosts = this.posts.slice(0);

                for(let i = 0; i < this.posts.length; i++) {
                    let post = this.posts[i];

                    this.goodPosts[i].autor = await this.axios.get(`/api/users?id=${post.autor}`)
                        .then(response => response.data[0].nume);
                }
            }
        },
        components: {
            CustomNav
        },
        methods: {
            isSelected(path) {
                return this.$route.path.indexOf(path) >= 0;
            },
            getAllPosts() {
                this.axios.get(`/api/posts`)
                    .then(response => {
                        this.posts = response.data;
                    });
            },
            getEditLink(post) {
                return `/posts/edit/${post.id}`;
            },
            getDeleteLink(post) {
                return `/api/delete/posts?id=${post.id}`;
            },
            deletePost(post) {
                let link = this.getDeleteLink(post);
                let vm = this

                this.axios.get(link)
                    .then(response => {
                        let index = this.posts.indexOf(post)

                        this.posts.splice(index, 1);

                    })
            }
        },
        created() {
            this.getAllPosts();
        }
    };
</script>