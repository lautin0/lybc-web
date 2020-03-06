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
    },
    NOTIFICATION: {
        MESSAGE: `
        <p>綠楊浸信會應對武漢肺炎疫症措施通告(2020 年 3 月 5 日更新)</p><p><br></p>
        <p>有鑑武漢肺炎疫情嚴峻，為避免交叉感染，教會安排如下🔖:</p><p><br></p>
        <p>1. 本周所有聚會及主日崇拜，以及主日各聚會取消。建議信徒留在家中參與網上崇拜😇。</p>
        <div class="text-center w-100">
            <a class="btn btn-warning" style="font-size: 24px;" href="/worship/20200308">前往網上崇拜錄播</a>
        </div>
        <br>
        <p>2. 在此期間，南豐辦公室及綠楊教會並不向外開放。🚪</p><p><br></p>
        <p>3. 縱然教會肢體未能聚會見面，我們可透過電子媒介/平台，或直接電話問候，彼此代禱，保持緊密聯繫，彰顯主愛。💖 🙏🏻</p>
        <p><br></p><p>4. 請多留意政府疫情公布，及配合醫管局呼籲，使用有關防禦方法，保持個人衛生。😷如有肢體需要進入14天隔離，或有情況出現，請立刻通知牧者。🕎✝</p>
        <p><br></p><h3>綠楊浸信會 謹啟💟</h3>`,

        TITLE: '教會通告'
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