$.fn.extend({
    treed: function (o) {

      var openedClass = 'glyphicon-minus-sign';
      var closedClass = 'glyphicon-plus-sign';

      if (typeof o != 'undefined'){
        if (typeof o.openedClass != 'undefined'){
        openedClass = o.openedClass;
        }
        if (typeof o.closedClass != 'undefined'){
        closedClass = o.closedClass;
        }
      };

        //initialize each of the top levels
        var tree = $(this);
        tree.addClass("tree");

        tree.find('li').has("ul").each(function () {
            var branch = $(this); //li with children ul

            //branch.prepend("<i class='indicator glyphicon " + closedClass + "'></i>");
            branch.prepend("<i class='indicator " + closedClass + "'></i>");
            branch.addClass('branch');

            branch.on('click', function (e) {

                if (this == e.target) {
                    var icon = $(this).children('i:first');
                    icon.toggleClass(openedClass + " " + closedClass);
                    $(this).children().children().slideToggle();

					if(icon.hasClass(openedClass))
					{
						icon.siblings().addClass("opened");

					}else
					{
						icon.siblings().removeClass("opened");
					}

                }
            })

        });
        //fire event from the dynamically added icon
      tree.find('.branch .indicator').each(function(){
        $(this).on('click', function () {
            $(this).closest('li').click();
        });
      });
        //fire event to open branch if the li contains a button instead of text
        tree.find('.branch>button').each(function () {
            $(this).on('click', function (e) {
                $(this).closest('li').click();
                e.preventDefault();
            });
        });
    }
});

$('#tree3').treed({openedClass:'glyphicon-chevron-down', closedClass:'glyphicon-chevron-right'});

function textAreaAdjust(o) {
  o.style.height = "1px";
  o.style.height = (25+o.scrollHeight)+"px";
}

$(window).load(function(){

        var path = location.pathname.split(".")[0]+".html";
        var currentLink = $('a[href="'+path+'"]')
        var parentLi = currentLink.parent("li");
        parentLi.addClass("active");
        parentLi.parentsUntil( $( "ul#tree3" ), "li" ).each(function () {
            $(this).addClass("active");
            $(this).children('i:first').removeClass('glyphicon-chevron-right');
            $(this).children('i:first').addClass('glyphicon-chevron-down');
        });
        currentLink.parentsUntil( $( "ul#tree3" ), "li" ).siblings().addClass("active");
        currentLink.addClass("clicked");

		/**=======LEFT SIDE MENU=========***/
		$("#tree3 a").on('click', function(event) {
			$('#tree3 a').removeClass("clicked");
			$(this).addClass("clicked");
			$(this).parent("li").parent("ul").parent("li").find('>a').addClass("clicked");
			$(this).parent("li").parent("ul").parent("li").parent("ul").parent("li").find('>a').addClass("clicked");
			//alert($(this).parent("li").siblings().find('ul').html());
			$(this).parent("li").siblings().find('ul').removeClass("opened");
			$(this).parent("li").siblings().find('li').hide();
			if (this.hash !== "") {
			  // Prevent default anchor click behavior
			  event.preventDefault();
              // Store hash
              var hash = this.hash;
              $('#topicscontainer .topic').hide(0, function() {
                    $(hash).show();
                    $('html, body').animate({
                        scrollTop: $('#topicscontainer').offset().top-70
                      }, 'fast', function(){

                    });
             });
			}
		});
    });

$(document).ready(function() {

    /////////////////////////////////////////////////////////////
    // JS for Check/Uncheck all CheckBoxes by Checkbox //
    /////////////////////////////////////////////////////////////
    $(".clearall").click(function(e) {
        e.preventDefault();
    $(".grpcheckbox").prop("checked", false)
    })
    $('.panel').css('display','block');
});

$(function(){
  // bind change event to select
  $('#audience_select').on('change', function () {
      var url = $(this).val(); // get selected value
      if (url) { // require a URL
          window.location = url; // redirect
      }
      return false;
  });
});

$(function(){
  // bind change event to select
  $('#product_select').on('change', function () {
      var url = $(this).val(); // get selected value
      if (url) { // require a URL
          window.location = url; // redirect
      }
      return false;
  });
});

$(function(){
  // bind change event to select
  $('#platform_select').on('change', function () {
      var url = $(this).val(); // get selected value
      if (url) { // require a URL
          window.location = url; // redirect
      }
      return false;
  });
});