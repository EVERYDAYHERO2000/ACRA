export default class Filter {

    constructor () {
        return this;
    }    

    setData (data, codes, dates) {

        this._codes = codes;
        this._dates = dates;

        return this;
    }

    setMap (map) {

        this._map = map;

        return this;
    }

    setGraph (graph) {

        this._graph = graph;

        return this;
    }

    prepareQuery(query) {

        this._query = query;

        for (var q = 0; q < query.length; q++) {

            query[q].id = q;

            if (typeof query[q].value == 'object') {

                for (var i = 0; i < query[q].value.length; i++) {

                    query[q].value[i].id = i;

                    query[q].value[i].visible = (query[q].value[i].visible) ? query[q].value[i].visible :  query[q].visible;

                    query[q].value[i].hint = (function(value){

                        return (value.length > 1) ? ( (''+value[0])[1] == (''+value[value.length - 1])[1] ) ? (''+value[0])[0] + (''+value[0])[1] + '…' : (''+value[0])[0] + (''+value[0])[1] + '–' + (''+value[value.length-1])[0] + (''+value[value.length-1])[1] : value[0]

                    })(query[q].value[i].value);

                    

                }

            }

        }

        return this;
    }

    queryToArr(query) {

        let result = [];
        let max = 20;
  
        for (var i = 0; i < query.length; i++) {
  
            if (query[i].visible) {
  
                if (query[i].type == 'item') {
  
                        if (typeof query[i].value == 'object') {
  
                            let maxLength = (query[i].value.length <= max) ? query[i].value.length : max;
                            let group = [];
  
                            for (var i2 = 0; i2 < maxLength; i2++) {
  
                                group.push(query[i].value[i2]);
  
                            }
  
                            result.push({
                              group : group,
                              colorIndex : query[i].colorIndex,
                              dates : {}
                            })
  
                        }
  
                } else {
  
                    for (var i2 = 0; i2 < query[i].value.length; i2++) {
  
                        if (query[i].value[i2].visible) {

                            let maxLength = (query[i].value[i2].value.length <= max) ? query[i].value[i2].value.length : max;
                            let group = [];
  
                            for (var i3 = 0; i3 < maxLength; i3++ ) {
    
                                group.push(query[i].value[i2].value[i3]);
    
                            }
  
                            result.push({
                            group : group,
                            colorIndex : query[i].value[i2].colorIndex,
                            dates : {}
                            })

                        }
  
                    }
  
                }
  
            }
  
        }
  
        return result;
    }

    setQuery (query, callback) {

        query = query || this._query;

        this.query = this.queryToArr(query);

        if (this.query){

            //reset visible = false
            for (var code in this._codes) {

                this._codes[code].visible = false;

            }    
           
            //set visible if match by query
            for (var q = 0; q < this.query.length; q++) {

                this.query[q].dates = JSON.parse(JSON.stringify(this._dates));

                for (var g = 0; g < this.query[q].group.length; g++ ) {

                    let searchCode = this.query[q].group[g];

                    for (var code in this._codes) {

                       if ( searchCode == code ) {
                           this._codes[code].visible = true;

                           this._codes[code].colorIndex = this.query[q].colorIndex;

                           for (var d in this._codes[code].dates) {

                            this.query[q].dates[d].length += this._codes[code].dates[d].length;         

                           }

                       }    
                          
                    }

                }

            }
        
        }


        this._graph.setData(this.query).drawData();
        this._map.drawData();
    
        if (callback) callback (this.query);

        return this;
    }

}    