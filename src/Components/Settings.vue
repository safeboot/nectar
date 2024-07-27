<template>
  <div
    class="settings fixed top-0 left-0 w-full h-screen p-2 py-16 md:p-4 md:py-16 lg:py-4 pointer-events-none flex justify-center items-center z-20 transition-all duration-300"
    :class="open ? 'opacity-100' : 'opacity-0'"
  >
    <div
      class="settings-content w-full max-w-5xl h-auto max-h-full p-3 md:p-6 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl shadow-white/10 overflow-y-auto transition-all duration-300"
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

      <div class="tabs relative py-2 grid grid-cols-2">
        <button
          @click="tab = 'content'"
          class="tab p-2 flex justify-center items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5 text-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
            />
          </svg>
          <p class="text-white">Content</p>
        </button>
        <button
          @click="tab = 'customization'"
          class="tab p-2 flex justify-center items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5 text-white"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"
            />
          </svg>
          <p class="text-white">Customization</p>
        </button>
        <div
          class="active-tab absolute bottom-0 w-1/2 h-0.5 transition-all duration-300"
          :class="tab === 'content' ? 'left-0 bg-sky-300' : 'left-1/2 bg-pink-300'"
        ></div>
      </div>

      <div
        class="body flex flex-col divide-y divide-neutral-800"
        v-if="tab === 'content'"
      >
        <div class="servers py-6 flex flex-col gap-2" v-if="servers.length">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <button @click="expanded.servers = !expanded.servers">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-5 text-white/75 hover:text-white transition duration-300"
                  :class="expanded.servers ? 'rotate-180' : ''"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
              <h2 class="text-white/75">Servers</h2>
            </div>
            <button
              @click="
                servers.push({
                  id: null,
                  name: '',
                  host: '',
                  port: '',
                  order: servers.length,
                });
                expandList('servers');
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
          <div
            class="server-container max-h-0 flex flex-col gap-2 overflow-hidden transition-all duration-300"
            ref="serverContainer"
            :style="{
              'max-height': expanded.servers
                ? this.$refs.serverContainer?.scrollHeight + 'px'
                : '',
            }"
          >
            <div class="hidden lg:grid grid-cols-6 gap-2">
              <p class="col-span-2 text-gray-200">Name</p>
              <p class="col-span-2 text-gray-200">Host</p>
              <p class="text-gray-200">Port</p>
              <p class="text-gray-200 text-right">Actions</p>
            </div>
            <draggable
              class="servers flex flex-col gap-8 lg:gap-2"
              :list="servers"
              item-key="id"
              @start="dragging = true"
              @end="dragging = false"
              @change="(event) => saveOrder(event, 'servers')"
              handle="#handle"
            >
              <template #item="{ element, index }">
                <div class="grid grid-cols-2 lg:grid-cols-6 gap-2">
                  <div class="input-container col-span-2 flex items-center gap-2">
                    <button
                      class="size-[42px] border border-gray-700 bg-neutral-950 flex justify-center items-center flex-shrink-0 rounded-md"
                      id="handle"
                      @mousedown="dragging = true"
                      @mouseup="dragging = false"
                      @mouseleave="dragging = false"
                      :class="dragging ? 'cursor-grabbing' : 'cursor-grab'"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6 text-gray-300"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      v-model="element.name"
                      placeholder="Name"
                      class="w-full rounded-md"
                    />
                  </div>
                  <input
                    type="text"
                    v-model="element.host"
                    placeholder="Host"
                    class="col-span-2 rounded-md"
                  />
                  <input
                    type="number"
                    v-model="element.port"
                    placeholder="Port"
                    class="rounded-md"
                  />
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      @click="
                        deleteServer(element);
                        expandList('servers');
                      "
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
                      @click="
                        saveItem('servers', element);
                        expandList('servers');
                      "
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
              </template>
            </draggable>
          </div>
        </div>

        <div
          class="no-servers flex flex-col justify-center items-center gap-2 p-6"
          v-if="!servers.length"
        >
          <p class="text-white/75">No servers found.</p>
          <button
            @click="
              servers.push({ id: null, name: '', host: '', port: '', order: 0 });
              expandList('servers');
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

            New Server
          </button>
        </div>

        <div class="apps py-6 flex flex-col gap-2" v-if="apps.length">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <button @click="expanded.apps = !expanded.apps">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-5 text-white/75 hover:text-white transition duration-300"
                  :class="expanded.apps ? 'rotate-180' : ''"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
              <h2 class="text-white/75">Apps</h2>
            </div>
            <button
              @click="
                apps.push({
                  id: null,
                  name: '',
                  icon: '',
                  url: '',
                  order: apps.length,
                  server_id: null,
                });
                expandList('apps');
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
          <div
            class="app-container max-h-0 flex flex-col gap-2 overflow-hidden transition-all duration-300"
            ref="appContainer"
            :style="{
              'max-height': expanded.apps
                ? this.$refs.appContainer?.scrollHeight + 'px'
                : '',
            }"
          >
            <div class="hidden lg:grid grid-cols-6 gap-2">
              <p class="col-span-2 text-gray-200">Name</p>
              <p class="text-gray-200">Icon</p>
              <p class="text-gray-200">URL</p>
              <p class="text-gray-200">Server</p>
              <p class="text-gray-200 text-right">Actions</p>
            </div>
            <draggable
              class="apps flex flex-col gap-8 lg:gap-2"
              :list="apps"
              item-key="id"
              @start="dragging = true"
              @end="dragging = false"
              @change="(event) => saveOrder(event, 'apps')"
              handle="#handle"
            >
              <template #item="{ element, index }">
                <div class="grid grid-cols-2 lg:grid-cols-6 gap-2">
                  <div class="input-container col-span-2 flex items-center gap-2">
                    <button
                      class="size-[42px] border border-gray-700 bg-neutral-950 flex justify-center items-center flex-shrink-0 rounded-md"
                      id="handle"
                      @mousedown="dragging = true"
                      @mouseup="dragging = false"
                      @mouseleave="dragging = false"
                      :class="dragging ? 'cursor-grabbing' : 'cursor-grab'"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6 text-gray-300"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      v-model="element.name"
                      placeholder="Name"
                      class="w-full rounded-md"
                    />
                  </div>
                  <input
                    type="text"
                    v-model="element.icon"
                    placeholder="Icon"
                    class="rounded-md"
                  />
                  <input
                    type="text"
                    v-model="element.url"
                    placeholder="URL"
                    class="rounded-md"
                  />
                  <select v-model="element.server_id" class="form-select rounded-md">
                    <option value="null">Select a server...</option>
                    <option
                      :value="server.id"
                      v-for="(server, index) in servers"
                      :key="index"
                    >
                      {{ server.name }}
                    </option>
                  </select>
                  <div class="grid grid-cols-2 gap-2">
                    <button
                      @click="deleteApp(element)"
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
                      @click="saveItem('apps', element)"
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
              </template>
            </draggable>
          </div>
        </div>

        <div
          class="no-apps flex flex-col justify-center items-center gap-2 p-6"
          v-if="!apps.length"
        >
          <p class="text-white/75">No apps found.</p>
          <button
            @click="
              apps.push({
                id: null,
                name: '',
                icon: '',
                url: '',
                order: apps.length,
                server_id: null,
              });
              expandList('apps');
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

            New App
          </button>
        </div>

        <div class="bookmarks py-6 flex flex-col gap-2" v-if="bookmarks.length">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <button @click="expanded.bookmarks = !expanded.bookmarks">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-5 text-white/75 hover:text-white transition duration-300"
                  :class="expanded.bookmarks ? 'rotate-180' : ''"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
              <h2 class="text-white/75">Bookmarks</h2>
            </div>
            <button
              @click="
                bookmarks.push({
                  id: null,
                  name: '',
                  icon: '',
                  url: '',
                  order: bookmarks.length,
                  category_id: null,
                });
                expandList('bookmarks');
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
          <div
            class="bookmark-container max-h-0 flex flex-col gap-2 overflow-hidden transition-all duration-300"
            ref="bookmarkContainer"
            :style="{
              'max-height': expanded.bookmarks
                ? this.$refs.bookmarkContainer?.scrollHeight + 'px'
                : '',
            }"
          >
            <div class="hidden lg:grid grid-cols-6 gap-2">
              <p class="col-span-2 text-gray-200">Name</p>
              <p class="text-gray-200">Icon</p>
              <p class="text-gray-200">URL</p>
              <p class="text-gray-200">Category</p>
              <p class="text-gray-200 text-right">Actions</p>
            </div>
            <draggable
              class="bookmarks flex flex-col gap-8 lg:gap-2"
              :list="bookmarks"
              item-key="id"
              @start="dragging = true"
              @end="dragging = false"
              @change="(event) => saveOrder(event, 'bookmarks')"
              handle="#handle"
            >
              <template #item="{ element, index }">
                <div class="bookmark grid grid-cols-2 lg:grid-cols-6 gap-2">
                  <div class="input-container col-span-2 flex items-center gap-2">
                    <button
                      class="size-[42px] border border-gray-700 bg-neutral-950 flex justify-center items-center flex-shrink-0 rounded-md"
                      id="handle"
                      @mousedown="dragging = true"
                      @mouseup="dragging = false"
                      @mouseleave="dragging = false"
                      :class="dragging ? 'cursor-grabbing' : 'cursor-grab'"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6 text-gray-300"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                        />
                      </svg>
                    </button>
                    <input
                      type="text"
                      v-model="element.name"
                      placeholder="Name"
                      class="w-full rounded-md"
                    />
                  </div>
                  <input
                    type="text"
                    v-model="element.icon"
                    placeholder="Icon"
                    class="rounded-md"
                  />
                  <input
                    type="text"
                    v-model="element.url"
                    placeholder="URL"
                    class="rounded-md"
                  />
                  <select v-model="element.category_id" class="form-select rounded-md">
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
                      @click="saveItem('bookmarks', bookmark)"
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
              </template>
            </draggable>
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
                order: 0,
                category_id: null,
              });
              expandList('bookmarks');
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

        <div
          class="bookmark-categories pt-6 flex flex-col gap-2"
          v-if="categories.length"
        >
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <button @click="expanded.categories = !expanded.categories">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-5 text-white/75 hover:text-white transition duration-300"
                  :class="expanded.categories ? 'rotate-180' : ''"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>
              <h2 class="text-white/75">Bookmark Categories</h2>
            </div>
            <button
              @click="
                categories.push({
                  id: null,
                  name: '',
                });
                expandList('categories');
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
          <div
            class="category-container max-h-0 flex flex-col gap-2 overflow-hidden transition-all duration-300"
            ref="categoryContainer"
            :style="{
              'max-height': expanded.categories
                ? this.$refs.categoryContainer?.scrollHeight + 'px'
                : '',
            }"
          >
            <div class="hidden lg:grid grid-cols-6 gap-2">
              <p class="col-span-5 text-gray-200">Name</p>
              <p class="text-gray-200 text-right">Actions</p>
            </div>
            <div
              class="category mb-8 lg:mb-0 last:mb-0 grid grid-cols-2 lg:grid-cols-6 gap-2"
              v-for="(category, index) in categories"
              :key="index"
            >
              <input
                type="text"
                v-model="category.name"
                placeholder="Name"
                class="col-span-5 rounded-md"
              />
              <div
                class="col-span-2 lg:col-span-1 w-full h-[42px] grid grid-cols-2 gap-2"
              >
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
                  @click="saveItem('categories', category)"
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
              });
              expandList('categories');
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

      <div
        class="body flex flex-col divide-y divide-neutral-800"
        v-if="tab === 'customization'"
      >
        <div class="burn-in-protection pb-6 flex flex-col">
          <h2 class="text-white/75">Burn in Protection</h2>
          <div class="mt-2 flex items-start sm:items-center gap-2">
            <input
              type="checkbox"
              v-model="movement"
              class="size-5 lg:size-4 mt-2 sm:mt-0 rounded-md"
              @change="saveMovement()"
              id="movement"
            />
            <label for="movement" class="text-gray-400"
              >Enabling this will move the central section left and right slowly. This
              "might" prevent burn-in.</label
            >
          </div>
        </div>

        <div
          class="wallpapers py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2"
          v-if="wallpapers.length"
        >
          <h2 class="text-white/75">Wallpapers</h2>
          <button
            @click="saveWallpaper('auto')"
            class="md:col-span-2 lg:col-span-3 w-full p-6 text-white border flex flex-col justify-center items-center gap-2 rounded-lg transition duration-300"
            :class="
              mode === 'auto' ? 'border-sky-300' : 'border-gray-700 hover:border-gray-500'
            "
          >
            <div class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-5 text-white"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
              Auto
            </div>
            <p class="text-gray-400">
              This mode will automatically cycle through wallpapers depending on the
              calendar week/month.
            </p>
          </button>
          <button
            @click="saveWallpaper(index)"
            class="wallpaper w-full h-auto aspect-video p-2 border rounded-lg overflow-hidden transition duration-300"
            :class="
              mode == index ? 'border-sky-300' : 'border-gray-700 hover:border-gray-500'
            "
            v-for="(wallpaper, index) in wallpapers"
            :key="index"
          >
            <img :src="wallpaper[0]" class="w-full h-full object-cover rounded-sm" />
          </button>
        </div>

        <div class="credits pt-6">
          <h2 class="text-white/75">Credits</h2>
          <ul class="text-gray-300 list-disc list-inside">
            <li>
              Weather Icons by
              <a
                href="https://bas.dev"
                target="_blank"
                class="text-gray-300 underline hover:text-white transition duration-300"
                >Bas Milius</a
              >
            </li>
            <li>
              Icons by
              <a
                href="https://heroicons.com"
                target="_blank"
                class="text-gray-300 underline hover:text-white transition duration-300"
                >Heroicons</a
              >
            </li>
            <li>
              Developed by
              <a
                href="https://github.com/safeboot"
                target="_blank"
                class="text-gray-300 underline hover:text-white transition duration-300"
                >safeboot</a
              >
            </li>
          </ul>
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
import { nextTick } from "vue";
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },

  data() {
    return {
      open: false,
      tab: "content",
      expanded: {
        servers: true,
        apps: true,
        bookmarks: true,
        categories: true,
      },
      servers: [],
      apps: [],
      bookmarks: [],
      categories: [],
      wallpapers: [],
      mode: "auto",
      movement: true,
      dragging: false,
    };
  },

  mounted() {
    this.getServers();
    this.getApps();
    this.getBookmarks();
    this.getCategories();
    this.getWallpapers();
    this.movement = localStorage.getItem("movement") === "true" || true;
  },

  methods: {
    async getServers() {
      await fetch("/api/servers")
        .then((response) => response.json())
        .then((data) => {
          this.servers = data.sort((a, b) => a.order - b.order);
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

    async saveItem(type, item, refresh = true) {
      await fetch(`/api/${type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(item),
      })
        .then((response) => response.json())
        .then((data) => {
          item.id = data.data.id;
        });

      if (refresh) {
        this.$emit("updated-settings");
      }
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
      this.apps = this.apps.filter((a) => a.server_id !== server.id);
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
      this.bookmarks = this.bookmarks.filter((b) => b.category_id !== category.id);
      this.$emit("updated-settings");
    },

    async getWallpapers() {
      this.wallpapers = Object.entries(import.meta.glob("/public/wallpapers/*"));
      this.mode = localStorage.getItem("wallpaper") || "auto";
    },

    async saveWallpaper(value) {
      this.mode = value;
      localStorage.setItem("wallpaper", this.mode);
      this.$emit("updated-settings");
    },

    async saveMovement() {
      localStorage.setItem("movement", this.movement);
      this.$emit("updated-settings");
    },

    async saveOrder(event, type) {
      const items = this[type].filter((item) => item.id !== event.moved.element.id);

      items.splice(event.moved.newIndex, 0, event.moved.element);

      items.forEach((item, index) => {
        item.order = index;

        this.saveItem(type, item, index === items.length - 1);
      });
    },

    async expandList(section) {
      this.expanded[section] = true;

      await nextTick();

      let container = null;

      switch (section) {
        case "servers":
          container = "serverContainer";
          break;

        case "apps":
          container = "appContainer";
          break;

        case "bookmarks":
          container = "bookmarkContainer";
          break;

        case "categories":
          container = "categoryContainer";
          break;
      }

      if (container) {
        this.$refs[container].style.maxHeight = this.$refs[container].scrollHeight + "px";
      }
    },
  },
};
</script>
