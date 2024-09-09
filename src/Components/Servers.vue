<template>
  <div class="servers-container flex flex-col gap-2" v-if="servers.length">
    <h1 class="text-xl text-gray-100">Servers</h1>
    <div class="servers grid md:grid-cols-3 gap-2 md:gap-6">
      <a
        :href="'https://' + server.host + ':' + (server.port ?? 443)"
        target="_blank"
        class="server bg-black/20 backdrop-blur-md border border-gray-500/50 p-4 flex flex-col gap-4 rounded-xl shadow-md overflow-hidden active:shadow-blue-500/50 active:shadow-lg hover:border-sky-400 hover:shadow-lg transition duration-300"
        v-for="(server, index) in servers"
        :key="index"
      >
        <div class="server-details flex items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 text-sky-200"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z"
            />
          </svg>
          <div class="flex flex-col">
            <div class="flex items-center gap-2">
              <h1 class="text-white text-lg font-medium">{{ server.name }}</h1>
              <!-- <div class="size-2 bg-purple-400 rounded-full"></div> -->
            </div>
            <p class="text-sm text-gray-200">
              {{ server.host
              }}{{
                server.port && server.port != 80 && server.port != 443
                  ? ":" + server.port
                  : ""
              }}
            </p>
          </div>
        </div>
        <div class="server-stats hidden flex flex-col gap-2">
          <div class="stat flex flex-col gap-1">
            <div class="header flex justify-between items-center">
              <h1 class="text-sm text-white">CPU Temp.</h1>
              <p class="text-sm text-sky-300">50°C</p>
            </div>
            <div class="progress-bar w-full h-1 bg-gray-500/50 rounded-full">
              <div
                class="progress w-1/2 h-full bg-sky-400 rounded-full transition-all duration-500"
              ></div>
            </div>
          </div>
          <div class="stat flex flex-col gap-1">
            <div class="header flex justify-between items-center">
              <h1 class="text-sm text-white">Memory</h1>
              <p class="text-sm text-indigo-300">38%</p>
            </div>
            <div class="progress-bar w-full h-1 bg-gray-500/50 rounded-full">
              <div
                class="progress w-1/3 h-full bg-indigo-400 rounded-full transition-all duration-500"
              ></div>
            </div>
          </div>
          <div class="stat flex flex-col gap-1">
            <div class="header flex justify-between items-center">
              <h1 class="text-sm text-white">System Load</h1>
              <p class="text-sm text-purple-300">75%</p>
            </div>
            <div class="progress-bar w-full h-1 bg-gray-500/50 rounded-full">
              <div
                class="progress w-3/4 h-full bg-purple-400 rounded-full transition-all duration-500"
              ></div>
            </div>
          </div>
          <div class="stat flex flex-col gap-1">
            <div class="header flex justify-between items-center">
              <h1 class="text-sm text-white">Uptime</h1>
              <p class="text-sm text-pink-300">2 months, 9 days</p>
            </div>
          </div>
          <div class="stat flex flex-col gap-1">
            <div class="header flex justify-between items-center">
              <h1 class="text-sm text-white">Last Seen</h1>
              <p class="text-sm text-red-300">30 Seconds Ago</p>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      servers: [],
    };
  },

  mounted() {
    this.getServers();
  },

  methods: {
    async getServers() {
      await fetch("/api/servers")
        .then((response) => response.json())
        .then((data) => {
          this.servers = data.sort((a, b) => a.order - b.order);
        });
    },

    refresh() {
      this.servers = [];
      this.getServers();
    },
  },
};
</script>
