<template>
    <!-- Static navbar -->
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar"
                        aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>

                <router-link to="/admin" class="navbar-brand">3xD - PAD - Demo</router-link>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li :class="{active: isSelected('admin')}">
                        <router-link to="/admin">Admin</router-link>
                    </li>
                    <li :class="{active: isSelected('posts')}">
                        <router-link to="/posts">Posts</router-link>
                    </li>
                    <li :class="{active: isSelected('users')}">
                        <router-link to="/users">Users</router-link>
                    </li>
                    <li :class="{active: isSelected('comments')}">
                        <router-link to="/comments">Comments</router-link>
                    </li>
                </ul>

                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <router-link to="/logout">{{ user }}</router-link>
                    </li>

                </ul>

            </div><!--/.nav-collapse -->
        </div><!--/.container-fluid -->
    </nav>
</template>

<script>


    export default {
        computed: {
            user() {
                return this.$store.getters.user.nume
            }
        },
        methods: {
            isSelected(path) {
                return this.$route.path.indexOf(path) >= 0;
            }
        }
    };
</script>