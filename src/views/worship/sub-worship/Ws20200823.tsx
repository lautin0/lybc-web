import React, { useState, useRef } from "react";
// react-bootstrap components
import { Container, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ReactToPrint from "react-to-print";
import DOMPurify from 'dompurify'
import { ComponentToPrintProps } from "./types/types";

function Ws20200823(props: any) {

  const [key, setKey] = useState('home')
  const [data, setData] = useState('<h2><br></h2><h2><strong>講題：禱告應有的法則</strong></h2><p><br></p><p><strong>經文：路加福音 11:1-10</strong></p>')
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
          <h2>2020年8月23日 主日崇拜</h2>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <iframe width="660" height="371" src="https://www.youtube.com/embed/videoseries?list=PLUxHXOrQ-4zzax2Wt2CZie32yiM9sfVrs&playsinline=1" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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
                <a href="https://drive.google.com/file/d/1AYAovLIygCMpMBobnkpr6ytDvXL1aST1/view?usp=sharing" target="_blank">
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
              <p className="my-3" style={{ fontSize: 24 }}><b><i>路加福音 11:1-10</i></b></p>
              <h4><b className="mr-3">11 : 1</b>耶穌在一個地方禱告。禱告完了，有個門徒對他說：「主啊，求你教導我們禱告，像約翰教導他的門徒一樣。」 </h4>
              <h4><b className="mr-3">11 : 2</b>耶穌對他們說：「你們禱告的時候，要說：『父啊，願人都尊你的名為聖；願你的國降臨；</h4>
              <h4><b className="mr-3">11 : 3</b>我們日用的飲食，天天賜給我們。</h4>
              <h4><b className="mr-3">11 : 4</b>赦免我們的罪，因為我們也赦免凡虧欠我們的人。不叫我們陷入試探。』」</h4>
              <h4><b className="mr-3">11 : 5</b>耶穌又對他們說：「你們中間誰有一個朋友半夜到他那裏去，對他說：『朋友！請借給我三個餅； </h4>
              <h4><b className="mr-3">11 : 6</b>因為我有一個朋友旅途中來到我這裏，我沒有東西招待他。』 </h4>
              <h4><b className="mr-3">11 : 7</b>那人在裏面回答：『不要打擾我，門已經關了，孩子們也同我在床上了，我不能起來給你。』 </h4>
              <h4><b className="mr-3">11 : 8</b>我告訴你們，雖不因他是朋友起來給他，也會因他不顧面子地直求，起來照他所需要的給他。 </h4>
              <h4><b className="mr-3">11 : 9</b>我又告訴你們，祈求，就給你們；尋找，就找到；叩門，就給你們開門。 </h4>
              <h4><b className="mr-3">11 : 10</b>因為凡祈求的，就得着；尋找的，就找到；叩門的，就給他開門。</h4>
            </div>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  )
}

export default Ws20200823;