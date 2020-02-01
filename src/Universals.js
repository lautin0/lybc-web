const UNIVERSALS = {
    TITLE_MAP: {
        'about-us': '『香港萬國宣道浸信聯會』簡介',
        'download': '下載區'
    },
    MENU_HIERARCHY: {
        index: {
            title: '主頁',
            link: '/',
            child: {
                'about-church': {
                    title: '認識綠楊',
                    child: {
                        'about-us': {
                            title: '關於我們',
                            link: '/about-us',
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
    if(foundObj.isFound && !isCurrent && currId != null){
        array.unshift({title: obj[currId].title, link: obj[currId].link })
    }
    return array
}