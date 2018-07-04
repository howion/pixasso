/*!
 * pixasso - v1.0.0 - 2018-07-01
 * https://github.com/howion/pixasso
 *
 * Copyright (c) 2018
 * Licensed under the MIT license */

var pixasso = {
    // COLOR PICK MODE ENUM
    colorPickMode: Object.freeze({
        FirstColor: 0,
        JointColor: 1
        // MiddleColor: 2, // MAYBE LATER
        // DominantColor: 3, // MAYBE LATER
    }),
    determineColor: function(colors, mode) // RGBA STACK -> RGB
    {
        switch(mode)
        {
            case this.colorPickMode.FirstColor:
                return [colors[0], colors[1], colors[2]];

            case this.colorPickMode.JointColor:
                var i,
                    color = [colors[0], colors[1], colors[2]]; // TAKE FIRS PIXEL AS A INIT COLOR

                for (i=4; i < colors.length; i+=4)
                {
                    color[0] = Math.floor((color[0] + colors[i+0]) / 2);
                    color[1] = Math.floor((color[1] + colors[i+1]) / 2);
                    color[2] = Math.floor((color[2] + colors[i+2]) / 2);
                }

                return color;
        }
    },
    createPixelArt: function(img, pixSize, zoom, colorPickMode)
    {
        // CREATE CANVAS
        var icanvas = document.createElement('canvas');

        var w = img.naturalWidth,
            h = img.naturalHeight;

        // INIT CANVAS
        icanvas.width = w;
        icanvas.height = h;

        // PASTE GIVEN IMAGE TO CANVAS
        icanvas.getContext('2d').drawImage(img, 0, 0, w, h);

        // PIXELART CANVAS
        var canvas = document.createElement('canvas');

        canvas.width  = Math.floor(w / pixSize) * zoom;
        canvas.height = Math.floor(h / pixSize) * zoom;

        var x, y, cx, cy,
            ctx = canvas.getContext('2d'),
            ictx = icanvas.getContext('2d'),
            dominant;

        for (x=0, cx=0; x <= w; x += pixSize)
        {
            for (y=0, cy=0; y <= h; y += pixSize)
            {
                dominant = this.determineColor(
                    ictx.getImageData(x, y, pixSize, pixSize).data,
                    colorPickMode
                );

                // CONVERT RGB TO HEX
                ctx.fillStyle= '#' + ((1 << 24) + (dominant[0] << 16) + (dominant[1] << 8) + dominant[2]).toString(16).slice(1);
                ctx.fillRect(cx, cy, zoom, zoom);

                cy += zoom;
            }
            cx += zoom;
        }

        // CONVERT CANVAS TO IMG
        var result = document.createElement('img')
        result.src = canvas.toDataURL();

        // RETURN RESULT
        return result;
    }
};
