<style lang="less">
.color-hue {
  position: relative;
  padding: 3px 2px;
  user-select: none;

  .slider {
    height: 4px;
    background-color: rgba(255, 255, 255, 0.9);
    border-top: 1px solid #CCC;
    border-bottom: 1px solid #CCC;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    cursor: ns-resize;
    transform-origin: 0 0;
  }
}
</style>

<template>
<div class="color-hue" :style="{width: canvasWidth + 'px'}">
  <canvas :width="canvasWidth" :height="canvasHeight" v-el:canvas
    @click.prevent.stop="handleCanvasClick($event)"></canvas>
  <div class="slider" :style="{
    transform: 'translateY(' + sliderPosY + 'px)'
  }" @mousedown.prevent.stop="handleSliderDragStart($event)" v-el:slider></div>
</div>
</template>

<script>
import {startDrag, clamp} from './util'

export default {
  name: 'color-hue',
  props: {
    hue: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      canvasWidth: 20,
      canvasHeight: 255
    }
  },
  computed: {
    sliderPosY: {
      get() {
        return ((1 - this.hue / 360) % 1) * this.canvasHeight
      },
      set(y) {
        this.hue = ((1 - y / this.canvasHeight) % 1) * 360
      }
    }
  },
  methods: {
    handleSliderDragStart(evt) {
      if (evt.which !== 1) {
        return
      }

      let {clientY: mouseY} = evt
      let $slider = this.$els.slider
      let {top: itemTop} = $slider.getBoundingClientRect()
      let {top: contTop} = $slider.parentElement.getBoundingClientRect()
      let mouseOffsetY = mouseY - itemTop + contTop

      startDrag((evt) => {
        let {clientY: y} = evt
        this.sliderPosY = clamp(y - mouseOffsetY, 0, this.canvasHeight - 0.0001)
      }, (evt) => {})
    },
    handleCanvasClick(evt) {
      if (evt.which !== 1) {
        return
      }
      let {clientY: mouseY} = evt
      let $canvas = this.$els.canvas
      let {top: itemTop} = $canvas.getBoundingClientRect()
      this.sliderPosY = mouseY - itemTop
    }
  },
  events: {

  },
  components: {

  },
  ready() {
    let context = this.$els.canvas.getContext('2d')
    var hueGrd = context.createLinearGradient(0, 0, 0, this.canvasHeight)

    // Add colors
    hueGrd.addColorStop(0.01, 'rgba(255, 0, 0, 1.000)')
    hueGrd.addColorStop(0.167, 'rgba(255, 0, 255, 1.000)')
    hueGrd.addColorStop(0.333, 'rgba(0, 0, 255, 1.000)')
    hueGrd.addColorStop(0.500, 'rgba(0, 255, 255, 1.000)')
    hueGrd.addColorStop(0.666, 'rgba(0, 255, 0, 1.000)')
    hueGrd.addColorStop(0.828, 'rgba(255, 255, 0, 1.000)')
    hueGrd.addColorStop(0.999, 'rgba(255, 0, 0, 1.000)')

    // Fill with gradient
    context.fillStyle = hueGrd
    context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    context.fillRect(0, 0, this.canvasWidth, this.canvasHeight)

    this.context = context
  }
}
</script>
