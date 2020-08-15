import React, { useState, useRef } from "react";
// react-bootstrap components
import { Container, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ReactToPrint from "react-to-print";
import DOMPurify from 'dompurify'
import { ComponentToPrintProps } from "./types/types";

function Ws20200802(props: any) {

  const [key, setKey] = useState('home')
  const [data, setData] = useState('<h2><br></h2><h2><strong>講題：黑夜的歌唱</strong></h2><p><br></p><p><strong>經文：詩篇77:1-20</strong></p>')
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
          <h2>2020年8月2日 主日崇拜</h2>
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <iframe width="660" height="371" src="https://www.youtube.com/embed/videoseries?list=PLUxHXOrQ-4zylGV7YRfh3UwaWuq3C-rO4&playsinline=1" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
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
                <a href="https://drive.google.com/file/d/1HNZmUnZ7Vaf0Zuxbnj17WhRgyVUz80tn/view?usp=sharing" target="_blank">
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
              <p className="my-3" style={{ fontSize: 24 }}><b><i>詩篇 77</i></b></p>
              <h4><b className="mr-3">77 : 1 </b>我要向神發聲呼求；我向神發聲，他必留心聽我。</h4>
              <h4><b className="mr-3">77 : 2 </b>我在患難之日尋求主；我在夜間不住地舉手禱告；我的心不肯受安慰。</h4>
              <h4><b className="mr-3">77 : 3 </b>我想念神，就煩燥不安；我沉吟悲傷，心便發昏。</h4>
              <h4><b className="mr-3">77 : 4 </b>你叫我不能閉眼；我煩亂不安，甚至不能說話。</h4>
              <h4><b className="mr-3">77 : 5 </b>我追想古時之日，上古之年。</h4>
              <h4><b className="mr-3">77 : 6 </b>我想起我夜間的歌曲，捫心自問；我心裏也仔細省察。</h4>
              <h4><b className="mr-3">77 : 7 </b>難道主要永遠丟棄我，不再施恩嗎？</h4>
              <h4><b className="mr-3">77 : 8 </b>難道他的慈愛永遠窮盡，他的應許世世廢棄嗎？</h4>
              <h4><b className="mr-3">77 : 9 </b>難道神忘記開恩，因發怒就止住他的慈悲嗎？</h4>
              <h4><b className="mr-3">77 : 10 </b>我便說：這是我的懦弱，但我要追念至高者顯出右手之年代。</h4>
              <h4><b className="mr-3">77 : 11 </b>我要提說耶和華所行的；我要記念你古時的奇事。</h4>
              <h4><b className="mr-3">77 : 12 </b>我也要思想你的經營，默念你的作為。</h4>
              <h4><b className="mr-3">77 : 13 </b>神啊，你的作為是潔淨的；有何神大如神呢？</h4>
              <h4><b className="mr-3">77 : 14 </b>你是行奇事的神；你曾在列邦中彰顯你的能力。</h4>
              <h4><b className="mr-3">77 : 15 </b>你曾用你的膀臂贖了你的民，就是雅各和約瑟的子孫。</h4>
              <h4><b className="mr-3">77 : 16 </b>神啊，諸水見你，一見就都驚惶；深淵也都戰抖。</h4>
              <h4><b className="mr-3">77 : 17 </b>雲中倒出水來；天空發出響聲；你的箭也飛行四方。</h4>
              <h4><b className="mr-3">77 : 18 </b>你的雷聲在旋風中；電光照亮世界；大地戰抖震動。</h4>
              <h4><b className="mr-3">77 : 19 </b>你的道在海中；你的路在大水中；你的腳蹤無人知道。</h4>
              <h4><b className="mr-3">77 : 20 </b>你曾藉摩西和亞倫的手引導你的百姓，好像羊群一般。</h4>
            </div>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  )
}

export default Ws20200802;