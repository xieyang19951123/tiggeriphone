<!--  -->
<template>
<div class=''>
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :left-options="{backText: ''}">
        <span slot="right" @click="deletedbut" v-show="!deletedFalg">
            管理
        </span>
        <span slot="right" v-show="deletedFalg" @click="deletedShopping">
            删除
        </span>
    </x-header>
    <view-box ref="viewbox" style="margin-top:45px">
        <checker type="checkbox" selected-item-class="demo5-item-selected" v-model="products" @on-change="productchange()">
            <div class="content" v-for="l in list" :key="l.id">
                <checker-item :value="l" :disabled="!l.flag">
                    <flexbox>
                        <flexbox-item :span="1/3">
                            <div>
                                <x-img :src="l.asrc"></x-img>
                            </div>
                        </flexbox-item>
                        <flexbox-item :span="2/3">
                            <div class="content1">
                                <span>{{l.comName}}</span>
                                <span><span>￥</span>{{l.price}}</span>
                                <div v-if="l.flag" @click="totalClick($event,l)">
                                    <span>{{l.postage==0?"包邮":"邮费："+l.postage+"元"}}</span>
                                    <span>{{l.total}}</span>
                                    <span>x</span>
                                </div>
                                <div v-if="!l.flag">
                                    <svg slot="title" class="icon" aria-hidden="true" @click="inlineClick(l)">
                                        <use xlink:href="#icon-shanchuhang"></use>
                                    </svg>
                                    <inline-x-number style="float: right;margin-right: 10px;" button-style="round" v-model="l.total" :min="0" @on-change="change(l)"></inline-x-number>
                                </div>
                            </div>
                        </flexbox-item>
                    </flexbox>

                </checker-item>

            </div>

        </checker>

    </view-box>
    <div class="footer">
        <flexbox :gutter="0">
            <flexbox-item>
                <div class="flox"><span>合计：￥{{total}}</span></div>
            </flexbox-item>
            <flexbox-item>
                <div class="flox2" @click="buyShopping"> <span>马上购买</span></div>
            </flexbox-item>
        </flexbox>
    </div>
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
            products: [],
            deletedFalg: false,
            user: null,
            list: [],
            total: 0
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        deletedbut() {
            this.deletedFalg = true
            this.products = []
        },
        selectShoppings() {
            this.$vux.loading.show({
                text: 'Loading'
            })
            this.$http({
                url: this.$http.adornUrl("/shop/shopping/selectShoppings"),
                methods: "get",
                params: this.$http.adornParams({
                    id: this.user.id
                })

            }).then(({
                data
            }) => {
                //console.log(data)
                this.$vux.loading.hide()
                if (data.code == 0) {
                    let list = []
                    data.page.map(item => {
                        item.flag = true
                        list.push(item)
                    })
                    //console.log(list)
                    this.list = list
                }
            })
        },
        productchange() {
            //console.log(this.products)
            let total = 0
            //console.log(this.products)
            this.products.map(item => {
                // console.log(item)
                total += (item.price * item.total) + item.postage
            })
            //console.log(total)
            this.total = total.toFixed(2)
        },
        change(l) {
            //console.log(l.total)
        },
        totalClick(event, l) {
            //console.log(event)
            // event.target.stopPropagation();
            l.flag = false
            this.products = []
        },
        inlineClick(l) {
            //console.log(l.total)
            this.$http({
                url: this.$http.adornUrl("/shop/shopping/updateShopping"),
                method: "post",
                data: this.$http.adornData(l)
            }).then(({
                data
            }) => {
                //console.log(data)

                l.flag = true
                this.selectShoppings()
            })
        },
        deletedShopping() {
            this.$http({
                url: this.$http.adornUrl("/shop/shopping/deletedShopping"),
                method: "post",
                data: this.$http.adornData({
                    ids: this.products
                })
            }).then(({
                data
            }) => {
                if (data.code == 0) {
                    this.selectShoppings()
                }
                //console.log(data)
                this.deletedFalg = false
            })
        },
        buyShopping() {
            this.$router.push({
                name: "order",
                params: {
                    t: this.products
                }
            })
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
        this.user = this.$cookies.get("user")

        this.selectShoppings()
        //this.total = 0
    }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style lang="less" scoped>
@import './myshoppingtrolley.less';
</style>
