$(function() {
$(document).ready(function() {
  $(document).foundation();
  $("#button1").click(function() {
      $("#example-vert-tabs").append('<li class="tabs-title"><a href="#panel7v">Tab 7</a></li>');
      $("#tab_content").append('<div class="tabs-panel" id="panel7v"><p>Test7</p></div>');
      $(".tabs").foundation();
  });

});

    var elem = $('#elem-to-animate');

    $(document).ready(function() {
    $('header i.fa').on('click', function () {
        $('.top-menu').toggle();
        $('header .logo').toggle();
        if ($('.top-menu').is(':visible')) {
            $("header i.toggle").removeClass('fa-align-right');
            $("header i.toggle").addClass('fa-times');
        }
        else {
            $("header i.toggle").removeClass('fa-times');
            $("header i.toggle").addClass('fa-align-right');
        }
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
    /*--------------------------------------page-registr---------------*/
    $(document).ready(function() {
        $('#page-registr .registr .back').on('click', function () {
            $('#page-registr .registr').toggle();
            $('#page-registr .registr-1').toggle();
        });
        $('#page-registr .registr-1 .next').on('click', function () {
            $('#page-registr .registr').toggle();
            $('#page-registr .registr-1').toggle();
        });

    });

});
});
