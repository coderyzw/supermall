<template>
  <div class="wrapper" ref="wrapper">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>

	import BScroll from 'better-scroll'
	import ObserveDOM from '@better-scroll/observe-dom'

export default {
	name:"Scroll",
	props:{
		probeType:{
			type:Number,
			defualt:0,
		},
		pullUpLoad:{
			type:Boolean,
			defualt:false
		}
	},
	data(){
		return{
			scroll:null
		}
	},
	mounted(){
		this.scroll = new BScroll(this.$refs.wrapper, {
			click:true,
			observeDOM:true,
			probeType:this.probeType,
			pullUpLoad:this.pullUpLoad,
			ObserveDOM:true
		}),

		//监听滚动的位置
		// if (this.probeType === 2 || this.probeType === 3) {
				this.scroll.on('scroll', (position) => {
				this.$emit('scroll',position)
			})
		// }

		//监听sroll滚动到底部
		this.scroll.on('pullingUp', () => {
			// console.log('上拉加载更多');
			// setTimeout(() => {
			// 	this.scroll.finishPullUp()
			// },2000)

			this.$emit('pullingUp')
		})
	},
	methods:{
		scrollTo(x,y,time=500){
			this.scroll && this.scroll.scrollTo(x,y,time)
		},
		finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    }
	}
}
</script>

<style>

</style>