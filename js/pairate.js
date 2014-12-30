// Add Sticky for scroll header
!function($){
    //var previousScroll = 0;
    $(window).scroll(function (e) {
        var currentScroll = $(this).scrollTop();
        if (currentScroll == 0) {
            $("#header").removeClass("sticky-out").addClass("sticky");
        } else if (currentScroll > 39) {
            $("#header").removeClass("sticky").addClass("sticky-out");
        }
        //previousScroll = currentScroll;
    });
}(jQuery);


$( document ).ready(function() {
    // Add animation scrollto
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });

    // Add button back to top
    backtotop = jQuery('<a href="#Top" class="btn-primary" title="Back to Top" id="button-btt" style="display: inline;"><span aria-hidden="true" class="glyphicon glyphicon-eject"></span>Top</a>');
    backtotop.appendTo('body');
    // hide #back-top first
    backtotop.hide();

    // fade in #back-top
    jQuery(function () {
        jQuery(window).scroll(function () {
            if (jQuery(this).scrollTop() > 100) {
                backtotop.fadeIn();
            } else {
                backtotop.fadeOut();
            }
        });

        // scroll body to 0px on click
        backtotop.click(function () {
            jQuery('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });

});

// Get stock of XOM, TOT, RSD/B
$(function() {
    $("#ticker").jStockTicker({});
});
$( document ).ready(function() {
    var arrayOfStocks = ["XOM", "TOT", "RDS.B"];
    $.each(arrayOfStocks, function() {
        getAStock(this);
    });
});
function getAStock(stockToGet) {
    $.getJSON('https://finance.google.com/finance/info?client=ig&q=NYSE:'+stockToGet+'&callback=?',
    function(response){
        var stockInfo = response[0];
        if (stockInfo.c > 0) {
            var stockString = '<span class="up">';
        } else {
            var stockString = '<span class="down">';
        }
        stockString += '<span class="quote"> '+stockInfo.t+'</span>';
        stockString += '<span class="price">'+stockInfo.l+'</span>';
        stockString += '<span class="stock-change">'+stockInfo.c+'</span>';
        stockString += '</span>';
        $('.stock').append(stockString);
    });
}
