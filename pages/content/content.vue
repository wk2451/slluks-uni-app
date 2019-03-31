<template>
	<view class="page">
		<view>
			<image src="https://www.slluks.com//template/shop/blue/public/images/banner/aboutus.jpg" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>

	export default {
		data: {
			
		},
		methods: {
			
		},
		
		onLoad: function (options) {
			
		},
		onPullDownRefresh() {
			console.log('refresh');
			uni.showToast({
				title: '刷新成功',
				duration: 2000,
				icon: 'none'
			});
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		}
	}
</script>

<style>
	@import "../../static/css/uni.css";
	
	.page {
		/* padding-top: 60px; */
	}
	image{
		width: 100%;
	}
</style>
