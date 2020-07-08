import { QRCode, QRErrorCorrectLevel } from "weapp-qrcode/src/qrcode";
import mpx from '@mpxjs/core'

interface LogoImage {
    image: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

interface Options {
    text: string;
    canvasId?: string;
    _this?: any;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    typeNumber?: number;
    correctLevel?: number;
    colorDark?: string;
    colorLight?: string;
    // 中间logo
    logo?: LogoImage;
    ctx?: WechatMiniprogram.CanvasContext;
}

class CreateQRCode {
    text: string;
    canvasId: string | null;
    _this: any;
    width: number;
    height: number;
    x: number;
    y: number;
    typeNumber: number;
    correctLevel: number;
    colorDark: string;
    colorLight: string;
    // 中间logo
    logo: LogoImage | null;
    ctx: WechatMiniprogram.CanvasContext | null;
    callback: Function | null

    qrcode: any
    canvasContext: WechatMiniprogram.CanvasContext

    constructor(options: Options) {
        // 合并
        this.text = options.text
        this.canvasId = options.canvasId || null
        this._this = options._this || null
        this.width = options.width || 200
        this.height = options.height || 200
        this.x = options.x || 0
        this.y = options.y || 0
        this.typeNumber = options.typeNumber || -1
        this.correctLevel = options.correctLevel || QRErrorCorrectLevel.H
        this.colorDark = options.colorDark || "#000000"
        this.colorLight = options.colorLight || "#ffffff"
        this.logo = options.logo || null
        this.ctx = options.ctx || null
    }
    // 绘制
    draw(callback?:Function) {
        if (!this.canvasId && !this.ctx) {
            console.warn('please set canvasId or ctx!')
            return
        }
        this.canvasContext = this.createCanvas()
        this.qrcode = this.createQRcode()
        this.drawTextCanvas()
        this.drawLogoCanvas()
        this.canvasContext.draw(false, () => {
            // 绘制完成
            typeof callback === "function" && callback(this.canvasContext, this.qrcode)
        })
    }
    drawTextCanvas() {
        const { qrcode, width, height, colorDark, colorLight, canvasContext, x, y } = this;
        let moduleCount = qrcode.getModuleCount();
        let tileW = width / moduleCount
        let tileH = height / moduleCount

        for (let row = 0; row < moduleCount; row++) {
            for (let col = 0; col < moduleCount; col++) {
                var style = qrcode.isDark(row, col) ? colorDark : colorLight
                canvasContext.setFillStyle(style)
                var w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW))
                var h = (Math.ceil((row + 1) * tileW) - Math.floor(row * tileW))
                canvasContext.fillRect(Math.round(col * tileW) + x, Math.round(row * tileH) + y, w, h)
            }
        }
    }
    drawLogoCanvas() {
        const { logo } = this
        if (logo) {
            this.canvasContext.drawImage(logo.image, logo.x, logo.y, logo.width, logo.height)
        }
    }
    createCanvas() {
        const { ctx, _this, canvasId } = this
        if (ctx) {
            return ctx
        } else if (_this) {
            return mpx.createCanvasContext((canvasId as string), _this)
        } else {
            return mpx.createCanvasContext((canvasId as string))
        }
    }
    createQRcode() {
        const { text, typeNumber, correctLevel } = this
        let qrcode = new QRCode(typeNumber, correctLevel);
        qrcode.addData(utf16to8(text))
        qrcode.make()
        return qrcode
    }
}


function utf16to8(str: string) {
    var out, i, len, c
    out = ''
    len = str.length
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i)
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i)
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F))
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F))
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F))
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
        }
    }
    return out
}


export default CreateQRCode