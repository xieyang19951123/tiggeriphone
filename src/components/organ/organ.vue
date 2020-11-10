<!--  -->
<template>
<div class=''>
    <view-box ref="viewBox">
        <category ref="category" style="position: absolute; width:100%" @kechen="getChildren"></category>
        <div class="myicon" style="margin-top:50px;">
            <flexbox :gutter="0" wrap="wrap">
                <flexbox-item :span="1/4" v-for="s in subject " :key="s.id">
                    <div class="flex-demo" @click="$router.push(`/organcategory/${s.id}`)">
                        <svg class="icon1" aria-hidden="true">
                            <use :href="s.icon"></use>
                        </svg>
                        <br>
                        <span>{{s.name}}</span>
                    </div>
                </flexbox-item>
            </flexbox>
        </div>
        <div class="swiperclass">
            <swiper auto>
                <swiper-item class="swiper-demo-img" v-for="(item, index) in organ" :key="index" v-if="item.recommend ==1">
                    <x-img :src="item.coverSrc" style="width:100%" @click.native="$router.push(`/home/organvideo/${item.id}`)"></x-img>
                </swiper-item>
            </swiper>
        </div>

        <div class="tryVideo">
            <grid :cols="2">
                <grid-item v-for="v in organ" :key="v.id" @on-item-click="$router.push(`/home/organvideo/${v.id}`)" v-if="v.recommend == 0 && v.homeShow ==1">
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
import category from '../dialog/categorydialog';
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
        category
    },
    data() {
        //这里存放数据
        return {
            organ: [],
            subject: []
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        //获取所有的机构
        getOrgan(cid) {
            this.$http({
                url: this.$http.adornUrl(`/shopvip/organ/organ/${cid}`),
                method: "get"
            }).then(({
                data
            }) => {
                console.log(data)
                if (data.code == 0) {
                    this.organ = data.page
                }
            })
        },

        getChildren(data) {
            this.subject = data.chidrens
            this.getOrgan(data.id)

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
        //this.getOrgan(0)
        this.$store.commit('UPDATE_FOOTER', true)
    }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style lang="less" scoped>
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

.icon1 {
    width: 1.9em;
    height: 1.9em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;

}

.myicon {
    width: 100%;

    overflow: hidden;

    img {
        height: 3.125rem;
    }
}

.swiperclass {
    padding: 10px;

    img {
        border-radius: 5px;
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
