import mpx, { createComponent, Mpx } from '@mpxjs/core'
import TabbarMenus from '@/config/tabbarMenu.config'
type MPX_KEYS = keyof Mpx;
type MPX_FN = {
    (params:any):void
}

// type MPX_FN_1 = Extract<Mpx, (params:any)=>void>

createComponent({
    //  组件参数
      data: {
        isShow : false,
        active: 0,
        color: "#666666",
        selectedColor: "#ff5252",
        list: TabbarMenus
    },
    lifetimes : {
        ready(){
            setTimeout(()=>{
                this.isShow = true
            })
        }
    },
    methods:{
        switchTab(e:any) {
            const {path:url, navigator, index } = e.currentTarget.dataset
            mpx[(navigator as MPX_KEYS)] && (mpx[(navigator as MPX_KEYS)] as MPX_FN)({url});
        }
    }
  })