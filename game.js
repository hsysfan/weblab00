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
	var index = $$(".block");
	for(var i=0;i<numberOfBlocks;i++){
		index[i].addClassName("normal");
	}
	$("answer").update("0/0");
	$("state").update("Stop");
}

function startToSetTarget(){
	var i = 0;
	$("state").update("Ready!");
	targetBlocks = [];
	selectedBlocks = [];;
	clearTimeout(timer);
	while(i<3){
		targetBlocks[i] = Math.floor(Math.random()*9);
		for(var n=0;n<i;n++){
			if(targetBlocks[i] == targetBlocks[n]){
				i--;
			}
		}
		i++;
	}
	timer = setTimeout(setTargetToShow,interval);
}

function setTargetToShow(){
	var index = $$(".block");
	$("state").update("Memorize!");
	for(var i=0;i<numberOfTarget;i++){
		index[targetBlocks[i]].addClassName("target");
	}
	timer = setTimeout(showToSelect,interval);
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
	timer = setTimeout(selectToResult,interval);
}

function selectToResult(){
	var correct=0;
	var index = $$(".block");
	$("state").update("Checking");
	for(var i = 0; i<numberOfBlocks;i++){
		index[i].stopObserving("click");
	}
	for(var i=0;i<numberOfTarget;i++){
		index[selectedBlocks[i]].removeClassName("selected");
	}
	for(var i=0;i<numberOfTarget;i++){
		for(var j=0;j<numberOfTarget;j++){
			if(targetBlocks[i] == selectedBlocks[j]){
				correct++;
			}
		}
	}
	var b = $("answer").innerHTML;
	var a = b.split("/");
	a[0] = parseInt(a[0]) + correct;
	a[1] = parseInt(a[1]) + numberOfTarget;
	$("answer").update(a[0]+"/"+a[1]);
	timer = setTimeout(startToSetTarget,interval);
}
