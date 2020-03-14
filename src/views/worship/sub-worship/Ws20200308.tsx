import React, { useState, useRef } from "react";
// react-bootstrap components
import { Container, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ReactToPrint from "react-to-print";
import DOMPurify from 'dompurify'
import { ComponentToPrintProps } from "./types/types";

function Ws20200308(props: any) {

  const [key, setKey] = useState('home')
  const [data, setData] = useState(`<p><br></p><h2><strong>講題：作耶穌的見證人 </strong>(徒 三1-15)</h2><p><strong><em>主旨：透過跛腳的乞丐得醫治這個神蹟，學習如何更得力去見證主。</em></strong></p><p><br></p><h2><strong>一、前言</strong></h2><p><br></p><p><br></p><p><br></p><h2><strong>二、作耶穌的見證人需要有的三個調整: </strong></h2><p><br></p><h3><strong>a) 不是「自己能力」的問題，而是支取</strong></h3><p><strong> 1 主應許的聖靈大能</strong></p><p><br></p><p><br></p><p><br></p><p><strong> 2 同心禱告的屬靈力量</strong></p><p><br></p><p><br></p><p><br></p><p><strong> 3 耶穌名字的權柄能力</strong></p><p><br></p><p><br></p><p><br></p><p><br></p><h3><strong>b) 不是「自己感覺」的問題，而是需要</strong></h3><p><strong> 1 傳福音的負擔，與感覺無關，</strong></p><p><br></p><p><br></p><p><br></p><p><strong> 2 感通別人靈魂的需要和吶喊</strong></p><p><br></p><p><br></p><p><br></p><p><br></p><h3><strong>c) 不單是生命的改變，而是需要</strong></h3><p><strong> 1 真見證的模式</strong></p><p><br></p><p><br></p><p><br></p><p><strong> 2 以福音為中心的見證</strong></p><p><br></p><p><br></p><p><br></p><h2><strong>三、結語</strong></h2><p><br></p><p><br></p><p><br></p>`)
  const componentRef: any = useRef();

  const handleChange = (content: any) => {
    setData(content);
  }

  const ComponentToPrint = React.forwardRef((props: ComponentToPrintProps, ref: any) => {
    return (
      <div className="m-5" ref={ref} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.content) }}>
      </div>
    )
  })

  return (
    <Container style={{ marginTop: -20 }}>
      <Row className="justify-content-md-center">
        <Col className="text-center" lg="8" md="12">
          <h2>2020年3月8日 主日崇拜</h2>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <iframe width="660" height="371" src="https://www.youtube-nocookie.com/embed/videoseries?playsinline=1&list=PLUxHXOrQ-4zyARcoUkqwMisx9SajPfZ3e" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>        
      </Row>
      <Row className="mt-5 mb-5 text-center justify-content-center ml-1 mr-1">
        <Tabs
          id=""
          activeKey={key}
          onSelect={(k: any) => setKey(k)}
          className="nav-justified w-100 mb-5"
          style={{ fontSize: 20 }}
        >
          <Tab eventKey="home" title="講章">
            <div className="mb-2">
              <div style={{ width: 'fit-content' }}>
                <a href={require('assets/pdf/20200308rundown.pdf')} target="_blank">
                  <div>
                    <i style={{ fontSize: 48, color: '#f04100' }} className="far fa-file-pdf"></i>
                  </div>
                  <div>
                    <label>程序表</label>
                  </div>
                </a>
              </div>
            </div>
            <Row>
              <ReactQuill
                className="mb-3"
                value={data}
                onChange={handleChange}
                modules={props.editorModules}
                style={{ 
                  minHeight: 500, 
                  maxWidth: '98vw' 
                }}
              />
            </Row>
            <Row className="mt-5 justify-content-end">
              <div className="d-block d-lg-none">
                <Button style={{ transform: 'translate(0px, 25px)' }} variant="primary" onClick={props.handleDownloadNote}>
                  文字轉圖<i className="ml-1 fas fa-exchange-alt"></i>
                </Button>
              </div>
              <div className="d-none d-lg-block">
                <ReactToPrint
                  trigger={() =>
                    <Button variant="primary">另存PDF<i className="fa fa-print ml-1" aria-hidden="true"></i>
                    </Button>}
                  content={() => componentRef.current}
                />
                <div className="d-none">
                  <ComponentToPrint
                    ref={el => (componentRef.current = el)}
                    content={data}
                  />
                </div>
              </div>
            </Row>
          </Tab>
          <Tab eventKey="script" title="經文">
            <div className="text-left mb-5">
              <p style={{ fontSize: 24 }}><b><i>使徒行傳3:1-15</i></b></p>
              <h4><b className="mr-3">3 : 1</b>申初禱告的時候，彼得、約翰上聖殿去。</h4>
              <h4><b className="mr-3">3 : 2</b>有一個人，生來是瘸腿的，天天被人抬來，放在殿的一個門口，那門名叫美門，要求進殿的人賙濟。</h4>
              <h4><b className="mr-3">3 : 3</b>他看見彼得、約翰將要進殿，就求他們賙濟。</h4>
              <h4><b className="mr-3">3 : 4</b>彼得約翰定睛看他；彼得說：你看我們！</h4>
              <h4><b className="mr-3">3 : 5</b>那人就留意看他們，指望得著甚麼 。</h4>
              <h4><b className="mr-3">3 : 6</b>彼得說：金銀我都沒有，只把我所有的給你：我奉拿撒勒人耶穌基督的名，叫你起來行走！</h4>
              <h4><b className="mr-3">3 : 7</b>於是拉著他的右手，扶他起來；他的腳和踝子骨立刻健壯了，</h4>
              <h4><b className="mr-3">3 : 8</b>就跳起來，站著，又行走，同他們進了殿，走著，跳著，讚美神。</h4>
              <h4><b className="mr-3">3 : 9</b>百姓都看見他行走，讚美神；</h4>
              <h4><b className="mr-3">3 : 10</b>認得他是那素常坐在殿的美門口求賙濟的，就因他所遇著的事滿心希奇、驚訝。</h4>
              <h4><b className="mr-3">3 : 11</b>那人正在稱為所羅門的廊下，拉著彼得、約翰；眾百姓一齊跑到他們那裡，很覺希奇。</h4>
              <h4><b className="mr-3">3 : 12</b>彼得看見，就對百姓說：以色列人哪，為什麼把這事當作希奇呢？為什麼定睛看我們，以為我們憑自己的能力和虔誠使這人行走呢？</h4>
              <h4><b className="mr-3">3 : 13</b>亞伯拉罕、以撒、雅各的神，就是我們列祖的神，已經榮耀了他的僕人（或作：兒子）耶穌；你們卻把他交付彼拉多。彼拉多定意要釋放他，你們竟在彼拉多面前棄絕了他。</h4>
              <h4><b className="mr-3">3 : 14</b>你們棄絕了那聖潔公義者，反求著釋放一個兇手給你們。</h4>
              <h4><b className="mr-3">3 : 15</b>你們殺了那生命的主，神卻叫他從死裡復活了；我們都是為這事作見證。</h4>
            </div>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  )
}

export default Ws20200308;