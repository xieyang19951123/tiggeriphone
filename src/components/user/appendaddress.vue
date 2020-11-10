<!--  -->
<template>
<div class=''>
    <x-header>添加收货地址<a slot="right" @click="save">保存</a></x-header>
    <view-box ref="viewbox">
        <group>
            <x-input placeholder="收货人" v-model="myaddress.username" :required="true"></x-input>
            <x-input placeholder="手机电话" v-model="myaddress.iphone" :required="true"></x-input>
            <x-address title="地区" :list="addressData" v-model="myaddress.address"></x-address>
            <x-textarea :max="50" placeholder="详细地址" v-model="myaddress.uaddress"></x-textarea>
        </group>

    </view-box>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
    ViewBox,
    XHeader,
    XTextarea,
    Group,
    XInput,
    XAddress,
    ChinaAddressV4Data,
    Value2nameFilter as value2name

} from 'vux'

export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
        ViewBox,
        XTextarea,
        XHeader,
        XInput,
        Group,
        XAddress,
    },
    data() {
        //这里存放数据
        return {
            addressData: ChinaAddressV4Data,
            myaddress: {
                username: "",
                iphone: "",
                address: [],
                uaddress: "",
                uid: ""
            }

        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        save() {
            if (this.myaddress.username == "") {
                this.remindwindows("请输入收货人")
                return
            } else if (this.myaddress.iphone == "") {
                this.remindwindows("请输入电话")
                return
            } else if (this.myaddress.uaddress == "") {
                this.remindwindows("请输入地址")
                return
            } else if (this.myaddress.address == "") {
                this.remindwindows("请选择地址")
                return
            }
            this.myaddress.uaddress = value2name(this.myaddress.address, ChinaAddressV4Data) + this.myaddress.uaddress;
            this.$vux.loading.show({
                text: 'Loading'
            })
            this.$http({
                url: this.$http.adornUrl("/shopvip/address/save"),
                method: "post",
                data: this.$http.adornData(this.myaddress)
            }).then(({
                data
            }) => {
                this.$vux.loading.hide()
                if (data.code == 0) {
                    this.$router.push(`/address/${this.myaddress.uid}`)
                }
                //console.log(data)
            })

        },
        //提示窗口
        remindwindows(val) {
            this.$vux.toast.show({
                text: val,
                position: "bottom",
                type: "text",
            })
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.myaddress.uid = this.$route.params.id
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
