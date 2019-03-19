//index.js
//获取应用实例
const translate = require('../../utils/api.js')
const app = getApp()
Page({
  data: {
    query:'',
    hideClearIcon:true,
    result:[],
    curLang: {
      'chs': '英文',
      'lang': 'en',
      'index': '0'}
  },
  onInput:function(e){
    this.setData({'query':e.detail.value})
    if(e.detail.value.length>0){
      this.setData({'hideClearIcon':false})
    }else{
      this.setData({ 'hideClearIcon': true})
    }
  },
  onTapClose:function(){
    this.setData({query:'',hideClearIcon: true})
  },
  onConfirm:function(){
    if(!this.data.query){
      return
    }else{
      translate(this.data.query, { from: 'auto', to: this.data.curLang.lang }).then(res => {
        this.setData({ 'result': res.trans_result })
    let history = wx.getStorageSync('history') || []
    history.onshift({query:this.data.query,result:res.trans_result[0].dst})
    history.length = history.length >10 ? 10 : history.length
    wx.setStorageSync('history',history)
  }
    )}}
})

