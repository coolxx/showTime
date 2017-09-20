var WINDOW_WIDTH=1024;
var WINDOW_HEIGHT=768;
var MARGIN_TOP=60;
var MARGIN_LEFT=30;
var curhour=new Date().getHours();
var curminu=new Date().getMinutes();
var cursecd=new Date().getSeconds();
//定义小球的半径
var RADIUS=8;

var balls=[];

var colors=['#33b5e5','#0099cc','#aa66cc','#9933cc','#99cc00','669900','#ffbb33','#ff8800','#ff4444','#cc0000']

window.onload=function () {
	var canvas=document.getElementById('canvas');
	var context=canvas.getContext('2d');
	canvas.width=WINDOW_WIDTH;
	canvas.height=WINDOW_HEIGHT;
	setInterval(
		function(){
			render(context);
			update();
		}
		,50
	)
}

function update(){
	var nexhour=new Date().getHours();
	var nexminu=new Date().getMinutes();
	var nexsecd=new Date().getSeconds();
	if(nexsecd!=cursecd){
		if(parseInt(curhour/10) != parseInt(nexhour/10)){
			addBalls(MARGIN_LEFT+0,MARGIN_TOP,parseInt(nexhour/10));
		}
		if(parseInt(curhour%10) != parseInt(nexhour%10)){
			addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(nexhour%10));
		}
		if(parseInt(curminu/10) != parseInt(nexminu/10)){
			addBalls(MARGIN_LEFT+40*(RADIUS+1),MARGIN_TOP,parseInt(nexminu/10));
		}
		if(parseInt(curminu%10) != parseInt(nexminu%10)){
			addBalls(MARGIN_LEFT+55*(RADIUS+1),MARGIN_TOP,parseInt(nexminu%10));
		}
		if(parseInt(cursecd/10) != parseInt(nexsecd/10)){
			addBalls(MARGIN_LEFT+80*(RADIUS+1),MARGIN_TOP,parseInt(nexsecd/10));
		}
		if(parseInt(cursecd%10) != parseInt(nexsecd%10)){
			addBalls(MARGIN_LEFT+95*(RADIUS+1),MARGIN_TOP,parseInt(nexsecd%10));
		}
		curhour=nexhour;
		curminu=nexminu;
		cursecd=nexsecd;
	}
	updateBalls();
}
function updateBalls(){
	for(var i=0;i<balls.length;i++){
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;
		if(balls[i].y >= WINDOW_HEIGHT-RADIUS){
			balls[i].y=WINDOW_HEIGHT-RADIUS;
			balls[i].vy=-balls[i].vy*0.65;
		}
	}
}
function addBalls(x,y,num){
	for(var i=0;i<digit[num].length;i++){
		for(j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				var aBall={
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					g:2.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy:-6,
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall);
			}
		}
	}
}

function render(cxt){
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT)
	//小时显示
	renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(curhour/10),cxt);
	renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curhour%10),cxt);
	//冒号显示
	renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,parseInt(10),cxt);
	//分钟显示
	renderDigit(MARGIN_LEFT+40*(RADIUS+1),MARGIN_TOP,parseInt(curminu/10),cxt);
	renderDigit(MARGIN_LEFT+55*(RADIUS+1),MARGIN_TOP,parseInt(curminu%10),cxt);
	//冒号显示
	renderDigit(MARGIN_LEFT+70*(RADIUS+1),MARGIN_TOP,parseInt(10),cxt);
	//秒数显示
	renderDigit(MARGIN_LEFT+80*(RADIUS+1),MARGIN_TOP,parseInt(cursecd/10),cxt);
	renderDigit(MARGIN_LEFT+95*(RADIUS+1),MARGIN_TOP,parseInt(cursecd%10),cxt);

	//绘制彩色小球
	for(var i=0;i<balls.length;i++){
		cxt.fillStyle=balls[i].color;
		cxt.beginPath();
		cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI);
		cxt.closePath();

		cxt.fill()
	}
}

function renderDigit(x,y,num,cxt){
	cxt.fillStyle='blue';
	for(var i=0;i<digit[num].length;i++){
		for(j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j]==1){
				cxt.beginPath();
				cxt.arc(x+j*2*(RADIUS+1)+(RADIUS+1),y+i*2*(RADIUS+1)+(RADIUS+1),RADIUS,0,2*Math.PI);
				cxt.closePath();
				cxt.fill();
			};
		}
	}
}
