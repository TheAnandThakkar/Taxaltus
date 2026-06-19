"use client";

import { MessageSquare } from "lucide-react";
import { FEEDBACK_EVENT } from "./FeedbackWidget";

// Opens the feedback modal (rendered once by FeedbackWidget) from anywhere,
// e.g. the footer — replacing the old floating action button.
export default function FeedbackTrigger({
  className = "",
  withIcon = false,
}: {
  className?: string;
  withIcon?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(FEEDBACK_EVENT))}
      className={className}
    >
      {withIcon && <MessageSquare className="w-4 h-4" />}
      Send Feedback
    </button>
  );
}
