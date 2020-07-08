export * from './weChatAuth'

type defKey = "sting" | number | symbol

export const def = ( target: object, key: defKey) => {
    Object.defineProperty(target, key, {
        get() {
            return Reflect.get(target, key);
        },
        set(value:any) {
            throw `Cannot modify the ${String(key)} to ${JSON.stringify(value)}`;
        },
    });
};

export const defReadOnly = (target : object, key : string, value : any) => {
    Object.defineProperty(target, key, {
        enumerable: false,
        value,
    });
};

interface ProxyTarget {
    __od__ ? : boolean,
    __px__ ? : ProxyTarget,
    [propName :string] : any
}

export const proxy = (target : ProxyTarget) => {
    if (target.__od__) return target.__od__
    if (target.__px__) return target;
    let _obj : object = new Proxy(target, {
        get(target, key) {
            return Reflect.get(target, key);
        },
        set(target, key, value) {
            throw `Cannot modify the ${String(key)} to ${JSON.stringify(value)}`;
        },
    });
    // 添加
    defReadOnly(target, "__od__", _obj);
    defReadOnly(target, "__px__", true);
};

export const isArray = Array.isArray

export const isObject = (val: unknown): val is Record<any, any> => val !== null && typeof val === 'object'

export const isString = (val: unknown): val is string => typeof val === 'string'