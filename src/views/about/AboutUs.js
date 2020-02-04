import React from "react";

// reactstrap components
import { Button, Container, Row, Col, UncontrolledTooltip } from "reactstrap";

// core components

function AboutUs() {

  //Default scroll to top
  window.scrollTo(0,0)

  return (
    <>
      <div
        //className="section section-download"
        className="section"
        // data-background-color="black"
        id="about-us-section"
      >
        <Container>
          <Row className="justify-content-md-center">
            <Col className="text-left" lg="8" md="12">
              {/* <h3 className="title">『香港萬國宣道浸信聯會』簡介</h3> */}
              <h3 style={{fontWeight: 'bold'}}>(一) 聯會成立的歷史</h3>
              <h5 className="">
              『萬國宣道浸信會香港工場議會』於一九五一年開始在本港宣教並建立教會，而各教會在神的帶領下亦紛紛自立及聘用本地的教牧同工。
              在一九八二年，一班姊妹教會的牧者看到各教會既出於同一差會，建基於同一信仰，彼此應有更密切的交通、禱告及支持。
              故產生成立聯會的意念，透過聯繫推展那需要集體力量的事工，達致造就信徒及拓展天國的目的。
              聯會參照腓立比書一章廿七節下作為會訓：『我們同有一個心志，站立得穩，為所信的福音齊心努力』，而這正是聯會成立的宗旨。
              在同工的推動下，終於一九八三年一月一日正式成立『萬國宣道浸信聯會』，更在一九九二年六月三十日成功地向政府申請為非牟利的團體。
              隨著ABWE家族的發展，為了讓教會及機構能建立更緊密的合作關係，同心事奉；並藉以保持ABWE宗派的特色/信仰，集合力量，發展聖工。
              故於二零零九年四月十六日正式更改名稱為『香港萬國宣道浸信聯會』。
              </h5>
              <h3 style={{marginTop: 70, fontWeight: 'bold'}}>(二) 聯會現有的堂會與宗旨</h3>
              <h5 className="">
              聯會在開始時由宣道浸信會、學基浸信會、和樂浸信會及葵興浸信會（現稱荃灣眾安浸信會）四所教會組成。時至今日，聯會的會員堂會/機構共有二十八間，姊妹堂會八間。聯會的宗旨有下列四點：
              <ol>
                <li>為本聯會會員提供彼此交通、代禱、勉勵及互助的機會。</li>
                <li>協助維護浸信會一貫之特徵，在真道上同歸於一，務使教會信仰保持純正。</li>
                <li>協助各會員合力籌辦本地較大型的福音事工。</li>
                <li>聯會除要求會員接納聯會的會章及信條外，不干涉會員教會的內政事務，除該會員教會主動求助則屬例外。</li>
              </ol>
              </h5>
              <h3 style={{marginTop: 70, fontWeight: 'bold'}}>(三）聯會四大異象</h3>
              <h5 className="">
              <ol>
                <li>本地福音同興旺<br/>
                聯會致力協助各教會植堂或擴堂事工，並推動聯合佈道、傳揚福音。</li>
                <li>信仰本色顯主恩<br/>
                按浸信會的主要治會立場為各堂會高度自主獨立。然而大家既同出一源，理應探討本源之信仰立場及信念，是否在現今年代有保留及修改的必要，同時可確立本宗派的立場。</li>
                <li>同工靈命互支持<br/>
                鑑於聯會各堂會多為中小型教會，教牧同工人手不足，同工也多感孤單，故聯會建立同工支持系統，以學術、禱告的支持，使同工得到更新與成長。</li>
                <li>家族資源齊共享<br/>
                聯會推動各堂彼此共享資源，有特別聚會互通消息，彼此祝福。</li>
              </ol>
              </h5>
              <h3 style={{marginTop: 70, fontWeight: 'bold'}}>(四) 四大事工方向</h3>
              <h5 className="">
              <ol>
                <li>聖樂詠團事工<br/>
                於1992年成立『萬國宣道詠團』，定期舉辦聖樂培靈會、詩班研討會、聖樂佈道會及短宣體驗等，在本地、國內及海外服侍教會並宣揚福音。</li>
                <li>本地福音事工<br/>
                主要籌辦聯合佈道聚會、籃球福音盃等。</li>
                <li>聯誼訓練事工<br/>
                定期舉辦分享祈禱會、研討會及各類型訓練和聯誼活動，以增進堂會同工、執事、肢體間的交誼與成長。</li>
                <li>文字事工<br/>
                聯會定期出版通訊錄及《聯會之聲》等，促進眾教會肢體彼此聯絡、交流經驗、分享事奉心得和感恩代禱事項。</li>
              </ol>
              </h5>
            </Col>
            {/* <Col className="text-center" lg="8" md="12">
              <Button
                className="btn-round mr-1"
                color="info"
                href="https://www.creative-tim.com/product/now-ui-kit-react?ref=nukr-index-page"
                role="button"
                size="lg"
              >
                Download React
              </Button>
              <Button
                className="btn-round"
                color="primary"
                href="https://www.invisionapp.com/now?ref=creativetim"
                outline
                role="button"
                size="lg"
                target="_blank"
              >
                Download PSD/Sketch
              </Button>
            </Col> */}
          </Row>
          <Row className="text-center mt-5">
            <Col className="ml-auto mr-auto" md="8">
              <h4 style={{fontSize: 24, fontWeight: 'bold'}}>我們同有一個心志，站立得穩，為所信的福音齊心努力。(腓1：27下)</h4>
              {/* <h5 className="">
                We're going to launch{" "}
                <a
                  href="http://demos.creative-tim.com/now-ui-kit-pro-react/#/presentation?ref=nukr-index-page"
                  onClick={e => e.preventDefault()}
                >
                  Now UI Kit PRO React
                </a>
                . It will have huge number of components, sections and example
                pages so you can start your development with a badass Bootstrap
                4 UI Kit.
              </h5> */}
            </Col>
            {/* <Col md="12">
              <Button
                className="btn-neutral btn-round"
                color="default"
                href="http://demos.creative-tim.com/now-ui-kit-pro-react/#/presentation?ref=nukr-index-page"
                size="lg"
                disabled
              >
                <i className="now-ui-icons arrows-1_share-66 mr-1"></i>
                Upgrade to PRO
              </Button>
            </Col> */}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default AboutUs;
