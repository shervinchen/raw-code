import { TextInput } from "@inkjs/ui";
import {
  convertToModelMessages,
  createIdGenerator,
  readUIMessageStream,
  type UIMessage,
} from "ai";
import { Box, Text } from "ink";
import { useReducer } from "react";
import { useSnapshot } from "valtio";
import { agentService } from "../services/agent.service.ts";
import { uiStore } from "./ui.store.ts";

export function UserInput() {
  const [key, forceUpdate] = useReducer((p) => p + 1, 0);

  const handleSubmit = async (value: string) => {
    forceUpdate();
    try {
      uiStore.isThinking = true;
      const userMessage: UIMessage = {
        role: "user",
        id: crypto.randomUUID(),
        parts: [{ type: "text", text: value }],
      };
      uiStore.messages.push(userMessage);
      const result = await agentService.generateStream(
        await convertToModelMessages(uiStore.messages),
      );
      const uiMessageStream = readUIMessageStream({
        stream: result.toUIMessageStream({
          generateMessageId: createIdGenerator({ prefix: "agent", size: 16 }),
        }),
      });
      for await (const uiMessage of uiMessageStream) {
        const index = uiStore.messages.findIndex((m) => m.id === uiMessage.id);
        if (index > -1) {
          uiStore.messages[index] = uiMessage;
        } else {
          uiStore.messages.push(uiMessage);
        }
      }
    } finally {
      uiStore.isThinking = false;
    }
  };

  return (
    <Box borderStyle="round" borderColor="redBright" paddingX={2} paddingY={1}>
      <TextInput
        key={key}
        placeholder="Ask AI to do something..."
        onSubmit={handleSubmit}
      />
    </Box>
  );
}
