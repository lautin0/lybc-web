import React, { useState, useRef } from "react";
// react-bootstrap components
import { Container, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ReactToPrint from "react-to-print";
import DOMPurify from 'dompurify'
import { ComponentToPrintProps } from "./types/types";

function Ws20200809(props: any) {

  const [key, setKey] = useState('home')
  const [data, setData] = useState('<h2><br></h2><h2><strong>講題：逆風中的踏浪者</strong></h2><p><br></p><p><strong>經文：馬太福音 14:22-33</strong></p>')
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
          <h2>2020年8月9日 主日崇拜</h2>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <iframe width="660" height="371" src="https://www.youtube.com/embed/videoseries?list=PLUxHXOrQ-4zxoDEVoF6qcjTng1R9pOIP8&playsinline=1" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </Row>
      <Row className="mt-5 mb-5 text-center justify-content-center ml-1 mr-1">
        <Tabs
          id=""
          activeKey={key}
          onSelect={(k: any) => setKey(k)}
          className="nav-justified w-100 mb-5"
          style={{ fontSize: 20 }}
        >
          <Tab eventKey="home" title="筆記">
            <div className="mb-2">
              <div style={{ width: 'fit-content' }}>
                <a href="https://drive.google.com/file/d/1HLKrOVfgWs8Z3ad2YchhiOvfoc4wE-iI/view?usp=drivesdk" target="_blank">
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
              <p className="my-3" style={{ fontSize: 24 }}><b><i>馬太福音 14:22-33</i></b></p>
              <h4><b className="mr-3">14 : 22 </b>耶穌隨即催門徒上船，先渡到那邊去，等他叫眾人散開。</h4>
              <h4><b className="mr-3">14 : 23 </b>散了眾人以後，他就獨自上山去禱告。到了晚上，只有他一人在那裡。</h4>
              <h4><b className="mr-3">14 : 24 </b>那時船在海中，因風不順，被浪搖撼。</h4>
              <h4><b className="mr-3">14 : 25 </b>夜裡四更天，耶穌在海面上走，往門徒那裡去。</h4>
              <h4><b className="mr-3">14 : 26 </b>門徒看見他在海面上走，就驚慌了，說：是個鬼怪！便害怕，喊叫起來。</h4>
              <h4><b className="mr-3">14 : 27 </b>耶穌連忙對他們說：你們放心！是我，不要怕！</h4>
              <h4><b className="mr-3">14 : 28 </b>彼得說：主，如果是你，請叫我從水面上走到你那裡去。</h4>
              <h4><b className="mr-3">14 : 29 </b>耶穌說：你來吧。彼得就從船上下去，在水面上走，要到耶穌那裡去；</h4>
              <h4><b className="mr-3">14 : 30 </b>只因見風甚大，就害怕，將要沉下去，便喊著說：主啊，救我！</h4>
              <h4><b className="mr-3">14 : 31 </b>耶穌趕緊伸手拉住他，說：你這小信的人哪，為什麼疑惑呢？</h4>
              <h4><b className="mr-3">14 : 32 </b>他們上了船，風就住了。</h4>
              <h4><b className="mr-3">14 : 33 </b>在船上的人都拜他，說：你真是神的兒子了。</h4>
            </div>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  )
}

export default Ws20200809;