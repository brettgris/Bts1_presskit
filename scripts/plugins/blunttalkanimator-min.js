!function($,t,e,i){function a(t,e,i,a,o,n,r){var h=$(".quote"),s=$(".bellyband"),l=2*r.quote.height+20,c=r.quote.width+20;if(!r.quoteanimate)if(t>=c&&o>=l)h.width(r.quote.width).height(r.quote.height),s.height(2*r.quote.height),h.css("margin-top",r.quote.height/2+"px"),s.css("top",(o-s.height())/2+"px");else if(t>=c&&l>=o){var d=.5*(o-20);s.height(o-20),s.css("top",(o-s.height())/2+"px"),h.height(d).width(d*r.quote.ratio),h.css("margin-top",(o-20-d)/2+"px")}else if(c>=t&&o>=l){var u=t-20,d=u/r.quote.ratio;h.width(u).height(d),s.height(2*d),s.css("top",(o-s.height())/2+"px"),h.css("margin-top",d/2+"px")}else if(c>t&&l>o)if(r.quote.ratio>n){var u=t-20,d=u/r.quote.ratio;h.width(u).height(d),s.height(2*d),s.css("top",(o-s.height())/2+"px"),h.css("margin-top",d/2+"px")}else{var d=.5*(o-20);s.height(o-20),s.css("top",(o-s.height())/2+"px"),h.height(d).width(d*r.quote.ratio),h.css("margin-top",(o-20-d)/2+"px")}}var o=function(e,i){function o(){y.band.click(function(){TweenMax.killAll(),u(),y.band.hide(),s()}),y.artwork.click(function(){TweenMax.killAll(),u(),y.artwork.hide(),$(".plink").eq(0).trigger("click")})}function n(){g.on(f.startevent,r),g.on(f.clearevent,d)}function r(){f.onStart.call(this),m(),h()}function h(){y.band.show();var t=new TimelineLite;t.call(function(){m(),y.quoteanimate=!0}),t.set(".bellyband",{left:"100%"}),t.set(".quote",{opacity:0}),t.to(".bellyband",f.band.speed,{left:"-50%",delay:f.band.delay}),t.to(".quote",f.quote.speed,{opacity:1,delay:f.quote.delay}),t.to(".quote",f.quote.speed,{opacity:0,delay:f.quote.delayout}),t.to(".bellyband",f.band.speed,{left:"-200%",delay:f.band.delayout}),t.call(function(){y.band.hide(),y.quoteanimate=!1,u(),m(),s()}),t.play()}function s(){y.artwork.show(),TweenMax.fromTo("#headoutline",f.outline.speed,{drawSVG:"100% 100%"},{drawSVG:"00% 100%",delay:f.outline.delay}),TweenMax.from(".ta",f.ta.speed,{opacity:0,delay:f.ta.delay,ease:Power1.easeOut}),y.animate=!0,y.itemcss=[];for(var t in y.items){var e=$(y.items[t]),i={width:Number(e.css("width").slice(0,-2)),height:Number(e.css("height").slice(0,-2)),ml:Number(e.css("margin-left").slice(0,-2)),mt:Number(e.css("margin-top").slice(0,-2))};y.itemcss.push(i),TweenMax.set(y.items[t],{width:"0px",height:"0px","margin-left":"0px","margin-top":"0px"}),TweenMax.to(y.items[t],f.icons.speed*f.icons.ratio,{width:i.width*f.icons.large+"px",height:i.height*f.icons.large+"px","margin-left":i.ml*f.icons.large+"px","margin-top":i.mt*f.icons.large+"px",delay:f.icons.delay*t+f.icons.alldelay,onComplete:l,onCompleteParams:[t],ease:Power1.easeOut})}}function l(t){TweenMax.to(y.items[t],f.icons.speed*(1-f.icons.ratio),{width:y.itemcss[t].width+"px",height:y.itemcss[t].height+"px","margin-left":y.itemcss[t].ml+"px","margin-top":y.itemcss[t].mt+"px",onComplete:c,onCompleteParams:[t],ease:Power1.easeIn})}function c(t){t==y.items.length-1&&(f.onComplete.call(this),y.animate=!1,u(),m())}function d(){y.animate=!1,y.quoteanimate=!1,y.artwork.hide(),u(),TweenMax.killAll()}function u(){$(".ta").attr("style","");for(var t in y.items)$(y.items[t]).attr("style","");$(".bellyband").attr("style",""),$(".quote").attr("style","")}function p(){y.items=[];for(var t=x.length,e=0;t>e;e++)y.items.push("."+x[e]),e<b.length&&y.items.push("."+b[e])}function m(){var e=$(t).width(),i=$(t).height(),o=$(".footer").height(),n=Number($(".content").css("top").slice(0,-2)),r=i-o-n,h=e/r;e>y.art.width&&r>y.art.height?(y.art.w=y.art.width,y.art.h=y.art.height):e>=y.art.width&&r<y.art.height?(y.art.h=r-20,y.art.w=y.art.h*y.art.ratio):e<y.art.width&&r>=y.art.height?(y.art.w=e-20,y.art.h=y.art.w/y.art.ratio):e<y.art.width&&r<y.art.height&&(y.art.ratio>h?(y.art.w=e-20,y.art.h=y.art.w/y.art.ratio):(y.art.h=r-20,y.art.w=y.art.h*y.art.ratio)),y.animate||(y.container.css({width:y.art.w+"px",height:y.art.h+"px","margin-left":y.art.w/-2+"px",top:(r-y.art.h)/2+"px"}),g.height(r)),a(e,i,o,n,r,h,y)}var g=$(e),w=this,f=$.extend({container:".artwork",startevent:"animationStart",clearevent:"animationClear",icons:{speed:1,ratio:.66,large:1.2,delay:.1,alldelay:.5},ta:{speed:1.5,delay:1.2},outline:{speed:3,delay:.2},band:{speed:.5,delay:.5,delayout:0},quote:{speed:1,delay:.5,delayout:2},onStart:function(){},onComplete:function(){}},i||{}),y={},x=["mic","money","weed","coffee","openbook","us","anchor","pills","sword","statue","nipple","largepills","paint","woman","pillcontainer","books","pour"],b=["camera","flask","onair","weed2","bottle","bra","hat","glass","world","coins","canoe","waltersign","brush","panties","shoe"];this.el=g,this.init=function(){y.container=g.find(f.container),y.art={width:y.container.width(),height:y.container.height(),ratio:y.container.width()/y.container.height()},y.quote={width:$(".quote").width(),height:$(".quote").height(),ratio:$(".quote").width()/$(".quote").height()},y.artwork=$(".artwork"),y.band=$(".bellyband"),y.quoteanimate=!1,y.animate=!1,$(t).resize(m),m(),p(),u(),o(),n()}};$.fn.blunttalkanimator=function(t){return this.each(function(){var e=new o(this,t);e.init()})}}(jQuery,window,document);