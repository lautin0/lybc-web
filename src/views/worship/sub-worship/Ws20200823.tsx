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
  const [data, setData] = useState('<h2><br></h2><h2><strong>講題：禱告應有的法則</strong></h2><p><br></p><p><strong>經文：路加福音 11:1-10</strong></p><p><br></p><p><strong>比對上行上文下理要點</strong></p><p><strong>耶穌教導主禱文的原因</strong></p><p><strong>有關日用的飲食</strong></p><p><strong>跟進饒恕的意思</strong></p><p><br></p><p><strong>1 耶穌在一個地方禱告</strong></p><p><br></p><p><strong>A 耶穌自己也有禱告的需要</strong></p><p><br></p><p><strong>B 耶穌有一個分別出來的禱告地方</strong></p><p><br></p><p><strong>C 有一個禱告的習慣</strong></p><p><br></p><p><br></p><p><strong>2 門徒怎樣看到禱告</strong></p><p><br></p><p><strong>A 著重</strong></p><p><br></p><p><strong>B 學習</strong></p><p><br></p><p><strong>C 進深</strong></p><p><br></p><p><br></p><p><strong>3 禱告的範例</strong></p><p><br></p><p><strong>A 對象：我們在天上的父</strong></p><p><br></p><p><strong>B  內容：三願</strong></p><p><br></p><p><strong>	願人都尊你的名為聖</strong></p><p><br></p><p><strong>	願你的國降臨</strong></p><p><br></p><p><strong>	願你的旨意行在地上如同行在天上</strong></p><p><br></p><p><strong>C 需要</strong></p><p><br></p><p><strong>D 法則：是雙向的</strong></p><p><br></p><p><br></p><h3><strong>總結：祈禱不在乎得與失，乃是在乎和神建立關係和認識神的屬性。</strong></h3>')
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
            <div className="mb-2 form-inline">
              <div style={{ width: 'fit-content' }} className="mr-3">
                <a href="https://drive.google.com/file/d/1AYAovLIygCMpMBobnkpr6ytDvXL1aST1/view?usp=sharing" target="_blank" className="dl-link">
                  <div>
                    <i style={{ fontSize: 48, color: '#f04100' }} className="far fa-file-pdf"></i>
                  </div>
                  <div>
                    <label>程序表.pdf</label>
                  </div>
                </a>
              </div>
              <div style={{ width: 'fit-content' }}>
                <a href="https://drive.google.com/file/d/1Dwf3Jchhe3g5hZHDaeo0O-gk54PcchBO/view?usp=sharing" target="_blank" className="dl-link">
                  <div>
                    <i style={{ fontSize: 48, color: '#285595' }} className="far fa-file-word"></i>
                  </div>
                  <div>
                    <label>附件一、禱告的法則.docx</label>
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
              <h4><b className="mr-3">11 : 1</b>耶穌在一個地方禱告；禱告完了，有個門徒對他說：「求主教導我們禱告，像約翰教導他的門徒。」 </h4>
              <h4><b className="mr-3">11 : 2</b>耶穌說：「你們禱告的時候，要說：我們在天上的父：願人都尊你的名為聖。願你的國降臨；願你的旨意行在地上，如同行在天上。</h4>
              <h4><b className="mr-3">11 : 3</b>我們日用的飲食，天天賜給我們。</h4>
              <h4><b className="mr-3">11 : 4</b>赦免我們的罪，因為我們也赦免凡虧欠我們的人。不叫我們遇見試探；救我們脫離凶惡。」</h4>
              <h4><b className="mr-3">11 : 5</b>耶穌又說：「你們中間誰有一個朋友半夜到他那裏去，說：『朋友！請借給我三個餅； </h4>
              <h4><b className="mr-3">11 : 6</b>因為我有一個朋友行路，來到我這裏，我沒有甚麼給他擺上。』 </h4>
              <h4><b className="mr-3">11 : 7</b>那人在裏面回答說：『不要攪擾我，門已經關閉，孩子們也同我在牀上了，我不能起來給你。』 </h4>
              <h4><b className="mr-3">11 : 8</b>我告訴你們，雖不因他是朋友起來給他，但因他情詞迫切地直求，就必起來照他所需用的給他。 </h4>
              <h4><b className="mr-3">11 : 9</b>我又告訴你們，你們祈求，就給你們；尋找，就尋見；叩門，就給你們開門。 </h4>
              <h4><b className="mr-3">11 : 10</b>因為，凡祈求的，就得着；尋找的，就尋見；叩門的，就給他開門。</h4>
            </div>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  )
}

export default Ws20200823;