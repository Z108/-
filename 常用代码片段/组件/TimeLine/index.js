import Timeline from './Timeline.vue'
import TimelineItem from './TimelineItem.vue'

import './style.less'

export default {
  install(Vue) {
    Vue.component(Timeline.name, Timeline)
    Vue.component(TimelineItem.name, TimelineItem)
  }
}
