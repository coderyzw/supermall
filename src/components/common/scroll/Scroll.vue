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
			defualt:true
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
		this.scroll.on('scroll', (position) => {
			this.$emit('scroll',position)
		}),
		this.scroll.on('pullingUp', () => {
			// console.log('上拉加载更多');
			
			setTimeout(() => {
				this.scroll.finishPullUp()
			},2000)

			this.$emit('pullingUp')
		})
	},
	methods:{
		scrollTo(x,y,time=500){
			this.scroll.scrollTo(x,y,time)
		},
		finishPullUp() {
      this.scroll.finishPullUp()
    }
	}
}
</script>

<style>

</style>