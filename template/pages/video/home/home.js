Component({
  properties: {
    videoList: {
      type: Array //作品卡片信息列表
    }
  },
  data: {},
  methods: {
		goToTop: function(e) {
			if (wx.pageScrollTo) {
				wx.pageScrollTo({
					scrollTop: 0
				})
			}else {
				wx.showModal({
					title: '提示',
					content: '版本过低，需升级版本'
				})
			}
		},
    jumpPro(e) {
      this.triggerEvent("is-jumpPro", {
        data: e.currentTarget.dataset.data
      });
    }
  }
})