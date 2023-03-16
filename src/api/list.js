import request from '@/utils/request'

export function getList(params) {
    return request({
      url: '/book/page',
      method: 'get',
      params
    })
  }

  export function saveBook(data) {
    return request({
      url: '/book/save',
      method: 'post',
      data
    })
  }

  export function getAuthorList(params) {
    return request({
      url: '/author/page',
      method: 'get',
      params
    })
  }

  export function deleteBook(id) {
    return request({
      url: `/book/delete/${id}`,
      method: 'get',
      id
    })
  }
  
  export function saveAuthor(data) {
    return request({
      url: 'author/save',
      method: 'post',
      data
    })
  }
  
  export function deleteAuthor(id) {
    return request({
      url: `/author/delete/${id}`,
      method: 'get',
      id
    })
  }
 
  export function saveUser(data) {
    return request({
      url: 'customer/save',
      method: 'post',
      data
    })
  }
  
  export function getUserList(params) {
    return request({
      url: '/customer/page',
      method: 'get',
      params
    })
  }
  
  export function Detail(id) {
    return request({
      url: `/customer/info/${id}`,
      method: 'get',
      id
    })
  }

  export function buyBook(data) {
    return request({
      url: '/customer/buy',
      method: 'post',
      data
    })
  }
  
  export function deleteBuyBook(params) {
    return request({
      url: '/customer/deleteBook',
      method: 'get',
      params
    })
  }

  export function deleteUser(id) {
    return request({
      url: `/customer/delete/${id}`,
      method: 'get',
      id
    })
  }