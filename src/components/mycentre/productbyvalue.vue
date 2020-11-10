<!--  -->
<template>
<div class=''>
    <x-header></x-header>

    <view-box ref="viewBox">
        <div class="product" v-for=" l in list" :key="l.id" @click="productClick(l)">
            <x-img :src="l.asrc"></x-img>

            <div>
                <span>{{l.comName}}</span>
                <div>
                    <span v-for="n in l.name" :key="n">{{n}}</span>
                </div>
                <div><span>{{l.price}}</span><span>￥</span></div>
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
            val: "",
            list: []
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        getproductbycategoryval() {
            this.$http({
                url: this.$http.adornUrl("/shop/product/getproductbycategoryval"),
                method: "get",
                params: this.$http.adornParams({
                    val: this.val
                })
            }).then(({
                data
            }) => {
                console.log(data)
                if (data.code == 0) {
                    this.list = data.page
                }
            })
        },
        productClick(val) {
            this.$router.push(`/home/product/${val.id}`)
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.val = this.$route.params.value
        this.getproductbycategoryval()
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
.product {
    border: 1px solid rgb(212, 163, 163);
    margin: 10px;
    display: flex;
    border: 1px rgb(204, 195, 195) solid;
    border-radius: 5px;
    box-shadow: 5px 5px 5px #9b9898;
    padding: 10px;

    img {
        border-radius: 5px;

    }

    >div:nth-child(2) {
        margin-left: 4px;
        width: 100%;

        >div:nth-child(3) {
            width: 100%;

            >span:first-child {
                color: red;

                font-size: 15px;
                float: right;
            }

            >span:nth-child(2) {
                color: red;
                font-size: 10px;
                float: right;

            }
        }

        >div:nth-child(2) {
            width: 100%;

            span {
                font-size: 14px;
                margin-left: 5px;
                background-color: rgb(252, 186, 186);
                color: red;
                border-radius: 5px;
            }
        }
    }
}
</style>
