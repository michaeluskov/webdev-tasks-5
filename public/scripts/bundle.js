"use strict";(function(){var ClassLib={};ClassLib.hasClass=function(el,className){if(el.classList){return el.classList.contains(className)}else{return!!el.className.match(new RegExp("(\\s|^)"+className+"(\\s|$)"))}};ClassLib.addClass=function(el,className){if(el.classList){el.classList.add(className)}else if(!hasClass(el,className)){el.className+=" "+className}};ClassLib.removeClass=function(el,className){if(el.classList){el.classList.remove(className)}else if(hasClass(el,className)){var reg=new RegExp("(\\s|^)"+className+"(\\s|$)");el.className=el.className.replace(reg," ")}};window.ClassLib=ClassLib})();"use strict";(function(){window.XHR={};var __makeQuery=function(method,url,body,cb){var xhr=new XMLHttpRequest;xhr.open(method,url,true);xhr.onreadystatechange=function(){if(xhr.readyState!=4){return}cb(xhr.status,JSON.parse(xhr.responseText))};body?xhr.send(body):xhr.send();return xhr};window.XHR.getJSON=function(url,cb){__makeQuery("GET",url,undefined,cb)};window.XHR.postJSON=function(url,bodyObject,cb){__makeQuery("POST",url,JSON.stringify(bodyObject),cb)};window.XHR.putJSON=function(url,bodyObject,cb){__makeQuery("PUT",url,JSON.stringify(bodyObject),cb)};window.XHR.deleteJSON=function(url,bodyObject,cb){__makeQuery("DELETE",url,undefined,cb)}})();"use strict";(function(){var TaskHandler=function(id,text){this.__node=document.createElement("DIV");this.__fillNode();this.setId(id);this.setText(text)};TaskHandler.prototype.getNode=function(){return this.__node};TaskHandler.prototype.__fillNode=function(){var templateNode=document.getElementsByClassName("task-template")[0];this.__node.innerHTML=templateNode.innerHTML};TaskHandler.prototype.setId=function(id){this.__id=id};TaskHandler.prototype.getId=function(){return this.__id};TaskHandler.prototype.getText=function(){return this.__text};TaskHandler.prototype.setText=function(text){this.__text=text;this.__node.getElementsByClassName("task-item__name")[0].innerHTML=text;this.__node.getElementsByClassName("task-item__editor__area")[0].innerHTML=text};TaskHandler.prototype.switchToEditMode=function(){ClassLib.addClass(this.__node,"task-item_edit")};TaskHandler.prototype.switchToNormalMode=function(){ClassLib.removeClass(this.__node,"task-item_edit")};window.TaskHandler=TaskHandler})();function getTasks(){XHR.getJSON("/api/task",function(code,tasks){tasks.forEach(function(task){var th=new TaskHandler(task.id,task.text);document.getElementsByClassName("task-list__append-zone")[0].appendChild(th.getNode())})})}window.addEventListener("load",getTasks);