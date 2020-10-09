$(function () {
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称必须在1 ~ 6个字符之间'
      };
    }
  });

  // 初始化用户信息
  initUserInfo();
  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        };
        form.val('formUserInfo', res.data);
      }
    });
  };


  $('#btnReset').on('click', function (e) {
    e.preventDefault();
    initUserInfo();
  });

  // 提交用户修改
  $('.layui-form').on('submit', function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        };
        window.parent.getUserInfo();
      }
    })
  })








});