<!--  -->
<template>
<div class=''>
    <x-header></x-header>
    <view-box ref="viewBox">
        <div class="tryVideo">
            <grid :cols="2">
                <grid-item v-for="v in organ" :key="v.id" @on-item-click="$router.push(`/mystudyplan/${v.id}`)">
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
            user: {},
            organ: []
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        getOrgan() {
            this.$http({
                url: this.$http.adornUrl("/shopvip/organ/getMyorgan"),
                method: "get",
                params: this.$http.adornParams({
                    uid: this.user.id
                })
            }).then(({
                data
            }) => {
                // console.log(data)
                if (data.code == 0) {
                    console.log(data)
                    this.organ = data.page
                }
            })
        },

    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.user = this.$cookies.get("user")
        console.log(this.user)
        this.getOrgan()
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
.icon {
    margin: auto;
    width: 2.7em;
    height: 2.7em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}

.flex-demo {
    margin: 10px;
    text-align: center;

    span {
        font-size: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
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
</style>
