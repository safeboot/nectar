<template>
  <div class="nectar w-full min-h-screen h-full z-10">
    <div
      class="nectar-container w-full min-h-screen h-full bg-black/50 backdrop-blur-sm p-4 flex justify-center z-0"
    >
      <div
        class="main w-full max-w-6xl h-full py-16 flex flex-col gap-12"
        :class="{ 'movement-player': movement }"
      >
        <DateTime ref="dateTime" />

        <Servers ref="servers" />

        <Apps ref="apps" />

        <Bookmarks ref="bookmarks" />
      </div>
    </div>
    <div
      class="absolute xl:fixed top-4 left-0 w-full px-4 flex justify-between items-center xl:z-50"
    >
      <p class="text-xl text-white/50 z-50">nectar.</p>
      <button
        @click="
          $refs.settings.open = !$refs.settings.open;
          $refs.settings.updateState();
        "
        class="z-50 transition duration-300"
        :class="
          open
            ? 'rotate-180 text-pink-300 hover:text-pink-400'
            : 'text-white/50 hover:text-sky-300'
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 12a7.5 7.5 0 0 0 15 0m-15 0a7.5 7.5 0 1 1 15 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077 1.41-.513m14.095-5.13 1.41-.513M5.106 17.785l1.15-.964m11.49-9.642 1.149-.964M7.501 19.795l.75-1.3m7.5-12.99.75-1.3m-6.063 16.658.26-1.477m2.605-14.772.26-1.477m0 17.726-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205 12 12m6.894 5.785-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
          />
        </svg>
      </button>
    </div>
  </div>
  <div
    class="wallpaper fixed top-0 left-0 w-full min-h-screen bg-cover bg-center -z-10"
    ref="wallpaper"
  ></div>
  <Settings
    ref="settings"
    @updated-settings="refresh"
    @updated-datetime="refreshDateTime"
  />
</template>

<script>
import DateTime from "./Components/DateTime.vue";
import Servers from "./Components/Servers.vue";
import Apps from "./Components/Apps.vue";
import Bookmarks from "./Components/Bookmarks.vue";
import Settings from "./Components/Settings.vue";

export default {
  components: {
    DateTime,
    Servers,
    Apps,
    Bookmarks,
    Settings,
  },

  data() {
    return {
      movement: true,
      open: false,
    };
  },

  mounted() {
    this.setWallpaper();

    if (localStorage.getItem("movement") === null) {
      localStorage.setItem("movement", true);
    }
  },

  methods: {
    refresh() {
      this.$refs.servers.refresh();
      this.$refs.apps.refresh();
      this.$refs.bookmarks.refresh();
      this.setWallpaper();
      this.movement = localStorage.getItem("movement") === "true";
    },

    refreshDateTime() {
      this.$refs.dateTime.refresh();
    },

    setWallpaper() {
      const mode = localStorage.getItem("wallpaper") ?? "auto";

      const wallpapers = Object.entries(import.meta.glob("/public/wallpapers/*"));
      const wallpaper = this.$refs.wallpaper;

      if (mode === "auto") {
        const season = Math.floor((new Date().getMonth() + 1) / (12 / wallpapers.length));

        if (wallpaper) {
          wallpaper.style.backgroundImage = `url('${wallpapers[season][0]}')`;
        }
      } else {
        wallpaper.style.backgroundImage = `url('${wallpapers[mode][0]}')`;
      }
    },

    setSettingsState(state) {
      this.open = state;
    },
  },
};
</script>

<style scoped>
.movement-player {
  animation: moveBackAndForth 30s ease infinite forwards;
}

.movement-player:hover {
  animation-play-state: paused;
}

@keyframes moveBackAndForth {
  0%,
  100% {
    transform: translateX(0);
  }
  33% {
    transform: translateX(1%);
  }
  66% {
    transform: translateX(-1%);
  }
}
</style>
