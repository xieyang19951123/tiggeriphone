<!--  -->
<template>
<div class=''>
    <x-header style=" width:100%;position:absolute;left:0;top:0;z-index:100;">

    </x-header>
    <view-box ref="viewbox" body-padding-top="37px">
        <group>
            <cell :title="s.psUsername" v-for="s in student" :key="s.id" @click.native="$router.push(`/mystudentlist/${s.id}`)">

            </cell>
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
            student: []
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        getstudent() {
            this.$http({
                url: this.$http.adornUrl("/shopvip/record/getRecold"),
                method: "get",
                params: this.$http.adornParams({
                    id: this.$cookies.get("user").userType
                })
            }).then(({
                data
            }) => {
                console.log(data)
                this.student = data.page
            })
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        console.log(this.$cookies.get("user"))
        this.getstudent()
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
