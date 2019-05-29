<template>
    <div class="login-form">

        <form action="#" method="post" v-on:submit.prevent="onSubmit">
            <h2 class="text-center">Log in</h2>
            <div class="form-group">
                <input type="text" class="form-control" v-model="email" placeholder="Email" required="required">
            </div>
            <div class="form-group">
                <input type="password" class="form-control" v-model="password" placeholder="Password" required="required">
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block">Log in</button>
            </div>
            <div class="clearfix">
                <label class="pull-left checkbox-inline"><input type="checkbox"> Remember me</label>
                <a href="#" class="pull-right">Forgot Password?</a>
            </div>
        </form>
        <p class="text-center"><a href="/register.html">Create an Account</a></p>


    </div>
</template>

<script>


    export default {
        name: 'Register',
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            onSubmit() {
                this.axios.get(`/api/users?email=${this.email}`)
                    .then(result => {
                        console.log(result);
                    })
            }
        }
    };
</script>