<template>
  <div class="apps-container flex flex-col gap-2">
    <div class="flex justify-between items-end">
      <h1 class="text-xl text-gray-100">My Apps</h1>
      <div class="flex items-end gap-2">
        <select
          v-model="server"
          @change="filterApps"
          class="form-select w-32 h-8 appearence-none bg-transparent text-white px-1 py-0 outline-none border-transparent rounded-lg focus:border-sky-300 transition-all duration-300"
        >
          <option value="null" class="bg-neutral-700">All Servers</option>
          <option
            :value="name"
            v-for="(server, name) in servers"
            :key="name"
            class="bg-neutral-700"
          >
            {{ name }}
          </option>
        </select>
        <input
          type="text"
          v-model="search"
          placeholder="Search..."
          @change="filterApps"
          class="w-40 h-8 appearence-none bg-transparent text-white placeholder:text-sky-100/50 px-1 py-0 outline-none border-transparent rounded-lg focus:border-sky-300 transition-all duration-300"
        />
      </div>
    </div>
    <div class="apps grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
      <a
        :href="app.url"
        target="_blank"
        class="app group backdrop-blur-md border border-gray-500/50 p-3 md:p-4 flex items-center gap-4 rounded-xl shadow-md overflow-hidden active:shadow-sky-500/50 hover:border-pink-400 hover:shadow-lg transition duration-300"
        v-for="(app, name, index) in filteredApps"
        :key="name"
        v-motion="{
          initial: {
            opacity: 0,
          },
          enter: {
            opacity: 1,
            transition: {
              delay: index * 25,
            },
          },
        }"
      >
        <div
          class="icon size-11 md:size-12 bg-white/10 p-1.5 flex justify-center items-center rounded-md overflow-hidden group-hover:bg-white/15 transition-all duration-300"
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

<script lang="ts">
import json from "../../config.json";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      apps: json.apps,
      filteredApps: json.apps,
      servers: json.servers,
      server: null,
      search: "",
    };
  },

  mounted() {
    this.filterApps();
  },

  methods: {
    filterApps() {
      this.filteredApps = this.apps;
      if ((this.server === null || this.server === "null") && this.search === "") {
        return;
      }

      let apps = this.apps;

      if (this.server && this.server !== "null") {
        apps = Object.fromEntries(
          Object.entries(apps).filter(([name, app]) => app.server === this.server)
        );
      }

      if (this.search && this.search !== "") {
        apps = Object.fromEntries(
          Object.entries(apps).filter(([name, app]) =>
            name.toLowerCase().includes(this.search.toLowerCase())
          )
        );
      }

      this.filteredApps = apps;
    },
  },
});
</script>
