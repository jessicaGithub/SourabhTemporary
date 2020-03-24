var isIE = /*@cc_on!@*/false || !!document.documentMode;
var isEdge = !isIE && !!window.StyleMedia;
if(isEdge || isIE){
    $('.toccontainer').addClass( "toccontainer-top-ie" );
	$(window).scroll(function (event) {
        var scroll = $(window).scrollTop();
        // Activate sticky for IE and Edge if scrolltop is more than content top
        var contentHeight = $('.article-content').height();
        var contentTop = $('.article-content').offset().top;
        if ( scroll > contentTop && scroll < (contentHeight+70)) {
            $('.toccontainer').addClass( "toccontainer-top-ie-scroll" );
        }else{
            if(scroll > (contentHeight+70)){
                $('.toccontainer').removeClass( "toccontainer-top-ie-scroll" );
				var topToc = contentHeight-150;
                $('.toccontainer').css({'top':topToc+'px'});
            }
            else{

            $('.toccontainer').css({'top':0+'px'});
            $('.toccontainer').removeClass( "toccontainer-top-ie-scroll" );
            }
        }

    });
    $("div.topic ol").each(function(){
		var startValue =  $(this).attr('start');
        if(typeof startValue !== typeof undefined && startValue !== false){
            var styleValue = $(this).attr('style');
            var counterValue = $(this).attr('data-outputclass');
            if(!(typeof styleValue !== typeof undefined && styleValue !== false && styleValue.indexOf("counter-increment:")>-1)
                && !(typeof counterValue !== typeof undefined && counterValue !== false && counterValue.indexOf("noChapterNumbering")>-1)){
					$(this).attr("data-customie","customparanumber");
                    $(this).attr("style","counter-increment: my-counter "+(parseInt(startValue)-1)+";");
                }
        }
    });


}
else{
$('.toccontainer').addClass( "toccontainer-top-all" );
}
$(document).ready(function(){
    $("div,td,section").each(function() {

        var attr = $(this).attr('data-outputclass');
if (typeof attr !== typeof undefined && attr !== false) {
    var cls = $(this).attr("data-outputclass");
        $(this).addClass(cls);
}

/* fix for headings */
     if($(this).hasClass('breadcrumb'))
     {

		if($(this).parent().parent().hasClass('reference'))
        {
			$(this).parent().parent().addClass('clearfix');
        }
     }

    });
	$("colgroup").each(function() {
		if($(this).hasClass('FormatB'))
		{
			$(this).parent().addClass('FormatB');

		}
		else{
			if($(this).hasClass('vuitui'))
		{
			$(this).parent().addClass('vuitui');

		}
        }

	});

	$("th").each(function(){
			if($(this).attr('rotate') == 'yes'){
				$(this).find('.p').addClass('rotate-text');
			}
	});

    $("object").each(function(){
        //console.log("object");
       //console.log($(this).attr('data'));
        var fileName = $(this).attr('data');
        var formatCheck = '.mp4';
        if(fileName.indexOf(formatCheck) != -1){
			 $(this).css({"width":"100%" , "height":"400px"});
        }

	});

/* fix for replacing nbsp with wbr */

  $("div.topic div.p").html(function (i, html) {
       return html.replace(/&nbsp;/g, ' <wbr> ');
    });

 // fix for showing pop for glossary.
   $("a#ld-glossentry").each(function(index) {
      var word = $(this).text();
      var def = $(this).attr("data-definition");
      // Update all instances of that word in the content page with mouse over def.
      var contentHTML = $(this).html();
      //contentHTML = contentHTML+ '<p id="ldgloss-popup" >'+ def +'</p>';
      contentHTML = '<span title="' + def + '">'+contentHTML+ '</span>';
      $(this).html(contentHTML);
  });

  // FIX FOR LARGE TABLES START
		// Setup script import and cache it
		$.cachedScript = function( url, options ) {
			options = $.extend( options || {}, {
				dataType: "script",
				cache: true,
				url: url
			});

			// Use $.ajax() since it is more flexible than $.getScript
			// Return the jqXHR object so we can chain callbacks
			return $.ajax( options );
		};

        setTimeout(function(){

			// import FloatHeadJS
			/* Changes by Sourabh - Start*/
			$.cachedScript( "/apps/land-doctrine/clientlibs/clientlib-fmdita/js/floaTheadPlugin.js" ).done(function( script, textStatus ) {
				/* Changes by Sourabh - End*/

				$(".table-scroll-container > table").each(function(){
					var tableContainer = $( this ).closest('.table-container');
					var tableScrollContainer = $( this ).closest('.table-scroll-container');
					var table = $( this );
					table.on("floatThead", function(){
						var newWidth = table.closest(".table-scroll-container").width();
						tableContainer.find(".floatThead-container").css({width: newWidth});
					})
					table.on("reflowed", function(){
						setTimeout(function(){
							var newWidth = table.closest(".table-scroll-container").width();
							tableContainer.find(".floatThead-container").css({width: newWidth});
						}, 1000);
					})

					if(table.height() < tableScrollContainer.height() ) {
						tableScrollContainer.addClass("table-scroll-container--x-only");
						// no floathead for these small tables
					} else {
							table.floatThead({
								top: 0,
								scrollContainer: function(table){
									return table.closest('.table-scroll-container');
								},
								position: 'absolute'
							});
					}
					table.floatThead('reflow');

					$(".expandable-table").css("opacity", "0");
					tableScrollContainer.css("opacity", "0");
					table.click();
				});


				$(".floatThead-wrapper").each(function(e){
					var newWidth = $(".table-scroll-container").width();
					$(this).find(".floatThead-container").css({width: newWidth});
				});

				$(document).on("click", ".floatThead-wrapper .thead, .fixed-btn", function(e){
					e.preventDefault();
					e.stopPropagation();
					var targetTableBody = $(this).closest(".expandable-table");
					targetTableBody.find(".tbody").click();
				});

				setTimeout(function(){
						$(".expandable-table--open").each(function(){
							$(this).find("table").click();
						})
						$(".table-scroll-container").css("opacity", "1");
						$(".expandable-table").css("opacity", "1");

						var hash = window.location.hash;
						if ( hash != '') {
							var itemId = hash.substring(1, hash.length);
							var targetEl = document.getElementById(itemId);
							var x = $(targetEl).offset();
							$("html").animate({
								scrollTop: x.top - 50
							}, 2000);
						}
				}, 2000);

			})
		}, 3000);


});
  // FIX FOR LARGE TABLES ENDS



