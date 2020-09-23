import jwt_decode from "jwt-decode";

type UniversalsInfo = {
    TITLE_MAP: any
    MENU_HIERARCHY: any,
    NOTIFICATION: any,
    GRAPHQL_ENDPOINT: string
}

export enum Role {
    ADMIN = "ADMIN",
    MEMBER = "MEMBER",
    WORKER = "WORKER"
}

const UNIVERSALS: UniversalsInfo = {
    TITLE_MAP: {
        'about-us': { title: '『香港萬國宣道浸信聯會』簡介', subtitle: null, bg: 13 },
        'journal': { title: '教會月刊', subtitle: null, bg: 1 },
        'apply-activity': { title: '活動報名', subtitle: null },
        'contact-us': { title: '聯絡我們', subtitle: null, bg: 13 },
        'sunday-service-info': { title: '聚會時間', subtitle: null, bg: 13 },
        'worship': { title: '網上崇拜', subtitle: null },
        'worship-list': { title: '網上崇拜', subtitle: `我要聽　神—耶和華所說的話，因為他必應許賜平安給他的百姓，就是他的聖民；
        他們卻不可再轉向愚昧。他的救恩誠然與敬畏他的人相近，
        使榮耀住在我們的地上。
        (詩篇 85:8-9 和合本2010)`, bg: 11 },
        'doctrine':{ title: '綠楊浸信會會章之基本信條及聖禮', subtitle: null, bg: 13 },
        'preacher-message': { title: '牧者的話', subtitle: '黃雪梅 主任傳道', bg: 8 },
        'sharing-list': { title: '分享欄', subtitle: null, bg: 1 },
        'sharing': { title: '分享欄', subtitle: null }
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
                            title: '關於聯會',
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
                        },
                        'sharing-list': {
                            title: '分享欄',
                            link: '/sharing-list',
                            child: {
                                'sharing': {
                                    title: '文章',
                                }
                            }
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
    // NOTIFICATION: { MESSAGE: null }
    NOTIFICATION: {
        MESSAGE: `
        <div class="mb-5 text-center w-100">
            <a class="btn btn-warning" style="font-size: 24px;" href="/worship/20200920">前往網上崇拜錄播</a>
        </div>
        <p><b>綠楊浸信會應對新型冠狀病毒病疫症措施通告(2020 年 9 月 20 日更新)</b></p>
        <p><b>有鑑新型冠狀病毒病疫情嚴峻，為避免交叉感染，教會安排如下🔖:</b></p>
        <p><b>1. 本周所有聚會及主日崇拜，以及主日各聚會取消。建議信徒留在家中參與網上崇拜😇。</b></p>
        <p><b>2. 在此期間，南豐辦公室及綠楊教會並不向外開放。🚪</b></p>
        <p><b>3. 縱然教會肢體未能聚會見面，我們可透過電子媒介/平台，或直接電話問候，彼此代禱，保持緊密聯繫，彰顯主愛。💖 🙏🏻</b></p>
        <p><b>4. 請多留意政府疫情公布，及配合醫管局呼籲，使用有關防禦方法，保持個人衛生。😷如有肢體需要進入14天隔離，或有情況出現，請立刻通知牧者。🕎✝</b></p>
        <b>奉獻途徑（在這段停止崇拜聚會期適用）</b><br>
        <b>可以透過以下方法:</b></br>
        <b>1. 入數: 本堂戶口（滙豐銀行<label class="ml-1" style="color: gray;font-size: 18px">119-379-295-001</label>)</b></br>
        <b>2. 支票:抬頭“綠楊浸信會有限公司”。</b></br>
        <b>請注意: </b></br>
        <b>1. 請把入數紙whatsapp到教會電話號碼:<label class="ml-1" style="color: gray;font-size: 18px">94331359</label>，並註明奉獻者姓名，或致電<label class="ml-1" style="color: gray;font-size: 18px">24938994</label> 聯絡同工</b></br>
        <b>2.請在支票的背頁，清楚寫上奉獻者姓名電話，並寄回綠楊浸信會，辦公室地址:「荃灣青山公路264-298號，南豐中心20樓02D室」</b></br>
        <b>* 同工收到你的奉獻後會儘快跟你聯絡及確認。(注意 : 31/3是本財政年度奉獻結算)</b></br>
        <br><h3>綠楊浸信會 謹啟💟</h3>
        `,

        TITLE: '教會通告'
    },
    // GRAPHQL_ENDPOINT: "https://tinyuku-go.herokuapp.com/query"
    GRAPHQL_ENDPOINT: "http://localhost:8080/query"
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
        try{
            authObject = jwt_decode(jwt);
        } catch {
            return null
        }
    }
    return authObject
}

export function isTokenExpired(jwt: any){
    let token = getTokenValue(jwt)
    if(token == null)
        return true
    return Date.now() >= token.exp * 1000        
}

export function hasRole(jwt: any, role: Role){
    let token = getTokenValue(jwt)
    if(token == null)
        return false
    return role.toString().toUpperCase() === token.role.toUpperCase()
}