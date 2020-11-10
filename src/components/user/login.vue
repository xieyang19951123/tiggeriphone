<!--  -->
<template>
<div class=''>

    <view-box ref="viewBox">
        <img src="../../assets/tigger.jpg" style="height:calc(35vh)"></img>
        <group>
            <x-input title="登录名：" v-model="user.psUsername" placeholder="请输入登录名" is-type="china-mobile" novalidate placeholder-align="left"></x-input>
        </group>
        <group>
            <x-input title="密码：" v-model="user.psPassword" placeholder="请输入密码" type="password" novalidate placeholder-align="left"></x-input>
        </group>
        <div style="padding:15px;">
            <x-button @click.native="login" type="primary"> 登录</x-button>
        </div>
        <div class="forget" @click="showScrollBox=true">忘记密码</div>
    </view-box>
    <div v-transfer-dom>
        <x-dialog v-model="showScrollBox" class="dialog-demo">
            <div>请输入自身推荐码</div>
            <x-input title="手机号：" v-model="iphone"></x-input>
            <x-input title="推荐码：" v-model="forgetcode"></x-input>
            <x-button @click.native="forget"> 确定</x-button>
        </x-dialog>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
    XInput,
    XImg,
    Group,
    XButton,
    Cell,
    ViewBox,
    TransferDomDirective as TransferDom,
    XHeader,
} from 'vux'
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
        XInput,
        XImg,
        Group,
        XButton,

        Cell,
        XHeader,
        ViewBox
    },
    directives: {
        TransferDom
    },
    data() {
        //这里存放数据
        return {
            user: {
                psUsername: "",
                psPassword: "",
                recommend: "",
                openId: ""
            },
            showScrollBox: false,
            forgetcode: "",
            iphone: ""
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        login() {
            if (this.user.psUsername == "" || this.user.psPassword == "") {
                this.$vux.toast.text('请输入用户名或密码', 'bottom')
                return
            }
            this.$vux.loading.show({
                text: 'Loading'
            })
            console.log(this.user)
            this.$http({
                url: this.$http.adornUrl("/shopvip/shopuser/userLogin"),
                method: "post",
                data: this.$http.adornData(this.user)
            }).then(({
                data
            }) => {
                this.$vux.loading.hide({})
                //console.log(data)
                if (data.code == 0) {
                    this.$cookies.set("user", data.page)
                    this.$store.commit('UPDATE_PAGE_FOOTER', 3)
                    //console.log(this.$cookies.get("user"))
                    this.$router.push("/home/my")

                } else if (data.code == 201) {
                    this.$cookies.set("organ", data.page)
                    this.$router.push("/home/my")
                } else {
                    this.$vux.toast.text(data.msg, 'bottom')
                }
            })

        },
        forget() {
            this.showScrollBox = false;
            if (this.forgetcode == "") {
                this.$vux.toast.text('请输入推荐码', 'bottom')
                return;
            } else if (this.iphone == "") {
                this.$vux.toast.text('请输入手机号', 'bottom')
                return;
            }
            this.$http({
                url: this.$http.adornUrl("/shopvip/shopuser/forgetPassword"),
                method: "post",
                data: this.$http.adornData({
                    'iphone': this.iphone,
                    'recommend': this.forgetcode
                })
            }).then(({
                data
            }) => {
                console.log(data)
                if (data.code == 0) {
                    this.$vux.alert.show({
                        title: '提示',
                        content: '用户已锁住，请联系管理员解锁',
                        onShow() {
                            console.log('Plugin: I\'m showing')
                        },
                        onHide() {
                            console.log('Plugin: I\'m hiding')
                        }
                    })
                } else {
                    this.$vux.toast.text(data.msg, 'bottom')
                }
            })
        },
        //进行路径分析
        locationll() {
            let strHref = window.location.href;
            //console.log(strHref)
            var intPos = strHref.indexOf("?");
            var strRight = strHref.substr(intPos + 1); //==========获取到右边的参数部分
            var arrTmp = strRight.split("&");
            for (var i = 0; i < arrTmp.length; i++) //===========循环数组
            {
                var dIntPos = arrTmp[i].indexOf("=");
                var paraName = arrTmp[i].substr(0, dIntPos);
                //console.log(paraName)
                var paraData = arrTmp[i].substr(dIntPos + 1);
                if (paraName == 'code') {
                    return paraData
                }
            }
            return '';
        },
        getopenid() {
            let code = this.locationll()

            if (code == '') {
                return;
            }
            alert(code)
            this.$http({
                url: this.$http.adornUrl("/shopvip/shopuser/getOpenid"),
                method: "get",
                params: this.$http.adornParams({
                    code: code
                })
            }).then(({
                data
            }) => {
                // console.log(data)
                if (data.code == 0) {
                    if (data.page != '') {
                        this.$cookies.set("openid", data.page)
                        this.user.openId = data.page
                    }
                }
            })
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.getopenid()
        if (this.$cookies.get("openid") != null) {
            this.user.openId = this.$cookies.get("openid")
        }
        console.log(this.user)
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

<style lang="less" scoped>
.forget {
    float: right;
    text-align: end;
    margin-right: 10px;
    color: rgb(250, 129, 129);
    font-size: 12px;
    text-decoration: underline
}
</style>
