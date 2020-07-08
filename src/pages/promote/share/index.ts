import mpx, { createPage, Mpx } from "@mpxjs/core";
import store from '@/store/index'
import API from "@/shared/api";
import { FetchResult } from "@/plugins/fetch";
import drawQrcode from "weapp-qrcode"

import createQRCode from '@/shared/qrcode'

createPage({
    data:{
        qr : null
    },
    onLoad(){
        this.init()
    },
    ready(){

    },
    init(){
        mpx.nextTick(()=>{
            this.drawQrcode();
        })
    },
    drawQrcode(){
        let _this = this;
        let installQr = new createQRCode({
            text : "hello world",
            canvasId : "myQrcode",
            width : 200,
            height : 200,
            colorDark : "green",
            logo : {
                image : require("@/static/images/icon/icon-promote-bindUser.png"),
                x : 70,
                y : 70,
                width : 60,
                height : 60
            }
        })
        console.log( installQr );
        installQr.draw(()=>{
            mpx.canvasToTempFilePath({
                x : 0,
                y : 0,
                width : 200,
                height : 200,
                destWidth: 400,
                destHeight: 400,
                canvasId: 'myQrcode',
                success(res) {
                    _this.qr = res.tempFilePath;
                }
            })
        })

        return;
        drawQrcode({
            width : 200,
            height : 200,
            canvasId: 'myQrcode',
            text: 'https://github.com/yingye',
            image : {
                imageResource : require("@/static/images/icon/icon-promote-bindUser.png"),
                dx: 70,
                dy: 70,
                dWidth: 60,
                dHeight: 60
            },
            callback(e:any){
                console.log('绘制完成',e);
                // let ctx = mpx.createCanvasContext('myQrcode', this);
                mpx.canvasToTempFilePath({
                    x : 0,
                    y : 0,
                    width : 200,
                    height : 200,
                    destWidth: 400,
                    destHeight: 400,
                    canvasId: 'myQrcode',
                    success(res) {
                        _this.qr = res.tempFilePath;
                        console.log('图片信息',res.tempFilePath)
                    }
                })

                // ctx.drawImage(require("@/static/images/icon/icon-promote-bindUser.png"),0,0)
                // console.log( ctx );
                
                // this.qr = (ctx as any).toDataURL();
            }
        })
    }
})