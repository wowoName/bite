<template>
    <div class="title">
        <div class="square"></div>
        <span>{{title}}</span>
    </div>
</template>

<script>

export default {
    name: 'WisdomTitle',
    components: {},
    props: {
        title: {
            type: String,
            defalut: ""
        }
    },
    data() {
        return {

        };
    },
    computed: {},
    watch: {},
    methods: {

    },
    created() {

    },
    mounted() {

    },
    beforeCreate() { }, //生命周期 - 创建之前
    beforeMount() { }, //生命周期 - 挂载之前
    beforeUpdate() { }, //生命周期 - 更新之前
    updated() { }, //生命周期 - 更新之后
    beforeDestroy() { }, //生命周期 - 销毁之前
    destroyed() { }, //生命周期 - 销毁完成
    activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='scss' scoped>
.title {
    width: 100%;
    height: 6px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 4px 0;
    .square {
        width: 2.5px;
        height: 2.5px;
        margin-right: 2px;
        background-color: #4c86e6;
    }
    span {
        font-size: 6px;
        color: #548cc2;
    }
}
</style>