import API from "@/shared/api";
import store from "@/store/index";
import mpx, { createPage } from "@mpxjs/core";
import XFetch, { FetchResult } from "@/plugins/fetch";
mpx.use(XFetch);

interface MessageDict {
    id: string,
    msgName: string,
    [key: string]: any
}

interface MessagesItem {
    groupName: string
    messageDicts: Array<MessageDict>
}

type MessagesOptions = Array<MessagesItem>


createPage({
    data: {
        messages: [], // 配置列表
        refuseMessageIds: [], // 禁用的消息
        taskDep: null, // 操作任务
        // van-action-sheet 参数
        sheetData: {
            show: false,
            actions: [{ name: '确认关闭', color: '#FF0000' }],
            description: '关闭后，将不再发送中奖提醒消息通知。'
        }
    },
    computed: {
        ...store.mapState(['buyerId'])
    },
    onLoad() {
        this.getMessageSet()
    },
    getMessageSet() {
        const { buyerId } = this;
        this.$post(API.BUYER_MESSAGE_CONFIG_QUERY, { buyerId })
            .then(({ code, data }: FetchResult) => {
                if (code === '000') {
                    const { messages, refuseMessageIds } = data;
                    this.addActionStatus(messages);
                    this.messages = messages || []
                    this.refuseMessageIds = refuseMessageIds || []
                }
            })
            .catch((err: any) => { })
    },
    addActionStatus(data: MessagesOptions): void {
        data.forEach((element: MessagesItem) => {
            let { messageDicts } = element;
            messageDicts.forEach((item: MessageDict) => {
                item.loading = false;
            })
        });
    },
})