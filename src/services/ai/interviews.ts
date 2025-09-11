import { JobInfoTable } from "@/drizzle/schema";
import { fetchChatMessages } from "../hume/lib/api";

export async function getAiInterviewFeedback({
  humeChatId,
  jobInfo,
  userName,
}: {
  humeChatId: string;
  jobInfo: Pick<
    typeof JobInfoTable.$inferSelect,
    "title" | "description" | "experienceLevel"
  >;
  userName: string;
}) {
  const messages = await fetchChatMessages(humeChatId);

  const formattedMessages = messages
    .map((message) => {
      if (message.type !== "USER_MESSAGE" && message.type !== "AGENT_MESSAGE") {
        return null;
      }
      if (message.messageText === null) return null;

      return {
        speaker:
          message.type === "USER_MESSAGE" ? "interviewee" : "interviewer",
        text: message.messageText,
        emotionFeatures:
          message.role === "USER" ? message.emotionFeatures : undefined,
      };
    })
    .filter((f) => f != null);

  const text = await generateText({});

  return null;
}
