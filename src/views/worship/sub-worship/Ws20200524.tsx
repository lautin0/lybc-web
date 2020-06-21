import React, { useState, useRef } from "react";
// react-bootstrap components
import { Container, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ReactToPrint from "react-to-print";
import DOMPurify from 'dompurify'
import { ComponentToPrintProps } from "./types/types";

function Ws20200524(props: any) {

  const [key, setKey] = useState('home')
  const [data, setData] = useState('<h2><br></h2><h2><strong>講題：要到幾時呢？！</strong></h2><p><br></p><h3><strong>經文：詩篇13</strong></h3><h3><br></h3><h3><strong>一、詩人傾訴愁苦 v1-2</strong></h3><h3><br></h3><h3><br></h3><p><br></p><h3><br></h3><h3><strong>二、詩人禱告祈求 v3-4</strong></h3><h3><br></h3><p><br></p><h3><br></h3><h3><br></h3><h3><strong>三、詩人歌頌上帝 v5-6</strong></h3><p><br></p><p><br></p><br><br><br><br>')
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
          <h2>2020年5月24日 主日崇拜</h2>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <iframe width="660" height="371" src="https://www.youtube.com/embed/videoseries?list=PLUxHXOrQ-4zxaMMuf0dNNJcDhbfvRXYVa&playsinline=1" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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
                <a href="https://drive.google.com/file/d/16ISntCpODaESmmW4G2yIybeLUhjf3ZdN/view?usp=sharing" target="_blank">
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
              <p style={{ fontSize: 24 }}><b><i>詩篇13</i></b></p>
              <h4>（大衛的詩，交給詩班長。）</h4>              
              <h4><b className="mr-3">13 : 1</b> 耶和華啊！你忘記我要到幾時呢？要到永遠嗎？你掩面不顧我，要到幾時呢？</h4>
              <h4><b className="mr-3">13 : 2</b> 我心裡籌算不安，內心終日愁苦，要到幾時呢？我的仇敵勝過我，要到幾時呢？</h4>
              <h4><b className="mr-3">13 : 3</b> 耶和華我的　神啊！求你看顧我，應允我；求你使我的眼睛明亮，免得我沉睡至死；</h4>
              <h4><b className="mr-3">13 : 4</b> 免得我的仇敵說：“我勝過了他”；免得我跌倒的時候我的敵人就歡呼。</h4>
              <h4><b className="mr-3">13 : 5</b> 至於我，我倚靠你的慈愛，我的心必因你的救恩歡呼</h4>
              <h4><b className="mr-3">13 : 6</b> 我要歌頌耶和華，因他以厚恩待我。</h4>

            </div>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  )
}

export default Ws20200524;