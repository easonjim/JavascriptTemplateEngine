# JavascriptTemplateEngine
Javascript最简单的模板引擎
```javascript
/*
使用方法1：
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
/*
使用方法2：
html页面模板：
<script type="text/template" id="template2_info_content">
    <ul>
        <# for ( var i = 0; i < data.length; i++ ) { #>
             <li><a href="<#=data[i].url#>"><#=data[i].title#></a></li>
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
```
