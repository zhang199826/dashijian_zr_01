// 每次调用 ajax 都会先调用这个函数
$.ajaxPrefilter(function (options) {
  console.log(options);
  options.url = 'http://ajax.frontend.itheima.net' + options.url;
})