(function(a){if(typeof define==="function"&&define.amd){define("jstree.unique",["jquery","jstree"],a)}else{if(typeof exports==="object"){a(require("jquery"),require("jstree"))}else{a(jQuery,jQuery.jstree)}}}(function(b,a,c){if(b.jstree.plugins.unique){return}b.jstree.defaults.unique={case_sensitive:false,duplicate:function(e,d){return e+" ("+d+")"}};b.jstree.plugins.unique=function(d,e){this.check=function(r,l,o,t,p){if(e.check.call(this,r,l,o,t,p)===false){return false}l=l&&l.id?l:this.get_node(l);o=o&&o.id?o:this.get_node(o);if(!o||!o.children){return true}var f=r==="rename_node"?t:l.text,q=[],u=this.settings.unique.case_sensitive,g=this._model.data,k,h;for(k=0,h=o.children.length;k<h;k++){q.push(u?g[o.children[k]].text:g[o.children[k]].text.toLowerCase())}if(!u){f=f.toLowerCase()}switch(r){case"delete_node":return true;case"rename_node":k=(b.inArray(f,q)===-1||(l.text&&l.text[u?"toString":"toLowerCase"]()===f));if(!k){this._data.core.last_error={error:"check",plugin:"unique",id:"unique_01",reason:"Child with name "+f+" already exists. Preventing: "+r,data:JSON.stringify({chk:r,pos:t,obj:l&&l.id?l.id:false,par:o&&o.id?o.id:false})}}return k;case"create_node":k=(b.inArray(f,q)===-1);if(!k){this._data.core.last_error={error:"check",plugin:"unique",id:"unique_04",reason:"Child with name "+f+" already exists. Preventing: "+r,data:JSON.stringify({chk:r,pos:t,obj:l&&l.id?l.id:false,par:o&&o.id?o.id:false})}}return k;case"copy_node":k=(b.inArray(f,q)===-1);if(!k){this._data.core.last_error={error:"check",plugin:"unique",id:"unique_02",reason:"Child with name "+f+" already exists. Preventing: "+r,data:JSON.stringify({chk:r,pos:t,obj:l&&l.id?l.id:false,par:o&&o.id?o.id:false})}}return k;case"move_node":k=((l.parent===o.id&&(!p||!p.is_multi))||b.inArray(f,q)===-1);if(!k){this._data.core.last_error={error:"check",plugin:"unique",id:"unique_03",reason:"Child with name "+f+" already exists. Preventing: "+r,data:JSON.stringify({chk:r,pos:t,obj:l&&l.id?l.id:false,par:o&&o.id?o.id:false})}}return k}return true};this.create_node=function(r,h,u,v,t){if(!h||h.text===c){if(r===null){r="#"}r=this.get_node(r);if(!r){return e.create_node.call(this,r,h,u,v,t)}u=u===c?"last":u;if(!u.toString().match(/^(before|after)$/)&&!t&&!this.is_loaded(r)){return e.create_node.call(this,r,h,u,v,t)}if(!h){h={}}var p,f,q,o,l,g=this._model.data,w=this.settings.unique.case_sensitive,k=this.settings.unique.duplicate;f=p=this.get_string("New node");q=[];for(o=0,l=r.children.length;o<l;o++){q.push(w?g[r.children[o]].text:g[r.children[o]].text.toLowerCase())}o=1;while(b.inArray(w?f:f.toLowerCase(),q)!==-1){f=k.call(this,p,(++o)).toString()}h.text=f}return e.create_node.call(this,r,h,u,v,t)}}}));