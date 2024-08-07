<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-between items-start">
      <h1 class="text-6xl md:text-8xl text-white font-medium transition-all duration-300">
        {{ time.hour.toString().padStart(2, "0") }}:{{
          time.minute.toString().padStart(2, "0")
        }}:{{ time.second.toString().padStart(2, "0") }}
      </h1>
      <Transition>
        <div class="flex items-center gap-2" v-if="weather.temperature !== null">
          <p class="text-white text-xl">{{ weather.temperature }}°C</p>
          <img :src="getWeatherIcon()" class="w-9" />
        </div>
      </Transition>
    </div>
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
      weather: {
        latitude: null,
        longitude: null,
        temperature: null,
        weatherCode: null,
      },
    };
  },

  mounted() {
    this.updateDateTime();
    this.getLocation();
    this.getWeather();

    setInterval(this.getWeather, 300000);
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
    async getWeather() {
      if (location.protocol !== "https:") {
        return;
      }

      if (navigator.geolocation) {
        await this.getLocation();
      } else {
        return;
      }

      if (this.weather.latitude !== null && this.weather.longitude !== null) {
        await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${this.weather.latitude}&longitude=${this.weather.longitude}&current=temperature_2m,weather_code`
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            this.weather.temperature = data.current.temperature_2m;
            this.weather.weatherCode = data.current.weather_code;
          });
      } else {
        setTimeout(() => {
          this.getWeather();
        }, 5000);
      }
    },

    getLocation() {
      if (!navigator.geolocation) {
        return;
      }

      navigator.geolocation.getCurrentPosition((position) => {
        this.weather.latitude = position.coords.latitude;
        this.weather.longitude = position.coords.longitude;
      });
    },

    getWeatherIcon() {
      const isDay = this.time.hour >= 6 && this.time.hour < 18;

      switch (this.weather.weatherCode) {
        case 0:
        case 1:
        case 2:
        case 3:
          return this.getDayNightIcon();
          break;

        case 45:
        case 48:
          return "https://basmilius.github.io/weather-icons/production/fill/all/mist.svg";
          break;

        case 51:
        case 53:
        case 55:
          return "https://basmilius.github.io/weather-icons/production/fill/all/drizzle.svg";
          break;

        case 56:
        case 57:
          return "https://basmilius.github.io/weather-icons/production/fill/all/hail.svg";
          break;

        case 61:
        case 63:
        case 65:
          return isDay
            ? "https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-day-rain.svg"
            : "https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-night-rain.svg";
          break;

        case 66:
        case 67:
          return isDay
            ? "https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-day-sleet.svg"
            : "https://basmilius.github.io/weather-icons/production/fill/all/partly-cloudy-night-sleet.svg";
          break;

        case 71:
        case 73:
        case 75:
          return "https://basmilius.github.io/weather-icons/production/fill/all/snow.svg";
          break;

        case 77:
          return "https://basmilius.github.io/weather-icons/production/fill/all/snow.svg";
          break;

        case 80:
        case 81:
        case 82:
          return "https://basmilius.github.io/weather-icons/production/fill/all/rain.svg";
          break;

        case 85:
        case 86:
          return "https://basmilius.github.io/weather-icons/production/fill/all/snow.svg";
          break;

        case 95:
          return isDay
            ? "https://basmilius.github.io/weather-icons/production/fill/all/thunderstorms-day.svg"
            : "https://basmilius.github.io/weather-icons/production/fill/all/thunderstorms-night.svg";
          break;

        case 96:
        case 99:
          return "https://basmilius.github.io/weather-icons/production/fill/all/thunderstorms-rain.svg";
          break;
      }
    },

    getDayNightIcon() {
      if (this.time.hour >= 6 && this.time.hour <= 8) {
        return "https://basmilius.github.io/weather-icons/production/fill/all/sunrise.svg";
      } else if (this.time.hour >= 16 && this.time.hour <= 18) {
        return "https://basmilius.github.io/weather-icons/production/fill/all/sunset.svg";
      } else if (this.time.hour > 8 && this.time.hour < 16) {
        return "https://basmilius.github.io/weather-icons/production/fill/all/clear-day.svg";
      } else {
        return "https://basmilius.github.io/weather-icons/production/fill/all/clear-night.svg";
      }
    },
  },
};
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
