export default function (dates) {

const history = [
    { 
        "name": "Formula",
        "icon": "car",
        "type": "Point", 
        "image": "pic_27.jpg",
        "date": 2008, 
        "geom": [103.86435985565186, 1.2900335273724657] 
    }, { 
        "type": "Point", 
        "icon": "building",
        "name": "Osome Pte. Ltd.", 
        "image": "pic_26.jpeg", 
        "date": 2017, 
        "geom": [103.8493287563324, 1.2801064870177117] 
    }, { 
        "type": "Point", 
        "icon": "building",
        "name": "Marina Bay Sands",
        "image": "pic_25.jpg", 
        "date": 2010, 
        "geom": [103.86075496673584, 1.2838123720725012] 
    }, { 
        "type": "Point", 
        "icon": "building",
        "name": "ArtScience Museum", 
        "image": "pic_24.jpg",
        "date": 2011, 
        "geom": [103.85916709899902, 1.2861506701544758] 
    }, { 
        "type": "Point", 
        "icon": "garden",
        "name": "Bay South, the largest of the three gardens", 
        "image": "pic_23.jpg",
        "date": 2012, 
        "geom": [103.8641881942749, 1.2819996532802704] 
    }, { 
        "type": "Point", 
        "name": "Esplanade", 
        "image": "pic_22.jpg",
        "date": 2005, 
        "geom": [103.85565876960754, 1.2897439222041431] 
    }, { 
        "type": "Point", 
        "icon": "building",
        "name": "OCBC Centre", 
        "image": "pic_21.jpg",
        "date": 1976, 
        "geom": [103.84904980659485, 1.2850351520704437] 
    }, { 
        "type": "Point", 
        "icon": "building",
        "name": "Buddha Tooth Relic Temple and Museum", 
        "image": "pic_20.jpg",
        "date": 2005, 
        "geom": [103.8442325592041, 1.2814740718519217] 
    }, { 
        "type": "Point", 
        "icon": "building",
        "name": "One Raffles Place", 
        "image": "pic_19.jpg",
        "date": 1986, 
        "geom": [103.85105609893799, 1.284649011081671] 
    }, { 
        "type": "Point", 
        "icon": "building",
        "name": "Singapore Land Tower", 
        "image": "pic_18.jpg",
        "date": 1980, 
        "geom": [103.85200023651122, 1.2846811894996435] 
    }, { 
        "type": "Point", 
        "icon": "building",
        "name": "Republic Plaza", 
        "image": "pic_17.jpg",
        "date": 1996, 
        "geom": [103.85092735290527, 1.2829435543501144] 
    }, { 
        "type": "Point", 
        "icon": "building",
        "name": "Treasury Building (now AXA Tower)", 
        "image": "pic_16.jpg",
        "date": 1986, 
        "geom": [103.84721517562866, 1.2756819428547417] 
    }, { 
        "type": "Point",
        "icon": "building",
        "name": "CPF Building", 
        "image": "pic_15.jpeg",
        "date": 1976, 
        "geom": [103.8479608297348, 1.2769851730180488] 
    }, { 
        "type": "Point", 
        "icon": "building",
        "name": "DBS Tower", 
        "image": "pic_14.jpg", 
        "date": 1975, 
        "geom": [103.84873867034912, 1.277451761434428] 
    }, { 
        "type": "Point",
        "icon": "building", 
        "name": "Suntec City", 
        "date": 1997,
        "image": "pic_13.jpg", 
        "description" : `
            <p>Suntec City is a major mixed-use development located in Marina Centre, a subzone of the Downtown Core in Singapore, which combines a shopping mall, office buildings, and a convention centre. Construction began on 18 January 1992 (with earthworks) followed by full completion and opening on 22 July 1997. Suntec City was designed by Tsao & McKown Architects with emphasis on Chinese feng shui.</p> 
            <p>The five buildings and the convention center are arranged so that they look like a left hand when viewed aerially. The Fountain of Wealth appears like a golden ring in the palm of the hand. As the fountain is made of bronze, it is believed that the balance of metal and water paves the way for success. Further, the specially selected Chinese name, 新达, means "new achievement"</p>`,
        "geom": [103.85888814926146, 1.2947744665470604] 
    }, {
        "type": "Point",
        "icon": "building",
        "name": "Orchard Towers",
        "image": "pic_12.jpeg",
        "date": 1975,
        "description" : `
            <p>Orchard Towers is an 18-storey office building in Singapore located on the corner of Claymore Road and Orchard Road. Construction was completed in 1975. The first five floors are a combination of bars and retail outlets with the remainder leased as offices.</p> 
            <p>During the day the building functions as a retail and office style building, but the building is best known as a landmark entertainment complex famously described as the "Four Floors of Whores" or simply the "Four Floors". In addition, one of the towers houses 58 freehold condominium residential units. Orchard Tower houses the Embassy of Romania on the 8th floor, Honorary Consulate of Mauritius on the 9th floor and the Embassy of Cambodia on the 10th floor.</p>`,
        "geom": [103.8282568, 1.3077012] 
    }, {
        "name":"Changi Airport",
        "icon": "airport",
        "date":1987,
        "image":"pic_11.jpg",
        "geom":[103.98834228515625,1.354625368768736],
        "type":"Point"
    },{
        "name":"Sembawang Wharves",
        "icon": "port",
        "date": 1971,
        "image": "pic_10.jpg",
        "geom":[103.83007049560547,1.4627393356673588],
        "type":"Point"
    },{
        "name":"Singapore Zoo",
        "icon": "zoo",
        "image": "pic_9.jpg",
        "date":1973,
        "geom":[103.79436492919922,1.4037062985935518],
        "type":"Point"
    },{
        "name":"Jurong Island Terminals",
        "icon": "port",
        "image": "pic_8.jpg",
        "date": 1965,
        "geom":[103.68810653686523,1.2410147076791553],
        "type":"Point"
    },{
        "name":"Pasir Panjang Container Terminal",
        "icon": "port",
        "image": "pic_7.jpg",
        "date": 1974,
        "geom":[103.7742805480957,1.2804872656134916],
        "type":"Point"
    },{
        "name":"Brani Terminal",
        "icon": "port",
        "image":"pic_6.jpg",
        "date": 2000,
        "geom":[103.83333206176758,1.2593781025295887],
        "type":"Point"
    },{
        "name":"Keppel Terminal",
        "icon": "port",
        "image" : "pic_5.jpg",
        "date": 1990, 
        "geom":[103.84157180786133,1.2672726064521231],
        "type":"Point"
    },{
        "name":"Tanjong Pagar Port Terminal",
        "icon": "port",
        "date": 1972,
        "image" : "pic_1.jpg",
        "description" : `<p>The MV Nihon was the first container ship to call at Tanjong Pagar Terminal when it opened on June 23, 1972. It arrived with around 300 containers from Rotterdam, and was greeted by a crowd of more than 1,000 port workers and officials.</p>`,
        "geom":[103.8479232788086,1.2681307032573514],
        "type":"Point"
    }, {
        "name": "People's Park Complex",
        "icon": "building",
        "date": 1970,
        "image": "pic_2.jpg",
        "description" : `<p>With a height of 103 metres (338 feet), the 31-storey People's Park Complex building was the first shopping centre of its kind in Southeast Asia and set the pattern for later retail developments in Singapore. The shopping centre was completed in October 1970, while the residential block was completed in 1973. Occupying 1 hectare in the heart of Chinatown, the People's Park Complex was the largest shopping complexes in the shopping commercial belt along Eu Tong Sen Street and New Bridge Road.</p>`,
        "geom": [103.8429867, 1.2819302],
        "type": "Point"
    }, {
        "name": "Raffles Hotel",
        "icon": "building",
        "date": 1887,
        "image": "pic_3.jpg",
        "description" : `
            <p>Raffles Hotel Singapore started as a privately owned beach house built in the early 1830s. It first became Emerson's Hotel when Dr. Charles Emerson leased the building in 1878. Upon his death in 1883, the hotel closed, and the Raffles Institution stepped in to use the building as a boarding house until Dr. Emerson's lease expired in September 1887.</p>
            <p>Almost immediately after the first lease expired, the Sarkies Brothers leased the property from Syed Mohamed Alsagoff, its owner, with the intention of turning it into a high-end hotel. A few months later, on December 1, 1887, the ten-room Raffles Hotel opened. Its proximity to the beach and its reputation for high standards in services and accommodations made the hotel popular with wealthy clientele.</p>`,
        "geom": [103.8522851, 1.2948883],
        "type": "Point"
    }, {
        "name": "Lau Pa Sat",
        "icon": "building",
        "date": 1894,
        "image": "pic_4.jpg",
        "description" : `
            <p>Lau Pa Sat (Chinese: 老巴刹; pinyin: Lǎo Bāshā; literally: 'Old Market'), also known as Telok Ayer Market (Malay: Pasar Telok Ayer; Chinese: 直落亚逸巴刹), is a historic building located within the Downtown Core in the Central Area of Singapore. It was first built in 1824 as a fish market on the waterfront serving the people of early colonial Singapore and rebuilt in 1838. It was then relocated and rebuilt at the present location in 1894. It is currently a food court with stalls selling a variety of local cuisine.</p>
            <p>The market remains one of the oldest Victorian design structure in South-East Asia and one of the first structure built in pre-fabricated cast iron in Asia. It is also the only remaining market left that served the residents in the central district of early Singapore.</p>`,
        "geom": [103.8496539,1.2801519],
        "type": "Point"
    }
]
    
    for (var i = 0; i < history.length; i++) {

        for(var d in dates) {

            if (history[i].date == dates[d].date) { 
                history[i].dateIndex = dates[d].dateIndex
            }    

        }

        if (!history[i].dateIndex) history[i].dateIndex = 0;

        history[i].id = i;

    }

    return history;

}