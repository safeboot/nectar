<template>
  <div class="nectar w-full min-h-screen h-full z-10">
    <div
      class="nectar-container w-full min-h-screen h-full bg-black/50 backdrop-blur-sm p-4 flex justify-center z-0"
    >
      <div class="main w-full max-w-6xl h-full py-16 flex flex-col gap-12">
        <DateTime />

        <Servers />

        <Apps />
      </div>
    </div>
    <p class="absolute md:fixed top-4 left-4 text-xl text-white/50 z-20">nectar.</p>
  </div>
  <div
    class="wallpaper fixed top-0 left-0 w-full h-screen bg-cover bg-center -z-10"
  ></div>
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
      ".wallpaper"
    ).style.backgroundImage = `url('${wallpapers[season][0]}')`;
  },
};
</script>
