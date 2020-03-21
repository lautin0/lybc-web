import React, { useState, useRef } from "react";
// react-bootstrap components
import { Container, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ReactToPrint from "react-to-print";
import DOMPurify from 'dompurify'
import { ComponentToPrintProps } from "./types/types";

function Ws20200322(props: any) {

  const [key, setKey] = useState('home')
  const [data, setData] = useState(`<h3><br></h3><h2><strong>講題：與神摔跤的人 (創世記32: 22 - 30)</strong></h2><h2><br></h2><h3><strong><em>引言：雅各積壓了多年的不安</em></strong></h3><h3><br></h3><h3><strong>經文分段：</strong></h3><h3><strong>一、神要來跟不安的人摔跤(22-24)</strong></h3><h3><br></h3><h3><br></h3><p><br></p><h3><br></h3><h3><strong>二、神祝福願意與祂摔跤的人(25-27)</strong></h3><h3><br></h3><p><br></p><h3><br></h3><h3><br></h3><h3><strong>三、與神交戰的禱告增信心(29-30)</strong></h3><h3><br></h3><h3><br></h3><p><br></p><h3><br></h3><h3><strong>回應及實踐：</strong></h3><h3><strong>一、你我是以色列民</strong></h3><h3><br></h3><h3><br></h3><p><br></p><h3><br></h3><h3><strong>二、預備你的摔角台</strong></h3><h3><br></h3><h3><br></h3><h3><br></h3><p><br></p><h3><strong>三、對付內心的陰影</strong></h3><h3><br></h3><h3><br></h3><p><br></p><h3><br></h3><h3><strong>四、不要對上帝冷漠</strong></h3><br><br><br><br>`)
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
          <h2>2020年3月22日 主日崇拜</h2>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <iframe width="660" height="371" src="https://www.youtube.com/embed/videoseries?list=PLUxHXOrQ-4zy4p5yO3vSfXB0zguCt-iOO&playsinline=1" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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
                <a href={require('assets/pdf/20200322rundown.pdf')} target="_blank">
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
              <p style={{ fontSize: 24 }}><b><i>創世記32:22-30</i></b></p>
              <h4><b className="mr-3">32 : 22</b> 他夜間起來，帶著兩個妻子，兩個使女，並十一個兒子，都過了雅博渡口，</h4>
              <h4><b className="mr-3">32 : 23</b> 先打發他們過河，又打發所有的都過去，</h4>
              <h4><b className="mr-3">32 : 24</b> 只剩下雅各一人。有一個人來和他摔跤，直到黎明。</h4>
              <h4><b className="mr-3">32 : 25</b> 那人見自己勝不過他，就將他的大腿窩摸了一把，雅各的大腿窩正在摔跤的時候就扭了。</h4>
              <h4><b className="mr-3">32 : 26</b> 那人說：「天黎明了，容我去吧！」雅各說： 「你不給我祝福，我就不容你去。 」</h4>
              <h4><b className="mr-3">32 : 27</b> 那人說： 「你名叫什麼？」他說：「我名叫雅各。」</h4>
              <h4><b className="mr-3">32 : 28</b> 那人說：「你的名不要再叫雅各，要叫以色列；因為你與神與人較力，都得了勝。」</h4>
              <h4><b className="mr-3">32 : 29</b> 雅各問他說： 「請將你的名告訴我。」那人說： 「何必問我的名﹖」於是在那裡給雅各祝福。</h4>
              <h4><b className="mr-3">32 : 30</b> 雅各便給那地方起名叫毘努伊勒【就是神之面的意思】，意思說： 「我面對面見了神，我的性命仍得保全。」</h4>
            </div>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  )
}

export default Ws20200322;