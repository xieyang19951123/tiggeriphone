<!--  -->
<template>
<div class=''>

    <view-box ref="viewbox">
        <x-header>
            <span slot="right" @click="$router.push('/')">首页</span>
        </x-header>
        <div class="content">
            <div>
                <x-img :src="course.asrc"></x-img>
            </div>
            <div>
                <span>{{course.courseName}}</span>
                <div>
                    <span>￥</span>
                    <span>{{course.coursePrice}}</span>
                </div>
            </div>

        </div>
        <group>
            <x-switch v-model="pointfalg" :title="title" @on-change="switchclick" v-if="user.shopVip ==1 " :disabled="falg"></x-switch>
            <x-switch v-model="balancefalg" :title="title2" @on-change="switchBalance" v-if="user.shopVip ==1 " :disabled="falg1"></x-switch>
        </group>
        <div class="footer">
            <flexbox :gutter="0">
                <flexbox-item>
                    <div class="flox"><span>合计：￥{{totalprice}}</span></div>
                </flexbox-item>
                <flexbox-item>
                    <div class="flox2" @click="byorder"> <span>立即下单</span></div>
                </flexbox-item>
            </flexbox>
        </div>

        </actionsheet>
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
            user: {},
            title: "使用积分",
            title2: "使用余额",
            course: {
                id: 0,
                coursePoint: "",
                coursePrice: "",
                courseName: "",
                coverSrc: "",
                introduce: "",
                asrc: "",
                tryvideo: ""
            },
            totalprice: 0,
            show7: false,
            usebalance: 0,
            usepoint: 0,
            falg: false,
            balancefalg: false,
            pointfalg: false,
            falg1: false

        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {
        totalprice(val) {
            if (val == 0 && !this.pointfalg) {
                this.falg = true
                return
            }
            if (val == 0 && !this.balancefalg) {
                this.falg1 = true
                return
            }
            this.falg = false
            this.falg1 = false
        }
    },
    //方法集合
    methods: {
        switchBalance(val) {
            if (val) {
                if (this.user.balance == null || this.user.balance == undefined || this.user.balance == 0) {
                    this.$vux.toast.text('你的余额为0', 'bottom')
                    //t//his.falg = false
                    return false
                }
                this.$vux.loading.show()
                this.$http({
                    url: this.$http.adornUrl('/shopvip/shopuser/computersBalance'),
                    method: 'post',
                    //params: this.http.adornParams({})
                    data: this.$http.adornData({
                        //userpoint: this.user.point,
                        //point: this.course.coursePoint,
                        price: this.totalprice,
                        balance: this.user.balance
                    }, false)
                }).then(({
                    data
                }) => {
                    this.$vux.loading.hide()
                    if (data.code === 0) {
                        this.totalprice = data.totalprice
                        this.title2 = '可使用余额:' + data.balance
                        this.usebalance = data.balance
                    }

                });
            } else {
                this.totalprice = this.usebalance + this.totalprice
                this.title2 = '使用余额'
            }
        },
        byorder() {
            this.$vux.loading.show()
            console.log(this.totalprice)
            this.$http({
                url: this.$http.adornUrl('/shopvip/course/byCourseOrder'),
                method: 'post',
                //params: this.http.adornParams({ })
                data: this.$http.adornData({
                    "uid": this.user.id,
                    "cid": this.course.id,
                    "oMoney": this.course.coursePrice.toFixed(2),
                    "numbers": 1,
                    "payStatus": 1,
                    "showStatus": 1,
                    "payType": 4,
                    "point": this.usepoint,
                    "prealMoney": this.totalprice.toFixed(2),
                    "pbalance": this.usebalance.toFixed(2)
                })
            }).then(({
                data
            }) => {
                this.$vux.loading.hide()
                console.log(data)
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
        switchclick(val) {
            //console.log(this.user)
            if (val) {
                if (this.totalprice == 0) {
                    this.$vux.toast.text('总价为0不能使用积分', 'bottom')
                    return false
                }
                if (this.user.point == null || this.user.point == undefined || this.user.point == 0) {
                    this.$vux.toast.text('你的积分为0', 'bottom')
                    return false
                }
                this.$vux.loading.show()
                this.$http({
                    url: this.$http.adornUrl('/shopvip/shopuser/computersPoint'),
                    method: 'post',
                    //params: this.http.adornParams({})
                    data: this.$http.adornData({
                        userpoint: this.user.point,
                        point: this.course.coursePoint,
                        price: this.totalprice,
                        //balance: this.user.balance
                    }, false)
                }).then(({
                    data
                }) => {
                    this.$vux.loading.hide()
                    if (data.code === 0) {
                        this.totalprice = data.totalprice
                        this.title = '可使用的积分:' + data.point
                        this.usepoint = data.point
                    }

                });
            } else {
                this.totalprice = this.totalprice + this.usepoint
                this.title = '使用积分'
            }

        },
        getCourseById(id) {
            this.$vux.loading.show()
            this.$http({
                url: this.$http.adornUrl(`/shopvip/course/getCourseById/${id}`),
                method: 'get',
                //params: this.$http.adornParams({})
            }).then(({
                data
            }) => {
                //console.log(data)
                this.$vux.loading.hide()
                if (data.code == 0) {
                    this.course.coursePoint = data.page[0].coursePoint
                    this.course.coursePrice = data.page[0].coursePrice
                    this.course.courseName = data.page[0].courseName
                    this.course.coverSrc = data.page[0].coverSrc
                    this.course.asrc = data.page[0].asrc
                    this.course.introduce = data.page[0].introduce
                    this.course.tryvideo = data.page[0].tryvideo
                    this.related = data.related
                    this.totalprice = data.page[0].coursePrice
                    this.course.id = data.page[0].id
                    //this.totalprice = data.page[0].coursePrice
                }
            })
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.course.id = this.$route.params.id
        this.getCourseById(this.course.id)
        this.user = this.$cookies.get("user")

        // c//onsole.log(this.user)
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
