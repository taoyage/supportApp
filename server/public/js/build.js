'use strict';

/*首页处理*/
$(function(){
	$("#list").load("view/home.html",function(){
		var socket = io.connect();
		var $users = $('#users');
		var $number = $('#number');
		var $select_lesson = $('#select_lesson');
		var list_data = {}; 
		var select_data = {};

		socket.emit('initialize');

		socket.on('get users',function(data){
			list_data = data;
			showList(list_data,select_data.lesson);
		})

		$select_lesson.change(function(){
			select_data.lesson = $select_lesson.val();
			showList(list_data,select_data.lesson);

		})

		function showList(data,lesson){
			var html = '';
			var online_users = 0;
			for(var i = 0;i<data.length; i++){
				if(data[i].lesson === lesson){
					html +=	'<tr>'
					+'<th>'+data[i].user+'</th>'
					+'<th>'+data[i].lesson+'</th>'
					+'<th>'+data[i].month+'-'+data[i].day+'</th>'
					+'<th>'+data[i].time+'</th>'
					+'</tr>'
					online_users++;
				}
			}
			$number.html(online_users);
			$users.html(html);
		}

	});
});

/*获取登陆日志页面处理*/
$(function(){
	var $log = $('#log');

	$log.click(function(){
		$('#list').load("view/login_log.html",function(){
			var $UserList = $('#UserList');
			var html = '';
			var $select_date = $('#select_date');
			var $select_lesson = $('#select_lesson');
			var $getUsers = $('#getUsers');
			var date = new Date();
			var day = date.getDate();
			var data = {};

			for(var i = 0; i < 6; i++){
				if (0 === i) {
					html += '<option>'+'date'+'</option>'
				}
				else{
					html += '<option>'+day+'</option>'
					day--;
					date.setDate(day);
					day = date.getDate();
				};
			} 

			$select_date.html(html);

			/*获取select值*/
			$select_date.change(function(){
				data.date = $select_date.val();
			});

			$select_lesson.change(function(){
				data.lesson = $select_lesson.val();
			});

			$getUsers.click(function(){
				$.post('/users',data,function(data,status){
					var html = '';
					for(var i = 0;i<data.length; i++){
						html +=	'<tr>'
						+'<th>'+data[i].user+'</th>'
						+'<th>'+data[i].lesson+'</th>'
						+'<th>'+data[i].month+'-'+data[i].day+'</th>'
						+'<th>'+data[i].login_time+'</th>'
						+'<th>'+data[i].logout_time+'</th>'
						+'</tr>';
					};
					$UserList.html(html);
					html = '';
				});
			});
		});
});
});

