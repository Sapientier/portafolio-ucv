<template>
  <div id="home">
    <articles>
      <banner />
    </articles>

    <about />

    <subscribe />

    <social />
  </div>
</template>

<script>
import Services from "@/services/Services";

export default {
  created() {
    this.initialize();
  },
  components: {
    About: () => import("@/components/home/About"),
    Articles: () => import("@/components/home/Articles"),
    Banner: () => import("@/components/home/Banner"),
    Social: () => import("@/components/home/Social"),
    Subscribe: () => import("@/components/home/Subscribe")
  },
  methods: {
    async initialize() {
      const response = await Services.getservices()
        .then(response => {
          this.$store.dispatch("setServicios", response.data);
        })
        .catch(error => console.log(error));
    }
  }
};
</script>
