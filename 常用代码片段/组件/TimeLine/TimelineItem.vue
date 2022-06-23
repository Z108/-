<template>
  <div :class="classes">
    <div class="timeline--item-line"></div>
    <div class="timeline--item-node">
      <slot name="node">
        <div class="timeline--item-node-content">
          {{node}}
        </div>
      </slot>
    </div>
    <div class="timeline--item-time" v-if="time || $slots.time">
      <slot name="time" :time="time">{{time}}</slot>
    </div>
    <div class="timeline--item-body">
      <slot>
        <div class="timeline--item-body-wrapper">
          <div class="timeline--item-title">
            <slot name="title">{{title}}</slot>
          </div>
          <div class="timeline--item-content">
            {{content}}
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimelineItem',
  props: {
    node: {
      type: [String, Number]
    },
    time: {
      type: String
    },
    title: {
      type: String
    },
    content: {
      type: String
    },
    // 相对轴的位置
    position: {
      type: String,
      default: 'right'
    }
  },
  mounted(){
console.log(this.time,666);
  },
  computed: {
    classes () {
      return {
        'timeline--item': true,
        [`timeline--item-position-${this.position}`]: true
      }
    }
  }
}
</script>
