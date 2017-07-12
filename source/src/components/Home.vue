<template>
	<div class="wrap">
		<h1 class="title"><em class="highlight">WNCSS</em> DEMOS</h1>
		
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
