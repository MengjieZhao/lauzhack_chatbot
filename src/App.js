import React from "react";
import Chat, { Bubble, useMessages } from "@chatui/core";
import "@chatui/core/es/styles/index.less";
import "@chatui/core/dist/index.css";

const initialMessages = [
  {
    type: "text",
    content: { text: "Howdy! I'm SoulBot!" },
    user: {
      avatar: "//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg",
    },
  },
  {
    type: "text",
    content: { text: "What are you struggling with today?" },
    user: {
      avatar: "//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg",
    },
  },
];

// 默认快捷短语，可选
const defaultQuickReplies = [
  {
    name: "Anger",
    isNew: true,
    isHighlight: true,
  },
  {
    name: "Loneliness",
    isNew: true,
  },
  {
    name: "Emptiness",
    isHighlight: true,
  },
  {
    name: "Overwhelmed",
  },
  {
    name: "Guilt",
  },
  {
    name: "Anxiety",
  },
  {
    name: "Rejection",
  },
  {
    name: "Helplessness",
  },
];

const App = () => {
  const { messages, appendMsg, setTyping } = useMessages(initialMessages);

  function handleSend(type, val) {
    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right",
      });

      setTyping(true);

      setTimeout(() => {
        appendMsg({
          type: "text",
          content: {
            text: "Lorem Impsum Dolor Si Amet",
          },
          user: {
            avatar: "//gw.alicdn.com/tfs/TB1DYHLwMHqK1RjSZFEXXcGMXXa-56-62.svg",
          },
        });
      }, 1000);
    }
  }

  function handleQuickReplyClick(item) {
    handleSend("text", item.name);
  }

  function renderMessageContent(msg) {
    const { type, content } = msg;

    switch (type) {
      case "text":
        return <Bubble content={content.text} />;
      case "image":
        return (
          <Bubble type="image">
            <img src={content.picUrl} alt="" />
          </Bubble>
        );
      default:
        return null;
    }
  }

  return (
    <Chat
      navbar={{ title: "SoulBot" }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      quickReplies={defaultQuickReplies}
      onQuickReplyClick={handleQuickReplyClick}
      onSend={handleSend}
    />
  );
};

export default App;
