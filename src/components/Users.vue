<template :key="show">
    <div class="container">

        <CustomNav/>

        <router-link to="/users/create" class="btn btn-success pull-left">Adaga User</router-link>
        <br>
        <br>


        <table class="table table-responsive table-striped">
            <thead>
            <tr>
                <th>Id</th>
                <th>Nume</th>
                <th>Email</th>
                <th>Telefon</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in users">
                <td>{{ user.id }}</td>
                <td>{{ user.nume }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.telefon }}</td>
                <td>{{ user.status == "1" ? "Activ" : "Inactiv"  }}</td>
                <td>
                    <router-link :to='getEditLink(user)' class="btn btn-primary">Edit</router-link>
                    &nbsp;
                    <a :href="getDeleteLink(user)" class="btn btn-danger" @click.prevent="deletePost(user)">Delete</a>
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
                users: [],
                show: true
            };
        },
        components: {
            CustomNav
        },
        methods: {
            isSelected(path) {
                return this.$route.path.indexOf(path) >= 0;
            },
            getAllUsers() {
                this.axios.get(`/api/users`)
                    .then(response => {
                        this.users = response.data;
                    });
            },
            getEditLink(user) {
                return `/users/edit/${user.id}`;
            },
            getDeleteLink(user) {
                return `/api/delete/users?id=${user.id}`;
            },
            deletePost(user) {
                let link = this.getDeleteLink(user);

                this.axios.get(link)
                    .then(response => {
                        let index = this.users.indexOf(user);

                        this.users.splice(index, 1);

                    })
            }
        },
        beforeMount() {
            this.getAllUsers();
        }
    };
</script>