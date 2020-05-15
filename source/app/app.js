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
    zoom: (app.browser.isMobile == 'mobile') ? 10 : 12,
    controls: true
});

document.querySelector('#run').addEventListener('click', function(){

    document.querySelector('#intro').classList.add('intro_hide');
    document.querySelector('#app').classList.remove('state_intro');

    setTimeout(function(){
        document.querySelector('#intro').remove();  
        runapp();
    },500)
    

});

function runapp(){

  

app.data.load(function(dataset, dates, codes, history){

    let onboardingContainer = document.querySelector('#onboarding');

    onboardingContainer.innerHTML = `
    <div class="onboarding__screen" id="obording_1">
        <div class="onboarding__popup">
            <p>Animation tour will show what happened in Singapore and in the world between 1920 and 2020</p>
            <div class="button" id="start-animation">Take a tour</div>
            <div class="button button_ghost" id="skip-animation">Skip</div>
        </div>
    </div>`;

    

    onboardingContainer.addEventListener('click', function(e){

        if (e.target.id == 'start-animation') {

            onboardingContainer.innerHTML = '';

            document.querySelector('.leaflet-control-play').click();


        }

        if (e.target.id == 'skip-animation') {

            onboardingContainer.innerHTML = '';


        }

    });


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
            control : 'checkbox',
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
            control : 'checkbox',
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
            control : 'checkbox',
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

    app.sidebar.setSsic(app.ssic).setFilter(app.filter).setData(dataset).create(defaultQuery);

    app.filter.setMap(app.map).setGraph(app.graph);

    app.graph.setMap(app.map).setDates(dates).setHistory(history);
    
    app.map.setSsic(app.ssic).setGraph(app.graph);

    app.map.setData(dataset, codes, dates, history);

    app.filter.setData(dataset, codes, dates).setQuery(defaultQuery);

    if (app.browser.isMobile != 'mobile') app.map._map.setZoom(11)


});

}

window.app = app;

})();

