import React, { useEffect, useState } from 'react';
import { selectThreadId } from 'features/threadSlice';
import { useSelector } from 'react-redux';
import { db } from '../../../../firebase';
import { Message } from '../Message';
import './Bubbles.scss';
import { Menu, MenuItem } from '@mui/material';
import i18n from '../../../../i18n';
import { useTranslation } from 'react-i18next';

export function Bubbles() {
  const [messages, setMessages] = useState([]);
  const threadId = useSelector(selectThreadId);
  const { t } = useTranslation();

  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (event) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: event.clientX + 2,
            mouseY: event.clientY - 6,
          }
        : null
    );
  };

  const handleClose = () => {
    setContextMenu(null);
  };

  useEffect(() => {
    if (threadId) {
      db.collection('rooms')
        .doc(threadId)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) => {
          setMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    }
  }, [threadId]);

  const shouldRenderServiceMsg = (messagesArray, index) => {
    if ((index === 0 && messagesArray.length <= 1) || index === messagesArray.length - 1) {
      return true;
    } else if (
      messagesArray[index]?.data?.timestamp
        ?.toDate()
        .toLocaleDateString(i18n.language, { month: 'long', day: 'numeric' }) ===
      messagesArray[index + 1]?.data?.timestamp
        ?.toDate()
        .toLocaleDateString(i18n.language, { month: 'long', day: 'numeric' })
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className={messages.length ? 'chat__bubbles --scrollable' : 'chat__bubbles'} onContextMenu={handleContextMenu}>
      {messages.map(({ id, data }, index) => {
        if (index === messages.length - 1) {
          return (
            <React.Fragment key={id}>
              <Message data={data} />
              <div className='service-msg'>
                {t(
                  `${messages[index]?.data?.timestamp
                    ?.toDate()
                    .toLocaleDateString(i18n.language, { month: 'long', day: 'numeric' })}`
                )}
              </div>
            </React.Fragment>
          );
        } else if (shouldRenderServiceMsg(messages, index)) {
          return <Message key={id} data={data} />;
        } else {
          return (
            <React.Fragment key={id}>
              <Message data={data} />
              <div className='service-msg'>
                {t(
                  `${messages[index - 1 && index]?.data?.timestamp
                    ?.toDate()
                    .toLocaleDateString(i18n.language, { month: 'long', day: 'numeric' })}`
                )}
              </div>
            </React.Fragment>
          );
        }
      })}

      {/* <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleClose}>Copy</MenuItem>
        <MenuItem onClick={handleClose}>Print</MenuItem>
        <MenuItem onClick={handleClose}>Highlight</MenuItem>
        <MenuItem onClick={handleClose}>Email</MenuItem>
      </Menu> */}
    </div>
  );
}
