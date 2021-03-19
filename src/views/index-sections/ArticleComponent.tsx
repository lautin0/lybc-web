import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import UNIVERSALS from 'Universals';

function ArticleComponent() {

  const intl = useIntl()

  return <div className="section section-about-us">
    <Container>
      <Row>
        <Col className="ml-auto mr-auto text-center" md="8">
          <h2 className="title">{intl.formatMessage({ id: "app.theme2.subtitle" })}</h2>
          <h5 className="description">
            {intl.formatMessage({ id: "app.theme2.l0" })}
          </h5>
        </Col>
      </Row>
      <div className="separator separator-primary"></div>
      <div className="section-story-overview">
        <Row>
          <Col md="6">
            <div
              className="image-container image-left"
              style={{
                backgroundImage:
                  "url(" + UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + "/lybcstorage/pray.jpg)"
              }}
            >
              <p className="blockquote blockquote-info">
                "我又告訴你們，你們當中若有兩個人，在地上同心為甚麼事祈求，我在天上的父必為他們成全。 因為無論在哪裡，有兩三個人奉我的名聚會，我就在他們中間。”<br></br>
                <br></br>
                <small>-馬太福音 18:19-20</small>
              </p>
            </div>
            <div
              className="image-container"
              style={{
                backgroundImage:
                  "url(" + UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + "/lybcstorage/towards_light.jpg)"
              }}
            ></div>
          </Col>
          <Col md="5">
            <div
              className="image-container image-right"
              style={{
                backgroundImage:
                  "url(" + UNIVERSALS.GOOGLE_STORAGE_ENDPOINT + "/lybcstorage/bible_white.jpg)"
              }}
            ></div>
            {/* <h3>
              So what does the new record for the lowest level of winter
              ice actually mean
            </h3>
            <p><strong>天寒，樹葉落下，露出樹幹。 沒有了遮掩，沒有了自建的掩護，那支撐著我們的，清清楚楚就是主自己。</strong></p>
            <p>基督徒若不被外在東西蒙蔽，是會常作出反思，檢視內在生命，並追求向善，這正是聖靈內住，以人心靈為居所的明證。（弗2：22）聖靈引導我們去回應上帝，對周遭的事作出沉思的屬靈反應，因此而勤加禱告，領悟神旨，醒覺中得真道。所以，基督徒是修道又行道者。（詩33：15）我們行步見道，見道又行步。這初心還在嗎？</p>
            <p>這年頭，面對種種的變化和衝擊，原來是替我們的生活作出大清洗，縱使幾令人不習慣，甚或討厭，卻狠狠地使我們現出了本相。我們不可不知，神正正喜悅這樣的兒女---放下許多，許多外在東西，跳出對世間的夢幻寄望，坦然地以本相與神面對面。</p>
            <p>初心再現！我們當緊緊握著從主而得的兩大寶物——禱告和屬靈友伴。也許曾經因灰心而借故忘掉、曾因自滿而不知不覺失落了。現在，是時候了，尋回初心，看見昔日的自己。我，你，他，當天是那麼單純地去愛，臉上掛著小孩子般的笑容，喜歡向神傾訴心事，一點點生活鎖事都可以歡歡喜喜跟弟兄姊妹促膝詳談，數算恩典。 一種基督徒嚮往的生活！</p>
            <p>在教會尋得結伴同行天路的弟兄姊妹，這是充滿驚喜的關係，在不歸路上，把臂走上天路，經歷生命。這關係，又在一次又一次的禱告之後，變得親密，非比世間尋常的友誼。我雖然信主多年，但當年我初進入教會時的那份感覺，仍是十分深刻，不是說沒有芥蒂，沒有隔膜，一拍即合，而是以單純的心看待別人，不帶著什麼多餘的想法，當有人說要為我禱告，便開懷地接受，也步上為人代禱的行列之中。</p>
            <p>教會是一個大家庭，既然稱之為家，就有家的美好元素和特質。2021年，請把這句話牢記在心『屬靈禱伴，關愛同行』。願主帶我們重見初心！</p> */}
          </Col>
        </Row>
      </div>
    </Container>
  </div>
}

export default ArticleComponent;