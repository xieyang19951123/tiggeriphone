<!--  -->
<template>
<div class=''>
    <x-header style=" width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{preventGoBack: true}" @on-click-back="$router.push('/home/my')">
        <span slot="right" @click="$router.push(`myrecord/${0}`)">新增</span>
    </x-header>
    <view-box ref="viewbox" body-padding-top="37px">
        <group label-align="right">
            <cell title="姓名" :value="m.zhName" v-for="m in myrecords" :key="m.id" @click.native="$router.push(`myrecord/${m.id}`)"></cell>
        </group>
    </view-box>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            myrecords: []
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        getmyrecord() {
            this.$http({
                url: this.$http.adornUrl('/tigger/child/getlist'),
                method: 'get',
                params: this.$http.adornParams({
                    uid: this.$cookies.get("user").id
                })
            }).then(({
                data
            }) => {
                // console.log(data)
                this.myrecords = data.page
            })
        },

    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.getmyrecord()
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
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
