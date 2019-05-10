//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    hasUserInfo: false,
		PageCur: 'index',
    dailyTitle: '',
    dailyCotent: '',
    dailyAuthors: '',
    pomPage: '唐诗',
    pomList: [],
    search: '',
		searchList: [],
		scrollTop: 0,
		pageNumber: 1,
		videoList: []
  },
	NavChange(e){
	  this.setData({
	    PageCur: e.currentTarget.dataset.cur
	  })
	},
  onLoad: function (e) {
    const that = this;
    wx.request({
      url: 'https://api.apiopen.top/recommendPoetry',
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        that.setData({
          dailyTitle: res.data.result.title,
          dailyContent: res.data.result.content,
          dailyAuthors: res.data.result.authors
        })
      }
    })
    wx.request({
      url: 'https://api.apiopen.top/getTangPoetry?page=1',
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        that.setData({
          pomList: res.data.result
        })
      }
    })
		that.getVideo();
  },
  clickSong: function() {
    const that = this;
    that.setData({
      pomPage: '宋词'
    })
    wx.request({
      url: 'https://api.apiopen.top/getSongPoetry?page=' + that.data.pageNumber,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        that.setData({
          pomList: res.data.result
        })
      }
    })
  },
  clickTang: function () {
    const that = this;
    that.setData({
      pomPage: '唐诗'
    })
    wx.request({
      url: 'https://api.apiopen.top/getTangPoetry?page=' + that.data.pageNumber,
      method: 'GET',
      data: {},
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        that.setData({
          pomList: res.data.result
        })
      }
    })
  },
  getInput: function(e) {
    const that = this;
    that.setData({
      search: e.detail.value
    })
  },
	refresh: function() {
		const that = this;
		wx.request({
		  url: 'https://api.apiopen.top/recommendPoetry',
		  method: 'GET',
		  data: {},
		  header: {
		    'content-type': 'application/json'
		  },
		  success(res) {
		    that.setData({
		      dailyTitle: res.data.result.title,
		      dailyContent: res.data.result.content,
		      dailyAuthors: res.data.result.authors
		    })
		  }
		})
	},
	searchPom: function() {
		const that = this;
		wx.request({
		  url: 'https://api.apiopen.top/searchAuthors?name=' + that.data.search,
		  method: 'GET',
		  data: {},
		  header: {
		    'content-type': 'application/json'
		  },
		  success(res) {
				that.setData({
					searchList: JSON.stringify(res.data.result)
				})
				if (JSON.parse(that.data.searchList)[0] == undefined) {
					wx.navigateTo({
						url: "/pages/search-error/search-error"
					})
				}else {
					wx.navigateTo({
						url: "/pages/search/search" + '?list=' + that.data.searchList + '&authorsName=' + that.data.search
					})
				}
		  }
		})
	},
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
	nextPage: function() {
		const that = this;
		that.data.pageNumber++;
		if (that.data.pomPage == '唐诗') {
			wx.request({
			  url: 'https://api.apiopen.top/getTangPoetry?page=' + that.data.pageNumber,
			  method: 'GET',
			  data: {},
			  header: {
			    'content-type': 'application/json'
			  },
			  success(res) {
			    that.setData({
			      pomList: res.data.result
			    })
			  }
			});
		}else {
			wx.request({
			  url: 'https://api.apiopen.top/getSongPoetry?page=' + that.data.pageNumber,
			  method: 'GET',
			  data: {},
			  header: {
			    'content-type': 'application/json'
			  },
			  success(res) {
			    that.setData({
			      pomList: res.data.result
			    })
			  }
			})
		}
	},
	prePage: function() {
		const that = this;
		that.data.pageNumber--;
		if (that.data.pageNumber < 1) {
			wx.showToast({
				title: '到1页了别点了兄dei',
				icon: 'none',
				duration: 2000
			})
		}
		if (that.data.pomPage == '唐诗') {
			wx.request({
			  url: 'https://api.apiopen.top/getTangPoetry?page=' + that.data.pageNumber,
			  method: 'GET',
			  data: {},
			  header: {
			    'content-type': 'application/json'
			  },
			  success(res) {
			    that.setData({
			      pomList: res.data.result
			    })
			  }
			});
		}else {
			wx.request({
			  url: 'https://api.apiopen.top/getSongPoetry?page=' + that.data.pageNumber,
			  method: 'GET',
			  data: {},
			  header: {
			    'content-type': 'application/json'
			  },
			  success(res) {
			    that.setData({
			      pomList: res.data.result
			    })
			  }
			})
		}
	},
	getVideo: function() {
		const that = this;
		wx.request({
		  url: 'https://www.apiopen.top/journalismApi',
		  method: 'GET',
		  data: {},
		  header: {
		    'content-type': 'application/json'
		  },
		  success(res) {
		    that.setData({
		      videoList: res.data.data.tech
		    })
		  }
		})
	}
})
