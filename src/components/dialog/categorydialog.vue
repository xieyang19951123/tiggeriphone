<!--  -->
<template>
<div>
    <div class="category">
        <span @click="clickCateGory">{{title}}</span>
        <x-input class="inputClass" @on-enter="clickenter">
            <img slot="right-full-height" style="height:27px;margin:10px 5px 0px 0px" src="../../assets/seek.png" @click="clickenter">
        </x-input>
    </div>
    <div v-transfer-dom>
        <x-dialog v-model="dialog" hide-on-blur class="dialog-demo">
            <div id="gradeTitle"><span>设置年级</span>
                <div class="cicty" @click="cictyClick">{{cicty}}</div>
            </div>
            <div v-for=" c in class2" :id="c.id">
                <div id="gradeTwo"><span>{{c.name}}</span></div>
                <flexbox :gutter="0" wrap="wrap">
                    <flexbox-item :span="1/4" v-for="ch in c.chidrens" :key="ch.id">
                        <div class="flex-demo" @click="flexBoxClick($event,ch)">{{ch.name}}</div>
                    </flexbox-item>
                </flexbox>
            </div>
        </x-dialog>
    </div>
    <div v-transfer-dom>
        <popup v-model="cictyDialog" position="left" width="100%" height="100%">>
            <cicty ref="cicty" @event1="change" @event2="closeCictyDialog" :cictyList="cictyList"></cicty>
        </popup>
    </div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import mycentre from '@/components/mycentre/mycentre'
import cicty from '@/components/dialog/cicty'
import pinyin from '@/untils/Convert_Pinyin'
import {
    XDialog,
    XInput,
    TransferDomDirective as TransferDom,
    Flexbox,
    FlexboxItem,
    Popup,

} from 'vux'

export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
        XDialog,
        Flexbox,
        FlexboxItem,
        Popup,
        XInput,
        cicty,

    },
    directives: {
        TransferDom
    },
    data() {
        //这里存放数据
        return {
            dialog: false,
            category: [],
            cictyDialog: false,
            cicty: "",
            cictyList: [],
            class2: [],
            title: ""
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        closeCictyDialog() {
            this.cictyDialog = false
            this.dialog = true
        },
        change(data, id) {
            this.cictyDialog = false
            this.dialog = true
            this.cicty = data

            this.category.map(item => {
                if (item.id == id) {
                    this.class2.splice(0, this.class2.length)
                    item.chidrens.map(sun => {
                        this.class2.push(sun)
                    })
                }
            })

        },
        clickCateGory() {
            this.dialog = true
        },
        //获取所有分类
        getCategory() {
            this.$http({
                url: this.$http.adornUrl("/shopvip/category/list"),
                methods: "get",
                params: this.$http.adornParams({
                    type: 1
                })
            }).then(({
                data
            }) => {
                if (data.code == 0) {
                    this.title = data.page[0].chidrens[0].chidrens[0].name
                    this.category = data.page;
                    this.change(data.page[0].name, data.page[0].id)
                    this.dialog = false
                    this.getDataList(data.page)
                    this.$emit("kechen", data.page[0].chidrens[0].chidrens[0])
                }
            })
        },
        cictyClick() {
            //this.$router.push('/cicty')
            this.cictyDialog = true
            this.dialog = false
        },

        //进行数据转换
        getDataList(data) {
            let list = [];
            let map = {}

            data.map(item => {
                let py = pinyin.pinyin.getFullChars(item.name)
                map.py = py
                list.push({
                    cityName: item.name,
                    py: py,
                    id: item.id
                })
            })
            this.cictyList = list

        },
        //点击课程
        flexBoxClick(event, data) {

            let classArray = document.getElementsByClassName('flex-demo')
            for (var i = 0; i < classArray.length; i++) {
                classArray[i].classList.remove('bacImage')
            }

            event.target.classList.add('bacImage')

            this.$emit("kechen", data)
            this.title = data.name
            this.dialog = false
        },
        clickenter(value, $event) {
            this.$router.push(`/videocheck/${value}`)
        }

    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.getCategory()
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

    }, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>

<style lang="less" scoped>
//@import '~vux/src/styles/close';
@import './categorydialog.less';
</style>
