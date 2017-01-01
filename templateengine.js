//第一代模板引擎
//只支持{{key}}的替换，不支持语句
//支持Object和Array对象
function template_setdata(template, data) {                
    try {
        if (!!data && '[object Array]' == Object.prototype.toString.call(data)) {//数组    
            var out = '';
            for (var obj in data) {    
                var tempout = template;
                for (var key in data[obj]) {
                    tempout = tempout.replace(/\{\{(\S+)\}\}/g,
                        function (m, i, j) {
                            return (data[obj])[i];
                        });
                }
                out += tempout;
            }
            return out;
        }
        else if(!!data && '[object Object]' == Object.prototype.toString.call(data)){//对象        
            for (var key in data) {
                template = template.replace(/\{\{(\S+)\}\}/g,
                    function (m, i, j) {
                        return data[i];
                    });
            }                        
            return template;
        }
        else{//不做处理
            return template;                        
        }
    } catch (e) {
        console.log(e);
        return template;
    } 
}
/*
使用方法：
html页面的模板：
<script type="text/template" id="template_info_content">
    <section class="m_article m_list_item m_list_article clearfix">
        <a href="{{url}}">
            <div class="m_article_img">
                <img src="{{img}}" onerror="$(this).attr('src',$ViewBag.ThemeContent+'img/article/article_img1.jpg');">
            </div>
            <div class="m_article_info">
                <div class="m_article_title">
                    <span>{{title}}</span>
                </div>
                <div class="m_article_desc clearfix">
                    <div class="m_article_desc_l">
                        <span class="m_article_channel">{{classname}}</span>
                        <span class="m_article_time">{{time}}</span>
                    </div>
                    <div class="m_article_desc_r">
                        <div class="left_hands_desc">
                            <span class="read_icon"></span>{{pv}}
                        </div>
                    </div>
                </div>
            </div>
        </a>
    </section>
</script>
替换语句：
var setdata = {
        img: '图片',
        url: '地址',
        title: '标题',
        classname: '类别名',
        time: '时间',
        pv: '点击数'
    };
var outhtml = template_setdata($('#template_info_content').html(),setdata);
console.log('单对象'+outhtml);
var setdatas =[{
        img: '图片1',
        url: '地址1',
        title: '标题1',
        classname: '类别名1',
        time: '时间1',
        pv: '点击数1'
    },{
        img: '图片2',
        url: '地址2',
        title: '标题2',
        classname: '类别名2',
        time: '时间2',
        pv: '点击数2'
    }];
var outhtml2 = template_setdata($('#template_info_content').html(),setdatas);
console.log('数组'+outhtml2);
 * */

//第二代模板引擎
//支持语句，不支持key的替换，全部采用对象进行赋值
function template2_setdata(template, data) {    
    var html=template;
    /*
         <#=xxx#> 	=> ');p.push(xxx);p.push('
         <# 		=> ');
         #> 		=> p.push('
     * */
    var result="var p=[];with(obj){ p.push('"//加入with设置作用域
    +html.replace(/[\r\n\t]/g," ")//换行去掉
    .replace(/<#=(.*?)#>/g,"');p.push($1);p.push('")//<#=xxx#> => ');p.push(xxx);p.push('
    .replace(/<#/g,"');")//<# => ');    
    .replace(/#>/g,"p.push('")//#> => p.push('
    +" ');}return p.join('');";//最后连接成一条字符串返回
    var func = new Function('obj',result);//设置Function
    return func(setdatas);
}
/*
使用方法：
html页面模板：
<script type="text/template" id="template2_info_content">
    <ul>
        <# for ( var i = 0; i < setdatas.length; i++ ) { #>
             <li><a href="<#=setdatas[i].url#>"><#=setdatas[i].title#></a></li>
        <# } #>
    </ul>
</script>
替换语句：
var setdatas =[{
        img: '图片1',
        url: '地址1',
        title: '标题1',
        classname: '类别名1',
        time: '时间1',
        pv: '点击数1'
    },{
        img: '图片2',
        url: '地址2',
        title: '标题2',
        classname: '类别名2',
        time: '时间2',
        pv: '点击数2'
    }];
var outhtml3 = template2_setdata($('#template2_info_content').html(),setdatas);
console.log(outhtml3);
 * */