<template :key="show">
    <div class="container">

        <CustomNav/>

        <router-link to="/comments/create" class="btn btn-success pull-left">Adaga comentariu</router-link>
        <br>
        <br>


        <table class="table table-responsive table-striped">
            <thead>
            <tr>
                <th>Id</th>
                <th>Continut</th>
                <th>Autor</th>
                <th>Postare</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="comment in goodComments">
                <td>{{ comment.id }}</td>
                <td>{{ comment.continut }}</td>
                <td>{{ comment.autor }}</td>
                <td>{{ comment.postare }}</td>
                <td>
                    <a :href="getDeleteLink(comment)" class="btn btn-danger" @click.prevent="deletePost(comment)">Delete</a>
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
                comments: [],
                goodComments: [],
                show: true
            };
        },
        components: {
            CustomNav
        },watch: {
            async comments(changedComments) {
                this.goodComments = this.comments.slice(0);

                for(let i = 0; i < this.comments.length; i++) {
                    let comment = this.comments[i];

                    this.goodComments[i].autor = await this.axios.get(`/api/users?id=${comment.autor}`)
                        .then(response => response.data[0].nume);

                    this.goodComments[i].postare = await this.axios.get(`/api/posts?id=${comment.postare}`)
                        .then(response => response.data[0].titlu);


                }
            }
        },
        methods: {
            isSelected(path) {
                return this.$route.path.indexOf(path) >= 0;
            },
            getAllComments() {
                this.axios.get(`/api/comments`)
                    .then(response => {
                        this.comments = response.data;
                    });
            },
            getEditLink(comment) {
                return `/comments/edit/${comment.id}`;
            },
            getDeleteLink(comment) {
                return `/api/delete/comments?id=${comment.id}`;
            },
            deletePost(comment) {
                let link = this.getDeleteLink(comment);

                this.axios.get(link)
                    .then(response => {
                        let index = this.comments.indexOf(comment);

                        this.comments.splice(index, 1);

                    })
            }
        },
        created() {
            this.getAllComments();
        }
    };
</script>