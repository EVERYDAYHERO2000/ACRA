import Loader from "./loader.js";

export default class DataSet {

    constructor (url){

        this._url = url;
        this._loader = new Loader();

        const _this = this;
        

        this._dataRequest = function(url, callback) {
    
            if (window.fetch){
              fetch(url)
              .then(response => response.json())
              .then(function(data) {

                callback(data);

              });
              
            } else {
              $.ajax({
              type: 'GET',
              url: url,
              dataType: 'json',
              success: function (data) {
                  
                callback(data);  

                }
              });
            }
            
        }
 
    }

    getDates (data) {

        const minDate = 1887;
        const maxDate = 2020;
        const minCount = 0;

        let count = minCount;

        const dateTemp = {}

        for (var i = minDate; i <= maxDate; i++) {
           if (count >= 33){

            dateTemp[count] = {
              date : i, 
              dateIndex : count,
              length : 0
            };
           }
           count++;
        }  
        
        return dateTemp;

    }

    load (callback) {

        const _this = this;

        this._loader.start();

        this.codes = {};

        const temp = [];

        this._dataRequest(this._url, function(data){

            _this.dates = _this.getDates(data);  

            for (var i = 0; i < data.length; i++) {

              temp[i] = [ data[i][0], [] ]

              for (var i2 = 0; i2 < data[i][1].length; i2++ ) {

                if (!temp[i][1][i2]) temp[i][1][i2] = [ data[i][1][i2][0], [] ];

                for (var i3 = 0; i3 < data[i][1][i2][1].length; i3++) {

                  let code = ((data[i][1][i2][1][i3] + '').length < 5) ? '0' + data[i][1][i2][1][i3] : '' + data[i][1][i2][1][i3];

                  if ( !_this.codes[ code ] ) _this.codes[ code ] = { 
                    dates : JSON.parse(JSON.stringify(_this.dates)), 
                    code : code,
                    colorIndex: 1,
                    visible : false 
                  };

                  _this.codes[ code ].dates[ data[i][1][i2][0] ].length++

                  temp[i][1][i2][1].push(_this.codes[ code ])

                }


              }    

            }

            _this._loader.finish();    

            _this.data = temp;

            callback(temp, _this.dates, _this.codes);

        });

        

    }

}    