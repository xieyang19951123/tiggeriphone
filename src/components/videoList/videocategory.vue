<!--  -->
<template>
<div class=''>
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">{{name}}</x-header>
    <view-box body-padding-top="45px">
        <div class="tryvideo" v-for="l in course" :key="l.id" @click="$router.push(`/course/${l.id}`)">
            <!-- <x-img :src="l.asrc"></x-img> -->
            <div :style="{ 'background-image': 'url(' + l.coverSrc + ')' }"></div>
            <div>
                <div><span>{{l.introduce}}</span>
                    <div></div>
                    <div><span>{{l.coursePrice}}</span><span>￥</span></div>
                </div>
                <div>
                    <span v-for="n in l.name" :key="n">{{n}}</span>
                </div>
            </div>
        </div>
        <div class="tryvideo" v-for="l in payvideo" :key="l.id" @click="payvideoclick(l)">
            <!-- <x-img :src="l.asrc"></x-img> -->
            <div :style="{ 'background-image': 'url(' + l.coverSrc + ')' }"></div>

            <div>
                <div>
                    <span>{{l.introduce}}</span>
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-VIP1"></use>
                    </svg>
                    <div><span>{{l.price}}</span><span>￥</span></div>
                </div>
                <div>
                    <span v-for="n in l.name" :key="n">{{n}}</span>
                </div>
            </div>
        </div>
    </view-box>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import {
    ViewBox,
    XHeader,
    Panel
} from 'vux'
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
        ViewBox,
        XHeader,
        Panel
    },
    data() {
        //这里存放数据
        return {
            id: null,
            name: null,
            tryvideo: [],
            payvideo: [],
            type: "1",
            course: []
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        getVideoCategory(id) {
            console.log(id)
            this.$http({
                url: this.$http.adornUrl("/shop/payVideo/getVideoCategory"),
                methods: "get",
                params: this.$http.adornParams({
                    id: id
                })
            }).then(({
                data
            }) => {

                if (data.code == 0) {
                    // data.payvideo.map(item => {
                    //     this.payvideo.push({
                    //         "src": item.coverSrc,
                    //         "desc": item.introduce,
                    //         "id": item.id
                    //     })
                    // })
                    // data.tryvideo.map(item => {
                    //     this.tryvideo.push({
                    //         "src": item.coverSrc,
                    //         "desc": item.introduce,
                    //         "id": item.id
                    //     })
                    // })
                    console.log(data)
                    this.payvideo = data.payvideo
                    this.course = data.course
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
        let id = this.$route.params.id
        this.getVideoCategory(id)
        this.name = this.$route.params.name
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
.tryvideo {
    display: flex;
    margin: 10px;
    // border: 1px rgb(204, 195, 195) solid;
    border-bottom: 1px dashed #ccc;
    // border-radius: 5px;
    // box-shadow: 5px 5px 5px #9b9898;
    height: 80px;
    padding: 10px;

    // img {
    //     // border-radius: 9px;
    //     margin: 10px;
    // }
    >div:nth-child(1) {
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        height: 100%;
        flex: 1;
        width: 50%;

    }

    >div:nth-child(2) {
        >div:first-child {
            font-size: 13px;

            >div:nth-child(3) {
                color: red;

                >span {
                    float: right;
                }

                >span:nth-child(2) {
                    font-size: 10px;
                    margin-top: 7px;
                }

                >span:first-child {
                    font-size: 18px;
                }
            }

        }

        margin: 0 10px;
        width: 100%;
        flex: 3;

        >span:first-child {
            font-size: 14px;
            padding-right: 10px;
            white-space: nowrap;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            overflow: hidden;
        }

        >div:nth-child(2) {
            font-size: 10px;
            color: #fff;
            display: flex;

            >span {
                margin: 5px;
                background: #00c1de;
                border-radius: 5px;
                padding: 1px;
            }

        }

        >div:nth-child(3) {
            width: 100%;
            color: red;

            >span:first-child {
                color: red;
                font-size: 8px;
            }
        }

    }

}

.icon {
    width: 2.5em;
    height: 2.5em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    float: right;
    position: absolute;
    margin-left: 60px;
    margin-bottom: 10px;
}

span {
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;

}
</style>
