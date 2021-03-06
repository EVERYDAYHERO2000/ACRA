
import Shader from "./shader.js";
import Colors from "./colors.js";
import Browser from "./browser.js";
import Loader from "./loader.js";
import MapSvg from "./map-svg.js";
import searchCompany from "./search-company.js";

export default class Map {

    constructor(id){

        this._id = id;
        this._container = document.getElementById(id);
        this._data = null;
        this._rawData = null;

        this._loader = new Loader();

        const browser = new Browser();
        const format = (browser.browserName == 'chrome') ? 'webp' : 'png';

        this._tileUrl = `https://{s}.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}@2x.${format}?access_token=pk.eyJ1IjoiZ2xlYWZsZXQiLCJhIjoiY2lxdWxoODl0MDA0M2h4bTNlZ2I1Z3gycyJ9.vrEWCC2nwsGfAYKZ7c4HZA`;
        this._ssic = [];
        this._animationTimer = null;

        this.colors = new Colors();
    }

    setSidebar (sidebar) {

        this._sidebar = sidebar;

        return this;
    }

    create (options) {

        const _this = this

        this._options = options;

        this._map = L.map(this._id,{
            attributionControl: false
        });

        this._companySearchResult = [];

        L.control.attribution({
            position: 'bottomleft'
        }).addTo(this._map);

        this._tileLayer = L.tileLayer(this._tileUrl,{ 
            attribution: '<a target="_blank" href="https://osome.com/">osome</a> | &copy; <a target="_blank" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | About <a target="_blank" href="https://www.singstat.gov.sg/standards/standards-and-classifications/ssic">SSIC</a> | <a target="_blank" href="https://osome.com/sg/ssic-code-search-tool/">Free SSIC Code Search</a>',
            maxZoom: 16,
            minZoom: 9
        });
        this._canvasOverlay = L.canvasOverlay();

        this._map.setView([options.lat, options.lon], options.zoom);
        this._tileLayer.addTo(this._map);
        this._canvasOverlay.addTo(this._map);
        this._canvas = this._canvasOverlay.canvas();

        this._gl = this._canvas.getContext('experimental-webgl', { antialias: true });
        this._pixelsToWebGLMatrix = new Float32Array(16);
        this._mapMatrix = new Float32Array(16);

        const controlsContainer = document.querySelector('.leaflet-control-zoom a:last-child');
        
        /* search company */

        this._company = L.layerGroup().addTo(this._map);

        this._searchCompany = new searchCompany();

        const serchButtonTpl = `<a class="leaflet-control-search" href="#" title="Find Company" role="button" aria-label="Search"><span></span></a>`
        const onboardingContainer = document.querySelector('#onboarding');

        controlsContainer.insertAdjacentHTML('afterend', serchButtonTpl);
        this._searchButton = document.body.getElementsByClassName('leaflet-control-search')[0]
        this._searchButton.addEventListener("click", function(){
            
            onboardingContainer.innerHTML = `
            <div class="onboarding__screen" id="obording_1">
                <div class="onboarding__popup">
                    <p>Enter the company name or UEN to display it and company's SSIC on the map</p>
                    <div class="company-search">
                        <div class="company-search__line">
                            <input type="text" id="search" placeholder="Company name or UEN" /><div id="searchbtn">Search</div>
                        </div>
                        <div class="company-search__suggest">
                        </div>
                    </div>
                    <div class="button button_ghost" id="close">Cancel</div>
                </div>
            </div>`

            document.querySelector('#sidebar').classList.add('visible');

        });
        
        onboardingContainer.addEventListener('click',function(e){
            
            if (e.target.id == 'show-company') {

                _this._sidebar.hideAllItems();

                _this._sidebar.removeAllUserFilters();

                _this._sidebar.addUserFilter("46900") 
                _this._sidebar.addUserFilter("46901")    
                
                document.querySelector('#sidebar').classList.remove('visible');

                onboardingContainer.innerHTML = '';

            }

            if (e.target.id == 'searchbtn') {

                let value = document.querySelector('#search').value
                findCompany(value);

            }    

            if (e.target.className == 'suggest__item') {

                let target = e.target.className;

                let uen = (target) ? e.target.getAttribute('data-uen') : null;
                let name = (target) ? e.target.getAttribute('data-name') : null;
                let id = (target) ? e.target.getAttribute('data-id') : null;

                let company = _this._companySearchResult[id];

                if (uen) {

                    let suggest = document.querySelector('.company-search__suggest');
                    suggest.innerHTML = '';

                    _this._searchCompany.requestSSIC(name,uen, function(d1){

                        if (d1.length){

                            for (let k in d1[0]) _this._companySearchResult[id][k] = d1[0][k];
            
                        }

                        _this._searchCompany.requestGEO(_this._companySearchResult[id].street_name, _this._companySearchResult[id].block, function(d2){

                            if (d2.length) {
            
                                for (let k in d2[0]) {

                                    _this._companySearchResult[id][k] = d2[0][k];

                                }

                                _this._sidebar.hideAllItems();

                                _this._sidebar.removeAllUserFilters();

                                
                                

                                let descriptionParts = {
                                    name : _this._companySearchResult[id].entity_name,
                                    uen : `<div>UEN: <b>${_this._companySearchResult[id].uen}</b></div>`,
                                    description : (_this._companySearchResult[id].company_type_description && _this._companySearchResult[id].company_type_description != 'na') ? `<div>${_this._companySearchResult[id].company_type_description}</div>` : '',
                                    ssic_1 : (_this._companySearchResult[id].primary_ssic_code && _this._companySearchResult[id].primary_ssic_code != 'na') ? `<div class="ssic_1">Primary SSIC: <b>${_this._companySearchResult[id].primary_ssic_code}</b></div>` : '',
                                    ssic_1_d : (_this._companySearchResult[id].primary_ssic_description && _this._companySearchResult[id].primary_ssic_description != 'na') ? `<div>${_this._companySearchResult[id].primary_ssic_description}</div>` : '',
                                    ssic_2 : (_this._companySearchResult[id].secondary_ssic_code && _this._companySearchResult[id].secondary_ssic_code != 'na') ? `<div class="ssic_2">Secondary SSIC: <b>${_this._companySearchResult[id].secondary_ssic_code}</b></div>` : '',
                                    ssic_2_d : (_this._companySearchResult[id].secondary_ssic_description && _this._companySearchResult[id].secondary_ssic_description != 'na') ? `<div>${_this._companySearchResult[id].secondary_ssic_description}</div>` : '',
                                }    

                                let description = `
                                <h3>${descriptionParts.name}</h3>
                                ${descriptionParts.uen}
                                ${descriptionParts.description}
                                <br>
                                ${descriptionParts.ssic_1}
                                ${descriptionParts.ssic_1_d}
                                <br>
                                ${descriptionParts.ssic_2}
                                ${descriptionParts.ssic_2_d}`;


                                let point = (_this._companySearchResult[id].lat && _this._companySearchResult[id].lon) ?  [+_this._companySearchResult[id].lat, +_this._companySearchResult[id].lon] : [1.358556385,103.795598745];

                                _this._company.clearLayers();

                                let marker = new L.Marker(point, {
                                    icon: new L.DivIcon({
                                        className: 'company-marker',
                                        html: '<div class="company-marker__inner"></div>'
                                    })
                                }).bindPopup(`${description}`).addTo(_this._company);


                                setTimeout(function(){
                                    
                                    _this._map.setView(point, 13);
                                    onboardingContainer.innerHTML = '';

                                },500);    

                                setTimeout(function(){

                                    if (_this._companySearchResult[id].primary_ssic_code && _this._companySearchResult[id].primary_ssic_code != 'na') _this._sidebar.addUserFilter(_this._companySearchResult[id].primary_ssic_code+'',542); 
                                    if (_this._companySearchResult[id].secondary_ssic_code && _this._companySearchResult[id].secondary_ssic_code != 'na') _this._sidebar.addUserFilter(_this._companySearchResult[id].secondary_ssic_code+'',764);   

                                },800);    

                                setTimeout(function(){

                                    document.querySelector('#sidebar').classList.remove('visible');

                                },1500)

                                console.log( _this._companySearchResult[id])
                                
                            }

                        })    

                    })    

                }    
            }    

        })

        onboardingContainer.addEventListener('keyup',function(e){

            if (e.keyCode == 13) {

                let value = document.querySelector('#search').value
                findCompany(value);

            }

        });    

        function findCompany (value) {
            

            let suggest = document.querySelector('.company-search__suggest');
            suggest.innerHTML = `<div class="spinner"><div class="spinner__inner"></div></div>`;

            _this._searchCompany.requestUEN(value, function(d){

                if (d.length) {

                    
                    let suggestResult = '';

                    for (let el in d) {

                        if (d[el].reg_street_name && d[el].reg_street_name !== 'na') suggestResult += `<div class="suggest__item" data-id="${el}" data-uen="${d[el].uen}" data-name="${d[el].entity_name}">${d[el].entity_name} (UEN: ${d[el].uen})</div>`

                    }

                    suggest.innerHTML = suggestResult

                }

                _this._companySearchResult = d;

            })

        }


        const playButtonTpl = `<a class="leaflet-control-play" href="#" title="Play" role="button" aria-label="Play" data-state="pause"><span></span></a>`
        controlsContainer.insertAdjacentHTML('afterend', playButtonTpl);
        this._playButton = document.body.getElementsByClassName('leaflet-control-play')[0]
        this._playButton.addEventListener("click", function(){
            
            if (this.getAttribute('data-state') == 'pause') {
                _this.play();
                this.setAttribute('data-state', 'play');
            } else {
                _this.stop();
                this.setAttribute('data-state', 'pause');

            }    

        });

        
        


        this._svgMap = L.imageOverlay('../source/data/map.svg', [[1.1585, 103.602],	[1.472,	104.089]]).addTo(this._map);

        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.innerHTML = new MapSvg().svg;
            svg.setAttribute('class', _this._svgMap._image.getAttribute('class'));
            svg.setAttribute('style', _this._svgMap._image.getAttribute('style'));
            svg.setAttribute('width', '11770');
            svg.setAttribute('height', '7662');
            svg.setAttribute('viewBox', "0 0 11770 7662");

        _this._svgMap._image.replaceWith( svg );
        
        _this._svgMap._image = svg;

        this._places = L.layerGroup().addTo(this._map);
        this._places._length = 0;
        


        this._dateElem = document.createElement('div');
        this._dateElem.classList.add('date-timer');
        this._dateElem.innerHTML = '';
        
        document.querySelector('#map').appendChild(this._dateElem);

        // -- WebGl setup
        const shader = new Shader();

        const vertexShader = this._gl.createShader(this._gl.VERTEX_SHADER);
        this._gl.shaderSource(vertexShader, shader.vertex);
        this._gl.compileShader(vertexShader);

        const fragmentShader = this._gl.createShader(this._gl.FRAGMENT_SHADER);
        this._gl.shaderSource(fragmentShader, shader.fragment);
        this._gl.compileShader(fragmentShader);

        // link shaders to create our program
        const program = this._gl.createProgram();
        this._gl.attachShader(program, vertexShader);
        this._gl.attachShader(program, fragmentShader);
        this._gl.linkProgram(program);
        this._gl.useProgram(program);

        this._gl.blendFunc(this._gl.SRC_ALPHA, this._gl.ONE_MINUS_SRC_ALPHA);
        this._gl.enable(this._gl.BLEND);

        // look up the locations for the inputs to our shaders.
        this._u_matLoc = this._gl.getUniformLocation(program, "u_matrix");
        this._colorLoc = this._gl.getAttribLocation(program, "a_color");

        this._vertLoc  = this._gl.getAttribLocation(program, "a_vertex");
        this._gl.aPointSize  = this._gl.getAttribLocation(program, "a_pointSize");
        // Set the matrix to some that makes 1 unit 1 pixel.

        this._pixelsToWebGLMatrix.set([2 / this._canvas.width, 0, 0, 0, 0, -2 / this._canvas.height, 0, 0, 0, 0, 0, 0, -1, 1, 0, 1]);
        this._gl.viewport(0, 0, this._canvas.width, this._canvas.height);

        this._gl.uniformMatrix4fv(this._u_matLoc, false, this._pixelsToWebGLMatrix);



        return this;

    }

    setSsic (ssic) {

        this.ssic = ssic;

        return this;

    }

    setGraph (graph) {
        this._graph = graph;

        return this;
    }

    setData (data, codes, dates, history) {

        this._data = data;
        this._dates = dates;
        this._codes = codes;
        this._historyPlaces = history[0];
        this._historyEvents = history[1];

        let keys = []; 
        for (var k in dates) {
            keys.push(+k);
        }
        this._minStep = keys[0];
        this._maxStep = keys[keys.length - 1];

        document.querySelector('.leaflet-control-container').classList.add('leaflet-control-container_visible');

        return this;
        
    }

    play (fromStep) {

        const _this = this;
        const maxStep = +this._maxStep;
        const speed = 300;

        this._speed = speed;

        if ( _this._step >= maxStep ) _this._step = this._minStep;

        

        this._animationTimer = setInterval(function(){

            if ( _this._step <= maxStep ) {

                _this.drawData(_this._step);

                _this._step++;

            } else {

                _this._playButton.setAttribute('data-state', 'pause');
                clearInterval(_this._animationTimer);

            }

        },speed);

        return this;
    }

    stop () {

        const _this = this;

        clearInterval(_this._animationTimer);

        return this;
    }

    setSSIC (ssic) {

        this._ssic = ssic;

        return this;

    }

    drawData (step) {

        

        this._verts = [];
        this._vertsLength = 0;
        this._step = +(step || this._step || this._maxStep);
        this._step = (this._step > this._maxStep ) ? this._maxStep : this._step;

        this._historyMode = this._historyMode || true;
        
        this._graph.drawStep(this._step);

        const _this = this;

        if (this._data){

            if (!this._places._length){    

                for (var i = 0; i < this._historyPlaces.length; i++){

                    if (this._historyPlaces[i].type == 'Point') {
        
                        let point = [ this._historyPlaces[i].geom[1], this._historyPlaces[i].geom[0] ];

                
                        
                        let description = (this._historyPlaces[i].description) ? `<div class="place-cover" style="background-image:url(source/assets/history/${this._historyPlaces[i].image})"></div><h3>${this._historyPlaces[i].name}</h3>` + this._historyPlaces[i].description : `<div class="place-cover" style="background-image:url(source/assets/history/${this._historyPlaces[i].image})"></div><h3>${this._historyPlaces[i].name}</h3>`;

                        let marker = new L.Marker(point, {
                            icon: new L.DivIcon({
                                className: 'place-marker',
                                html: '<div class="place-marker__inner"></div>'
                            })
                        }).bindPopup(`${description}`).addTo(this._places);
        
                        this._places._length++

                        marker._icon.setAttribute('data-date', this._historyPlaces[i].date);
                        marker._icon.setAttribute('data-step', this._historyPlaces[i].dateIndex); 
                        marker._icon.setAttribute('data-id', this._historyPlaces[i].id);    

                    }
        
                }
            
            }  

            

            if (this._places._length){  

                let eventText = document.querySelector('.date-timer .event');

                if ( eventText ) {

                    if (document.querySelector('#history').getAttribute('data-visible') == 'on'){

                        this._historyMode = true;

                    } else {

                        this._historyMode = false;

                    }   

                }


                for (var i = 0; i < this._historyPlaces.length; i++){
                    let markers = document.querySelectorAll(`.place-marker[data-step="${this._historyPlaces[i].dateIndex}"]`); 
                     

                    for (var marker of markers){

                        if ( this._historyMode ){

                            if ( +this._historyPlaces[i].dateIndex <= this._step ) {
                                if (marker) marker.classList.add('place-marker_visible');

                            } else {
                                if (marker) marker.classList.remove('place-marker_visible'); 

                            }  
                        
                        } else {

                            if (marker) marker.classList.remove('place-marker_visible'); 

                        }

                    }
                }    

            }

            let landsArea = this._svgMap._image.querySelectorAll('.land-area');

            for ( var a of landsArea) {

                a.classList.remove('land-area_visible')

                if ( this._step <= 73 ) {

                    if (a.className.baseVal.includes('land-area_1')) a.classList.add('land-area_visible');

                }

                if ( this._step > 73 && this._step <= 120 ) {   
                    
                    if (a.className.baseVal.includes('land-area_2')) a.classList.add('land-area_visible');

                }    

                if ( this._step > 120 ) {   
                
                    if (a.className.baseVal.includes('land-area_3')) a.classList.add('land-area_visible');

                }  

            }    

            let historyEvent = null;
            let eventClass = (this._historyMode) ? '' : 'event_hidden'

            for (var h = 0; h < this._historyEvents.length; h++){

                if (this._historyEvents[h].dateIndex == this._step) historyEvent = this._historyEvents[h].name

            }

            this._dateElem.innerHTML = (!historyEvent) ? `<div class="date">${this._dates[this._step].date}</div><div class="event ${eventClass}"></div>` : `<div class="date">${this._dates[this._step].date}</div><div class="event ${eventClass}">${historyEvent}</div>`;


            const foreignObject = document.querySelectorAll('.f-horizontal');

            for (var f of foreignObject) {

                f.classList.remove('f-horizontal_active');
                if (f.getAttribute('data-step') == this._step) f.classList.add('f-horizontal_active');

            }
  

            var il = this._data.length;

            for (var i = 0; i < il; i++){

                var dateIndex = null;
                var dl = this._data[i][1].length;

                for (var d = 0; d < dl; d++){
                    
                    if (this._data[i][1][d][0] <= this._step) {
                        
                        dateIndex = d;

                    }   

                }

                

                if (typeof dateIndex == "number"){

                    const pointLimit = 100;

                    let ssicLength = 0//(this._data[i][1][dateIndex][1].length < pointLimit) ? this._data[i][1][dateIndex][1].length : pointLimit;
                    
                    for ( var s = this._data[i][1][dateIndex][1].length; s--; ){
                        if ( this._codes[ this._data[i][1][dateIndex][1][s].code ].visible ){
                            ssicLength++
                        }    
                    }

                    //ssicLength = (this._data[i][1][dateIndex][1].length < pointLimit) ? this._data[i][1][dateIndex][1].length : pointLimit;                    

                    const dot = [this._data[i][0][0], this._data[i][0][1]];
                    const pixel = LatLongToPixelXY(dot[0], dot[1]);

                    if (ssicLength > 1) {

                        this._verts.push(pixel.x, pixel.y, 1, 1, 1);

                        this._vertsLength++
                    }    

                    let counter = 0

                    for ( var s = this._data[i][1][dateIndex][1].length; s--; ) {

                        if ( this._codes[ this._data[i][1][dateIndex][1][s].code ].visible ){

                            var angle = counter / ssicLength * Math.PI * 2;
                            var xOffset = Math.cos(angle) * (0.00001 * ssicLength);
                            var yOffset = Math.sin(angle) * (0.00001 * ssicLength); 

                            var color = this.colors.arrRGB[ this._codes[ this._data[i][1][dateIndex][1][s].code ].colorIndex ];
                                    
                            this._verts.push(pixel.x + xOffset, pixel.y + yOffset, color[0], color[1], color[2]);
                                    
                            this._vertsLength++;

                            counter++

                        } 

                    }

                } 

            }

            this._verts.push(0, 0, 1, 1, 1);
            this._vertsLength++
            

            const vertBuffer = this._gl.createBuffer();
            const vertArray = new Float32Array(this._verts);
            const fsize = vertArray.BYTES_PER_ELEMENT;
            

            this._gl.bindBuffer(this._gl.ARRAY_BUFFER, vertBuffer);
            this._gl.bufferData(this._gl.ARRAY_BUFFER, vertArray, this._gl.STATIC_DRAW);
            this._gl.vertexAttribPointer(this._vertLoc, 2, this._gl.FLOAT, false, fsize * 5,0);
            this._gl.enableVertexAttribArray(this._vertLoc);
            // -- offset for color buffer
            this._gl.vertexAttribPointer(this._colorLoc, 3, this._gl.FLOAT, false, fsize * 5, fsize * 2);
            this._gl.enableVertexAttribArray(this._colorLoc);

            this._canvasOverlay.drawing(drawingOnCanvas);

            this._canvasOverlay.redraw();

        }

        function drawingOnCanvas(canvasOverlay, params) {


            _this._gl.clear(_this._gl.COLOR_BUFFER_BIT);


            _this._pixelsToWebGLMatrix.set([2 / _this._canvas.width, 0, 0, 0, 0, -2 / _this._canvas.height, 0, 0, 0, 0, 0, 0, -1, 1, 0, 1]);
            _this._gl.viewport(0, 0, _this._canvas.width, _this._canvas.height);

            const pointSize = Math.max(_this._map.getZoom() - 4.0, 1.0);

            _this._gl.vertexAttrib1f(_this._gl.aPointSize, pointSize);

            // -- set base matrix to translate canvas pixel coordinates -> webgl coordinates
            _this._mapMatrix.set(_this._pixelsToWebGLMatrix);

            const bounds = _this._map.getBounds();
            const topLeft = new L.LatLng(bounds.getNorth(), bounds.getWest());
            const offset = LatLongToPixelXY(topLeft.lat, topLeft.lng);

            // -- Scale to current zoom
            var scale = Math.pow(2, _this._map.getZoom());
            scaleMatrix(_this._mapMatrix, scale, scale);

            translateMatrix(_this._mapMatrix, -offset.x, -offset.y);

            // -- attach matrix value to 'mapMatrix' uniform in shader
            _this._gl.uniformMatrix4fv(_this._u_matLoc, false, _this._mapMatrix);
            _this._gl.drawArrays(_this._gl.POINTS, 0, _this._vertsLength);


            function translateMatrix(matrix, tx, ty) {
                // translation is in last column of matrix
                matrix[12] += matrix[0] * tx + matrix[4] * ty;
                matrix[13] += matrix[1] * tx + matrix[5] * ty;
                matrix[14] += matrix[2] * tx + matrix[6] * ty;
                matrix[15] += matrix[3] * tx + matrix[7] * ty;
            }
    
            function scaleMatrix(matrix, scaleX, scaleY) {
                // scaling x and y, which is just scaling first two columns of matrix
                matrix[0] *= scaleX;
                matrix[1] *= scaleX;
                matrix[2] *= scaleX;
                matrix[3] *= scaleX;
    
                matrix[4] *= scaleY;
                matrix[5] *= scaleY;
                matrix[6] *= scaleY;
                matrix[7] *= scaleY;
            }

        }

        function randomInteger(min, max) {
            // случайное число от min до (max+1)
            let rand = min + Math.random() * (max + 1 - min);
            return Math.floor(rand);
          }
        

        function LatLongToPixelXY(latitude, longitude) {
            var pi_180 = Math.PI / 180.0;
            var pi_4 = Math.PI * 4;
            var sinLatitude = Math.sin(latitude * pi_180);
            var pixelY = (0.5 - Math.log((1 + sinLatitude) / (1 - sinLatitude)) / (pi_4)) * 256;
            var pixelX = ((longitude + 180) / 360) * 256;

            var pixel = { x: pixelX, y: pixelY };

            return pixel;
        }

        return this

    }
    
}    