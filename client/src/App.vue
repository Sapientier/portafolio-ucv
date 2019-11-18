<template>
  <v-app>
    <page-header />
    <v-content>
      <transition name="fade-transition" mode="out-in">
        <router-view />
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import PageHeader from '@/components/Header.vue'

export default {
  name: 'App',
  components: {
    PageHeader
  },
  data: () => ({
    //
  }),
};
</script>
