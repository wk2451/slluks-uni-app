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
									<image :src="img" style="height: 400px;"/>
								</swiper-item>
							</swiper>
							<view v-if="list.type === 'font'" class="page-pd">
								<view class="size-5">hello uni-app</view>
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
			<view class="content product">
				<image src="https://www.slluks.com/upload/image_collection/1523930549.jpg"></image>
			</view>
			<view class="content contents">
				<image src="https://www.slluks.com/upload/image_collection/1523937404.jpg"></image>
			</view>
			<view class="content art">
				<image src="https://www.slluks.com/upload/image_collection/index_3.jpg"></image>
			</view>
		</view>
		<map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers">
                </map>
		</view>
</template>

<script>
	import pageHead from '../../components/page-head.vue'

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
				'https://www.slluks.com/upload/image_collection/sllukst2.jpg',
				'https://www.slluks.com/upload/image_collection/1523583424.jpg',
				'https://www.slluks.com/upload/image_collection/1523583417.jpg'
			],
            latitude: 9.909,
            longitude: 116.39742,
            covers: [{
                latitude: 39.909,
                longitude: 116.39742,
                iconPath: '../../../static/images/menu1.png'
            }, {
                latitude: 39.90,
                longitude: 116.39,
                iconPath: '../../../static/images/menu1.png'
            }]
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
		onLoad: function (options) {
			uni.getStorage({
				key: 'storage_key',
				success: function (res) {
					console.log(res.data);
				}
			});
		},
		onPullDownRefresh() {
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
	.content image{
		display: block;
	}
	.content{
		border-top: 2px solid #333333;
		border-bottom: 2px solid #333333;
	}
</style>
