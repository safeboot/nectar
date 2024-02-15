<template>
  <div class="nectar w-full h-screen bg-cover bg-center">
    <div
      class="nectar-container w-full h-screen bg-black/50 backdrop-blur-sm p-4 flex justify-center overflow-hidden z-0"
    >
      <div
        class="main w-full max-w-6xl min-h-screen py-16 flex flex-col gap-12 overflow-x-hidden overflow-y-auto"
      >
        <DateTime />

        <Servers />

        <Apps />
      </div>
    </div>
    <p class="fixed top-4 left-4 text-xl text-white/50 z-10">nectar.</p>
  </div>
</template>

<script>
import DateTime from "./Components/DateTime.vue";
import Servers from "./Components/Servers.vue";
import Apps from "./Components/Apps.vue";

export default {
  components: {
    DateTime,
    Servers,
    Apps,
  },

  mounted() {
    const wallpapers = Object.entries(import.meta.glob("/public/wallpapers/*"));

    const season = Math.floor((new Date().getMonth() + 1) / (12 / wallpapers.length));

    document.querySelector(
      ".nectar"
    ).style.backgroundImage = `url('${wallpapers[season][0]}')`;
  },
};
</script>
