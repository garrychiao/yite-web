import _ from 'lodash';

const ORDER_STATUS = [
    {
        key: 'DRAFT',
        value: '草稿',
        cancelable: true,
        color: '#FFbb00'
    },
    {
        key: 'INIT',
        value: '訂單建立，待付款',
        cancelable: true,
        color: '#FFbb00'
    },
    {
        key: 'WAITING',
        value: '付款完成，等待確認',
        cancelable: true,
        color: '#FFbb00'
    },
    {
        key: 'CONFIRM',
        value: '訂單已確認，出貨中',
        cancelable: false,
        color: '#000'
    },
    {
        key: 'SHIP',
        value: ' 已出貨',
        cancelable: false,
        color: '#000'
    },
    {
        key: 'FINISH',
        value: '訂單已完成',
        cancelable: false,
        color: '#41980a'
    },
    {
        key: 'CANCEL',
        value: '訂單取消',
        cancelable: false,
        color: '#f43b41'
    },
    {
        key: 'OVERDUE',
        value: '訂單過期',
        cancelable: false,
        color: '#f43b41'
    },
]

export const getOrderStatus = (key) => {
    const target = _.find(ORDER_STATUS, {key});
    if (!target) {
        return {
            key, 
            value: '不明',
        }
    }
    return target
}