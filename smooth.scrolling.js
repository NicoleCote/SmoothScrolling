/*****************************************************************************
* Created by: Nicole Cote
*
* Allows for smooth, single page scrolling.
*
******************************************************************************/

$(document).ready(function() {

		var headerHeight = $("header").height();
		
		$(document).on('scroll', onScroll);
    
    //Click image, will scroll to top of page
		$('footer img').click(function() {
			$('html,body').animate({"scrollTop":0}, 1000);
			return false;
		});

		$('[href^="#"]').click(function(){

			$(document).off('scroll');

			var target = $(this).attr('href'); /*value of the clicked href*/
			var offset = $($(this).attr('href')).offset(); /*get the current position relative to the document*/
			var top = offset.top; //top of section
			var activeLink = $(this);

			$('ul li a').each(function(index, element){
				var value = $(this).attr('href');
				var link = $(this);
        
        //Highlight the current link
				if (target == value) {
					removeHighlight();
					highlight(activeLink);
					return false;
				} else {
					removeHighlight();
				}
		
			});
      
      //Scroll to top of section
			$('html,body').animate({"scrollTop":top-headerHeight}, 1000, function () {
				$(document).on('scroll', onScroll);
			});
			return false;
		});

});

function highlight(activeLink) {
	activeLink.addClass('active');
}

function removeHighlight() {
	$('ul li a').removeClass('active');
}

/*As you scroll through the page, highlight the link of the section you are passing through*/
function onScroll() {
	var scroll = $(document).scrollTop();
	var headerHeight = $("header").height();

	$('ul li a').each(function(index, element) {
		var link = $(this);
		var value = $($(this).attr('href'));
		var top = value.position().top;
		var height = value.outerHeight(true);

		if((top-headerHeight) <= scroll && (top+height-headerHeight) > scroll) {
			removeHighlight();
			link.addClass('active');

		} else {
			link.removeClass('active');
		}
	})
		

}
