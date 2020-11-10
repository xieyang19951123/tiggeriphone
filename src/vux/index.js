import Vue from 'vue';

import { XDialog,ViewBox,
    XInput,
    TransferDomDirective as TransferDom,
    Flexbox,
    FlexboxItem,
    Popup,Swiper,XImg,XHeader, Group, Cell, InlineXNumber,SwiperItem,AlertPlugin ,Alert ,Badge,Checklist
    ,Checker, CheckerItem,XNumber,PopupRadio,XSwitch,Confirm,ConfirmPlugin ,FormPreview,XButton,Grid,GridItem,GroupTitle ,Actionsheet,Datetime,XTextarea,XTable
} from 'vux'


Vue.component('x-table', XTable)

Vue.component('x-textarea', XTextarea)
Vue.component('datetime', Datetime)
Vue.component('x-button', XButton)
Vue.component('confirm', Confirm)
Vue.component('x-switch', XSwitch)
Vue.component('popup-radio', PopupRadio)
Vue.component('x-input', XInput)
Vue.component('view-box', ViewBox )
Vue.component('x-dialog', XDialog )
Vue.component('flexbox',  Flexbox )
Vue.component('flexbox-item', FlexboxItem )
Vue.component('swiper', Swiper)
Vue.component('x-img', XImg)
Vue.component('x-header', XHeader)
Vue.component('group', Group)
Vue.component('cell', Cell)
Vue.component('inline-x-number', InlineXNumber)
Vue.component('swiper-item', SwiperItem)
Vue.component('alert', Alert)
Vue.component('badge', Badge)
Vue.component('checklist', Checklist)
Vue.component('checker', Checker)
Vue.component('checker-item', CheckerItem)
Vue.component('x-number', XNumber)
Vue.component('grid', Grid)
Vue.component('grid-item', GridItem)
Vue.component('group-title', GroupTitle)
Vue.component('actionsheet', Actionsheet)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.component('form-preview', FormPreview)
