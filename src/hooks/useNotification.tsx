import { useQuery, useMutation } from '@apollo/client';
import { setSystemFailure } from 'actions';
import { MutationReadNotificationArgs, Notification, QueryNotificationsArgs } from 'generated/graphql';
import { GET_NOTIFICATIONS, READ_NOTIFICATIONS } from 'graphqls/graphql';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState } from 'reducers';
import { getTokenValue } from 'utils/utils';

export default function useNotification(){

  const location = useLocation()

  const dispatch = useDispatch()

  const tokenPair = useSelector((state: RootState) => state.auth.tokenPair);

  const { loading, data, refetch } = useQuery<{ notifications: Notification[] }, QueryNotificationsArgs>
    (GET_NOTIFICATIONS, { variables: { toUsername: getTokenValue(tokenPair?.token).username }, notifyOnNetworkStatusChange: true });
  const [readNotification] = useMutation<
    { readNotification: string },
    MutationReadNotificationArgs
  >(READ_NOTIFICATIONS, {
    refetchQueries: [
      { query: GET_NOTIFICATIONS, variables: { toUsername: getTokenValue(tokenPair?.token).username } }
    ]
  })

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const handleReadClick = (i: number) => {
    if (data?.notifications[i].isRead)
      return
    const update = data?.notifications.map((e, idx) => {
      if (idx === i)
        return { ...e, isRead: true }
      return e
    })
    readNotification({
      variables: {
        input: update?.[i]._id
      }
    }).catch(e => {
      dispatch(setSystemFailure(e))
    })
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  useEffect(() => {
    refetch && refetch()
  }, [location, refetch])

  return { loading, data, anchorRef, open, handleClose, handleReadClick, handleToggle, handleListKeyDown }
  
}