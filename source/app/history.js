export default function (dates) {

const history = [
    {
        "name" : "Prohibition in the United States",
        "date" : 1920
    },
    {
        "name" : "USSR was formed",
        "date" : 1922
    },
    {
        "name" : "Broadcast the first transatlantic television signal",
        "date" : 1928
    },
    {
        "name" : "Wall Street Crash, followed by the Great Depression",
        "date" : 1929 
    },
    {
        "name" : "World War II",
        "date" : 1939    
    },
    {
        "name" : "War breaks out in the Pacific",
        "date" : 1941
    },
    {
        "name" : "Japan and its ally Thailand had almost fully conquered Burma, Malaya, the Dutch East Indies, Singapore, and Rabaul",
        "date" : 1942
    },
    {
        "name" : "Ending the World War II",
        "date" : 1945   
    },
    {
        "name" : "Vietnam War",
        "date" : 1955
    },
    {
        "name" : "The first workable prototype of the Internet",
        "date" : 1960
    },
    {
        "name" : "Oil crisis – oil prices soared, causing the 1973–1974 stock market crash",
        "date" : 1973 
    },
    {
        "name" : "Latin American debt crisis – beginning in Mexico in 1982 with the Mexican Weekend",
        "date" : 1980 
    },
    {
        "name" : "Bank stock crisis",
        "date" : 1983
    },
    {
        "name" : "Researchers began to assemble the “network of networks” that became the modern Internet",
        "date" : 1984
    },
    {
        "name" : "Black Monday – the largest one-day percentage decline in stock market history",
        "date" : 1987
    },
    {
        "name" : "United States Savings & Loan crisis",
        "date" : 1989
    },
    {
        "name" : "Japanese asset price bubble collapsed",
        "date" : 1990
    },
    {
        "name" : "Black Wednesday – speculative attacks on currencies in the European Exchange Rate Mechanism",
        "date" : 1992
    },
    {
        "name" : "Economic crisis in Mexico – speculative attack and default on Mexican debt",
        "date" : 1994
    },
    {
        "name" : "Asian Financial Crisis – devaluations and banking crises across Asia",
        "date" : 1997
    },
    {
        "name" : "Russian financial crisis",
        "date" : 1998
    },
    {
        "name" : "Argentine economic crisis",
        "date" : 1999
    },
    {
        "name" : "Bursting of dot-com bubble – speculations concerning internet companies crashed",
        "date" : 2001
    },
    {
        "name" : "Financial crisis of 2007–2008",
        "date" : 2007
    },
    {
        "name" : "European sovereign debt crisis",
        "date" : 2010
    },
    {
        "name" : "Russian financial crisis",
        "date" : 2014
    },
    {
        "name" : "Turkish currency and debt crisis",
        "date" : 2018
    },
    {
        "name" : "COVID-19 pandemic. Stock market crash",
        "date" : 2020
    }
]

const historyPoints = [
    { 
        "name": "Marina Bay Street Circuit",
        "icon": "car",
        "type": "Point", 
        "image": "pic_27.jpg",
        "description" : `
        <p>The Marina Bay Street Circuit (otherwise known as the Singapore Street Circuit) is a street circuit around Marina Bay, Singapore, encompassing the planning areas of Downtown Core (Turns 4 to 23) and Kallang (Turns 1 to 3). It is the venue for the Singapore Grand Prix. The track is 5.063 km (3.146 mi) long in a harbourside location similar in style to the Circuit de Monaco and the Valencia Street Circuit.</p>
        <p>The circuit is designed by KBR, Inc., a modification of the original one first proposed by Hermann Tilke. The circuit has a FIA Grade 1 license. The circuit holds a unique record of having at least one safety car appearance in every race to date. There has been a total of 21 safety car deployments in twelve races.</p>`,
        "date": 2008, 
        "geom": [103.86435985565186, 1.2900335273724657] 
    }, { 
        "type": "Point", 
        "icon": "building",
        "name": "Osome Pte. Ltd.", 
        "image": "pic_26.jpeg", 
        "description":`<p>We combine our experience and personal care with the efficiency of artificial intelligence. We manage your incorporation, secretary & accounting in Singapore online. Save time, free your mind and focus on your business with OSOME!</p>`,
        "date": 2017, 
        "geom": [103.8493287563324, 1.2801064870177117] 
    }, { 
        "type": "Point", 
        "icon": "building",
        "name": "Marina Bay Sands",
        "image": "pic_25.jpg", 
        "description" : `
        <p>Marina Bay Sands is an integrated resort fronting Marina Bay in Singapore, owned by the Las Vegas Sands corporation. At its opening in 2010, it was billed as the world's most expensive standalone casino property at S$8 billion ($5.88 billion USD), including the land cost. The resort includes a 2,561-room hotel, a 120,000-square-metre (1,300,000 sq ft) convention-exhibition centre, the 74,000-square-metre (800,000 sq ft) The Shoppes at Marina Bay Sands mall, a museum, two large theatres, "celebrity chef" restaurants, two floating Crystal Pavilions, art-science exhibits, and the world's largest atrium casino with 500 tables and 1,600 slot machines. The complex is topped by a 340-metre-long (1,120 ft) SkyPark with a capacity of 3,900 people and a 150 m (490 ft) infinity swimming pool, set on top of the world's largest public cantilevered platform, which overhangs the north tower by 67 m (220 ft). The 20-hectare resort was designed by Moshe Safdie architects.</p>`,
        "date": 2010, 
        "geom": [103.86075496673584, 1.2838123720725012] 
    }, { 
        "type": "Point", 
        "icon": "building",
        "name": "ArtScience Museum", 
        "image": "pic_24.jpg",
        "description": `
        <p>ArtScience Museum is a museum located within the integrated resort of Marina Bay Sands in the Downtown Core of the Central Area in Singapore. Opened on 17 February 2011 by Singapore's Prime Minister Lee Hsien Loong, it is the world's first ArtScience museum, featuring major exhibitions that blend art, science, culture and technology.</p>`,
        "date": 2011, 
        "geom": [103.85916709899902, 1.2861506701544758] 
    }, { 
        "type": "Point", 
        "icon": "garden",
        "name": "Gardens by the Bay", 
        "description":`<p>The Gardens by the Bay is a nature park spanning 101 hectares (250 acres) in the Central Region of Singapore, adjacent to the Marina Reservoir. The park consists of three waterfront gardens: Bay South Garden (in Marina South), Bay East Garden (in Marina East) and Bay Central Garden (in Downtown Core and Kallang). The largest of the gardens is the Bay South Garden at 54 hectares (130 acres) designed by Grant Associates. Its Flower Dome is the largest glass greenhouse in the world.</p>`,
        "image": "pic_23.jpg",
        "date": 2012, 
        "geom": [103.8641881942749, 1.2819996532802704] 
    }, { 
        "type": "Point", 
        "name": "Esplanade", 
        "description":`<p>Esplanade – Theatres on the Bay (also known as the Esplanade Theatres or simply The Esplanade) is a performing arts centre located in Downtown Core near the mouth of the Singapore River. Named after the nearby Esplanade Park, it consists of a concert hall which seats about 1,600 and a theatre with a capacity of about 2,000 for the performing arts.</p>`,
        "image": "pic_22.jpg",
        "date": 2005, 
        "geom": [103.85565876960754, 1.2897439222041431] 
    }, { 
        "type": "Point", 
        "icon": "building",
        "name": "OCBC Centre", 
        "description":`<p>OCBC Centre is a 197.7 m (649 ft), 52-storey skyscraper in Singapore. serving as the current headquarters of OCBC Bank, the building was completed in 1976 and was the tallest building in the country, and South East Asia, at that time. There are two extensions, OCBC Centre South and OCBC Centre East. There is an Executive Club on one of the higher floors of the building. OCBC Centre East has food and beverage outlets.</p>`,
        "image": "pic_21.jpg",
        "date": 1976, 
        "geom": [103.84904980659485, 1.2850351520704437] 
    }, { 
        "type": "Point", 
        "icon": "building",
        "name": "Buddha Tooth Relic Temple and Museum", 
        "description":`<p>The Buddha Tooth Relic Temple and Museum is a Buddhist temple and museum complex located in the Chinatown district of Singapore.</p>`,
        "image": "pic_20.jpg",
        "date": 2005, 
        "geom": [103.8442325592041, 1.2814740718519217] 
    }, { 
        "type": "Point", 
        "icon": "building",
        "name": "One Raffles Place", 
        "description":`<p>One Raffles Place, formerly Overseas Union Bank Centre or OUB Centre is one of the tallest skyscrapers in the city of Singapore. It was the tallest together with the UOB Plaza and Republic Plaza until the construction of Guoco Tower in 2016. The building sits at the city centre of Raffles Place.</p>`, 
        "image": "pic_19.jpg",
        "date": 1986, 
        "geom": [103.85105609893799, 1.284649011081671] 
    }, { 
        "type": "Point", 
        "icon": "building",
        "name": "Singapore Land Tower", 
        "description":`<p>Singapore Land Tower is a 48-storey 190 m (620 ft) skyscraper located in the central business district of Singapore. The tower is located at 50 Raffles Place, adjacent to Raffles Place MRT station. It is just 100 metres away from Boat Quay and Collyer Quay.</p>
        <p>The Embassy of Germany is located on the 12th floor, Embassy of Ukraine is on the 16th floor and the Embassy of Colombia occupies the 30th floor of the building.</p>`,
        "image": "pic_18.jpg",
        "date": 1980, 
        "geom": [103.85200023651122, 1.2846811894996435] 
    }, { 
        "type": "Point", 
        "icon": "building",
        "name": "Republic Plaza", 
        "description": `<p>Republic Plaza is a skyscraper in Downtown Core, Singapore. It formerly shared the title of "tallest building" with the OUB Centre and UOB Plaza One, until the completion of Tanjong Pagar Centre in 2016. At a height of 280 meters, it was officially opened on 18 January 1998 and incorporates earthquake proof features despite the city being relatively far from earthquake zones.</p>`,
        "image": "pic_17.jpg",
        "date": 1996, 
        "geom": [103.85092735290527, 1.2829435543501144] 
    }, { 
        "type": "Point", 
        "icon": "building",
        "name": "Treasury Building (now AXA Tower)", 
        "description":`<p>Built in 1986 as Treasury Building, it has 52 stories and is one of the prominent buildings in the business district. The tower houses 16 double deck elevators supplied by Otis. Singapore's present Prime Minister, Lee Hsien Loong, once had his office in the building. The building was renamed to Temasek Tower (Chinese: 淡马锡大厦) when the Ministry of Finance relocated to The Treasury on High Street. Advertising agency BBDO Worldwide hosts its Asia Pacific Headquarters in there.</p>`,
        "image": "pic_16.jpg",
        "date": 1986, 
        "geom": [103.84721517562866, 1.2756819428547417] 
    }, { 
        "type": "Point",
        "icon": "building",
        "name": "CPF Building", 
        "description":`<p>The former CPF Building was a high-rise skyscraper located in the central business district of Singapore. The tower was located on 79 Robinson Road, in the Shenton Way and Tanjong Pagar zone. The building was near several other skyscrapers such as DBS Building Tower One, SIA Building and Capital Tower, which are all about 100 metres away from the building's former site.</p>`,
        "image": "pic_15.jpeg",
        "date": 1976, 
        "geom": [103.8479608297348, 1.2769851730180488] 
    }, { 
        "type": "Point", 
        "icon": "building",
        "name": "DBS Tower", 
        "description":`<p>The DBS Tower One was finished in 1975, together with a wave of brutalist-style buildings, that dominated the 1950s to 1970s period. It was designed by Architects Team 3. Firms involved in the development of the building included DBS Land Limited, Obayashi-Gumi, Ltd., Steen Consultants Private Limited, Liu Cheng Consulting Engineers, Davis Langdon & Seah Philippines Inc., and Mitsubishi Elevator and Escalator.</p>`,
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
        "description":`<p>Singapore Changi Airport, commonly known as Changi Airport (IATA: SIN, ICAO: WSSS), is a major civilian airport that serves Singapore, and is one of the largest transportation hubs in Asia. It is currently rated the World's Best Airport by Skytrax for the seventh consecutive year since 2013.</p>`,
        "image":"pic_11.jpg",
        "geom":[103.98834228515625,1.354625368768736],
        "type":"Point"
    },{
        "name":"Sembawang Wharves",
        "icon": "port",
        "date": 1971,
        "image": "pic_10.jpg",
        "description":`<p>The Sembawang area in the early twentieth century was the site of the Nee Soon Rubber estate. During the colonial times, Sembawang was home to a major British naval base, its construction of which began in 1928 and was completed in 1938. The base included dockyards, wharves and workshops, as well as supporting administrative, residential and commercial areas. The Naval Base has since been handed over to the Singapore government, which in 1968 converted it into a commercial dockyard (as Sembawang Shipyard, now part of Singapore Exchange-listed SembCorp Marine) that went on to become SembCorp, a major state-owned industrial conglomerate.</p>`,
        "geom":[103.83007049560547,1.4627393356673588],
        "type":"Point"
    },{
        "name":"Singapore Zoo",
        "icon": "zoo",
        "image": "pic_9.jpg",
        "date":1973,
        "description" : `<p>The Singapore Zoo, formerly known as the Singapore Zoological Gardens or Mandai Zoo and now commonly known locally as the Singapore Zoo, occupies 28 hectares (69 acres) on the margins of Upper Seletar Reservoir within Singapore's heavily forested central catchment area. The zoo was built at a cost of $9 million granted by the government of Singapore and opened on 27 June 1973. It is operated by Wildlife Reserves Singapore, who also manage the neighbouring Night Safari, River Safari and the Jurong Bird Park. There are about 315 species of animal in the zoo, of which some 16 percent are considered to be threatened species. The zoo attracts 1.7 million visitors each year.</p>`,
        "geom":[103.79436492919922,1.4037062985935518],
        "type":"Point"
    },{
        "name":"Jurong Island Terminals",
        "icon": "port",
        "image": "pic_8.jpg",
        "date": 1965,
        "description":`<p>In 1963, Jurong Port was set up by the Singapore Economic Development Board (EDB) to support the growth of Singapore's first and biggest industrial estate, Jurong Industrial Estate. In 1965, the port officially commenced operations. In 1968, Jurong Town Corporation (JTC) was set up to drive the industrial estate development in Singapore and Jurong Port became a business division under JTC. On 1 January 2001, Jurong Port was corporatised and became a fully owned subsidiary of JTC Corporation.</p>`,
        "geom":[103.68810653686523,1.2410147076791553],
        "type":"Point"
    },{
        "name":"Pasir Panjang Container Terminal",
        "icon": "port",
        "image": "pic_7.jpg",
        "description":`<p>In 1993, the Port of Singapore Authority (PSA), now corporatised as PSA International, started constructing a new container terminal at Pasir Panjang, the Pasir Panjang Terminal. it is located approximately 7 km west of the company's other container terminals at Keppel Harbour. This new, S$7 billion terminal, represents an immense expansion of PSA's container port. When fully completed in 2009, it is expected to raise PSA's container handling capacity by a further 18 million twenty-foot equivalent units (TEU) per year. The terminal's first four berths, of the planned 26, opened in 1998, with two more berths becoming operational by the time of the terminal's official opening in March 2000. The terminal is slated to cease operations by the year 2040 when the Tuas Megaport is completed and all of PSA assets will be transferred to the new port.</p>`,
        "date": 1974,
        "geom":[103.7742805480957,1.2804872656134916],
        "type":"Point"
    },{
        "name":"Brani Terminal",
        "icon": "port",
        "image":"pic_6.jpg",
        "description":`<p>Subsequently, part of the naval base was redeveloped to build Brani Container Terminal. On 12 October 2000, the rest of the base was officially closed when its facilities were moved to Changi Naval Base. The vacant facilities were taken over by the Singapore Police Force's Police Coast Guard for its new headquarters.</p>`,
        "date": 2000,
        "geom":[103.83333206176758,1.2593781025295887],
        "type":"Point"
    },{
        "name":"Keppel Terminal",
        "icon": "port",
        "image" : "pic_5.jpg",
        "description" : `<p>By the 1980s, maritime trading activity had ceased in the vicinity of the Singapore River except in the form of passenger transport, as other terminals and harbours took over this role. Keppel Harbour is now home to three container terminals. Other terminals were built in Jurong and Pasir Panjang as well as in Sembawang in the north. Today, the port operations in Singapore are handled by two players: PSA International (formerly the Port of Singapore Authority) and Jurong Port, which collectively operate six container terminals and three general-purpose terminals around Singapore.</p>`,
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
    }, {
        "name": "Keong Saik Rd.",
        "icon": "building",
        "date": 1960,
        "image": "pic_28.jpeg",
        "copyright" : `By <a href="https://en.wikipedia.org/wiki/User:Sengkang" class="extiw" title="en:User:Sengkang">User:Sengkang</a> - <span class="int-own-work" lang="en">Own work</span>, <a href="//commons.wikimedia.org/wiki/File:Keong_Saik_Road,_Dec_05.JPG" title="Copyrighted free use">Copyrighted free use</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=561135">Link</a>`,
        "description" : `
            <p>Keong Saik Road was once a red light area in Chinatown in the 1960s, but has since been transformed into a street with many boutique hotels.</p>`,
        "geom": [103.8395349, 1.2808043],
        "type": "Point"
    }, {
        "name": "Clarke Quay",
        "icon": "building",
        "date": 1987,
        "image": "pic_29.jpg",
        "copyright" : `By <a href="//commons.wikimedia.org/w/index.php?title=User:C1815&amp;action=edit&amp;redlink=1" class="new" title="User:C1815 (page does not exist)">C1815</a>. - <span class="int-own-work" lang="en">Own work</span>., <a href="http://creativecommons.org/publicdomain/zero/1.0/deed.en" title="Creative Commons Zero, Public Domain Dedication">CC0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=39129058">Link</a>`,
        "description" : `
            <p>The government cleaned up the Singapore River and its environment from 1977 to 1987. Plans were made to revamp the area and turn it into a flourishing commercial, residential and entertainment precinct. These plans took into serious consideration the historical value of Clarke Quay, making it mandatory that new buildings complement the historical character of the area and that certain old buildings be restored.</p>`,
        "geom": [103.8348516, 1.2834823],
        "type": "Point"
    }
]
    
    for (var i = 0; i < historyPoints.length; i++) {

        for(var d in dates) {

            if (historyPoints[i].date == dates[d].date) { 
                historyPoints[i].dateIndex = dates[d].dateIndex
            }    

        }

        if (!historyPoints[i].dateIndex) historyPoints[i].dateIndex = 0;

        historyPoints[i].id = i;

    }

    for (var i = 0; i < history.length; i++) {

        for(var d in dates) {

            if (history[i].date == dates[d].date) { 
                history[i].dateIndex = dates[d].dateIndex
            }    

        }

        if (!history[i].dateIndex) history[i].dateIndex = 0;

        history[i].id = i;

    }


    return [historyPoints,history];

}