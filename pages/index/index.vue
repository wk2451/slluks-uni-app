<template>
	<view class="page">
<!-- 		<page-head :title="title"></page-head> -->
		<view class="uni-card">
			<view class="uni-list">
				<block v-for="(list,index) in lists" :key="index">
					<view class="uni-list-cell uni-collapse">
						<!-- <view class="uni-list-cell-navigate uni-navigate-bottom" :class="list.show ? 'uni-active' : ''" @click="trigerCollapse(index)">
							{{list.title}}
						</view> -->
						<view class="uni-collapse-content" :class="list.show ? 'uni-active' : ''">
							<swiper v-if="list.type === 'swiper'" autoplay="true" indicator-dots="true" circular="true" style="height: 400px;">
								<swiper-item v-for="(img,key) in imgUrls" :key="key">
									<navigator v-if="img.url=='/pages/goodstype/goodstype'" :url="img.url"  open-type="switchTab" hover-class="navigator-hover"><image :src="img.image" style="height: 400px;"/></navigator>
									<navigator v-else="" :url="img.url"  open-type="navigate" hover-class="navigator-hover"><image :src="img.image" style="height: 400px;"/></navigator>
								</swiper-item>
							</swiper>
							<view v-if="list.type === 'font'" class="page-pd">
								<view class="size-5">hello -app</view>
								<view class="size-4">hello uni-app</view>
								<view class="size-3">hello uni-app</view>
								<view class="size-2">hello uni-app</view>
								<view class="size-1">hello uni-app</view>
							</view>
							<view v-if="list.type === 'list'">
								<view class="uni-list">
									<view class="uni-list-cell" hover-class="uni-list-cell-hover">
										<view class="uni-list-cell-navigate uni-navigate-right">hello uni-app</view>
									</view>
									<view class="uni-list-cell" hover-class="uni-list-cell-hover">
										<view class="uni-list-cell-navigate uni-navigate-right">hello uni-app</view>
									</view>
									<view class="uni-list-cell" hover-class="uni-list-cell-hover">
										<view class="uni-list-cell-navigate uni-navigate-right">hello uni-app</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<view class="index-content">
			<view class="content contents">
				<navigator url="/pages/product/product" open-type="switchTab">
					<image src="https://www.slluks.com/upload/image_collection/1523930549.jpg" mode="widthFix"></image>
				</navigator>
			</view>
			<view class="content contents">
				<navigator url="/pages/content/content" open-type="switchTab">
					<image src="https://www.slluks.com/upload/image_collection/1523937404.jpg" mode="widthFix"></image>
				</navigator>
			</view>
			<view class="content art">
				<navigator url="/pages/goodstype/goodstype" open-type="navigate">
					<image src="https://www.slluks.com/upload/image_collection/index_3.jpg" mode="widthFix"></image>
				</navigator>
			</view>
		</view>
		<view class="goodsclass">
			<view class="goods big">
				<navigator open-type="navigate" url="/pages/product/product">aaa</navigator>
			</view>
			<view class="smallbox">
				<view class="goods small">
					<navigator open-type="navigate" url="/pages/product/product">bbb</navigator>
				</view>
				<view class="goods small">
					<navigator open-type="navigate" url="/pages/product/product">ccc</navigator>
				</view>
				<view class="goods small">
					<navigator open-type="navigate" url="/pages/product/product">ddd</navigator>
				</view>
				<view class="goods small">
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import pageHead from '../../components/page-head.vue';
	import foot from '../../components/common-foot.vue';

	export default {
		data: {
			title: 'accordion',
			lists: [{
					title: "图片轮播",
					type: 'swiper',
					show: true
				},
			],
			imgUrls: [
				{url:'/pages/content/content',image:'https://www.slluks.com/upload/image_collection/sllukst2.jpg'},
				{url:'/pages/goodstype/goodstype',image:'https://www.slluks.com/upload/image_collection/1523583424.jpg'},
				{url:'/pages/content/content',image:'https://www.slluks.com/upload/image_collection/1523583417.jpg'}
			],
			content:[]
		},
		methods: {
			trigerCollapse(e) {
				for (let i = 0, len = this.lists.length; i < len; ++i) {
					if (e === i) {
						this.lists[i].show = !this.lists[i].show;
					} else {
						this.lists[i].show = false;
					}
				}
			}
		},
		components: {
			pageHead
		},
		onLoad: function () {
			
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
		},
		onTabItemTap(){
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 300
			});
		}
	}
</script>

<style>
	@import "../../static/css/uni.css";

	.page {
		/* padding-top: 60px; */
	}
	.page {
		background: #efeff4;
	}
	.list-collapse {
		/* padding-left: 36px; */
		box-sizing: border-box;
	}
	image {
		width: 100%;
	}
	.page-pd {
		/* padding: 36px; */
	}
	.size-5 {
		font-size: 50px;
	}
	.size-4 {
		font-size: 40px;
	}
	.size-3 {
		font-size: 30px;
	}
	.size-2 {
		font-size: 20px;
	}
	.size-1 {
		font-size: 10px;
	}
	.uni-card{
		margin: 0;
	}
	.content image{
		display: block;
	}
	.content{
		border-top: 2px solid #333333;
		border-bottom: 2px solid #333333;
	}
	.goods{
		display: inline-block;
	}
	.goodsclass{
		padding: 10rpx 20rpx;
	}
	.big{
		width: 355rpx;
		height: 355rpx;
		float: left;
		position: relative;
	}
	.smallbox{
		display: inline-block;
		width: 355rpx;
		height: 355rpx;
	}
	.small{
		width: 177.5rpx;
		height: 177.5rpx;
		float: left;
		position: relative;
	}
	.goods navigator{
		width: 100%;
		height: 100%;
	}
</style>
