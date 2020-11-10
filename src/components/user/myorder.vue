<!--  -->
<template>
<div class=''>
    <x-header style=" width:100%;position:absolute;left:0;top:0;z-index:100;"></x-header>
    <view-box ref="viewbox" body-padding-top="37px">
        <form-preview v-for=" l in list" :key="l.money" header-label="付款金额" :header-value="l.money" :body-items="l.list" :footer-buttons="buttons1"></form-preview>
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
            buttons1: [{
                style: 'default',
                text: '辅助操作'
            }, {
                style: 'primary',
                text: '跳转到首页',
                link: '/'
            }],
            user: {}
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        getOrder() {
            this.$http({
                url: this.$http.adornUrl("/shopvip/order/selectOrder"),
                method: "get",
                params: this.$http.adornParams({
                    id: this.user.id
                })
            }).then(({
                data
            }) => {
                console.log(data)
                let list = []
                if (data.code == 0) {
                    data.orderVo.map(item => {
                        list.push({
                            money: item.omoney + '' + "元",
                            list: [{
                                label: '商品',
                                value: item.introduce
                            }, {
                                label: '数量',
                                value: item.numbers
                            }, {
                                label: "订单号",
                                value: item.ocode
                            }, {
                                label: "单价",
                                value: item.price

                            }, {
                                label: "使用积分",
                                value: item.point
                            }]
                        })
                    })

                    data.productsOrders.map(item => {
                        let list1 = [];
                        item.orderVos.map(it => {
                            list1.push({
                                label: '商品',
                                value: it.introduce
                            }, {
                                label: '数量',
                                value: it.numbers
                            }, {
                                label: "订单号",
                                value: it.ocode
                            }, {
                                label: "单价",
                                value: it.price

                            })
                        })
                        list1.push({

                            label: "积分",
                            value: item.point

                        })
                        list.push({
                            money: item.pmoney + '' + "元",
                            list: list1
                        })
                    })
                    this.list = list
                }
            })
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.user = this.$cookies.get("user")
        this.getOrder()
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

</style>
