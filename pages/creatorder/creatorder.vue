<template>
	<view class="page">
		<view class="title">
			请确认订单信息
		</view>
		<view class="cart_list">
			<view v-for="(cart,index) in order_list" :key="index" class="cart_info">
				<view>{{cart.goods_name}}</view>
				<view>x {{cart.num}}</view>
				<view>{{cart.price}}</view>
			</view>
		</view>
		<view class="price">
			<view>总价</view>
			<view></view>
			<view class="total">{{total}}.00</view>
		</view>
		<view class="bottom">
			<button type="warn" class="gotopay" @tap="creatOrder" >去支付</button>
		</view>
		<form @submit="formSubmit" class="address">
			<picker mode="selector" :range="country" :value="country_index"  range-key="name" @change="listenerCountrySelected">
				<text>{{country[country_index].name}}</text>
			</picker>
			<picker mode="selector" :range="province" :value="province_index" range-key="province_name" @change="listenerProvinceSelected">
				<text>{{province[province_index].province_name}}</text>
			</picker>
			<picker mode="selector" :range="city" :value="city_index" range-key="city_name" @change="listenerCitySelected">
				<text>{{city[city_index].city_name}}</text>
			</picker>
			<picker mode="selector" :range="district" :value="district_index" range-key="district_name" @change="listenerDistrictSelected">
				<text>{{district[district_index].district_name}}</text>
			</picker>
			<input type="text" placeholder="收货人详细地址" @blur="addressInput" maxlength="20">
			<input type="text" placeholder="收货人姓名" @blur="nameInput" maxlength="10">
			<input type="text" placeholder="收货人联系方式" @blur="mobileInput" maxlength="11">
			<!-- <button formType="submit" disabled="true">Submit</button> -->
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				uid:0,
				cart_id:'',
				order_list: [],
				total: 0.00,
				country : [{
					name:'请选择国家/地区',
					country_id:0
					}],
				province : [{
					province_name:'请选择省/区/直辖市',
					province_id:0
					}],
				city : [{
					city_name:'请选择城市',
					city_id:0
					}],
				district : [{
					district_name:'请选择区域',
					district_id:0
					}],
				//选项的值
				country_index : 0,
				province_index : 0,
				city_index : 0,
				district_index : 0,
				//选中选项所对应的id
				country_id : 0,
				province_id : 0,
				city_id : 0,
				district_id : 0,
				receiver_name: '',
				receiver_mobile:'',
				receiver_address:'',
				'out_trade_no':'',
				'sign':''
			};
		},
		methods:{
			setOrder:function(){
				var _this = this;
				wx.request({
					url: "https://www.slluks.com/index.php/app/member/setOrder",
					method: "POST",
					data:{
						"buyer_id" : _this.uid,
						"cart_id" : _this.cart_id
					},
					header: {
						'content-type': 'application/json' // 默认值
					},
					success:function(res){
						_this.order_list = res.data;
						for(var i=0 ; i <= res.data.length ; i++){
							_this.total += res.data[i].price * res.data[i].num;
							console.log(res.data[i]);
						}
						_this.total = _this.total;
					}
				})
			},
			listenerCountrySelected: function(e) {
				//改变index值，通过setData()方法重绘界面
				this.country_index =  e.detail.value;
				this.country_id = this.country[e.detail.value].country_id;
				this.province_index = 0;
				this.city_index = 0;
				this.district_index = 0;
				this.province_id = 0;
				this.city_id = 0;
				this.district_id = 0;
				this.province = [{
					province_name:'请选择省/区/直辖市',
					province_id:0
					}];
				this.city = [{
					city_name:'请选择城市',
					city_id:0
					}];
				this.district = [{
					district_name:'请选择区域',
					district_id:0
					}];
				this.getProvinceList();
			},
			listenerProvinceSelected: function(e) {
				//改变index值，通过setData()方法重绘界面
				this.province_index =  e.detail.value;
				this.province_id = this.province[e.detail.value].province_id;
				this.city_index = 0;
				this.district_index = 0;
				this.city_id = 0;
				this.district_id = 0;
				this.city = [{
				city_name:'请选择城市',
				city_id:0
				}];
				this.district = [{
				district_name:'请选择区域',
				district_id:0
				}];
				this.getCityList();
			},
			listenerCitySelected: function(e) {
				//改变index值，通过setData()方法重绘界面
				this.city_index = e.detail.value;
				this.district_index = 0;
				this.district_id = 0;
				this.district = [{
				district_name:'请选择区域',
				district_id:0
				}];
				this.city_id = this.city[e.detail.value].city_id;
				this.getDistrictList();
			},
			listenerDistrictSelected: function(e) {
				//改变index值，通过setData()方法重绘界面
				this.district_index = e.detail.value;
				this.district_id = this.district[e.detail.value].district_id;
			},
			getCountryList: function(){
				var _this = this;
				wx.request({
					url: 'https://www.slluks.com/index.php/app/member/getCountry', //仅为示例，并非真实的接口地址
					data: {
						
					},
					header: {
						'content-type': 'application/json' // 默认值
					},
					success: function(res) {
						res.data.forEach(
							item => {
								_this.country.push({
										country_id:item.country_id,
										name:item.name
									});
							}
						);
					},
					fail: function(){
						console.log('加载country失败');
					}
				})
			},
			getProvinceList:function(){
				var _this = this;
				wx.request({
					url: 'https://www.slluks.com/index.php/app/member/getProvince', //仅为示例，并非真实的接口地址
					data: {
						'country_id': _this.country_id
					},
					method:'POST',
					header: {
						'content-type': 'application/json' // 默认值
					},
					success: function(res) {
						res.data.forEach(
							item => {
								_this.province.push({
										province_name:item.province_name,
										province_id:item.province_id
									});
							}
						);
					},
					fail: function(){
						console.log('加载province失败');
					}
				})
			},
			getCityList:function(){
				var _this = this;
				wx.request({
					url: 'https://www.slluks.com/index.php/app/member/getCity', //仅为示例，并非真实的接口地址
					data: {
						'province_id': _this.province_id
					},
					method:'POST',
					header: {
						'content-type': 'application/json' // 默认值
					},
					success: function(res) {
						res.data.forEach(
							item => {
								_this.city.push({
										city_name:item.city_name,
										city_id:item.city_id
									});
							}
						);
					},
					fail: function(){
						console.log('加载city失败');
					}
				})
			},
			getDistrictList:function(){
				var _this = this;
				wx.request({
					url: 'https://www.slluks.com/index.php/app/member/getDistrict', //仅为示例，并非真实的接口地址
					data: {
						'city_id': _this.city_id
					},
					method:'POST',
					header: {
						'content-type': 'application/json' // 默认值
					},
					success: function(res) {
						res.data.forEach(
							item => {
								_this.district.push({
										district_name:item.district_name,
										district_id:item.district_id
									});
							}
						);
					},
					fail: function(){
						console.log('加载district失败');
					}
				})
			},
			formSubmit:function(){
				var _this = this;
				wx.ruquest({
					url: 'https://www.slluks.com/index.php/app/member/getDistrict',
					data:{
						'country_id': _this.country_id,
						'province_id': _this.province_id,
						'city_id': _this.city_id,
						'district_id': _this.district_id
					},
					method:'POST',
					header: {
						'content-type': 'application/json' // 默认值
					},
					success: function(res) {
						console.log(res.data);
					},
					fail: function(){
						console.log('添加地址失败');
					}
				})
				
			},
			addressInput:function(e){
				this.receiver_address = e.detail.value;
				console.log(this.receiver_address);
			},
			mobileInput:function(e){
				this.receiver_mobile = e.detail.value;
				console.log(this.receiver_mobile);
			},
			nameInput:function(e){
				this.receiver_name = e.detail.value;
				console.log(this.receiver_name);
			},
			creatOrder:function(){
				var _this = this;
				var stringA="appid=wxdfe1b8c60ee623a0&body=SLLUKS-商品购买&device_info=WEB&mch_id=1517873741&nonce_str=SLLUKS3310";
				var stringSignTemp=stringA+"&key=Slluks3310Slluks3310Slluks3310kk";//注：key为商户平台设置的密钥key
				wx.request({
					url: 'https://www.slluks.com/index.php/app/member/creatOrder', //仅为示例，并非真实的接口地址
					data: {
						"buyer_id" : _this.uid,
						"cart_id" : _this.cart_id,
						'country_id': _this.country_id,
						'province_id': _this.province_id,
						'city_id': _this.city_id,
						'district_id': _this.district_id,
						'receiver_name': _this.receiver_name,
						'receiver_mobile':_this.receiver_mobile,
						'receiver_address':_this.receiver_address,
						'stringSignTemp':_this.stringSignTemp
					},
					method:'POST',
					header: {
						'content-type': 'application/json' // 默认值
					},
					success: function(res) {
						uni.showToast({
							title: res.data.message,
							duration: 1000,
							icon: 'none'
						})
						if(res.data.error_code == 1){
							uni.switchTab({
								url:'/pages/cart/cart'
							})
						}else{
							_this.out_trade_no = res.data.out_trade_no;
							
							_this.sign = res.data.stringSignTemp;//注：MD5签名方式
							wx.request({
								url:"https://api.mch.weixin.qq.com/pay/unifiedorder",
								method: 'POST',
								data:{
									'appid':'wxdfe1b8c60ee623a0',
									'mch_id':'1517873741',
									'device_info':'WEB',
									'nonce_str':'SLLUKS3310',
									'sign':'签名',
									'sign_type': 'MD5',
									'body':'SLLUKS-商品购买',
									'out_trade_no': _this.out_trade_no,
									'fee_type':'CNY',
									'notify_url':'https:www.slluks.com/index.php/app/order/returnPayInfo',
									'trade_type': 'JSAPI',
									'total_fee':res.data.total_fee,
									'spbill_create_ip':res.data.spbill_create_ip,
									'openid':_this.uid
								},
								header: {
									'content-type': 'application/json' // 默认值
								},
								succsee:function(res){
									console.log(res.data);
									console.log(_this.sign);
								},
								fail() {
									console.log(111111);
								}
							})
						}
					},
					fail: function(){
						uni.showToast({
							title: '创建订单失败',
							duration: 1000,
							icon: 'none'
						})
					}
				})
			}
		},
		onLoad: function(option){
			this.uid = option.uid;
			this.cart_id = option.cart_id;
			this.setOrder();
			this.getCountryList();
		},
		onPullDownRefresh() {
			
		},
		onTabItemTap(){
			
		}
	}
</script>

<style>
	.title{
		text-indent: 50rpx;
		padding: 20rpx 0;
	}
	.cart_list{
		width: 650rpx;
		padding: 20rpx 50rpx;
	}
	.cart_info view{
		width: 200rpx;
		display: inline-block;
	}
	.bottom{
		width:750rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		text-align: right;
	}
	.gotopay{
		border-radius: 0;
	}
	.price{
		padding: 0 50rpx;
	}
	.price view{
		display: inline-block;
		width: 200rpx;
	}
	.address picker{
		margin-left: 50rpx;
	}
	.address input{
		width: 650rpx;
		padding: 10rpx;
		margin-top: 10rpx;
		margin-left: 50rpx;
		border: 1px solid #09BB07;
		border-radius: 5rpx;
	}
</style>
