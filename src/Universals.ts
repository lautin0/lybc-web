import jwt_decode from "jwt-decode";

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
            <a class="btn btn-warning" style="font-size: 24px;" href="/worship/20200614">按此進入網上崇拜</a>
        </div>
        <h2 class="text-center w-100"><strong>特別消息</strong></h2>
        <p>因風暴關係，14/6主日崇拜改為網上舉行。</p>
        <p>請留意，下主日至七月初，崇拜繼續於荃灣悅來酒店舉行。</p>
        <p>誠然，我們有共信之道，能向主忠誠，參與崇拜，聽道而行道，在基督身體裡面合而為一。願主得榮耀！</p>
        `,

        TITLE: '教會通告'
    }
}
export default UNIVERSALS;

export function getMenuHierarchy(id: any, obj: any, array: any, foundObj: any) {
    if (foundObj == null)
        foundObj = { isFound: false }
    let isCurrent = false;
    let currId: any;
    if (array == null)
        array = []
    if (obj == null)
        obj = UNIVERSALS.MENU_HIERARCHY
    if (Object.keys(obj).includes(id)) {
        array.unshift({ title: obj[id].title, link: null })
        isCurrent = true;
        foundObj.isFound = true;
    }
    Object.keys(obj).forEach(e => {
        if (obj[e] != null && obj[e].child != null) {
            if (!foundObj.isFound) {
                currId = e
                return getMenuHierarchy(id, obj[e].child, array, foundObj)
            }
        }
    });
    if (foundObj.isFound && !isCurrent) {
        array.unshift({ title: obj[currId].title, link: obj[currId].link })
    }
    return array
}

export function getTokenValue(jwt: any) {
    let authObject: any
    if (jwt) {
        authObject = jwt_decode(jwt);
    }
    return authObject
}