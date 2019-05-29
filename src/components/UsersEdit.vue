<template>

    <div class="container">

        <CustomNav/>

        <h2>Edit User: {{ user.nume }}</h2>
        <br>

        <form class="form-horizontal" action="" v-on:submit.prevent="onSubmit">
            <div class="form-group">
                <label class="control-label col-sm-2" for="email">Nume:</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="nume" placeholder="Nume" name="nume"
                           v-model="user.nume">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2" for="email">Email:</label>
                <div class="col-sm-10">
                    <input type="email" class="form-control" id="email" placeholder="Email" name="email"
                           v-model="user.email">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2" for="pwd">Parola:</label>
                <div class="col-sm-10">
                    <input type="password" class="form-control" id="pwd" placeholder="Parola" name="pwd"
                           v-model="user.parola">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2" for="email">Telefon:</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control" id="phone" placeholder="Telefon" name="phone"
                           v-model="user.telefon">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-2" for="email">Status:</label>
                <div class="col-sm-10">
                    <input type="checkbox" class="form-control" id="status" placeholder="Status" name="phone"
                           v-model="user.status">
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
        watch: {
            'user.status': (newVal) => {
                if(newVal === true) {
                    this.user.status = "1";
                } else if(newVal === false) {
                    this.user.status = "0";
                }
            }
        },
        data() {
            return {
                user: {
                    id: null,
                    nume: null,
                    email: null,
                    parola: null,
                    telefon: null,
                    status: null
                }
            };
        },
        created() {
            let id = this.$route.params.id;

            this.axios.get(`/api/users?id=${id}`)
                .then(response => {
                    this.user = response.data[0]
                    this.user.status = this.user.status === "1"
                });
        },
        methods: {
            cancel() {
                this.$router.back();
            },

            onSubmit() {
                this.user.status = this.user.status === true ? "1" : "0";

                let encodedUser = this.encodeObject(this.user);

                let url = `/api/update/users?id=${this.user.id}&${encodedUser}`;

                this.axios.get(url).then(response => this.cancel());
            },

            encodeObject(obj) {
                return Object.keys(obj).map(function (key) {
                    return key + '=' + obj[key];
                }).join('&');
            }
        }
    };
</script>