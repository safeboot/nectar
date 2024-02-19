<template>
  <div class="bookmarks-container flex flex-col gap-2">
    <div class="flex flex-col md:flex-row justify-between md:items-end">
      <h1 class="text-xl text-gray-100">Bookmarks</h1>
      <div class="flex justify-between md:justify-end items-center md:items-end gap-2">
        <select
          v-model="category"
          @change="filterBookmarks"
          class="form-select w-40 h-8 appearence-none bg-transparent text-white px-1 py-0 outline-none border-transparent rounded-lg focus:border-sky-300 transition-all duration-300"
        >
          <option value="null" class="bg-neutral-700">All Bookmarks</option>
          <option
            :value="name"
            v-for="(bookmark, name) in categories"
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
          @change="filterBookmarks"
          class="w-40 h-8 appearence-none bg-transparent text-white placeholder:text-sky-100/50 px-1 py-0 outline-none border-transparent rounded-lg focus:border-orange-300 transition-all duration-300"
        />
      </div>
    </div>
    <div
      class="bookmarks grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-6"
    >
      <a
        :href="bookmark.url"
        target="_blank"
        class="bookmark group backdrop-blur-md border border-gray-500/50 p-3 md:p-4 flex flex-col gap-2 rounded-xl shadow-md overflow-hidden active:shadow-orange-400/50 active:shadow-lg hover:border-orange-300 hover:shadow-lg transition duration-300"
        v-for="(bookmark, name, index) in filteredBookmarks"
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
          class="icon size-12 md:size-14 bg-white/10 p-1.5 flex justify-center items-center rounded-md overflow-hidden group-hover:bg-white/15 transition-all duration-300"
        >
          <img
            :src="
              bookmark.icon ??
              `https://s2.googleusercontent.com/s2/favicons?domain_url=${bookmark.url}&size=128`
            "
            class="w-full h-full object-contain rounded-sm"
          />
        </div>
        <div class="flex flex-col">
          <h1 class="text-white md:text-lg font-medium line-clamp-1">{{ name }}</h1>
          <p class="text-sm text-gray-200">
            {{ bookmark.category }}
          </p>
        </div>
      </a>
      <p
        class="col-span-2 md:col-span-4 text-center text-xl text-gray-200"
        v-if="Object.keys(filteredBookmarks).length === 0"
      >
        No bookmarks found :/
      </p>
    </div>
  </div>
</template>

<script>
import * as json from "../../config.json";

export default {
  data() {
    return {
      bookmarks: json.bookmarks,
      filteredBookmarks: json.bookmarks,
      categories: [],
      category: null,
      search: "",
    };
  },

  mounted() {
    this.filterBookmarks();

    this.categories = Object.fromEntries(
      Object.entries(this.bookmarks).map(([name, bookmark]) => [bookmark.category, true])
    );
  },

  methods: {
    filterBookmarks() {
      this.filteredBookmarks = this.bookmarks;
      if ((this.category === null || this.category === "null") && this.search === "") {
        return;
      }

      let bookmarks = this.bookmarks;

      if (this.category && this.category !== "null") {
        bookmarks = Object.fromEntries(
          Object.entries(bookmarks).filter(
            ([name, bookmark]) => bookmark.category === this.category
          )
        );
      }

      if (this.search && this.search !== "") {
        bookmarks = Object.fromEntries(
          Object.entries(bookmarks).filter(([name]) =>
            name.toLowerCase().includes(this.search.toLowerCase())
          )
        );
      }

      this.filteredBookmarks = bookmarks;
    },
  },
};
</script>
