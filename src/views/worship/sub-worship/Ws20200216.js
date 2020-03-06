import React, { useState, useRef } from "react";
// react-bootstrap components
import { Container, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ReactToPrint from "react-to-print";
import DOMPurify from 'dompurify'

function Ws20200216(props) {

  const [key, setKey] = useState('home')
  const [data, setData] = useState(`<br /><h3>
  <b>
    講道筆記
  </b>
</h3><br/>
<h3>(歌羅西書3:12-17)</h3>`)
  const componentRef = useRef();

  const handleChange = (content) => {
    setData(content);
  }

  const ComponentToPrint = React.forwardRef((props, ref) => {
    return (
      <div className="m-5" ref={ref} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(props.content) }}>
      </div>
    )
  })

  return (
    <Container style={{ marginTop: -20 }}>
      <Row className="justify-content-md-center">
        <Col className="text-center" lg="8" md="12">
          <h2>2020年2月16日 主日崇拜</h2>
        </Col>
      </Row>
      {/* <Row className="justify-content-center mt-3">
          <iframe width="660" height="371" src="https://www.youtube-nocookie.com/embed/videoseries?list=PL9ftxiJGUaQC6s19rwlXkTZnYLeo1ZhqW" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </Row> */}
      <Row className="mt-5 mb-5 text-center justify-content-center ml-1 mr-1">
        <Tabs
          activeKey={key}
          onSelect={k => setKey(k)}
          className="nav-justified w-100 mb-5"
          style={{ fontSize: 20 }}
        >
          <Tab eventKey="home" title="講章">
            <Row>
              <ReactQuill
                className="mb-3"
                value={data}
                onChange={handleChange}
                modules={props.editorModules}
                style={{ height: 500, maxWidth: '98vw' }}
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
              <p style={{ fontSize: 24 }}><b><i>歌羅西書3:12-17</i></b></p>
              <h4><b className="mr-3">3:12</b> 所 以 你 們 既 是 　 神 的 選 民 、 聖 潔 蒙 愛 的 人 、 就 要 存 〔 原 文 作 穿 下 同 〕 憐 憫 、 恩 慈 、 謙 虛 、 溫 柔 、 忍 耐 的 心 。</h4>
              <h4><b className="mr-3">3:13</b> 倘 若 這 人 與 那 人 有 嫌 隙 、 總 要 彼 此 包 容 、 彼 此 饒 恕 ． 主 怎 樣 饒 恕 了 你 們 、 你 們 也 要 怎 樣 饒 恕 人 。</h4>
              <h4><b className="mr-3">3:14</b> 在 這 一 切 之 外 、 要 存 著 愛 心 ． 愛 心 就 是 聯 絡 全 德 的 。</h4>
              <h4><b className="mr-3">3:15</b> 又 要 叫 基 督 的 平 安 在 你 們 心 裡 作 主 ． 你 們 也 為 此 蒙 召 、 歸 為 一 體 ． 且 要 存 感 謝 的 心 。</h4>
              <h4><b className="mr-3">3:16</b> 當 用 各 樣 的 智 慧 、 把 基 督 的 道 理 、 豐 豐 富 富 的 存 在 心 裡 、 〔 或 作 當 把 基 督 的 道 理 豐 豐 富 富 的 存 在 心 裡 以 各 樣 的 智 慧 〕 用 詩 章 、 頌 詞 、 靈 歌 、 彼 此 教 導 、 互 相 勸 戒 心 被 恩 感 歌 頌 　 神 。</h4>
              <h4><b className="mr-3">3:17</b> 無 論 作 甚 麼 、 或 說 話 、 或 行 事 、 都 要 奉 主 耶 穌 的 名 、 藉 著 他 感 謝 父 　 神 。</h4>
            </div>
          </Tab>
        </Tabs>
      </Row>
    </Container>
  )
}

export default Ws20200216;