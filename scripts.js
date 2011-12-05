(function(a,b){function e(a,e){c.addType(a,function(f,g,h){var i,j,k,l,m=g,n=(new Date).getTime();if(!f){m={},l=[],k=0;try{f=e.length;while(f=e.key(k++))d.test(f)&&(j=JSON.parse(e.getItem(f)),j.expires&&j.expires<=n?l.push(f):m[f.replace(d,"")]=j.data);while(f=l.pop())e.removeItem(f)}catch(o){}return m}f="__amplify__"+f;if(g===b){i=e.getItem(f),j=i?JSON.parse(i):{expires:-1};if(j.expires&&j.expires<=n)e.removeItem(f);else return j.data}else if(g===null)e.removeItem(f);else{j=JSON.stringify({data:g,expires:h.expires?n+h.expires:null});try{e.setItem(f,j)}catch(o){c[a]();try{e.setItem(f,j)}catch(o){throw c.error()}}}return m})}var c=a.store=function(a,b,d,e){var e=c.type;return d&&d.type&&d.type in c.types&&(e=d.type),c.types[e](a,b,d||{})};c.types={},c.type=null,c.addType=function(a,b){c.type||(c.type=a),c.types[a]=b,c[a]=function(b,d,e){return e=e||{},e.type=a,c(b,d,e)}},c.error=function(){return"amplify.store quota exceeded"};var d=/^__amplify__/;for(var f in{localStorage:1,sessionStorage:1})try{window[f].getItem&&e(f,window[f])}catch(g){}if(window.globalStorage)try{e("globalStorage",window.globalStorage[window.location.hostname]),c.type==="sessionStorage"&&(c.type="globalStorage")}catch(g){}(function(){if(c.types.localStorage)return;var a=document.createElement("div"),d="amplify";a.style.display="none",document.getElementsByTagName("head")[0].appendChild(a),a.addBehavior&&(a.addBehavior("#default#userdata"),c.addType("userData",function(e,f,g){a.load(d);var h,i,j,k,l,m=f,n=(new Date).getTime();if(!e){m={},l=[],k=0;while(h=a.XMLDocument.documentElement.attributes[k++])i=JSON.parse(h.value),i.expires&&i.expires<=n?l.push(h.name):m[h.name]=i.data;while(e=l.pop())a.removeAttribute(e);return a.save(d),m}e=e.replace(/[^-._0-9A-Za-z\xb7\xc0-\xd6\xd8-\xf6\xf8-\u037d\u37f-\u1fff\u200c-\u200d\u203f\u2040\u2070-\u218f]/g,"-");if(f===b){h=a.getAttribute(e),i=h?JSON.parse(h):{expires:-1};if(i.expires&&i.expires<=n)a.removeAttribute(e);else return i.data}else f===null?a.removeAttribute(e):(j=a.getAttribute(e),i=JSON.stringify({data:f,expires:g.expires?n+g.expires:null}),a.setAttribute(e,i));try{a.save(d)}catch(o){j===null?a.removeAttribute(e):a.setAttribute(e,j),c.userData();try{a.setAttribute(e,i),a.save(d)}catch(o){throw j===null?a.removeAttribute(e):a.setAttribute(e,j),c.error()}}return m}))})(),function(){function e(a){return a===b?b:JSON.parse(JSON.stringify(a))}var a={},d={};c.addType("memory",function(c,f,g){return c?f===b?e(a[c]):(d[c]&&(clearTimeout(d[c]),delete d[c]),f===null?(delete a[c],null):(a[c]=f,g.expires&&(d[c]=setTimeout(function(){delete a[c],delete d[c]},g.expires)),f)):e(a)})}()})(this.amplify=this.amplify||{}),function(a){function e(a,b){for(var c=0;c<a.length;c+=1)if(b(a[c],c,a)===!1)return}function f(a){var b=[];for(var c=0,d=a.length;c<d;c++)b=b.concat(a[c]);return b}function g(a,b,c){if(!a.length)return c();var d=0;(function e(){b(a[d],function(b){b||b===!1?(c(b),c=function(){}):(d+=1,d===a.length?c():e())})})()}function h(a,b,c){c=a;for(var d in b)if(b.hasOwnProperty(d)){c=b[d](a);if(c!==a)break}return c===a?"([a-zA-Z0-9-]+)":c}function i(a,b){~a.indexOf("*")&&(a=a.replace(/\*/g,"([_.()!\\ %@&a-zA-Z0-9-]+)"));var c=a.match(/:([^\/]+)/ig),d;if(c){d=c.length;for(var e=0;e<d;e++)a=a.replace(c[e],h(c[e],b))}return a}Array.prototype.filter||(Array.prototype.filter=function(a,b){var c=[],d;for(var e=0,f=this.length;e<f;e++)e in this&&a.call(b,d=this[e],e,this)&&c.push(d);return c}),Array.isArray||(Array.isArray=function(a){return Object.prototype.toString.call(a)==="[object Array]"});var b=document.location,c={mode:"modern",hash:b.hash,check:function(){var a=b.hash;a!=this.hash&&(this.hash=a,this.onHashChanged())},fire:function(){this.mode==="modern"?window.onhashchange():this.onHashChanged()},init:function(a){function c(){for(var a=0,b=window.Router.listeners.length;a<b;a++)window.Router.listeners[a]()}var b=this;window.Router.listeners||(window.Router.listeners=[]);if("onhashchange"in window&&(document.documentMode===undefined||document.documentMode>7))window.onhashchange=c,this.mode="modern";else{var d=document.createElement("iframe");d.id="state-frame",d.style.display="none",document.body.appendChild(d),this.writeFrame(""),"onpropertychange"in document&&"attachEvent"in document&&document.attachEvent("onpropertychange",function(){event.propertyName==="location"&&b.check()}),window.setInterval(function(){b.check()},50),this.onHashChanged=c,this.mode="legacy"}return window.Router.listeners.push(a),this.mode},destroy:function(a){if(!window.Router||!window.Router.listeners)return;var b=window.Router.listeners;for(var c=b.length-1;c>=0;c--)b[c]===a&&b.splice(c,1)},setHash:function(a){return mode==="legacy"&&this.writeFrame(a),b.hash=a[0]==="/"?a:"/"+a,this},writeFrame:function(a){var b=document.getElementById("state-frame"),c=b.contentDocument||b.contentWindow.document;c.open(),c.write("<script>_hash = '"+a+"'; onload = parent.listener.syncHash;<script>"),c.close()},syncHash:function(){var a=this._hash;return a!=b.hash&&(b.hash=a),this},onHashChanged:function(){}},d=a.Router=function(a){if(this instanceof d)this.params={},this.routes={},this.methods=["on","once","after","before"],this._methods={},this._insert=this.insert,this.insert=this.insertEx,this.configure(),this.mount(a||{});else return new d(a)};d.prototype.init=function(a){var d=this;return this.handler=function(){var a=b.hash.replace(/^#/,"");d.dispatch("on",a)},b.hash===""&&a&&(b.hash=a),b.hash.length>0&&this.handler(),c.init(this.handler),this},d.prototype.explode=function(){var a=b.hash;return a[1]==="/"&&(a=a.slice(1)),a.slice(1,a.length).split("/")},d.prototype.setRoute=function(a,b,d){var e=this.explode();return typeof a=="number"&&typeof b=="string"?e[a]=b:typeof d=="string"?e.splice(a,b,s):e=[a],c.setHash(e.join("/")),e},d.prototype.insertEx=function(a,b,c,d){return a==="once"&&(a="on",c=function(a){var b=!1;return function(){if(b)return;return b=!0,a.apply(this,arguments)}}(c)),this._insert(a,b,c,d)},d.prototype.getState=function(){return this.state},d.prototype.getRoute=function(a){var b=a;if(typeof a=="number")b=this.explode()[a];else if(typeof a=="string"){var c=this.explode();b=c.indexOf(a)}else b=this.explode();return b},d.prototype.destroy=function(){return c.destroy(this.handler),this},d.prototype.configure=function(a){a=a||{};for(var b=0;b<this.methods.length;b++)this._methods[this.methods[b]]=!0;return this.recurse=a.recurse||this.recurse||!1,this.async=a.async||!1,this.delimiter=a.delimiter||"/",this.strict=typeof a.strict=="undefined"?!0:a.strict,this.notfound=a.notfound,this.resource=a.resource,this.every={after:a.after||[],before:a.before||[],on:a.on||[]},this},d.prototype.param=function(a,b){a[0]!==":"&&(a=":"+a);var c=new RegExp(a,"g");this.params[a]=function(a){return a.replace(c,b.source||b)}},d.prototype.on=d.prototype.route=function(a,b,c){var d=this;!c&&typeof b=="function"&&(c=b,b=a,a="on"),b.source&&(b=b.source);if(Array.isArray(a))return a.forEach(function(a){d.on(a,b,c)});this.insert(a,this.scope.concat(b.split(new RegExp(this.delimiter))),c)},d.prototype.dispatch=function(a,b,c){function h(){d.last=e.after,d.invoke(d.runlist(e),d,c)}var d=this,e=this.traverse(a,b,this.routes,""),f=this._invoked,g;return this._invoked=!0,!e||e.length===0?(this.last=[],typeof this.notfound=="function"&&this.invoke([this.notfound],{method:a,path:b},c),!1):(this.recurse==="forward"&&(e=e.reverse()),g=this.every&&this.every.after?[this.every.after].concat(this.last):[this.last],g&&g.length>0&&f?(this.async?this.invoke(g,this,h):(this.invoke(g,this),h()),!0):(h(),!0))},d.prototype.invoke=function(a,b,c){var d=this;this.async?g(a,function(c,d){typeof c=="function"&&c.apply(b,a.captures.concat(d)),d()},function(){c&&c.apply(null,arguments)}):e(a,function f(c){if(Array.isArray(c))return e(c,f);if(typeof c=="function")return c.apply(b,a.captures||null);typeof c=="string"&&d.resource&&d.resource[c].apply(b,a.captures||null)})},d.prototype.traverse=function(a,b,c,d){var e=[],f,g,h,i;if(b===this.delimiter&&c[a])return h=[[c.before,c[a]].filter(Boolean)],h.after=[c.after].filter(Boolean),h.matched=!0,h.captures=[],h;for(var j in c)if(c.hasOwnProperty(j)&&!this._methods[j]){f=d+this.delimiter+j,this.strict||(f+="["+this.delimiter+"]?"),g=b.match(new RegExp("^"+f));if(!g)continue;if(g[0]&&g[0]==b&&c[j][a])return h=[[c[j].before,c[j][a]].filter(Boolean)],h.after=[c[j].after].filter(Boolean),h.matched=!0,h.captures=g.slice(1),h;h=this.traverse(a,b,c[j],f);if(h.matched)return h.length>0&&(e=e.concat(h)),this.recurse&&(e.push([c[j].before,c[j].on].filter(Boolean)),h.after=h.after.concat([c[j].after].filter(Boolean))),e.matched=!0,e.captures=h.captures,e.after=h.after,e}return!1},d.prototype.insert=function(a,b,c,d){var e,f,g,h,j;b=b.filter(function(a){return a&&a.length>0}),d=d||this.routes,j=b.shift(),/\:|\*/.test(j)&&(j=i(j,this.params));if(b.length>0)return d[j]=d[j]||{},this.insert(a,b,c,d[j]);if(!j&&!b.length&&d===this.routes){e=typeof d[a];switch(e){case"function":d[a]=[d[a],c];return;case"object":d[a].push(c);return;case"undefined":d[a]=c;return}return}f=typeof d[j],g=Array.isArray(d[j]);if(d[j]&&!g&&f=="object"){e=typeof d[j][a];switch(e){case"function":d[j][a]=[d[j][a],c];return;case"object":d[j][a].push(c);return;case"undefined":d[j][a]=c;return}}else if(f=="undefined"){h={},h[a]=c,d[j]=h;return}throw new Error("Invalid route context: "+f)},d.prototype.extend=function(a){var b=this,c=a.length,d;for(d=0;d<c;d++)(function(a){b._methods[a]=!0,b[a]=function(){b.on.apply(b,[a].concat(Array.prototype.slice.call(arguments)))}})(a[d])},d.prototype.runlist=function(a){var b=this.every&&this.every.before?[this.every.before].concat(f(a)):f(a);return this.every&&this.every.on&&b.push(this.every.on),b.captures=a.captures,b.source=a.source,b},d.prototype.mount=function(a,b){function d(b,d){var e=b,f=b.split(c.delimiter),g=typeof a[b],h=f[0]===""||!c._methods[f[0]],i=h?"on":e;h&&(e=e.slice(c.delimiter.length),f.shift());if(h&&g==="object"&&!Array.isArray(a[b])){d=d.concat(f),c.mount(a[b],d);return}h&&(d=d.concat(e.split(c.delimiter))),c.insert(i,d,a[b])}if(!a||typeof a!="object"||Array.isArray(a))return;var c=this;b=b||[];for(var e in a)a.hasOwnProperty(e)&&d(e,b.slice(0))}}(window),function(a){var b=function(){return+(new Date)},c=function(c,d){var e=new XMLHttpRequest;e.open("GET",c+"?"+b(),!0),e.onload=function(){d(JSON.parse(this.responseText))},e.onerror=function(){var b=document.createElement("script");a.callback=d,b.src=c+"?callback=callback",document.body.appendChild(b)},e.send()},d={url:"http://node-hnapi.herokuapp.com/",news:function(a){c(d.url+"news",a)},news2:function(a){c(d.url+"news2",a)},item:function(a,b){c(d.url+"item/"+a,b)}};a.hnapi=d}(window);var Mustache=function(){var a={},b=function(){};return b.prototype={otag:"{{",ctag:"}}",pragmas:{},buffer:[],pragmas_implemented:{"IMPLICIT-ITERATOR":!0},context:{},render:function(a,b,c,d){d||(this.context=b,this.buffer=[]);if(!this.includes("",a)){if(d)return a;this.send(a);return}a=this.render_pragmas(a);var e=this.render_section(a,b,c);e===!1&&(e=this.render_tags(a,b,c,d));if(d)return e;this.sendLines(e)},send:function(a){a!==""&&this.buffer.push(a)},sendLines:function(a){if(a){var b=a.split("\n");for(var c=0;c<b.length;c++)this.send(b[c])}},render_pragmas:function(a){if(!this.includes("%",a))return a;var b=this,c=this.getCachedRegex("render_pragmas",function(a,b){return new RegExp(a+"%([\\w-]+) ?([\\w]+=[\\w]+)?"+b,"g")});return a.replace(c,function(a,c,d){if(!b.pragmas_implemented[c])throw{message:"This implementation of mustache doesn't understand the '"+c+"' pragma"};b.pragmas[c]={};if(d){var e=d.split("=");b.pragmas[c][e[0]]=e[1]}return""})},render_partial:function(a,b,c){a=this.trim(a);if(!c||c[a]===undefined)throw{message:"unknown_partial '"+a+"'"};return typeof b[a]!="object"?this.render(c[a],b,c,!0):this.render(c[a],b[a],c,!0)},render_section:function(a,b,c){if(!this.includes("#",a)&&!this.includes("^",a))return!1;var d=this,e=this.getCachedRegex("render_section",function(a,b){return new RegExp("^([\\s\\S]*?)"+a+"(\\^|\\#)\\s*(.+)\\s*"+b+"\n*([\\s\\S]*?)"+a+"\\/\\s*\\3\\s*"+b+"\\s*([\\s\\S]*)$","g")});return a.replace(e,function(a,e,f,g,h,i){var j=e?d.render_tags(e,b,c,!0):"",k=i?d.render(i,b,c,!0):"",l,m=d.find(g,b);return f==="^"?!m||d.is_array(m)&&m.length===0?l=d.render(h,b,c,!0):l="":f==="#"&&(d.is_array(m)?l=d.map(m,function(a){return d.render(h,d.create_context(a),c,!0)}).join(""):d.is_object(m)?l=d.render(h,d.create_context(m),c,!0):typeof m=="function"?l=m.call(b,h,function(a){return d.render(a,b,c,!0)}):m?l=d.render(h,b,c,!0):l=""),j+l+k})},render_tags:function(a,b,c,d){var e=this,f=function(){return e.getCachedRegex("render_tags",function(a,b){return new RegExp(a+"(=|!|>|\\{|%)?([^\\/#\\^]+?)\\1?"+b+"+","g")})},g=f(),h=function(a,d,h){switch(d){case"!":return"";case"=":return e.set_delimiters(h),g=f(),"";case">":return e.render_partial(h,b,c);case"{":return e.find(h,b);default:return e.escape(e.find(h,b))}},i=a.split("\n");for(var j=0;j<i.length;j++)i[j]=i[j].replace(g,h,this),d||this.send(i[j]);if(d)return i.join("\n")},set_delimiters:function(a){var b=a.split(" ");this.otag=this.escape_regex(b[0]),this.ctag=this.escape_regex(b[1])},escape_regex:function(a){if(!arguments.callee.sRE){var b=["/",".","*","+","?","|","(",")","[","]","{","}","\\"];arguments.callee.sRE=new RegExp("(\\"+b.join("|\\")+")","g")}return a.replace(arguments.callee.sRE,"\\$1")},find:function(a,b){function c(a){return a===!1||a===0||a}a=this.trim(a);var d;return a.match(/([a-z_]+)\./ig)?d=c(this.walk_context(a,b)):c(b[a])?d=b[a]:c(this.context[a])&&(d=this.context[a]),typeof d=="function"?d.apply(b):d!==undefined?d:""},walk_context:function(a,b){var c=a.split("."),d=b[c[0]]!=undefined?b:this.context,e=d[c.shift()];while(e!=undefined&&c.length>0)d=e,e=e[c.shift()];return typeof e=="function"?e.apply(d):e},includes:function(a,b){return b.indexOf(this.otag+a)!=-1},escape:function(a){return a=String(a===null?"":a),a.replace(/&(?!\w+;)|["'<>\\]/g,function(a){switch(a){case"&":return"&amp;";case'"':return"&quot;";case"'":return"&#39;";case"<":return"&lt;";case">":return"&gt;";default:return a}})},create_context:function(a){if(this.is_object(a))return a;var b=".";this.pragmas["IMPLICIT-ITERATOR"]&&(b=this.pragmas["IMPLICIT-ITERATOR"].iterator);var c={};return c[b]=a,c},is_object:function(a){return a&&typeof a=="object"},is_array:function(a){return Object.prototype.toString.call(a)==="[object Array]"},trim:function(a){return a.replace(/^\s*|\s*$/g,"")},map:function(a,b){if(typeof a.map=="function")return a.map(b);var c=[],d=a.length;for(var e=0;e<d;e++)c.push(b(a[e]));return c},getCachedRegex:function(b,c){var d=a[this.otag];d||(d=a[this.otag]={});var e=d[this.ctag];e||(e=d[this.ctag]={});var f=e[b];return f||(f=e[b]=c(this.otag,this.ctag)),f}},{name:"mustache.js",version:"0.4.0-dev",to_html:function(a,c,d,e){var f=new b;e&&(f.send=e),f.render(a,c||{},d);if(!e)return f.buffer.join("\n")}}}();(function(a,b){var c=function(a,c){var d=b.documentElement,e=d.matchesSelector||d.mozMatchesSelector||d.webkitMatchesSelector||d.msMatchesSelector;return e.call(a,c)},d=function(a,b){var d=!1;do d=c(a,b);while(!d&&(a=a.parentNode)&&a.ownerDocument);return d?a:!1};if(!a.Touch){a.tappable=function(a,c){if(!c)return;var e=typeof c=="function"?c:c.onTap,f=c.containerElement||b.body;f.addEventListener("click",function(b){var g=b.target;g.nodeType==3&&(g=f.parentNode),g=d(g,a);if(!g)return;c.allowClick||b.preventDefault(),e.call(f,b,g)},!1)};return}var e=Math.abs,f=function(){},g={noScroll:!1,activeClass:"tappable-active",onTap:f,onStart:f,onMove:f,onMoveOut:f,onMoveIn:f,onEnd:f,onCancel:f,allowClick:!1,boundMargin:50,noScrollDelay:0,activeClassDelay:0,inactiveClassDelay:0},h=function(a,c){var d=b.elementFromPoint(a,c);return d.nodeType==3&&(d=d.parentNode),d},i=function(a){var b=a.target;if(b)return b;var c=a.targetTouches[0];return h(c.clientX,c.clientY)},j=function(a,b){if(!b)return;if(a.classList){a.classList.add(b);return}if(clean(a.className).indexOf(b)>-1)return;a.className=clean(a.className+" "+b)},k=function(a,b){if(!b)return;if(a.classList){a.classList.remove(b);return}a.className=a.className.replace(new RegExp("(^|\\s)"+b+"(?:\\s|$)"),"$1")};a.tappable=function(a,c){typeof c=="function"&&(c={onTap:c});var e={};for(var f in g)e[f]=c[f]||g[f];var l=e.containerElement||b.body,m,n,o,p=!1,q=!1,r=e.activeClass,s=e.activeClassDelay,t,u=e.inactiveClassDelay,v,w=e.noScroll,x=e.noScrollDelay,y,z=e.boundMargin;l.addEventListener("touchstart",function(b){var c=d(i(b),a);if(!c)return;s?(clearTimeout(t),t=setTimeout(function(){j(c,r)},s)):j(c,r),u&&clearTimeout(v),m=c,p=!1,q=!1,o=w?c.getBoundingClientRect():null,x&&(clearTimeout(y),w=!1,y=setTimeout(function(){w=!0},x)),e.onStart.call(l,b,c)},!1),l.addEventListener("touchmove",function(a){if(!m)return;w?a.preventDefault():clearTimeout(t);var b=a.changedTouches[0],c=b.clientX,d=b.clientY,f=a.target||h(c,d);w?c>o.left-z&&c<o.right+z&&d>o.top-z&&d<o.bottom+z?(q=!1,j(m,r),e.onMoveIn.call(l,a,f)):(q=!0,k(m,r),e.onMoveOut.call(l,a,f)):p||(p=!0,k(m,r),e.onCancel.call(f,a)),e.onMove.call(l,a,f)},!1),l.addEventListener("touchend",function(a){if(!m)return;clearTimeout(t);if(u){s&&!p&&j(m,r);var b=m;v=setTimeout(function(){k(b,r)},u)}else k(m,r);e.onEnd.call(l,a,m);if(!p&&!q){var c=m;setTimeout(function(){e.onTap.call(l,a,c)},1)}n=m,m=null},!1),l.addEventListener("touchcancel",function(a){if(!m)return;k(m,r),m=null,e.onCancel.call(l,a)},!1),e.allowClick||l.addEventListener("click",function(a){if(!n)return;n=null,a.preventDefault()},!1)}})(window,document),function(a,b){function c(a,b){a.push.apply(a,b?{}.toString.call(b)=="[object Array]"?b:[b]:[])}function d(a,b,c){for(var d=0,e=a.length;d<e;++d)a[d].call(b,c)}function e(a){if(this instanceof e)this.object=a.object,this.property=a.property,this.from=this._from=a.from||this.object[this.property],this.to={}.toString.call(a.to)=="[object Array]"?a.to:[a.to],this.target=0,this.parser=a.parser||function(a){var b=e.Parsers,c,d=[],f,g;for(f in b)b.hasOwnProperty(f)&&d.push(b[f]);d.sort(function(a,b){return(b.priority||0)-(a.priority||0)});for(f=0,g=d.length;f<g;++f){c=new d[f];if(c.parse(a)!=null)return c}return c=new b.Number,c.parse(a),c}(this.from),this.transition=a.transition||e.Transitions.linear,this.duration=a.duration||500,this.fps=a.fps||40,this.frameInterval=1e3/this.fps,this.frames=a.frames||~~(this.duration/this.frameInterval+.5),this.frame=a.frame==b?-1:0,this.running=!1,this.startHandlers=[],this.updateHandlers=[],this.finishHandlers=[],c(this.startHandlers,a.start),c(this.updateHandlers,a.update),c(this.finishHandlers,a.finish);else return new e(a)}function j(a,b,c){return(b-a)*c+a}var f=e.prototype,g,h,i=a.Viper;f.start=function(){return this.running||(this.resume(),d(this.startHandlers,this,this.object)),this},f.stop=function(){return this.running&&(this.pause(),d(this.finishHandlers,this,this.object)),this},f.pause=function(a){if(this.running){this.running=this.time=!1,clearInterval(this.timer);var c=this;a!=b&&setTimeout(function(){c.resume()},a)}return this},f.resume=function(){if(!this.running&&this.frame<this.frames){var a=this;this.timer=setInterval(function(){a.step(+(new Date))},this.frameInterval),this.running=!0}return this},f.step=function(a){this.frame+=(a-(this.time||a))/this.frameInterval,this.time=a,this.object[this.property]=this.parser.compute(this.from,this.to[this.target],this.frame<this.frames?this.transition(this.frame/this.frames):1),d(this.updateHandlers,this,this.object),this.frame>=this.frames&&(this.frame=this.time=0,this.parser.parse(this.from=this.to[this.target++]),this.to[this.target]==b&&(this.parser.parse(this.from=this._from),this.target=0,this.stop()))},e.Transitions={linear:function(a){return a},sine:function(a){return 1-Math.cos(a*Math.PI/2)},elastic:function(a){return Math.pow(2,10*--a)*Math.cos(20*a*Math.PI/3)},bounce:function(a){var b=0,c=1,d;while(a<(7-4*b)/11)b+=c,c/=2;return d=(11-6*b-11*a)/4,c*c-d*d}};for(h in e.Transitions)e.Transitions.hasOwnProperty(h)&&(g=e.Transitions[h],g.out=function(a){return function(b){return 1-a(1-b)}}(g),g.inOut=function(a){return function(b){return(b>.5?2-a(2*(1-b)):a(2*b))/2}}(g));e.Parsers={Number:function(){this.parse=function(a,c){a+="";var d=/(\D*)(\d+)(.*)?/.exec(a)||[,,NaN],e=parseFloat(d[2]);return c||(this.prefix=d[1]||"",this.suffix=d[3]||"",this.value=e),isNaN(e)?b:e},this.compute=function(a,b,c){return this.prefix+j(this.value,this.parse(b,!0),c)+this.suffix}},Color:function(){this.parse=function(a,b){var c=parseInt,d;if(/^#[\da-f]{6}$/i.test(a))d=[c(a.substring(1,3),16),c(a.substring(3,5),16),c(a.substring(5,7),16)];else if(d=/^(rgb\()?(\d+),\s*(\d+),\s*(\d+)\)?$/.exec(a))d=[c(d[2]),c(d[3]),c(d[4])];return b||(this.value=d),d},this.compute=function(a,b,c){for(var d=[],e=this.parse(b,!0),f=0,g=this.value.length;f<g;++f)d.push(~~(j(this.value[f],e[f],c)+.5));return"rgb("+d+")"}},String:function(){this.parse=function(a){return""+a},this.compute=function(a,b,c){a+="",b+="";var d=~~(b.length*c+.5);return b.substr(0,d)+a.substr(d,a.length-d-~~((a.length-b.length)*c+.5))}}},e.Parsers.Color.priority=1,e.Parsers.String.priority=-9,e.noConflict=function(){return a.Viper=i,e},a.Viper=e}(this);