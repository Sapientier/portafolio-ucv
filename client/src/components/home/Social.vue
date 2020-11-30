<template>
  <v-container id="social" tag="section" grid-list-xl>
    <v-row>
      <v-col xs="12" md="4">
        <instagram />
      </v-col>
      <v-col xs="12" md="4">
        <newest-posts />
      </v-col>
      <v-col xs="12" md="4">
        <tags />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {
    NewestPosts: () => import("@/components/NewestPosts"),
    Instagram: () => import("@/components/Instagram"),
    Tags: () => import("@/components/Tags"),
  },
};
</script>
