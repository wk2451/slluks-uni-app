<template>
	<view class="page">
		<page-head :title="title">{{title}}</page-head>
		<view class="">
			<view class="11" v-for="(evetype,index) in allType" :key="index">
				<h2 class="first_type">·{{evetype.category_name}}</h2>
				<view class="">
					<navigator :url="'/pages/product/product?category_id='+evetype.category_id+'&&category_name='+evetype.category_name" class="second_type" open-type="navigate">
						全部{{evetype.category_name}}
					</navigator>
					<navigator  v-if="evetype.child_list != ''" :url="'/pages/product/product?category_id='+child_type.category_id+'&&category_name='+child_type.category_name" open-type="navigate" class="second_type" v-for="(child_type,index1) in evetype.child_list" :key="index1">
						{{index1+1}}.{{child_type.category_name}}
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import pageHead from '../../components/page-head.vue';
	
	export default{
		data:{
			allType: [],
			title: "Categories"
		},
		methods:{
			getGoodsType:function(){
				var _this = this;
				_this.allType = [],
				wx.request({
					url: 'https://www.slluks.com/index.php/app/goods/goodsType', //仅为示例，并非真实的接口地址
					data: {
						
					},
					header: {
						'content-type': 'application/json' // 默认值
					},
					success: function(res) {
						_this.allType = res.data;
						uni.showToast({
							title: '加载成功',
							duration: 2000,
							icon: 'none'
						});
					},
					fail: function(){
						uni.showToast({
							title: '加载失败',
							duration: 2000,
							icon: 'none'
						});
					}
				})
			}
		},
		onLoad(){
			
			this.getGoodsType();
		},
		onPullDownRefresh(){
			this.getGoodsType();
		},
		onReachBottom(){
			
		},
		onTabItemTap(){
			this.getGoodsType();
			uni.pageScrollTo({
					scrollTop: 0,
					duration: 300
			});
			
		}
	}
</script>
<style>
	.second_type{
		font-size: 36rpx;
		text-indent: 90rpx;
	}
	.first_type{
		font-size: 44rpx;
		font-weight: 800;
		text-indent: 60rpx;
		padding: 10rpx 0;
	}
	page-head{
		font-size: 48rpx;
		font-weight: 800;
		padding-left: 30rpx;
		padding-top: 20rpx;
	}
</style>