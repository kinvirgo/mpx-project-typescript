interface CancelTokenClass {
  new(...args: any): {
    token: Promise<any>
    exec(msg?: any): Promise<any>
  }
}

interface fetchOption extends WechatMiniprogram.RequestOption {
  params?: object
  cancelToken?: InstanceType<CancelTokenClass>['token']
  emulateJSON?: boolean
}

interface CreateOption {
  limit?: number
  delay?: number
  ratio?: number
}

type fetchT = (option: fetchOption, priority?: 'normal' | 'low') => Promise<WechatMiniprogram.RequestSuccessCallbackResult>
type addLowPriorityWhiteListT = (rules: string | RegExp | Array<string | RegExp>) => void
type createT = (option?: CreateOption) => xfetch

interface xfetch {
  fetch: fetchT,
  addLowPriorityWhiteList: addLowPriorityWhiteListT,
  CancelToken: CancelTokenClass,
  create: createT,
  interceptors: {
    request: {
      use: (fn: (config: any) => any) => void
    },
    response: {
      use: (fn: (config: any) => any) => void
    }
  }
}

interface XFetchClass {
  new(option?: CreateOption): {
    create: createT
    addLowPriorityWhiteList: addLowPriorityWhiteListT
    fetch: fetchT
    lock: () => void
    unlock: () => void
  }
}

declare const mpxFetch: {
  install: (...args: any) => any,
  XFetch: XFetchClass
}
