import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

const TodoContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <ScrollArea className="h-[calc(100vh-400px)]">
      <div className="space-y-4 pr-4">
        {children}
      </div>
    </ScrollArea>
  );
};

export default TodoContainer;
