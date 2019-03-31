<template>
	<view class="page" v-if="is_login">
		<view class="userinfo">
			<image :src="user_image" mode="widthFix"></image>
		</view>
		<view class="options">
			<navigator url="/pages/orderlist/orderlist" open-type="navigate" class="option myorder" style="background: url('../../static/images/order.png') no-repeat 35% center;background-size: auto 60%;">我的订单</navigator>
			<navigator url="/pages/address/address" open-type="navigate" class="option myaddress"  style="background: url('../../static/images/address.png') no-repeat 35% center;background-size: auto 60%;">我的地址</navigator>
		</view>
	</view>
	<view class="page" v-else="">
			<button type="primary" open-type="getUserInfo" @getuserinfo="getuserinfo" withCredentials="true" class="getUserInfo">用户登陆</button>
	</view>
</template>

<script>
  import pageHead from '../../components/page-head.vue';

  export default {
    data() {
      return {
        user_image: "",
		is_login: false,
      }
    },
    components: {
      
    },
    methods: {
			//判断是否登陆
			islogin:function(){
				var _this = this;
				wx.checkSession({
					success () {
						//session_key 未过期，并且在本生命周期一直有效
						_this.is_login = true;
						_this.user_image = uni.getStorageSync('avatarUrl');
					},
					fail () {
						// session_key 已经失效，需要重新执行登录流程
						_this.is_login = false;
						_this.getuserinfo();
					}                   
				})
			},
			getuserinfo : function(res1){
				console.log(1111);
				var _this = this;
				_this.user_image = res1.detail.userInfo.avatarUrl;
				uni.setStorageSync('avatarUrl', res1.detail.userInfo.avatarUrl);
			 //如果只需要opendid 和非加密数据至此登录完成
			 //此处连接数据库利用openid 就可以进行登录环节
			 //免费的视频教程 http://www.hcoder.net/tutorials/info_141.html
			 wx.login({
				success:function(res2){
				 //获取 sessionKey
				 wx.request({
					url : 'https://www.slluks.com/index.php/app/member/wechatLogin',
					data: {
						code: res2.code
					},
					success:function(res3){
					 console.log(2222);
					 //记录到本地
					 try{
						uni.setStorageSync('sk', res3.data.session_key);
						uni.setStorageSync('openid', res3.data.openid);
					 }catch(e){
						//TODO handle the exception
					 }
					 uni.hideLoading();
					 //以下步骤可以获取加密信息，需要授权
					 //获取加密信息
					 if(!res1.detail.iv){
						uni.showToast({
						 title:"您取消了授权,登录失败",
						 icon:"none"
						});
						return false;
					 }
					 try{
						var sessionKey = uni.getStorageSync('sk');
						console.log(3333);
					 }catch(e){
						//TODO handle the exception
					 }
					 wx.request({
						method : "POST",
						url : 'https://www.slluks.com/index.php/app/member/wechatRegister',
						header : {'content-type':'application/x-www-form-urlencoded'},
						data : {
						 appid : "wxdfe1b8c60ee623a0",
						 sessionKey : sessionKey,
						 iv : res1.detail.iv,
						 encryptedData : res1.detail.encryptedData
						},
						success:function(res4){
						 console.log(44444);
						 if(res4.data != '-41003'){
							 uni.setStorageSync('uid',res4.data);
							 console.log(res4.data);
							 _this.islogin();
						 }
						}
					 });
					}
				 })
				}
			 });
			}
    },
    onLoad: function (options) {
			this.islogin();
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
	.userinfo{
		width: 100%;
		text-align: center;
		padding: 150rpx 0;
	}
  .userinfo image{
		width: 200rpx;
		border-radius: 30rpx;
	}
	.options{
		border-top: 1px solid #00BFFF;
	}
	.option{
		width: 715rpx;
		padding: 25rpx 0;
		padding-left: 50rpx;
		text-align: center;
		border-bottom: 1px solid #00BFFF;
	}
	.getUserInfo{
		margin-top: 75%;
		transform: translateY(-50%);
		width: 700rpx;
	}
</style>
