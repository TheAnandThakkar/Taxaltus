import React from "react";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useApp } from "@/contexts/AppContext";
import * as Haptics from "expo-haptics";
import Colors from "@/constants/colors";

interface BookmarkButtonProps {
  id: string;
  size?: number;
}

export function BookmarkButton({ id, size = 22 }: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useApp();
  const bookmarked = isBookmarked(id);

  return (
    <Pressable
      onPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        toggleBookmark(id);
      }}
      hitSlop={12}
    >
      <Ionicons
        name={bookmarked ? "bookmark" : "bookmark-outline"}
        size={size}
        color={bookmarked ? Colors.palette.gold : Colors.palette.slateLight}
      />
    </Pressable>
  );
}
