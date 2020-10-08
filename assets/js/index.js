$(function () {
  getUserInfo();

  var layer = layui.layer;
  $('#btnLogout').on('click', function () {
    layer.confirm('确认退出登录?', { icon: 3, title: '提示' }, function (index) {
      localStorage.removeItem("token");
      location.href = '/login.html';
      // 关闭弹出层
      layer.close(index);
    });
  });




});

// 获取用户基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    // 请求头配置对象
    // headers: {
    //   Authorization: localStorage.getItem('token') || ''
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg(res.message);
      };
      renderAvatar(res.data);
    },
    // 无论成功或者失败，都会触发 complete 方法
    // complete: function (res) {
    //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //     localStorage.removeItem("token");
    //     location.href = '/login.html';
    //   }
    // }
  });
};

// 渲染用户头像
function renderAvatar(user) {
  var name = user.nickname || user.username;
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show();
    $('.text-avatar').hide();
  } else {
    $('.layui-nav-img').hide();
    var first = name[0].toUpperCase();
    $('.text-avatar').html(first).show();
  };
};