import React, { useEffect } from "react";
import Chat, { Bubble, useMessages } from "@chatui/core";
import "@chatui/core/dist/index.css";
import "@chatui/core/es/styles/index.less";
import "./index.css";
import './chatui-theme.css';

const initialMessages = [
  {
    type: "text",
    content: { text: "Howdy! I'm SoulBot!" },
    user: {
      avatar: "https://github.com/HumanRupert/lauzhack_chatbot/blob/master/public/logo.jpg",
    },
  },
  {
    type: "text",
    content: { text: "What are you struggling with today?" },
    user: {
      avatar: "https://github.com/HumanRupert/lauzhack_chatbot/blob/master/public/logo.jpg",
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
    name: "Exhaustion",
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
  {
    name: "Regret",
  },
  {
    name: "Heartbreak",
  },
];

const App = () => {
  useEffect(() => {
    document.title = 'SoulBot';
  }, []);

  const { messages, appendMsg, setTyping } = useMessages(initialMessages);

  async function handleSend(type, val) {
    if (type === "text" && val.trim()) {
      appendMsg({
        type: "text",
        content: { text: val },
        position: "right",
      });

      setTyping(true);

      const res = await (await fetch("http://127.0.0.1:8000/" + val)).json()
      console.log(res)

      appendMsg({
        type: "text",
        content: {
          text: res,
        },
        user: {
          avatar: "https://github.com/HumanRupert/lauzhack_chatbot/blob/master/public/logo.jpg",
        },
      });

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

  return <Chat
      locale='zh-CN'
      navbar={{ title: "SoulBot" }}
      messages={messages}
      renderMessageContent={renderMessageContent}
      quickReplies={defaultQuickReplies}
      onQuickReplyClick={handleQuickReplyClick}
      onSend={handleSend}
    />
  
};

export default App;
