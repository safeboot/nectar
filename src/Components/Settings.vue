<template>
  <div
    class="settings fixed top-0 left-0 w-full h-screen p-2 py-16 md:p-4 md:py-16 lg:py-4 pointer-events-none flex justify-center items-center z-20 transition-all duration-300"
    :class="open ? 'opacity-100' : 'opacity-0'"
  >
    <div
      class="settings-content w-full max-w-3xl h-auto max-h-full p-2 md:p-4 bg-neutral-900 border border-neutral-800 rounded-md shadow-2xl shadow-white/10 overflow-y-auto transition-all duration-300"
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
        <div class="servers py-4 flex flex-col gap-2" v-if="servers.length">
          <div class="flex justify-between items-center">
            <h2 class="text-white/75">Servers</h2>
            <button
              @click="servers.push({ id: null, name: '', host: '', port: '' })"
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
          <div class="hidden lg:grid grid-cols-6 gap-2">
            <p class="col-span-2 text-gray-200">Name</p>
            <p class="col-span-2 text-gray-200">Host</p>
            <p class="text-gray-200">Port</p>
            <p class="text-gray-200 text-right">Actions</p>
          </div>
          <div
            class="server mb-4 lg:mb-0 last:mb-0 grid grid-cols-2 lg:grid-cols-6 gap-2"
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

        <div
          class="no-servers flex flex-col justify-center items-center gap-2 p-4"
          v-if="!servers.length"
        >
          <p class="text-white/75">No servers found.</p>
          <button
            @click="servers.push({ id: null, name: '', host: '', port: '' })"
            class="bg-sky-500 text-white px-2.5 py-1.5 flex justify-center items-center gap-2 rounded-md hover:bg-sky-600 transition duration-300"
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

            New Server
          </button>
        </div>

        <div class="apps py-4 flex flex-col gap-2" v-if="apps.length">
          <div class="flex justify-between items-center">
            <h2 class="text-white/75">Apps</h2>
            <button
              @click="
                apps.push({ id: null, name: '', icon: '', url: '', server_id: null })
              "
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
          <div class="hidden lg:grid grid-cols-6 gap-2">
            <p class="col-span-2 text-gray-200">Name</p>
            <p class="text-gray-200">Icon</p>
            <p class="text-gray-200">URL</p>
            <p class="text-gray-200">Server</p>
            <p class="text-gray-200 text-right">Actions</p>
          </div>
          <div
            class="app mb-4 lg:mb-0 last:mb-0 grid grid-cols-2 lg:grid-cols-6 gap-2"
            v-for="(app, index) in apps"
            :key="index"
          >
            <input
              type="text"
              v-model="app.name"
              placeholder="Name"
              class="col-span-2 rounded-md"
            />
            <input type="text" v-model="app.icon" placeholder="Icon" class="rounded-md" />
            <input type="text" v-model="app.url" placeholder="URL" class="rounded-md" />
            <select v-model="app.server_id" class="form-select rounded-md">
              <option value="null">Select a server...</option>
              <option :value="server.id" v-for="(server, index) in servers" :key="index">
                {{ server.name }}
              </option>
            </select>
            <div class="grid grid-cols-2 gap-2">
              <button
                @click="deleteApp(app)"
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
                @click="saveApp(app)"
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

        <div
          class="no-apps flex flex-col justify-center items-center gap-2 p-4"
          v-if="!apps.length"
        >
          <p class="text-white/75">No apps found.</p>
          <button
            @click="apps.push({ id: null, name: '', icon: '', url: '', server_id: null })"
            class="bg-sky-500 text-white px-2.5 py-1.5 flex justify-center items-center gap-2 rounded-md hover:bg-sky-600 transition duration-300"
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

            New App
          </button>
        </div>

        <div class="bookmarks py-4 flex flex-col gap-2" v-if="bookmarks.length">
          <div class="flex justify-between items-center">
            <h2 class="text-white/75">Bookmarks</h2>
            <button
              @click="
                bookmarks.push({
                  id: null,
                  name: '',
                  icon: '',
                  url: '',
                  category_id: null,
                })
              "
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
          <div class="hidden lg:grid grid-cols-6 gap-2">
            <p class="col-span-2 text-gray-200">Name</p>
            <p class="text-gray-200">Icon</p>
            <p class="text-gray-200">URL</p>
            <p class="text-gray-200">Category</p>
            <p class="text-gray-200 text-right">Actions</p>
          </div>
          <div
            class="bookmark mb-4 lg:mb-0 last:mb-0 grid grid-cols-2 lg:grid-cols-6 gap-2"
            v-for="(bookmark, index) in bookmarks"
            :key="index"
          >
            <input
              type="text"
              v-model="bookmark.name"
              placeholder="Name"
              class="col-span-2 rounded-md"
            />
            <input
              type="text"
              v-model="bookmark.icon"
              placeholder="Icon"
              class="rounded-md"
            />
            <input
              type="text"
              v-model="bookmark.url"
              placeholder="URL"
              class="rounded-md"
            />
            <select v-model="bookmark.category_id" class="form-select rounded-md">
              <option value="null">Select a category...</option>
              <option
                :value="category.id"
                v-for="(category, index) in categories"
                :key="index"
              >
                {{ category.name }}
              </option>
            </select>
            <div class="grid grid-cols-2 gap-2">
              <button
                @click="deleteBookmark(bookmark)"
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
                @click="saveBookmark(bookmark)"
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

        <div
          class="no-bookmarks flex flex-col justify-center items-center gap-2 p-4"
          v-if="!bookmarks.length"
        >
          <p class="text-white/75">No bookmarks found.</p>
          <button
            @click="
              bookmarks.push({
                id: null,
                name: '',
                icon: '',
                url: '',
                category_id: null,
              })
            "
            class="bg-sky-500 text-white px-2.5 py-1.5 flex justify-center items-center gap-2 rounded-md hover:bg-sky-600 transition duration-300"
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

            New Bookmark
          </button>
        </div>

        <div class="bookmarks py-4 flex flex-col gap-2" v-if="categories.length">
          <div class="flex justify-between items-center">
            <h2 class="text-white/75">Bookmark Categories</h2>
            <button
              @click="
                categories.push({
                  id: null,
                  name: '',
                })
              "
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
          <div class="hidden lg:grid grid-cols-6 gap-2">
            <p class="col-span-5 text-gray-200">Name</p>
            <p class="text-gray-200 text-right">Actions</p>
          </div>
          <div
            class="category mb-4 lg:mb-0 last:mb-0 grid grid-cols-2 lg:grid-cols-6 gap-2"
            v-for="(category, index) in categories"
            :key="index"
          >
            <input
              type="text"
              v-model="category.name"
              placeholder="Name"
              class="col-span-5 rounded-md"
            />
            <div class="col-span-2 lg:col-span-1 w-full h-[42px] grid grid-cols-2 gap-2">
              <button
                @click="deleteCategory(category)"
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
                @click="saveCategory(category)"
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

        <div
          class="no-bookmark-categories flex flex-col justify-center items-center gap-2 p-4"
          v-if="!categories.length"
        >
          <p class="text-white/75">No bookmark categories found.</p>
          <button
            @click="
              categories.push({
                id: null,
                name: '',
              })
            "
            class="bg-sky-500 text-white px-2.5 py-1.5 flex justify-center items-center gap-2 rounded-md hover:bg-sky-600 transition duration-300"
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

            New Bookmark Category
          </button>
        </div>
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
      apps: [],
      bookmarks: [],
      categories: [],
    };
  },

  mounted() {
    this.getServers();
    this.getApps();
    this.getBookmarks();
    this.getCategories();
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
        });
    },

    async getBookmarks() {
      await fetch("/api/bookmarks")
        .then((response) => response.json())
        .then((data) => {
          this.bookmarks = data;
        });
    },

    async getCategories() {
      await fetch("/api/bookmark_categories")
        .then((response) => response.json())
        .then((data) => {
          this.categories = data;
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

      this.$emit("updated-settings");
    },

    async saveApp(app) {
      await fetch("/api/apps", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(app),
      });

      this.$emit("updated-settings");
    },

    async saveBookmark(bookmark) {
      await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(bookmark),
      });

      this.$emit("updated-settings");
    },

    async saveCategory(category) {
      await fetch("/api/bookmark_categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(category),
      });

      this.$emit("updated-settings");
    },

    async deleteServer(server) {
      if (server.id === null) {
        this.servers = this.servers.filter((s) => s !== server);
        this.$emit("updated-settings");
        return;
      }

      await fetch("/api/servers/" + server.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(server),
      });

      this.servers = this.servers.filter((s) => s !== server);
      this.$emit("updated-settings");
    },

    async deleteApp(app) {
      if (app.id === null) {
        this.apps = this.apps.filter((a) => a !== app);
        this.$emit("updated-settings");
        return;
      }

      await fetch("/api/apps/" + app.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(app),
      });

      this.apps = this.apps.filter((a) => a !== app);
      this.$emit("updated-settings");
    },

    async deleteBookmark(bookmark) {
      if (bookmark.id === null) {
        this.bookmarks = this.bookmarks.filter((b) => b !== bookmark);
        this.$emit("updated-settings");
        return;
      }

      await fetch("/api/bookmarks/" + bookmark.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(bookmark),
      });

      this.bookmarks = this.bookmarks.filter((b) => b !== bookmark);
      this.$emit("updated-settings");
    },

    async deleteCategory(category) {
      if (category.id === null) {
        this.categories = this.categories.filter((c) => c !== category);
        this.$emit("updated-settings");
        return;
      }

      await fetch("/api/bookmark_categories/" + category.id, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(category),
      });

      this.categories = this.categories.filter((c) => c !== category);
      this.$emit("updated-settings");
    },
  },
};
</script>
