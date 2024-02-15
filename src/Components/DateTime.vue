<template>
  <div class="flex flex-col gap-2">
    <h1 class="text-6xl md:text-8xl text-white font-medium transition-all duration-300">
      {{ time.hour.toString().padStart(2, "0") }}:{{
        time.minute.toString().padStart(2, "0")
      }}:{{ time.second.toString().padStart(2, "0") }}
    </h1>
    <p class="text-white md:text-2xl transition-all duration-300">{{ date }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      months: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      time: {
        hour: 0,
        minute: 0,
        second: 0,
      },
      date: "",
    };
  },

  mounted() {
    this.updateDateTime();
  },

  methods: {
    updateDateTime() {
      const date = new Date();

      this.time.hour = date.getHours();
      this.time.minute = date.getMinutes();
      this.time.second = date.getSeconds();

      this.date =
        this.days[date.getDay()] +
        ", " +
        date.getDate() +
        this.getDateOrdinal(date.getDate()) +
        " " +
        this.months[date.getMonth()] +
        " " +
        date.getFullYear();

      setTimeout(this.updateDateTime, 1000);
    },
    getDateOrdinal(day) {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    },
  },
};
</script>
