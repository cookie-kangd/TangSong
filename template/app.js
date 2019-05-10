//app.js
App({
	onLaunch: function() {
		wx.getSystemInfo({
			success: e => {
				this.globalData.StatusBar = e.statusBarHeight;
				let custom = wx.getMenuButtonBoundingClientRect();
				this.globalData.Custom = custom;
				this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
			}
		})

		// 登录
		wx.login({
			success: res => {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
			}
		})
		wx.getSetting({
		  success: res => {
		    if (res.authSetting['scope.userInfo']) {
		      // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
		      this.getUserInfo();
		    } else {
		      this.globalData.getUserInfo = 'fail';
		      if (this.userInfoReadyCallback) {
		        this.userInfoReadyCallback();
		      }
		    }
		  }
		})
		// 获取系统状态栏信息
		wx.getSystemInfo({
			success: e => {
				this.globalData.StatusBar = e.statusBarHeight;
				let custom = wx.getMenuButtonBoundingClientRect();
				this.globalData.Custom = custom;
				this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight + 10;
			}
		})
	},
	globalData: {
		userInfo: null
	}
})
