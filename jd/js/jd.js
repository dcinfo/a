window.onload=function(){
	//----------------------------菜单----------------------//
	function menu(){
		var submenu_list=document.getElementById("submenu_list");
		var submenu_list_ali=submenu_list.children;
		var submenu_cont=document.getElementById("submenu_cont");
		var submenu_cont_adiv=submenu_cont.children;
		var timer_1=null;
		var timer_2=null;
		var timer_3=null;
		var index=null;
		//alert(submenu_cont_adiv.length)
		for(var i=0;i<submenu_list_ali.length;i++){
			submenu_list_ali[i].index=i;
			submenu_list_ali[i].onmouseover=function(){
				clearTimeout(timer_2);
				clearTimeout(timer_3);
				var self=this;
				timer_1=setTimeout(mousein,300);
				function mousein(){
					for(var j=0;j<submenu_list_ali.length;j++){
						submenu_list_ali[j].className='';
						submenu_cont.style.display='block'
						submenu_cont_adiv[j].style.display='none';
					};
					self.className='list_nav_bg'
					submenu_cont_adiv[self.index].style.display='block';
					index=self.index;
				};
			};
				submenu_list_ali[i].onmouseout=function(){
				clearTimeout(timer_1);
				//submenu_list_ali[index].className='';
				timer_2=setTimeout(function(){
					submenu_list_ali[index].className='';
					submenu_cont.style.display='none';
				},300);
			};
		};
		
		submenu_cont.onmouseover=function(){
			clearTimeout(timer_2);
			clearTimeout(timer_3);
			submenu_list_ali[index].className='list_nav_bg'
			submenu_cont.style.display='block';
		}
		
		submenu_cont.onmouseout=function(){
			submenu_list_ali[index].className='';
			timer_3=setTimeout(function(){
				submenu_cont.style.display='none';
			},300)
		}
	}
	menu();
	
	//----------------------------轮播--------------------------------------//
	
	function slideshow(){
		var oBanner=document.getElementById("bannerad");
		var prevBtn=document.getElementById("left");
		var nextBtn=document.getElementById("right");
		
		var oUl=oBanner.getElementsByTagName('ul')[0];
		var aLi=oUl.children;
		var numBtn=oBanner.getElementsByTagName('ol')[0].children;
		var movetimer='';
		var show_num=0;//记录当前图片的index
		 
		li_w=getStyle(aLi[0],'width');
		ul_w=li_w*aLi.length;
		oUl.style.width=ul_w+'px';
		numBtn[0].className='activenum';
		
		prevBtn.style.display=nextBtn.style.display='block';
		
		for(var i=0;i<numBtn.length;i++){
			numBtn[i].index=i;//发牌照
			numBtn[i].onclick=function(){
				for (var j=0;j<numBtn.length;j++){
						numBtn[j].className='';
				}
				this.className='activenum';
				show_num=this.index;
				move(oUl,{'left':-show_num*li_w},1000);
			}
		}
	
		function autorun(){//自动播放函数
			movetimer=setInterval(function(){
			for (var i=0;i<numBtn.length;i++){
					numBtn[i].className='';
				}
			numBtn[show_num].className='activenum';
			move(oUl,{'left':-show_num*li_w},1000);
			show_num++;
			if(show_num==numBtn.length) show_num=0;
			},2000);
		};
		
		autorun();
		
		oBanner.onmouseover=function(){
			prevBtn.style.display=nextBtn.style.display='block';
			clearInterval(movetimer);
		};
		
		oBanner.onmouseout=function(){
		prevBtn.style.display=nextBtn.style.display='none';
		autorun();
		};
		
		prevBtn.onclick=function(){
			show_num--;
			if(show_num<0) show_num=aLi.length-1;
			move(oUl,{'left':-show_num*li_w},1000);
			for(var i=0;i<numBtn.length;i++){
				numBtn[i].className='';
			}
			numBtn[show_num].className='activenum';
		}
		
		nextBtn.onclick=function(){
			show_num++;
			if(show_num>aLi.length-1) show_num=0;
			move(oUl,{'left':-show_num*li_w},1000);
			for(var i=0;i<numBtn.length;i++){
				numBtn[i].className='';
			}
			numBtn[show_num].className='activenum';
		}
	}
	slideshow();
//-----------------轮播结束------------------------//
/*	
	function tab(){
		var f1_list=document.getElementById("f1_list");
		var f1_cont=document.getElementById("f1_cont");
		var aTabs=f1_cont.children;
		var aLi=f1_list.getElementsByTagName('li');
		var aSpan=f1_list.getElementsByTagName('span');
		
		for(var i=0;i<aLi.length;i++){
			aLi[i].index=i;
			aLi[i].onmouseover=function(){
				for(var j=0;j<aLi.length;j++){
					aLi[j].className='';
					aSpan[j].style.display='block';
					aSpan[aSpan.length-1].style.display='none';
					aTabs[j+1].style.display='none';
				}
				this.className='active';
				aTabs[this.index+1].style.display='block';
				if(this.index>0){
					aSpan[this.index].style.display='none';
					aSpan[this.index-1].style.display='none';
				}else{
					aSpan[this.index].style.display='none';
				}
			}
		}
	}*/
	//tabs();
	//-------------------选项卡---------------------------//
	function tabs(list,cont){
		var tabs_list=document.getElementsByClassName(list);
		var tabs_cont=document.getElementsByClassName(cont);
		for(var i=0;i<tabs_list.length;i++){
			(function(index){
					var aLi=tabs_list[index].getElementsByTagName('li');
					var aSpan=tabs_list[index].getElementsByTagName('span');
					var aTabs=tabs_cont[index].children;
					for(var j=0;j<aLi.length;j++){
						aLi[j].index=j;
						aLi[j].onmouseover=function(){
							for(var k=0;k<aLi.length;k++){
							aLi[k].className='';
							aSpan[k].style.display='block';
							aSpan[aSpan.length-1].style.display='none';
							aTabs[k+1].style.display='none';
							}
						this.className='active';
						aTabs[this.index+1].style.display='block';
						if(this.index>0){
							aSpan[this.index].style.display='none';
							aSpan[this.index-1].style.display='none';
							}else{
							aSpan[this.index].style.display='none';
							}
						}
					}
				
			})(i);
		}
	}
	tabs("li_list","tabscont");
	
	
}
