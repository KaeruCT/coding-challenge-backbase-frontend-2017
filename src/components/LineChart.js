/*
 * This component renders a simple line chart on a canvas element.
 * A lot of things are hardcoded here but it could
 * be improved a lot and made more configurable (and prettier).
 * It's likely there are some bugs here.
*/

export default {
  restrict: 'E',
  bindings: {
    data: '<',
    prop: '<'
  },
  template: '<canvas/>',
  controller: ['$element', function CanvasController ($element) {
    var canvas;
    var ctx;
    var total;

    this.$onChanges = changes => {
      if (changes.data.isFirstChange()) {
        canvas = $element.find('canvas')[0];
        ctx = canvas.getContext('2d');
        total = this.data.length;
        canvas.width = 290;
        canvas.height = 120;
      }
      var pad = 10;
      var values = this.data.map(d => d[this.prop]);
      var times = this.data.map(d => d.time);
      var min = Math.min.apply(null, values);
      var max = Math.max.apply(null, values);
      var prevx, prevy;

      // basic canvas context setup
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = '10px sans-serif';
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (var i = 0; i < values.length; i++) {
        let val = values[i];

        let xpart = (canvas.width*0.9-pad*2)/values.length
        let x = i*xpart + pad;

        let ybase = -min;
        let yscale = canvas.height*0.8/(max-min);
        let y = canvas.height - (ybase+val)*yscale;

        // render a dot
        ctx.beginPath();
        ctx.arc(x+pad*3, y-pad*2, 2, 0, Math.PI*2);
        ctx.fill();

        if (typeof prevy !== 'undefined') {
          // render the lines that connect the dots
          ctx.beginPath();
          ctx.moveTo(prevx+pad*3, prevy-pad*2);
          ctx.lineTo(x+pad*3, y-pad*2);
          ctx.stroke();
        }

        // y axis label
        if (val === max || val === min) {
          let unit = this.prop === 'temp' ? '°C' : 'm/s';
          ctx.fillText(Math.round(val) + unit, pad*2, y-pad*2);
        }
        // x axis label
        if (i%2 === 1) {
          let time = times[i].split(' ')[1];
          let hour = time.split(':')[0];
          ctx.fillText(hour + ':00', x+pad*2, canvas.height-10);
        }
        prevx = x;
        prevy = y;
      }
    };

  }]
};
