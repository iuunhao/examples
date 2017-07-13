<template>
	<div class="wrap">
		<h1 class="title"><a href="http://wncss.com" class="highlight">WNCSS <span class="return">点我返回首页</span></a> DEMOS</h1>
		
		<List :typeVal="typeStr"></List>
	</div>
</template>
<script>
import FILES from '@/data/files';
import List from '@/components/List'

export default {
	name: 'home',
	components:{
		List	
	},
	data() {
		return {
			postList: FILES.list,
			category: FILES.category
		}
	},
	computed: {
		typeStr:function(){
			return this.$route.name.replace(/type/, '');
		}	
	}	
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body{
	background-color: #F1F1F1;
}
.title{
	text-align: center;
	font-size: 40px;
	font-family: Langdon;
	color:#999;
	padding: 100px 0;
}
.highlight{
	position: relative;
}
.highlight:hover .return{
	display: block;
}
.return{
	font-size: 12px;
	position: absolute;
	left: 50%;
	transform: translate(-50%, 0);
	top: -40px;
	white-space: nowrap;
	padding: 5px;
	background: #f80;
	border-radius: 4px;
	color: #fff;	
	animation-name: buzz-out;
	animation-duration: 0.75s;
	animation-timing-function: linear;
	animation-iteration-count: 5;
	display: none;
}
.return:after{
	content: "";
	position: absolute;
	width: 0;
	height: 0;
	border-left: 5px solid transparent;
	border-right: 5px solid transparent;
	border-top: 5px solid #f80;
	left: 50%;
	bottom: -5px;
	transform: translateX(-50%);
}
@-webkit-keyframes buzz-out {
          0% {
            transform: translate(-50%, -10px);
          }
          100% {
           transform: translate(-50%, 0);
          }
}

@media all and (orientation : portrait){
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
