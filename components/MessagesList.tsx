import { type Message } from "~/core/chat/index.ts";
import * as dateFns from "date-fns";

export interface Props {
  messages: Message[];
}

export default function MessageList(props: Props) {
  return (
    <div>
      {props.messages.map((message, index) => {
        const dateText = dateFns.format(message.date, "HH:mm:ss yyyy/MM/dd");
        const DoNotUseWords: string[] = ["唐澤貴洋殺す", "ポチンチン"];
        const SysMsg = "**伏字**"; //伏字にしたときに置き換えられる言葉

        if (DoNotUseWords.includes(message.body)) {
          for (let i = 0; i < DoNotUseWords.length; i++) {
            message.body = message.body.replaceAll(DoNotUseWords[i], SysMsg);
          }
        }
        
        return (
          <div
            key={index}
            className="block w-full my-4 p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <div className="mb-2 tracking-tight text-gray-600 dark:text-white flex gap-4">
              <span>@{message.user}</span>
              <span>{dateText}</span>
            </div>
            <p className="mb-2 font-bold tracking-tight text-gray-800 dark:text-white break-words">
              {message.body}
            </p>
          </div>
        );
      })}
    </div>
  );
}
