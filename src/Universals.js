const UNIVERSALS = {
    TITLE_MAP: {
        'about-us': '『香港萬國宣道浸信聯會』簡介',
        'download': '下載區',
        'apply-activity': '活動報名',
        'contact-us': '聯絡我們',
        'sunday-service-info': '聚會時間',
        'worship': '網上崇拜',
        'worship-list': '網上崇拜'
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
                        }
                    }
                },
                'church-download': {
                    title: '教會刊物',
                    child: {
                        'download': {
                            title: '教會月刊',
                            link: '/download',
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
    }
}
export default UNIVERSALS;

export function getMenuHierarchy(id, obj, array, foundObj) {
    if(foundObj == null)
        foundObj = {isFound: false}
    let isCurrent = false;
    let currId;
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