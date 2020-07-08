// 声明
declare module "@mpxjs/fetch/src/xfetch" {
    import { Mpx } from "@mpxjs/core";
    interface XFetch_class {
        new(options?: any, MPX?: Mpx): any;
    }
    let XFetchClass: XFetch_class;
    export default XFetchClass;
}

declare module "weapp-qrcode" {
    let drawQrcode: any;
    export default drawQrcode;
}

declare module "weapp-qrcode/src/qrcode" {
    interface CorrectLevel {
        [key : string] : number
    }
    let QRCode: any, QRErrorCorrectLevel: CorrectLevel;
    export { QRCode, QRErrorCorrectLevel };
}

// import 图片
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";

declare interface Date {
    format(fmt?: string): string;
}
