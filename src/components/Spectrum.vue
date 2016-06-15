<style lang="less">
.color-spectrum {
  position: relative;
  padding: 8px;
  user-select: none;

  .picker {
    width: 12px;
    height: 12px;
    border: 2px solid white;
    border-radius: 10px;
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: 0 0;
    box-shadow: 0 0 5px #aaa;
  }
}
</style>

<template>
<div class="color-spectrum">
  <canvas :width="canvasWidth" :height="canvasHeight" v-el:canvas
    @click.prevent.stop="handleCanvasClick($event)"></canvas>
  <div class="picker" :style="{
    transform: 'translate(' + pickerPosX + 'px,' + pickerPosY + 'px)'
  }" @mousedown.prevent.stop="handlePickerDragStart($event)" v-el:picker></div>
</div>
</template>

<script>
import {startDrag, clamp} from './util'

export default {
  name: 'color-spectrum',
  props: {
    hue: {
      type: Number,
      required: true
    },
    saturation: {
      type: Number,
      required: true
    },
    lightness: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      canvasWidth: 255,
      canvasHeight: 255
    }
  },
  computed: {
    pickerPosX: {
      get() {
        return (this.saturation / 100) * 255
      },
      set(x) {
        this.saturation = x / 255 * 100
      }
    },
    pickerPosY: {
      get() {
        return (1 - this.lightness / (100 - this.saturation / 2)) * 255
      },
      set(y) {
        this.lightness = (1 - y / 255) * (100 - this.saturation / 2)
      }
    }
  },
  watch: {
    hue() {
      this.drawSpectrumGradientBanner()
    }
  },
  methods: {
    handlePickerDragStart(evt) {
      if (evt.which !== 1) {
        return
      }

      let {clientX: mouseX, clientY: mouseY} = evt
      let $picker = this.$els.picker
      let {left: itemLeft, top: itemTop} = $picker.getBoundingClientRect()
      let {left: contLeft, top: contTop} = $picker.parentElement.getBoundingClientRect()
      let mouseOffsetX = mouseX - itemLeft + contLeft
      let mouseOffsetY = mouseY - itemTop + contTop

      startDrag((evt) => {
        let {clientX: x, clientY: y} = evt
        this.pickerPosX = clamp(x - mouseOffsetX, 0, this.canvasWidth - 0.0001)
        this.pickerPosY = clamp(y - mouseOffsetY, 0, this.canvasHeight - 0.0001)
      }, (evt) => {})
    },
    handleCanvasClick(evt) {
      if (evt.which !== 1) {
        return
      }
      let {clientX: mouseX, clientY: mouseY} = evt
      let $canvas = this.$els.canvas
      let {left: itemLeft, top: itemTop} = $canvas.getBoundingClientRect()
      this.pickerPosX = mouseX - itemLeft
      this.pickerPosY = mouseY - itemTop
    },
    drawSpectrumGradientBanner() {
      this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight)

      let whiteGrd = this.context.createLinearGradient(0, 0, this.canvasWidth, 0)
      whiteGrd.addColorStop(0, 'rgba(255, 255, 255, 1.000)')
      whiteGrd.addColorStop(1, 'rgba(255, 255, 255, 0.000)')

      // Black Gradient
      let blackGrd = this.context.createLinearGradient(0, 0, 0, this.canvasHeight)
      blackGrd.addColorStop(0, 'rgba(0, 0, 0, 0.000)')
      blackGrd.addColorStop(1, 'rgba(0, 0, 0, 1.000)')

      // Fill with solid
      this.context.fillStyle = 'hsl( ' + this.hue + ', 100%, 50%)'
      this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight)

      // Fill with white
      this.context.fillStyle = whiteGrd
      this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight)

      // Fill with black
      this.context.fillStyle = blackGrd
      this.context.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
    }
  },
  events: {

  },
  components: {

  },
  ready() {
    this.context = this.$els.canvas.getContext('2d')
    this.drawSpectrumGradientBanner()
  }
}
</script>
