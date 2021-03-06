let yAccel = 0;

let yVel = 0;

let blockXVel = -350;

let rand = 0;

let counter = 0;

let begin = 0;

let iniTop = 0;

function pan(block){

 let startTime = Date.now();
 
 let top = block.style.top;
 
 let current = 0;
 let dt = 0;
 let displace = 0;
 let dtBird = 0;
 
 let panInterval = setInterval(function(){
	dt = (Date.now() - startTime) / 1000;
	
	displace = 1450 + (dt * blockXVel);	
	
	block.style = "transform: translateX(" + displace + "px); top: " + top + ";";
	//console.log('running ' + counter + " block(s).");
	
	
	checkCollision(block, displace, parseFloat(top));
	
	if(displace <= -50){
		clearInterval(panInterval);
		block.outerHTML = "";
		counter--;
	}
	
	
 },20);
	 
};

function updateBird(){

	setInterval(function(){
		//console.log('updating birb');
		dtBird = (Date.now() - begin)/1000;
	
		iniTop = parseFloat(document.querySelector('div.bird').style.top);
	
		yVel += (dtBird * yAccel);
		
		if(yVel >= 450){yVel = 450;}
		if(yVel <= -450){yVel = -450;}
	
		document.querySelector('div.bird').style.top = iniTop + (dtBird*yVel) + "px";
		
		begin = Date.now();
	},20);

	
	
}

function checkCollision(block, displace, top){

	let birdTop = parseFloat(document.querySelector('div.bird').style.top);
	if (displace <= 230 && displace >= 150){
		if(top >= birdTop - 200 && top <= birdTop + 30){
			crash();
		}
	}
}

function beginGame(){

	begin = Date.now();
	
	updateBird();

	let gameCycle = setInterval(function(){
		rand = Math.random()
		let block = document.createElement('div');
		block.classList.add('block');
		block.style = "transform: translateX(1450px); top:" + rand*300 + "px";
		document.querySelector('div.container').append(block);
		counter++;
		
		pan(block);
		
	},2000);
	
	window.addEventListener('keydown', function(e){
		switch(e.key){
			case " ":
				yAccel = -1000;
				break;
		}
	});
	
	window.addEventListener('keyup', function(e){
		switch(e.key){
			case " ":
				yAccel = 600;
		}
	});
	
}

function crash(){
	clearInterval(gameCycle);
	document.querySelector()
}

window.onload = beginGame();