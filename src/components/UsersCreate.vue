<template>

    <div class="container">

        <CustomNav/>

        <h2>Adauga User: {{ user.nume }}</h2>
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
        data() {
            return {
                user: {
                    id: null,
                    nume: null,
                    email: null,
                    parola: null,
                    telefon: null,
                    status: 0
                }
            };
        },
        methods: {
            cancel() {
                this.$router.back();
            },

            onSubmit() {
                let encodedUser = this.encodeObject(this.user);

                let url = `/api/insert/users?${encodedUser}`;

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