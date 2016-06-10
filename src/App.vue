<style lang="less">
.picker {
  h1 {
    font-size: 1.2em;
    text-shadow: 1px 1px 3px #ccc;
  }
}
</style>

<template>
<div class="picker">
  <h1 :style="{
    color: 'hsla(' + color.h + ', ' + color.s + '%, '
      + color.l + '%, ' + color.a + ')'
  }">
    hsla({{color.h.toFixed(2)}}, {{color.s.toFixed(2)}}%,
      {{color.l.toFixed(2)}}%, {{color.a.toFixed(2)}})
  </h1>
  <color-picker :value.sync="color"></color-picker>
</div>
</template>

<script>
import ColorPicker from './components/ColorPicker'

export default {
  name: 'App',
  props: {

  },
  data() {
    return {
      color: {
        h: 0,
        s: 100,
        l: 50,
        a: 1
      }
    }
  },
  computed: {

  },
  methods: {

  },
  events: {

  },
  components: {
    ColorPicker
  },
  ready() {

  }
}
</script>
