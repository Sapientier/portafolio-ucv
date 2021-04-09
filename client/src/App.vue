<template>
    <v-app>
        <page-header />
        <v-main>
            <transition name="fade-transition" mode="out-in">
                <router-view />
            </transition>
        </v-main>
        <page-footer />
    </v-app>
</template>

<script>
import PageHeader from "@/components/core/Header.vue";
import PageFooter from "@/components/core/Footer.vue";

export default {
    name: "App",
    components: {
        PageHeader,
        PageFooter,
    },
    created() {
        if (
            !this.$store.state.isUserLoggedIn &&
            (this.$router.currentRoute.fullPath === "/reports" ||
                this.$router.currentRoute.fullPath === "/userprofile" ||
                this.$router.currentRoute.fullPath === "/userstable")
        ) {
            this.$router.push({
                name: "Login",
            });
        } else if (
            this.$store.state.isUserLoggedIn &&
            this.$router.currentRoute.fullPath === "/login"
        ) {
            this.$router.push({
                name: "UserProfile",
            });
        }
    },
};
</script>
