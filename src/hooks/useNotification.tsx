import { setSystemFailure } from 'actions';
import { NotificationsDocument, useNotificationsQuery, useReadNotificationMutation } from 'generated/graphql';
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'reducers';
import { getTokenValue } from 'utils/utils';

export default function useNotification(){

  const dispatch = useDispatch()

  const tokenPair = useSelector((state: RootState) => state.auth.tokenPair);

  const { loading, data, refetch } = useNotificationsQuery({
    variables: { toUsername: getTokenValue(tokenPair?.token).username }, notifyOnNetworkStatusChange: true
  })
  const [readNotification] = useReadNotificationMutation({
    refetchQueries: [
      { query: NotificationsDocument, variables: { toUsername: getTokenValue(tokenPair?.token).username } }
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

  const handleToggle = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
    if(prevOpen)
      refetch()
  }, [refetch])

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  const handleReadClick = (i: number) => {
    if (data?.notifications[i]?.isRead)
      return
    const update = data?.notifications.map((e, idx) => {
      if (idx === i)
        return { ...e, isRead: true }
      return e
    })
    readNotification({
      variables: {
        input: update?.[i]?._id
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

  return { loading, data, anchorRef, open, handleClose, handleReadClick, handleToggle, handleListKeyDown, refetch }
  
}