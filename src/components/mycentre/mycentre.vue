<!--  -->
<template>
<div class=''>
    <view-box ref="viewBox">
        <div class="category">
            <span @click="clickTitle">{{title}}</span>
            <x-input class="inputClass" @on-enter="inputenter">
                <img slot="right-full-height" style="height:27px;margin:10px 5px 0px 0px" src="../../assets/seek.png">
            </x-input>
        </div>
        <div class="myicon">
            <flexbox :gutter="0" wrap="wrap">
                <flexbox-item v-for="l in myclass" :key="l.id" :span="1/4">
                    <div class="flex-demo1" @click="flexboxclick(l)">
                        <svg class="icon1" aria-hidden="true">
                            <use :href="l.icon"></use>
                        </svg>
                        <br>
                        <span>{{l.name}}</span>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
        <div class="swipeclass">

            <swiper auto loop>
                <swiper-item v-for=" m in mycover" :key="m.id">
                    <img class="swiperimg" :src="m.coverSrc" @click="swiperClick(m)">
                </swiper-item>
            </swiper>
        </div>
        <div style="margin-top:20px">
            <flexbox wrap="wrap" :gutter="0">
                <flexbox-item :span="1/2" v-for="p in product" :key="p.id">
                    <div class="myimage" @click="productClick(p)">
                        <div class="myimage1">
                            <x-img :src="p.coverSrc"></x-img>
                            <div style="width:100%;font-size:13px"><span>{{p.comName}}</span></div>
                            <div style="color:rgb(255, 0, 0);"><span style="font-size:10px">￥</span><span>{{p.price}}</span></div>
                        </div>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
    </view-box>

    <x-dialog v-model="dialog" hide-on-blur class="dialog-demo">
        <div><span>分类</span></div><br>
        <div>
            <flexbox>
                <flexbox-item v-for="ch in list" :key="ch.id">
                    <div class="flex-demo" @click="flexBoxClick($event,ch)">{{ch.name}}</div>
                </flexbox-item>
            </flexbox>
        </div>
    </x-dialog>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    //import引入的组件需要注入到对象中才能使用
    components: {

    },
    data() {
        //这里存放数据
        return {
            title: "",
            dialog: false,
            list: [],
            myclass: [],
            mycover: [],
            product: []

        };
    },
    //监听属性 类似于data概念
    computed: {

    },
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        getCategory() {
            this.$http({
                url: this.$http.adornUrl("/shopvip/category/list"),
                methods: "get",
                params: this.$http.adornParams({
                    type: 2
                })
            }).then(({
                data
            }) => {

                if (data.code == 0) {
                    this.title = data.page[0].name
                    this.list = data.page
                    this.myclass = data.page[0].chidrens
                }
            })
        },
        clickTitle() {
            this.dialog = true
        },
        flexBoxClick($event, ch) {
            let classArray = document.getElementsByClassName('flex-demo')
            for (var i = 0; i < classArray.length; i++) {
                classArray[i].classList.remove('bacImage')
            }
            event.target.classList.add('bacImage')
            this.dialog = false
            this.title = ch.name
            this.myclass = ch.chidrens

        },

        //获取商品
        selectComment() {
            this.$http({
                url: this.$http.adornUrl("/shopvip/comment/selectComment"),
                method: "get"
            }).then(({
                data
            }) => {
                if (data.code == 0) {
                    console.log(data)
                    this.diop(data.page)

                }
            })
        },
        //数据处理
        diop(data) {
            let list = [];
            let product = []
            data.map(item => {
                if (item.homeShow == 1) {
                    list.push(item)
                } else {
                    product.push(item)
                }
            })

            this.mycover = list
            this.product = product

        },
        productClick(p) {
            //this.$router.push("/product")
            this.$store.commit('UPDATE_FOOTER', false)
            this.$router.push(`/product/${p.id}`)
        },
        swiperClick(val) {
            //console.log(val)
            this.$router.push(`/product/${val.id}`)
        },
        flexboxclick(val) {
            this.$router.push(`/productlist/${val.id}`)
        },
        inputenter(value, $event) {
            console.log(value)
            this.$router.push(`/productbyvalue/${value}`)
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {

    },
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.getCategory()
        this.selectComment()
    },
    beforeCreate() {}, //生命周期 - 创建之前
    beforeMount() {}, //生命周期 - 挂载之前
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {
        this.getCategory()
        this.selectComment()
        this.$store.commit('UPDATE_FOOTER', true)
    }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style lang="less" scoped>
@import './mycentre.less';
@import '~vux/src/styles/1px.less';
</style>
