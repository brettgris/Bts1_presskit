!function($,t,n,e){var i=function(t,n){function i(){l.thumbs.click(function(){var t=Number($(this).attr(a.attr));c(t)}),u.find(a.next).click(function(){var t=l.current;t++,t==l.thumbs.length&&(t=0),r(t)}),u.find(a.prev).click(function(){var t=l.current;t--,0>t&&(t=l.thumbs.length-1),r(t)}),l.close.click(function(){l.viewer.html(""),l.viewcontainer.hide(),l.list.show()}),l.viewcontainer.swipe({swipeLeft:function(){u.find(a.next).trigger("click")},swipeRight:function(){u.find(a.prev).trigger("click")}})}function r(t){a.onStart.call(e,l.thumbs.eq(l.current)),$(".container").scrollTo(0,250,{onAfter:function(){l.viewer.children().fadeOut(1e3*a.speed,function(){$(this).remove(),l.current=t,a.onSwitch.call(e,l.thumbs.eq(l.current));var n=a.source;n=o(n,l.thumbs.eq(l.current)),l.viewer.html(n);var i=o(a.captionsource,l.thumbs.eq(l.current));l.caption.html(i),l.viewer.children().hide().fadeIn(1e3*a.speed,function(){a.onEnd.call(e,l.thumbs.eq(l.current))})})}})}function c(t){l.current=t,a.onStart.call(e,l.thumbs.eq(l.current)),$(".container").scrollTo(0,250,{onAfter:function(){l.list.hide(),l.viewer.html(""),l.viewcontainer.show();var t=a.source;t=o(t,l.thumbs.eq(l.current)),l.viewer.html(t);var n=o(a.captionsource,l.thumbs.eq(l.current));l.caption.html(n),l.viewer.children().hide().fadeIn(1e3*a.speed,function(){a.onEnd.call(e,l.thumbs.eq(l.current))})}})}function o(t,n){for(var e=t.split("{{"),i=0;i<e.length;i++){var r=e[i].split("}}");r.length>1&&(r[0]=n.attr(r[0])),e[i]=r.join("")}return t=e.join("")}var u=$(t),s=this,a=$.extend({thumbs:".thumbs",list:".list",attr:"n",current:0,viewcontainer:".container",viewer:".view",next:".next",prev:".prev",close:".close",speed:1,selected:"selected",source:"<img src={{path}} />",caption:".image-desc",captionsource:"{{caption}}",onStart:function(){},onSwitch:function(){},onEnd:function(){}},n||{}),l={};this.el=u,this.init=function(){l.thumbs=u.find(a.thumbs),l.list=u.find(a.list),l.viewcontainer=u.find(a.viewcontainer),l.viewer=u.find(a.viewer),l.caption=u.find(a.caption),l.close=u.find(a.close),l.current=0,l.thumbs.each(function(t){l.thumbs.eq(t).attr("n",t)}),i()}};$.fn.presskitGallery=function(t){return this.each(function(){var n=$(this),e=new i(this,t);n.data("presskitGallery",e),e.init()})}}(jQuery,window,document);