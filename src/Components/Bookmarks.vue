<template>
  <div class="bookmarks-container flex flex-col gap-2" v-if="bookmarks.length">
    <div class="flex flex-col md:flex-row justify-between md:items-end">
      <h1 class="text-xl text-gray-100">Bookmarks</h1>
      <div class="flex justify-between md:justify-end items-center md:items-end gap-2">
        <button @click="changeViewStyle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5 text-white md:mb-[5px]"
            v-if="viewStyle === 'grid'"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-5 text-white md:mb-1.5"
            v-else
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
            />
          </svg>
        </button>
        <select
          v-model="category"
          @change="filterBookmarks"
          class="form-select w-40 h-8 appearence-none bg-transparent text-white px-1 py-0 outline-none border-2 border-transparent rounded-lg focus:ring-transparent focus:border-orange-300 transition-all duration-300"
        >
          <option value="null" class="bg-neutral-700">All Categories</option>
          <option
            :value="category.id"
            v-for="(category, index) in categories"
            :key="index"
            class="bg-neutral-700"
          >
            {{ category.name }}
          </option>
        </select>
        <input
          type="text"
          v-model="search"
          placeholder="Search..."
          @change="filterBookmarks"
          class="w-40 h-8 appearence-none bg-transparent text-white placeholder:text-sky-100/50 px-1 py-0 outline-none border-2 border-transparent rounded-lg focus:ring-transparent focus:border-orange-300 transition-all duration-300"
        />
      </div>
    </div>
    <div
      class="bookmarks gap-2"
      :class="
        viewStyle === 'grid'
          ? 'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 md:gap-6'
          : 'flex flex-col md:gap-4'
      "
    >
      <a
        :href="bookmark.url"
        target="_blank"
        class="bookmark group bg-black/20 backdrop-blur-md border border-gray-500/50 p-3 md:p-4 rounded-xl shadow-md overflow-hidden active:shadow-orange-400/50 active:shadow-lg hover:border-orange-300 hover:shadow-lg transition duration-300"
        :class="viewStyle === 'grid' ? 'flex flex-col gap-2 ' : 'flex items-center gap-4'"
        v-for="(bookmark, index) in filteredBookmarks"
        :key="index"
      >
        <div
          class="icon size-12 md:size-14 bg-white/10 p-1.5 flex justify-center items-center flex-shrink-0 rounded-md overflow-hidden group-hover:bg-white/15 transition-all duration-300"
        >
          <img
            :src="
              bookmark.icon ??
              `https://s2.googleusercontent.com/s2/favicons?domain_url=${bookmark.url}&size=128`
            "
            class="w-full h-full object-contain rounded-sm"
          />
        </div>
        <div class="w-full flex flex-col">
          <h1 class="text-white md:text-lg font-medium line-clamp-1">
            {{ bookmark.name }}
          </h1>
          <div class="w-full flex justify-between items-center">
            <p class="text-sm text-gray-200">
              {{ bookmark.category_name }}
            </p>
            <p
              class="hidden text-sm text-white/50 text-right"
              :class="viewStyle === 'list' ? 'md:block' : ''"
            >
              {{ bookmark.url }}
            </p>
          </div>
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
export default {
  data() {
    return {
      bookmarks: [],
      filteredBookmarks: [],
      categories: [],
      category: null,
      search: "",
      viewStyle: "grid",
    };
  },

  mounted() {
    this.getBookmarkCategories();
    this.getBookmarks();
    this.filterBookmarks();

    this.categories = Object.fromEntries(
      Object.entries(this.bookmarks).map(([index, bookmark]) => [bookmark.category, true])
    );

    this.viewStyle = localStorage.getItem("bookmarks_view") ?? "grid";
  },

  methods: {
    async getBookmarkCategories() {
      await fetch("/api/bookmark_categories")
        .then((response) => response.json())
        .then((data) => {
          this.categories = data;
        });
    },

    async getBookmarks() {
      await fetch("/api/bookmarks")
        .then((response) => response.json())
        .then((data) => {
          this.bookmarks = data.sort((a, b) => a.order - b.order);
          this.filteredBookmarks = data;
        });
    },

    filterBookmarks() {
      this.filteredBookmarks = this.bookmarks;
      if ((this.category === null || this.category === "null") && this.search === "") {
        return;
      }

      let bookmarks = this.bookmarks;

      if (this.category && this.category !== "null") {
        bookmarks = Object.fromEntries(
          Object.entries(bookmarks).filter(
            ([index, bookmark]) => bookmark.category_id === this.category
          )
        );
      }

      if (this.search && this.search !== "") {
        bookmarks = Object.fromEntries(
          Object.entries(bookmarks).filter(([index, bookmark]) =>
            bookmark.name.toLowerCase().includes(this.search.toLowerCase())
          )
        );
      }

      this.filteredBookmarks = bookmarks;
    },

    changeViewStyle() {
      this.viewStyle = this.viewStyle === "grid" ? "list" : "grid";
      localStorage.setItem("bookmarks_view", this.viewStyle);
    },

    refresh() {
      this.bookmarks = [];
      this.categories = [];

      this.getBookmarkCategories();
      this.getBookmarks();
      this.filterBookmarks();

      this.categories = Object.fromEntries(
        Object.entries(this.bookmarks).map(([index, bookmark]) => [
          bookmark.category,
          true,
        ])
      );
    },
  },
};
</script>
