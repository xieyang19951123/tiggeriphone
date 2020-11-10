<!--  -->
<template>
<div id="app">
    <div class="city city-wap">
        <div class="search">
            <img src="../../assets/x.png" @click="closeDialog" />
        </div>
        <div class="city-list">
            <div class="block-60"></div>
            <div v-for="item in cityListData" class="clearfix">
                <p :id="item.ckey">{{item.ckey}}</p>
                <ul>
                    <li v-for="ritem in item.cityList" @click="change(ritem.airportName,ritem.id)">{{ritem.airportName}}</li>
                </ul>
            </div>
        </div>
        <div class="filter">
            <div v-for="item in cityListKey" @click="switchKey(item)">{{item}}</div>
        </div>
        <div class="active-key" v-if="activeKey">{{activeKey}}</div>
    </div>
</div>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import cicty from '../../untils/city'
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            cityListData: [],
            cityListKey: [],
            activeKey: ''
        };
    },
    props: ['cictyList'],
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {
        cityListData(val) {
            this.getcityListKey(val)
        },
        cictyList() {
            this.getcityListData()
        }

    },
    //方法集合
    methods: {

        getcityListData() {
            let map = {};
            let temps = [];
            this.cictyList.map(item => {
                let ekey = item.py.charAt(0).toUpperCase();
                temps = map[ekey] || [];
                temps.push({
                    airportCode: item.py,
                    airportName: item.cityName,
                    id: item.id
                });
                map[ekey] = temps;

            })

            let list = [];
            for (let gkey in map) {
                list.push({
                    ckey: gkey,
                    cityList: map[gkey]
                })
            }
            list = list.sort((li1, li2) => li1.ckey.charCodeAt(0) - li2.ckey.charCodeAt(0));
            this.cityListData = list
        },
        getcityListKey(val) {
            let cityListKey = [];
            val.map(item => {
                cityListKey.push(item.ckey);
            })
            this.cityListKey = cityListKey;
        },
        switchKey(key) {
            // 当前选中的字母
            this.activeKey = key;
            // 1秒后清空，让`active-key`隐藏
            setTimeout(() => {
                this.activeKey = '';
            }, 1000)
            // 获取当前字母来cityList中距离顶部的位置
            let targetTop = document.querySelector('#' + key + '').offsetTop;
            window.scrollTo({
                top: targetTop - 60, // 60是search的高度
                behavior: "smooth"
            });
        },
        change(val, id) {
            this.$emit('event1', val, id)
        },
        closeDialog() {
            this.$emit('event2')
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        //console.log(cicty.cities)

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
.city-wap {
    color: #3b4f62;

    .clearfix {
        &:after {
            content: '';
            display: block;
            clear: both;
        }
    }

    p {
        background: #fff;
        margin-bottom: 10px;
        padding: 0 12px;
    }

    .search {
        position: fixed;
        top: 0;
        width: 100%;
        height: 50px;
        background: rgb(255, 255, 255);

        img {
            height: 30px;
            line-height: 50px;
        }
    }

    .city-list {
        .block-60 {
            height: 60px;
        }

        ul {
            padding: 0 10px;

            li {
                list-style: none;
                display: inline-block;
                margin-right: 10px;
                width: 29%;
                margin-bottom: 8px;
                line-height: 35px;
                text-align: center;
                color: #333;
                border-radius: 3px;
                background: #fff;
                font-size: 14px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                padding: 0 2px;
            }
        }
    }

    .filter {
        position: fixed;
        right: 3px;
        top: 60px;
        font-size: 15px;

        div {
            margin-top: 2px;
            text-align: center;
        }
    }

    .active-key {
        position: fixed;
        width: 100px;
        height: 100px;
        line-height: 100px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 100;
        background: #dedede;
        color: #fff;
        border-radius: 100%;
        text-align: center;
        font-size: 40px;
    }
}
</style>>
