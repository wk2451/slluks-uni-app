<template>
	<view class="page">
		<view class="title">我的订单</view>
		<view v-if="orderList==false" class="noorder">
			<view class="message">
				没有订单
			</view>
			<image src="https://slluks.com/upload/app/order3.png" mode="widthFix"></image>
		</view>
		<view v-else="">
			<view v-for="(order,index) in orderList" :key="index" class="every_order">
				<view>订单编号: {{order.order_no}}</view>
				<view>金额: {{order.pay_money}}</view>
				<view>订单创建时间: {{order.create_time}}</view>
				<view>订单状态: {{order.order_status}}</view>
				<navigator open-type="navigate" :url="'/pages/orderinfo/orderinfo?order_id='+order.order_id">查看订单详情</navigator>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data:{
			orderList:[],
			'uid':''
		},
		methods:{
			getOrderList:function(){
				var _this = this;
				_this.uid = uni.getStorageSync('uid');
				wx.request({
					url: 'https://www.slluks.com/index.php/app/order/orderlist',
					data: {
						'uid' : _this.uid,
						'order_status' : '',
					},
					method:'POST',
					header: {
						'content-type': 'application/json' // 默认值
					},
					success: function(res) {
						_this.orderList = [];
						res.data.forEach(
							item => {
								_this.orderList.push(item);
							}
						);
						uni.showToast({
							title: '加载成功',
							duration: 2000,
							icon: 'none'
						});
						console.log(res.data);
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
		onLoad() {
			this.getOrderList();
		},
		onPullDownRefresh() {
			
		},
		onReachBottom() {
			
		},
		onTabItemTap(){
			
		}
	}
</script>

<style>
	.page{
		padding-bottom: 20rpx;
	}
	.title{
		font-size: 40rpx;
		padding: 20rpx;
	}
	.every_order{
		border: 1px solid #09BB07;
		padding: 20rpx;
		font-size: 30rpx;
	}
	.every_order view{
		padding: 10rpx 0;
	}
	.every_order navigator{
		width: 250rpx;
		margin-left: 460rpx;
		text-align: center;
	}
	.message{
		text-align: center;
	}
	.noorder{
		text-align: center;
		margin-top: 40vh;
		transform: translateY(-50%);
	}
	.noorder image{
		width: 70%;
		margin-top: 50rpx;
	}
</style>
