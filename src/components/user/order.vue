<!--  -->
<template>
<div class=''>
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: ''}"></x-header>
    <view-box ref="viewbox" style="margin-top:45px">
        <div class="address" @click="openDiag">
            <span>{{defautaddress.username}}</span>
            <span>{{defautaddress.iphone}}</span><br>
            <span>{{defautaddress.uaddress}}</span>
        </div>
        <div>
            <group>
                <x-switch :value-map="[false, true]" :title="title" @on-change="switchclick" v-if="user.shopVip == 1"></x-switch>

            </group>
        </div>
        <div class="product" v-for=" p in products" :key="p.id">
            <flexbox>
                <flexbox-item :span="1/3">
                    <x-img :src="p.coverSrc"></x-img>
                </flexbox-item>
                <flexbox-item :span="2/3">
                    <div class="productname">
                        <span>{{p.comName}}</span>
                        <div>
                            <span>￥</span>
                            <span>{{p.price}}</span>
                        </div>
                        <div>
                            <span>{{p.postage == 0?"包邮":"邮费："+p.postage+"元"}}</span>
                            <span>x{{p.total}}</span>
                        </div>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
    </view-box>
    <div class="footer">
        <flexbox :gutter="0">
            <flexbox-item>
                <div class="flox"><span>合计：￥{{totalprice}}</span></div>
            </flexbox-item>
            <flexbox-item>
                <div class="flox2" @click="placeorder"> <span>立即下单</span></div>
            </flexbox-item>
        </flexbox>
    </div>
    <div v-transfer-dom>
        <x-dialog v-model="dialog" hide-on-blur>
            <flexbox orient="vertical">
                <flexbox-item v-for="a in address" :key="a.id">
                    <div class="flex-demo" @click="flexdemoClick(a)">
                        <span>{{a.username}}</span>
                        <span>{{a.iphone}}</span><br>
                        <span>{{a.uaddress}}</span>
                    </div>
                </flexbox-item>
            </flexbox>
        </x-dialog>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
    TransferDomDirective as TransferDom
} from 'vux'
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            user: null,
            products: [],
            address: [],
            defautaddress: {},
            dialog: false,
            totalprice: 0,
            title: "使用积分",
            flag: false,
            point: 0,
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
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
                    this.address = data.page
                    this.defautaddress = data.page[0]
                    if (data.page.length == 0) {
                        this.$vux.alert.show({
                            title: '提示',
                            content: '你的地址为空请选择你的地址！',
                        })
                    }
                }

            })
        },
        openDiag() {
            this.dialog = true
        },
        flexdemoClick(a) {
            this.defautaddress = a
            this.dialog = false
        },
        sumTotalprice() {
            this.totalprice = 0
            let totalprice = 0
            this.products.map(item => {
                totalprice += item.price * item.total + item.postage
            })
            this.totalprice = totalprice.toFixed(2)
        },
        //下单
        placeorder() {
            this.$vux.loading.show({
                text: 'Loading'
            })
            if (this.defautaddress == null) {
                this.$vux.toast.text('请选择地址', 'bottom')
                return
            }
            this.$http({
                url: this.$http.adornUrl("/shopvip/order/productOrder"),
                method: "post",
                data: this.$http.adornData({
                    address: this.defautaddress,
                    products: this.products,
                    point: this.point,
                    total: this.totalprice,
                    openid: this.user.openId
                })
            }).then(({
                data
            }) => {
                console.log(data)
                if (data.code == 0) {
                    this.onBridgeReady(data.page);
                }
            })
        },
        onBridgeReady(data) {
            // this.$vux.loading.hide()

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
                        this.$store.commit('UPDATE_PAGE_FOOTER', val)
                    }
                });
        },
        //
        switchclick(val) {
            let point = 0
            if (val) {
                this.products.map(item => {
                    point += item.point
                })
                if (point > this.totalprice) {
                    this.point = this.products.toFixed(0)
                } else if (point > this.user.point) {
                    this.point = this.user.point
                } else {
                    this.point = point.toFixed(2)
                }
                this.title = "能使用的积分:" + this.point
                this.totalprice = (this.totalprice - this.point).toFixed(2)
            } else {
                this.title = "使用积分"
                this.sumTotalprice()
                this.point = 0
            }

        }

    },
    directives: {
        TransferDom
    },
    //计算总价

    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.products = this.$route.params.t
        //console.log(this.products)
        this.sumTotalprice()
        //console.log(this.products)
        this.$store.commit('UPDATE_FOOTER', false)
        this.user = this.$cookies.get("user")
        console.log(this.user)
        this.getAddress(this.user.id)
        this.products = this.$route.params.t
        console.log(this.products)
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

    }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style lang="less" scoped>
@import url("./order.less");
</style> >
