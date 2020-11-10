<!--  -->
<template>
<div class=''>

    <view-box ref="viewBox" style="margin-top:35px">
        <x-img :src="organ.coverSrc" style="width:100%"></x-img>
        <div>
            <div class="title">{{organ.username}}</div>
            <div class="dbubble-text">
                {{organ.synopsis}}
            </div>
        </div>
        <br />

        <div class="tryVideo" v-if="course.length != 0">
            <grid :cols="2">
                <grid-item v-for="v in course" :key="v.id" @on-item-click="$router.push(`/course/${v.id}`)">
                    <div>
                        <x-img :src="v.coverSrc"></x-img><br>
                        <span>{{v.courseName}}</span>
                        <div class="money">
                            <span>￥</span>
                            <span>{{v.coursePrice}}</span>
                        </div>
                    </div>
                </grid-item>
                <grid-item v-for="p in video " :key="p.id" @on-item-click="$router.push(`/payvideo/${p.id}`)" v-if="video.length !=0">
                    <div class="tryVideo">
                        <x-img :src="p.coverSrc"></x-img><br>
                        <div><span>{{p.introduce}}</span></div>
                        <div class="money">
                            <span>￥</span>
                            <span>{{p.price}}</span>
                        </div>
                    </div>
                </grid-item>

            </grid>
        </div>

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
            oid: null,
            organvideo: [],
            organ: {},
            course: [],
            video: []
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        getOrganVideo() {
            this.$http({
                url: this.$http.adornUrl("/shopvip/organ/getOrganVideo"),
                method: "get",
                params: this.$http.adornParams({
                    oid: this.oid
                })
            }).then(({
                data
            }) => {
                console.log(data)
                if (data.code == 0) {
                    this.course = data.course
                    this.video = data.video
                }
            })
        },
        //获取机构信息
        getOrganByid() {
            this.$http({
                url: this.$http.adornUrl("/shopvip/organ/getOrganByid"),
                method: "get",
                params: this.$http.adornParams({
                    oid: this.oid
                })
            }).then(({
                data
            }) => {
                console.log(data)
                if (data.code == 0) {
                    this.organ = data.page[0]
                }
            })
        },
        payvideo(data) {
            this.$router.push(`/payvideo/${data.id}`)
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
        this.$store.commit('UPDATE_FOOTER', false)
        this.oid = this.$route.params.id
        this.getOrganVideo()
        this.getOrganByid()
    }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style lang="less" scoped>
.dbubble-text {
    display: inline-block;
    font-size: 14px;
    color: #303030;
    line-height: 1.6;
    font-family: "微软雅黑";
    width: 96%;
    margin: 5px auto;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
    padding: 5px;
    text-indent: 2em
}

.title {
    font-size: 18px;
    font-weight: normal
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
