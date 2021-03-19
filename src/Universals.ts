import bg1 from "assets/img/bg1.jpg"
import bg13 from "assets/img/bg13.jpg"
import bg11 from "assets/img/bg11.jpg"
import bg8 from "assets/img/bg8.jpg"
import sermon from 'assets/img/sermon.jpg'
import microphone from 'assets/img/microphone.jpg'
import signpost from 'assets/img/signpost_md.jpg'
import news from "assets/img/lightbulb.jpg";

type UniversalsInfo = {
    TITLE_MAP: any
    MENU_HIERARCHY: any,
    NOTIFICATION: any,
    GRAPHQL_ENDPOINT: string,
    GOOGLE_STORAGE_ENDPOINT: string
}

const googleEndPoint = "https://storage.googleapis.com"

const UNIVERSALS: UniversalsInfo = {
    TITLE_MAP: {
        'about-us': { title: 'app.title.about-us', subtitle: null, bg: bg13 },
        'journal': { title: 'app.title.journal', subtitle: null, bg: googleEndPoint + "/lybcstorage/reading.jpg" },
        'apply-activity': { title: 'app.title.apply-activity', subtitle: null },
        'contact-us': { title: 'app.title.contact-us', subtitle: null, bg: signpost },
        'sunday-service-info': { title: 'app.title.sunday-service-info', subtitle: null, bg: bg13 },
        'worship': { title: 'app.title.worship', subtitle: null },
        'worship-list': { title: 'app.title.worship', subtitle: 'app.subtitle.worship', bg: sermon },
        'doctrine':{ title: 'app.title.doctrine', subtitle: null, bg: bg13 },
        'careers':{ title: 'app.title.careers', subtitle: null, bg: bg13 },
        'preacher-message': { title: 'app.title.preacher-message', subtitle: 'app.subtitle.preacher-message', bg: bg8 },
        'sharing-list': { title: 'app.title.sharing', subtitle: null, bg: microphone },
        'sharing': { title: 'app.title.sharing', subtitle: null },
        'library': { title: 'app.title.books-enquiry', subtitle: null },
        'news': { title: 'app.latest-updates', subtitle: null },
        'news2': { title: 'app.latest-updates', subtitle: null },
        'news-list': { title: 'app.latest-updates', subtitle: null, bg: news }
    },
    MENU_HIERARCHY: {
        index: {
            title: 'app.breadcrumb.index',
            link: '/',
            child: {
                'activity': {
                    title: 'app.menu.activity',
                    child: {
                        'apply-activity': {
                            title: 'app.title.apply-activity',
                            link: '/apply-activity',
                        }
                    }
                },
                'about-church': {
                    title: 'app.menu.about-us.lybc',
                    child: {
                        'about-us': {
                            title: 'app.menu.about-us.abwe',
                            link: '/about-us',
                        },
                        'contact-us': {
                            title: 'app.menu.about-us.contact',
                            link: '/contact-us',
                        },
                        'sunday-service-info': {
                            title: 'app.menu.about-us.timetable',
                            link: '/sunday-service-info',
                        },
                        'doctrine': {
                            title: 'app.menu.about-us.doctrine',
                            link: '/doctrine',
                        },
                        'careers': {
                            title: 'app.title.careers',
                            link: '/careers',
                        }
                    }
                },
                'articles': {
                    title: 'app.menu.resources',
                    child: {
                        'journal': {
                            title: 'app.menu.resources.journal',
                            link: '/journal',
                        },
                        'preacher-message': {
                            title: 'app.menu.about-us.preacher-message',
                            link: '/preacher-message',
                        },
                        'sharing-list': {
                            title: 'app.menu.resources.sharing',
                            link: '/sharing-list',
                            child: {
                                'sharing': {
                                    title: 'app.breadcrumb.article',
                                }
                            }
                        }
                    }
                },
                'news-list': {
                    title: 'app.latest-updates',
                    link: '/news-list',
                    child: {
                        'news': {
                            title: "app.content",                            
                        },
                        'news2': {
                            title: "app.content",                            
                        },
                    }
                },
                'worship-list': {
                    title: 'app.breadcrumb.online-sermon',
                    link: '/worship-list',
                    child: {
                        'worship': {
                            title: 'app.menu.activity.online-sermon',
                        }
                    }
                },
            }
        },
    },
    // NOTIFICATION: { MESSAGE: null }
    NOTIFICATION: {
        MESSAGE: `
        <p><b>綠楊浸信會應對新型冠狀病毒病疫症措施通告{1}</b></p>
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
        <b>1. 請把入數紙whatsapp到教會電話號碼:<label class="ml-1" style="color: gray;font-size: 18px">94331359</label>，並註明奉獻者姓名</b></br>
        <b>2.請在支票的背頁，清楚寫上奉獻者姓名電話，並寄回綠楊浸信會，辦公室地址:「荃灣青山公路264-298號，南豐中心20樓02D室」</b></br>
        <b>* 同工收到你的奉獻後會儘快跟你聯絡及確認。</b></br>
        <br><h3>綠楊浸信會 謹啟💟</h3>
        `,
        // MESSAGE: `
        // <div class="mb-5 text-center w-100">
        //     <a class="btn btn-warning" style="font-size: 24px;" href="/worship/{0}">前往網上崇拜錄播</a>
        // </div>
        // <p><b>綠楊浸信會應對新型冠狀病毒病疫症措施通告{1}</b></p>
        // <p><b>有鑑新型冠狀病毒病疫情嚴峻，為避免交叉感染，教會安排如下🔖:</b></p>
        // <p><b>1. 本周所有聚會及主日崇拜，以及主日各聚會取消。建議信徒留在家中參與網上崇拜😇。</b></p>
        // <p><b>2. 在此期間，南豐辦公室及綠楊教會並不向外開放。🚪</b></p>
        // <p><b>3. 縱然教會肢體未能聚會見面，我們可透過電子媒介/平台，或直接電話問候，彼此代禱，保持緊密聯繫，彰顯主愛。💖 🙏🏻</b></p>
        // <p><b>4. 請多留意政府疫情公布，及配合醫管局呼籲，使用有關防禦方法，保持個人衛生。😷如有肢體需要進入14天隔離，或有情況出現，請立刻通知牧者。🕎✝</b></p>
        // <b>奉獻途徑（在這段停止崇拜聚會期適用）</b><br>
        // <b>可以透過以下方法:</b></br>
        // <b>1. 入數: 本堂戶口（滙豐銀行<label class="ml-1" style="color: gray;font-size: 18px">119-379-295-001</label>)</b></br>
        // <b>2. 支票:抬頭“綠楊浸信會有限公司”。</b></br>
        // <b>請注意: </b></br>
        // <b>1. 請把入數紙whatsapp到教會電話號碼:<label class="ml-1" style="color: gray;font-size: 18px">94331359</label>，並註明奉獻者姓名</b></br>
        // <b>2.請在支票的背頁，清楚寫上奉獻者姓名電話，並寄回綠楊浸信會，辦公室地址:「荃灣青山公路264-298號，南豐中心20樓02D室」</b></br>
        // <b>* 同工收到你的奉獻後會儘快跟你聯絡及確認。</b></br>
        // <br><h3>綠楊浸信會 謹啟💟</h3>
        // `,
        // MESSAGE: `
        // <div class="mb-5 text-center w-100">
        //     <a class="btn btn-warning" style="font-size: 24px;" href="/worship/{0}">前往網上崇拜直播</a>
        // </div>
        // <h3><strong>本週備忘</strong></h3>
        // <h4><b>主日聚會重啟</b></h4>
        // <p><b>需留意做好防疫措施，並在不違法的前提下，遵守以下規定：</b></p>
        // <p><b>1. 聚會活動須以預約形式進行，且不多於聚會人數上限的一半。</b></p>
        // <p><b>2. 所有參與聚會活動人士，均須量度體溫、佩帶口罩，以及填寫健康申報紀錄。</b></p>
        // <p><b>3. 參與聚會活動人士，不能於中心內飲食(聖餐除外)。</b></p>
        // <p><b>4. 社社交距離應盡量保持不少於一米(同住家人除外)。</b></p>
        // <p><b>崇拜座位安排，以上限4人為一組，組與組之間應保持不少於一米距離。</b></p>
        // `,
        TITLE: 'app.church-notice'
    },
    GRAPHQL_ENDPOINT: "https://tinyuku-go.herokuapp.com/query",
    // GRAPHQL_ENDPOINT: "http://localhost:8080/query",
    GOOGLE_STORAGE_ENDPOINT: googleEndPoint
}
export default UNIVERSALS;