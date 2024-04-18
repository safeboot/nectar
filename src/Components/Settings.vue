<template>
  <div
    class="settings fixed top-0 left-0 w-full min-h-screen p-2 md:p-4 pointer-events-none flex justify-center items-center z-20 transition-all duration-300"
    :class="open ? 'opacity-100' : 'opacity-0'"
  >
    <div
      class="settings-content w-full max-w-2xl p-2 md:p-4 bg-neutral-900 border border-neutral-800 rounded-md shadow-2xl shadow-white/10 transition-all duration-300"
      :class="
        open
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      "
    >
      <div class="header flex justify-between items-center">
        <h1 class="text-white/75 text-lg">Settings</h1>
        <button
          @click="open = false"
          class="text-white hover:text-pink-300 transition duration-300"
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
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div class="body flex flex-col divide-y divide-neutral-800">
        <div class="servers py-4 flex flex-col gap-2">
          <div class="flex justify-between items-center">
            <h2 class="text-white/75">Servers</h2>
            <button
              @click="servers.push({ name: '', host: '', port: '' })"
              class="text-white hover:text-sky-300 transition duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
          <div
            class="server grid grid-cols-6 gap-2"
            v-for="(server, index) in servers"
            :key="index"
          >
            <input
              type="text"
              v-model="server.name"
              placeholder="Name"
              class="col-span-2 rounded-md"
            />
            <input
              type="text"
              v-model="server.host"
              placeholder="Host"
              class="col-span-2 rounded-md"
            />
            <input
              type="number"
              v-model="server.port"
              placeholder="Port"
              class="rounded-md"
            />
            <div class="grid grid-cols-2 gap-2">
              <button
                @click="deleteServer(server)"
                class="bg-red-500 text-white flex justify-center items-center rounded-md hover:bg-red-600 transition duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
              <button
                @click="saveServer(server)"
                class="bg-sky-500 text-white flex justify-center items-center rounded-md hover:bg-sky-600 transition duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-5 h-5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="apps"></div>
      </div>
    </div>
  </div>
  <div
    class="settings-background fixed top-0 left-0 w-full h-screen backdrop-blur-md bg-black/50 z-10 transition-all duration-300"
    :class="open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
    @click="open === true ? (open = false) : ''"
  ></div>
</template>

<script>
export default {
  data() {
    return {
      open: false,
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
          this.servers = data;
        });
    },

    async saveServer(server) {
      await fetch("/api/servers", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(server),
      });
    },

    async deleteServer(server) {
      await fetch("/api/servers/" + server.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(server),
      });

      this.servers = this.servers.filter((s) => s !== server);
    },
  },
};
</script>
