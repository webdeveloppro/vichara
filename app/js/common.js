$(function() {
$(document).ready(function() {
  $(document).foundation();
  $("#button1").click(function() {
      $("#example-vert-tabs").append('<li class="tabs-title"><a href="#panel7v">Tab 7</a></li>');
      $("#tab_content").append('<div class="tabs-panel" id="panel7v"><p>Test7</p></div>');
      $(".tabs").foundation();
  });
});

    $(document).ready(function() {
        $('.block-first-stage .first-block .toggle').on('click', function () {
            $('.first-block-active').toggle();
            $('.first-block').toggle();
        });
    });
    $(document).ready(function() {
        $('.block-first-stage .first-block-active .toggle').on('click', function () {
            $('.first-block-active').toggle();
            $('.first-block').toggle();
        });
    });


    $(document).ready(function() {
        $('.block-first-stage .two-block-d .toggle').on('click', function () {
            $('.two-block-active').toggle();
            $('.two-block-d').toggle();
        });
    });
    $(document).ready(function() {
        $('.block-first-stage .two-block-active .toggle').on('click', function () {
            $('.two-block-active').toggle();
            $('.two-block-d').toggle();
        });
    });

    $(document).ready(function() {
        $('.block-first-stage .three-block-d .toggle').on('click', function () {
            $('.three-block-active').toggle();
            $('.three-block-d').toggle();
        });
    });
    $(document).ready(function() {
        $('.block-first-stage .three-block-active .toggle').on('click', function () {
            $('.three-block-active').toggle();
            $('.three-block-d').toggle();
        });
    });

});

