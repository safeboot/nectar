<template>
  <div class="apps-container flex flex-col gap-2">
    <div class="flex justify-between items-end">
      <h1 class="text-xl text-gray-100">My Apps</h1>
      <div class="flex items-end gap-2">
        <select
          v-model="server"
          class="form-select w-32 h-8 appearence-none bg-transparent text-white px-1 py-0 outline-none border-transparent rounded-lg focus:border-sky-300 transition-all duration-300"
        >
          <option value="null" class="bg-neutral-700">All</option>
          <option
            :value="name"
            v-for="(server, name) in servers"
            :key="name"
            class="bg-neutral-700"
          >
            {{ name }}
          </option>
        </select>
      </div>
    </div>
    <div class="apps grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
      <a
        :href="app.url"
        target="_blank"
        class="app backdrop-blur-md border border-gray-500/50 p-3 md:p-4 flex items-center gap-4 rounded-xl shadow-md overflow-hidden active:shadow-sky-500/50 hover:border-pink-400 hover:-translate-y-1 hover:shadow-lg transition duration-300"
        v-for="(app, name) in filteredApps"
        :key="name"
      >
        <div
          class="icon size-11 md:size-12 bg-white/10 p-1.5 flex justify-center items-center rounded-md overflow-hidden"
        >
          <img :src="app.icon" class="w-full h-full object-contain rounded-sm" />
        </div>
        <div class="flex flex-col">
          <h1 class="text-white md:text-lg font-medium line-clamp-1">{{ name }}</h1>
          <p class="text-sm text-gray-200">
            {{ app.server }}
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
import json from "../../config.json";

export default {
  data() {
    return {
      apps: json.apps,
      servers: json.servers,
      server: null,
      search: "",
    };
  },

  computed: {
    filteredApps() {
      if (this.server === null || this.server === "null") return this.apps;

      return Object.fromEntries(
        Object.entries(this.apps).filter(([name, app]) => app.server === this.server)
      );
    },
  },
};
</script>
