
interface Week {
    [key : string] : string
}

interface Time{
    [key : string] : number
}

"format" in Date ||
    (Date.prototype.format = function (fmt = "yyyy-MM-dd hh:mm:ss"): string {
        let _this: Date = this;
        let t: Time = {
            "M+": _this.getMonth() + 1, // 月份
            "d+": _this.getDate(), //日
            "h+": _this.getHours(), //小时
            "m+": _this.getMinutes(), //分
            "s+": _this.getSeconds(), //秒
            "q+": Math.floor((_this.getMonth() + 3) / 3), //季度
            "S": _this.getMilliseconds(), //毫秒
        };
        // 周
        let w : Week = {
            "0": "\u65e5", //日
            "1": "\u4e00", //一
            "2": "\u4e8c", //二
            "3": "\u4e09", //三
            "4": "\u56db", //四
            "5": "\u4e94", //五
            "6": "\u516d", //六
        };
        // 年
        if(/(y+)/.test(fmt)){
            fmt = fmt.replace(RegExp.$1, (_this.getFullYear()+'').substr(4-RegExp.$1.length))
        }
        // 周
        if(/(E+)/.test(fmt)){
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + w[this.getDay() + ""]);
        }

        for (let k in t) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (t[k]+"") : (("00" + t[k]).substr(("" + t[k]).length)));
            }
        }

        return fmt;
    });
