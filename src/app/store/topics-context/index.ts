import { Topic } from "@/components/molecules/Topic/types";
import { createContext, useState } from "react";

const TopicsContext = createContext({
  contentTopics: [] as Topic[],
  setContentTopics: () => {},
});
