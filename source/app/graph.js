export default class Graph {

    constructor (id) {

      this._id = `#${id}`;

      return this;
    }

    setData (data) {

      this._data = data;

      return this;
    }

    setHistory (history) {

      this._history = history;

      return this;
    }

    setDates (dates) {

      this._rawDates = dates;
      const result = [];

      for (var i in dates) {

        result.push(dates[i].date);

      }

      this._labels = result;

      return this;

    }

    drawData() {

        const _this = this;

        const series = (function(data){

          let result = [];

          for (var i=0; i < data.length; i++) {

            

            result.push({
              color : '#' + _this._map.colors.hex[ data[i].colorIndex ],
              data : (function(data){

                let result = [];

                for (var d in data.dates) {

                  result.push(data.dates[d].length);

                }

                let last = 0;

                let vector = 0;

                for (var i = 0; i < _this._labels.length; i++) {

                  if (i >= 96) {
                    if ( result[i] - result[i-1] > result[i-1] - result[i-2] ) {
                      vector = (result[i] - result[i-1]) - (result[i-1] - result[i-2]);
                    } else if ( result[i] - result[i-1] < result[i-1] - result[i-2] ) {
                      vector = (result[i-1] - result[i-2]) - (result[i] - result[i-1]);
                    }
                  }

                  let prediction = last + i * Math.sin(last) + (vector / 25);
                  result[i] = (i < 96) ? result[i] : (prediction > 0) ? prediction : 0;

                  last = result[i];
                  
                }
                
                return result;

              })(data[i])

            })

          }

          return result;

        })(this._data);

        this._chart = new Chartist.Line(this._id, {
            labels: this._labels,
            series: series
          }, {
            fullWidth: true,
            chartPadding: {
              right: 40
            }
          });

          this._chart.on('created', function() {
              
              const foreignObject = document.querySelectorAll('foreignObject');

              let count = _this._map._minStep;

              for (var f of foreignObject) {

                if (f.firstElementChild.className.includes('ct-horizontal')) {
                  f.classList.add('f-horizontal');
                  f.setAttribute('data-step', count);

                  if (count == _this._map._step) {

                    f.classList.add('f-horizontal_active');

                  }

                  if ( document.querySelector('#history').getAttribute('data-visible') == 'on' ) {
                    for (var i = 0; i < _this._history.length; i++) {

                      if (_this._history[i].dateIndex == count) {

                        if (!f.querySelector('.history-group')) {
                          let historyGroup = document.createElement('div');
                          historyGroup.classList.add('history-group');
                          f.appendChild(historyGroup);
                        } 

                        let historyPoint = document.createElement('div');
                        historyPoint.classList.add('history-point');
                        historyPoint.setAttribute('data-id', _this._history[i].id);
                        historyPoint.setAttribute('title', _this._history[i].className);
                        f.querySelector('.history-group').appendChild(historyPoint);

                      }

                    }
                  }

                  count++
                }

              }

              const horizontal = document.querySelectorAll('.ct-horizontal');

              horizontal[0].classList.add('ct-first');
              horizontal[horizontal.length - 1].classList.add('ct-last');



          });

          this._chart.on('draw', function(e) {

            if (e.series) {

              e.element._node.style.stroke = e.series.color;

            }  

          });  

          document.querySelector('#graph').addEventListener('click', function(e){

              if (e.target.localName == 'div' && e.target.className.includes('history-point')) {

                let id = e.target.getAttribute('data-id');

                for (var m in _this._map._places._layers) {

                  if (_this._map._places._layers[m]._icon.getAttribute('data-id') == id) {

                    _this._map._places._layers[m].openPopup();

                  }

                }

              }
             
              if (e.target.classList.value.includes('f-horizontal')) {

                  let step = e.target.getAttribute('data-step');
                  _this._map.drawData (step);

                  const foreignObject = document.querySelectorAll('.f-horizontal');

                  for (var f of foreignObject) {

                      f.classList.remove('f-horizontal_active');
                      
                  }

                  e.target.classList.add('f-horizontal_active');                  

              }

          })  

          return this;
    }    

    setMap (map) {
      this._map = map;
      this._colors = map.colors;

      return this;
  }

}    