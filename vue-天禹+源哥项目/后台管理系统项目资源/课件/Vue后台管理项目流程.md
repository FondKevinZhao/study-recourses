# Vue后台管理项目流程

## 一.准备工作

### 资源地址:

- 后台登录帐号:admin
- 后台登录密码:111111
- 基础版:https://github.com/PanJiaChen/vue-admin-template
- 加强版:https://github.com/PanJiaChen/vue-element-admin
- 后台权限API:http://39.98.123.211:8170/swagger-ui.html#!/index45controller/loginUsingPOST
- 后台商品API:http://39.98.123.211:8216/swagger-ui.html#!/2183021697SKU2550921475/updateSkuInfoUsingPOST

### 1.下载模版项目

1. 在github上下载panjiacheng的vue-admin-template后台管理系统模版
2. 下载依赖npm i

### 2.项目准备工作,对模版文件进行修改

1. #### 修改登录界面背景图

   1. 创建static文件夹,内部创建images文件夹
   2. 将背景图片放入文件夹内
   3. 在src->views->login->根元素下添加背景图相关样式

2. #### 删除多余文件,修改部分文件

   1. src->views文件夹
      1. 保留login,dashboard,404三个页面,其余删除
      2. login页面用户登录校验规则进行修改
   2. src->router->index.js文件
      1. 删除文件中多余路由,仅保留与1中相关路由信息
   3. src->api文件夹清空(只保留user.js)
   4. src->utils->request.js文件
      1. 超时时间可以根据需求进行修改
      2. 将请求拦截器中,在响应头中添加属性的属性名进行修改(原先添加'X-Token',改为'token')
      3. 将响应拦截器中,检测响应状态码是否成功条件进行补充(多添加一个res.code!==200)
   5. vue.config.js文件
      1. 禁用mock数据
         1. 将devServer配置项中的before属性注释掉
         2. 声明代理转发规则(proxy)
   6. src->api->user.js
      1. 将内部所有请求地址切换成接口文档中的真实地址
   7. src->store->user.js
      1. 重写action函数-login
         1. 将.then替换成async和await语法
   8. src->layout->components->Navbar.vue
      1. 删除点击导航栏的用户头像弹出的操作列表中,多余的选项
   9. src->styles->index.scss
      1. 将样式中最后一行的.app-container类名改为.app-main

### 3.配置路由相关内容

1. 在views文件夹中,创建所需要的四个组件(trademark,attr,spu,sku)
2. src->router.js
   1. 将创建的四个组件,注册到routes数组内部,并配置好相关meta中的属性
   2. 此处可以仿照routes数组中的"/"路由书写
3. 修改顶部导航栏中的错误显示
   1. 问题:当前处于商品管理模块,但是面包屑组件前缀还是首页的"dashboard"英文
   2. 解决:前往src->components->Breadcrumb->index.vue中,搜索"if (!this.isDashboard(first))",将内部的title属性值,从"Dashboard"改为"首页"

## 二.品牌管理模块

### 1.模块静态效果

1. 创建添加按钮
   1. 使用组件名:el-button
   2. 添加标签属性icon,内容为"el-icon-plus"
2. 创建表格
   1. 使用组件名:el-table(代表整个表格)和el-table-column(代表表格的每一列)
   2. 将动态显示列表相关属性删除
      1. el-table标签上的data标签属性删除
      2. el-table-column标签上的prop标签属性删除
   3. 修改每项el-table-column标签的label属性,值为当前列标题名称
   4. 对序号列对应的el-table-column标签属性进行修改
      1. width设置为80
      2. align设置为center
      3. type设置为"index"
   5. 给整个表格添加表框,给el-table标签添加标签属性border
3. 创建分页器
   1. 使用组件名:el-pagination
   2. 将动态显示列表相关属性删除
      1. size-change和current-change标签属性删除
   3. 控制分页器内部模块显示
      1. 控制显示顺序,修改为layout="prev, pager, next, jumper,->, sizes,total"
      2. 控制显示总数,修改为total="100"
      3. 控制模块居中,添加style="text-align:center"

### 2.模块动态展示效果

1. 在api->product中创建文件,并声明接口函数
2. 在api->index.js中引入所有请求接口文件,并同意暴露
3. 在main.js中引入所有接口,并保存在Vue的原型对象上,方便后续调用
4. 声明tradeMark组件所需的组件状态
   1. page->当前展示的页面所在页数
   2. limit->当前展示的内容条数
   3. total->当前列表所具有的内容总数
   4. tradeMarkList->当前展示内容组成的列表数组
5. 调用定义好的接口函数,发送请求,获取数据
6. 修改el-table和el-table-column组件
   1. el-table组件添加data属性,属性值为tradeMarkList
   2. el-table-column组件添加prop属性,根据当前请求回来的数据,prop的属性值为遍历内容的对应属性名
   3. 给操作列添加两个操作按钮
      1. 通过插槽像当前组件内部传递需要渲染的节点
   4. 问题:品牌logo显示的内容是图片的链接,而不是图片
      1. 解决:使用作用域插槽解决,在el-table-column组件内部写上template,内部书写img标签,给template标签添加slot-scope="{row,$index}"来获取到对应列的遍历结果,最后写在img标签的src中用于展示
7. 修改el-pagination组件
   1. 将page,limit,total等数据实现动态显示
   2. 监视用户的点击切换显示页操作
      1. 绑定事件current-change,回调函数内部发送请求获取页面最新数据
   3. 监视用户的点击切换每页显示条数操作
      1. 绑定事件size-change,回调函数内部发送请求获取页面最新数据

### 3.添加品牌静态效果

1. 在ElementUI官网找到Dialog组件(该组件可以实现弹窗交互效果)
2. 将Dialog组件案例中的嵌套表单Dialog案例复制template结构,并对其进行修改
   1. 该组件需要用到的状态
      1. dialogFormVisible->用于控制dialog的显示隐藏
      2. tmForm->用于搜集品牌表单内部的所有数据
   2. 修改部分组件属性
      1. el-dialog标签
         1. title="添加商品"
         2. style="width: 80%"
      2. el-form-item标签
         1. label="品牌名称"
         2. label-width="100px"
      3. el-input标签
         1. v-model="tmForm.tmName"
3. 在品牌名称对应的el-form-item标签之后,新增一个el-form-item标签,修改属性如上
4. 在新增el-form-item标签内部添加,Upload组件(该组件用于实现上传图片功能)
   1. 该组件需要用到的状态
      1. imageUrl->暂未无用数据
   2. 在el-upload标签内部新增节点div用于显示文本提示信息
   3. 将Upload组件案例中所需的函数,复制到项目的methods中

### 4.上传品牌LOGO功能

1. 将el-upload标签的action属性修改为项目真实地址
   1. 地址:/dev-api/admin/product/fileUpload
2. 将el-upload标签中,img标签的src属性和v-if指令进行修改
   1. 准备工作:在data的tmForm对象中,新增logoUrl属性
   2. :src="tmForm.logoUrl"
   3. v-if="tmForm.logoUrl"
3. 修改method中的对应的方法
   1. beforeAvatarUpload->该函数用于上传图片之前,对图片格式和大小进行校验
      1. 扩展可上传的图片类型
   2. handleAvatarSuccess->该函数将会在图片上传请求成功之后执行
      1. 在该函数内部,将返回响应中的data存储至tmForm.logoUrl中,用于动态展示(res.data是上传之后,该图片的网络资源地址)

### 5.添加或者修改品牌信息功能交互

1. 问题:当前添加品牌组件可以收集到用户填写的信息,但是当用户关闭该组件,再次打开,会残留上次的品牌名称和品牌LOGO
   1. 解决:当打开该组件的时候,可以清空该组件的展示数据
2. 修改品牌信息功能
   1. 给编辑按钮添加click事件监听,用于监听用户点击"编辑"按钮操作
      1. 注意:该功能与添加按钮功能相似,都是控制dialog组件显示,所以可以封装为一个函数,区别点击编辑按钮时候需要传入当前行的数据,可通过作用域插槽中的row获得当前行数据
   2. 将dialog组件中用于控制显示和收集数据的状态对象tmForm修改为通过形参传入的当前行数据
      1. 注意:如果是添加功能,tmForm需要按照5.1的效果进行清空
3. ,当用户点击dialog组件中的确定时,将添加或者修改收集到的最终数据,发送请求给服务器
   1. 给dialog组件的确定绑定click事件监听
   2. 将添加或者修改收集到的最终数据,发送请求给服务器
   3. 请求成功之后,弹出message组件提示用户(此处区分添加成功和修改成功)
   4. 请求并展示最新的品牌列表数据
      1. 如果是添加品牌成功,默认展示第一页数据
      2. 如果是修改品牌成功,默认展示当前页数据

### 6.删除品牌功能

1. 当用户点击删除按钮,弹出提示框询问用户是否删除,当用户点击确定删除,发送请求删除商品
   1. 给删除按钮绑定click事件监听
   2. 在click事件回调函数内部调用方法弹出询问窗口(参考MessageBox组件)
   3. 当用户点击确认删除按钮(如果用户点击确认会触发MessageBox中的then的第一个回调函数)
   4. 发送请求删除商品
   5. 请求最新列表数据进行展示
      1. 如果当前品牌列表在删除该品牌之前
         1. 长度大于1,请求当前页数据
         2. 长度等于1,请求上一页数据

### 7.对添加的Dialog组件进行前台表单验证

1. 表单校验的三个时间点

   1. 当input内容发生修改的时候(类似change事件)
   2. 当input失去焦点的时候(类似blur事件)
   3. 当用户点击提交数据时候,进行统一校验(通过手动调用函数进行校验)

2. 添加验证规则流程

   1. 在当前组件data中添加rules对象(属性名对应表单需要校验的属性名,属性值类型为Object[],数组内的每个对象是一条校验规则)

      1. ```javascript
         	rules: {
                 tmName: [
                   { required: true, message: "请输入活动名称", trigger: "blur" },
                   { min: 3, max: 5, message: "品牌名称长度必须在3到5之间", trigger: "blur" },
                 ],
                 logoUrl: [
                   { required: true, message: "请选择需要上传的LOGO图片", trigger: "change" },
                 ],
               },
         ```

   2. 将规则使用到表单当中

      1. 在el-form标签上添加标签属性:rules="rules"
      2. 给每项el-form-item标签添加标签属性prop="tmName"(属性值对应7.1.1中rules的属性名)

3. 自定义校验规则

   1. 声明一个函数,用作之后作为校验函数使用

      1. ```
         const validateTmName = (rule,value,callback) =>{
           //value代表当前使用该校验规则的输入框的value值
           //callback是一个函数,如果传入实参给该函数,代表校验失败,如果没有传入实参,代表校验成功
           if(value.length<2||value.length>10){
             callback(new Error("品牌名称长度必须大于2,小于10"))
           }else{
             callback();
           }
         }
         ```

   2. 将该函数作为校验规则使用(例如rules.tmName中的第二条校验规则)

      1. ```javascript
         	rules: {
                 tmName: [
                   { required: true, message: "请输入活动名称", trigger: "blur" },
                   { validator: validateTmName, trigger: "blur" },
                 ],
                 logoUrl: [
                   { required: true, message: "请选择需要上传的LOGO图片", trigger: "change" },
                 ],
               }
         ```

   3. 在用户提交时候进行校验(在用户点击确定的时候,执行以下代码,可以实现统一校验功能)

      1. ```javascript
         	this.$refs.tmForm.validate(async (valid) => {
                   if (valid) {
                   	//校验成功之后的代码写在该处
                   } else {
                     //校验失败之后的代码写在该处
                     return false;
                   }
                 });
         ```


## 三.属性管理模块

### 1.准备工作

1. 声明所需要使用的接口函数
   1. 根据三级分类的id请求所对应的属性列表
   2. 根据属性id删除对应的属性
   3. 传递所需要的数据对某项属性进行新增或者修改
   4. 根据属性id获取对应的属性列表

### 2.三级分类组件实现

1. 三级分类组件静态效果
   1. 由于在多个组件中都使用到了三级分类组件,所以需要将该组件进行抽取
   2. 在components文件夹中创建组件CategorySelector
   3. 在main.js中对该组件进行全局注册
   4. CategorySelector组件内部结构参考Form表单案例中的行内表单
2. 三级分类组件动态展示及其交互
   1. 声明三级分类组件所需要的接口函数
      1. 请求获取一级分类列表
      2. 通过一级分类的id获取二级分类列表
      3. 通过二级分类的id获取三级分类列表
   2. 分别给三个el-select标签绑定change事件监听,用于监视用户对三个分类框的修改
   3. 当组件mounted的时候,调用接口获取一级分类列表,并根据请求返回的数组动态生成el-option标签
   4. 在一级分类的change事件回调中,获取当前选中的一级分类id,并发送请求获取二级分类列表,动态生成二级分类的el-option标签
   5. 在二级分类的change事件回调中,获取当前选中的二级分类id,并发送请求获取三级分类列表,动态生成三级分类的el-option标签
   6. 问题:当用户切换一级分类的选项时,二级和三级分类选择框的展示数据没有清空
      1. 当用户切换分类的时候,对后续级别的分类选择框的值进行初始化情况
         1. 清空后续级别分类对应的categoryId
         2. 清空后续级别分类对应的categoryList
3. 三级分类组件与父组件之间的通信
   1. 三级分类组件只负责获取并向父组件提供用户选择的三级分类数据,不负责请求对应的属性列表
   2. 通信流程:
      1. 父组件与methods中定义回调函数(以下统称changeCategory),声明形参用于接收三级分类组件传递的数据
      2. 父组件给三级分类组件绑定自定义事件,事件名称:'changeCategory',回调函数:changeCategory
      3. 当三级分类组件触发一级/二级/三级分类的change事件时,需要在之前交互的基础上新增代码
         1. 新增内容:调用父节点给当前组件绑定的自定义事件changeCategory,并将当前正在改变的分类id和分类级别level,生成对象通过自定义事件的实参传递给父组件
      4. 父组件接收到子组件传递的分类信息,根据分类信息中的分类级别指定不同代码
         1. 如果level为1或者2,只需清空父组件中记录的后续分类的id以及属性列表数组attrList
         2. 如果level为3,首先获取当前的三级分类的所有id,发送请求获取对应的属性列表数组,并进行页面展示

### 3.属性列表实现

1. 属性列表静态页面
   1. 其中需要使用到的组件
      1. el-button用于显示添加属性按钮
      2. el-table用于显示属性列表
      3. el-tag用于显示属性值列表内的每项
      4. el-tooltip和el-button组合用于显示操作中的按钮及其提示功能
2. 属性列表动态展示
   1. 属性列表数据存放于attrList状态中,列表显示通过el-table组件配合el-table-column组件实现动态展示
   2. 第一个el-table-column负责显示当前的序号
   3. 第二个el-table-column负责显示当前的属性名称
      1. 通过将标签属性prop配置为attrName可以展示当前的属性名称
   4. 第三个el-table-column负责显示当前的属性值列表
      1. 问题:由于attrValueList属性值是数组类型,如果prop直接写attrValueList,会显示很多的undefined,无法正确显示
      2. 解决:我们需要进行展示内容的自定义操作
         1. 在当前el-table-column组件内部传入template模版,通过给模版添加slot-scope={row},可以获得到当前遍历对象的数据
         2. 在template内部通过对row.attrValueList数组进行遍历,产生多个el-tag标签,进行便签的显示
   5. 第四个el-table-column负责显示当前行的相关操作按钮
      1. 通过封装el-tooltip和el-button组件,实现具有提示效果的按钮组件

### 4.添加/修改属性实现

1. 添加/修改属性静态效果
   1. 其中需要使用到的组件
      1. el-form用于收集用户输入的属性名
      2. el-button用于响应用户添加或者取消操作
      3. el-table用于展示当前对应的属性值列表
   2. 注意:该功能结构与3中的属性列表为同级,两者为互斥关系(一个显示一个隐藏)
2. 添加属性动态效果及其交互
   1. 给**属性列表**中的添加属性按钮绑定click事件监听,监视用户点击操作
   2. 当用户触发1中的事件回调函数,将添加属性模块进行展示,属性列表模块隐藏(通过isShowList状态控制)
   3. 通过对属性名表单添加指令v-model,用于收集用户输入的属性名
   4. 给**添加属性模块**的添加属性按钮绑定click事件监听,监视用户添加属性操作
      1. 当用户触发4中的回调函数,就往用于负责**属性值列表**的状态attrForm.attrValueList数组中,添加一个对象,用于生成table列表中的一条记录
   5. 通过给属性值名称对应el-table-column标签内部插入template标签,在标签上添加slot-scope="{row}",可以得到对应行的数据对象
   6. 在template中添加el-input标签,通过v-model="row.valueName",动态收集用户新增的属性值名称
   7. 在操作对应el-table-column标签内部插入template标签,在标签内部添加HintButton组件,并给该组件绑定click事件监听
      1. 当用户点击该删除按钮时,将attrForm.attrValueList数组中,对应的行对象从数组中移除
   8. 给添加属性模块中的两个取消按钮都添加click事件监听,当用户点击取消按钮,切换回**属性列表**,隐藏**添加属性模块**
   9. 问题:当以上流程结束之后,会出现第二次点击**属性列表**中的添加属性按钮,显示的**添加属性模块**中还具有上次的数据
      1. 解决思路:在每次点击添加属性按钮的时候,清空**添加属性模块**中上次的数据
3. 修改属性交互效果
   1. 给属性列表中的编辑按钮添加click事件监听
   2. 当用户点击编辑按钮,展示添加属性模块,并将当前行的信息传入this.attrForm,用于动态展示
      1. 注意:此处由于出现多层对象数据类型嵌套,必须使用深拷贝,否则会对属性列表页面产生影响(可以使用lodash的cloneDeep方法)
4. 属性值列表输入框编辑/展示模式切换
   1. 需求:
      1. 如果是新添加的属性,属性值名称应该显示为编辑模式(el-input标签)
      2. 如果是修改已存在的属性,属性值名称应该是显示为展示模式(span标签)
      3. 当用户点击某个处于展示模式的属性值名称时,切换为编辑模式
   2. 实现:
      1. 对之前交互代码进行修改
         1. 当用户点击**添加属性模块**中的添加属性按钮时,对新添加的属性值对象,新增一个标识属性isEdit:true,用来识别进入哪种模式
         2. 当用户点击修改按钮时,除了之前所做的对this.attrForm数据进行深拷贝,还需要给this.attrForm.attrValueList中每个对象添加响应式属性isEdit,初始值为false
      2. 修改table组件中属性值名称一栏的template内容
         1. 对el-input标签进行修改(所谓的编辑模式)
            1. 添加v-if属性,根据当前行数据中的isEdit,判断是编辑模式还是展示模式
            2. 绑定blur事件监听,用于监视input框失去焦点
               1. 当input框失去焦点自动切换回展示模式
            3. 绑定keyup.enter.native事件监听,用于监视原生键盘按下回车操作
               1. 当用户按下回车按钮,自动切换回展示模式
         2. 新增span标签用于展示当前属性值名称(所谓的展示模式)
            1. 添加v-else属性,用来切换模式
            2. 绑定click事件监听,用于监视用户点击属性值名称操作
               1. 当用户点击属性值名称,自动切换为编辑模式
5. 对编辑/展示模式切换进行优化
   1. 问题:用户输入的属性值数据可能已经存在或者属性值数据可能为空
      2. 思路:如果用户输入的属性值数据已经存在或者属性值数据为空,弹窗提示用户,并不自动退出编辑模式
   2. 问题:用户进入编辑模式时,输入框不会自动获取焦点
      1. 思路:
         1. 给el-input添加ref属性用于寻找到对应的input框
         2. 当用户点击展示模式内容时,找到对应的输入框,调用输入框组件的focus方法,使其获取焦点
            1. 注意:由于用户切换为编辑模式时,会修改isEdit属性,为了保证能获取到输入框的DOM节点,必须将focus方法调用写在$nextTick方法内部

### 5.删除属性值实现

1. 在原先的HintButton组件的外层嵌套组件el-popconfirm,用于弹出气泡选择框,询问用户是否删除
2. 给el-popconfirm组件绑定**onConfirm**事件(**官网写的confirm事件是错误的**),用于响应用户的确认删除操作
3. 在事件回调中,将attrForm.attrValueList数组中,当前的这一项数据弹出该数组

### 6.保存属性功能实现

1. 需求:当用户点击保存属性按钮,需要将attrForm对象发送给服务器,进行真实保存,之后请求最新列表数据刷新列表
   1. 思路:
      1. 给保存按钮绑定click事件监听
      2. 处理attrForm中的attrValueList数组
         1. 需要将当前数组中所有属性值名称为空的对象去除
         2. 如果当前数组为空,不发送请求,并弹窗提示用户
         3. 如果当前**属性名**为空,不发送请求,并弹窗提示用户
         4. 将对象中无用的属性isEdit去除,减小数据体量
      3. 将准备好的attrForm通过接口API发送给服务器,实现属性的保存功能
      4. 当请求成功之后,弹窗提示用户,并重新请求最新的列表数据

### 7.删除属性功能实现

1. 静态方面
   1. 在delete对应的HintButton组件外部,嵌套el-popconfirm组件,实现气泡弹窗的按钮
2. 交互方面
   1. 给el-popconfirm组件添加onConfirm事件监听,如果用户点击确定删除会触发该回调函数
      1. 通过绑定事件回调函数时,将当前行的属性对象传如回调函数内部
   2. 当用户确定删除该属性,从形参接收的对象中,读取id属性,并调用接口API请求服务器删除该属性
   3. 当请求成功之后,弹窗提示用户,并重新请求最新的列表数据

## 四.SPU管理模块

### 1.准备工作

1. 根据开发文档声明所有SPU模块相关的接口API
2. 熟悉在属性模块中封装的三级分类组件的三级联动功能

### 2.模块静态样式

1. SPU模块静态样式分为上下两个el-card
   1. 上el-card存放三级分类组件
   2. 下el-card共存放三个页面
      1. SPU列表展示页面
         1. el-button
         2. el-table
         3. HintButton
         4. el-pagination
      2. 添加/修改SPU信息页面->SpuForm组件
      3. 添加/查看SKU信息页面->SkuForm组件

### 3.模块动态展示效果

1. 通过给三级分类组件绑定自定义事件changeCategory,并传入回调函数,可以从回调函数的形参中获取到正在变化的对应的分类ID和分类级别
2. 将三级分类组件返回的分类ID在data保存,并进行对应处理
   1. 如果是一级ID,就清空状态中的category2Id和category3Id
   2. 如果是二级ID,就清空状态中的category3Id
   3. 如果是三级ID,就通过当前状态中存储的page,limit,category3Id发送请求,获取到SPU列表展示信息,存入spuList状态中
3. 将spuList通过标签属性data交给el-table组件,并修改对应的el-table-column的标签属性prop,实现列表的动态展示
4. 声明方法handleSizeChange和方法handleCurrentChange,分别用于监视用户对分页器组件的**切换每页显示个数**和**切换显示页**的操作
   1. 当方法触发时,更新对应的page和limit状态,并发送请求获取最新的spuList数据,并用于动态展示

### 4.SpuForm组件实现

1. SpuForm组件静态样式

   1. SPU模块静态样式使用el-form组件实现,其中分为5个el-form-item区域
   2. 使用到的组件:
      1. el-input
      2. el-select和el-option
      3. el-upload
      4. el-table
      5. el-button

2. SpuForm组件显示隐藏状态切换

   1. 在Spu组件中,声明状态isShowSpuForm,如果该状态为true就显示SpuForm组件,反之不显示
      1. 当用户点击添加SPU按钮或者点击修改SPU按钮时候,需要修改该状态,使得组件显示出来
   2. 当用户点击SpuForm组件内部的取消按钮时,需要将SpuForm组件进行隐藏
      1. Spu组件使用.sync关键字将isShowSpuForm状态传递给SpuForm组件,当用户点击取消按钮,触发自定义函数update:visible,将父组件的isShowSpuForm状态改为false

3. SpuForm组件交互

   1. SpuForm组件需要用到的四个请求:

      1. 更新SPU信息需要发送4个请求

         ​     1.获取SPU详细信息(在**spu**的api模块中声明)

         ​     GET /admin/product/getSpuById/{spuId}

         

         ​     2.获取SPU所有图片的列表信息(在**sku**的api模块中声明)

         ​     GET /admin/product/spuImageList/{spuId}

         

         ​     3.获取所有的销售属性信息(在**spu**的api模块中声明)

         ​     GET /admin/product/baseSaleAttrList

         

         ​     4.获取所有的品牌信息(在**trademark**的api模块中声明)

         ​     GET /admin/product/baseTrademark/getTrademarkList

   2. 如果用户点击添加Spu按钮进入该组件

      1. 需要发送3,4请求,用户获取所有的销售属性和品牌信息

   3. 如果用户点击修改Spu按钮进入该组件

      1. 需要发送1,2,3,4请求,通过1请求,可以获取到当前Spu的详细信息,直接将SpuForm组件中的状态SpuForm直接覆盖

4. SpuForm组件动态展示难点

   1. Spu图片墙展示
      1. 使用ElementUI中的upLoad照片墙案例实现
      2. 需要给el-upload组件添加file-list标签属性,同时向该属性内部传入用于显示的图片数组
      3. 注意:该数组中的每个对象都**必须要有属性名name和url**,否则只能遍历出多个空的img,但是无法显示图片
   2. Spu销售属性相关展示
      1. table表格展示
         1. 该表格展示的是当前spuForm中的spuSaleAttrList属性列表(展示当前Spu已具有的属性)
         2. 此处难点在于
            1. 数据结构复杂,请多加注意
            2. 由于每个属性值名称列表内内容,可以动态添加,所以最后的添加按钮具有输入框编辑模式和按钮展示模式两种
               1. 需要给当前行对应的属性对象添加inputVisible属性,用于切换两种模式
      2. select下拉框交互
         1. 该下拉框用于展示所有当前spuForm没有的属性列表(说明:所有属性列表baseSaleAttrList和spuForm具有的属性列表spuSaleAttrList,没有同时存在的属性)
         2. 该处的数据需要使用计算属性,通过baseSaleAttrList和spuForm.spuSaleAttrList两个数组进行过滤得到
      3. button添加属性按钮交互
         1. 该按钮用于将select组件选中的属性添加到当前spuForm的spuSaleAttrList列表中
         2. 将当前的属性对象插入到spuForm的spuSaleAttrList数组中即可(后续上传之前再做数据格式处理)
            1. 此处会根据select组件选中的结果,生成全新的对象
         3. 注意:
            1. 当插入之后,需要把select组件的值清空
            2. 如果select组件中没有值,就禁用当前按钮,防止添加空对象
      4. Spu图片墙上传/删除交互
         1. 删除功能,只需要在on-remove的回调函数中,将该函数的**第二个形参**的值赋值给this.spuImageList即可
         2. 上传功能
            1. 将el-upload组件的action属性修改为真实地址(参考trademark组件)
            2. 添加一个上传成功的回调on-success,在回调函数中将**第三个形参**的值赋值给this.spuImageList即可
            3. 注意:到目前为止,这么做只能用于展示,新上传的图片的对象数据格式不对,后续还需要再次处理
      5. Spu**属性值添加**交互
         1. 当用户点击属性值名称列表中的添加按钮时,给当前行对象row通过$set设置响应式属性inputVisible为true,使其进入输入框编辑模式(el-input显示出来)
         2. 由于el-input组件使用的是v-model收集用户输入数据,所以当用户输入数据时,会自动将输入的数据收集到row的inputValue属性中
         3. 当输入框失去焦点或者用户按下回车按钮,将执行事件回调函数,进行属性值的新增操作
            1. 将当前的输入框编辑模式切换为按钮展示模式
            2. 如果当前用户并没有输入数据,弹窗提示用户添加失败
            3. 如果当前row身上的属性值列表数组(row.spuSaleAttrValueList)中,已存在相同名称的属性值,弹窗提示用户添加失败
            4. 如果以上情况都没出现,创建一个全新的对象,对象中**需要拥有saleAttrValueName和baseSaleAttrId属性**即可,将该对象插入到row的spuSaleAttrValueList数组中
            5. 清空row.inputValue的值,防止旧数据残留
      6. Spu**属性值删除**交互
         1. 给e-tag组件绑定close事件监听,在绑定回调函数时,向回调函数内部,传入当前行对象row和当前e-tag的下标index
         2. 当用户点击"x"按钮进行删除属性值时,在回调函数中通过之前传入的两个实参,从row.spuSaleAttrValueList数组中找到对应的对象,将其从数组中移除
      7. Spu**属性删除**交互
         1. 给HintButton组件绑定click事件监听,在绑定回调函数时,向回调函数内部,传入当前行的下标index
         2. 当用户点击删除按钮进行删除属性时,在回调函数中通过之前传入的下标index,从spuForm.spuSaleAttrList找到对应的对象,将其从数组中移除
   3. Spu保存功能实现
      1. 需求:当用户点击保存按钮时,发送请求给服务器,当响应成功之后,返回Spu组件,展示最新的Spu列表
      2. 思路:
         1. 当用户点击保存按钮时
            1. 给保存按钮绑定click事件回调函数
         2. 发送请求给服务器
            1. 发送请求之前需要先将请求需要的数据处理好
               1. 将spuImageList状态存入spuForm.spuImageList,存入之前需要将数组内每个对象的格式处理好(每个对象都必须要有imgName和imgUrl)
               2. 将父组件传递下来的category3Id存入spuForm.category3Id
               3. 将spuForm.spuAttrList中每个对象身上多余的inputVisible和inputValue属性去除
            2. 通过接口API将数据发送至服务器
         3. 当响应成功之后,返回Spu组件
            1. 通过.sync绑定的自定义事件update:visible,通知父组件更新isShowSpuForm为false
            2. 注意:在离开SpuForm组件之前,需要将SpuForm组件的data数据恢复初始化状态
         4. 展示最新的Spu列表
            1. 在离开SpuForm组件之前,通过自定义事件success,通知父组件请求最新的SpuList用于展示
            2. 注意:请求最新列表时,需要通过this.flag区分当前需要请求的是列表的第一页还是对应的某一页(添加操作请求第一页,修改操作请求当前页)
   4. Spu删除功能实现
      1. 需求:当用户点击删除按钮并确认删除SPU时,发送请求删除指定的SPU,并请求最新SpuList进行展示
      2. 思路:
         1. 当用户点击删除按钮并确认删除SPU时
            1. 给el-popconfirm组件绑定**onConfirm**事件回调函数,并给回调函数传入当前行对象row
         2. 发送请求删除指定的SPU
            1. 通过形参接收当前行对象row,并调用接口API,传入row.id,删除指定的SPU
         3. 请求最新SpuList进行展示
            1. 调用getSpuList请求最新列表进行展示
            2. 注意:如果当前页只有一个Spu,删除之后当前页会为空,需要请求上一页的Spu

### 5.SkuForm组件实现

1. SkuForm组件静态样式

   1. SkuForm模块静态样式使用el-form组件实现,其中分为9个el-form-item区域
   2. 使用到的组件:
      1. el-input(number,textarea,text)
      2. el-select和el-option
      3. el-table
      4. el-button

2. SkuForm组件显示隐藏状态切换

   1. 与4中的SpuForm同理

3. SkuForm组件交互

   1. SkuForm组件需要用到的三个请求:

      1. 添加SKU信息需要发送3个请求

         ​     1.根据三级分类id获取平台属性列表(在**attr**的api模块中声明)

         ​     GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}

         

         ​     2.根据SpuId获取当前Spu所有的销售属性列表(在**sku**的api模块中声明)

         ​     GET /admin/product/spuSaleAttrList/{spuId}

         

         ​     3.根据SpuId获取当前SPU所有图片的列表信息(在**sku**的api模块中声明)

         ​     GET /admin/product/spuImageList/{spuId}

   2. 如果用户点击添加SKU按钮进入该组件

      1. 需要发送1,2,3请求,用户获取对应的展示数据

4. SkuForm组件动态展示

   1. 此处无难点,细心查看数据结构遍历即可

5. SkuForm组件交互效果(**组件难点**)

   1. 平台属性的数据收集

      1. 由于最终请求时,对每个平台属性的数据结构要求是必须要有attrId(平台属性id)和valueId(平台属性值id),所以我们需要保存这两个数据

      2. 我们将下拉框中,每个选项的这两个值组成字符串(以:号拼接),最终作为每个选项的value值

      3. 并且在每个平台属性对象身上添加专门用于收集数据的属性attrIdValueId,并将用户选中的数值,暂时保存在该属性中

      4. 注意:这是临时存储于对象上,最终发送请求时,会将数据取出的

      5. ```vue
         <el-form :inline="true" label-width="100px">
                   <el-form-item :label="attr.attrName" v-for="attr in attrList" :key="attr.id">
                     <el-select v-model="attr.attrIdValueId" placeholder="请输入">
                       <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`" v-for="attrValue in attr.attrValueList" :key="attrValue.id"> </el-option>
                     </el-select>
                   </el-form-item>
                 </el-form>
         ```

   2. 销售属性的数据收集

      1. 同平台属性数据收集相同,参考1的做法

      2. ```vue
         <el-form :inline="true" label-width="100px">
                   <el-form-item :label="saleAttr.saleAttrName" v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id">
                     <el-select v-model="saleAttr.attrIdValueId" placeholder="请输入">
                       <el-option :label="saleAttrValue.saleAttrValueName" :value="`${saleAttr.id}:${saleAttrValue.id}`" v-for="saleAttrValue in saleAttr.spuSaleAttrValueList" :key="saleAttrValue.id"> </el-option>
                     </el-select>
                   </el-form-item>
                 </el-form>
         ```

   3. 图片列表的数据收集

      1. 图片列表数据分为两个重要数据
         1. 用户选中了哪些图片
         2. 用户将哪张图片作为默认图
      2. 收集思路
         1. 获取用户选中的图片
            1. 给el-table组件绑定**selection-change**事件监听,事件回调函数的形参中可以获取到当前用户选中行对象组成的数组
            2. 将获取到的图片对象数组,临时存储在data的selectedImageList中
         2. 获取用户设置的默认图URL,同时在操作列中显示出来
            1. 当SPU的图片列表请求回来之后,先给数组中的每项都添加isDefault属性,属性值为'0'(代表不是默认)
            2. 当用户点击某行的设为默认按钮时,将当前行对象row传入事件回调函数内部
            3. 在事件回调函数内部,首先将所有图片对象的isDefault重置为'0',然后将当前行对象row的isDefault设置为'1'(代表选为默认)
            4. 将row.imgUrl的值存入this.skuForm.skuDefaultImg中
      
   4. SkuForm组件保存功能

      1. 收集所需要用到的数据

         1. ```js
            const {skuForm,spuForm,attrList,spuSaleAttrList,selectedImageList,category3Id} = this;
            ```

      2. 将数据处理成请求需要的格式

         1. ```js
                  //向skuForm中存入父组件传入的三级分类Id
                  skuForm.category3Id = category3Id;
                  
                  //向skuForm中存入当前Spu的品牌Id
                  skuForm.tmId = spuForm.tmId;
                  
                  //向skuForm中存入当前Spu的id
                  skuForm.spuId = spuForm.id;
                  
                  //处理平台属性列表
                  //skuForm.skuAttrValueList中的每个对象都必须要有attrId(平台属性id)和valueId(平台属性值id)
                  skuForm.skuAttrValueList = attrList.reduce((pre,attr)=>{
                    const attrIdValueId = attr.attrIdValueId;
                    if(attrIdValueId){
                      const [attrId,valueId] = attrIdValueId.split(':');
                      pre.push({
                        attrId,
                        valueId
                      })
                    }
                    return pre;
                  },[])
                  
                  //处理销售属性列表
                  //skuForm.spuSaleAttrList中的每个对象都必须要有saleAttrId(销售属性id)和saleAttrValueId(销售属性值id)
                  skuForm.spuSaleAttrList = spuSaleAttrList.reduce((pre,saleAttr)=>{
                    const attrIdValueId = saleAttr.attrIdValueId;
                    if(attrIdValueId){
                      const [saleAttrId,saleAttrValueId] = attrIdValueId.split(':');
                      pre.push({
                        saleAttrId,
                        saleAttrValueId
                      })
                    }
                    return pre;
                  },[])
                  
                  //处理sku图片列表
                  //skuForm.skuImageList中的每个对象都必须要有imgName(图片名称),imgUrl(图片链接),isDefault(是否是默认展示图),spuImgId(该图片的id)
                  skuForm.skuImageList = selectedImageList.map(({imgName,imgUrl,isDefault,id:spuImgId})=>{
                    return {
                          imgName,
                          imgUrl,
                          isDefault,
                          spuImgId
                        }
                  });
            ```

      3. 发送请求到服务器

         1. 请求接口:  // POST /admin/product/saveSkuInfo
         2. 将2中处理好的skuForm对象作为请求体参数传入,并发送请求

      4. 最终根据情况弹窗提示,显示Spu组件

         1. 如果请求添加成功
            1. 弹窗提示用户添加成功
            2. 通过自定义事件update:visible,通知父组件隐藏skuForm组件
            3. 重置skuForm内部的data状态
         2. 如果请求添加失败
            1. 弹窗提示用户添加失败

### 6.查看Sku列表功能实现

1. 思路:
   1. 在SPU组件中,新增el-dialog(此处参看elementUi中的嵌套表格的dialog案例)
   2. 给查看SKU列表按钮绑定click事件监听,并在传入回调函数的时候,将当前行对象row传入回调函数中
   3. 在回调函数中,调用请求接口,根据row.id去获取当前Spu下所有的sku组成的列表数组
   4. 请求成功之后
      1. 将el-dialog组件通过状态控制其显示
      2. 将row.spuName保存至状态中,用于dialog中标题的显示
      3. 将获取到的skuList数组,更新到状态中,并状态传递给dialog组件中的table表格进行展示

## 五.SKU管理模块

​	该模块作为自主练习模块

## 六.首页模块

1. 复制成型的首页替换我们的首页
2. 安装echarts@4 和 v-charts  还有vue-count-to
3. 复制和echarts v-charts相关的配置文件 
   1. plugins文件夹  里面是引入注册使用v-charts
   2. 复制4个svg图片
4. 数据可视化
   1. 使用通俗易懂直观的图表将不直观的数据展示出来
5. echarts的基本使用(根据官方教程)
6. 重新使用echarts封装项目的linechart组件
7. v-charts组件的使用
8. mixin当中的resize混入文件实现响应式

