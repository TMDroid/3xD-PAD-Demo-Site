<template>
    <div class="container">

        <CustomNav />

        <!-- Main component for a primary marketing message or call to action -->
        <div class="jumbotron">
            <h1>Navbar example</h1>
            <p>This example is a quick exercise to illustrate how the default, static navbar and fixed to top navbar
                work. It includes the responsive CSS and HTML, so it also adapts to your viewport and device.</p>
            <p>
                <a class="btn btn-lg btn-primary" href="../../components/#navbar" role="button">View navbar docs
                    &raquo;</a>
            </p>
        </div>

    </div> <!-- /container -->
</template>

<script>
    import CustomNav from './CustomNav.vue'

    export default {
        components: {
            CustomNav
        }
    }
</script>