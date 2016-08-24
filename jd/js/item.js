window.onload=function(){
	//--------放大镜--------//
	function zoom(){
		var oMain=document.getElementById("main");
		var oSmallBox=document.getElementById("smallbox");
		var oFloatBox=document.getElementById("floatbox");
		var oBigBox=document.getElementById("bigbox");
		var oImg=oBigBox.getElementsByTagName('img')[0];
		var oUl=document.getElementById("imgul");
		var aLi=oUl.getElementsByTagName('li');
		var aImg=oUl.getElementsByTagName('img');
		
		for(var i=0;i<aImg.length;i++){
			aImg[i].index=i;
			aImg[i].onmouseover=function(){
				for(var j=0;j<aImg.length;j++){
					aImg[j].className='';
				}
				this.className='active'
				oSmallBox.children[0].src=this.src;
				oBigBox.children[0].src=this.src;
			}
		}
		
		
		oSmallBox.onmouseover=function(){
			oFloatBox.style.display="block";
			oBigBox.style.display="block";
		};
		oSmallBox.onmouseout=function(){
			oFloatBox.style.display="none";
			oBigBox.style.display="none";
		};
		oSmallBox.onmousemove=function(ev){
			oEv=ev || window.event;
			var left=oEv.clientX-oMain.offsetLeft-oSmallBox.offsetLeft-oFloatBox.offsetWidth/2;
			var top=oEv.clientY-oMain.offsetTop-oSmallBox.offsetTop-oFloatBox.offsetHeight/2;
			var width=oSmallBox.offsetWidth-oFloatBox.offsetWidth;
			var height=oSmallBox.offsetHeight-oFloatBox.offsetHeight;
			if(left<0) left=0;
			if(top<0)	top=0;
			if(left>width) left=width;
			if(top>height) top=height;
			oFloatBox.style.left=left+'px';
			oFloatBox.style.top=top+'px';
			
			//计算一个比例,意思为大图计算一个相对的比例,由left的值/盒子的宽度-浮层图的宽度，对应大图图片的宽度-显示区域的比例
			
			var rateX=left/width;
			var rateY=top/height;
			
			oImg.style.left=-rateX * (oImg.offsetWidth-oBigBox.offsetWidth)+'px';//以上比例乘于这个值等到图片相对应的left值，取负值实现反向
			oImg.style.top=-rateY * (oImg.offsetHeight-oBigBox.offsetHeight)+'px';
			
		};
	}
	zoom();
	
	//-------------选择颜色样式--------------
	function choose(){
		var aChoose=document.getElementById("choose").getElementsByTagName('li');
		for(var i=0;i<aChoose.length;i++){
			aChoose[i].index=i;
			aChoose[i].onclick=function(){
				for(var j=0;j<aChoose.length;j++){
					aChoose[j].className='';
					aChoose[j].children[1].style.display='none';
				}
			this.className='ch_selected';
			this.children[1].style.display='block';
			}
		}
	}
	choose();
	
	//-----增值保障隐藏显示--------
	function baozhang(){
		var baozhang1=document.getElementById("baozhang1");
		var baozhang2=document.getElementById("baozhang2");
		
		baozhang1.onmouseover=baozhang2.onmouseover=function(){
			this.children[3].style.display='block';
		}
		
		baozhang1.onmouseout=baozhang2.onmouseout=function(){
			this.children[3].style.display='none';
		}
	}
	baozhang();
	
	//------数量加减-------
	function boxinput(){
		var boxinput=document.getElementById("boxinput");
		var input_num=1;
		boxinput.children[1].onclick=function(){
			input_num++;
			if(input_num>=10) input_num=10;
			boxinput.children[0].value=input_num;
			
		};
		boxinput.children[2].onclick=function(){
			input_num--;
			if(input_num<=0) input_num=1;
			boxinput.children[0].value=input_num;
		};
	}
	boxinput();
	
	//--------选项卡--------------
	function itemtabs(){
		var itemtabs_li=document.getElementById("itemtabs").getElementsByTagName('li');
		var itemtabscont=document.getElementById("itemtabscont");
		
		for(var i=0;i<itemtabs_li.length;i++){
			itemtabs_li[i].index=i;
			itemtabs_li[i].onclick=function(){
				for(var j=0;j<itemtabs_li.length;j++){
					itemtabs_li[j].className='';
					itemtabs_li[j].children[0].style.color='';
					itemtabscont.children[j].style.display='none';
				}
				this.className='active';
				this.children[0].style.color='#e4393c';
				itemtabscont.children[this.index].style.display='block';
			}
		}
	}
	itemtabs();
	
	//----商品小图移动--------//
	function moveicon(){
		var prevBtn=document.getElementById("prev");
		var nextBtn=document.getElementById("next");
		var imgUl=document.getElementById("imgul");
		var imgLi=imgUl.getElementsByTagName('li');
		var num=0;
		
		li_w=getStyle(imgLi[0],'width');
		ul_w=li_w*imgLi.length;
		imgUl.style.width=ul_w+'px';
		
		nextBtn.onclick=function(){
			num++;
			if(num>imgLi.length-5) num=imgLi.length-5;
			//imgUl.style.left=-num*li_w+'px';
			move(imgUl,{'left':-num*li_w},400);
		}
		
		prevBtn.onclick=function(){
			num--;
			if(num<0) num=0;
			//imgUl.style.left=-num*li_w+'px';
			move(imgUl,{'left':-num*li_w},400);
		}
	}
	moveicon();
	
	
	function peisong(){
		var pstext=document.getElementById("pstext");
		var pscont=document.getElementById("pscont");
		var closebtn=document.getElementById("closebtn");
		var areachoose=document.getElementById("areachoose");
		var aLi=pscont.children[0].getElementsByTagName('li')
		var timer1=null;
		var timer2=null;
		
		pstext.onmouseover=function(){
			
			this.style.borderBottom="1px solid #fff"
			pscont.style.display="block";
		}
		
		pstext.onmouseout=closebtn.onclick=function(){
				pscont.style.display="none";
			
		};
		
		pscont.onmouseover=function(){
				pstext.style.borderBottom="1px solid #fff"
				this.style.display="block";
				for(var i=0;i<aLi.length;i++){
				aLi[i].index=i;
				aLi[i].onclick=function(){
					for (var j=0;j<aLi.length;j++){
						aLi[j].className='';
						areachoose.children[j].style.display='none';
					}
				this.className='active';
				areachoose.children[this.index].style.display='block';
				}
			}
		}
		
		pscont.onmouseout=function(){
			this.style.display="none";
			pstext.style.borderBottom="1px solid #CECBCE"
		}
		
	}
	peisong();
}
