import request from '@/utils/request'

export function fetchList(params) {
  return request({
    url:'/order/list',
    method:'get',
    params:params
  })
}

export function closeOrder(params) {
  return request({
    url:'/order/update/close',
    method:'post',
    params:params
  })
}

export function deleteOrder(params) {
  return request({
    url:'/order/delete',
    method:'post',
    params:params
  })
}

export function deliveryOrder(data) {
  return request({
    url:'/order/update/delivery',
    method:'post',
    data:data
  });
}

export function getOrderDetail(id) {
  return request({
    url:'/order/'+id,
    method:'get'
  });
}

export function updateReceiverInfo(data) {
  return request({
    url:'/order/update/receiverInfo',
    method:'post',
    data:data
  });
}

export function updateMoneyInfo(data) {
  return request({
    url:'/order/update/moneyInfo',
    method:'post',
    data:data
  });
}

export function updateOrderNote(params) {
  return request({
    url:'/order/update/note',
    method:'post',
    params:params
  })
}

// 退款相关API
export function getRefundList(params) {
  return request({
    url:'/refundOrder/list',
    method:'get',
    params:params
  })
}

export function getRefundDetail(id) {
  return request({
    url:'/refundOrder/detail/'+id,
    method:'get'
  })
}

export function auditRefund(data) {
  return request({
    url:'/refundOrder/audit',
    method:'post',
    data:data
  })
}

// 根据订单编号查询退款记录
export function getRefundByOrderSn(orderSn) {
  return request({
    url:'/refundOrder/list',
    method:'get',
    params: {
      orderSn: orderSn,
      pageNum: 1,
      pageSize: 1
    }
  })
}

