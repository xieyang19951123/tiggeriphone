<!--  -->
<template>
<div class=''>

    <view-box ref="viewBox">
        <group>
            <cell title="我的账户"><b v-if="user.shopVip ==1" class="isvip">vip</b><b v-if="user.shopVip !=1" class="novip">vip</b><span slot="value">{{user.psUsername}}</span>
                <svg slot="icon" class="icon" aria-hidden="true" v-if="user.shopVip ==1">
                    <use xlink:href="#icon-VIP"></use>
                </svg>
            </cell>
            <cell title="余额">{{user.balance}}</cell>
            <cell title="推荐码">{{user.recommend}}</cell>
            <cell title="积分">{{user.point}}</cell>
            <cell title="积分规则" is-link @click.native="getpointrule()"></cell>
            <cell title="积分记录" is-link @click.native="$router.push(`/userpoint`)"></cell>
            <cell title="收货地址" is-link @click.native="onClick"></cell>
            <cell title="我的档案" is-link @click.native="$router.push(`/myrecordlist`)"></cell>
            <cell title="家长信息" is-link @click.native="$router.push(`/parentmessgaelist`)"></cell>

        </group>
        <group>
            <cell title="签到" is-link @click.native="sgin" v-if="user.shopVip ==1"></cell>
            <cell title="我的机构" is-link @click.native="$router.push('/myorgan')" v-if="user.userType==0"></cell>
            <cell title="我的学生" is-link @click.native="$router.push('/mystudent')" v-if="user.userType!=0"></cell>
            <cell title="学习计划" is-link @click.native="$router.push('/stayplanlist')" v-if="user.userType==0"></cell>
        </group>
        <group>
            <cell title="我的购物车" is-link @click.native="myshoppingtrolley"></cell>
            <cell title="我的订单" is-link @click.native="$router.push('/myorder')"></cell>
            <cell title="我的课程" is-link @click.native="$router.push('/myclass')"></cell>

            <cell title="修改密码" is-link @click.native="showScrollBox=true"></cell>
            <cell title="退出" is-link @click.native="logout"></cell>

            <x-button type="primary" @click.native="topupfalg=true">充值</x-button>

        </group>

    </view-box>
    <div v-transfer-dom>
        <x-dialog v-model="showScrollBox" class="dialog-demo" :hide-on-blur="true">

            <x-input title="密码：" type="password" v-model="password" :iconType="iconType2" novalidate @on-blur="password==''?iconType2='error':iconType2='success'"></x-input>
            <x-input title="新密码：" type="password" v-model="newpassword" novalidate :iconType="iconType3" @on-blur="newpassword==''?iconType3='error':iconType3='success'"></x-input>
            <x-input title="确定密码：" type="password" v-model="checkpassword" novalidate @on-change="changePassword" :iconType="iconType"></x-input>
            <x-button @click.native="forget"> 确定</x-button>
        </x-dialog>
    </div>
    <div v-transfer-dom>
        <x-dialog v-model="pointrulefalg" class="dialog-demo" :hide-on-blur="true">
            <table>
                <tr style="width:50%">
                    <td>规则</td>
                    <td>获得的积分</td>
                </tr>
                <tr v-for="p in pointrule" :key="p.id">
                    <td>{{p.ruleName}}</td>
                    <td>{{p.point}}</td>
                </tr>
            </table>
        </x-dialog>
    </div>
    <div v-transfer-dom>
        <confirm v-model="topupfalg" show-input title="金额" :input-attrs="{type: 'number'}" @on-confirm="topup">
        </confirm>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
    Cell,
    CellBox,
    CellFormPreview,
    TransferDomDirective as TransferDom,
    Group,
    XHeader,
    ViewBox,
    Badge
} from 'vux'
export default {
    directives: {
        TransferDom
    },
    //import引入的组件需要注入到对象中才能使用
    components: {
        Cell,
        ViewBox,
        CellBox,
        XHeader,
        CellFormPreview,
        Group,
        Badge
    },
    data() {
        //这里存放数据
        return {
            topupfalg: false,
            user: {},
            organ: {},
            showScrollBox: false,
            iconType: "",
            iphone: "",
            password: "",
            newpassword: "",
            checkpassword: "",
            topupmoney: 0,
            iconType2: "",
            iconType3: "",
            pointrule: [],
            pointrulefalg: false
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        //获取积分规则
        getpointrule() {
            this.$http({
                url: this.$http.adornUrl('/shopvip/shopuser/getpointrule'),
                method: 'get',
                //params: this.http.adornParams({})
                //data: this.$http.adornData(data, false)
            }).then(({
                data
            }) => {
                console.log(data)
                this.pointrule = data.page
                this.pointrulefalg = true
            });
        },

        topup(val) {
            this.topupfalg = false
            this.$vux.loading.show()
            this.$http({
                url: this.$http.adornUrl('/shopvip/shopuser/topUp'),
                method: 'post',
                //params: this.http.adornParams({})
                data: this.$http.adornData({
                    "uid": this.user.id,
                    "cid": 0,
                    "omoney": val,
                    "numbers": 1,
                    "payStatus": 1,
                    "showStatus": 1,
                    "payType": 5,
                    "point": 0,
                    "prealMoney": val,
                    "pbalance": 0
                })
            }).then(({
                data
            }) => {
                this.$vux.loading.hide()
                if (data.code == 0) {
                    this.onBridgeReady(data.page)
                }
            });
        },
        onBridgeReady(data) {
            this.$vux.loading.show({
                text: 'Loading'
            })
            let _this = this
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId": data.appId, //公众号名称，由商户传入     
                    "timeStamp": data.timeStamp, //时间戳，自1970年以来的秒数     
                    "nonceStr": data.nonceStr, //随机串     
                    "package": data.package,
                    "signType": "MD5", //微信签名方式：     
                    "paySign": data.paySign //微信签名 
                },
                function (res) {
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        // 使用以上方式判断前端返回,微信团队郑重提示：
                        //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                        // 显示文字
                        _this.$vux.loading.hide()
                        _this.$router.push("/home/my")
                        this.$store.commit('UPDATE_PAGE_FOOTER', 3)
                    }
                });

        },
        getUse() {
            let user = this.$cookies.get("user")
            // console.log(user)
            this.$http({
                url: this.$http.adornUrl("/shopvip/shopuser/selectuserbyid"),
                method: "get",
                params: this.$http.adornParams({
                    id: user.id
                })
            }).then(({
                data
            }) => {
                console.log(data)
                if (data.code == 0) {
                    this.user = data.page
                    this.$cookies.set("user", data.page)
                }
            })
            this.user = user
        },
        onClick() {
            this.$router.push(`/address/${this.user.id}`)
        },
        myshoppingtrolley() {
            this.$router.push(`/home/myshoppingtrolley/${this.user.id}`)
        },
        sgin() {
            this.$http({
                url: this.$http.adornUrl(`/shopvip/sign/sgin/${this.user.id}`),
                method: "post",
            }, false).then(({
                data
            }) => {
                console.log(data)
                if (data.code == 0) {
                    const _this = this // 需要注意 onCancel 和 onConfirm 的 this 指向
                    this.$vux.confirm.show({
                        // 组件除show外的属性
                        content: data.msg,
                        onCancel() {

                        },
                        onConfirm() {
                            _this.getUse()
                        }
                    })
                }
            })

        },
        logout() {
            this.$cookies.remove("user")
            this.$cookies.remove("organ")
            this.$router.push("/login")
            this.$store.commit('UPDATE_PAGE_FOOTER', 0)
        },
        //
        changePassword(val) {
            if (val != this.newpassword) {
                this.iconType = 'error'
            } else {
                this.iconType = 'success'
            }
        },
        forget() {
            if (this.iconType == 'error' || this.iconType == '') {
                return;
            }
            this.showScrollBox = false
            this.$vux.loading.show({
                text: 'Loading'
            })
            this.$http({
                url: this.$http.adornUrl("/shopvip/shopuser/updatepassword"),
                method: "post",
                data: this.$http.adornData({
                    id: this.user.id,
                    password: this.password,
                    newpassword: this.newpassword

                })
            }).then(({
                data
            }) => {
                this.$vux.loading.hide()
                if (data.code == 0) {
                    this.getUse()
                    this.$vux.toast.text('更新成功', 'bottom')
                    this.password = ""
                    this.newpassword = ""
                    this.checkpassword = ""
                } else {
                    this.$vux.toast.text(data.msg, 'bottom')
                    this.showScrollBox = true
                }
            })
        }

    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

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
        this.$store.commit('UPDATE_FOOTER', true)
        this.getUse()
        this.organ = this.$cookies.get("organ")
        //console.log(this.$store.state.mutations.pageFooter)
        //this.$emit("changge", 1)
    }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
px

<style>
.icon {
    width: 30px;
    height: 30px;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}

.isvip {
    color: #ff4629;
    font-style: italic;
    font-size: 12px;
    font-weight: 700;
}

.novip {
    color: #ccc;
    font-style: italic;
    font-size: 12px;
    font-weight: 700;
}
</style>
