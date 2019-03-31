<template>
	<view>
		<form @submit="formSubmit">
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
			<button formType="submit">Submit</button>
		</form>
	</view>
</template>

<script>
	export default {
		data:{
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
		},
		methods:{
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
				
			}
		},
		onLoad:function(){
			this.getCountryList();
		},
		onReachBottom:function(){
			
		},
		onPullDownRefresh:function(){
			
		},
		onTabItemTap:function(){
			
		}
	}
</script>

<style>

</style>
