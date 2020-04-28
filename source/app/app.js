import Map from "./map.js";
import Graph from "./graph.js";
import DataSet from "./dataSet.js";
import Browser from "./browser.js";
import Sidebar from "./sidebar.js";
import Ssic from "./ssic.js";
import Filter from "./filter.js";
import setWindowHeight from "./window-heiaght.js";

(function(){
setWindowHeight();

const app = {
    map : new Map('map'),
    browser : new Browser(),
    data : new DataSet('./source/data/data-new.json'),
    sidebar : new Sidebar('sidebar'),
    graph : new Graph('graph'),
    ssic : new Ssic().load(),
    filter : new Filter()
}

app.map.create({
    lat: 1.358556385,
    lon: 103.795598745,
    zoom: 12,
    controls: true
});

app.data.load(function(dataset, dates, codes){

    let defaultQuery = [
        {
            type : 'item',
            title: 'History',
            control : 'checkbox',
            value : 'history',
            visible : true
        },
        {
            type : 'group',
            title : 'Favourites SSIC',
            visible : true,
            open : true,
            control : 'radio',
            value : (function(ssic){

                let filter = ssic._filter.groups;
                let result = [];

                for (var i = 0; i < filter.length; i++) {

                    result.push({
                        type : 'item',
                        control : 'checkbox',
                        title : filter[i].name,
                        value : filter[i].value,
                        colorIndex : filter[i].colorIndex
                    });

                }

                return result;

            })(app.ssic)
        },
        {
            type : 'group',
            title : 'Most popular SSIC',
            visible : false,
            control : 'radio',
            value : (function(ssic){

                let filter = ssic._filter.topSsic;
                let result = [];

                for (var i = 0; i < filter.length; i++) {

                    result.push({
                        type: 'item',
                        title : filter[i].name, 
                        control : 'checkbox',
                        value : [filter[i].value],
                        colorIndex : filter[i].colorIndex
                    });

                }

                return result;

            })(app.ssic)
        },
        {
            type : 'group',
            title : 'Manufacturing',
            visible : false,
            control : 'radio',
            value : (function(ssic){

                let filter = ssic._filter.section;
                let result = [];

                for (var i = 0; i < filter.length; i++) {

                    let numbers = [];

                    for (var s in ssic.ssic ) {

                        if (filter[i].name == ssic.ssic[s].section ) {
                            numbers.push(ssic.ssic[s].code);
                        }

                    }

                    result.push({
                        type: 'item',
                        control : 'checkbox',
                        title : filter[i].name,
                        value : numbers,
                        colorIndex : filter[i].colorIndex
                    });

                }

                return result;

            })(app.ssic)
        }
    ];

    app.filter.prepareQuery(defaultQuery);    

    app.sidebar.setFilter(app.filter).setData(dataset).create(defaultQuery);

    app.filter.setMap(app.map).setGraph(app.graph);

    app.graph.setMap(app.map).setDates(dates);
    
    app.map.setSsic(app.ssic).setGraph(app.graph);

    app.map.setData(dataset, codes, dates);

    app.filter.setData(dataset, codes, dates).setQuery(defaultQuery);


});

window.app = app;

})();

