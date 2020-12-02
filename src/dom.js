window.dom ={
    //新增
    create (string) {
        const container = document.createElement("template");
        //string.trim()很关键，如果不去trim,就会创建一个text文本原始
        container.innerHTML = string;
        return container.content.firstChild;
    },
    //新增弟弟
    after (node, node2) {
        node.parentNode.insertBefore(node2,node.nextSibling);
    },
    //新增哥哥
    before (node, node2) {
        node.parentNode.insertBefore(node2,node);
    },
    //新增子元素
    append (parent, node) {
        parent.appendChild(node);
    },
    //新增父级元素
    wrap (node, parent){
        dom.before(node,parent);
        dom.append(parent,node);
    },
    //删除节点
    remove (node) {
        node.parentNode.removeChild(node);
        return node;
    },
    //删除节点后代
    empty (node) {
        const array = [];
        let x = node.firstChild;
        while(x){
            array.push(dom.remove(node.firstChild));
            x = node.firstChild;
        }
        return array;
    },
    //修改或者获取属性 用到重载
    attr (node, name, value) {
        if(arguments.length === 3){
            node.setAttribute(name, value);
        }else if(arguments.length === 2){
            return node.getAttribute(name);
        }
    },
    //读写文本 用到适配
    text (node, string) {
        if(arguments.length === 2){
            if('innerText' in node){
                node.innerText = string;
            }else{
                node.textContent = string;
            }
        }else if(arguments.length === 1){
            if('innerText' in node){
                return node.innerText;
            }else{
                return node.textContent;
            }
        }
    },
    //读写html内容
    html (node, string) {
        if(arguments.length === 2){
            node.innerHTML = string;
        }else if(arguments.length === 1){
            return node.innerHTML;
        }
    },
    //修改style
    style (node, name, value) {
        if(arguments.length === 3){
          //dom.style(div,'color','red');
          node.style[name] = value;
        }else if(arguments.length === 2){
            if( typeof name === "string" ){
                //dom.style(div,'color');
                return node.style[name];
            }else if(name instanceof Object){
                //dom.style(div,{color:'red'})
                const object = name;
                for(let key in object){
                    node.style[key] = object[key];
                }
            }
        }
    },
    //用于添加class
    class:{
        add(node, className){
            node.classList.add(className);
        },
        remove(node, className){
            node.classList.remove(className);
        },
        //注意classList没有has方法，用contains
        has(node, className){
            node.classList.contains(className);
        }
    },
    //绑定事件
    on (node, eventName, fn) {
        node.addEventListener(eventName, fn);
    },
    //解绑事件
    off (node, eventName, fn){
        node.removeEventListener(eventName, fn);
    },
    //用于获取标签或者标签们
    find (selector, scope){
        return (scope || document).querySelectorAll(selector);
    },
    //用于获取父元素
    parent (node) {
        return node.parentNode;
    },
    //用于获取子元素
    children (node) {
        return node.children;
    },
    //用于获取兄弟姐妹元素 
    siblings (node) {
        return Array.from(node.parentNode.children).filter(n=>n!==node);
    },
    //用于获取弟弟
    next (node) {
        let x = node.nextSibling;
        while(x && x.nodeType === 3){
            x = x.nextSibling;
        }
        return x;
    },
    //用于获取哥哥
    previous (node) {
        let x = node.previousSibling;
        while(x && x.nodeType === 3){
            x = x.previousSibling;
        }
        return x;
    },
    //遍历
    each (nodeList, fn) {
        for(let i = 0; i < nodeList.length; i++){
            fn.call(null, nodeList[i]);
        }
    },
    //用于获取排行老几
    index (node) {
        const list = dom.children(node.parentNode);
        let i;
        for(i = 0; i < list.length; i++){
            if(list[i] === node){
                break;
            }
        }
        return i;
    }
}