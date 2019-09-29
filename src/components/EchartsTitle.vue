<template>
  <div class="title" :class="IsPie?'pie-title':'line-title'">{{title}}</div>
</template>

<script>
export default {
  name: "EcahrtsTitle",
  components: {},
  props: {
    title: {
      type: String,
      defalut: ""
    },
    IsPie: Boolean
  },
  data() {
    return {};
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
.title {
  position: absolute;

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 1px;
  color: #548cc2;
}
.line-title {
  left: 3%;
  top: -4.5px;
}
.pie-title {
  left: 2px;
  top: 0.5px;
}
</style>