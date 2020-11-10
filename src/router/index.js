import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import mycentre from '@/components/mycentre/mycentre'
import homepage from '@/components/homepage/homepage'
import tryvideo from '@/components/tryvideo/tryvideo'
import payvideo from '@/components/payvideo/payvideo'
import videocategory from '@/components/videoList/videocategory'
import login from '@/components/user/login'
import my from '@/components/user/my'
import VueCookies from 'vue-cookies'
import address from '@/components/user/address'
import appendaddress from '@/components/user/appendaddress'
import product from '@/components/mycentre/product'
import myshoppingtrolley from '@/components/user/myshoppingtrolley'
import order from '@/components/user/order'
import organ from '@/components/organ/organ'
import organvideo from '@/components/organ/organvideo'
import tryvideomoduo from '@/components/tryvideo/tryvideomoduo'
import payvideomoduo from '@/components/payvideo/payvideomoduo'
import videocheck from '@/components/videoList/videocheck'
import productlist from '@/components/mycentre/productlist'
import productbyvalue from '@/components/mycentre/productbyvalue'
import payvideoorder from '@/components/payvideo/payvideoorder'
import myorder from '@/components/user/myorder'
import myclass from '@/components/user/myclass'
import mystudent from '@/components/user/mystudent';
import myorgan from '@/components/user/myorgan';
import mystudyplan from '@/components/user/mystudyplan';
import course from '@/components/homepage/course';
import courseorder from '@/components/homepage/courseorder';
import organcategory from '@/components/organ/organcategory';
import myrecord from '@/components/user/myrecord'
import myrecordlist from '@/components/user/myrecordlist'
import mystudentlist from '@/components/user/mystudentlist'
import student from '@/components/user/student';
import outschoole from '@/components/user/outschoole'
import outschoolelist from '@/components/user/outschoolelist'
import parentmessgaelist from '@/components/user/parentmessagelist'
import parentmessage from '@/components/user/parentmessage'
import stayplanlist from '@/components/user/stayplanlist'
import stayplan from '@/components/user/stayplan'
import userpoint from '@/components/user/userpoint'

Vue.use(Router)


const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}


const router = new Router({
  routes: [
    { path: '/', redirect: '/home/homepage' },
    { path: '*', redirect: '/home/homepage' },
    {
      path: '/home',
      name: 'home',
      component: home,
      children:[{
        path: '/home/mycentre',
			  name: 'mycentre',
			  component: mycentre
      },{
        path: '/home/homepage',
			  name: 'homepage',
        component: homepage,
        
      },
      {
        path:'/home/my',
        name:'my',
        component:my,
        meta: {
          neendLogin: true 
        }
      },
      {
        path:'/home/myshoppingtrolley/:id',
        name:'myshoppingtrolley',
        component:myshoppingtrolley
      },
     
      {
        path:'/home/organ',
        name:'organ',
        component:organ
      },
      {
        path:'/home/organvideo/:id',
        name:'organvideo',
        component:organvideo
      }
      
    ]
    },
    {
      path:'/order',
      name:'order',
      component:order
    },
      {
        path:'/product/:id',
        name:'product',
        component:product,
        meta: {
          neendLogin: true 
        }
      },
    {
      path: '/payvideo/:id',
      name: 'payvideo',
      component: payvideo,
      meta: {
        neendLogin: true 
      }
    },

    {
      path: '/tryvideo/:id',
      name: 'tryvideo',
      component: tryvideo,
    },
    
    {
      path: '/videocategory/:id',
      name: 'videocategory',
      component: videocategory,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path:'/address/:id',
      name:'adress',
      component:address
    },
    {
      path:'/appendaddress/:id',
      name:'appendaddress',
      component:appendaddress
    },
    {
      path:'/tryvideomoduo',
      name:'tryvideomoduo',
      component:tryvideomoduo
    },
    {
      path:'/payvideomoduo',
      name:'payvideomoduo',
      component:payvideomoduo
    },
    {
      path:'/videocheck/:value',
      name:'videocheck',
      component:videocheck
    },
    {
      path:'/productlist/:id',
      name:'productlist',
      component:productlist
    },
    {
      path:'/productbyvalue/:value',
      name:'productbyvalue',
      component:productbyvalue
    },
    {
      path:'/payvideoorder/:id',
      name:'payvideoorder',
      component:payvideoorder
    },
    {
      path:'/myorder',
      name:'myorder',
      component:myorder
    },
    {
      path:'/myclass',
      name:'myclass',
      component:myclass
    },{
      path:'/mystudent',
      name:'mystudent',
      component:mystudent
    },
    {
      path:'/myorgan',
      name:'myorgan',
      component:myorgan
    },
    {
      path:'/mystudyplan/:id',
      name:'mystudyplan',
      component:mystudyplan
    },
    {
      path:'/course/:id',
      name:'course',
      component:course
    },
    {
      path:'/courseorder/:id',
      name:'courseorder',
      component:courseorder,
      meta: {
        neendLogin: true 
      }
    },
    {
      path:'/organcategory/:id',
      name:'organcategory',
      component:organcategory
    },{
      path:'/myrecord/:id',
      name:"myrecord",
      component:myrecord
    },{
      path:'/myrecordlist',
      name:"myrecord",
      component:myrecordlist
    },
    {
      path:'/mystudentlist/:id',
      name:'mystudentlist',
      component:mystudentlist
    },
    {
      path:'/student/:id',
      name:'student',
      component:student
    },
    {
      path:'/outschoole/:cid/:id',
      name:'outschoole',
      component:outschoole
    },
    {
      path:'/outschoolelist/:id',
      name:'outschoolelist',
      component:outschoolelist
    },
    {
      path:'/parentmessgaelist',
      name:'parentmessgaelist',
      component:parentmessgaelist
    },
    {
      path:'/parentmessage/:id',
      name:'parentmessage',
      component:parentmessage
    },
    {
      path:'/stayplanlist',
      name:'stayplanlist',
      component:stayplanlist
    },
    {
      path:'/stayplan/:id',
      name:'stayplan',
      component:stayplan

    },
    {
      path:'/userpoint',
      name:'userpoint',
      component:userpoint
    }
  ]
})

router.beforeEach((to, from, next)=>{
  if(to.meta.neendLogin){
      let user = VueCookies.get("user")
      let organ = VueCookies.get("organ")
      //console.log(user)
      if(user == null && organ == null){
          next({
            path:'/login'
          })
      }else{
        next()
      }
  }else{
    next()
  }
})
export default router