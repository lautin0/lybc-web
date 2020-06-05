type UniversalsInfo = {
    TITLE_MAP: any,
    MENU_HIERARCHY: any,
    NOTIFICATION: any
}

const UNIVERSALS: UniversalsInfo = {
    TITLE_MAP: {
        'about-us': '『香港萬國宣道浸信聯會』簡介',
        'journal': '教會月刊',
        'apply-activity': '活動報名',
        'contact-us': '聯絡我們',
        'sunday-service-info': '聚會時間',
        'worship': '網上崇拜',
        'worship-list': '網上崇拜',
        'doctrine':'綠楊浸信會會章之基本信條及聖禮',
        'preacher-message': '牧者的話'
    },
    MENU_HIERARCHY: {
        index: {
            title: '主頁',
            link: '/',
            child: {
                'activity': {
                    title: '教會活動',
                    child: {
                        'apply-activity': {
                            title: '活動報名',
                            link: '/apply-activity',
                        }
                    }
                },
                'about-church': {
                    title: '認識綠楊',
                    child: {
                        'about-us': {
                            title: '關於我們',
                            link: '/about-us',
                        },
                        'contact-us': {
                            title: '聯絡我們',
                            link: '/contact-us',
                        },
                        'sunday-service-info': {
                            title: '聚會時間',
                            link: '/sunday-service-info',
                        },
                        'doctrine': {
                            title: '教會信條',
                            link: '/doctrine',
                        }
                    }
                },
                'articles': {
                    title: '教會刊物',
                    child: {
                        'journal': {
                            title: '教會月刊',
                            link: '/journal',
                        },
                        'preacher-message': {
                            title: '牧者的話',
                            link: '/preacher-message',
                        }
                    }
                },
                'worship-list': {
                    title: '瀏覽網上崇拜',
                    link: '/worship-list',
                    child: {
                        'worship': {
                            title: '網上崇拜',
                        }
                    }
                },
            }
        },
    },
    NOTIFICATION: {
        MESSAGE: `
        <div class="mb-5 text-center w-100">
            <a class="btn btn-warning" style="font-size: 24px;" href="/worship/20200531">本週分享主日</a>
        </div>
        <p><h3>教會回覆實體主日崇拜(6月7日開始) </h3></p>
        <p><b>崇拜地點：荃灣悅來酒店3樓水晶廳 (暫定六月份內四次主日)</b></p>
        <p><b>崇拜時間：上午11:30 - 下午1:00</b></p>
        <p><b>人數上限：50人 (按政府指引，場地可容人數的一半)</b></p>
        <p><b>報名：請出席7/6主日崇拜的肢體，預先向各主日學組長報名，或以Whatapps向教會報名。以便統計出席人數。</b></p>
        <br>
        <p><b>其他消息，請參閱教會程序表。</b></p>
        `,

        TITLE: '教會通告'
    }
}
export default UNIVERSALS;

export function getMenuHierarchy(id: any, obj: any, array: any, foundObj: any) {
    if(foundObj == null)
        foundObj = {isFound: false}
    let isCurrent = false;
    let currId: any;
    if(array == null)
        array = []
    if(obj == null)
        obj = UNIVERSALS.MENU_HIERARCHY
    if(Object.keys(obj).includes(id)){
        array.unshift({title: obj[id].title, link: null })
        isCurrent = true;
        foundObj.isFound = true;
    }    
    Object.keys(obj).forEach(e => {
        if(obj[e] != null && obj[e].child != null){
            if(!foundObj.isFound){
                currId = e
                return getMenuHierarchy(id, obj[e].child, array, foundObj)
            }
        }  
    }); 
    if(foundObj.isFound && !isCurrent){
        array.unshift({title: obj[currId].title, link: obj[currId].link })
    }
    return array
}