Page({
  /*初始数据*/
  data: {
    cal_num1:[7,8,9],   //想利用wx:for遍历数组，结果发现按照index分发class太麻烦了……所以还是分成了好几个数组
    cal_num2:[4,5,6],
    cal_num3:[1,2,3],
    cal_fun:['%','/'],
    num:'',             /*数字部分*/
    fun:'',             /*运算符部分*/
    scr:null,           /*结果显示*/
    isClear:true,       /*值是否为空的布尔值*/
  },

  /*定义函数*/
    /*numbut函数*/
    numbut:function(event){
      var num=event.target.dataset.value            //将按钮对应data-value的值赋给num（中间值？）
      if(this.isClear||this.data.num=="0"){         //当值为空/布尔值为true或者num值为0时
        this.setData({num:num});                    //将num（中间值？）的值赋给num（结果值？）
        this.isClear = false;                       //并将布尔值调整为false，表示值不为空
      }
      else{
        this.setData({num:this.data.num+num});      //否则将num(原结果值？)与num（中间值？）的和重新赋给num（结果值？）
      }
    },

    /*funbut函数*/
    funbut:function(event){
    var fun=this.data.fun                           //将fun赋值给fun？？？
    var num=Number(this.data.num)                   //将num字符串变为num数值
    this.setData({fun:event.target.dataset.value})  //将fun对应data-value的值赋给fun
    this.isClear=true;                              //因为现在键入运算符，下一步需要重新输入运算符后的数字，故令布尔值变为true，表示值为空
    if(this.scr==null){                             //当结果显示的值为空时，将num显示在屏幕上
      this.scr=num;
      return;                                       //没试出来是什么作用，也没查到T_T
    }
    if(fun=="+"){                                   //下面是运算部分
      this.scr=this.scr+num
    }
    else if(fun=="-"){
      this.scr=this.scr-num
    }
    else if(fun=="*"){
      this.scr=this.scr*num
    }
    else if(fun=="/"){
      this.scr=this.scr/num
    }
    else if(fun=="%"){
      this.scr=this.scr*0.01                        //源代码是this.scr=this.scr%num，经过测试应该是个bug，我给整好了
    }
    this.setData({num:this.scr});                   //将scr值赋给num
    },

    /*point函数*/
    poi:function(event){
    if(this.isClear){                                           //当布尔值为true时
      this.setData({num:'0.'});                                 //将num值变为0.（字符串形式）
      this.isClear=false;                                       //并将布尔值变为false表示值不为空
    }
    //源代码注释为查找小数点，我认为原理是，indexOf()在字符串中查询'.'并返回index值（字符串），通过this.data.num.将index值（字符串）变为数值并与0作比较。即，一旦原字符串中存在小数点，就会满足条件
    if(this.data.num.indexOf('.')>=0){
      return;                                                   //从此处推测return可能是结束该函数的意思？
    }
    this.setData({num:this.data.num+'.'});                      //在num值（字符串）后加上小数点
    },
    
    /*del函数*/
    del:function(event){
      var num=this.data.num.substr(0,this.data.num.length-1);   //这部分知识盲区比较多，没太搞明白substr的用法以及下面判断的用法
      this.setData({num: num ==''?'0':num});
      },
    
    /*ac函数*/
    ac:function(event){
    this.scr=null,
    this.isClear=false,                                         //AC之后不应该将布尔值变为true表示值为空吗？从下一行代码来看也是如此，但是经调试，此处写为false的话bug更少，不明白为什么
    this.setData({num:'',fun:''});
    },
})