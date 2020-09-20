/**
* 矩形类 定义实现
*/
import Node from '../node';
export default class Rectangle extends Node {
    constructor(canvas, style) {
        super(canvas, style);
        this.width = style.width || 0;
        this.height = style.height || 0;
    }

    setSize(width, height) {
        this.width = width;
        this.height = height || this.height;
    }
    /**
    * 主要实现的绘制函数
    */
    draw(painter) {
        painter.fillStyle = this.color;
        painter.fillRect(this.position.x, this.position.y - this.height, this.width, this.height);
    }
}
