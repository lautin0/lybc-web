import React, { useEffect } from "react";

// react-bootstrap components
import {
  Container,
  Row,
  Table,
  Pagination,
  PageItem,
} from "react-bootstrap";

import moment from 'moment'
import { useHistory } from "react-router";

const data = [
  { id: '20200830', date: moment('30/08/2020', 'DD/MM/YYYY'), title: '分享主日', messanger: '---' },
  { id: '20200823', date: moment('23/08/2020', 'DD/MM/YYYY'), title: '禱告應有的法則', messanger: '李錦彬牧師' },
  { id: '20200816', date: moment('16/08/2020', 'DD/MM/YYYY'), title: '好等我們去支取', messanger: '黃雪梅傳道' },
  { id: '20200809', date: moment('09/08/2020', 'DD/MM/YYYY'), title: '逆風中的踏浪者', messanger: '黃凱旋導師' },
  { id: '20200802', date: moment('02/08/2020', 'DD/MM/YYYY'), title: '黑夜的歌唱', messanger: '謝健雄牧師' },
  { id: '20200726', date: moment('26/07/2020', 'DD/MM/YYYY'), title: '流淚撒種者的歡呼', messanger: '蔣文忠傳道' },
  { id: '20200719', date: moment('19/07/2020', 'DD/MM/YYYY'), title: '耶和華是醫治你的', messanger: '黃德光傳道' },
  { id: '20200712', date: moment('12/07/2020', 'DD/MM/YYYY'), title: '變苦為甘', messanger: '謝健雄牧師' },
  { id: '20200614', date: moment('14/06/2020', 'DD/MM/YYYY'), title: '保持5G連線度困境', messanger: '杜雪珍牧師' },
  { id: '20200607', date: moment('07/06/2020', 'DD/MM/YYYY'), title: '基督徒的普世視野', messanger: '蔡康怡牧師' },
  { id: '20200531', date: moment('31/05/2020', 'DD/MM/YYYY'), title: '分享主日', messanger: '---' },
  { id: '20200524', date: moment('24/05/2020', 'DD/MM/YYYY'), title: '要到幾時呢？！', messanger: '林瑞興牧師' },
  { id: '20200517', date: moment('17/05/2020', 'DD/MM/YYYY'), title: '與神同工的領袖', messanger: '繆振聲傳道' },
  { id: '20200510', date: moment('10/05/2020', 'DD/MM/YYYY'), title: '你的信心真大', messanger: '黃雪梅傳道' },
  { id: '20200503', date: moment('03/05/2020', 'DD/MM/YYYY'), title: '不要憂慮', messanger: '霍志鵬先生 (同心圓敬拜福音平台總幹事)' },
  { id: '20200426', date: moment('26/04/2020', 'DD/MM/YYYY'), title: '你是安全的', messanger: '鄧心寧傳道' },
  { id: '20200419', date: moment('19/04/2020', 'DD/MM/YYYY'), title: '搜尋智慧 Search for Wisdom', messanger: '黃雪梅傳道' },
  { id: '20200412', date: moment('12/04/2020', 'DD/MM/YYYY'), title: '復活的大能', messanger: '謝健雄牧師' },
  { id: '20200405', date: moment('05/04/2020', 'DD/MM/YYYY'), title: '主需要用你', messanger: '繆振聲傳道' },
  { id: '20200329', date: moment('29/03/2020', 'DD/MM/YYYY'), title: '分享主日', messanger: '---' },
  { id: '20200322', date: moment('22/03/2020', 'DD/MM/YYYY'), title: '與神摔跤的人', messanger: '黃雪梅傳道' },
  { id: '20200315', date: moment('15/03/2020', 'DD/MM/YYYY'), title: '主恩奇妙，因病得福', messanger: '林瑞興牧師' },
  { id: '20200308', date: moment('08/03/2020', 'DD/MM/YYYY'), title: '作耶穌的見證人', messanger: '繆振聲傳道' },
  { id: '20200223', date: moment('23/02/2020', 'DD/MM/YYYY'), title: '成為別人的祝福', messanger: '潘仕楷傳道' },
  { id: '20200216', date: moment('16/02/2020', 'DD/MM/YYYY'), title: '穿上新人', messanger: '繆振聲傳道' },
]

function WorshipList() {
  const history = useHistory();

  const [pageItems, setPageItems] = React.useState<Array<{ id: string, date: moment.Moment, title: string, messanger: string }> | null>(null);
  const [pageNumber, setPageNumber] = React.useState(1);
  const pageSize = 5;

  function onCellClicked(id: any) {
    history.push('/worship/' + id)
  };

  let items = [];
  if (pageItems == null || pageItems.length == 0) {
    items.push(<Pagination.First key={1} />, <Pagination.Prev key={2} />)
    items.push(
      <Pagination.Item key={3} active disabled>
        1
      </Pagination.Item>
    );
    items.push(<Pagination.Next key={4} />, <Pagination.Last key={5} />)
  } else {
    items.push(<Pagination.First key={1} onClick={() => onPageChanged(1)} />,
      <Pagination.Prev key={2} onClick={() => onPageChanged(pageNumber - 1)} />)
    for (let number = 1; number <= Math.ceil(data.length / pageSize); number++) {
      items.push(
        <Pagination.Item key={number + 2} active={number === pageNumber} onClick={() => onPageChanged(number)}>
          {number}
        </Pagination.Item>,
      );
    }
    items.push(<Pagination.Next key={Math.ceil(data.length / pageSize) + 3} onClick={() => onPageChanged(pageNumber + 1)} />,
      <Pagination.Last key={Math.ceil(data.length / pageSize) + 4} onClick={() => onPageChanged(Math.ceil(data.length / pageSize))} />)
  }

  const onPageChanged = (page: number) => {
    if (page > Math.ceil(data.length / pageSize) || page == 0)
      return
    let array: Array<{ id: string, date: moment.Moment, title: string, messanger: string }> = [];
    for (let i = (pageSize * page) - pageSize; i < pageSize * page; i++) {
      data[i] && array.push(data[i])
    }
    setPageItems(array)
    setPageNumber(page)
  }

  useEffect(() => {

    //Default scroll to top
    window.scrollTo(0, 0)

    onPageChanged(1)
    
  }, [])

  return (
    <>
      <div
        //className="section section-download"
        className="section"
        id="download-section"
      >
        <Container style={{ marginTop: -50 }}>
          <Row className="text-center mb-3 mx-3">
            {/* <p className="w-100">
              我要聽　神—耶和華所說的話，因為他必應許賜平安給他的百姓，就是他的聖民；<br />
              他們卻不可再轉向愚昧。他的救恩誠然與敬畏他的人相近，<br />
              使榮耀住在我們的地上。<br />
              (詩篇 85:8-9 和合本2010)<br />
            </p> */}
          </Row>
          <Row className="mt-5">
            <Table striped className={pageItems && pageItems.length > 0 ? 'clickable' : ''}>
              <thead>
                <tr>
                  <th style={{ width: '15%' }}>日期</th>
                  <th style={{ width: '45%' }}>標題</th>
                  <th style={{ width: '30%' }}>講員</th>
                  <th style={{ width: '10%' }}></th>
                </tr>
              </thead>
              <tbody>
                {(pageItems == null || pageItems.length == 0) && <tr><th className="text-center" colSpan={4}>沒有記錄</th></tr>}
                {
                  (pageItems && pageItems.length > 0) && pageItems.map((value, index) => {
                    return <tr key={index}>
                      <th scope="row">{value.date.format('YYYY-MM-DD')}</th>
                      <td onClick={() => onCellClicked(value.id)}>{value.title}{(index == 0 && pageNumber == 1) && <b className="ml-3" style={{ color: 'red' }}><i>新</i></b>}</td>
                      <td onClick={() => onCellClicked(value.id)}>{value.messanger}</td>
                      <td onClick={() => onCellClicked(value.id)}><a href="#">前往</a></td>
                    </tr>
                  })
                }
              </tbody>
            </Table>
            <Pagination
              className="w-100 pagination-primary justify-content-center"
            >
              {items}
            </Pagination>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default WorshipList;