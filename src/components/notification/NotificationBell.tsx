import { useMutation, useQuery } from '@apollo/client';
import { setSystemFailure } from 'actions';
import { GET_NOTIFICATIONS, READ_NOTIFICATIONS } from 'graphqls/graphql';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { RootState } from 'reducers';
import { getKeyValue, getTimePastStr, getTokenValue } from 'utils/utils';
import * as presets from '../../assets/data/data.json'

function NotificationBell(props: any) {

  const location = useLocation()

  const dispatch = useDispatch()

  const [notifications, setNotifications] = useState<any[]>([])

  const tokenPair = useSelector((state: RootState) => state.auth.tokenPair);

  const { data, refetch } = useQuery(GET_NOTIFICATIONS, { variables: { toUsername: getTokenValue(tokenPair?.token).username }, notifyOnNetworkStatusChange: true });
  const [readNotification] = useMutation(READ_NOTIFICATIONS)

  useEffect(() => {
    if (data !== undefined)
      setNotifications(data.notifications)
  }, [data])

  useEffect(() => {
    refetch && setTimeout(() => {
      refetch()
    }, 200);
  }, [location, refetch])

  const handleClick = (i: number) => {
    if (notifications[i].isRead)
      return
    const update = notifications.map((e, idx) => {
      if (idx === i)
        return { ...e, isRead: true }
      return e
    })
    readNotification({
      variables: {
        input: update[i]._id
      }
    }).catch(e => {
      dispatch(setSystemFailure(e))
    })
    setNotifications(update)
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
      return <div key={e._id}>
        <NavDropdown.Item
          as={Link}
          // to={e.path + e.param}
          to={`/${getKeyValue(presets.COMMON.NOTIFICATION_TYPE, e.type).PATH}/${e.param}`}
          onClick={() => {
            // e.preventDefault()
            handleClick(idx)
          }}
          style={{ width: 290, whiteSpace: 'pre-wrap', display: 'flex' }}
        >
          <div className="mr-2">
            <i style={{ fontSize: 24 }} className={e.type === 'LIKE' ? "fa fa-thumbs-up" : "fas fa-comment-dots"}></i>
          </div>
          <div>
            <span>{e.fromUsername + " " + getKeyValue(presets.COMMON.NOTIFICATION_TYPE, e.type).LABEL}</span>
            <br />
            <span className="text-secondary">{getTimePastStr(moment(e.creDttm))}</span>
          </div>
          <div className="ml-auto">
            {!e.isRead && <span className="dot bg-info"></span>}
          </div>
        </NavDropdown.Item>
        <NavDropdown.Divider />
      </div>
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

export default NotificationBell;