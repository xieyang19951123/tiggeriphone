<!--  -->
<template>
<div>

    <view-box ref="viewbox" body-padding-top="45px">
        <div>
            <div class="prism-player" id="J_prismPlayer"></div>
        </div>
        <br>

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
            tryVideo: null,
            tryVideoList: [],
            header: "相关推荐",
            list: [],
            type: "1"
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
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
        },

        getPlayauth(id) {
            //this.tryVideo = tryVideo

            this.$http({
                url: this.$http.adornUrl("/shop/tryvideo/getTryVideoPayauth"),
                methods: "get",
                params: this.$http.adornParams({
                    id: id
                })

            }).then(({
                data
            }) => {

                if (data.code == 0) {
                    this.tryvideo = data.page
                    this.createPlayer(data.page)
                    this.getRelevant(data.page.cid)
                }
            })
        },
        //获取相关的推荐
        getRelevant(val) {
            this.$http({
                url: this.$http.adornUrl("/shop/tryvideo/getRelevant"),
                methods: "get",
                params: this.$http.adornParams({
                    cid: val
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
        clickRelevant(item) {
            this.player.dispose()
            this.getPlayauth(item.id)
        }

    },

    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        let id = this.$route.params.id
        this.getPlayauth(id)
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
