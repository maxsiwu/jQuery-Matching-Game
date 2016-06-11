//jQuery here

//set variables
var arrayOfImages = [];
var gameStart = false;
var revealValue = 0;
var matchValue = 0;
var turnValue = 0;
var clickSound = new Audio('media/click.wav');
var startSound = new Audio('media/start.wav');
var resetSound = new Audio('media/reset.wav');
var matchSound = new Audio('media/match.wav');
var winSound = new Audio('media/win.wav');

var $reset = $('#reset');
$reset.hide();
//create an array of images
arrayOfImages[0] = 'images/gs1.jpg';
arrayOfImages[1] = 'images/gs2.jpg';
arrayOfImages[2] = 'images/gs3.jpg';
arrayOfImages[3] = 'images/gs4.jpg';
arrayOfImages[4] = 'images/gs5.jpg';
arrayOfImages[5] = 'images/gs6.jpg';
arrayOfImages[6] = 'images/gs7.jpg';
arrayOfImages[7] = 'images/gs8.jpg';
arrayOfImages[8] = 'images/gs1.jpg';
arrayOfImages[9] = 'images/gs2.jpg';
arrayOfImages[10] = 'images/gs3.jpg';
arrayOfImages[11] = 'images/gs4.jpg';
arrayOfImages[12] = 'images/gs5.jpg';
arrayOfImages[13] = 'images/gs6.jpg';
arrayOfImages[14] = 'images/gs7.jpg';
arrayOfImages[15] = 'images/gs8.jpg';

shuffle(arrayOfImages);

console.log(arrayOfImages);

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

newBoard();
//create the board with slots filled with images
function newBoard (){
	var output = '';
	for(var i = 0;  i < arrayOfImages.length; i++){
		output +='<div class="slot" id="slot'+i+'" > <img class="image" id="image' +i+'" src=" '+ arrayOfImages[i] + ' "></div>' ;
		document.getElementById('game-board').innerHTML = output;
	};

	$reset.show()
  		  .html('Click Play Game to Start');

};
//play game button code ----------
$("#btn").click(function(){

	if($(this).text() == 'Play Game'){
		//if the button string matches with this text, then game is in a started state
		gameStart = true;
		$(this).text('Reset Game')
		startSound.currentTime = 0.07;
		startSound.play();
		setTimeout(function(){
    		$reset.html('Get ready...')
    					.show()
    					.delay(500)
    					.fadeOut('slow');		
    	},100);

	}else{
		
		resetSound.play();
		revealValue = 0;
		$slots.removeClass('shown')
		  .removeClass('matched');
		$slots.children('img').css('opacity', 0)
    	turnValue = 0;
    	matchValue = 0;
    	$('#turn').html(turnValue);
    	$('#match').html(matchValue);
    	setTimeout(function(){
    		$reset.html('Game has been reset...')
    					.show()
    					.delay(500)
    					.fadeOut('slow');				
    	},100);
	} 
	
});//button code ends here ----

var firstImage;
var currentImage;

var $slots = $('.slot');

$slots.click(function(){

	$('img').on('dragstart', function(event) { event.preventDefault(); });
	//prevent drag click image
  
	if(gameStart == true){

		// Game has started
		var hasShownClass = $(this).hasClass('shown');
		
		if( hasShownClass == false){

			revealValue++;
			console.log('revealValue = ' + revealValue);

			if(revealValue == 1){
				firstImage = $(this).children('img').attr('src');
				$(this).children('img').css('opacity',1);
				$(this).addClass('shown');
				clickSound.play();
				return;

			}// end if reveal value equals 1

			if(revealValue == 2){

				var currentImage = $(this).children('img').attr('src');
				$(this).children('img').css('opacity',1);
				$(this).addClass('shown');
				turnValue++;
				$('#turn').html(turnValue);
				clickSound.play();
				
				if(currentImage == firstImage){

					//alert('it is a match');

					$('.shown').addClass('matched');
					revealValue = 0;
					console.log('revealValue = ' + revealValue);
					matchValue++;
					$('#match').html(matchValue);
					
					matchSound.play();

					setTimeout(function(){
					    	$reset.show()
					    				.html('')
					    				.html('Not Bad...')
					    				.delay(500)
					    				.fadeOut('slow');
    					
    				},100);

    				if(matchValue == 8){
						
						setTimeout(function(){
						winSound.play();
						}, 500);

    					setTimeout(function(){
					    	$reset.html('Border-radius won!')
					    				.show()
					    				.delay(750)
					    				.fadeOut('slow');
						},1500);

					}
					return;

				}// end if current image equals the first image

				if(currentImage != firstImage){

					setTimeout(function(){

						$('.shown').not('.matched').children('img').css('opacity',0);
						$('.shown').not('.matched').removeClass('shown');
						revealValue = 0;
						console.log('revealValue = ' + revealValue);
						clickSound.play();

					}, 500);

				} // end if current image not equal to first image


			}// end if reveal value equals 2

		}else{

			//alert('Item already showing...click another square...');
			setTimeout(function(){
					    $reset.html('It\'s me again.')
					    			.show()
					    			.delay(500)
					    			.fadeOut('slow');
						},100);

		} // end if this has class of shown...

  	}else{
  		//alert('Game not started...click the "Play Game" button to start a new game...');
  	}

});