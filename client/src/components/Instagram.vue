<template>
  <v-container pa-0 grid-list-md>
    <base-subheading>Instagram</base-subheading>
    <v-row>
      <v-col v-for="(post, i) in posts" :key="i" xs="12" sm="6" md="4" cols="12">
        <base-card tag="a" :href="post.href" height="88" color="grey lighten-2">
          <v-img
            v-if="post.src"
            height="100%"
            :src="require(`@/assets/instagram/${post.src}`)"
          />
        </base-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    posts: [
      { src: "adventurealtitude.jpg" },
      { src: "garden.jpg" },
      { src: "pigduck.jpg" },
      { src: "rain.jpg" },
      { src: "spices.jpg" },
      { src: "sunset.jpg" },
    ],
  }),
};
</script>
