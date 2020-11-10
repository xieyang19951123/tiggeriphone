<!--  -->
<template>
<div class=''>
    <x-header style=" width:100%;position:absolute;left:0;top:0;z-index:100;">
        <span slot="right" @click="deleted()" v-if="parentmessage.id !=0">删除</span>
    </x-header>
    <view-box ref="viewbox" body-padding-top="37px">
        <group>
            <x-input title="与孩子关系：" v-model="parentmessage.childs"></x-input>
            <x-input title="姓名：" v-model="parentmessage.pname"></x-input>
            <x-input title="年龄：" type="number" v-model="parentmessage.page"></x-input>
            <x-input title="工作单位：" v-model="parentmessage.addresswork"></x-input>
            <x-input title="电话号码：" v-model="parentmessage.piphone"></x-input>
            <x-textarea title="特长：" v-model="parentmessage.techang"></x-textarea>
            <x-textarea title="兴趣：" v-model="parentmessage.intersing"></x-textarea>
            <x-textarea title="兼职或创业意向：" v-model="parentmessage.partjob"></x-textarea>
            <x-button type="primary" @click.native="save() ">保存</x-button>

        </group>
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
            parentmessage: {
                childs: "",
                pname: "",
                page: "",
                addresswork: "",
                piphone: "",
                techang: "",
                intersing: "",
                partjob: "",
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
                url: this.$http.adornUrl(`/tigger/parent/${this.parentmessage.id == 0?'save':'edit'}`),
                method: 'post',
                //params: this.http.adornParams({ })
                data: this.$http.adornData({
                    childs: this.parentmessage.childs,
                    pname: this.parentmessage.pname,
                    page: this.parentmessage.page,
                    addresswork: this.parentmessage.addresswork,
                    piphone: this.parentmessage.piphone,
                    techang: this.parentmessage.techang,
                    intersing: this.parentmessage.intersing,
                    partjob: this.parentmessage.partjob,
                    id: this.parentmessage.id == 0 ? undefined : this.parentmessage.id,
                    uid: this.$cookies.get("user").id,
                    showStatus: 1
                })
            }).then(({
                data
            }) => {
                this.$vux.loading.hide()
                this.$router.push("/parentmessgaelist")
            });
        },
        getparentbyid() {
            console.log(1)
            this.$http({
                url: this.$http.adornUrl('/tigger/parent/getbyid'),
                method: 'get',
                params: this.$http.adornParams({
                    id: this.parentmessage.id
                })
            }).then(({
                data
            }) => {
                // console.log(1)
                if (data.code == 0) {
                    this.parentmessage.childs = data.page.childs
                    this.parentmessage.pname = data.page.pname
                    this.parentmessage.page = data.page.page
                    this.parentmessage.addresswork = data.page.addresswork
                    this.parentmessage.piphone = data.page.piphone
                    this.parentmessage.techang = data.page.techang
                    this.parentmessage.partjob = data.page.partjob
                    this.parentmessage.id = data.page.id
                    this.parentmessage.intersing = data.page.intersing
                }
            })
        },
        deleted() {
            let ids = [this.parentmessage.id]
            const _this = this // 需要注意 onCancel 和 onConfirm 的 this 指向
            this.$vux.confirm.show({
                // 组件除show外的属性
                title: '提示',
                content: '是否删除？',
                onCancel() {

                },
                onConfirm() {
                    _this.$http({
                        url: _this.$http.adornUrl('/tigger/parent/deleted'),
                        method: 'post',
                        //params: this.http.adornParams({ })
                        data: _this.$http.adornData(ids, false)
                    }).then(({
                        data
                    }) => {
                        _this.$router.push("/parentmessgaelist")
                    });

                }
            })

        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.parentmessage.id = this.$route.params.id
        if (this.$route.params.id != 0) {
            this.getparentbyid()
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
