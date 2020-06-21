import React, { useState, useRef } from "react";
// react-bootstrap components
import { Container, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ReactToPrint from "react-to-print";
import DOMPurify from 'dompurify'
import { ComponentToPrintProps } from "./types/types";

function Ws20200419(props: any) {

  const [key, setKey] = useState('home')
  const [data, setData] = useState('<h2><br></h2><h2><strong>講題：搜尋智慧 Search for Wisdom (箴言2:1-12)</strong></h2><p><br></p><h3><strong>引言：神給祂兒女的忠告</strong></h3><p><br></p><h3><strong>一、尋得智慧的四對要點 v.1-5</strong></h3><h3 class="ql-indent-1">領受 (take to heart) 		⇒	存記 (storing up)</h3><h3 class="ql-indent-1">側耳 (tune your ears) 		⇒	專心 (set your heart)</h3><h3 class="ql-indent-1">呼求 (crying out) 				⇒	揚聲 (lift up voice)</h3><h3 class="ql-indent-1">尋找 (seek)  ⇒ 搜求 (searching)</h3><h3><br></h3><h3 class="ql-indent-1">小結：誰會這樣搜尋智慧？</h3><p><br></p><p><br></p><p><br></p><p><br></p><h3><strong>二、 智慧必定是從神而來的 v.6-12</strong></h3><h3 class="ql-indent-1">-「可傳達的(communicable)」的屬性</h3><h3 class="ql-indent-1">- 智慧在人生中的效用</h3><p><br></p><h3 class="ql-indent-1">小結：誰會得真智慧？如何檢測心靈的智慧？</h3><p><br></p><p><br></p><p><br></p><p><br></p><h3><strong>實踐：</strong></h3><h3>1. 藉著今天經文的提醒，好好設定你「靈修讀經增智慧」的計劃。</h3><h3>2. 留意生活那些令你不安的事情，嘗試找出當中可學習的智慧(從神的眼光看事情)<strong>。</strong></h3>')
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
          <h2>2020年4月19日 主日崇拜</h2>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <iframe width="660" height="371" src="https://www.youtube.com/embed/videoseries?list=PLUxHXOrQ-4zz121_bzxbuy9RiDuA_-lCC&playsinline=1" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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
                <a href="https://drive.google.com/file/d/1ZLK5rs8xtfa3Quqe_mppl-Z5mzX2DDF4/view?usp=sharing" target="_blank">
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
              <p style={{ fontSize: 24 }}><b><i>箴言2:1-12</i></b></p>
              <h4><b className="mr-3">2:1</b> 我兒，你若領受我的言語，存記我的命令，</h4>
              <h4><b className="mr-3">2:2</b> 側耳聽智慧，專心求聰明，</h4>
              <h4><b className="mr-3">2:3</b> 呼求明哲，揚聲求聰明，</h4>
              <h4><b className="mr-3">2:4</b> 尋找他，如尋找銀子，搜求他，如搜求隱藏的珍寶，</h4>
              <h4><b className="mr-3">2:5</b> 你就明白敬畏耶和華，得以認識神。</h4>
              <h4><b className="mr-3">2:6</b> 因為，耶和華賜人智慧；知識和聰明都由他口而出。</h4>
              <h4><b className="mr-3">2:7</b> 他給正直人存留真智慧，給行為純正的人作盾牌，</h4>
              <h4><b className="mr-3">2:8</b> 為要保守公平人的路，護庇虔敬人的道。</h4>
              <h4><b className="mr-3">2:9</b> 你也必明白仁義、公平、正直、一切的善道。</h4>
              <h4><b className="mr-3">2:10</b> 智慧必入你心；你的靈要以知識為美。</h4>
              <h4><b className="mr-3">2:11</b> 謀略必護衛你；聰明必保守你，</h4>
              <h4><b className="mr-3">2:12</b> 要救你脫離惡道（或譯：惡人的道），脫離說乖謬話的人。</h4>
            </div>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  )
}

export default Ws20200419;