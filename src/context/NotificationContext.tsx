import useNotification from "hooks/useNotification";
import React, { Dispatch, SetStateAction } from "react";

const NotificationContext = React.createContext<ReturnType<typeof useNotification> | null>(null)

export default NotificationContext;