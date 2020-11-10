<!--  -->
<template>
<div class=''>

    <view-box ref="viewBox">
        <category ref="category" style="position: absolute; width:100%" @kechen="getChildren"></category>
        <div class="myicon" style="margin-top:50px;">
            <flexbox :gutter="0" wrap="wrap">
                <flexbox-item :span="1/4" v-for="s in subject " :key="s.id">
                    <div class="flex-demo" @click="cliclSvg(s)">
                        <svg class="icon1" aria-hidden="true">
                            <use :href="s.icon"></use>
                        </svg>
                        <br>
                        <span>{{s.name}}</span>
                    </div>
                </flexbox-item>

            </flexbox>
        </div>
        <br>
        <div class="swiperclass">
            <swiper auto>
                <swiper-item class="swiper-demo-img" v-for="(item, index) in recommendCourse" :key="index" v-if="item.recommend ==1">
                    <x-img :src="item.coverSrc" style="width:100%" @click.native="tryVideoClick(item)"></x-img>
                </swiper-item>
            </swiper>
        </div>
        <!--试看视频-->

        <div class="tryVideo" v-if="recommendCourse.length != 0">
            <grid :cols="2">
                <grid-item v-for="v in recommendCourse" :key="v.id" @on-item-click="tryVideoClick(v)" v-if="v.recommend ==0 && v.homeShow ==1">
                    <div>
                        <x-img :src="v.coverSrc"></x-img><br>
                        <span>{{v.courseName}}</span>
                        <div class="money">
                            <span>￥</span>
                            <span>{{v.coursePrice}}</span>
                        </div>
                    </div>
                </grid-item>
                <grid-item v-for="p in payVideo " :key="p.id" @on-item-click="payVideoClick(p)" v-if="payVideo.length !=0">
                    <div class="tryVideo">
                        <x-img :src="p.coverSrc"></x-img><br>
                        <span>{{p.introduce}}</span>
                        <div class="money">
                            <span>￥</span>
                            <span>{{p.price}}</span>
                        </div>
                    </div>
                </grid-item>

            </grid>
        </div>
        <!--试看视频-->
        <div v-if="payVideo.length ==0" class="qingjig">系统内测中敬请期待^_^....</div>
    </view-box>

</div>
</template>

<style lang="less" scoped>
@import '~vux/src/styles/close';
@import './home';
</style>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import category from '../dialog/categorydialog';
import {
    ViewBox,
    Group,
    Flexbox,
    FlexboxItem,
    Grid,
    GridItem,
    GroupTitle,
    XImg
} from 'vux'

export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
        GroupTitle,
        ViewBox,
        Group,
        Flexbox,
        XImg,
        FlexboxItem,
        Grid,
        GridItem,
        category
    },

    data() {
        //这里存放数据
        return {
            subject: [],
            tryvideo: [],
            payVideo: [],
            recommendCourse: []
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        //点击更多收费视频
        payvideomoduo() {
            this.$router.push("/payvideomoduo")
        },
        //点击分类
        cliclSvg(s) {
            this.$router.push(`/videocategory/${s.id}`)
        },
        //点击收费视频
        payVideoClick(data) {
            this.$router.push(`/payvideo/${data.id}`)
        },
        //点击试看视频
        tryVideoClick(data) {
            //this.$router.push(`/tryvideo/${data.id}`)
            this.$router.push(`/course/${data.id}`)
        },
        //获取组件传过来的数据
        getChildren(data) {
            //console.log(data)
            this.subject = data.chidrens
            this.getPayVideo(data.id)
            this.getCourseRecommend(data.id)
        },

        //获取收费视频
        getPayVideo(cid) {
            this.$http({
                url: this.$http.adornUrl(`/shop/payVideo/getVideo/${cid}`),
                methods: "get",
            }).then(({
                data
            }) => {
                console.log(data)
                if (data.code == 0) {
                    this.payVideo = data.page
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
            // alert(code)
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
                    }
                }
            })
        },
        getCourseRecommend(cid) {
            this.$http({
                url: this.$http.adornUrl(`/shopvip/course/getCourseRecommend/${cid}`),
                method: 'get',
                //params: this.$http.adornParams({})
            }).then(({
                data
            }) => {
                console.log(data)
                if (data.code === 0) {
                    this.recommendCourse = data.page
                }
            })
        },
        action() {
            this.$http({
                url: this.$http.adornUrl('/home/action'),
                method: 'get',
                params: this.$http.adornParams({
                    uid: this.$cookies.get("user").id
                })
            }).then(({
                data
            }) => {
                this.$vux.alert.show({
                    title: '提示',
                    content: data.msg,
                    onShow() {
                        console.log('Plugin: I\'m showing')
                    },
                    onHide() {
                        console.log('Plugin: I\'m hiding')
                    }
                })
            })
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        // this.getTryVideo()
        this.getPayVideo(0)
        this.getCourseRecommend(0)
    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {
        //this.getTryVideo()
        this.getPayVideo(0)
        this.$store.commit('UPDATE_FOOTER', true)
        let user = this.$cookies.get("user")
        this.getopenid()
        console.log(user)
        console.log(this.locationll());
        if (user != null) {
            this.action()
        }

    }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
