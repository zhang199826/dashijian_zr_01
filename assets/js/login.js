$(function () {
  // 点击去注册账号
  $("#link_reg").on("click", function () {
    $(".login_box").hide();
    $(".reg_box").show();
  });
  // 点击去登陆
  $("#link_login").on("click", function () {
    $(".reg_box").hide();
    $(".login_box").show();
  });

  // 从layui 上获取form对象
  var form = layui.form;
  var layer = layui.layer;
  // 通过 form.verify 自定义校验规则
  form.verify({
    // 自定义一个 pwd 校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 校验两次密码是否一致
    repwd: function (value) {
      var pwd = $(".reg_box [name=password]").val();
      if (pwd !== value) {
        return '两次密码不一致!'
      };
    },
    user: [/^[a-zA-Z0-9]{6,10}$/, '用户名必须6-10位，且不能出现空格']
  });

  // 注册功能
  $("#form_reg").on("submit", function (e) {
    e.preventDefault();
    var data = {
      username: $("#form_reg [name=username]").val(), password: $("#form_reg [name=password]").val()
    };
    $.post('/api/reguser', data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message);
      };
      layer.msg('注册成功，请登录');
      $("#link_login").click();
    })
  });

  // 登录功能
  $("#form_login").submit(function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败！')
        };
        layer.msg('登陆成功');
        // 登录成功得到的 token 字符串保存到本地存储中
        localStorage.setItem('token', res.token);
        location.href = '/index.html';
      }
    })
  })






});