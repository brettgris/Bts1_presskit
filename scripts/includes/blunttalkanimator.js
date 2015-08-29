;(function($, window, document, undefined) {
	var blunttalkanimator = function(element,options){
		var $el = $(element);
		var plugin = this;
		var settings = $.extend({
			container: ".artwork",
			startevent: 'animationStart',
        	clearevent: 'animationClear',
        	icons:{
	        	speed:1,
	        	ratio:.66,
	        	large:1.2,
	        	delay:.1,
	        	alldelay:.5
        	},
        	ta: {
	        	speed:1.5,
	        	delay:1.2
        	},
        	outline: {
	        	speed:3,
	        	delay:.2
        	},
        	band:{
	        	speed: .5,
	        	delay: .5,
	        	delayout: 0
        	}, 
        	quote:{
	        	speed:1,
	        	delay:.5,
	        	delayout:2
        	},
        	onStart: function(){},
        	onComplete: function(){}
    	}, options || {});	  
    	var globals = {};
    	var top = [
			"mic", 
			"money",
			"weed",
			"coffee",
			"openbook", 
			"us", 
			"anchor",
			"pills",
			"sword",
			"statue",
			"nipple",
			"largepills",
			"paint",
			"woman",
			"pillcontainer",
			"books",
			"pour"
		];
		
		var bottom = [
			"camera",
			"flask",
			"onair",
			"weed2",
			"bottle",
			"bra",
			"hat",
			"glass",
			"world",
			"coins",
			"canoe",
			"waltersign",
			"brush", 
			"panties",
			"shoe"
		];
    	
    	this.el = $el;
    	this.init = function(){
	    	globals.container = $el.find(settings.container);
	    	globals.art = {
				width: globals.container.width(),
				height: globals.container.height(),
				ratio: globals.container.width()/globals.container.height()
			};
			globals.quote = {
				width: $('.quote').width(),
				height: $('.quote').height(),
				ratio: $('.quote').width()/$('.quote').height()
			}
			
			globals.artwork = $('.artwork');
			globals.band = $('.bellyband');
			globals.quoteanimate = false;
			globals.animate = false;
			
			$(window).resize(resize);
			resize();
	    	
	    	mergeArrays();
	    	clearAnimation();
	    	addClickEvents();
	    	addAnimateEvents();
    	}
    	
    	function addClickEvents(){
	    	globals.band.click(function(){
		    	TweenMax.killAll();
		    	clearAnimation();
		    	globals.band.hide();
		    	animateHead();
	    	});
	    	
	    	globals.artwork.click(function(){
		    	TweenMax.killAll();
		    	clearAnimation();
		    	globals.artwork.hide();
		    	$('.plink').eq(0).trigger("click");
		    });
    	}
    	
		/******************
		 ADD ANIMATE EVENTS
		*******************/
		function addAnimateEvents(){
			$el.on(settings.startevent, startAnimation);
			$el.on(settings.clearevent, hideArtwork);
		}
		
		/******************
		 START ANIMATION
		*******************/
		function startAnimation(){
			settings.onStart.call(this);
			resize();
			animateBand();
		}
		
		/******************
		 START BELLY BAND / QUOTE
		*******************/
		function animateBand(){
			globals.band.show();
			var tl = new TimelineLite();
			
			tl.call(function(){
				resize();
				globals.quoteanimate = true;
			});
			
			tl.set('.bellyband',{
				"left":"100%"
			});
			
			tl.set('.quote',{
				opacity:0
			});
			
			tl.to('.bellyband', settings.band.speed, {
				"left":"-50%",
				delay: settings.band.delay
			});
			
			tl.to('.quote', settings.quote.speed,{
				opacity:1,
				delay:settings.quote.delay
			});
			
			tl.to('.quote', settings.quote.speed,{
				opacity:0,
				delay:settings.quote.delayout
			});
			
			tl.to('.bellyband', settings.band.speed, {
				left:"-200%",
				delay: settings.band.delayout
			});
			
			tl.call(function(){
				globals.band.hide();
				globals.quoteanimate = false;
				clearAnimation();
				resize();
				animateHead();
			}); 
			
			tl.play();
		}	
			
		/******************
		 ANIMATE HEAD
		*******************/
		function animateHead(){	
			globals.artwork.show();
			
			TweenMax.fromTo("#headoutline", settings.outline.speed, {drawSVG:"100% 100%"}, {drawSVG:"00% 100%", delay:settings.outline.delay});
			TweenMax.from('.ta', settings.ta.speed, {opacity:0, delay: settings.ta.delay, ease: Power1.easeOut});
			
			globals.animate = true;
			globals.itemcss = [];
			for (var i in globals.items){
				var t = $(globals.items[i]);
				
				var css = {
					width:Number(t.css("width").slice(0,-2)),
					height:Number(t.css("height").slice(0,-2)),
					ml:Number(t.css("margin-left").slice(0,-2)),
					mt:Number(t.css("margin-top").slice(0,-2))
				}
				globals.itemcss.push(css);
				
				TweenMax.set(globals.items[i],{
					"width":'0px',
					"height":"0px",
					"margin-left":"0px",
					"margin-top":"0px"
				});
				
				TweenMax.to(globals.items[i],settings.icons.speed*settings.icons.ratio, {
					"width":css.width*settings.icons.large+'px',
					"height":css.height*settings.icons.large+'px',
					"margin-left":css.ml*settings.icons.large+'px',
					"margin-top":css.mt*settings.icons.large+'px',
					delay: (settings.icons.delay*i) + settings.icons.alldelay,
					onComplete: iconOut,
					onCompleteParams:[i],
					ease: Power1.easeOut
				});
			}
		}
		/******************
		 ANIMATE ICONS BACK TO 100%
		*******************/
		function iconOut(i){
			TweenMax.to(globals.items[i],settings.icons.speed*(1-settings.icons.ratio), {
				"width":globals.itemcss[i].width+'px',
				"height":globals.itemcss[i].height+'px',
				"margin-left":globals.itemcss[i].ml+'px',
				"margin-top":globals.itemcss[i].mt+'px',
				onComplete: tweenDone,
				onCompleteParams:[i],
				ease: Power1.easeIn
			});
		}
		
		/******************
		 ALL ICONS DONE
		*******************/
		function tweenDone(i){
			if (i==globals.items.length-1){
				settings.onComplete.call(this);
				globals.animate = false;
				clearAnimation();
				resize();
			}
		}
		
		/******************
		 HIDE ARTWORK
		*******************/
		function hideArtwork(){
			globals.animate = false;
			globals.quoteanimate = false;
			globals.artwork.hide();
			clearAnimation();
			TweenMax.killAll();
		}
		
		/******************
		 RESET ANIMATION
		*******************/
		function clearAnimation(){
			$('.ta').attr("style","");
			
			for (var i in globals.items){
				$(globals.items[i] ).attr("style","");
			}
			
			$('.bellyband').attr('style','');
			$('.quote').attr('style','');
		}
		
		/******************
		 ITEM ORDER
		*******************/
		function mergeArrays(){
			globals.items = [];
			var l = top.length;
			
			for (var i=0;i<l;i++){
				globals.items.push( '.'+top[i] );
				if( i < bottom.length ) globals.items.push( '.'+bottom[i] );
			}
		}
		
		/***************
		RESIZE
		****************/
		function resize(){
			var ww = $(window).width();
			var wh = $(window).height();
			var fh = $('.footer').height();
			var ct = Number( $('.content').css('top').slice(0,-2) );
			
			var ah = wh-fh-ct;
			var wr = ww/ah;
			
			if ( ww>globals.art.width && ah>globals.art.height ){
				globals.art.w = globals.art.width;
				globals.art.h = globals.art.height;
			}
			//WIDTH FITS
			else if (ww>=globals.art.width && ah<globals.art.height) {
				globals.art.h = ah-20;
				globals.art.w = globals.art.h*globals.art.ratio;
			}
			//HEIGHT FITS
			else if (ww<globals.art.width && ah>=globals.art.height) {
				globals.art.w = ww-20;
				globals.art.h = globals.art.w/globals.art.ratio;
			}
			//NONE ON IF FITS
			else if ( ww<globals.art.width && ah<globals.art.height ) {
				if( globals.art.ratio > wr ){
					globals.art.w = ww-20;
					globals.art.h = globals.art.w/globals.art.ratio;
				}else {
					globals.art.h = ah-20;
					globals.art.w = globals.art.h*globals.art.ratio;
				}
			}
			
			if( !globals.animate )	{		
				globals.container.css({
					'width': globals.art.w+'px',
					'height': globals.art.h+'px',
					'margin-left':(globals.art.w/-2)+'px',
					'top':(ah-globals.art.h)/2+'px'
				});

				$el.height(ah);
			}
			
			resizeQuote(ww,wh,fh,ct,ah,wr, globals);
		}
	}
	
	function resizeQuote(ww,wh,fh,ct,ah,wr, globals){
		var q = $('.quote');
		var bb = $('.bellyband');
		
		var mh = globals.quote.height*2+20;
		var mw = globals.quote.width+20;
		
		if (!globals.quoteanimate) {
			//IT ALL FITS
			if (ww>=mw && ah>=mh){
				q.width(globals.quote.width).height(globals.quote.height);
				bb.height(globals.quote.height*2);
				q.css('margin-top', globals.quote.height/2+'px');
				bb.css('top', (ah-bb.height())/2+'px');
			} else if (ww>=mw && ah<=mh) { 
				var nh = (ah-20)*.5;
				bb.height(ah-20);
				bb.css('top', (ah-bb.height())/2+'px');
				q.height(nh).width(nh*globals.quote.ratio);
				q.css('margin-top', ((ah-20)-nh)/2+'px');
			}else if (ww<=mw && ah>=mh) {
				var nw = ww-20;
				var nh = nw/globals.quote.ratio;
				q.width(nw).height(nh);
				bb.height( nh*2);
				bb.css('top', (ah-bb.height())/2+'px');
				q.css('margin-top', nh/2+'px');
			} else if ( ww<mw && ah<mh ) {
				if( globals.quote.ratio > wr ){
					var nw = ww-20;
					var nh = nw/globals.quote.ratio;
					q.width(nw).height(nh);
					bb.height( nh*2);
					bb.css('top', (ah-bb.height())/2+'px');
					q.css('margin-top', nh/2+'px');
				} else {
					var nh = (ah-20)*.5;
					bb.height(ah-20);
					bb.css('top', (ah-bb.height())/2+'px');
					q.height(nh).width(nh*globals.quote.ratio);
					q.css('margin-top', ((ah-20)-nh)/2+'px');
				}
			}
		}	
	}
    
    /******************
	 INIT
	*******************/
	$.fn.blunttalkanimator = function(options){
		return this.each(function(){
			var plugin = new blunttalkanimator(this, options);
			plugin.init();
		});
	}
    
    
})(jQuery, window, document);

