!function($,n,t,a){$.loadTemplates=function(n){var t={url:"data/loads.json",onEnded:function(){}},a=this;return a.settings={},a.init=function(){a.settings=$.extend(t,n||{}),a.loadJSON()},a.loadJSON=function(){$.getJSON(a.settings.url,function(n){a.loads=n.loads.length,a.count=0;for(var t in n.loads)a.loadData(n.loads[t])})},a.loadData=function(n){$.ajax({url:n.data,dataType:"json",success:function(t){a.loadTemplate(t,n)}})},a.loadTemplate=function(n,t){var o=$(t.template).html(),e=Handlebars.compile(o),d=e(n);$(t.parent).html(d),a.count++,a.count==a.length&&a.ended()},a.ended=function(){setTimeout(function(){a.settings.onEnded.call()},100)},a.init(n),a}}(jQuery,window,document);