"use client";

import { useState, useRef } from "react";
import {
  NotificationIconButton,
  NotificationFeedPopover,
} from "@knocklabs/react";

export default function NotifyBtn() {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);

  return (
    <div>
      <NotificationIconButton
        ref={notifButtonRef}
        onClick={(e) => setIsVisible(!isVisible)}
      />
      <NotificationFeedPopover
        buttonRef={notifButtonRef}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
      />
    </div>
  );
}
