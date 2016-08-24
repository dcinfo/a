//getStyle取样式值函数
function getStyle(obj,name){
	var value=obj.currentStyle ? obj.currentStyle[name]:getComputedStyle(obj,false)[name];
	if(name=='opacity'){
		value=Math.round(parseFloat(value)*100);
	}
	else{
		value=parseInt(value);
	}
	return value;
}
//move函数
function move(obj,modejosn,stoptime,callback){
	var speed={
		"veryslow":2000,
		"slow":5000,
		"normal":1000,
		"fast":500,
		"veryfast":200
	};
	if(stoptime){
		if(typeof stoptime=="string"){
			stoptime=speed[stoptime];
			
		};
	}
	else{
		stoptime=speed.normal;
	}
	
	//var start=getStyle(obj,move_mode);//设置起始距离,用getStyle函数取值
	//var dis=end-start;//结束减开始，算出总距离值
	var count=parseInt(stoptime/30);//结束时间除于30毫秒，取时间总的份数
	var num=0;//设置一个计步器
	
	var start={};//
	var dis={};
	for(var key in modejosn){
		start[key]   =  getStyle(obj,key)
		dis[key]=modejosn[key]-start[key]
	};
	
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		num++;
		//开始距离+总距离除总的时间份数(每一段的距离)乘num
		a=1-num/count;
		
		for(var key in modejosn){
			dis_step=start[key]+dis[key]*(1-a*a);
			if(key=='opacity'){//透明度判断
				obj.style.opacity=dis_step/100;
				obj.style.filter='alpha(opacity='+dis_step+')';//判断ie
			}else{
				obj.style[key]=dis_step+'px';
			}
		};
		
		if(num==count){
			clearInterval(obj.timer);
			callback && callback();
		}
	},30);
}