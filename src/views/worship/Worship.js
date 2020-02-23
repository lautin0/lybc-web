import React, { useState } from "react";

// react-bootstrap components
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";

import { useParams } from "react-router";

function Worship() {

  let { id } = useParams();

  const [key, setKey] = useState('home')

  return (
    <div className="section">
      {id === '20200223' && <Container style={{ marginTop: -20 }}>
        <Row className="justify-content-md-center">
          <Col className="text-center" lg="8" md="12">
            <h1>2020年2月23日 主日崇拜</h1>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <iframe src="https://drive.google.com/file/d/1WMqJjnvRAOGcqGEV_vIFjFkJ8QDgNFVW/preview" width="660" height="371"></iframe>
        </Row>
        <Row className="mt-5 mb-5 text-center">
          <Tabs
            activeKey={key}
            onSelect={k => setKey(k)}
            className="nav-justified w-100 mb-5"
            style={{ fontSize: 20 }}
          >
            <Tab eventKey="home" title="宣召">
              <h3 className="w-100">
                主啊，諸神之中沒有可比你的；<br />
                你的作為也無可比。<br />
                主啊，你所造的萬民都要來敬拜你；<br />
                他們也要榮耀你的名。<br />
                因你為大，且行奇妙的事；<br />
                惟獨你是神。<br />
                (詩篇 86:8-10 和合本)<br />
                ❤❤❤<br /><br />
              </h3>
              <h3 className="mt-5 mb-5">
                各位綠楊家的弟兄姊妹，<br />

                讓我們在這不能有實體崇拜的日子，在你所選定的地方，同心向我們這位坐在寶座上的羔羊下拜，獻上我們最真誠的敬拜，願一切榮耀頌讚都歸給愛我們的主耶穌。
                📪📪
              </h3>
            </Tab>
            <Tab eventKey="script" title="經文">
              <div className="text-left mb-5">
                <h4><b className="mr-3">5 : 3</b> 「心靈貧窮的人有福了！ 因為天國是他們的。</h4>
                <h4><b className="mr-3">5 : 4</b> 哀慟的人有福了！ 因為他們必得安慰。</h4>
                <h4><b className="mr-3">5 : 5</b> 謙和的人有福了！ 因為他們必承受土地。</h4>
                <h4><b className="mr-3">5 : 6</b> 飢渴慕義的人有福了！ 因為他們必得飽足。</h4>
                <h4><b className="mr-3">5 : 7</b> 憐憫人的人有福了！ 因為他們必蒙憐憫。</h4>
                <h4><b className="mr-3">5 : 8</b> 清心的人有福了！ 因為他們必得見　神。</h4>
                <h4><b className="mr-3">5 : 9</b> 締造和平的人有福了！ 因為他們必稱為　神的兒子。</h4>
                <h4><b className="mr-3">5 : 1</b>0 為義受迫害的人有福了！ 因為天國是他們的。</h4>
                <h4><b className="mr-3">5 : 1</b>1 「人若因我辱罵你們，迫害你們，捏造各樣壞話毀謗你們，你們就有福了！</h4>
                <h4><b className="mr-3">5 : 1</b>2 要歡喜快樂，因為你們在天上的賞賜是很多的。在你們以前的先知，人也是這樣迫害他們。」</h4>
                <h4><b className="mr-3">5 : 1</b>3 「你們是地上的鹽。鹽若失了味，怎能叫它再鹹呢？它不再有用，只好被丟在外面，任人踐踏。</h4>
                <h4><b className="mr-3">5 : 1</b>4 你們是世上的光。城造在山上是不能隱藏的。</h4>
                <h4><b className="mr-3">5 : 1</b>5 人點燈，不放在斗底下，而是放在燈臺上，就照亮一家的人。</h4>
                <h4><b className="mr-3">5 : 1</b>6 你們的光也要這樣照在人前，叫他們看見你們的好行為，把榮耀歸給你們在天上的父。」</h4>
              </div>
            </Tab>
          </Tabs>
        </Row>
      </Container>}


      {id === '20200216' && <Container style={{ marginTop: -20 }}>
        <Row className="justify-content-md-center">
          <Col className="text-center" lg="8" md="12">
            <h1>2020年2月16日 主日崇拜</h1>
          </Col>
        </Row>
        {/* <Row className="justify-content-center mt-3">
          <iframe src="https://drive.google.com/file/d/1WMqJjnvRAOGcqGEV_vIFjFkJ8QDgNFVW/preview" width="660" height="371"></iframe>
        </Row> */}
        <Row className="mt-5 mb-5 text-center">
          <Tabs
            activeKey={key}
            onSelect={k => setKey(k)}
            className="nav-justified w-100 mb-5"
            style={{ fontSize: 20 }}
          >
            <Tab eventKey="home" title="宣召">
              <h3 className="w-100">
              我要聽　神—耶和華所說的話，<br/>
              因為他必應許賜平安給他的百姓，就是他的聖民；<br/>
              他們卻不可再轉向愚昧。<br/>
              他的救恩誠然與敬畏他的人相近，<br/>
              使榮耀住在我們的地上。<br/>
              (詩篇 85:8-9 和合本2010)<br/>
              ❤❤❤<br/><br/>
              </h3>
              <h3 className="mt-5 mb-5">
                綠楊家各位弟兄姊妹，<br />

                讓我們在這不能有實體崇拜的日子，在你所選定的地方，同心向我們這位坐在寶座上的羔羊下拜，獻上我們最真誠的敬拜，願一切榮耀頌讚都歸給愛我們的主耶穌。
                📪📪
              </h3>
            </Tab>
            <Tab eventKey="script" title="經文">
              <div className="text-left mb-5">
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
      </Container>}

    </div>
  )
}

export default Worship;