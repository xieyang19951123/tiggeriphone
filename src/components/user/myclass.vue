<!--  -->
<template>
<div class=''>
    <x-header style=" width:100%;position:absolute;left:0;top:0;z-index:100;"></x-header>
    <view-box ref="viewbox" body-padding-top="37px">
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
            list: [],
            recommendCourse: [],
            payVideo: []
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        //根据用户id查询课程
        getmyclass() {
            console.log(this.user)
            this.$http({
                url: this.$http.adornUrl("/shop/uservideo/getUserVideoByuid"),
                method: "get",
                params: this.$http.adornParams({
                    uid: this.user.id
                })
            }).then(({
                data
            }) => {
                console.log(data)
                if (data.code == 0) {
                    this.payVideo = data.page
                    this.recommendCourse = data.class
                }
            })
        },
        payvideoclick(val) {
            this.$router.push(`/payvideo/${val.id}`)
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.user = this.$cookies.get("user")
        this.getmyclass()
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
.payvideo {
    display: flex;
    margin: 10px;
    border: 1px rgb(204, 195, 195) solid;
    border-radius: 5px;
    box-shadow: 5px 5px 5px #9b9898;

    img {
        border-radius: 9px;
        margin: 10px;
    }

    >div:nth-child(2) {
        margin: 10px;
        width: 100%;

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
            color: rgb(161, 98, 98);
            display: flex;

            >span {
                margin: 5px;
                background: rgb(236, 122, 122);
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
