<!--  -->
<template>
<div class=''>
    <x-header slot="header" :left-options="{preventGoBack:true}" @on-click-back="goback" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
        <svg slot="right" class="icon" aria-hidden="true" @click="goshopping">
            <use xlink:href="#icon-gouwuche"></use>

        </svg>
        <badge slot="right" v-show="addSuccess"></badge>
    </x-header>
    <view-box ref="viewBox">
        <swiper :list="accessoryEntities" auto loop height="300px"></swiper>
        <div>
            <div class="content">
                <div><span>￥</span><span>{{product.price}}</span><br></div>
                <div><span>积分可抵{{product.point}}元</span><span>{{product.postage==0?"包邮":"邮费："+product.postage+"元"}}</span></div><br>
                <div><span>{{product.comName}}</span></div>
            </div>
            <div>{{product.address}}</div>
        </div>
        <group>
            <cell title="数量">
                <inline-x-number style="display:block;" :min="1" width="50px" button-style="round" v-model="product.total"></inline-x-number>
            </cell>
        </group>
        <div id="tuwen"></div>
        <group title="相关推荐">
            <div style="margin-top:20px">
                <flexbox wrap="wrap" :gutter="0">
                    <flexbox-item :span="1/2" v-for="p in products" :key="p.id" v-if="product.id != p.id">
                        <div class="myimage" @click="$router.push(`/home/product/${p.id}`),getProduct()">
                            <div class="myimage1">
                                <x-img :src="p.coverSrc"></x-img>
                                <div style="width:100%;font-size:13px"><span>{{p.comName}}</span></div>
                                <div style="color:rgb(255, 0, 0);"><span style="font-size:10px">￥</span><span>{{p.price}}</span></div>
                            </div>
                        </div>
                    </flexbox-item>
                </flexbox>
            </div>
        </group>
    </view-box>
    <div class="footer">
        <flexbox :gutter="0">
            <flexbox-item>
                <div class="flox" @click="shopping"><span>加入购物车</span></div>
            </flexbox-item>
            <flexbox-item>
                <div class="flox" @click="alertaction()"><span>分享得{{product.sharePoint}}积分</span></div>
            </flexbox-item>
            <flexbox-item>
                <div class="flox2" @click="buyproduct"> <span>马上购买</span></div>
            </flexbox-item>
        </flexbox>
    </div>
    <alert v-model="show2" content="请登录" @on-hide="alertHide"></alert>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
    mapGetters,
    mapActions
} from 'vuex'
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            product: {
                total: 1
            },
            accessoryEntities: [],
            user: null,
            show2: false,
            addSuccess: false,
            products: []

        };
    },
    // 计算属性
    computed: mapGetters([
        // 从 getters 中获取值
        'footerShow'
    ]),
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        //获取messgae
        getmessage() {
            this.$nextTick(() => {
                this.$http({
                    url: this.$http.adornUrl('/tigger/message/get'),
                    method: 'get',
                    params: this.$http.adornParams({
                        pid: this.product.id
                    })
                }).then(({
                    data
                }) => {
                    console.log(data)
                    if (data.code == 0) {
                        document.getElementById("tuwen").innerHTML = data.page.message
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
            let title = this.product.comName
            //let desc = this.product.introduce
            let link = location.href + "?uid=" + this.user.id
            let imgUrl = this.product.asrc
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
        //
        goback() {
            this.$store.commit('UPDATE_FOOTER', true)
            this.$router.push("/home/mycentre")
            this.$emit("changge", 1)
        },
        //获取商品的数据
        getProduct() {
            let list = []
            //this.$store.commit('UPDATE_FOOTER', false)
            let id = this.$route.params.id
            this.$http({
                url: this.$http.adornUrl("/shopvip/comment/selectCommentById"),
                method: "get",
                params: this.$http.adornParams({
                    id: id
                })
            }).then(({
                data
            }) => {
                console.log(data)
                if (data.code == 0) {
                    this.product = data.page
                    this.product.total = 1
                }
                data.page.accessoryEntities.map(item => {
                    list.push({
                        //title: item.comName,
                        img: item,
                    })
                })
                this.accessoryEntities = list
                this.getrecommend()
                this.getmessage()
            })

        },
        //获取相关推荐
        getrecommend() {
            this.$http({
                url: this.$http.adornUrl('/shopvip/comment/getrecommend'),
                method: 'get',
                params: this.$http.adornParams({
                    "cid": this.product.cid
                })
            }).then(({
                data
            }) => {
                console.log(data)
                this.products = data.page

            })
        },
        //添加到购物车
        shopping() {
            if (this.user == null) {
                this.show2 = true
            }
            this.$vux.loading.show({
                text: 'Loading'
            })

            this.$http({
                url: this.$http.adornUrl("/shop/shopping/insertShopping"),
                method: "post",
                data: this.$http.adornData({
                    productId: this.product.id,
                    price: this.product.price,
                    uid: this.user.id
                })
            }).then(({
                data
            }) => {
                this.$vux.loading.hide()
                this.$vux.toast.show({
                    text: '添加成功'
                })
                if (data.code == 0) {
                    this.addSuccess = true
                }
            })
        },
        alertHide() {
            this.$router.push({
                name: "login",
                params: this.product
            })
        },
        goshopping() {
            this.$router.push(`/home/myshoppingtrolley/${this.user.id}`)
        },
        buyproduct() {
            let products = [this.product]
            this.$router.push({
                name: 'order',
                params: {
                    t: products
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
        insertShare() {
            this.$nextTick(() => {
                this.$http({
                    url: this.$http.adornUrl('tigger/share/save'),
                    method: 'post',
                    //params: this.http.adornParams({ })
                    data: this.$http.adornData({
                        "productid": this.product.id,
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
        this.getProduct()
        this.user = this.$cookies.get("user")
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
        this.recomend = this.locationll()
        if (this.recomend != "" && this.recomend != undefined) {
            this.insertShare()
        }

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {

    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {

    }, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {

    },
}
</script>

<style lang="less" scoped>
@import "./product.less";
</style>
