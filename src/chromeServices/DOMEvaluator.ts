import { DOMMessage, DOMMessageResponse, DOMFilterBuild } from "../types";

const messagesFromReactAppListener = (
  msg: DOMMessage | DOMFilterBuild,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: DOMMessageResponse) => void
) => {
  console.log("[content.js]. Message received", msg);

  if (msg.type === "FILTER_BUILD") {
    // filter
    var clearFilter = document.getElementsByClassName(
      "text-primary-4 hover:text-primary-3 transition hover:cursor-pointer"
    )[0] as HTMLElement;
    clearFilter.click();

    let filterTabs = document.getElementsByClassName(
      "tab px-32 py-12 text-20 text-center font-bold mr-8"
    )
      ? document.getElementsByClassName(
          "tab px-32 py-12 text-20 text-center font-bold mr-8"
        )
      : document.getElementsByClassName(
          "tab px-32 py-12 text-20 text-center font-bold mr-8 transition-bg hover:bg-gray-4 cursor-pointer"
        );

    let tabOne = filterTabs[0] as HTMLElement;
    let tabTwo = filterTabs[1] as HTMLElement;
    let tabThree = filterTabs[2] as HTMLElement;

    tabOne.click();
  }

  if (msg.type === "GET_DOM") {
    const response: DOMMessageResponse = {
      title: document.title,
      headlines: Array.from(document.getElementsByTagName<"h1">("h1")).map(
        (h1) => h1.innerText
      ),
    };
    console.log("[content.js]. Message response", response);

    sendResponse(response);
  }
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
