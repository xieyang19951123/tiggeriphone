<!--  -->
<template>
<div class=''>
    <x-header style=" width:100%;position:absolute;left:0;top:0;z-index:100;">

        <span slot="right" v-if="outschoole.id!=0&&outschoole.id!=null" @click="deleted()">删除</span>
    </x-header>
    <view-box ref="viewbox" body-padding-top="37px">
        <group>
            <x-input title="科目：" v-model="outschoole.cname"></x-input>
            <datetime title="上课时间：" v-model="outschoole.classtime" :min="1950"></datetime>
            <checklist title="线上教学/线下教学" :options="checklist" :max="1" v-model="outschoole.teaching"></checklist>
            <checklist title="大班制/小班制度/1对1" :options="checklist1" :max="1" v-model="outschoole.tsystem"></checklist>
            <x-input title="培训机构名" v-model="outschoole.oname"></x-input>
            <x-input title="授课教师" v-model="outschoole.teacher"></x-input>
            <datetime title="培训开始时间" v-model="outschoole.startTime" :min="1950"></datetime>
            <datetime title="培训结束时间" v-model="outschoole.endTime" :min="1950"></datetime>
        </group>
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
            checklist: ['线上教学', '线下教学'],
            checklist1: ['大班制', '小班制', '1对1'],
            outschoole: {
                id: 0,
                cname: "",
                classtime: '',
                teaching: [],
                tsystem: [],
                oname: '',
                teacher: '',
                startTime: '',
                endTime: '',
                showStatus: 1,
                cid: ''
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
                url: this.$http.adornUrl(this.outschoole.id == 0 ? "/tigger/outschoole/save" : "/tigger/outschoole/edit"),
                method: 'post',
                //params: this.http.adornParams({ })
                data: this.$http.adornData({
                    id: this.outschoole.id,
                    cname: this.outschoole.cname,
                    classTime: this.outschoole.classtime,
                    teaching: this.outschoole.teaching[0],
                    tsystem: this.outschoole.tsystem[0],
                    oname: this.outschoole.oname,
                    teacher: this.outschoole.teacher,
                    startTime: this.outschoole.startTime,
                    endTime: this.outschoole.endTime,
                    showStatus: 1,
                    cid: this.outschoole.cid
                })
            }).then(({
                data
            }) => {
                this.$vux.loading.hide()
                this.$router.push(`/outschoolelist/${this.outschoole.cid}`)
            });
        },
        getoutschoolebyid() {
            this.$http({
                url: this.$http.adornUrl('/tigger/outschoole/getoutschoole'),
                method: 'get',
                params: this.$http.adornParams({
                    "id": this.outschoole.id
                })
            }).then(({
                data
            }) => {
                console.log(data)
                if (data.code == 0 && data.code.page != null) {
                    this.outschoole.id = data.page.id
                    this.outschoole.cname = data.page.cname
                    this.outschoole.classtime = data.page.classTime
                    this.outschoole.teaching = [data.page.teaching]
                    this.outschoole.tsystem = [data.page.tsystem]
                    this.outschoole.oname = data.page.oname
                    this.outschoole.teacher = data.page.teacher
                    this.outschoole.startTime = data.page.startTime
                    this.outschoole.endTime = data.page.endTime
                }

            })
        },
        deleted() {
            //console.log(this.outschoole.id)
            const _this = this // 需要注意 onCancel 和 onConfirm 的 this 指向
            this.$vux.confirm.show({
                // 组件除show外的属性
                title: '提示',
                content: '是否删除？',
                onCancel() {

                },
                onConfirm() {
                    let ids = [_this.outschoole.id]
                    _this.$http({
                        url: _this.$http.adornUrl('/tigger/outschoole/deleted'),
                        method: 'post',
                        //params: this.http.adornParams({ })
                        data: _this.$http.adornData(
                            ids, false)
                    }).then(({
                        data
                    }) => {
                        _this.$router.push(`/outschoolelist/${_this.outschoole.cid}`)
                    });

                }
            })

        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.outschoole.cid = this.$route.params.cid
        this.outschoole.id = this.$route.params.id
        if (this.$route.params.id != null & this.$route.params.id != undefined) {
            this.getoutschoolebyid()
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
