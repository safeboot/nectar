<p align="center">
   <img src="public/logo_full.png" width="512px">
</p>

<p align="center">
   Small, self-hostable and customizable homelab dashboard.
</p>

---

<p align="center" style="font-style: italic; font-weight: 600">"Ever dreaming to taste the sweet nectar of morality."</p>

## About the Project
Nectar is simple and small dashboard for homelabers. It's designed to be self-hosted and customized to your heart's content. This app uses very little resources and can be run totally offline.

<!-- - 🌤️ **Weather Widget** (powered by Open-Meteo) - you can configure the location in the config file without using your actual location or any telemetry. -->
- 💽 **Server List** - this app relies on nothing but your configuration, you can adjust the name, hostname and the port. Server list is designed to be a simple list of your servers.
- 🥪 **Apps List** - Nectar allows you to categorize your apps by server and search your collection.
- 📌 **Bookmarks** - bookmark your favorite websites and organize them in categories through the settings panel.

<p align="center">
   <img src=".github/preview.png">
</p>

## Installation
### Running Locally (Node.js)
Before you install Nectar, you will need to have **Node.js** as well as **npm** installed on your system. You can download Node.js from [here](https://nodejs.org/en/download/).

After you have Node, clone or download the project and extract it to a folder. Open a terminal in the folder and run the following command:

```bash
npm install
```

Once the installation is complete, you can run the app locally using the following command:

```bash
npm run dev
```

This will start the app on `http://localhost:3000`. You can access the app by opening your browser and navigating to the address.

### Running on GitHub Pages / Vercel
Please note that you can also run Nectar on GitHub Pages or any supported provider as listed in Vite's documentation ([click here](https://vitejs.dev/guide/static-deploy.html)). This method is untested so your mileage may vary...

### Running with Docker
You can also run Nectar using Docker. To do this, you will need to have Docker installed on your system. You can download Docker from [here](https://www.docker.com/).

Once Docker has been successfully installed, clone or download the project and extract it to a folder. Open a terminal in the folder and run the following command:

```bash
docker pull ghcr.io/safeboot/nectar:latest
```

Or alternatively, you can build the image yourself:
```bash
docker build -t nectar .
```

Once the image has been pulled or built, you can run the app using the following command:
```bash
docker run -d -p 3000:3000 ghcr.io/safeboot/nectar:latest
```

**One more step!**

You will need to place your Wallpapers inside the folder named `wallpapers` inside the `public` folder. The app will pick them up and they can be configured inside the Settings panel.

> Note that you have to place the wallpapers inside the `public/wallpapers` folder before building the Docker image. But worry not, I am working on a way to link storage and have dynamic wallpaper support.

And that's it! You're all set up and ready to go. **Enjoy Nectar!** 🎉

## Roadmap
- [x] Add bookmarks panel
- [x] Adjust config through the UI
- [x] Wallpaper picker
- [x] Docker support
- [ ] Re-add Weather Widget
- [ ] Demo Page
- [ ] Dynamic Storage Support

## License
Licensed under the Apache License, Version 2.0. Check the [LICENSE](LICENSE.md) file for more information.
