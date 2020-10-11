$(function () {
  var layer = layui.layer;
  var form = layui.form;
  var laypage = layui.laypage;
  // 定义过滤器
  template.defaults.imports.dataFormat = (date) => {
    const dt = new Date(date);
    var y = dt.getFullYear();
    var m = padZero(dt.getMonth() + 1);
    var d = padZero(dt.getDate());
    var hh = padZero(dt.getHours());
    var mm = padZero(dt.getMinutes());
    var ss = padZero(dt.getSeconds());
    return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss;
  };
  // 补零函数
  function padZero(n) {
    return n > 9 ? n : '0' + n;
  }

  var q = {
    pagenum: 1, //页码值
    pagesize: 2, // 默认显示几条数据
    cate_id: '', // 文章分类ID
    state: '' // 文章发布状态
  };

  // 获取文章类别
  initTable();
  initCate();
  // 获取表格数据
  function initTable() {
    $.ajax({
      method: 'GET',
      url: '/my/article/list',
      data: q,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        };
        layer.msg(res.message);
        // 使用模板引擎渲染数据
        var htmlStr = template('tpl_table', res);
        $('tbody').html(htmlStr);
        renderPage(res.total);
      }
    });
  };

  // 获取文章列表
  function initCate() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        };
        layer.msg(res.message);
        var htmlStr = template('tpl_cate', res);
        $('[name=cate_id]').html(htmlStr);
        form.render();
      }
    });
  };

  // 筛选表单绑定事件
  $("#form_search").on("submit", (e) => {
    e.preventDefault();
    var cate_id = $("[name=cate_id]").val();
    var state = $("[name=state]").val();
    q.cate_id = cate_id;
    q.state = state;
    initTable();
  });

  // 定义渲染分页方法
  function renderPage(total) {
    //执行一个laypage实例
    laypage.render({
      elem: 'pageBox', //注意，这里的 pageBox 是 ID，不用加 # 号
      count: total, //数据总数，从服务端得到
      limit: q.pagesize, // 每页显示数据数
      curr: q.pagenum, // 默认被选中分页
      layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
      limits: [1, 2, 3, 4, 5, 6],
      // 1.点击页码时，会触发jump 回调
      // 2. 调用了 laypage.render 会触发jump
      // 3.每页展示条数发生改变
      jump: function (obj, first) {
        //obj包含了当前分页的所有参数，比如：
        // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
        // console.log(obj.limit); //得到每页显示的条数
        q.pagenum = obj.curr;
        q.pagesize = obj.limit;
        //首次不执行
        if (!first) {
          initTable();
          //do something
        }
      }
    });
  };

  // 删除按钮绑定事件
  $('tbody').on('click', '.btn_dalete', function () {
    var id = $(this).attr('data_id');
    if ($('.btn_dalete').length === 1) {
      q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1;
    };
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      //do something
      $.ajax({
        method: 'GET',
        url: '/my/article/delete/' + id,
        success: (res) => {
          if (res.status !== 0) {
            return layer.msg(res.message);
          };
          layer.msg(res.message);
          // 数据删除完成后，判断当前页面是否还有数据
          initTable();
          layer.close(index);
        }
      });
    });
  });



});