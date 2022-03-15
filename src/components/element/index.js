import {
  Carousel,
  CarouselItem
} from 'element-ui'

const coms = [
  Carousel,
  CarouselItem
]

export default {
  install(Vue, options) {
    coms.map(c => {
      Vue.component(c.name, c)
    })
  }
}
