export default class Node {
    constructor(canvas, style = {}) {
        this.canvas = canvas || null;                         // 画布
        this.position = style.position || new Point(0, 0);    // 图元坐标
        this.visible = style.visible || true;                 // 是否显示
        this.rotation = style.rotation || 0;                  // 旋转角度
        this.scaleX = style.scaleX || 1;                      // X方向旋转
        this.scaleY = style.scaleY || 1;                      // Y方向
        this.alpha = style.alpha || 1;                        // 透明度
        this.color = style.color || '#000000';                // 颜色
        this.shadowOffsetX = style.shadowOffsetX || '';       // X方向阴影
        this.shadowOffsetY = style.shadowOffsetY || '';       // Y方向阴影
        this.shadowBlur = style.shadowBlur || '';             // 模糊程度
        this.shadowColor = style.shadowColor || '';           // 阴影颜色
    }

    draw(painter) {
        // Node 绘制函数
    }

    paint() {
        if (this.visible) {
            const { painter } = this.canvas;
            painter.save();
            painter.globalAlpha = this.alpha;
            painter.translate(0, this.scaleY * (this.canvas.height - this.canvas.ratio * this.position.y));
            painter.rotate(this.rotation * Math.PI / 180);
            painter.scale(this.scaleX, this.scaleY);
            this.draw(painter);
            painter.restore();
            config.after && config.after(this, painter);
        }
    }
}
