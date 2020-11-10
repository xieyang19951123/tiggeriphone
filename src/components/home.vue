<!--  -->
<template>
<div class='' style="height:100%;">

    <view-box ref="viewbox" body-padding-top="10px">

        <div style="height: calc(100vh - 100px); overflow:auto;">
            <keep-alive>
                <router-view @changge="changge"></router-view>
            </keep-alive>
        </div>

    </view-box>

    <tabbar v-if="footerShow" style="position:fixed;" @on-index-change="indexChange" v-model="index">
        <tabbar-item link="/home/homepage">
            <img slot="icon" src="../assets/kecheng.png">
            <span slot="label">课程</span>
        </tabbar-item>

        <tabbar-item link="/home/organ">
            <img slot="icon" src="../assets/jigou.png">
            <span slot="label">机构</span>
        </tabbar-item>
        <tabbar-item link="/home/mycentre">
            <img slot="icon" src="../assets/shangcheng.png">
            <span slot="label">商城</span>
        </tabbar-item>
        <tabbar-item link="/home/my">
            <img slot="icon" src="../assets/my.png">
            <span slot="label">我的</span>
        </tabbar-item>
    </tabbar>

</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

import {
    Tabbar,
    Icon,
    TabbarItem,
    XHeader,
    Loading,
    ViewBox
} from 'vux'
import {
    mapGetters,
    mapActions
} from 'vuex'
export default {

    //import引入的组件需要注入到对象中才能使用
    components: {
        Tabbar,
        TabbarItem,
        ViewBox,
        XHeader,

    },
    data() {
        //这里存放数据
        return {
            index: 0
        };
    },
    //监听属性 类似于data概念
    // 计算属性
    computed: mapGetters([
        // 从 getters 中获取值
        'footerShow',
        'pageFooter'
    ]),
    //监控data中的数据变化
    watch: {

    },
    //方法集合
    methods: {
        indexChange(val) {
            //console.log(this.index)
            this.$store.commit('UPDATE_PAGE_FOOTER', val)
        },
        changge(val) {
            //console.log(val)
            this.index = val

        },

    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.index = this.$store.state.mutations.pageFooter
    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {
        let user = this.$cookies.get("user")
        console.log(user)
        console.log(this.locationll());
        //console.log(user)
    }, //如果页面有keep-alive缓存功能，这个函数会触发

}
</script>

<style lang="less" scoped>
.icon1 {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
