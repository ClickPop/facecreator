function resizeCanvas(canvas,newWidth,newHeight) {
    var tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = newWidth;
    tmpCanvas.height = newHeight;

    var ctx = tmpCanvas.getContext('2d');
    ctx.drawImage(canvas,0,0,canvas.width,canvas.height,0,0,newWidth,newHeight);

    return tmpCanvas;
}
