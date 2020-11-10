<!--  -->
<template>
<div class=''>
    <x-header style=" width:100%;position:absolute;left:0;top:0;z-index:100;">

    </x-header>
    <view-box ref="viewbox" body-padding-top="37px">
        <group label-align="right">
            <cell title="中文名：" :value="child.zhName"></cell>
            <cell title="英文名：" :value="child.enName"></cell>
            <cell title="出生年月日:" :value="child.birth"></cell>
            <cell title="兴趣：" :value="child.interest"></cell>
            <cell title="特长：" :value="child.spec"></cell>
            <cell title="梦想：" :value="child.dream"></cell>
            <cell title="电话：" :value="child.iphone"></cell>
            <cell title="接收人姓名：" :value="child.sponsor"></cell>
            <cell title="目前就读学校：" :value="child.school"></cell>
            <cell title="身体健康方面：" :value="child.heathl"></cell>
            <cell title="沟通方式方面：" :value="child.kinkUp"></cell>

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
            child: {
                zhName: "",
                enName: "",
                birth: "",
                interest: "", //兴趣
                spec: "", //特长
                dream: "", //梦想
                iphone: '', //电话
                sponsor: "", //接受人名
                school: "",
                heathl: "", //健康
                kinkUp: "", //沟通方式
                uid: "",
                id: 0
            }
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        getmyrecordbyid() {
            this.$http({
                url: this.$http.adornUrl(`/tigger/child/info/${this.$route.params.id}`),
                method: 'get',

            }).then(({
                data
            }) => {
                console.log(data)
                this.child.zhName = data.page.zhName
                this.child.enName = data.page.enName
                this.child.birth = data.page.birth
                this.child.interest = data.page.interest
                this.child.spec = data.page.spec
                this.child.dream = data.page.dream
                this.child.iphone = data.page.iphone
                this.child.sponsor = data.page.sponsor
                this.child.school = data.page.school
                this.child.heathl = data.page.heathl
                this.child.kinkUp = data.page.kinkUp
                this.child.uid = data.page.uid
                this.child.id = data.page.id
            })
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.getmyrecordbyid()
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
