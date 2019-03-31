<template>
	<view class="page" v-if="empty">
		<page-head :title="title">{{title}}</page-head>
		<view class="content_empty">
			<image src="../../static/images/empty.png" mode="widthFix" class="empty"></image>
		</view>
	</view>
  <view class="page" v-else="">
    <page-head :title="title">{{title}}</page-head>
		<view class="orderby">
			<view class="order sales" @click="salesToggle">
				销量
				<image :src="salesUrl" mode="widthFix"></image>
			</view>
			<view class="order time" @click="ctimeToggle">
				上货时间
				<image :src="timeUrl" mode="widthFix"></image>
			</view>
			<view class="order price" @click="priceToggle">
				价格
				<image :src="priceUrl" mode="widthFix"></image>
			</view>
		</view>
    <view class="product-list">
      <view v-for="(product,index) in productList" :key="index">
        <product :image="product.pic_cover_small" :title="product.goods_name" :originalPrice="product.price" :favourPrice="product.market_price"
          :tip="product.goods_id"></product>
      </view>
    </view>
  </view>
</template>

<script>
  import product from '../../components/product.vue';
  import pageHead from '../../components/page-head.vue';

  export default {
    data() {
      return {
        title: '所有商品',
        productList: [],
		index: 1,
		allow:1,
		orderby:'desc',
		order:'',
		selectUrl:['../../static/images/tb.png','../../static/images/top.png','../../static/images/bottom.png'],
		salesUrl:'../../static/images/tb.png',
		priceUrl:'../../static/images/tb.png',
		timeUrl:'../../static/images/tb.png',
		'category_id' : '',
		'empty': true
      }
    },
    components: {
      product,
    },
    methods: {
			jiazai:function(action='add'){
				var _this = this;
				_this.allow = 0;
				if(action == 'pulldown'){
					this.index = 1;
				}else if(action == 'add'){
					this.index;
				}
				wx.request({
					url: 'https://www.slluks.com/index.php/app/goods/goodslist', //仅为示例，并非真实的接口地址
					data: {
						 'page' : _this.index,
						 'sort' : _this.orderby,
						 'order' : _this.order,
						 'category_id' : _this.category_id
					},
					header: {
						'content-type': 'application/json' // 默认值
					},
					success: function(res) {
						console.log(res.data)
						if(JSON.stringify(res.data)!== '[]'){
							_this.empty = false;
							if(action == 'pulldown'){
								_this.productList = [];
							}
							res.data.forEach(
								item => {
									_this.productList.push(item);
								}
							);
							if(action == 'pulldown'){
								_this.index=2;
							}else if(action == 'add'){
								_this.index++;
							}
						}else{
							if(action == 'add'){
								uni.showToast({
									title: '已经到底了哦',
									duration: 2000,
									icon: 'none'
								});
							}else if(action == 'pulldown'){
								uni.showToast({
									title: '沒有商品',
									duration: 2000,
									icon: 'none'
								});
							}
						}
						_this.allow = 1;
					},
					fail: function(){
						uni.showToast({
							title: '加载失败',
							duration: 2000,
							icon: 'none'
						});
						_this.empty = true;
						_this.allow = 1;
					}
				})
// 			uni.request({
// 			url: 'https://www.slluks.com/index.php/app/goods/goodslist', 
// 			responseType:'arraybuffer',
// 			header: {
// 				'content-type': 'application/json'
// 			},
// 			data: {
// 				'page' : _this.index,
// 			},
// 			success: function (res) {
// // 				if(JSON.stringify(res.data)!== '[]'){
// // 					if(action == 'pulldown'){
// // 						_this.productList = [];
// // 					}
// // 					res.data.forEach(
// // 						item => {
// // 							_this.productList.push(item);
// // 						}
// // 					);
// // 					_this.index++;
// // 				}
// 				console.log(res.data);
// 			}
// 			});
			},
			ctimeToggle: function(){
				if(this.orderby == "desc"){
					this.orderby = "asc";
					this.salesUrl = '../../static/images/tb.png',
					this.priceUrl = '../../static/images/tb.png',
					this.timeUrl = '../../static/images/top.png'
				}else if(this.orderby == "asc"){
					this.orderby = "desc",
					this.salesUrl = '../../static/images/tb.png',
					this.priceUrl = '../../static/images/tb.png',
					this.timeUrl = '../../static/images/bottom.png'
				}
				this.order = "ng.create_time"
				this.jiazai('pulldown');
			},
			salesToggle: function(){
				this.orderby = "desc",
				this.salesUrl = '../../static/images/top.png',
				this.priceUrl = '../../static/images/tb.png',
				this.timeUrl = '../../static/images/tb.png'
				this.order = "ng.sales";
				this.jiazai('pulldown');
			},
			priceToggle: function(){
				if(this.orderby == "desc"){
					this.orderby = "asc";
					this.salesUrl = '../../static/images/tb.png',
					this.priceUrl = '../../static/images/top.png',
					this.timeUrl = '../../static/images/tb.png'
				}else if(this.orderby == "asc"){
					this.orderby = "desc",
					this.salesUrl = '../../static/images/tb.png',
					this.priceUrl = '../../static/images/bottom.png',
					this.timeUrl = '../../static/images/tb.png'
				}
				this.order = "ng.price"
				this.jiazai('pulldown');
			}
    },
    onLoad(option) {
			if(option.category_id){
				this.category_id = option.category_id;
				this.title = option.category_name;
			}
      this.jiazai('pulldown');
	  this.productList;
    },
    onPullDownRefresh() {
			this.jiazai('pulldown');
			uni.showToast({
				title: '刷新',
				duration: 2000,
				icon: 'none'
			});
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 100);
    },
    onReachBottom() {
			if(this.allow == 1){
				this.jiazai('add');
			}
    },
		onTabItemTap(){
			if(this.allow == 1){
				this.jiazai('pulldown');
				uni.pageScrollTo({
						scrollTop: 0,
						duration: 300
				});
				uni.showToast({
					title: '刷新成功',
					duration: 2000,
					icon: 'none'
				});
			}
		}
  }
</script>

<style>
	.page{
		padding: 20rpx 0;
	}
	.product-list {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		flex-direction: row;
	}
	.order{
		display: inline-block;
		padding: 10rpx 0rpx 10rpx 20rpx;
		font-size: 32px;
		line-height: 50rpx;
		height: 50rpx;
	}
	.order image{
		width: 35rpx;
		position: relative;
		top: 25rpx;
		transform: translateY(-50%);
	}
	.empty{
		width: 500rpx;
		margin-top: 50vh;
		transform: translateY(-60%);
	}
	.content_empty{
		text-align: center;
	}
	page-head{
		padding-left: 20rpx;
		padding-top: 20rpx;
		font-weight: bold;
	}
</style>