import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import { useTheme } from "@/lib/useTheme";

interface ChipProps {
  label: string;
  onPress?: () => void;
  active?: boolean;
}

export function Chip({ label, onPress, active }: ChipProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        {
          backgroundColor: active ? colors.tint : colors.chipBg,
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <Text style={[styles.text, { color: active ? "#fff" : colors.chipText }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  text: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
});
