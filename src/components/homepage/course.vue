<!--  -->
<template>
<div class=''>
    <view-box ref="viewbox">
        <x-header>
            <span slot="right" @click="$router.push('/')">首页</span>
        </x-header>
        <x-img :src="course.coverSrc" style="width:100%"></x-img>
        <div class="content">
            <div><span>{{course.courseName}}</span></div>
            <div><span>{{course.introduce}}</span>
                <div class="tryLook" @click="$router.push(`/tryvideo/${course.tryvideo}`)">试看</div>
            </div>
            <div><span>￥</span><span>{{course.coursePrice}}</span><br>
            </div>
            <div><span>积分可抵{{course.coursePoint}}元</span></div><br>
        </div>
        <group-title>相关推荐</group-title>
        <grid :cols="2">
            <grid-item v-for="p in related " :key="p.id" @on-item-click="getCourseById(p.id)">
                <div class="tryVideo">
                    <x-img :src="p.coverSrc"></x-img><br>
                    <div><span>{{p.courseName}}</span></div>
                    <div class="money">
                        <span>￥</span>
                        <span>{{p.coursePrice}}</span>
                    </div>
                </div>
            </grid-item>
        </grid>
        <div class="prism-player" id="J_prismPlayer" v-if="playerflag"></div>
    </view-box>
    <div class="footer">
        <flexbox :gutter="0">
            <flexbox-item :span="1/6">
                <div class="flox" @click="letten"><span>客服</span></div>
            </flexbox-item>
            <flexbox-item :span="3/6">
                <div class="flox" @click="alertaction"><span v-if="recomend==''">分享得{{course.sharePoint}}积分</span><span v-if="recomend!=''">分享</span></div>
            </flexbox-item>
            <flexbox-item :span="2/6">
                <div class="flox2" @click="$router.push(`/courseorder/${course.id}`),bycourse"> <span>马上购买</span></div>
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
            course: {
                id: 0,
                coursePoint: "",
                coursePrice: "",
                courseName: "",
                coverSrc: "",
                introduce: "",
                asrc: "",
                tryvideo: "",
                sharePoint: null
            },
            player: null,
            playerflag: false,
            related: [],
            user: {},
            recomend: "",
            point: ""
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        letten() {
            this.$http({
                url: this.$http.adornUrl('/shop/let/select'),
                method: 'get',
                params: this.$http.adornParams({})
            }).then(({
                data
            }) => {
                console.log(data)
                this.val = data.page.val

                this.$vux.alert.show({
                    title: '提示',
                    content: '客服电话：' + data.page.val,
                    onShow() {
                        console.log('Plugin: I\'m showing')
                    },
                    onHide() {
                        console.log('Plugin: I\'m hiding')
                    }
                })
            })
        },
        alertaction() {
            this.$vux.alert.show("点击右上角分享")
            console.log(this.user)
            if (this.user == null || this.user == undefined) {
                this.$router.push("/login")
            } else {

                this.wxshare()
            }
        },
        wxshare() {
            let title = this.course.courseName
            let desc = this.course.introduce
            let link = location.href + "?uid=" + this.user.id
            let imgUrl = this.course.asrc
            this.$http({
                url: this.$http.adornUrl('/wx/getShareSignature2'),
                method: 'get',
                async: false,
                params: this.$http.adornParams({
                    'shareurl': window.location.href
                })
                //data: this.$http.adornData(data, false)
            }).then(({
                data
            }) => {
                console.log(this.course)

                //console.log(data)
                wx.config({
                    // debug: true,
                    appId: data.appId,
                    timestamp: data.timeStamp,
                    nonceStr: data.nonceStr,
                    signature: data.signature,
                    jsApiList: [
                        "onMenuShareTimeline", //分享给好友
                        "onMenuShareAppMessage" //分享到朋友圈
                    ]
                });
                wx.ready(function () {
                    wx.onMenuShareTimeline({
                        title: title, // 分享标题
                        desc: desc, //分享描述
                        link: link, // 分享链接
                        imgUrl: imgUrl, // 分享图标,
                        success: function () {
                            //alert("成功");

                        },
                        cancel: function () {
                            // alert("失败")
                        }
                    });

                    wx.onMenuShareAppMessage({
                        title: title, // 分享标题
                        desc: desc, //分享描述
                        link: link, // 分享链接
                        imgUrl: imgUrl, // 分享图标,
                        success: function () {
                            //alert("成功");
                        },
                        cancel: function () {
                            //alert("失败")
                        }
                    });

                });

            });

        },
        getCourseById(id) {
            this.$vux.loading.show()
            this.$http({
                url: this.$http.adornUrl(`/shopvip/course/getCourseById/${id}`),
                method: 'get',

            }).then(({
                data
            }) => {
                this.$vux.loading.hide()
                console.log(data)
                if (data.code == 0) {
                    this.course.coursePoint = data.page[0].coursePoint
                    this.course.coursePrice = data.page[0].coursePrice
                    this.course.courseName = data.page[0].courseName
                    this.course.coverSrc = data.page[0].coverSrc
                    this.course.asrc = data.page[0].asrc
                    this.course.introduce = data.page[0].introduce
                    this.course.tryvideo = data.page[0].tryvideo
                    this.related = data.related
                    this.course.id = data.page[0].id
                    this.course.sharePoint = data.page[0].sharePoint
                }
            })
        },
        tryclick() {
            this.$http({
                url: this.$http.adornUrl('/shop/tryvideo/getTryVideoPayauth'),
                method: 'get',
                params: this.$http.adornParams({
                    id: this.course.tryvideo
                })
            }).then(({
                data
            }) => {
                if (data.code == 0) {
                    this.playerflag = true
                    this.$nextTick(() => {
                        this.createPlayer(data.page)
                    })
                }
            })
        },
        locationll() {
            let strHref = window.location.href;
            var intPos = strHref.indexOf("?");
            var strRight = strHref.substr(intPos + 1); //==========获取到右边的参数部分
            var arrTmp = strRight.split("&");

            for (var i = 0; i < arrTmp.length; i++) //===========循环数组
            {
                var dIntPos = arrTmp[i].indexOf("=");
                var paraName = arrTmp[i].substr(0, dIntPos);
                console.log(paraName)
                var paraData = arrTmp[i].substr(dIntPos + 1);
                if (paraName == 'uid') {
                    return paraData
                }
            }
            return '';
        },
        bycourse() {
            if (listdata != '') {
                this.$http({
                    url: this.$http.adornUrl('/tigger/rule/'),
                    method: 'post',
                    //params: this.http.adornParams({ })
                    data: this.$http.adornData({
                        "courseid": this.course.id,
                        "uid": this.user.id,
                        "pid": this.listdata
                    })
                }).then(({
                    data
                }) => {

                });
            }

        },
        createPlayer(data) {
            var player = new Aliplayer({
                id: 'J_prismPlayer',
                width: '100%',
                //autoplay: true,
                vid: data.videoId,
                playauth: data.playAuth,
                // cover: 'http://liveroom-img.oss-cn-qingdao.aliyuncs.com/logo.png',
                encryptType: 1
            })
            this.player = player
            //this.player.setPreviewTime(3)
            this.$nextTick(() => {
                this.player.fullscreenService.requestFullScreen()
                this.player.on('cancelFullScreen', this.handleReady);
            })
        },
        handleReady() {
            this.playerflag = false
            this.$nextTick(() => {
                this.player.dispose
            })
        },
        //获取积分规则
        // getRecommendPoint() {
        //     this.$http({
        //         url: this.$http.adornUrl('/tigger/rule/getRule'),
        //         method: 'get',
        //         params: this.$http.adornParams({
        //             id: 5
        //         })
        //     }).then(({
        //         data
        //     }) => {
        //         //console.log(data)
        //         if (data.code == 0) {
        //             this.point = data.page.point
        //         }
        //     })
        // }
        insertShare() {
            this.$nextTick(() => {
                this.$http({
                    url: this.$http.adornUrl('tigger/share/save'),
                    method: 'post',
                    //params: this.http.adornParams({ })
                    data: this.$http.adornData({
                        "productid": this.course.id,
                        "remmondid": this.recomend,
                        "uid": this.user.id,
                        "shareType": 1
                    })
                }).then(({
                    data
                }) => {
                    console.log(data)
                });
            })
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.course.id = this.$route.params.id
        this.getCourseById(this.course.id)
        this.user = this.$cookies.get("user")
        if (this.user == null) {
            if (this.$cookies.get("user").openId == null) {
                this.$vux.confirm.show({
                    title: '提示',
                    content: '用户信息失效',
                    onCancel() {
                        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx601b22b03c6ca4ed&redirect_uri=http%3a%2f%2fshop.jtzsz.com%2f%23%2flogin&response_type=code&scope=snsapi_base&#wechat_redirect"
                    },
                    onConfirm() {
                        window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx601b22b03c6ca4ed&redirect_uri=http%3a%2f%2fshop.jtzsz.com%2f%23%2flogin&response_type=code&scope=snsapi_base&#wechat_redirect"
                    }
                })
            }
            this.$vux.confirm.show({
                title: '提示',
                content: '用户信息失效',
                onCancel() {
                    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx601b22b03c6ca4ed&redirect_uri=http%3a%2f%2fshop.jtzsz.com%2f%23%2flogin&response_type=code&scope=snsapi_base&#wechat_redirect"
                },
                onConfirm() {
                    window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx601b22b03c6ca4ed&redirect_uri=http%3a%2f%2fshop.jtzsz.com%2f%23%2flogin&response_type=code&scope=snsapi_base&#wechat_redirect"
                }
            })

        }
        this.recomend = this.locationll()
        if (this.recomend != "" && this.recomend != undefined) {
            this.insertShare()
        }
        //this.getRecommendPoint()

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
        this.course.id = this.$route.params.id
        this.getCourseById(this.course.id)
    }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style lang="less" scoped>
.content {
    padding: 5px;

    // border-radius: 20px;
    // border: solid 1px #c7c0c0;
    // box-shadow: 5px 5px 5px #c7c0c0;
    // margin: 10px;
    div:nth-child(3)>span {
        color: red;
    }

    div:nth-child(3)>span:first-child {

        font-size: 10px;
    }

    div:nth-child(3)>span:nth-child(2) {
        font-size: 23px;
    }

    div:nth-child(4) {
        color: rgb(104, 6, 87);

        >span {
            font-size: 12px;
            margin: 5px;
            color: #f70404;
            background: rgba(253, 115, 115, 0.24);
            // border-radius: 5px;
            padding: 2px 5px;
        }

        >span:nth-child(3) {
            float: right;
            background: rgb(255, 255, 255);
            color: rgb(146, 132, 132)
        }
    }

    div:nth-child(2) {
        span {
            color: rgb(19, 19, 20);
            font-size: 12px;
            margin: 10px;
        }
    }

}

.tryLook {
    color: red;
    position: relative;
    float: right;
    background-color: rgb(230, 168, 168);
    padding-left: 20px;
    border-radius: 5px 0 0 5px;
}

.footer {
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: auto;
    text-align: center;
    overflow: hidden;

    // border-radius: 10px;
    // color: rgb(105, 90, 90);
    font-size: 12px;
    font-weight: 700;
    color: #fff;

}

.flox {
    height: 50px;
    text-align: center;
    line-height: 50px;
    background: rgb(207, 185, 113);
}

.flox2 {
    height: 50px;
    text-align: center;
    line-height: 50px;
    background: rgb(223, 115, 53);
}

.tryVideo {

    .tryVideoTitle {
        font-family: Georgia;
        font-size: 1.25rem;
    }

    img {
        height: 100px;
        border-radius: 3px;
    }

    ;

    span {

        font-size: 0.625rem;
        color: #232323;

    }
}

.money {
    width: 30%;
    float: right;
    font-size: 20px;

    >span:first-child {
        color: red;
    }

    >span:last-child {
        color: red;
        font-size: 15px;
    }
}
</style>
