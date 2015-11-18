var interval = 3000;
var numberOfBlocks = 9;
var numberOfTarget = 3;
var targetBlocks = [];
var selectedBlocks = [];
var timer;

document.observe('dom:loaded', function(){
	$("start").onclick = stopToStart;
	$("stop").onclick = stopGame;
});

function stopToStart(){
    stopGame();
    startToSetTarget();
}

function stopGame(){
	targetBlocks = [];
	selectedBlocks = [];
	clearTimeout(timer);
	$("answer").update("0/0");
	$("state").update("stop");
}

function startToSetTarget(){
	var i = 0;
	$("state").update("Ready!");
	targetBlocks = [];
	selectedBlocks = [];;
	clearTimeout(timer);
	console.log(i);
	while(i<3){
		targetBlocks[i] = Math.floor(Math.random()*9);
		for(var n=0;n<i;n++){
			if(targetBlocks[i] == targetBlocks[n]){
				i--;
			}
		}
		i++;
	}
	console.log(targetBlocks);
	setTimeout(setTargetToShow,interval);
}

function setTargetToShow(){
	var index = $$(".block");
	$("state").update("Memorize!");
	for(var i=0;i<numberOfTarget;i++){
		index[targetBlocks[i]].addClassName("target");
	}
	setTimeout(showToSelect,interval);
}

function showToSelect(){
	var index = $$(".block");
	$("state").update("Select!");
	for(var i=0;i<numberOfTarget;i++){
		index[targetBlocks[i]].removeClassName("target");
	}
	for (var i = 0; i < numberOfBlocks; i++) {
		index[i].observe("click",function(event){
			this.addClassName("selected");
			selectedBlocks.push(this.getAttribute("data-index"));
			console.log(this.getAttribute("data-index"));
		});
	}
	console.log("1");
	setTimeout(selectToResult,interval);
}

function selectToResult(){
	
	for(var i=0;i<numberOfTarget;i++){
		index[selectedBlocks[i]].removeClassName("selected");
	}
}
