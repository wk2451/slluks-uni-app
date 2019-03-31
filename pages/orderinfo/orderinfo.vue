<template>
	<view class="page">
		<view class="order_info">
			订单号 : {{order_info.order_no}}
		</view>
		<view class="order_info">
			订单创建时间 : {{order_info.create_time}}
		</view>
		<view  class="goods_info">商品名称 : </view>
		<view  class="goods_info">商品单价 : </view>
		<view  class="goods_info">商品数量 : </view>
		<view v-for="(order_goods,index) in order_gooods_info" :key="index">
			<view  class="goods_info">{{order_goods.goods_name}}</view>
			<view  class="goods_info">￥{{order_goods.price}}</view>
			<view  class="goods_info">{{order_goods.num}}</view>
		</view>
		<view class="order_info">
			支付金额 : ￥{{order_info.pay_money}}.00
		</view>
		<view class="order_info">
			订单状态 : {{order_info.order_status}}
		</view>
		<view class="" v-if="order_info.order_status==0 && order_info.pay_status==1">
			<button type="primary">去支付</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				'order_id' : '',
				'order_info' : [],
				'order_gooods_info' : []
			};
		},
		methods:{
			getOrderInfo:function(order_id){
				var _this = this
				wx.request({
					url:'https://www.slluks.com/index.php/app/order/wechatOrderDetail',
					data:{
						'order_id': order_id
					},
					header: {
						'content-type': 'application/json' // 默认值
					},
					success:function(res){
						_this.order_info = res.data;
						_this.order_gooods_info = res.data.goods_info;
						console.log(res.data.goods_info);
					}
				})
			}
		},
		onLoad:function(option){
			this.order_id = option.order_id;
			this.getOrderInfo(this.order_id);
		}
	}
</script>

<style>
	.page{
		padding: 20rpx 5%;
	}
	.goods_info{
		width: 30%;
		display: inline-block;
		padding: 10rpx 0;
	}
	.order_info{
		padding: 10rpx 0;
	}
</style>
