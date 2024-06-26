import { type Cookie } from "elysia";
import { type GlobalEventHandlersEventMap } from "typescript/lib/lib.dom";
import { type HtmxAttributes } from "../types";

export interface DefaultPageProps {
  theme: Cookie<string | undefined>;
}

const globalEventHandlers: (keyof GlobalEventHandlersEventMap)[] = [
  "abort",
  "animationcancel",
  "animationend",
  "animationiteration",
  "animationstart",
  "auxclick",
  "beforeinput",
  "beforetoggle",
  "blur",
  "cancel",
  "canplay",
  "canplaythrough",
  "change",
  "click",
  "close",
  "compositionend",
  "compositionstart",
  "compositionupdate",
  "contextmenu",
  "copy",
  "cuechange",
  "cut",
  "dblclick",
  "drag",
  "dragend",
  "dragenter",
  "dragleave",
  "dragover",
  "dragstart",
  "drop",
  "durationchange",
  "emptied",
  "ended",
  "error",
  "focus",
  "focusin",
  "focusout",
  "formdata",
  "gotpointercapture",
  "input",
  "invalid",
  "keydown",
  "keypress",
  "keyup",
  "load",
  "loadeddata",
  "loadedmetadata",
  "loadstart",
  "lostpointercapture",
  "mousedown",
  "mouseenter",
  "mouseleave",
  "mousemove",
  "mouseout",
  "mouseover",
  "mouseup",
  "paste",
  "pause",
  "play",
  "playing",
  "pointercancel",
  "pointerdown",
  "pointerenter",
  "pointerleave",
  "pointermove",
  "pointerout",
  "pointerover",
  "pointerup",
  "progress",
  "ratechange",
  "reset",
  "resize",
  "scroll",
  "scrollend",
  "securitypolicyviolation",
  "seeked",
  "seeking",
  "select",
  "selectionchange",
  "selectstart",
  "slotchange",
  "stalled",
  "submit",
  "suspend",
  "timeupdate",
  "toggle",
  "touchcancel",
  "touchend",
  "touchmove",
  "touchstart",
  "transitioncancel",
  "transitionend",
  "transitionrun",
  "transitionstart",
  "volumechange",
  "waiting",
  "webkitanimationend",
  "webkitanimationiteration",
  "webkitanimationstart",
  "webkittransitionend",
  "wheel",
];

const validHtmxKeys: (keyof HtmxAttributes)[] = [
  "hx-get",
  "hx-post",
  "hx-put",
  "hx-delete",
  "hx-patch",
  "hx-boost",
  "hx-on",
  "hx-push-url",
  "hx-select",
  "hx-select-oob",
  "hx-swap",
  "hx-swap-oob",
  "hx-target",
  "hx-target-",
  "hx-target-error",
  "hx-trigger",
  "hx-vals",
  "hx-disabled-elt",
  "hx-disinherit",
  "hx-encoding",
  "hx-ext",
  "hx-history",
  "hx-history-elt",
  "hx-include",
  "hx-indicator",
  "hx-params",
  "hx-preserve",
  "hx-prompt",
  "hx-replace-url",
  "hx-request",
  "hx-sync",
  "hx-validate",
  "hx-vars",
  ...(globalEventHandlers.map(
    (evt) => `hx-on-${evt}`,
  ) as (keyof HtmxAttributes)[]),
];

export const getHxAttrsFromProps = (props: HtmxAttributes): HtmxAttributes => {
  const hxProps: HtmxAttributes = {};

  validHtmxKeys.forEach((key) => {
    if (props[key] !== undefined) {
      hxProps[key] = props[key];
    }
  });

  return hxProps;
};
