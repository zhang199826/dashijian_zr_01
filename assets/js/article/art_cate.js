$(function () {
  var layer = layui.layer;
  var form = layui.form;
  // 获取文章分类列表
  initArtCateList();
  function initArtCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message);
        };
        var htmlStr = template('tpl_table', res);
        $('tbody').html(htmlStr);
      }
    });
  };

  // 添加文章分类
  var index_add = null;
  $("#btnAddCate").on("click", function () {
    index_add = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $("#dialog_add").html()
    });
  });
  // 添加文章分类
  $("body").on("submit", "#form_add", function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        };
        layer.msg(res.message);
        initArtCateList();
        layer.close(index_add);
      }
    });
  });

  // 修改文章分类
  var index_edit = null;
  $("tbody").on("click", ".btn_edit", function () {
    index_edit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $("#dialog_edit").html()
    });

    var Id = $(this).attr('data_id');

    // 修改文章分类
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + Id,
      success: function (res) {
        form.val('form_edit', res.data);
      }
    });
  });
  // 修改文章分类
  $("body").on("submit", "#form_edit", function (e) {
    e.preventDefault();
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        initArtCateList();
        layer.close(index_edit);
      }
    });
  });

  // 删除文章分类
  $("tbody").on("click", ".delete", function () {
    var id = $(this).attr('data_id');
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg(res.message);
          };
          layer.msg(res.message);
          initArtCateList();
          layer.close(index);
        }
      });
    });

  });

});