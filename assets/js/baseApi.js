// 每次调用ajax请求之前会先调用这个函数,这个函数可以拿到我们给ajax传递的数据对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://www.liulongbin.top:3007' + options.url
})