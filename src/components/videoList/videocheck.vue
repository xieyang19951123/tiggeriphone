<!--  -->
<template>
<div class=''>
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;"></x-header>
    <view-box body-padding-top="45px">
        <!---<div class="tryvideo" v-for="l in tryvideo" :key="l.id" @click="tryvideoclick(l)">
            <x-img :src="l.asrc"></x-img>
            <div>
                <span>{{l.introduce}}</span>
                <div>
                    <span v-for="n in l.name" :key="n">{{n}}</span>
                </div>
            </div>
        </div>
        <div class="tryvideo" v-for="l in payvideo" :key="l.id" @click="payvideoclick(l)">
            <x-img :src="l.asrc"></x-img>

            <div>
                <div>
                    <span>{{l.introduce}}</span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-VIP1"></use>
                    </svg>
                </div>
                <div>
                    <span v-for="n in l.name" :key="n">{{n}}</span>
                </div>
            </div>
        </div>-->

        <div class="tryVideo" v-if="recommendCourse.length != 0">
            <grid :cols="2" :show-lr-borders="false" :show-vertical-dividers="false">
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
                <grid-item v-for="p in payvideo " :key="p.id" @on-item-click="payVideoClick(p)">
                    <div class="tryVideo">
                        <x-img :src="p.coverSrc"></x-img><br>
                        <span>{{p.introduce}}</span>
                        <div class="money">
                            <span>￥</span>
                            <span>{{p.price}}</span>
                        </div>
                    </div>
                </grid-item>
                <grid-item v-for="v in organ" :key="v.cid" @on-item-click="$router.push(`/home/organvideo/${v.id}`)" v-if="v.recommend == 0 && v.homeShow ==1">
                    <div>
                        <x-img :src="v.coverSrc"></x-img><br>
                        <span>{{v.username}}</span>
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
            value: "",
            tryvideo: [],
            payvideo: [],
            recommendCourse: [],
            organ: []
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        getvideobyvlue() {
            this.$http({
                url: this.$http.adornUrl("/shop/payVideo/getvideobyvlue"),
                method: "get",
                params: this.$http.adornParams({
                    val: this.value
                })
            }).then(({
                data
            }) => {
                console.log(data)
                if (data.code == 0) {

                    this.payvideo = data.payvideo
                    this.recommendCourse = data.tryvideo
                    this.organ = data.organVal
                }
            })
        },
        payvideoclick(val) {
            this.$router.push(`/payvideo/${val.id}`)
        },
        tryvideoclick(val) {
            this.$router.push(`/tryvideo/${val.id}`)
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.value = this.$route.params.value
        this.getvideobyvlue()
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
    font-size: 18px;

    >span:first-child {
        color: red;
    }

    >span:last-child {
        color: red;
        font-size: 15px;

    }
}
</style>
