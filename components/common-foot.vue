<template name="foot">
	<view class="nav-tab">
		<view class="daohang">
			<navigator url="/pages/index/index" open-type="redirect" hover-class="navigator-hover">
				首页           
			</navigator>
		</view>
		<view class="daohang">
			<navigator url="/pages/content/content" open-type="redirect" hover-class="navigator-hover">
				内容
			</navigator>
		</view>
		<view class="daohang">
			<navigator url="/pages/art/art" open-type="redirect" hover-class="navigator-hover">
				艺术
			</navigator>
		</view>
		<view class="daohang">
			<navigator url="/pages/product/product" open-type="redirect" hover-class="navigator-hover">
				产品
			</navigator>
		</view>
	</view>
</template>

<script>
	export default {
		name: "foot"
	}
</script>
<style>
	.nav-tab{
		position: fixed;
		width: 750px;
		bottom: 0;
	}
	.daohang{
		width: 25%;
		padding: 20px 0;
		text-align: center;
		display: inline-block;
		background-color: #333333;
		color: #4CD964;
		border: 1px solid #333333;
		box-sizing: border-box;
	}	
</style>
