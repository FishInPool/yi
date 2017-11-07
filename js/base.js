;(function(){
	"use strict";
	var $formAddTask=$('.add-task');
	var taskList=[];//
	var $taskDetailMask=$('.task-detail-mask');
	var $taskDetail=$('.task-detail');
	var $checkboxComplete;
	
	init();
	//监听mask的点击隐藏
	$taskDetailMask.on('click',function(){
			$taskDetailMask.hide();
			$taskDetail.hide();
		});
	//监听添加按钮的submit
	$formAddTask.on('submit',function(e){
		e.preventDefault();//禁用默认提交
		var newTask={};
		newTask.content=$(this).find('input[name=content]').val();
		if(!newTask.content){
			return;
		}
		
		if(addTask(newTask)){
			renderTaskList();
			$('#taskinput').val('');
		};
	})
	
	//监听绑定，每次刷新列表调用一次，不然jq不自动绑定。
	function listenerDelBtn(){
		$('.deltask').on('click',function(){
			var item=$(this).parent().parent();//找到删除按钮所在的item
			var temp=confirm('确定删除？');
			temp ? deleteTask(item.data('index')):null;
		});
	}
	//监听详情按钮
	function listenerTaskDetail(){
		$('.detail').on('click',function(){
			var item=$(this).parent().parent();
			//console.log('index',item.data('index'));
			showDetail(item.data('index'));
		});
	}
	//监听checkbox
	function listenCkeckboxComplete(){
		$checkboxComplete.on('click',function(){
			var index=$(this).parent().parent().data('index');
			var item=store.get('taskList')[index];
			console.log(item);
			if(item.complete){
				updateTask(index,{complete:false});
				$(this).prop('checked',false);
			}else{
				updateTask(index,{complete:true});
				$(this).prop('checked',true);
			}

		});
	}
	//显示detail
	function showDetail(index){
		renderTaskDetail(index);
		$taskDetailMask.show();
		$taskDetail.show();
	}
	//打开网页时显示列表
	function init(){
		taskList=store.get('taskList') || [];
		if(taskList.length){
			renderTaskList();
		}
		console.log('taskList',taskList);
	}
	// 刷新localstorage和刷新列表显示
	function refreshList(){
		store.set('taskList',taskList);
		renderTaskList();
		console.log('taskList',taskList);
	}
	//增加task
	function addTask(newTask){
		taskList.push(newTask);
		refreshList();
		return true;
	}
	//删除task
	function deleteTask(index){
		if(index===undefined || !taskList[index]){return;}
		delete taskList[index];
		refreshList();
	}
	//更新task
	function updateTask(index,data){
		if(index===undefined || !taskList[index]){return;}
		taskList[index]=$.extend({}, taskList[index], data);;
		refreshList();
	}
	//渲染列表
	function renderTaskList(){
		var $tasklist=$('.task-list');
		var completeItem=[];
		$tasklist.html('');
		for(var i=0;i<taskList.length;i++){
			var item=taskList[i];
			if(item && item.complete){
				completeItem[i]=item;
			}else{
				var task=renderTaskItem(item,i);
				$tasklist.prepend(task);
			}
		}
		//append加在末尾，prepend加在开头
		for(var j=0;j<completeItem.length;j++){
			if(!completeItem[j]) continue;
			var $task=renderTaskItem(completeItem[j],j);
			$task.addClass('completed');
			$tasklist.append($task);
		}
		listenerDelBtn();
		listenerTaskDetail();
		$checkboxComplete=$('.task-item .complete');
		listenCkeckboxComplete();
	}
	//渲染单挑task
	function renderTaskItem(data,index){
		if(!data || index==null) return;
		var listtxt=
		'<div class="task-item" data-index="'+index+'">'+
		'<span><input class="complete" type="checkbox" '+(data.complete ? 'checked' : '')+'></span>'+
		'<span class="task-content">'+data.content+'</span>'+
		'<span class="btnspan">'+
		'<span class="btn deltask">删除</span>'+
		'<span class="btn detail">详细</span>'+
		'</span>'+
		'</div>';
		return $(listtxt);
	}
	//详情显示
	function renderTaskDetail(index){
		if(index===undefined || !taskList[index]) return;
		var item=taskList[index];
		//生成详情模板
		var detailtxt=
		'<form name="detailForm">'
		+'<div name="tcontent" class="content">'+item.content+'</div>'
		+'<input name="content" class="content" hidden value="'+item.content+'"></input>'
		+'<div><div class="desc"><textarea name="tdesc" value="" class="">'+( item.desc || '')+'</textarea></div></div>'
		+'<div class="remind">'
		+'<input name="remindDate" type="date" value="'+item.remindDate+'">'
		+'</div>'
		+'<button type="submit">更新</button>'
		+'</form>';
		$taskDetail.html('');
		$taskDetail.html(detailtxt);
		var $updateForm=$taskDetail.find('form');
		var $taskContent=$updateForm.find('[name=tcontent]');
		var $taskContentInput=$updateForm.find('[name=content]');

		$taskContent.on('dblclick',function(){
			$taskContent.hide();
			$taskContentInput.show();
		});
		//监听详情form的submit
		$updateForm.on('submit',function(e){
			e.preventDefault();//禁用默认提交
			var task={};
			task.content=$(this).find('[name=content]').val();
			task.desc=$(this).find('[name=tdesc]').val();
			task.remindDate=$(this).find('[name=remindDate]').val();
			console.log(task);
			updateTask(index,task);
			$taskDetailMask.hide();
			$taskDetail.hide();
		});
	}
})();