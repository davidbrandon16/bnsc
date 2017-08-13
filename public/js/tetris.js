window.onload = function(){
	var canvas = document.getElementById("tetris_canvas");
	var context = canvas.getContext("2d");
	let RED = 1;
	let BLUE = 3;
	let GREEN = 2;
	var tetris_blocks = [];
	function mapping(){
		for (var i = tetris_blocks.length - 1; i >= 0; i--) {
			for (var j = 4 - 1; j >= 0; j--) {
				if(tetris_blocks[i].ys[j] ==-1) continue;
				map[tetris_blocks[i].ys[j]][tetris_blocks[i].xs[j]] = (tetris_blocks[i].is_landed==1? tetris_blocks[i].color+10:tetris_blocks[i].color);
			}
		}
	}
	function loop(){
		clear_map();
		mapping();	
		checkwin();
		draw();
		run();
	}
	function checkwin(){
		var can_clear =0;
		var height =-1;
		for(var i=0;i<total_block;i++){
			can_clear =0;
			for(var j=0;j<total_block;j++){
				if(map[i][j]>10)
					can_clear++;
			}
			console.log(i,can_clear);
			if(can_clear == total_block){

				height = i;
				break;
			}
		}
		if(can_clear == total_block){
			for(var i =height ;i> 0;i--){
				for(var j=0;j<total_block;j++){
					map[i][j] = map[i-1][j];
				}
			}
			for (var i = tetris_blocks.length - 1; i >= 0; i--) {
				for (var j = 4 - 1; j >= 0; j--) {
					if(tetris_blocks[i].ys[j]==height)
						tetris_blocks[i].ys[j]=-1;
					else 
						tetris_blocks[i].ys[j]++;
				}
			}
			loop();

		}

	}
	var width = canvas.width;
	var height = canvas.height;
	var total_block = 16;
	var map =new  Array(total_block);
	for(var i = 0;i< total_block;i++){
		map[i] = new Array(total_block);
	}
	function clear_map(){
		for(var i=0;i<total_block;i++){
			for(var j=0;j<total_block;j++){
				map[i][j] =0;
			}
		}
	}
	var width_per_block = width /total_block;
	var border = 2;
	function draw(){
		context.clearRect(0,0,width,height);
		for(var i=0;i< total_block;i++){
			for(var j=0;j<total_block;j++){
				context.fillStyle = "black";
				context.fillRect(j*width_per_block,i*width_per_block,(j+1)*width_per_block,(i+1)*width_per_block);
				var color = (map[i][j]>10 ? map[i][j]-10:map[i][j]);
				switch(color){
					case RED:
						context.fillStyle = "red";
						break;
					case GREEN:
						context.fillStyle = "green";
						break;
					case BLUE:
						context.fillStyle = "blue";
						break;
					default:
						context.fillStyle = "#ccc";
						break;				
				}	
				context.fillRect(j*width_per_block+border,i*width_per_block+border,(j+1)*width_per_block-border,(i+1)*width_per_block-border);

			}
		}
	}

	function tetris_block(type){
		this.color = parseInt(Math.random()*3) +1;
		this.xs = [];
		this.ys = [];
		this.type = type;
		this.rotation = 0;
		this.is_landed = 0;
		switch(type){
		case 1:
			for (var i = 0; i <4; i++) {
				this.xs[i] = i;
				this.ys[i] = 0;
				if(map[this.ys[i]][this.xs[i]]!=0){
					clearInterval(main);
				}
			}
			break;
		case 2 :
			for (var i = 0; i <4; i++) {
				this.xs[i] = i%2;
				if(i<2) this.ys[i] =0;
				else this.ys[i] =1;
				if(map[this.ys[i]][this.xs[i]]!=0){
					clearInterval(main);
				}
			}
			break;
		case 3:
			for(var i=0 ;i< 4;i++){
				if(i==3) this.xs[i]=1;
				else this.xs[i] =0;
				if(i==3) this.ys[i] =i-1;
				else this.ys[i] =i;
				if(map[this.ys[i]][this.xs[i]]!=0){
					clearInterval(main);
				}
			}
			break;
		case 4:
			for(var i=0 ;i< 4;i++){
				if(i==1 || i==2) this.ys[i]=1;
				else if(i ==3) this.ys[i] = i-1;
				else this.ys[i] =i;
				
				if(i<2) this.xs[i] = 0;
				else this.xs[i] =1;
				if(map[this.ys[i]][this.xs[i]]!=0){
					clearInterval(main);
				}
			}
			break;
		case 5:
			for(var i =0;i< 4;i++){
				if(i==3) {
					this.xs[i]=1;
					this.ys[i]=1;
				}
				else {
					this.xs[i]=i;
					this.ys[i]=0;
				}
				if(map[this.ys[i]][this.xs[i]]!=0){
					clearInterval(main);
				}

			}
		}	
	}

	function run(){
		max = getMaximum("y",tetris_blocks[tetris_blocks.length-1]);
		if(max ==total_block-1) {
			tetris_blocks[tetris_blocks.length-1].is_landed = 1;
			tetris_blocks.push(new tetris_block(parseInt(Math.random()*5)+1));
			return;
		};
		for(var i=0;i<4;i++){
			tetris_blocks[tetris_blocks.length-1].ys[i]++;
		}
	}
	tetris_blocks.push(new tetris_block(parseInt(Math.random()*5)+1));
	loop();
	var main = setInterval(loop,800);
	function getMininum(type,obj){
		var min =100;
		if(type =="x"){
			for(var i=0;i<4;i++){
				min = (min>obj.xs[i]? obj.xs[i]: min);
				if(min == 0) continue;
				if(map[obj.ys[i]][obj.xs[i]-1]>10){
					min = 0;
				}
			}
		}else{
			for(var i=0;i<4;i++){
				min = (min>obj.ys[i]? obj.ys[i]: min);
				if(min == 0) continue;
				if(map[obj.ys[i]-1][obj.xs[i]]>10){
					min = 0;
				}
			}
		}
		return min;

	}
	function getMaximum(type,obj){
		var max =-1;
		if(type=="x" ){
			for(var i=0;i<4;i++){
				max = (max<obj.xs[i]? obj.xs[i]: max);
				if(max == total_block-1) continue;
				if(map[obj.ys[i]][obj.xs[i]+1]>10){
					max = total_block-1;
				}
			}
		}else{
			for(var i=0;i<4;i++){
				max = (max<obj.ys[i]? obj.ys[i]: max);
				if(max == total_block-1) continue;
				if(map[obj.ys[i]+1][obj.xs[i]]>10){
					max = total_block-1;
				}
			}
		}
		return max;

	}
	function rotation(obj){
		obj.rotation = (obj.rotation+1)%4;
		if(obj.rotation == 0){
			
		}
	}
	window.onkeydown = function(e){
		if(e.keyCode == 37){
			min = getMininum("x",tetris_blocks[tetris_blocks.length-1]);
			if(min ==0) return;
			for(var i=0;i<4;i++){
				tetris_blocks[tetris_blocks.length-1].xs[i]--;
			}
		}else if(e.keyCode == 39){
			max = getMaximum("x",tetris_blocks[tetris_blocks.length-1]);
			if(max ==total_block-1) return;
			for(var i=0;i<4;i++){
				tetris_blocks[tetris_blocks.length-1].xs[i]++;
			}
		}else if(e.keyCode == 40 ){
			run();
		}else if(e.keyCode == 38){
			rotation(tetris_blocks[tetris_blocks.length-1]);
		}
		clear_map();
		mapping();
		draw();
	}
}