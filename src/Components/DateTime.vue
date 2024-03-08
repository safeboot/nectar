<template>
  <div class="flex flex-col gap-2">
    <div class="flex justify-between items-start">
      <h1 class="text-6xl md:text-8xl text-white font-medium transition-all duration-300">
        {{ time.hour.toString().padStart(2, "0") }}:{{
          time.minute.toString().padStart(2, "0")
        }}:{{ time.second.toString().padStart(2, "0") }} {{time.ampm}}
      </h1>
      <div
        class="flex items-start gap-2"
        v-if='(settings["weather.enabled"] === "true") && weather.temperature !== null'
      >
        <img :src="getWeatherIcon()" class="w-8" />
        <p class="text-white text-xl">{{ weather.temperature }}°C</p>
      </div>
    </div>
    <p class="text-white md:text-2xl transition-all duration-300">{{ date }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      settings: {
          "time.time_format": "",
          "weather.enabled": "",
          "weather.location.latitude": "",
          "weather.location.longitude": ""
      },
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
        ampm: "",
      },

      date: "",
      weather: {
        temperature: null,
        weatherCode: null,
      },
    };
  },

  mounted() {
    this.getSettings()
  },


  methods: {
    async getSettings() {
      await fetch("/api/settings")
        .then((response) => response.json())
        .then((data) => {
          for(let each of data) {
            this.settings[each.name] = each.value
          }
          
        });
      this.afterSetting()
    },
    afterSetting() {
      this.updateDateTime();
      this.getWeather();

      setInterval(this.getWeather, 60000);
    },
    updateDateTime() {
      const date = new Date();

      this.time.ampm = ""

      this.time.hour = date.getHours();
      if(this.settings["time.time_format"] == "12h") {
      if (this.time.hour > 12) {
         this.time.hour = this.time.hour - 12
         this.time.ampm = "PM"
      }
      }

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
      if (
        !(this.settings["weather.enabled"] === "true") ||
        this.settings["weather.location.latitude"] === null ||
        this.settings["weather.location.longitude"] === null
      ) {
        return;
      }
      await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${this.settings["weather.location.latitude"]}&longitude=${this.settings["weather.location.longitude"]}&current=temperature_2m,weather_code`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.weather.temperature = data.current.temperature_2m;
          this.weather.weatherCode = data.current.weather_code;
        });
    },
    getWeatherIcon() {
      switch (this.weather.weatherCode) {
        case 0:
        case 1:
        case 2:
        case 3:
          return "https://openweathermap.org/img/wn/01d@2x.png";
          break;

        case 45:
        case 48:
          return "https://openweathermap.org/img/wn/50d@2x.png";
          break;

        case 51:
        case 53:
        case 55:
          return "https://openweathermap.org/img/wn/09d@2x.png";
          break;

        case 56:
        case 57:
          return "https://openweathermap.org/img/wn/09d@2x.png";
          break;

        case 61:
        case 63:
        case 65:
          return "https://openweathermap.org/img/wn/10d@2x.png";
          break;

        case 66:
        case 67:
          return "https://openweathermap.org/img/wn/10d@2x.png";
          break;

        case 71:
        case 73:
        case 75:
          return "https://openweathermap.org/img/wn/13d@2x.png";
          break;

        case 77:
          return "https://openweathermap.org/img/wn/13d@2x.png";
          break;

        case 80:
        case 81:
        case 82:
          return "https://openweathermap.org/img/wn/09d@2x.png";
          break;

        case 85:
        case 86:
          return "https://openweathermap.org/img/wn/13d@2x.png";
          break;

        case 95:
          return "https://openweathermap.org/img/wn/11d@2x.png";
          break;

        case 96:
        case 99:
          return "https://openweathermap.org/img/wn/11d@2x.png";
          break;
      }
    },
  },
};
</script>
