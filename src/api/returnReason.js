import request from '@/utils/request'
export function fetchList(params) {
  return request({
    url:'/returnReason/list',
    method:'get',
    params:params
  })
}

export function deleteReturnReason(params) {
  return request({
    url:'/returnReason/delete',
    method:'post',
    params:params
  })
}

export function updateReturnReasonStatus(params) {
  return request({
    url:'/returnReason/update/status',
    method:'post',
    params:params
  })
}

export function createReturnReason(data) {
  return request({
    url:'/returnReason/create',
    method:'post',
    data:data
  })
}

export function getReturnReasonDetail(id) {
  return request({
    url:'/returnReason/'+id,
    method:'get'
  })
}

export function updateReturnReason(id,data) {
  return request({
    url:'/returnReason/update/'+id,
    method:'post',
    data:data
  })
}
