<template>
    <div class="container">
        <div class="login-form">

            <form action="#" method="post" v-on:submit.prevent="onSubmit">
                <h2 class="text-center">Log in</h2>
                <div class="form-group">
                    <input type="text" class="form-control" v-model="email" placeholder="Email" required="required">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control" v-model="password" placeholder="Password"
                           required="required">
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-primary btn-block">Log in</button>
                </div>
                <div class="clearfix">
                    <label class="pull-left checkbox-inline"><input type="checkbox"> Remember me</label>
                    <a href="#" class="pull-right">Forgot Password?</a>
                </div>
            </form>
            <p class="text-center">
                <router-link to="/register">Create an Account</router-link>
            </p>


        </div>
    </div>
</template>

<script>

    import {mapGetters} from 'vuex';

    export default {
        name: 'Login',
        data() {
            return {
                email: 'dannyb97danny@gmail.com',
                password: '123456'
            };
        },
        computed: mapGetters([
            'user'
        ])
        ,
        methods: {
            onSubmit() {
                let _this = this;

                this.axios.get(`/api/users?email=${this.email}`)
                    .then(result => {
                        result = result.data;

                        if (Array.isArray(result)) {
                            let filtered = result.filter(user => {
                                return user.email === _this.email && user.parola === _this.password;
                            });

                            if (filtered.length) {
                                if(filtered[0].status === "1") {
                                    _this.$store.commit('userChanged', filtered[0]);

                                    console.log(`Logged in ${_this.user.nume}`);

                                    _this.$router.push('admin');
                                } else {
                                    alert("Userul nu este activ")
                                }
                            } else {
                                alert("Userul nu exista")
                            }


                        }
                    });
            }
        }
    };
</script>

<style>
    .login-form {
        width: 340px;
        margin: 50px auto;
    }

    .login-form form {
        margin-bottom: 15px;
        background: #f7f7f7;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        padding: 30px;
    }

    .login-form h2 {
        margin: 0 0 15px;
    }
</style>