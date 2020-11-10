<!--  -->
<template>
<div class=''>
    <x-header style=" width:100%;position:absolute;left:0;top:0;z-index:100;"></x-header>
    <view-box ref="viewbox" body-padding-top="50px">
        <div class="content">
            <div>
                <x-img :src="payvideo.asrc"></x-img>
            </div>
            <div>
                <span>{{payvideo.introduce}}</span>
                <div>
                    <span>￥</span>
                    <span>{{payvideo.price}}</span>
                </div>
            </div>
        </div>
        <group>
            <x-switch :value-map="[false, true]" :title="title" @on-change="switchclick"></x-switch>
        </group>
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
            id: null,
            payvideo: {},
            totalprice: 0,
            title: "使用积分",
            user: {},
            point: 0
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        getpayvideobyid() {
            this.$http({
                url: this.$http.adornUrl("/shop/payVideo/getpayvideobyid"),
                method: "get",
                params: this.$http.adornParams({
                    id: this.id
                })
            }).then(({
                data
            }) => {
                // console.log(data)
                if (data.code == 0) {
                    this.payvideo = data.page
                    this.totalprice = this.payvideo.price
                }

            })
        },
        placeorder() {
            this.$http({
                url: this.$http.adornUrl("/shop/payVideo/payvideoorder"),
                method: "post",
                data: this.$http.adornData({
                    point: this.point,
                    totalprice: this.totalprice,
                    user: this.user,
                    payvideo: this.payvideo

                })
            }).then(({
                data
            }) => {
                console.log(data)
                if (data.code == 0) {
                    this.onBridgeReady(data.page)
                }
            })
        },
        switchclick(val) {
            //console.log(val)
            if (val) {
                console.log(this.payvideo.point)
                if (this.payvideo.point > this.user.point) {
                    this.point = this.user.point
                    this.title = "可以使用的积分为" + this.point

                } else {
                    this.point = this.payvideo.point
                    this.title = "可以使用的积分为" + this.point
                }
                this.totalprice = this.totalprice - this.point
            } else {
                this.point = 0;
                this.title = "使用积分"
                this.totalprice = this.payvideo.price
            }

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
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.id = this.$route.params.id
        //console.log(this.id)
        this.getpayvideobyid()
        this.user = this.$cookies.get("user")
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
.content {
    display: flex;
    margin: 10px;
    width: 90%;
    // border: 1px rgb(189, 148, 148) solid;
    border-radius: 5px;
    box-shadow: 0 0 10px #dedede;

    >div:first-child {
        margin: 10px;
    }

    >div {
        >span:first-child {
            margin-left: 2px;
            font-size: 15px;
        }

        >div:nth-child(2) {
            font-size: 10px;
            color: red;
        }
    }
}

.footer {
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: auto;
    text-align: center;
    overflow: hidden;

    // border-radius: 10px;
    color: rgb(105, 90, 90);
    font-size: 12px;

}

.flox {
    height: 50px;
    text-align: center;
    line-height: 50px;
    background: rgb(253, 253, 253);
}

.flox2 {
    height: 50px;
    text-align: center;
    line-height: 50px;
    background: rgb(223, 115, 53);
    color: #fff;
}
</style>
