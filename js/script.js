// DEVICE DETECTION
var isMobile = false; //initiate as false
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;

// WE ARE READY
$(document).ready(function () {
	
	// ONLY AFTER PAGE LOADED REMOVE PRELOADER
	$(window).load(function(){
		$('#preloader').fadeOut('slow',function(){$(this).remove();});
		
		
		// INITIALIZE PARAMS
		var gameContainer = $(".gameContainer"); 
		var puppets = $(".puppets"); 
		var game = $("#game"); 
		var claw = $("#claw"); 
		var joystic = $("#joystic img"); 
		var swipeControll = $("#swipeControll"); 
		var slider = $("#slider"); 
		var gameWidth = game.width();
		var gameHeight = game.height();
		var gameTop = gameHeight/7;
		var gameBottom = gameHeight - (gameHeight/5);
		var lastMousePos = gameWidth/2;
		var gamePadding = gameWidth/10;
		var NumberOfPrizes = 3;
		var randomPrize = Math.floor((Math.random() * NumberOfPrizes) + 1);
		var controlHasBeenMoved = false;
		var clicked = false;
		var SliderHasBeenMoved = 0;
		var audio = new Audio('sounds/machine.wav');
		//audio.play();
		
		
		// FUNCTAION TO GET PARAMETERS FROM ADDRESS
		var getUrlParameter = function getUrlParameter(sParam) {
			var sPageURL = decodeURIComponent(window.location.search.substring(1)),
				sURLVariables = sPageURL.split('&'),
				sParameterName,
				i;

			for (i = 0; i < sURLVariables.length; i++) {
				sParameterName = sURLVariables[i].split('=');

				if (sParameterName[0] === sParam) {
					return sParameterName[1] === undefined ? true : sParameterName[1];
				}
			}
		};
		
		// GET MWK
		var mkw = 2;
		//var mkw = getUrlParameter('mkw');
		
		// RESIZE NEED TO RESET SOME PARAMETERS
		$(window).on('resize', function(){
			gameWidth = game.width();
			gameHeight = game.height();
			gameTop = gameHeight/7;
			gameBottom = gameHeight - (gameHeight/5);
			lastMousePos = gameWidth/2;
			gamePadding = gameWidth/10;
			claw.css({height:gameTop});
			claw.css({left:(gamePadding+prize.width())});
		});

		// CHECK FOR MKW
		if( typeof mkw !== 'undefined') {
			// SET GAME FOR MOBILE
			if( isMobile ) {
				joystic.hide();
				swipeControll.show();
				// SET MOBILE SLIDER INSTEAD OF JOYSTIC
				slider.slider({
					value: 50,
					// HANDLE MOBILE MOVMENT
					slide:function(event,ui) {
						//console.log(ui.value);
						SliderHasBeenMoved++;
						var parentOffset = game.offset(); 
						leftVal = $('.ui-slider-handle').offset().left + ($('.ui-slider-handle').width()/2) - parentOffset.left;
						clawUpdate(leftVal);
					// HANDLE MOBILE STOPED MOVMENT (sends the claw)
					}, stop: function() {
						if(SliderHasBeenMoved>10) {
							sendTheClaw();
							slider.unbind();
						}
					}
				});
			}
			// SET GAME FOR PC
			else {
				joystic.show();
				swipeControll.hide();
			}
		
			// GAME INITIALIZE
			console.log('mkw: ' + mkw);
			var prize = $('<div>', {'id': 'prize'}).html(mkw).css({'background-image' : 'url("images/prize' + randomPrize +'.png")'}).appendTo(claw);
			var interval = setInterval(keepMoving, 100);
			claw.css({height:gameTop});
		
			// PC MOUSEMOVE EVENT
			game.on('mousemove', function (e) {
				handleMouseMove(e);
			});
			
			// PC CLICK EVENT
			game.on('click',function () {
				sendTheClaw();
			});
			
			// SEND THE CLAW !!! (pc & mobile use)
			function sendTheClaw() {	// Yes it's sounds link Santa Claus
				game.off('mousemove');
				game.off('click');
				joystic.removeClass('left right');
				claw.removeClass('left right');
				clicked = true;
				//$("#sound-test")[0].play();
				audio.play();
				claw.removeClass('closed').css({height:gameBottom});		
				setTimeout(function() {
					claw.addClass('closed');
					puppets.addClass('shake');
					gameContainer.addClass('shake');
					setTimeout(function() {
						puppets.removeClass('shake');
						gameContainer.removeClass('shake');
						}, 1000);
					setTimeout(function() {
						claw.css({height:gameTop});
						prize.show();
						setTimeout(function() {
							claw.css({left:(gamePadding+prize.width())});
							setTimeout(function() {
								$(audio).animate({volume: 0}, 1000);
								/*$("#sound-test")[0].pause();
								sound.currentTime = 0;*/
							}, 1000);
						}, 3000);
					}, 200);
				}, 2500);
			}
			
			// HANDLE PC MOUSE MOVMENT
			function handleMouseMove(event) {
				var parentOffset = game.offset(); 
				var x = event.pageX;
				leftVal = (x - parentOffset.left);
				clawUpdate(x);
			}
			
			// HANDLE CLAW MOVEMANT
			function clawUpdate(pos) {
				leftValMiddle = leftVal - (claw.width()/2);
				if((leftVal > gamePadding) && (leftVal < gameWidth-gamePadding)) {
					claw.css({
						left: leftValMiddle 
					});
				}
				lastMousePos = leftValMiddle;
				controlHasBeenMoved = true;
			}
				
			
			// HANDLE CLAW AND JOYSTIC MOMENTOM MOVEMANT
			function keepMoving() {
				if(controlHasBeenMoved && !clicked) {
					var calwPos = claw.offset().left - game.offset().left;
					if((calwPos > lastMousePos - gamePadding/4) && (calwPos < lastMousePos + gamePadding/4)) {
						joystic.removeClass('left right');
						claw.removeClass('left right');
					}
					else {
						if(calwPos < lastMousePos) {
							joystic.removeClass('left').addClass('right');
							claw.removeClass('left').addClass('closed right');
						}
						else {
							joystic.removeClass('right').addClass('left');
							claw.removeClass('right').addClass('closed left');
						}
					}
					/*if ((lastMousePos - (claw.width()/2) < game.offset().left) || (lastMousePos - (claw.width()/2) > game.offset().left + gameWidth)) {
						claw.removeClass('left right');
					}*/
				}
				else controlHasBeenMoved = false;
			}

			
		}
		// WHAT TO SHOW INSTEAD OF GAME IF NO MKW
		else {
			$('body').html('NO MKW!');
		}
	});
		
});