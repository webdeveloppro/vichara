$(function() {
$(document).ready(function() {
  $(document).foundation();
  $("#button1").click(function() {
      $("#example-vert-tabs").append('<li class="tabs-title"><a href="#panel7v">Tab 7</a></li>');
      $("#tab_content").append('<div class="tabs-panel" id="panel7v"><p>Test7</p></div>');
      $(".tabs").foundation();
  });
});
});