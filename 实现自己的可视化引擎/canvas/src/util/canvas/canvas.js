export default class Canvas {
    constructor(config) {
        if (config.ele === undefined) {
            throw new Error('Not found config of canvas element');
        }
        // canvas 标签的容器标签
        this.container = config.ele;
        // 设置canvas width属性与样式width 的比率
        this.ratio = config.ratio || 2;
        // 创建 canvas 标签
        this.canvas = document.createElement('canvas');
        // 图元数组
        this.childs = [];
        this.init();
    }

    /**
    * 重新定义Canvas的大小
    */
    repaint() {
        this.container.innerHTML = '';
        this.canvas = document.createElement('canvas');
        this.init();
    }

    /**
    * 初始化Canvas系数
    */
    init() {
        // 获取容器的样式
        const styles = getComputedStyle(this.container, null);
        // 容器的宽
        const width = parseInt(styles.width);
        // 容器的高
        const height = parseInt(styles.height);
        // 设置canvas的样式宽
        this.canvas.style.width = `${width}px`;
        // 设置canvas的样式高
        this.canvas.style.height = `${height}px`;
        // 根据比率设置相应的属性宽高
        this.canvas.width = this.ratio * width; //设置缩放比
        this.canvas.height = this.ratio * height;
        // 去除点击选中样式
        this.canvas.style.outline = 'none';
        this.canvas.onclick = (e) => { this.canvas.focus(); };
        this.container.appendChild(this.canvas);
        // 设置画笔属性
        this.painter = this.canvas.getContext('2d');
    }

    addChild() {
        for (const i in arguments) {
            if (arguments[i] instanceof Node) {
                if (this.childs.indexOf(arguments[i]) === -1) {
                    arguments[i].canvas = this;
                    this.childs.push(arguments[i]);
                    if (arguments[i] instanceof Layer) {
                        arguments[i].build();
                    }
                }
            }
        }
    }

    removeChild() {
        for (const i in arguments) {
            if (arguments[i] instanceof Node) {
                if (this.childs.indexOf(arguments[i]) !== -1) {
                    arguments[i].canvas = this;
                    this.childs.splice(this.childs.indexOf(arguments[i]), 1);
                }
            }
        }
    }

    paint() {
        this.painter.clearRect(0, 0, this.width, this.height);
        for (let i = 0; i < this.childs.length; i++) {
            this.childs[i].paint();
        }
    }
}
