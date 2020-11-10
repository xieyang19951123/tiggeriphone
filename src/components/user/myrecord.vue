<!--  -->
<template>
<div class=''>
    <x-header style=" width:100%;position:absolute;left:0;top:0;z-index:100;">
        <span slot="right" @click="save">完成</span>
    </x-header>
    <view-box ref="viewbox" body-padding-top="37px">
        <group>
            <x-input title="中文名：" v-model="child.zhName"></x-input>
            <x-input title="英文名：" v-model="child.enName"></x-input>
            <datetime title="出生年月日" v-model="child.birth" :min-year="1970"></datetime>
            <x-input title="兴趣：" v-model="child.interest"></x-input>
            <x-input title="特长：" v-model="child.spec"></x-input>
            <x-input title="梦想：" v-model="child.dream"></x-input>
            <x-input title="电话：" v-model="child.iphone"></x-input>
            <x-input title="接收人姓名：" v-model="child.sponsor"></x-input>
            <x-input title="目前就读学校：" v-model="child.school"></x-input>
            <x-input title="身体健康方面：" v-model="child.heathl"></x-input>
            <x-input title="沟通方式方面：" v-model="child.kinkUp"></x-input>
        </group>
        <group>
            <x-button type="warn" @click.native="deleted" v-if="child.id !=0">删除</x-button>
            <x-button type="primary" v-if="child.id !=0" @click.native="$router.push(`/outschoolelist/${child.id}`)">校外培训</x-button>
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
        deleted() {
            if (this.child.id == 0) {
                return false
            }
            let ids = [this.child.id]
            this.$vux.loading.show()
            this.$http({
                url: this.$http.adornUrl('/tigger/child/delete'),
                method: 'post',
                //params: this.http.adornParams({})
                data: this.$http.adornData(ids, false)
            }).then(({
                data
            }) => {
                Object.assign(this.$data, this.$options.data())
            });
        },
        save() {
            this.$vux.loading.show()
            this.$http({
                url: this.$http.adornUrl(`/tigger/child/${ this.$route.params.id == 0 ? 'insert' : 'edit'}`),
                method: 'post',
                //params: this.http.adornParams({ })
                data: this.$http.adornData(this.child)
            }).then(({
                data
            }) => {
                this.$vux.loading.hide()
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
                console.log()
            });
        },
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
        init() {
            this.$route.params.id == 0 ? null : this.getmyrecordbyid()
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.child.uid = this.$cookies.get("user").id
        this.init()
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
