<template>
	<view class="goods_info">
		<view class="content">
			<image :src="'https://www.slluks.com/'+cover" mode="aspectFit" class="goods_img"></image>
			<p class="goods_name">{{goods_info['goods_name']}}￥{{goods_info['price']}}</p>
			<button v-if="goods_info['stock'] > 0" :type="type" :size="primarySize" :loading="loading" :plain="plain" :disabled="disabled" class="add2car" @tap="showadd">
				加入购物车 </button>
			<button v-else-if="goods_info['stock'] == 0" type="warn" :size="primarySize" :loading="loading" :plain="plain" disabled="true" class="add2car">
				已售空 </button>
		</view>
		<view class="description">
			<rich-text :nodes="nodes"></rich-text>
		</view>
		<view v-if="show" class="addtocar">
			<view class="name">
				{{goods_info['goods_name']}}
			</view>
			<view class="price">
				总价:￥{{num}}.00
			</view>
			<view class="count">
				<view class="section section_gap">
					<view class="body-view">
						<slider @change="sliderchange" min="1" :max="goods_info['stock']" step="1" show-value/>
					</view>
				</view>
			</view>
			<view class="submit">
				<button type="primary" @tap="cancel">取消</button>
				<button type="warn" @tap="addtocar">加入购物车</button>
			</view>
		</view>
		<view >
			<navigator open-type="switchTab" url="/pages/cart/cart" class="cart" style="background-image: url(../../static/images/tocart.png);"></navigator>
		</view>
	</view>
</template>
<script>
	export default {
		data: {
			goods_id: 0,
			goods_info: [],
			cover: '',
			disabled: false,
			plain: false,
			loading: false,
			primarySize: 'default',
			type: 'primary',
			nodes: "",
			show: false,
			count: 1,
			num: 0.00,
			uid: '',
			is_login: false
		},
		onLoad: function(option) {
			this.uid = uni.getStorageSync('uid');
			this.goods_id = option.goodsid;
			this.show = false,
			this.islogin();
			this.reset();
			this.jiazai();
		},
		components: {},
		methods: {
			jiazai: function() {
				var _this = this;
				wx.request({
					url: 'https://www.slluks.com/index.php/app/goods/goodsinfo',
					header: {
						'content-type': 'application/json' // 默认值
					},
					data: {
						'goodsid': this.goods_id,
					},
					success: function(res) {
						_this.goods_info = res.data;
						_this.cover = _this.goods_info.img_temp_array[0].pic_cover;
						_this.nodes= _this.goods_info['description'];
						console.log(_this.cover);
					}
				});
			},
			addtocar: function() {
				var _this = this;
				if(_this.is_login){
					_this.show = false;
					_this.disabled = true;
					_this.type = 'warn';
					wx.request({
						url: 'https://www.slluks.com/index.php/app/member/addtocart',
						method : "POST",
						header: {
							'content-type': 'application/json' // 默认值
						},
						data: {
							'buyer_id': _this.uid,
							'goods_id': _this.goods_id,
							'num': _this.count,
							'sku_id': _this.goods_info.sku_list[0].sku_id,
							'goods_picture': _this.cover,
							'goods_price': _this.goods_info['price'],
							'stock': _this.goods_info['stock'],
							'goods_name': _this.goods_info['goods_name']
						},
						success: function(res) {
							uni.showToast({
								title: res.data.message,
								duration: 1000,
								icon: 'none'
							});
							_this.disabled = false;
							_this.show = false;
							_this.type = "primary";
						}
					})
				}else{
					uni.showToast({
						title: "请先登录",
						duration: 1000,
						icon: 'none',
						success:function(){
							setTimeout(function(){
								wx.switchTab({
								url: '/pages/myself/myself'
								})
							},1000)
						}
					});
				}
				
			},
			reset: function() {
				this.type = 'primary';
				this.disabled = false;
			},
			sliderchange:function(e){
				 console.log('slider发生 change 事件，携带值为', e.detail.value);
				 this.count = e.detail.value;
				 this.num = this.count*this.goods_info['price'];
			},
			cancel:function(){
				this.type = 'primary';
				this.disabled = false;
				this.show = false;
			},
			showadd:function(){
				this.show = true;
			},
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
		},
		onPullDownRefresh() {
			this.reset();
			uni.showToast({
				title: '刷新成功',
				duration: 1000,
				icon: 'none'
			});
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		}
	}
</script>
<style>
	.goods_info {
		width: 100%;
		padding: 100px 0;
		text-align: center;
	}

	.content {
		width: 100%;
	}

	.goods_img {
		width: 90%;
		margin: 0 auto;
		height: 500px;
	}

	.goods_name {
		text-align: center;
		width: 100%;
	}
	
	.add2car {
		margin-top: 70px;
		width: 90%;
	}
	
	.description{
		width: 90%;
		margin-left: 5%;
		margin-top: 20rpx;
	}
	.addtocar{
		width: 100%;
		background: white;
		position: fixed;
		bottom: -10rpx;
		padding-top: 50rpx;
	}
	.submit button{
		width: 50%;
		display: inline-block;
		border-radius: 0;
	}
	.name,.price{
		width: 50%;
		display: inline-block;
	}
	.cart{
		width: 100rpx;
		height: 100rpx;
		background-size: cover;
		position: fixed;
		bottom: 240rpx;
		right: 40rpx;
	}
</style>
