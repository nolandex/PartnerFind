import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface ClassContextValue {
  selectedClassId: string;
  setSelectedClassId: (id: string) => void;
}

const ClassContext = createContext<ClassContextValue>({
  selectedClassId: "finance_class",
  setSelectedClassId: () => {},
});

export function ClassProvider({ children }: { children: ReactNode }) {
  const [selectedClassId, setSelectedClassId] = useState<string>(() => {
    return localStorage.getItem("selectedClassId") || "finance_class";
  });

  useEffect(() => {
    localStorage.setItem("selectedClassId", selectedClassId);
  }, [selectedClassId]);

  return (
    <ClassContext.Provider value={{ selectedClassId, setSelectedClassId }}>
      {children}
    </ClassContext.Provider>
  );
}

export function useClassSelection() {
  return useContext(ClassContext);
}
