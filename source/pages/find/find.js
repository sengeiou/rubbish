// pages/content/content.js
import {
  AppBase
} from "../../appbase";
import {
  ApiConfig
} from "../../apis/apiconfig";
import {
  InstApi
} from "../../apis/inst.api.js";
import {
  LajiApi
} from "../../apis/laji.api.js";

class Content extends AppBase {
  constructor() {
    super();
  }
  onLoad(options) {
    this.Base.Page = this;
    //options.id=5;
    super.onLoad(options);
  }
  onMyShow() {
    var that = this;

  }
  setPageTitle() {
    wx.setNavigationBarTitle({
      title: '垃圾分类查找',
    });
  }

  bindcha(e) {
    var that = this;
    var lajiapi = new LajiApi();
    console.log(e);
    //return
      
    var name = e.detail.value
    this.Base.setMyData({ name})
    if (name != undefined && name != "") {
      lajiapi.lajisousuo({
        name
      }, (check) => {
         
        if (check.length==0)
        {
          this.Base.setMyData({
            check: check,
            meisoudao:true,
            weitijiao:true
          });
        }
        else{

          this.Base.setMyData({
            check: check,
            meisoudao: false

          });
        }

       
        console.log(check)
      });

    } else {
      this.Base.setMyData({
        check: []
        //给它一个空的数组
      });
    }
  }

  bindquxiao() {
    wx.navigateBack({

    })
  }
  tijiao(){
   var instapi=new InstApi();
    instapi.queshi({name:this.Base.getMyData().name},(res)=>{

      this.Base.setMyData({ weitijiao: false })

    })
   
  }
}
var content = new Content();
var body = content.generateBodyJson();
body.onLoad = content.onLoad;
body.onMyShow = content.onMyShow;
body.bindquxiao = content.bindquxiao; 
body.bindcha = content.bindcha;
body.tijiao = content.tijiao;
Page(body)