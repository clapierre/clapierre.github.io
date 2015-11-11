(function(a){if(typeof define==="function"&&define.amd){define("jstree.contextmenu",["jquery","jstree"],a)}else{if(typeof exports==="object"){a(require("jquery"),require("jstree"))}else{a(jQuery,jQuery.jstree)}}}(function(b,a,c){if(b.jstree.plugins.contextmenu){return}b.jstree.defaults.contextmenu={select_node:true,show_at_node:true,items:function(e,d){return{create:{separator_before:false,separator_after:true,_disabled:false,label:"Create",action:function(g){var f=b.jstree.reference(g.reference),h=f.get_node(g.reference);f.create_node(h,{},"last",function(i){setTimeout(function(){f.edit(i)},0)})}},rename:{separator_before:false,separator_after:false,_disabled:false,label:"Rename",action:function(g){var f=b.jstree.reference(g.reference),h=f.get_node(g.reference);f.edit(h)}},remove:{separator_before:false,icon:false,separator_after:false,_disabled:false,label:"Delete",action:function(g){var f=b.jstree.reference(g.reference),h=f.get_node(g.reference);if(f.is_selected(h)){f.delete_node(f.get_selected())}else{f.delete_node(h)}}},ccp:{separator_before:true,icon:false,separator_after:false,label:"Edit",action:false,submenu:{cut:{separator_before:false,separator_after:false,label:"Cut",action:function(g){var f=b.jstree.reference(g.reference),h=f.get_node(g.reference);if(f.is_selected(h)){f.cut(f.get_top_selected())}else{f.cut(h)}}},copy:{separator_before:false,icon:false,separator_after:false,label:"Copy",action:function(g){var f=b.jstree.reference(g.reference),h=f.get_node(g.reference);if(f.is_selected(h)){f.copy(f.get_top_selected())}else{f.copy(h)}}},paste:{separator_before:false,icon:false,_disabled:function(f){return !b.jstree.reference(f.reference).can_paste()},separator_after:false,label:"Paste",action:function(g){var f=b.jstree.reference(g.reference),h=f.get_node(g.reference);f.paste(h)}}}}}}};b.jstree.plugins.contextmenu=function(d,e){this.bind=function(){e.bind.call(this);var f=0,i=null,h,g;this.element.on("contextmenu.jstree",".jstree-anchor",b.proxy(function(k,j){k.preventDefault();f=k.ctrlKey?+new Date():0;if(j||i){f=(+new Date())+10000}if(i){clearTimeout(i)}if(!this.is_loading(k.currentTarget)){this.show_contextmenu(k.currentTarget,k.pageX,k.pageY,k)}},this)).on("click.jstree",".jstree-anchor",b.proxy(function(j){if(this._data.contextmenu.visible&&(!f||(+new Date())-f>250)){b.vakata.context.hide()}f=0},this)).on("touchstart.jstree",".jstree-anchor",function(j){if(!j.originalEvent||!j.originalEvent.changedTouches||!j.originalEvent.changedTouches[0]){return}h=j.pageX;g=j.pageY;i=setTimeout(function(){b(j.currentTarget).trigger("contextmenu",true)},750)}).on("touchmove.vakata.jstree",function(j){if(i&&j.originalEvent&&j.originalEvent.changedTouches&&j.originalEvent.changedTouches[0]&&(Math.abs(h-j.pageX)>50||Math.abs(g-j.pageY)>50)){clearTimeout(i)}}).on("touchend.vakata.jstree",function(j){if(i){clearTimeout(i)}});b(document).on("context_hide.vakata.jstree",b.proxy(function(){this._data.contextmenu.visible=false},this))};this.teardown=function(){if(this._data.contextmenu.visible){b.vakata.context.hide()}e.teardown.call(this)};this.show_contextmenu=function(h,n,l,j){h=this.get_node(h);if(!h||h.id==="#"){return false}var p=this.settings.contextmenu,k=this.get_node(h,true),m=k.children(".jstree-anchor"),f=false,g=false;if(p.show_at_node||n===c||l===c){f=m.offset();n=f.left;l=f.top+this._data.core.li_height}if(this.settings.contextmenu.select_node&&!this.is_selected(h)){this.activate_node(h,j)}g=p.items;if(b.isFunction(g)){g=g.call(this,h,b.proxy(function(o){this._show_contextmenu(h,n,l,o)},this))}if(b.isPlainObject(g)){this._show_contextmenu(h,n,l,g)}};this._show_contextmenu=function(j,f,l,h){var k=this.get_node(j,true),g=k.children(".jstree-anchor");b(document).one("context_show.vakata.jstree",b.proxy(function(n,m){var i="jstree-contextmenu jstree-"+this.get_theme()+"-contextmenu";b(m.element).addClass(i)},this));this._data.contextmenu.visible=true;b.vakata.context.show(g,{x:f,y:l},h);this.trigger("show_contextmenu",{node:j,x:f,y:l})}};(function(e){var f=false,d={element:false,reference:false,position_x:0,position_y:0,items:[],html:"",is_visible:false};e.vakata.context={settings:{hide_onmouseleave:0,icons:true},_trigger:function(g){e(document).triggerHandler("context_"+g+".vakata",{reference:d.reference,element:d.element,position:{x:d.position_x,y:d.position_y}})},_execute:function(g){g=d.items[g];return g&&(!g._disabled||(e.isFunction(g._disabled)&&!g._disabled({item:g,reference:d.reference,element:d.element})))&&g.action?g.action.call(null,{item:g,reference:d.reference,element:d.element,position:{x:d.position_x,y:d.position_y}}):false},_parse:function(k,i){if(!k){return false}if(!i){d.html="";d.items=[]}var j="",g=false,h;if(i){j+="<ul>"}e.each(k,function(l,m){if(!m){return true}d.items.push(m);if(!g&&m.separator_before){j+="<li class='vakata-context-separator'><a href='#' "+(e.vakata.context.settings.icons?"":'style="margin-left:0px;"')+">&#160;</a></li>"}g=false;j+="<li class='"+(m._class||"")+(m._disabled===true||(e.isFunction(m._disabled)&&m._disabled({item:m,reference:d.reference,element:d.element}))?" vakata-contextmenu-disabled ":"")+"' "+(m.shortcut?" data-shortcut='"+m.shortcut+"' ":"")+">";j+="<a href='#' rel='"+(d.items.length-1)+"'>";if(e.vakata.context.settings.icons){j+="<i ";if(m.icon){if(m.icon.indexOf("/")!==-1||m.icon.indexOf(".")!==-1){j+=" style='background:url(\""+m.icon+"\") center center no-repeat' "}else{j+=" class='"+m.icon+"' "}}j+="></i><span class='vakata-contextmenu-sep'>&#160;</span>"}j+=(e.isFunction(m.label)?m.label({item:l,reference:d.reference,element:d.element}):m.label)+(m.shortcut?' <span class="vakata-contextmenu-shortcut vakata-contextmenu-shortcut-'+m.shortcut+'">'+(m.shortcut_label||"")+"</span>":"")+"</a>";if(m.submenu){h=e.vakata.context._parse(m.submenu,true);if(h){j+=h}}j+="</li>";if(m.separator_after){j+="<li class='vakata-context-separator'><a href='#' "+(e.vakata.context.settings.icons?"":'style="margin-left:0px;"')+">&#160;</a></li>";g=true}});j=j.replace(/<li class\='vakata-context-separator'\><\/li\>$/,"");if(i){j+="</ul>"}if(!i){d.html=j;e.vakata.context._trigger("parse")}return j.length>10?j:false},_show_submenu:function(n){n=e(n);if(!n.length||!n.children("ul").length){return}var m=n.children("ul"),g=n.offset().left+n.outerWidth(),p=n.offset().top,i=m.width(),k=m.height(),j=e(window).width()+e(window).scrollLeft(),l=e(window).height()+e(window).scrollTop();if(f){n[g-(i+10+n.outerWidth())<0?"addClass":"removeClass"]("vakata-context-left")}else{n[g+i+10>j?"addClass":"removeClass"]("vakata-context-right")}if(p+k+10>l){m.css("bottom","-1px")}m.show()},show:function(j,m,k){var i,n,s,r,t,l,g,q,p=true;if(d.element&&d.element.length){d.element.width("")}switch(p){case (!m&&!j):return false;case (!!m&&!!j):d.reference=j;d.position_x=m.x;d.position_y=m.y;break;case (!m&&!!j):d.reference=j;i=j.offset();d.position_x=i.left+j.outerHeight();d.position_y=i.top;break;case (!!m&&!j):d.position_x=m.x;d.position_y=m.y;break}if(!!j&&!k&&e(j).data("vakata_contextmenu")){k=e(j).data("vakata_contextmenu")}if(e.vakata.context._parse(k)){d.element.html(d.html)}if(d.items.length){d.element.appendTo("body");n=d.element;s=d.position_x;r=d.position_y;t=n.width();l=n.height();g=e(window).width()+e(window).scrollLeft();q=e(window).height()+e(window).scrollTop();if(f){s-=(n.outerWidth()-e(j).outerWidth());if(s<e(window).scrollLeft()+20){s=e(window).scrollLeft()+20}}if(s+t+20>g){s=g-(t+20)}if(r+l+20>q){r=q-(l+20)}d.element.css({left:s,top:r}).show().find("a").first().focus().parent().addClass("vakata-context-hover");d.is_visible=true;e.vakata.context._trigger("show")}},hide:function(){if(d.is_visible){d.element.hide().find("ul").hide().end().find(":focus").blur().end().detach();d.is_visible=false;e.vakata.context._trigger("hide")}}};e(function(){f=e("body").css("direction")==="rtl";var g=false;d.element=e("<ul class='vakata-context'></ul>");d.element.on("mouseenter","li",function(h){h.stopImmediatePropagation();if(e.contains(this,h.relatedTarget)){return}if(g){clearTimeout(g)}d.element.find(".vakata-context-hover").removeClass("vakata-context-hover").end();e(this).siblings().find("ul").hide().end().end().parentsUntil(".vakata-context","li").addBack().addClass("vakata-context-hover");e.vakata.context._show_submenu(this)}).on("mouseleave","li",function(h){if(e.contains(this,h.relatedTarget)){return}e(this).find(".vakata-context-hover").addBack().removeClass("vakata-context-hover")}).on("mouseleave",function(h){e(this).find(".vakata-context-hover").removeClass("vakata-context-hover");if(e.vakata.context.settings.hide_onmouseleave){g=setTimeout((function(i){return function(){e.vakata.context.hide()}}(this)),e.vakata.context.settings.hide_onmouseleave)}}).on("click","a",function(h){h.preventDefault();if(!e(this).blur().parent().hasClass("vakata-context-disabled")&&e.vakata.context._execute(e(this).attr("rel"))!==false){e.vakata.context.hide()}}).on("keydown","a",function(h){var i=null;switch(h.which){case 13:case 32:h.type="mouseup";h.preventDefault();e(h.currentTarget).trigger(h);break;case 37:if(d.is_visible){d.element.find(".vakata-context-hover").last().closest("li").first().find("ul").hide().find(".vakata-context-hover").removeClass("vakata-context-hover").end().end().children("a").focus();h.stopImmediatePropagation();h.preventDefault()}break;case 38:if(d.is_visible){i=d.element.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").prevAll("li:not(.vakata-context-separator)").first();if(!i.length){i=d.element.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").last()}i.addClass("vakata-context-hover").children("a").focus();h.stopImmediatePropagation();h.preventDefault()}break;case 39:if(d.is_visible){d.element.find(".vakata-context-hover").last().children("ul").show().children("li:not(.vakata-context-separator)").removeClass("vakata-context-hover").first().addClass("vakata-context-hover").children("a").focus();h.stopImmediatePropagation();h.preventDefault()}break;case 40:if(d.is_visible){i=d.element.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").nextAll("li:not(.vakata-context-separator)").first();if(!i.length){i=d.element.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").first()}i.addClass("vakata-context-hover").children("a").focus();h.stopImmediatePropagation();h.preventDefault()}break;case 27:e.vakata.context.hide();h.preventDefault();break;default:break}}).on("keydown",function(i){i.preventDefault();var h=d.element.find(".vakata-contextmenu-shortcut-"+i.which).parent();if(h.parent().not(".vakata-context-disabled")){h.click()}});e(document).on("mousedown.vakata.jstree",function(h){if(d.is_visible&&!e.contains(d.element[0],h.target)){e.vakata.context.hide()}}).on("context_show.vakata.jstree",function(i,h){d.element.find("li:has(ul)").children("a").addClass("vakata-context-parent");if(f){d.element.addClass("vakata-context-rtl").css("direction","rtl")}d.element.find("ul").hide().end()})})}(b))}));