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

});




