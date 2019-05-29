<template>
    <div id="app">
        <!--<img alt="Vue logo" src="./assets/logo.png">-->
        <router-view></router-view>
    </div>
</template>

<script>
    // import HelloWorld from './components/HelloWorld.vue'
    import Login from './components/Login.vue';
    import Register from './components/Register.vue';
    import Admin from './components/Admin.vue';
    import Posts from './components/Posts.vue';
    import PostsCreate from './components/PostsCreate.vue';
    import PostsEdit from './components/PostsEdit.vue';
    import Users from './components/Users.vue';
    import UsersEdit from './components/UsersEdit.vue';
    import Comments from './components/Comments.vue';
    import CommentsCreate from './components/CommentsCreate.vue';

    export default {
        name: 'app',
        components: {
            Login,
            Register,
            Admin,
            Posts,
            PostsCreate,
            PostsEdit,
            Users,
            UsersEdit,
            Comments,
            CommentsCreate,
        }
    };
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
