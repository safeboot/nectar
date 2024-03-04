import './style.css'
import { createApp } from './main'

import { MotionPlugin } from '@vueuse/motion'

const { app } = createApp()

app.use(MotionPlugin)

app.mount('#app')