<template>
    <div class="detail">
        <iframe class="iframe iframe--demos" :src="`examples/${$route.params.url}`" scrolling="yes" />
        <router-link class="tool" :to="{name: 'home'}"></router-link>
    </div>
</template>

<script>
export default {
	name: 'hello',
	data() {
		return {
			msg: 'Welcome to Your Vue.js App',
			postList: [
				{
					title: '英文字母全小写篇',
					type: 'css',
					href: 'wwww.baidu.com',
					date: '2011-01-12',
					banner: false 
				}
			]
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,body{
    height: 100%;
}
.detail{
    height: 100%;
}



.iframe{
    border:none;
    outline: none;
    height: 100%;
    position: fixed;
}
.iframe--demos{
    width: 100%;
    left:0;
}
.iframe--html{
    width: 50%;
    right: 0;
}
.tool{
    position: fixed;
    top: 30px; 
    left:  30px;
    width: 30px;
    height: 30px;
    background: rgba(0,0,0, 0.2);
    border-radius: 100%;
}
.tool:after{
    content: ""; 
    position: absolute; 
    left: 50%; 
    top: 50%;
    width:  10px;
    height: 10px;
    border-top: 1px solid #fff;
    border-left:1px solid #fff;
    transform: translate(-30%, -50%) rotate(-45deg);
}
</style>
