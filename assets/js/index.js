$(function () {
    getUserInfo()

    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录?', {icon: 3, title: '提示'}, function (index) {
            //do something
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index)
        })
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        // header: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) return layui.layer.msg('获取用户信息失败!')
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        },
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })
}

// 渲染用户的头像
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html(`欢迎 ${name}`)
    if (user.user_pic !== null) {
        //渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('text-avatar').html(first).show()
    }
}