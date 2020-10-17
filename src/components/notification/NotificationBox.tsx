import moment, { Moment } from 'moment';
import React, { useEffect, useState } from 'react'
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function NotificationBox(props: any) {

  const [notifications, setNotifications] = useState<any[]>([])

  useEffect(() => {
    setNotifications([
      // { type: "LIKE", fromUserId: "sysadmin", path: "/sharing/", param: "5f850a38227dc4647ac6c586", desc: "對您的見證表達了心情", creDttm: moment('17/10/2020 02:02:00', "DD/MM/YYYY hh:mm:ss"), isRead: false },
      // { type: "COMMENT", fromUserId: "tinyu", path: "/sharing/", param: "5f850a38227dc4647ac6c586", desc: "回應了您的見證", creDttm: moment('17/10/2020 00:15:00', "DD/MM/YYYY hh:mm:ss"), isRead: false },
      // { type: "COMMENT", fromUserId: "tinyu", path: "/sharing/", param: "5f850a38227dc4647ac6c586", desc: "回應了您的見證", creDttm: moment('17/10/2020 00:15:00', "DD/MM/YYYY hh:mm:ss"), isRead: false },
      // { type: "COMMENT", fromUserId: "tinyu", path: "/sharing/", param: "5f850a38227dc4647ac6c586", desc: "回應了您的見證", creDttm: moment('17/10/2020 00:15:00', "DD/MM/YYYY hh:mm:ss"), isRead: false },
      // { type: "LIKE", fromUserId: "sysadmin", path: "/sharing/", param: "5f850a38227dc4647ac6c586", desc: "對您的見證表達了心情", creDttm: moment('17/10/2020 02:02:00', "DD/MM/YYYY hh:mm:ss"), isRead: false },
      // { type: "LIKE", fromUserId: "sysadmin", path: "/sharing/", param: "5f850a38227dc4647ac6c586", desc: "對您的見證表達了心情", creDttm: moment('17/10/2020 02:02:00', "DD/MM/YYYY hh:mm:ss"), isRead: false },
    ])
  }, [])

  const handleClick = (i: number) => {
    const update = notifications.map((e, idx) => {
      if (idx === i)
        return { ...e, isRead: true }
      return e
    })
    setNotifications(update)
  }

  const getTimePastStr = (target: Moment) => {
    return target.fromNow()
  }

  return <NavDropdown
    id="app-bell"
    title={<>
      <i className="fa fa-bell"
        style={notifications.filter(x => !x.isRead).length > 0 ? { fontSize: 24, transform: 'translateX(10px)' } : { fontSize: 24 }}>
      </i>
      {notifications.filter(x => !x.isRead).length > 0 && <span style={{ position: 'relative' }} className="badge badge-info">{notifications.filter(x => !x.isRead).length}</span>}
    </>}
    // style={{ transform: 'translateX(-181px) !important' }}
    className={`${props.className} app-bell-alert`}>
    <NavDropdown.Item
      style={{ width: 290, whiteSpace: 'pre-wrap' }}
    >
      <p style={{ fontSize: 18 }}><strong>通知</strong></p>
    </NavDropdown.Item>
    <NavDropdown.Divider />
    {notifications.length === 0 && <div className="w-100 text-center text-secondary">沒有通知</div>}
    {notifications.length > 0 && notifications.map((e: any, idx: number) => {
      return <>
        <NavDropdown.Item
          key={idx}
          as={Link}
          // to={e.path + e.param}
          to=""
          onClick={() => handleClick(idx)}
          style={{ width: 290, whiteSpace: 'pre-wrap', display: 'flex' }}
        >
          <div className="mr-2">
            <i style={{ fontSize: 24 }} className={e.type === 'LIKE' ? "fa fa-thumbs-up" : "fas fa-comment-dots"}></i>
          </div>
          <div>
            <span>{e.fromUserId + e.desc}</span>
            <br />
            <span className="text-secondary">{getTimePastStr(e.creDttm)}</span>
          </div>
          <div className="ml-auto">
            {!e.isRead && <span className="dot bg-info"></span>}
          </div>
        </NavDropdown.Item>
        <NavDropdown.Divider />
      </>
    })}
    <NavDropdown.Item
      as={Link}
      href="#pablo"
      onClick={(e: any) => {
        e.preventDefault();
      }}
      to=""
      style={{ width: 290, whiteSpace: 'pre-wrap' }}
      className="text-center"
    >
      {/* <p className="w-100 text-primary">查看全部</p> */}
    </NavDropdown.Item>
  </NavDropdown>
}

export default NotificationBox;