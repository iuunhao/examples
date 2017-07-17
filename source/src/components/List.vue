<template>
	<div>
		<div class="header">
			<h2 class="subTitle"><em class="highlight">{{typeVal === "home" ? 'all' : typeVal}}</em>DEMOS <em class="highlight"> {{total}}</em></h2>
			<div  class="nav">
				<router-link :to="{name: 'home'}" class="nav__item" >All</router-link>
				<router-link :to="{name: `type${item}`, params: { url: `/${item}`}}" v-for="item in category" key="item" class="nav__item" >{{ item }}</router-link>
			</div>
		</div>
		<div class="postWrap post">
				<li class="post__item" v-for="(item, index) in postListEd" :key="item" >
					<router-link class="post__link" :to="{name: 'detail', params: { url: item.url, name: item.name}}">
						<p  class="post__date">{{new Date(item.ctime).format('yyyyMMdd')}}</p>
						<h3 class="post__title">{{ item.name }}</h3>
						<p class="post__type">{{ item.type }}</p>
						<em v-if="(Date.parse(new Date()) - item.ctime) < 86400000" class="new"></em>
					</router-link>
				</li>
		</div>
	</div>
</template>
<script>
import FILES from '@/data/files';
Date.prototype.format = function(fmt) {
	var o = {
		"M+" : this.getMonth()+1,                 //月份
		"d+" : this.getDate(),                    //日
		"h+" : this.getHours(),                   //小时
		"m+" : this.getMinutes(),                 //分
		"s+" : this.getSeconds(),                 //秒
		"q+" : Math.floor((this.getMonth()+3)/3), //季度
		"S"  : this.getMilliseconds()             //毫秒
	};
	if(/(y+)/.test(fmt)) {
			fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	}
	for(var k in o) {
		if(new RegExp("("+ k +")").test(fmt)){
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
		}
	}
	return fmt;
}
export default {
	name: 'list',
	props:[
		'typeVal'
	],
	data() {
		return {
			postList: FILES.list,
			category: FILES.category,
			total: 0
		}
	},
	methods: {
	},
	computed: {
		postListEd: function(){
			this.total = 0;
			let arr = this.postList.filter(item => {
				if(item.type === this.typeVal || this.typeVal === 'home'){ 
					this.total++;
					return item;
				}
			});
			return arr.sort((a,b)=>{
            	return b.birthtime - a.birthtime;
			});
		}
	}
}
</script>

<style scoped>

@font-face {
  font-family: Langdon;
  src: url('http://iuunhao.com/examples/static/fonts/Langdon.otf');
}

.nav{
	display: flex;
	text-align: center;
}
.nav__item{
	flex:1;
	padding: 30px 0 30px 30px;
	font-size: 25px;
	color: #999;
	text-transform: uppercase;
	font-family: Langdon;
}
.nav__item:hover{
	color: #f80;
}
.subTitle{
	color:#999;
	text-align: left;
	padding: 30px 0;
	font-family: Langdon;
}
.subTitle em{
	margin-right: .4em;
	font-style: normal;
}

.header{
	max-width: 1540px;
	margin: 0 auto;
	display: flex;
	justify-content: space-between;
	padding: 0 30px;
}

.new{
	position: absolute;
	top:0;
	right:0;
}

.new:before {
	content: "new";
	color: #fff;
	position: absolute;
	top:13px;
	right:-13px;
	width: 50px;
	height: 30px;
	font-size: 12px;
	transform: rotate(45deg);
	z-index: 1;
	text-transform: uppercase;
	font-weight: bold;
}
.new:after {
	content: "";
	position: absolute;
	top:-10px;
	right:-23px;
	width: 70px;
	height: 30px;
	background: #f80;
	transform: rotate(45deg);
}

.post{
	display: flex;
	flex-wrap: wrap;
	margin: 0 auto;
	max-width:  1600px;
}
.post__item{
	border-radius: 4px;
	width: 20%;
	margin-bottom: 60px;
}
.post__link{
	margin: 0 30px;
	border-radius: 4px;
	height: 180px;
	display: flex;
	flex-direction: column;
	justify-content: center;
    align-items: flex-start;
	padding: 0 2em;
	color:#fff;
	background-image: linear-gradient(135deg,#adadad,#737373);
	text-align: left;
	background-size: cover;
	background-repeat: no-repeat;
	position: relative;
	overflow: hidden;
	transition: all 0.3s ease-in-out;
}
.post__link:hover{
    box-shadow: 0 5px 10px rgba(0,0,0,.1);
    border-radius: 3px;
    transform: translateY(-2px);
    background-image: linear-gradient(45deg,#fa709a,#fee140)!important
 }
.color--1 {
    background-image: linear-gradient(120deg,#f6d365,#fda085)!important
}

.color--2 {
    background-image: linear-gradient(135deg,#fbc2eb,#a6c1ee)!important
}

.color--3 {
    background-image: linear-gradient(-135deg,#a1c4fd,#c2e9fb)!important
}

.color--4 {
    background-image: linear-gradient(120deg,#84fab0,#8fd3f4)!important
}

.color--5 {
    background-image: linear-gradient(120deg,#e0c3fc,#8ec5fc)!important
}

.color--6 {
    background-image: linear-gradient(120deg,#f093fb,#f5576c)!important
}

.color--7 {
    background-image: linear-gradient(-45deg,#43e97b,#38f9d7)!important
}

.color--8 {
    background-image: linear-gradient(45deg,#fa709a,#fee140)!important
}

.color--9 {
    background-image: linear-gradient(135deg,#89f7fe,#66a6ff)!important
}

.color--10 {
    background-image: linear-gradient(135deg,#adadad,#737373)
}

.post__link::after{
	/*content: '';*/
	position: absolute;
	left: 0;
	top:0;
	bottom:0;
	right: 0;
	background-image: -webkit-linear-gradient( 115deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%);
	opacity: .5;
	border-radius: 4px;
}
.post__date{
	font-size: 50px;
	font-family: Langdon;
	margin-top: -10px;
	opacity: .54;
	white-space: nowrap;
}
.post__title{
	font-size: 19px;
	margin-bottom: 10px;
	line-height: 1.4;
	position: relative;
	z-index: 1;
	overflow: hidden;
	text-transform: uppercase;
	/*font-weight: 200;*/
}
.post__type{
	font-size: 12px;
	text-transform: uppercase;
	position: relative;
	z-index: 1;
	opacity: .5;
}
.highlight{
	color:#f90;
	font-family: Langdon;
	margin-right: 0.3em;
}
.new{
	position: absolute;
	top:0;
	right:0;
}

.new:before {
	content: "new";
	color: #fff;
	position: absolute;
	top:13px;
	right:-13px;
	width: 50px;
	height: 30px;
	font-size: 12px;
	transform: rotate(45deg);
	z-index: 1;
	text-transform: uppercase;
	font-weight: bold;
}
.new:after {
	content: "";
	position: absolute;
	top:-10px;
	right:-23px;
	width: 70px;
	height: 30px;
	background: #f80;
	transform: rotate(45deg);
}

.fade-enter-active,
.fade-leave-active {
    transition: all .7s;
    opacity: 1;

}
.fade-enter,
.fade-leave-to {
    opacity: 0;
}
@media all and (orientation : portrait){
	.post__item{
		width:  100%;
		margin-bottom: 30px;
	}
 .header{
    flex-direction: column;
    align-items: center
  }
  .subTitle{
  	padding: 0 0 10px 0;
  }
  .nav__item{
  	padding:  20px;
  	margin-bottom: 20px;
  }
}


</style>
