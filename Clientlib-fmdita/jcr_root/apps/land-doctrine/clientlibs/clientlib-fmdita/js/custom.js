var isIE = /*@cc_on!@*/ false || !!document.documentMode;
var isEdge = !isIE && !!window.StyleMedia;
if (isEdge || isIE) {
    $('.toccontainer').addClass("toccontainer-top-ie");
    $(window).scroll(function(event) {
        var scroll = $(window).scrollTop();
        // Activate sticky for IE and Edge if scrolltop is more than content top
        var contentHeight = $('.article-content').height();
        var contentTop = $('.article-content').offset().top;
        if (scroll > contentTop && scroll < (contentHeight + 70)) {
            $('.toccontainer').addClass("toccontainer-top-ie-scroll");
        } else {
            if (scroll > (contentHeight + 70)) {
                $('.toccontainer').removeClass("toccontainer-top-ie-scroll");
                var topToc = contentHeight - 150;
                $('.toccontainer').css({ 'top': topToc + 'px' });
            } else {

                $('.toccontainer').css({ 'top': 0 + 'px' });
                $('.toccontainer').removeClass("toccontainer-top-ie-scroll");
            }
        }

    });
    $("div.topic ol").each(function() {
        var $this = $(this);
        var startValue = $this.attr('start');
        if (typeof startValue !== typeof undefined && startValue !== false) {
            var styleValue = $this.attr('style');
            var counterValue = $this.attr('data-outputclass');
            if (!(typeof styleValue !== typeof undefined && styleValue !== false && styleValue.indexOf("counter-increment:") > -1) &&
                !(typeof counterValue !== typeof undefined && counterValue !== false && counterValue.indexOf("noChapterNumbering") > -1)) {
                    $this.attr("data-customie", "customparanumber");
                    $this.attr("style", "counter-increment: my-counter " + (parseInt(startValue) - 1) + ";");
            }
        }
    });


} else {
    $('.toccontainer').addClass("toccontainer-top-all");
}
$(document).ready(function() {
    $("div,td,section").each(function() {
        var $this = $(this);
        var attr = $this.attr('data-outputclass');
        if (typeof attr !== typeof undefined && attr !== false) {
            var cls = $this.attr("data-outputclass");
            $this.addClass(cls);
        }

        /* fix for headings */
        if ($this.hasClass('breadcrumb')) {

            if ($this.parent().parent().hasClass('reference')) {
                $this.parent().parent().addClass('clearfix');
            }
        }

    });
    $("colgroup").each(function() {
        var $this = $(this);
        if ($this.hasClass('FormatB')) {
            $this.parent().addClass('FormatB');

        } else {
            if ($this.hasClass('vuitui')) {
                $this.parent().addClass('vuitui');

            }
        }

    });

    $("th").each(function() {
        var $this = $(this);
        if ($this.attr('rotate') == 'yes') {
            $this.find('.p').addClass('rotate-text');
        }
    });

    $("object").each(function() {
        //console.log("object");
        //console.log($(this).attr('data'));
        var $this = $(this);
        var fileName = $this.attr('data');
        var formatCheck = '.mp4';
        if (fileName.indexOf(formatCheck) != -1) {
            $this.css({ "width": "100%", "height": "400px" });
        }

    });

    /* fix for replacing nbsp with wbr */

    $("div.topic div.p").html(function(i, html) {
        return html.replace(/&nbsp;/g, ' <wbr> ');
    });
	
	/* styling of tooltip for glossary based on character length */
	$("body").find(".tooltipdefinition").each(function(){
        var $this = $(this);
        if($this.text().length > 13){
            $this.css("min-width", "150px");
        }
        if($this.text().length > 35){
            $this.css("min-width", "200px");
        }
        if($this.text().length > 50){
            $this.css("min-width", "250px");
        }
    });

    // SOURABH START

    var hash = window.location.hash;
    var itemId = hash.substring(1, hash.length);
    var targetEl = document.getElementById(itemId);
    if($(targetEl).closest("table").hasClass("wheading")){
        $("html").animate({
            scrollTop: 0
        }, 0);

        setTimeout(function() {
            if (hash != '') { 
                var x = $(targetEl).offset();
                $("html").animate({
                    scrollTop: x.top - 50
                }, 800);
            }
        }, 300);

    }else{

        setTimeout(function() {
            if (hash != '') { 
                var x = $(targetEl).offset();
                $("html").animate({
                    scrollTop: x.top
                }, 800);
            }
        }, 300);
    }

    $(".table-scroll-container table").each(function() {
        var table = $(this);
        var tableContainer = table.closest('.table-container');
        var tableScrollContainer = table.closest('.table-scroll-container');
        
        table.on("floatThead", function() {
            var newWidth = tableScrollContainer.width();
            tableContainer.find(".floatThead-container").css({ width: newWidth });
        })
        table.on("reflowed", function() {
            setTimeout(function() {
                var newWidth = tableScrollContainer.width();
                tableContainer.find(".floatThead-container").css({ width: newWidth });
                tableContainer.find(".floatThead-container table.floatThead-table").css({ width: "100%" });
            }, 1000);
        })

        if (table.height() < tableScrollContainer.height()) {
            tableScrollContainer.addClass("table-scroll-container--x-only");
            // no floathead for these small tables
        } else {
            table.floatThead({
                top: 0,
                scrollContainer: function(table) {
                    return table.closest('.table-scroll-container');
                },
                position: 'absolute'
            });
        }
        table.floatThead('reflow');
        if (tableScrollContainer.hasClass("ps-container")) {
            tableScrollContainer.perfectScrollbar('update');
        } else {
            tableScrollContainer.perfectScrollbar();
        }

    });

    $(".floatThead-wrapper").each(function(e) {
        var newWidth = $(".table-scroll-container").width();
        $(this).find(".floatThead-container").css({ width: newWidth });
    });

    $(document).on("click", ".floatThead-wrapper .thead, .fixed-btn", function(e) {
        e.preventDefault();
        e.stopPropagation();
        var targetTableBody = $(this).closest(".expandable-table");
        targetTableBody.find(".tbody").click();
    });


});


// SOURABH ENDS