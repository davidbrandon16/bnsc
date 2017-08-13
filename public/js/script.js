$(document).ready(function(){
    $(".content-image div").hide("fast");
    $(".content-information div").hide("fast");
    $(window).scroll(function(event){
        console.log(window.innerHeight);
        if($(window).scrollTop()+window.innerHeight >= $('.content-image').offset().top){
            $(".content-image div").show("slow");
        }else if($(window).scrollTop()+window.innerHeight <= $('.content-image').offset().top )
            $(".content-image div").hide("fast");
        if($(window).scrollTop()+window.innerHeight >= $('.content-information').offset().top){
            $(".content-information div").show("slow");
        }else if($(window).scrollTop()+window.innerHeight <= $('.content-information').offset().top )
            $(".content-information div").hide("fast");
    });
    $('.menu-item').click(function(){
        var link = $(this).find('a').attr("href");
        window.location.href= link;
    });
    $('#btnPlay').click(function(){
        tetris();
        $(this).hide("slow");
    });
    // for tetris
    function tetris(){
        var canvas = document.getElementById("tetris_canvas");
        var context = canvas.getContext("2d");
        var RED = 1;
        var BLUE = 3;
        var GREEN = 2;
        var tetris_blocks = [];
        // make map same with
        function mapping(){
            checkwin();
            for (var i = tetris_blocks.length - 1; i >= 0; i--) {
                for (var j = 0; j < 4; j++) {
                    if(tetris_blocks[i].ys[j] ==-1) {
                        continue;
                    }
                    map[tetris_blocks[i].ys[j]][tetris_blocks[i].xs[j]] = (tetris_blocks[i].is_landed==1? tetris_blocks[i].color+10:tetris_blocks[i].color);
                }
            }
        }
        // for rendering
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
                if(can_clear == total_block){
                    height = i;
                    for (var k = tetris_blocks.length - 1; k >= 0; k--) {
                        for (var l = 3; l >= 0; l--) {
                            if(tetris_blocks[k].ys[l]==height || tetris_blocks[k].ys[l]==-1)
                                tetris_blocks[k].ys[l]=-1;
                            else if(tetris_blocks[k].ys[l]<height)
                                tetris_blocks[k].ys[l]= tetris_blocks[k].ys[l]+1;
                        }
                    }
                    can_clear=0;
                    $score = parseInt($("#score").html());
                    $score +=10;
                    $("#score").html($score);
                    //clearInterval(main)
                    loop();
                }
            }


        }
        var width = canvas.width;
        var height = canvas.height;
        var total_block = 10;
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
                            console.log("masuk");
                            clearInterval(main);
                            gameOver();
                        }
                    }
                    break;
                case 2 :
                    for (var i = 0; i <4; i++) {
                        this.xs[i] = i%2;
                        if(i<2) this.ys[i] =0;
                        else this.ys[i] =1;
                        if(map[this.ys[i]][this.xs[i]]!=0){
                            console.log("masuka");
                            clearInterval(main);
                            gameOver();
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
                            gameOver();
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
                            gameOver();
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
                            gameOver();
                        }

                    }
            }
        }

        function run(){
            max = getMaximum("y",tetris_blocks[tetris_blocks.length-1]);
            if(max ==total_block-1) {
                tetris_blocks[tetris_blocks.length-1].is_landed = 1;
                tetris_blocks.push(new tetris_block(parseInt(Math.random()*2)+1));
                return;
            };
            for(var i=0;i<4;i++){
                tetris_blocks[tetris_blocks.length-1].ys[i]++;
            }
        }
        tetris_blocks.push(new tetris_block(parseInt(Math.random()*2)+1));
        loop();
        var main = setInterval(loop,1000);
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


        function gameOver(){
            console.log("kepanggil");
            $("#status").html("Game Over");

        }
    }
});