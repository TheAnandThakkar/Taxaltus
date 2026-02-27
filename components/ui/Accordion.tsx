import React, { useState } from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/lib/useTheme";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

export function Accordion({ title, children }: AccordionProps) {
  const [open, setOpen] = useState(false);
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { borderColor: colors.border }]}>
      <Pressable
        onPress={() => setOpen(!open)}
        style={({ pressed }) => [styles.header, { opacity: pressed ? 0.8 : 1 }]}
      >
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Ionicons name={open ? "chevron-up" : "chevron-down"} size={18} color={colors.textSecondary} />
      </Pressable>
      {open && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 10,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
  },
  title: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    flex: 1,
    marginRight: 8,
  },
  content: {
    paddingHorizontal: 14,
    paddingBottom: 14,
  },
});
