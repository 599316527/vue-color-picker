<style lang="less">
.color-alpha {
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
<div class="color-alpha" :style="{width: canvasWidth + 'px'}">
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
  name: 'color-alpha',
  props: {
    hue: {
      type: Number,
      required: true
    },
    alpha: {
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
        return (1 - this.alpha) * this.canvasHeight
      },
      set(y) {
        this.alpha = 1 - y / this.canvasHeight
      }
    }
  },
  watch: {
    hue() {
      this.drawAlphaGradientBanner()
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
    },
    drawAlphaGradientBanner() {
      let context = this.context
      let alphaGrd = context.createLinearGradient(0, 0, 0, this.canvasHeight)

      // Add colors
      alphaGrd.addColorStop(0.01, `hsla(${this.hue}, 100%, 50%, 1)`)
      alphaGrd.addColorStop(0.999, `hsla(${this.hue}, 100%, 50%, 0)`)

      // Fill with gradient
      context.fillStyle = alphaGrd
      context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
      context.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
    }
  },
  events: {

  },
  components: {

  },
  ready() {
    this.context = this.$els.canvas.getContext('2d')
    this.drawAlphaGradientBanner()
  }
}
</script>
