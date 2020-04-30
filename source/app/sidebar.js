import Colors from "./colors.js";
import Browser from "./browser.js";

export default class Sidebar {

    constructor(id){
        this._id = `#${id}`;
        this._colors = new Colors();
        this._browser = new Browser();

        const _this = this;

        this._tplItem = function (query) {

            const id = query.length;   
            const colorIndex = randomInteger(0, _this._colors.hex.length);
            const color = _this._colors.hex[colorIndex];

            query.push({
                type: "item",
                title: "Test item",
                control: "checkbox",
                value: ["00000"],
                colorIndex : colorIndex,
                visible: true,
                id : id
            })

            function randomInteger(min, max) {
                let rand = min + Math.random() * (max + 1 - min);
                return Math.floor(rand);
            }

            return `<div class="sidebar__item " data-index="${id}">
            <div class="sidebar__item-header">
                <div class="sidebar__item-title">
                    <div class="sidebar__item-icon">
                        <div class="color-select" data-item="${id}" style="background-color:#${color}" ></div>
                    </div>
                    <div class="sidebar__item-name">
                        <input class="sidebar__item-input" type="text" placeholder="Enter SSIC code or part of it" autofocus />
                    </div>
                </div>
                <div class="sidebar__item-tools">
                    <a title="Free SSIC Code Search" class="tool tool_information" href="https://osome.com/sg/ssic-code-search-tool/" target="_blank"></a>
                    <div title="Remove Item" class="tool tool_remove"  data-type="item"></div>
                    <div title="Show/Hide Item" class="tool tool_visible" data-type="item" data-control="checkbox" data-visible="on"></div>
                </div> 
            </div>
          </div>`;
        }

        this._tpl = function (query) {
           
           let items = ''; 

           for (var i = 0; i < query.length; i++) {

              let color = (query[i].colorIndex) ? _this._colors.hex[ query[i].colorIndex ] : null;  
              let colorSelect = (color) ? `<div class="color-select" data-item="${query[i].id}" style="background-color:#${color}" ></div>` : (query[i].value == 'history') ? `<div class="color-select" style="background-color:#fff;pointer-events: none;" ></div>` : `${query[i].title[0]}`;  
              let groupClass = (query[i].type == 'group') ? 'sidebar__item_group' : '';
              let groupHidden = (query[i].visible) ? '' : 'hidden';
              let visible = (query[i].visible) ? 'on' : 'off';

              let history = (query[i].value == 'history') ? 'id="history"' : ''

              let open = (query[i].type == 'group') ? (query[i].open) ? `data-open="on"` : `data-open="off"` : ''; 

              let body = (typeof query[i].value == 'object') ? (function(value){

                let blocks = '';

                for (var v = 0; v < value.length; v++) {
                    
                    let title = (value[v].title) ? value[v].title : value[v].value[0];
                    let color = (value[v].colorIndex) ? _this._colors.hex[ value[v].colorIndex ] : null;  
                    let colorSelect = (color) ? `<div class="color-select" data-item="${query[i].id}" data-value="${value[v].id}" style="background-color:#${color}" ></div>` : `${title[0]}`;
                    let disableClass = (query[i].visible) ? '' : 'tool_disable';
                    let hiddenClass = (query[i].visible) ? '' : 'hidden';

                    let visibleBlock = 'off';

                    if (value[v].visible == undefined) {

                        if (value[v].visible) {

                            visibleBlock = 'on';

                        } else {

                            if (query[i].visible) {

                                visibleBlock = 'on';

                            }

                        }

                    } else {

                        visibleBlock = (value[v].visible) ? 'on' : 'off';

                    }



                    blocks += `
                    <div class="sidebar__value ${hiddenClass}" date-index="${value[v].id}">
                        <div class="sidebar__item-title">
                            <div class="sidebar__item-icon">${colorSelect}</div>
                            <div class="sidebar__item-value-name">${title} <span class="sidebar__item-hint">${value[v].hint}</span></div>
                        </div>
                        <div class="sidebar__item-tools">
                            <div title="Show/Hide Item" class="tool tool_visible ${disableClass}" data-ingroup="true" data-type="${value[v].type}" data-control="${value[v].control}" data-visible="${visibleBlock}"></div>
                        </div> 
                    </div>
                    `;

                }  

                return blocks;

              })(query[i].value) : '';

              items += `
              <div class="sidebar__item ${groupClass}" ${open} data-index="${query[i].id}">
                <div class="sidebar__item-header">
                    <div class="sidebar__item-title">
                        <div class="sidebar__item-icon">${colorSelect}</div>
                        <div class="sidebar__item-name">${query[i].title}</div>
                    </div>
                    <div class="sidebar__item-tools">
                        <div ${history} title="Show/Hide Item" class="tool tool_visible ${groupHidden}" data-type="${query[i].type}" data-control="${query[i].control}" data-visible="${visible}"></div>
                    </div> 
                </div>
                <div class="sidebar__item-body">
                    ${body}
                </div>
              </div>`; 

           } 

           return `
            <div class="sidebar__inner">
                ${items}
                <div class="user-filter"></div>
                <div class="sidebar__item sidebar__custom-filter">
                    <span>Add New Filter</span>
                </div>
            </div>`;

        }    

        return this;
    }

    setSsic (ssic) {

        this._ssic = ssic;

        return this;
    }

    setFilter (filter) {

        this._filter = filter;

        return this;
    }

    setData (data) {
        this._data = data;

        return this;
    }

    create (query) {

        const _this = this;

        this._query = query;

        const container = document.querySelector(this._id);
        let closeButton = null;

        let isMobile = (_this._browser.isMobile == 'mobile') ? 'mobile' : '';
        

        container.innerHTML = this._tpl(this._query);

        if (isMobile) {
            container.classList.add(isMobile);

            closeButton = document.createElement('div');

            closeButton.classList.add('close-button');
            document.body.appendChild(closeButton);

            closeButton.addEventListener('click', function(e){

                container.classList.remove('visible');
                closeButton.classList.remove('visible');

            });    

        }    

        container.addEventListener('keyup', function(e){
            
            if (e.target.tagName) {

                let value = e.target.value = e.target.value.replace(/[^\d]+/g, '');

                

                    let id = e.target.closest('.sidebar__item ').getAttribute('data-index');

                    let result = [];

                    for (var s in _this._ssic.ssic) {

                        
                        let ssic = (function(s){

                            let ssic = s

                            for (var i = 0; i < 5; i++) {

                                if (ssic.length < 5) ssic = '0' + ssic; 

                            }

                            return ssic;

                        })(s)

                        let regTest = new RegExp(`^${value}`);

                        if (value && regTest.test(ssic)) {
                            result.push(ssic);
                        }    

                    }

                    _this._query[id].value = (result.length) ? result : ['00000'];

                    if (result.length < 1) {

                        e.target.classList.add('sidebar__item-input_error');

                    } else {
                        e.target.classList.remove('sidebar__item-input_error');
                    }

                    if (_this._keyUpTimer) clearTimeout(_this._keyUpTimer);

                    _this._keyUpTimer = setTimeout(function(){
                        _this._filter.setQuery(_this._query);
                    },500);

    
                

            }

        });


        container.addEventListener('click', function(e){

            if (isMobile) {
                container.classList.add('visible');
                closeButton.classList.add('visible');
            }  

            /*
            //change history visibility on graph
            if (e.target.id == 'history') {

                let markers = document.querySelectorAll('.history-group');

                

                if (e.target.getAttribute('data-visible') == 'on') {

                    console.log('on')
                    
                    for (var m of markers) {

                        m.classList.add('history-group_hidden');

                    }

                } else {

                    console.log('off')

                    for (var m of markers) {

                        m.classList.remove('history-group_hidden');

                    }

                }

            }
            */

            //add filter 
            if (e.target.className.includes('sidebar__custom-filter')) {

                let tplitem = _this._tplItem(_this._query);

                let filterContainer = document.querySelector('.user-filter');

                filterContainer.insertAdjacentHTML('beforeEnd', tplitem);

                _this._filter.setQuery(_this._query);

            }

            //remove item 
            if (e.target.className.includes('tool_remove')) {

                let id = e.target.closest('.sidebar__item').getAttribute('data-index');
                _this._query.splice(id, 1);
                e.target.closest('.sidebar__item').remove();

                _this._filter.setQuery(_this._query);

            }    
            
            //color select
            if (e.target.className == 'color-select') {

                let currentColor = e.target.getAttribute('data-color');
                let colorBox = '';
                let currentColorEl = e.target;

                for(var c = 0; c < _this._colors.hex.length; c++) {

                    let color = _this._colors.hex[c];
                    let currentClass = (color == currentColor) ? 'colorbox__color_selected' : '';

                    colorBox += `
                        <div class="colorbox__color ${currentClass}" data-color="${c}" style="background-color:#${color}"></div>
                    `

                }

                let colorSelect = document.createElement('div');
                colorSelect.classList.add('colorbox');
                colorSelect.innerHTML = colorBox;

                let top = (e.pageY - 100 > 0) ? e.pageY - 100 : 0;
                let left = (e.layerX - 100 > -100) ? e.layerX - 100 : 0

                colorSelect.style.top = top + 'px';
                colorSelect.style.left = left + 'px';
                
                colorSelect.setAttribute( 'data-item', e.target.getAttribute('data-item') );
                colorSelect.setAttribute( 'data-value', e.target.getAttribute('data-value') );

                colorSelect.addEventListener('mouseleave', function(e){
                    colorSelect.remove();
                });
                colorSelect.addEventListener('click', function(e){

                    let dataItem = e.target.closest('.colorbox').getAttribute('data-item');
                    let dataValue = e.target.closest('.colorbox').getAttribute('data-value');
                    let colorIndex = e.target.getAttribute('data-color');
                    let isGroup = (dataItem != 'null' && dataValue != 'null') ? true : false

                    currentColorEl.style.backgroundColor = '#' + _this._colors.hex[colorIndex];

                    if (isGroup) {

                        _this._query[dataItem].value[dataValue].colorIndex = colorIndex;
 
                    } else {

                        _this._query[dataItem].colorIndex = colorIndex;

                    }

                    _this._filter.setQuery(_this._query);
                    
                    colorSelect.remove();

                })

                container.appendChild(colorSelect);

            }

            //toggle tab
            if (e.target.className == 'sidebar__item-name'){
                let parent = e.target.parentNode.parentNode.parentNode;
                let index = e.target.parentNode.parentNode.parentNode.getAttribute('data-index');

                if (parent.getAttribute('data-open') == 'on') {
                    parent.setAttribute('data-open', 'off');
                    _this._query[index].open = false; 
                } else {
                    parent.setAttribute('data-open', 'on');
                    _this._query[index].open = true; 
                }    
    
            }  
            
            //toggle visible
            if (e.target.className.includes('tool_visible')) {
                
                let type = e.target.getAttribute('data-control');
                let parentItem = e.target.closest('.sidebar__item');
                let parentValue = e.target.closest('.sidebar__value');
                let isValue = (parentValue) ? true : false;
                let state = e.target.getAttribute('data-visible');

                if (isValue){

                    if (state == 'on') {
                        e.target.setAttribute('data-visible', 'off');
                    } else {
                        e.target.setAttribute('data-visible', 'on');
                    }  

                } else {

                    if (type == 'radio') {

                    let allRadio = document.querySelectorAll('.sidebar__item_group .tool_visible');

                    for (var r of allRadio) {

                        r.setAttribute('data-visible', 'off');

                        if (r.getAttribute('data-ingroup')) {

                            r.classList.add('tool_disable');

                        } 

                    }

                    if (state == 'on') {
                        e.target.setAttribute('data-visible', 'off');
                    } else {
                        e.target.setAttribute('data-visible', 'on');
                    }

                    let allRadioInside = parentItem.querySelectorAll('[data-visible]');

                    for (var r of allRadioInside) {

                        r.setAttribute('data-visible', 'on');

                        r.classList.remove('tool_disable');

                    }
                    
                    } else {

                        if (state == 'on') {
                            e.target.setAttribute('data-visible', 'off');
                        } else {
                            e.target.setAttribute('data-visible', 'on');
                        }
                        
                        let allRadioInside = parentItem.querySelectorAll('[data-ingroup][data-visible]');

                        

                        for (var r of allRadioInside) {

                            if (state == 'off') {
                                r.setAttribute('data-visible', 'on');

                                r.classList.remove('tool_disable');
                            } else {
                                r.setAttribute('data-visible', 'off');
                                r.classList.add('tool_disable');
                            }   
                        }
                        

                    }
                    
                }

                let allValues = document.querySelectorAll('.tool_visible');

                
                for (var v of allValues) {

                    let itemIndex = v.closest('.sidebar__item').getAttribute('data-index');

                    let valueIndex = (function(){
                        let el = v.closest('.sidebar__value');
                        return (el !== null) ? el.getAttribute('date-index') : null;
                    })();

                    let parent = v.closest('.sidebar__value') || v;
                    
                    let state = (v.getAttribute('data-visible') == 'on') ? true : false;

                    if (state) {
                        if (parent) parent.classList.remove('hidden')
                    } else {
                        if (parent) parent.classList.add('hidden')
                    }


                    if (!valueIndex) {

                        _this._query[itemIndex].visible = state;

                    } else {

                        _this._query[itemIndex].value[valueIndex].visible = state;

                    }

                }

                _this._filter.setQuery(_this._query);

            }

        });
        

        document.addEventListener('mousemove',function(e){

            if (!isMobile.length){

                if (e.pageY < document.body.clientHeight - document.querySelector('#graph').clientHeight) {
                    
                    document.querySelector(_this._id).style['pointer-events'] = 'all';

                } else {

                    if (e.pageX < document.body.clientWidth - document.querySelector('#sidebar').clientWidth) {

                        document.querySelector(_this._id).style['pointer-events'] = 'none';

                    }

                }
            }

        })


        return this;
    }
    
}    