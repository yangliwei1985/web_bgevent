// 每次调用ajax请求之前会先调用这个函数,这个函数可以拿到我们给ajax传递的数据对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url
    // options.url = 'http://api-breakingnews-web.itheima.net/' + options.url
    // 统一为有权限的接口设置header请求头
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载complete回调函数
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }

})