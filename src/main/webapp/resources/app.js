"use strict"
var app = app || {}
app = (()=>{
	let context, js;
	let run =x=>{
		alert('run안'+x)
		$.getScript(x+'/resources/router.js',()=>{
			$.extend(new Session(x))
			init()
			onCreate()
		})
	}
	let init=()=>{
		context = $.ctx()
		js = $.js()
		alert('init안')
	}
	let onCreate=()=>{
		alert('onCreate안')
		setContentView()
	}
	let setContentView=()=>{
		$('body').css({
			'background-image':'url("resources/img/sea.jpg")'
				,'background-repeat':'no-repeat' //반복없앰 , 이미지 사이즈 작을때 바둑판으로 안되게
				,'background-position':'center' // 이미지 중간
				,'background-size':'cover' // 이미지 전체크기로 
		})
		$('<table><tr></tr></table>')
		.css({
			width:'80%',
			height:'900px',
			border :'3px solid white',
			margin :'0 auto',
			'background-color':'#bbdefb'
		})
		.appendTo('#divid')
		$('<td/>',{id:'left'})
		.css({
			width :'20%',
			height :'100%',
			border : '3px solid white',
			'vertical-align': 'top'
		})
		.appendTo('tr')
		$('<td/>',{id:'right'})
		.css({
			width :'80%',
			height :'100%',
			border : '3px solid white',
		})
		.appendTo('tr')
		$.each(['naver','cgv','bugs'],(i,j)=>{
			$('<div/>')
			.text(j)
			.css({
				width : '100%',
				height : '33.5%',
				border : '3px solid white',
				'text-align':'center'
			})
			.appendTo('#left')
			.click(function(){
				$(this).css({'background-color':'#53CBE6'})
				$(this).siblings().css({'background-color': '#bbdefb'})
				switch($(this).text()){
				case 'naver':
					alert('naver')
					$.getJSON(context+'/craw/naver',d=>{
						$('#right').empty()
						$.each(d,(i,j)=>{
							
							$('<div/>')
							.html('<h1>'+j.origin+'</h1><h3>'+j.trans+'</h3>')
							.css({
								width:'40%',
								height:'40%',
								border:'3px solid white',
								float : 'left',
								'text-align':'center'
							})
							.appendTo('#right')
						})
						
					})
					break
				case 'cgv':
					alert('cgv')
					$.getJSON(context+'/craw/cgv',d=>{
						$('#right').empty()
						$.each(d,(i,j)=>{
							$('<div><img style="width=200px"src="'+j.photo+'"/><br/>'+j.title+'<br/>'+j.percent+'<br/>'+j.info+'</div>')
							.css({
								border :'3px solid white',
								float :'left',
								'text-align' : 'center'
							})
							.appendTo('#right')	
						})
				
					})
					break
				case 'bugs' :	
					alert('bugs')
					$.getJSON( context+ '/craw/bugs', d=>{
						$('#right').empty()
						let pager = d.pager
						let list = d.list
						// No, title, artist, thumbnail
						$('<table id="content"><tr id="head"></tr></table>')
						.css({
							width : '90%',
							height : '80px',
							border : '3px solid white'
						})
						.appendTo('#right')
						
						$.each(['No','앨범','제목','가수'], (i, j)=>{
							$('<th/>')
							.html('<b>' + j + '</b>')
							.css({
								width : '25%',
								height : '100%',
								border : '3px solid white'
							})
							.appendTo('#head')
						})
						$.each(list,(i,j)=>{
								$('<tr><td>'+j.seq+'</td><td><img src="'+j.thumbnail+'"/></td><td>'+j.title+'</td><td>'+j.artist+'</td></tr>')
							.css({
								width : '25%',
								height : '100%',
								border : '3px solid white'})
								.appendTo('#content tbody')
							})
						$('#content tr td').css({border : '3px solid white'})
					/*	$.each([],(i,j)=>{
							$('<div/>')
							.css({
								widht : '80px',
								height : '80px'
							})
							.appendTo('#right')
						})*/
					
					})
					break
				}
			})
		})
		
	}
	return{run}
})()