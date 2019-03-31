<template>
	<view class="page">
		<view v-if="order==false" class="empty">
			<image src="../../static/images/cart.png" mode="widthFix"></image>
			<p>购物车空空如也</p>
			<navigator url="/pages/goodstype/goodstype" open-type="switchTab" class="goshoping">去购物</navigator>
		</view>
		<view v-else>
			<view class="title">
				<checkbox-group @change="checkAllChange">
					<checkbox class="all" :checked="checkedAll" value="ok" />全选
				</checkbox-group>
			</view>
			<checkbox-group @change="checkboxChange" class="myorder">
				<label class="eveorder" v-for="(myorder,index) in order" :key="index">
					<view class="check">
						<checkbox class="checked" :value="myorder.cart_id" :checked="myorder.checked" />
					</view>
					<view class="pic">
						<image :src="myorder.goods_picture" mode="widthFix"></image>
					</view>
					<view class="goodsinfo">
						<view class="name">
							{{myorder.goods_name}}
						</view>
						<view class="price">
							{{myorder.price}}
						</view>
					</view>
					<view class="stock">
						x{{myorder.num}}
					</view>
				</label>
			</checkbox-group>
			<!-- <view class="myorder">
				<view class="eveorder" v-for="(myorder,index) in order" :key="index">
					<view class="check">
						<input type="checkbox" name="ischecked" :id="myorder.goods_id" v-model="checkedNames">
					</view>
					<view class="pic">
						<image :src="myorder.pic_cover_small" mode="widthFix"></image>
					</view>
					<view class="goodsinfo">
						<view class="name">
							{{myorder.goods_name}}
						</view>
						<view class="price">
							{{myorder.price}}
						</view>
					</view>
					<view class="stock">
						x{{myorder.stock}}
					</view>
				</view>
			</view> -->
		</view>
		<view class="foot">
			<view class="total_price">
				￥{{total_price}}
			</view>
			<view class="set_order" @tap="setOrder">
				结算
			</view>
		</view>
		<!-- <scroll-view scroll-x="true"  class="sroll2">
			<view class="box2">
				<view class="modelb1">
					<image src="https://www.slluks.com/upload/goods/20180807/238e4e9457b4c50846bb8399eb05d7b71.jpg" mode="widthFix" class="shake shake-slow"></image>
				</view>
				<view class="modelb2">
					<view class="models model3">
						<image src="https://www.slluks.com/upload/goods/20180807/238e4e9457b4c50846bb8399eb05d7b71.jpg" mode="widthFix" class="shake shake-slow"></image>
					</view>
					<view class="models model4">
						<image src="https://www.slluks.com/upload/goods/20180807/238e4e9457b4c50846bb8399eb05d7b71.jpg" mode="widthFix" class="shake shake-slow"></image>
					</view>
					<view class="models model5">
						<image src="https://www.slluks.com/upload/goods/20180807/238e4e9457b4c50846bb8399eb05d7b71.jpg" mode="widthFix" class="shake shake-slow"></image>
					</view>
					<view class="models model6">
						<image src="https://www.slluks.com/upload/goods/20180807/238e4e9457b4c50846bb8399eb05d7b71.jpg" mode="widthFix" class="shake shake-slow"></image>
					</view>
					<view class="models model7">
						<image src="https://www.slluks.com/upload/goods/20180807/238e4e9457b4c50846bb8399eb05d7b71.jpg" mode="widthFix" class="shake shake-slow"></image>
					</view>
				</view>
			</view>
		</scroll-view> -->
	</view>
</template>
<script>
	export default{
		data:{
			order:[],//订单数据
			checked : false,
			checkedAll : false,
			allNames: [],//购物车内所有商品id，用来对比是否全选中
			checkedNames: [],//已经选中的商品id，==allNames时，全选
			total_price: 0.00,//选中商品总价
			uid:'',
			is_login: false
		},
		components:{
			
		},
		methods:{
			//获取所有购物车内商品信息
			islogin:function(){
				var _this = this;
				wx.checkSession({
				success () {
					//session_key 未过期，并且在本生命周期一直有效
					_this.is_login = true;
				},
				fail () {
					// session_key 已经失效，需要重新执行登录流程
					_this.is_login = false;
				}
			})
			},
			getCartInfo: function(){
				var _this = this;
				this.islogin();
				if(_this.is_login){
					_this.uid = uni.getStorageSync('uid');
					wx.request({
						url: 'https://www.slluks.com/index.php/app/member/cartList',
						method : "POST",
						data: {
							'buyer_id' : _this.uid
						},
						header: {
							'content-type': 'application/json' // 默认值
						},
						success: function(res) {
							_this.order = [];
							_this.allNames = [];
							_this.checkedNames = [];
							_this.total_price = 0.00;
							console.log(_this.uid);
							if(JSON.stringify(res.data.cartList)!='[]'){
								res.data.cartList.forEach(
									item => {
										item.checked = false;
										_this.allNames.push(item.cart_id);
										_this.order.push(item);
									}
								);
								if(res.data.message){
									uni.showToast({
										title: res.data.message,
										duration: 2000,
										icon: 'none'
									});
								}else{
									uni.showToast({
										title: '加载成功',
										duration: 2000,
										icon: 'none'
									});
								}
							}else{
								uni.showToast({
									title: '购物车空空如也',
									duration: 2000,
									icon: 'none'
								});
							}
						},
						fail: function(){
							uni.showToast({
								title: '加载失败',
								duration: 2000,
								icon: 'none'
							});
						}
					})
				}else{
					uni.showToast({
						title: '请先登陆',
						duration: 2000,
						icon: 'none'
					});
				}
			},
			//商品选择状态改变时调用
			checkboxChange:function(e){
				//判断是否全选
				var _this = this;
				if(e.detail.value.length == this.order.length){
					this.checkedAll = true;
				}else if(e.detail.value.length < this.order.length){
					this.checkedAll = false;
				}
				this.checkedNames = e.detail.value;
				this.total_price = 0.00;
				this.order.forEach(
					item => {
						if(_this.inarray(item.cart_id,_this.checkedNames) ){
							_this.total_price += item.price*item.num;
						}
					}
				)
				_this.total_price = _this.total_price.toFixed(2);
				console.log(e.detail.value)
			},
			//全选选项改变时调用
			checkAllChange:function(e){
				var _this = this;
				console.log(e.detail.value[0]);
				if(e.detail.value[0] == "ok"){
					for(var i = 0 ; i < this.order.length ; i++){
						this.order[i].checked = true;
					}
					this.checkedNames = this.allNames;
					this.checkedAll = true;
					this.total_price = 0.00;
					this.order.forEach(
						item => {
							if(_this.inarray(item.cart_id,_this.checkedNames) ){
								_this.total_price += item.price*item.num;
							}
						}
					)
					console.log(this.checkedNames);
				}else if(e.detail.value[0] == undefined){
					this.checkedNames = [];
					this.checkedAll = false;
					this.total_price = 0.00;
					for(var i = 0 ; i < this.order.length ; i++){
						this.order[i].checked = false;
					}
					console.log(this.checkedNames);
				}
			},
			inarray:function(search,array){
				for(var i in array){
					if(array[i]==search){
						return true;
					}
				}
				return false;
			},
			setOrder:function(){
// 				var _this = this;
// 				wx.request({
// 					url: "https://www.slluks.com/index.php/app/member/setOrder",
// 					method: "POST",
// 					data:{
// 						"buyer_id" : _this.uid,
// 						"cart_id" : JSON.stringify(_this.checkedNames)
// 					},
// 					header: {
// 						'content-type': 'application/json' // 默认值
// 					},
// 					success:function(res){
// 						console.log(res.data)
// 					}
// 				})
				if(JSON.stringify(this.checkedNames)!='[]'){
					uni.navigateTo({
						url: "/pages/creatorder/creatorder?uid="+this.uid+"&&cart_id="+JSON.stringify(this.checkedNames)
					})
				}else{
					uni.showToast({
						title: '没有选中商品',
						duration: 2000,
						icon: 'none'
					})
				}
			}
		},
		onLoad() {
			this.getCartInfo();
		},
		onPullDownRefresh() {
			
		},
		onReachBottom() {
			
		},
		onTabItemTap(){
			this.getCartInfo();
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 300
			});
		}
	}
</script>
<style>
	@import "../../static/css/shake.css";
	@import "../../static/css/cart.css";
	.page{
		min-height: 100vh;
		background-color: #8F8F94;
		text-align: center;
		padding-bottom: 60rpx;
		font-family: "Microsoft YaHei";
	}
	.empty image{
		width: 80%;
		margin: 20% 10% 0;
	}
	.empty p{
		text-align: center;
	}
	.scroll2{
		width: 750rpx;
		height: 375rpx;
		background-color: #09BB07;
	}
	.box2{
		width: 1312.5rpx;
		height: 375rpx;
	}
	.box2 .modelb1{
		width: 375rpx;
		height: 375rpx;
		background-color: #8A6DE9;
		float: left;
	}
	.box2 .modelb1 image{
		width: 300rpx;
		height: 300rpx;
		margin: 37.5rpx;
	}
	.box2 .modelb2{
		width: 562.5rpx;
		height: 375rpx;
		background-color: #8A6DE9;
		float: left;
	}
	.box2 .models{
		width: 187.5rpx;
		height: 187.5rpx;
		float: left;
	}
	.box2 .models image{
		width: 150rpx;
		height: 150rpx;
		margin: 18.75rpx;
	}
	.box2 .model3{
		background-color: #4CD964;
	}
	.box2 .model4{
		background-color: #09BB07;
	}
	.box2 .model5{
		background-color: #4CD964;
	}
	.box2 .model6{
		background-color: #007AFF;
	}
	.box2 .model7{
		background-color: #4CD964;
	}
	.goshoping{
		width: 30%;
		background-color: #333333;
		border: 1px solid #888888;
		border-radius: 20rpx;
		margin-left: 35%;
		margin-top: 30rpx;
	}
	.title{
		width: 90%;
		height: 50rpx;
		padding: 20rpx 5%;
		text-align: left;
	}
	.eveorder{
		display: inline-block;
		width: 90%;
		height: 300rpx;
		padding: 0rpx 37.5rpx;
		border-top: 1px solid #333333;
	}
	.check{
		width: 10%;
		height: 300rpx;
		float: left;
		line-height: 300rpx;
	}
	.goodsinfo{
		width: 40%;
		height: 200rpx;
		padding: 50px 0;
		float: left;
	}
	.goodsinfo .name{
		width: 100%;
		height: 100rpx;
	}
	.goodsinfo .price{
		width: 100%;
		height: 100rpx;
		line-height:100rpx;
	}
	.pic{
		width: 26%;
		height: 200rpx;
		padding: 50rpx 7%;
		float: left;
	}
	.pic image{
		width: 100%;
		margin-top: 100rpx;
		transform: translateY(-50%);
	}
	.stock{
		width: 10%;
		height: 300rpx;
		line-height: 300rpx;
		float: left;
	}
	.foot{
		width: 100%;
		height: 80rpx;
		position: fixed;
		background: white;
		z-index: 2;
		bottom: 0;
		left: 0;
		box-shadow: -1rpx 0 20rpx 1rpx rgba(0,0,0,0.1);
	}
	.foot .total_price{
		width: 50%;
		display: inline-block;
		height: 80rpx;
		line-height: 80rpx;
		text-align: left;
	}
	.foot .set_order{
		width: 30%;
		display: inline-block;
		text-align: center;
		float: right;
		height: 80rpx;
		line-height: 80rpx;
		background-color: red;
	}
</style>