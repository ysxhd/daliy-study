import React, { useEffect } from 'react'
import Canvas from '../../util/canvas/canvas';
import Rectangle from '../../util/canvas/nodeType/rectangle';
import './index.css';
export default () => {
    let canvas, ctx;
    useEffect(() => {
        let dv = document.getElementById('canvas');
        let canvas = new Canvas({
            ele: dv
        });
        let rect1 = new Rectangle(canvas, {
            width: 80,
            height: 30,
            color: '#FF0000'
        });
        let rect2 = new Rectangle(canvas, {
            width: 80,
            height: 20,
            color: '#00FF00'
        });

        rect1.setPosition(0, 80);
        rect2.setPosition(100, 200);
        canvas.addChild(rect1, rect2);
        canvas.paint();
        console.log(333);
    }, [])

    return <div>
        <div className="bigger" id="canvas" />
    </div>
}