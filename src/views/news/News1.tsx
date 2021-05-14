import moment from 'moment';
import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { FormattedDate } from 'react-intl';

function News1() {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return <div className="section">
        <Container style={{ borderRadius: '.5rem', marginBottom: 100 }}>
            <Row className="d-block d-md-none text-left" style={{ alignItems: 'baseline' }}>
                <Col><h2><strong>記念聖灰日</strong></h2></Col>
            </Row>
            <Row className="d-none d-md-block text-center" style={{ alignItems: 'baseline' }}>
                <Col><h2><strong>記念聖灰日</strong></h2></Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col className="text-left sharing my-3 d-flex" lg="8" md="12" >
                    <div className="my-auto" style={{ color: 'gray' }}>
                        <div><i>{<FormattedDate
                            value={moment('2021-02-17', 'YYYY-MM-DD').toDate()}
                            year="numeric"
                            month="short"
                            day="numeric"
                        />}</i></div>
                    </div>
                </Col>
            </Row>
            {/* {post.imageURI != null && <Row className="d-flex justify-content-md-center mb-5">
            <Col className="text-center" lg="8" md="12"><img src={`${UNIVERSALS.GOOGLE_STORAGE_ENDPOINT}${post.imageURI}`}></img></Col>
        </Row>} */}
            <Row className="justify-content-md-center">
                <Col className="text-left sharing" lg="8" md="12">
                    <div><p>【大齋期】</p><p> 大齋期又稱四旬期，是教會年曆中的一個重要節期，由塗灰日至復活前夕的星期六（主日不算在內），為期四十日。這是仿效耶穌基督在曠野禁食四十晝夜，抗拒魔鬼試探。教會鼓勵信徒在這段期間多祈檮、讀經、禁食和克己，並且自省悔罪，操練自己靈命，預備迎接耶穌復活。</p><p> 今天是塗灰日，亦是大齋期首日。舊約時代人們會「撒灰」在頭上，以視哀傷和悼念。而早期教會也會為犯重罪的信徒額上塗灰，以示「悔罪」。所以教會會舉行塗灰禮，把去年棕枝主日祝聖過的棕枝燒成灰，留待塗灰日塗在教友的額頭上。這是提醒信徒：人從塵土而來的，終要歸於塵土，因此，應要信福音和悔改。</p><p> 在大齋期中，讓我們多讀聖經，默想基督的受難與受死，並且學習克制自己私慾，謙卑放下自我，活出基督樣式。</p><p> Lent is an important religious observance in the Christian liturgical calendar, which lasts 40 days, from Ash Wednesday to the Saturday before Easter (excluding the Lord's Day). This is to emulate Jesus Christ 40-day-and-night fast in the wilderness, and resistance to the Devil's temptations. The church encourages believers to pray more, read the Bible, fast, and restrict themselves, and repent of their sins, exercise one's spiritual life, and prepare to welcome the resurrection of Jesus.</p><p> Today is Ash Wednesday and the first day of Lent. In the Old Testament era, people would sprinkle ashes on the top of their heads to show grief and mourning. In the early church, believers who committed great sins would also subject to ashes on their heads to show repentance.</p><p> The church will hold a ceremony where the palms blessed in the previous year's Palm Sunday celebration will be burnt to ashes and sprinkled on the foreheads of the church members. This is to remind believers that people who come from dust must return to the dust. Therefore, they should believe in the gospel and repent.</p><p> During Lent, let us read the Bible more, meditate on Christ's suffering and death, and learn to restrain our selfish desires, to humbly let go of ourselves, and live like Christ.</p><hr></hr><p>來源: <a href="https://www.facebook.com/136472649859782/posts/1731165690390462/" target="_blank">道風山基督教叢林 Tao Fong Shan Christian Centre</a></p></div>
                </Col>
            </Row>
        </Container>
    </div>
}

export default News1;