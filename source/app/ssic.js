import Colors from "./colors.js";

export default class Ssic {
    constructor (){

        this._url = './source/data/ssic.json';
        this.ssic = {};
        this.topSsic = {};
        this._colors = new Colors();
        this._filter = {};
        this._filter.topSsic = [
          {
            name : 'Wholesale trade of a variety of goods without a dominant product',
            value :'46900',
            colorIndex : 336
          },{
            name : 'Retail sale via internet (with income mainly from online sales)',
            value :'47910',
            colorIndex : 524
          },{
            name : 'Development of other software and programming activities n.e.c.',
            value : '62019',
            colorIndex : 150
          },{
            name : 'Other holding companies',
            value : '64202',
            colorIndex : 239
          },{
            name : 'Management consultancy services (general)',
            value : '70201',
            colorIndex : 488
          },{
            name : 'Management consultancy services n.e.c.',
            value : '70209',
            colorIndex : 600
          },{
            name : 'Advertising activities',
            value : '73100',
            colorIndex : 700
          },{
            name : 'Corporate training services and motivational course providers',
            value : '85491',
            colorIndex : 905
          },{
            name : 'Other information technology and computer service activities',
            value : '62090',
            colorIndex : 926
          },{
            name : 'Web portals',
            value : '63120',
            colorIndex : 953
          }
        ];

        this._filter.groups = [
          {
            name : 'Restaurants and cafes',
            value : ['56111', '56112', '56121', '56122', '56123', '56130', '56140', '56201', '56202', '55101'],
            colorIndex : 283
          },
          {
            name : 'Financial and Insurance',
            value : ['64110', '64120', '64130', '64140', '64150', '64160', '64190', '64201', '64202','64300','64910','64921','64922','64923','64924','64925','64929','64991','64992','64993','64994','64995','64999'],
            colorIndex : 542
          },
          {
            name : 'Shipping and shipbuilding',
            value : ['30110','30120','50011','50012','50013','50014','50021','50022','50023','50024'],
            colorIndex : 323
          },
          {
            name : 'Technology company',
            value : ['62011','62012','62013','62014','62021','62022','62023','62090','63111','63112','63119','62019','62090','63120'],
            colorIndex : 764
          }

        ]

        this._filter.section = [
            {
              name : 'Agriculture and Fishing',
              value : ['01','02','03'],
              sign : 'A',
              colorIndex : 45
            },
            {
              name : 'Mining and Quarrying',
              value : ['08','09'],
              sign : 'B',
              colorIndex : 230
            },
            {
              name : 'Manufacturing',
              value : ['10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32'],
              sign : 'C',
              colorIndex : 407
            },
            {
              name : 'Electricity, Gas, Steam and Air-Conditioning Supply',
              value : ['35'],
              sign : 'D',
              colorIndex : 148
            },
            {
              name : 'Water Supply; Sewerage, Waste Management and Remediation Activities',
              value : ['36','37','38'],
              sign : 'E',
              colorIndex : 158
            },
            {
              name : 'Construction',
              value : ['41','42','43'],
              sign : 'F',
              colorIndex : 730
            },
            {
              name : 'Wholesale and Retail Trade',
              value : ['46','47'],
              sign : 'G',
              colorIndex : 813
            },
            {
              name : 'Transportation and Storage',
              value : ['49','50','51','52','53'],
              sign : 'H',
              colorIndex : 323
            },
            {
              name : 'Accommodation and Food Service Activities',
              value : ['55','56'],
              sign : 'I',
              colorIndex : 921
            },
            {
              name : 'Information and Communications',
              value : ['58','59','60','61','62','63'],
              sign : 'J',
              colorIndex : 1000
            },
            {
              name : 'Financial and Insurance Activities',
              value : ['64','65','66'],
              sign : 'K',
              colorIndex : 624
            },
            {
              name : 'Real Estate Activities',
              value : ['68'],
              sign : 'L',
              colorIndex : 757
            },
            {
              name : 'Professional, Scientific and Technical Activities',
              value : ['69','70','71','72','73','74','75'],
              sign : 'M',
              colorIndex : 158
            },
            {
              name : 'Administrative and Support Service Activities',
              value : ['77','78','79','80','81','82'],
              sign : 'N',
              colorIndex : 514
            },
            {
              name : 'Public Administration and Defence',
              value : ['84'],
              sign : 'O',
              colorIndex : 538
            },
            {
              name : 'Education',
              value : ['85'],
              sign : 'P',
              colorIndex : 538
            },
            {
              name : 'Health and Social Services',
              value : ['86','87','88'],
              sign : 'Q',
              colorIndex : 560
            },
            {
              name : 'Arts, Entertainment and Recreation',
              value : ['90','91','92','93'],
              sign : 'R',
              colorIndex : 921
            },
            {
              name : 'Other Service Activities',
              value : ['94','95','96'],
              sign : 'S',
              colorIndex : 573
            },
            {
              name : 'Activities of Households as Employers of Domestic Personnel',
              value : ['97'],
              sign : 'T',
              colorIndex : 596
            },
            {
              name : 'Activities of Extra-Territorial Organisations and Bodies',
              value : ['99'],
              sign : 'U',
              colorIndex : 1000
            }

        ]

        const _this = this

        this._dataRequest = function(url, callback) {
    
            if (window.fetch){
              fetch(url)
              .then(response => response.text())
              .then(function(data) {

                callback(JSON.parse(data));

              });
              
            } else {
              $.ajax({
              type: 'GET',
              url: url,
              dataType: 'text',
              success: function (data) {
                  
                callback(JSON.parse(data));  

                }
              });
            }
            
        }

        return this;

    }  
    
    load (callback) {

        const _this = this;

        this._dataRequest(this._url, function(data){  


            for (var i = 0; i < data.length; i++){

                data[i].id = new Number(data[i].code) + 0;

                //colors
                data[i].color = {
                  top : {},
                  section : {},
                  group : {},
                  simple : {
                    arr : (i <= _this._colors.arrRGB.length) ? _this._colors.arrRGB[i] : _this._colors.arrRGB[i - _this._colors.arrRGB.length],
                    heh : (i <= _this._colors.hex.length) ? _this._colors.hex[i] : _this._colors.hex[i - _this._colors.hex.length]
                  }
                  
                };

                //collect top ssic number
                for (var t=0; t < _this._filter.topSsic.length;t++){

                    if (_this._filter.topSsic[t].value == data[i].code){

                      data[i].color.top = {    
                          arr : _this._colors.arrRGB[_this._filter.topSsic[t].colorIndex],
                          hex : '#' + _this._colors.hex[_this._filter.topSsic[t].colorIndex]
                      }  

                        _this.topSsic[data[i].id] = data[i];

                    }
                }

                //set industrial section type
                for (var s = 0; s < _this._filter.section.length; s++ ) {

                  for (var n = 0; n < _this._filter.section[s].value.length; n++) {

                    let code = _this._filter.section[s].value[n];

                    if ( data[i].code[0] == code[0] && data[i].code[1] == code[1] ) {

                      data[i].section = _this._filter.section[s].name;
                      data[i].color.section = {
                        arr : _this._colors.arrRGB[_this._filter.section[s].colorIndex],
                        hex : '#' + _this._colors.hex[_this._filter.section[s].colorIndex]
                      }

                    } 

                  }  

                }

                //set industrial groups 
                for (var g = 0; g < _this._filter.groups.length; g++ ){

                  for (var n = 0; n < _this._filter.groups[g].value.length; n++) {

                    let code = _this._filter.groups[g].value[n];

                    if ( data[i].code == code ) {

                      data[i].group = _this._filter.groups[g].name;
                      data[i].color.group = {
                        arr : _this._colors.arrRGB[_this._filter.groups[g].colorIndex],
                        hex : '#' + _this._colors.hex[_this._filter.groups[g].colorIndex]
                      }
                    }  

                  } 

                }

                _this.ssic[data[i].id] = data[i];

            }

            if (callback) callback(_this.data);

        });

        return this;

    }
}    