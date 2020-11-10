<!--  -->
<template>
<div class=''>

    <view-box ref="viewBox">
        <div class="payvideo" v-for="l in list " :key="l.id" @click="payvideoclick(l)">

            <div :style="{ 'background-image': 'url(' + l.coverSrc + ')' }"></div>
            <div>
                <span>{{l.introduce}}</span>
                <div>
                    <span v-for="n in l.name" :key="n">{{n}}</span>
                </div>
                <div>
                    <span>￥</span>
                    <span>{{l.price}}</span>

                </div>
            </div>
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
            list: []
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        //获取所有的视频
        selectPayVideomoduo() {
            this.$http({
                url: this.$http.adornUrl("/shop/payVideo/getpayvideomoduo"),
                method: "get"
            }).then(({
                data
            }) => {
                console.log(data)
                if (data.code == 0) {
                    this.list = data.page
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
        this.selectPayVideomoduo()
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
    // border: 1px rgb(204, 195, 195) solid;
    border-bottom: 1px dashed #ccc;
    // border-radius: 5px;
    // box-shadow: 5px 5px 5px #9b9898;
    height: 100px;
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
        flex: 2;
    }

    >div:nth-child(2) {
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
</style>
