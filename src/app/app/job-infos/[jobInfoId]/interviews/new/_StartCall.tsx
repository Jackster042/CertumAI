"use client";

import { env } from "@/app/data/env/client";
import { Button } from "@/components/ui/button";
import { JobInfoTable } from "@/drizzle/schema";
import { createInterview } from "@/features/interviews/actions";
import { errorToast } from "@/lib/errorToast";
import { CondensedMessages } from "@/services/hume/components/CondensedMessages";
import { condenseChatMessages } from "@/services/hume/lib/condenseChatMessages";
import { useVoice, VoiceReadyState } from "@humeai/voice-react";
import { Loader2Icon } from "lucide-react";
import { useMemo, useState } from "react";

export function StartCall({
  jobInfo,
  accessToken,
  user,
}: {
  jobInfo: Pick<
    typeof JobInfoTable.$inferSelect,
    "id" | "title" | "description" | "experienceLevel"
  >;
  accessToken: string;
  user: {
    name: string;
    imageUrl: string;
  };
}) {
  const [interviewId, setInterviewId] = useState<string | null>(null);

  const { connect, disconnect, readyState } = useVoice();

  if (readyState === VoiceReadyState.IDLE) {
    return (
      <div className="flex justify-center items-center h-screen-header">
        <Button
          size="lg"
          className="cursor-pointer"
          onClick={async () => {
            const res = await createInterview({ jobInfoId: jobInfo.id });
            if (res.error) {
              return errorToast(res.message);
            }
            setInterviewId(res.id);
            connect({
              auth: { type: "accessToken", value: accessToken },
              configId: env.NEXT_PUBLIC_HUME_CONFIG_ID,
              sessionSettings: {
                type: "session_settings",
                variables: {
                  userName: user.name,
                  title: jobInfo.title || "Not specified",
                  description: jobInfo.description || "Not specified",
                  experienceLevel: jobInfo.experienceLevel,
                },
              },
            });
          }}
        >
          Start Interview
        </Button>
      </div>
    );
  }

  if (
    readyState === VoiceReadyState.CONNECTING ||
    readyState === VoiceReadyState.CLOSED
  ) {
    return (
      <div className="flex items-center justify-center h-screen-reader">
        <Loader2Icon className="animate-spin size-24" />
      </div>
    );
  }

  return (
    <div className="overflow-y-auto h-screen-reader flex flex-col-reverse">
      <div className="container flex py-6 flex-col items-center justify-end gap-4">
        <h2>Controls</h2>
      </div>
    </div>
  );
}

// TODO
function Messages({ user }: { user: { name: string; imageUrl: string } }) {
  const { messages, fft } = useVoice();

  const condensedMessages = useMemo(() => {
    return condenseChatMessages(messages);
  }, [messages]);

  return (
    <CondensedMessages
      messages={condensedMessages}
      user={user}
      maxFft={Math.max(...fft)}
      className="max-w-5xl"
    />
  );
}

function Controls() {}

function FftVisualizer() {}
