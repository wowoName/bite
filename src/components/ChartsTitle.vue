<template>
  <div class="chartsTitle">
    <div class="charts-name">{{name}}</div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='scss' scoped>
.chartsTitle {
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  padding: 0px 5px 2px 5px;
  .charts-name {
    font-size: 1px;
    color: #548cc2;
  }
}
</style>