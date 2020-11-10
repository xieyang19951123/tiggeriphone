<!--  -->
<template>
<div class=''>
    <x-header left-options.preventGoBack="true" @on-click-back="goback()">收货地址<a slot="right" @click="add">添加</a></x-header>
    <view-box ref="viewbox">
        <panel :list="list" type="4"></panel>
    </view-box>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
    ViewBox,
    XHeader,
    Panel

} from 'vux'
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
        ViewBox,
        XHeader,
        Panel
    },
    data() {
        //这里存放数据
        return {
            id: "",
            list: []
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        add() {
            console.log(this.id)
            this.$router.push(`/appendaddress/${this.id}`)
        },
        getAddress(id) {
            this.$http({
                url: this.$http.adornUrl("/shopvip/address/getAddress"),
                method: "get",
                params: this.$http.adornParams({
                    uid: id
                })
            }).then(({
                data
            }) => {
                if (data.code == 0) {
                    data.page.map(item => {
                        // console.log(item)
                        this.list.push({
                            title: item.username + "&nbsp&nbsp&nbsp&nbsp" + item.iphone,
                            desc: item.uaddress
                        })
                    })
                }

            })
        },
        goback() {
            this.$router.push("/home/my")
        }

    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.id = this.$route.params.id
        this.getAddress(this.$route.params.id)
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
