<style lang="less">
.color-picker {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 350px;
  height: 280px;
  background-color: #F1F1F1;

  .hue,
  .alpha {
    width: 28px;
  }
}
</style>

<template>
<div class="color-picker">
  <div class="spectrum">
    <spectrum :hue.sync="value.h" :saturation.sync="value.s"
      :lightness.sync="value.l"></spectrum>
  </div>
  <div class="hue">
    <hue :hue.sync="value.h"></hue>
  </div>
  <div class="alpha">
    <alpha :hue="value.h" :alpha.sync="value.a"></alpha>
  </div>
</div>
</template>

<script>
import Hue from './Hue'
import Alpha from './Alpha'
import Spectrum from './Spectrum'

export default {
  name: 'ColorPicker',
  props: {
    value: {
      type: Object,
      default: {
        h: 0,
        s: 0,
        l: 0,
        a: 1
      }
    }
  },
  data() {
    return {

    }
  },
  computed: {

  },
  methods: {

  },
  events: {

  },
  components: {
    Hue, Alpha, Spectrum
  },
  ready() {

  }
}
</script>
