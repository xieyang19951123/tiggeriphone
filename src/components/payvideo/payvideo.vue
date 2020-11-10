<!--  -->
<template>
<div class=''>
    <x-header style=" width:100%;position:absolute;left:0;top:0;z-index:100;"></x-header>
    <view-box ref="viewbox" body-padding-top="37px">
        <div>
            <div class="prism-player" id="J_prismPlayer"></div>
        </div>
        <br>
        <div class="synopsis">
            <span>{{tryvideo.introduce}}</span>
            <div><span v-if="tryvideo.organEntity!=null">机构：{{tryvideo.organEntity.username}}</span><span @click="buyclick()" v-if="isbuyflag==null">点击购买</span><span v-if="isbuyflag!=null">已购买</span></div>
            <div><span>{{tryvideo.price}}</span><span>￥</span></div>
        </div>
        <panel :header="header" :list="list" :type="type" @on-click-item="clickRelevant"></panel>
    </view-box>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
    ViewBox,
    XHeader,
    Divider,
    Card,
    Panel
} from 'vux'
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
        ViewBox,
        XHeader,
        Divider,
        Card,
        Panel
    },
    data() {
        //这里存放数据
        return {
            player: null,
            tryvideo: {},
            tryVideoList: [],
            header: "相关推荐",
            list: [],
            type: "1",
            user: {},
            isbuyflag: null,
            organ: {}
        };
    },
    //监听属性 类似于data概念
    computed: {

    },
    //监控data中的数据变化
    watch: {

    },
    //方法集合
    methods: {
        clickRelevant(item) {
            this.player.dispose()
            this.getVideo(item.id)
        },
        getRelevant(val) {

            this.$http({
                url: this.$http.adornUrl("/shop/payVideo/getPayVideo"),
                methods: "get",
                params: this.$http.adornParams({
                    cid: this.tryvideo.cid
                })
            }).then(({
                data
            }) => {
                let list = []
                if (data.code == 0) {
                    this.tryVideoList = data.page
                    data.page.map(item => {
                        list.push({
                            "src": item.coverSrc,
                            "desc": item.introduce,
                            "id": item.id
                        })
                    })
                    this.list = list

                }
            })

        },
        createPlayer(data) {
            var player = new Aliplayer({
                id: 'J_prismPlayer',
                width: '100%',
                autoplay: false,
                vid: this.tryvideo.videoId,
                playauth: this.tryvideo.auth,
                // cover: 'http://liveroom-img.oss-cn-qingdao.aliyuncs.com/logo.png',
                encryptType: 1
            }, function (player) {

                player.pause()
            })
            this.player = player
            this.player.on('play', this.handleReady);
            if (this.organ == null) {
                if (this.user.shopVip == 0) {
                    //console.log("你不是会员")
                    this.player.pause()
                    const _this = this
                    this.$vux.confirm.show({
                        // 组件除show外的属性

                        content: '你不是会员是否成为会员?',
                        onCancel() {

                            //console.log("sadsad") // 当前 vm
                        },
                        onConfirm() {
                            // console.log(1)
                            _this.becamevip()

                        }
                    })

                }
            }

        },
        getVideo(id) {
            this.$http({
                url: this.$http.adornUrl("/shop/payVideo/getpayVideo"),
                methods: "get",
                params: this.$http.adornParams({
                    id: id
                })

            }).then(({
                data
            }) => {

                if (data.code == 0) {
                    this.tryvideo = data.page
                    this.isbuy()
                    this.getRelevant()
                    this.createPlayer()

                }
            })
        },
        handleReady() {
            if (this.organ == null) {
                if (this.user.shopVip == 0) {
                    this.$vux.toast.text('你不是会员', 'bottom')
                    this.player.pause()
                }
                if (this.isbuyflag == null) {
                    this.$vux.toast.text('该视频是付费视频', 'bottom')
                    this.player.pause()
                }
            }

        },
        buyclick() {
            this.$router.push(`/payvideoorder/${this.tryvideo.id}`)

        },
        becamevip() {
            this.$http({
                url: this.$http.adornUrl("/shopvip/shopuser/becamevip"),
                method: "post",
                data: this.$http.adornData({
                    usr: this.user
                })
            }).then(({
                data
            }) => {
                this.onBridgeReady(data.page)
            })
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
                    }
                });
        },
        //isbuy
        isbuy() {
            this.$http({
                url: this.$http.adornUrl("/shop/uservideo/getUserVideoByid"),
                method: "get",
                params: this.$http.adornParams({
                    uid: this.user.id,
                    cid: this.tryvideo.id
                })
            }).then(({
                data
            }) => {
                console.log(data)
                if (data.code == 0) {
                    this.isbuyflag = data.page
                    if (this.isbuyflag == null) {
                        this.player.pause()
                        const _this = this
                        this.$vux.confirm.show({
                            // 组件除show外的属性

                            content: '该视频是付费视频你未支付',
                            onCancel() {

                                //console.log("sadsad") // 当前 vm
                            },
                            onConfirm() {
                                // console.log(1)
                                // _this.becamevip()
                                _this.buyclick()

                            }
                        })
                    }
                }
            })

        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        let id = this.$route.params.id
        let user = this.$cookies.get("user")
        this.user = user
        this.organ = this.$cookies.get("organ")
        if (this.player != null) {

            this.player.dispose()
            this.player = null
        }
        //console.log(user)

        this.getVideo(id)
    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {

    }, //生命周期 - 销毁之前
    destroyed() {

    }, //生命周期 - 销毁完成
    activated() {

    }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style lang="less" scoped>
.synopsis {
    width: 90%;
    // padding: 10px;
    margin: 0 auto;
    // margin: 5px;
    // border: 1px rgb(163, 145, 145) solid;
    // box-shadow: 5px 5px 5px #9b9898;
    display: -webkit-flex;
    display: flex;
    // border-radius: 5px;
    display: flex;
    flex-direction: column;

    >div:nth-child(2) {
        font-size: 12px;

        >span:first-child {
            font-size: 12px;
        }

        >span:last-child {
            float: right;
            background: rgb(255, 123, 0);
            // border-radius: 10px;
            padding: 2px 5px;
            font-size: 12px;
            color: #fff;
        }
    }

    >div:nth-child(3) {
        color: red;

        >span:first-child {
            float: right;

        }

        >span:nth-child(2) {
            float: right;
            font-size: 14px;
        }
    }
}

.weui-tab>div {
    overflow-x: hidden !important;
}
</style><style lang="less">
.weui-tab__panel {
    overflow-x: hidden !important;
}
</style>
