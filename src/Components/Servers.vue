<template>
  <div class="servers-container flex flex-col gap-2">
    <h1 class="text-xl text-gray-100">My Servers</h1>
    <div class="servers grid md:grid-cols-3 gap-2 md:gap-6">
      <a
        :href="'https://' + server.host + ':' + (server.port ?? 443)"
        target="_blank"
        class="server backdrop-blur-md border border-gray-500/50 p-4 flex items-center gap-4 rounded-xl shadow-md overflow-hidden active:shadow-purple-500/50 hover:border-sky-400 hover:shadow-lg transition duration-300"
        v-for="(server, name, index) in servers"
        :key="name"
        v-motion="{
          initial: {
            opacity: 0,
          },
          enter: {
            opacity: 1,
            transition: {
              delay: index * 100,
            },
          },
        }"
      >
        <i class="fa-solid fa-server fa-xl text-sky-200"></i>
        <div class="flex flex-col">
          <div class="flex items-center gap-2">
            <h1 class="text-white text-lg font-medium">{{ name }}</h1>
            <div class="size-2 bg-purple-400 rounded-full"></div>
          </div>
          <p class="text-sm text-gray-200">
            {{ server.host }}{{ server.port ? ":" + server.port : "" }}
          </p>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
import json from "../../config.json";

export default {
  data() {
    return {
      servers: json.servers,
    };
  },
};
</script>
