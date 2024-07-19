<template>
  <div class="apps-container flex flex-col gap-2" v-if="apps.length">
    <div class="flex flex-col md:flex-row justify-between md:items-end">
      <h1 class="text-xl text-gray-100">Apps</h1>
      <div class="flex justify-between md:justify-end items-center md:items-end gap-2">
        <select
          v-model="server"
          @change="filterApps"
          class="form-select w-32 h-8 appearence-none bg-transparent text-white px-1 py-0 outline-none border-2 border-transparent rounded-lg focus:ring-transparent focus:border-sky-300 transition-all duration-300"
        >
          <option value="null" class="bg-neutral-700">All Servers</option>
          <option
            :value="server.id"
            v-for="(server, index) in servers"
            :key="index"
            class="bg-neutral-700"
          >
            {{ server.name }}
          </option>
        </select>
        <input
          type="text"
          v-model="search"
          placeholder="Search..."
          @change="filterApps"
          class="w-40 h-8 appearence-none bg-transparent text-white placeholder:text-pink-100/50 px-1 py-0 outline-none border-2 border-transparent rounded-lg focus:ring-transparent focus:border-pink-300 transition-all duration-300"
        />
      </div>
    </div>
    <div class="apps grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
      <a
        :href="app.url"
        target="_blank"
        class="app group bg-black/20 backdrop-blur-md border border-gray-500/50 p-3 md:p-4 flex items-center gap-4 rounded-xl shadow-md overflow-hidden active:shadow-pink-500/50 active:shadow-lg hover:border-pink-400 hover:shadow-lg transition duration-300"
        v-for="(app, index) in filteredApps"
        :key="index"
      >
        <div
          class="icon size-11 md:size-12 bg-white/10 p-1.5 flex justify-center items-center rounded-md overflow-hidden group-hover:bg-white/15 transition-all duration-300"
        >
          <img :src="app.icon" class="w-full h-full object-contain rounded-sm" />
        </div>
        <div class="flex flex-col">
          <h1 class="text-white md:text-lg font-medium line-clamp-1">{{ app.name }}</h1>
          <p class="text-sm text-gray-200">
            {{ app.server_name }}
          </p>
        </div>
      </a>
      <p
        class="col-span-2 md:col-span-4 text-center text-xl text-gray-200"
        v-if="Object.keys(filteredApps).length === 0"
      >
        No apps found :/
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apps: [],
      filteredApps: [],
      servers: [],
      server: null,
      search: "",
    };
  },

  mounted() {
    this.getServers();
    this.getApps();
    this.filterApps();
  },

  methods: {
    async getServers() {
      await fetch("/api/servers")
        .then((response) => response.json())
        .then((data) => {
          this.servers = data;
        });
    },

    async getApps() {
      await fetch("/api/apps")
        .then((response) => response.json())
        .then((data) => {
          this.apps = data;
          this.filteredApps = data;
        });
    },

    filterApps() {
      this.filteredApps = this.apps;
      if ((this.server === null || this.server === "null") && this.search === "") {
        return;
      }

      let apps = this.apps;

      if (this.server && this.server !== "null") {
        apps = Object.fromEntries(
          Object.entries(apps).filter(([name, app]) => app.server_id === this.server)
        );
      }

      if (this.search && this.search !== "") {
        apps = Object.fromEntries(
          Object.entries(apps).filter(([name, app]) =>
            app.name.toLowerCase().includes(this.search.toLowerCase())
          )
        );
      }

      this.filteredApps = apps;
    },

    refresh() {
      this.servers = [];
      this.apps = [];
      this.getServers();
      this.getApps();
      this.filterApps();
    },
  },
};
</script>
