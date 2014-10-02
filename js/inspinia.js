// Custom scripts
$(document).ready(function () {

    // MetsiMenu
    $('#side-menu').metisMenu();

    // Collapse ibox function
    $('.collapse-link').click( function() {
        var ibox = $(this).closest('div.ibox');
        var button = $(this).find('i');
        var content = ibox.find('div.ibox-content');
        content.slideToggle(200);
        button.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
        ibox.toggleClass('').toggleClass('border-bottom');
        setTimeout(function () {
            ibox.resize();
            ibox.find('[id^=map-]').resize();
        }, 50);
    });

    // Close ibox function
    $('.close-link').click( function() {
        var content = $(this).closest('div.ibox');
        content.remove();
    });

    // Small todo handler
    $('.check-link').click( function(){
        var button = $(this).find('i');
        var label = $(this).next('span');
        button.toggleClass('fa-check-square').toggleClass('fa-square-o');
        label.toggleClass('todo-completed');
        return false;
    });

    // Append config box / Only for demo purpose
	
	// $.get("skin-config.html", function (data) {
        // $('body').append(data);
    // });
	

    // minimalize menu
    $('.navbar-minimalize').click(function () {
        $("body").toggleClass("mini-navbar");
        SmoothlyMenu();
    });
	
	// Fit text, responsive
	$('.fit-text').each(
		function() {
			jQuery($(this).fitText(0.8));
		}
	);
	
	// counters animation
	$('.count-animate').each(function () {
		var self = $(this);
		var percent = self.hasClass('add-percent');
		jQuery({ Counter: 0 }).animate({ Counter: self.text() }, {
		duration: 5000,
		easing: 'swing',
		step: function () {
			self.text(Math.ceil(this.Counter));
			percent ? add_percent(self):null;
			},
		});
	});
	
	// add percent to text
	
	$('.add-percent').each( function () {
		add_percent($(this))
	});
	
	function add_percent (obj){
		var text = obj.text();
		obj.text(text+'%');
	}
	
	// contacts received counter and following animations
	
	var stop;
	
	$('#contacts-received').each(
		function() {
			self = $(this);
			stop = setInterval(function () {addRamNum(self)}, 1500);
		}
	);
	
	function addRamNum (obj) {
		var total = parseInt(obj.text())+Math.floor((Math.random() * 30) + 1);
		var animated = false;
		obj.text(total);
		
		if (total>50)
			clearInterval(stop);
		
		if (total>10 && !animated) {
			animated = true;
			// hide clouds and container
			$('#clouds').hide(1500);
			$('#clouds').parent().hide(1500, 
				// then hide requesting contacts
					function() {
						$('#requesting-contacts').hide(1500,
							// then pull right the remaining text
							function() {
								$( "#contacts-received" ).parent().animate({ fontSize: '14px'},1500);
								$( "#all-contacts" ).show( "fade", 1000 );
							}
						);
					}

			);
		};
	}
	
	// Giving focus to search input
	$('#top-search').focus();

    // tooltips
    $('.tooltip-demo').tooltip({
        selector: "[data-toggle=tooltip]",
        container: "body"
    });
	
	// $('.tooltip-widget').tooltip({
        // selector: "[data-toggle=tooltip]",
        // //container: "body"
    // });
	
    // Full height of sidebar
    function fix_height() {
        var heightWithoutNavbar = $("body > #wrapper").height() - 61;
        $(".sidebard-panel").css("min-height", heightWithoutNavbar + "px");
    }
    fix_height();

    $(window).bind("load resize click scroll", function() {
        if(!$("body").hasClass('body-small')) {
            fix_height();
        }
    })

    $("[data-toggle=popover]")
        .popover();
});


// For demo purpose - animation css script
function animationHover(element, animation){
    element = $(element);
    element.hover(
        function() {
            element.addClass('animated ' + animation);
        },
        function(){
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                element.removeClass('animated ' + animation);
            }, 2000);
        });
}

// Minimalize menu when screen is less than 768px


$(function() {
    $(window).bind("load resize", function() {
		
        if ($(this).width() < 769) {
			$('body').addClass('mini-navbar');
            $('body').addClass('body-small');
			// for mock up purposes 22-09-14
        } else {
			$('body').removeClass('mini-navbar');
            $('body').removeClass('body-small');
			// for mock up purposes 22-09-14
        }
    })
})

/* // Before changes

$(function() {
    $(window).bind("load resize", function() {
        if ($(this).width() < 769) {
            $('body').addClass('body-small');
        } else {
            $('body').removeClass('body-small');
        }
    })
})

*/


function SmoothlyMenu() {
    if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
        // Hide menu in order to smoothly turn on when maximize menu
        $('#side-menu').hide();
        // For smoothly turn on menu
        setTimeout(
            function () {
                $('#side-menu').fadeIn(500);
            }, 100);
    } else {
        // Remove all inline style from jquery fadeIn function to reset menu state
        $('#side-menu').removeAttr('style');
    }
}


// Dragable panels
function WinMove() {
    $("div.ibox").not('.no-drop')
        .draggable({
            revert: true,
            zIndex: 2000,
            cursor: "move",
            handle: '.ibox-title',
            opacity: 0.8,
            drag: function(){
                var finalOffset = $(this).offset();
                var finalxPos = finalOffset.left;
                var finalyPos = finalOffset.top;
                // Add div with above id to see position of panel
                $('#posX').text('Final X: ' + finalxPos);
                $('#posY').text('Final Y: ' + finalyPos);
            },
        })
        .droppable({
            tolerance: 'pointer',
            drop: function (event, ui) {
                var draggable = ui.draggable;
                var droppable = $(this);
                var dragPos = draggable.position();
                var dropPos = droppable.position();
                draggable.swap(droppable);
                setTimeout(function () {
                    var dropmap = droppable.find('[id^=map-]');
                    var dragmap = draggable.find('[id^=map-]');
                    if (dragmap.length > 0 || dropmap.length > 0) {
                        dragmap.resize();
                        dropmap.resize();
                    }
                    else {
                        draggable.resize();
                        droppable.resize();
                    }
                }, 50);
                setTimeout(function () {
                    draggable.find('[id^=map-]').resize();
                    droppable.find('[id^=map-]').resize();
                }, 250);
            }
        });
}
jQuery.fn.swap = function (b) {
    b = jQuery(b)[0];
    var a = this[0];
    var t = a.parentNode.insertBefore(document.createTextNode(''), a);
    b.parentNode.insertBefore(a, b);
    t.parentNode.insertBefore(b, t);
    t.parentNode.removeChild(t);
    return this;
};
