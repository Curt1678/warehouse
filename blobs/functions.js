let timeStamp = 0;

let gravity = 700;

window.onload = function(){
	window.resizeTo(window.width, window.height);
	
	for(i=0; i<50; i++){
		let hue = (Math.random() * 360);
		let hsl = "hsl(" + hue.toString() + ",100%,40%)";
		console.log(hsl);
	
		let blob = document.createElement('div');
		blob.classList.add('blob');
		let xBlob = Math.random() * window.innerWidth;
		let yBlob = Math.random() * window.innerHeight;
		
		blob.style="top: " + yBlob + "px; left: " + xBlob + "px; background-color:" + hsl + ";";
		
		let xVel = (Math.random() * 500) - 250;
		let yVel = (Math.random() * 500) - 250;
		
		blob.setAttribute('data-xVel', xVel);
		blob.setAttribute('data-yVel', yVel);
		
		document.querySelector('body').append(blob);
	}
}

window.addEventListener('mousemove',function(e){
	cursorX = e.clientX;
	cursorY = e.clientY;
	
	console.log(cursorX);
});

setInterval(function(){
	if(timeStamp == 0){timeStamp = Date.now();}
	
	else{
		let blobs = document.querySelectorAll('div.blob');
		let deltaT = (Date.now() - timeStamp)/1000;
		
		let windowWidth = window.innerWidth;
		let windowHeight = window.innerHeight;
	
		blobs.forEach(function(blob){
			let currentBlobX = parseFloat(blob.style.left);
			let currentBlobY = parseFloat(blob.style.top);
			
			let hsl = blob.style.backgroundColor;
		
			let currentBlobXVel = blob.getAttribute('data-xvel');
			let currentBlobYVel = parseFloat(blob.getAttribute('data-yvel')) + (deltaT * gravity);
			blob.setAttribute('data-yvel', currentBlobYVel);
			
		
			let newBlobX = currentBlobX + (currentBlobXVel * deltaT);
			let newBlobY = currentBlobY + (currentBlobYVel * deltaT);
		
			 

			if(newBlobX <= 0 || newBlobX >= (windowWidth - 20)){
				blob.setAttribute('data-xvel', -1 * (blob.getAttribute('data-xvel')));
				if(newBlobX <= 0){newBlobX = 0}
				if(newBlobX >= (windowWidth - 20)){newBlobX = (windowWidth - 20)}
			}
			if(newBlobY <= 0 || newBlobY >= (window.innerHeight - 20)){
				blob.setAttribute('data-yvel', -1 * (blob.getAttribute('data-yvel')));
				if(newBlobY <= 0){newBlobY = 0}
				if(newBlobY >= (windowHeight - 20)){newBlobY = (windowHeight - 20)}
			}
			
			blob.style = "top: " + newBlobY + "px; left: " + newBlobX + "px; background-color:" + hsl + ";";
		});
	timeStamp = Date.now();
	}
},30);