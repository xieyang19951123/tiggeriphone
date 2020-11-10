<!--  -->
<template>
<div class=''>

    <x-header style=" width:100%;position:absolute;left:0;top:0;z-index:100;" @on-click-back="$router.push(`/home/my`)" :left-options="{preventGoBack: true}">
        <span slot="right" @click="$router.push(`/stayplan/0`)">新增</span>
    </x-header>
    <view-box ref="viewbox" body-padding-top="50px">
        <datetime title="时间规划" :min-year="1950" v-model="stayplan.plantime"></datetime>
        <x-input title="姓名" v-model="stayplan.planname"></x-input>
        <x-input title="年龄" type="number" v-model="stayplan.page"></x-input>
        <x-input title="科目" v-model="stayplan.kemu"></x-input>
        <x-input title="目标" v-model="stayplan.target"></x-input>
        <x-button type="primary" @click.native="save">保存</x-button>
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
            stayplan: {
                plantime: "",
                planname: '',
                page: null,
                kemu: '',
                target: "",
                showStatus: 1,
                id: 0
            }
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        save() {
            this.$vux.loading.show()
            this.$http({
                url: this.$http.adornUrl(`/tigger/stayplan/${this.stayplan.id==0?"save":"edit"}`),
                method: 'post',
                //params: this.http.adornParams({ })
                data: this.$http.adornData({
                    plantime: this.stayplan.plantime,
                    planname: this.stayplan.planname,
                    page: this.stayplan.page,
                    kemu: this.stayplan.kemu,
                    target: this.stayplan.target,
                    showStatus: this.stayplan.showStatus,
                    id: this.stayplan.id,
                    uid: this.$cookies.get("user").id
                })
            }).then(({
                data
            }) => {
                this.$vux.loading.hide()
                this.$router.push("/stayplanlist")
            });
        },
        deleted() {
            const _this = this // 需要注意 onCancel 和 onConfirm 的 this 指向
            this.$vux.confirm.show({
                // 组件除show外的属性
                title: '提示',
                content: '是否删除？',
                onCancel() {

                },
                onConfirm() {
                    let ids = [_this.stayplan.id]
                    _this.$http({
                        url: _this.$http.adornUrl('/tigger/stayplan/deleted'),
                        method: 'post',
                        //params: this.http.adornParams({ })
                        data: _this.$http.adornData(
                            ids, false)
                    }).then(({
                        data
                    }) => {
                        _this.$router.push(`/stayplanlist`)
                    });
                }
            })
        },
        seletebyid() {
            this.$http({
                url: this.$http.adornUrl('/tigger/stayplan/getbyid'),
                method: 'get',
                params: this.$http.adornParams({
                    id: this.stayplan.id
                })
            }).then(({
                data
            }) => {
                if (data.code == 0) {
                    this.stayplan.plantime = data.page.plantime
                    this.stayplan.planname = data.page.planname
                    this.stayplan.page = data.page.page
                    this.stayplan.kemu = data.page.kemu
                    this.stayplan.target = data.page.target
                    this.stayplan.id = data.page.id
                }
            })
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.stayplan.id = this.$route.params.id
        if (this.$route.params.id != 0 && this.$route.params.id != undefined) {
            this.seletebyid()
        }
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
