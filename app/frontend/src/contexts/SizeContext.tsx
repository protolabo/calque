import React, { createContext, useContext, ReactNode } from "react";
import { useResponsiveElement, SizeCategory } from "../hooks/useElementSize";

interface SizeContextType {
  size: SizeCategory;
}

interface SizeProviderProps {
  children: ReactNode;
  size?: SizeCategory;
}

export const SizeContext = createContext<SizeContextType | undefined>(
  undefined,
);

export const SizeProvider: React.FC<SizeProviderProps> = ({
  children,
  size,
}) => {
  const { ref, size: detectedSize } = useResponsiveElement();
  const providedSize = size || detectedSize;

  return (
    <SizeContext.Provider value={{ size: providedSize }}>
      <div ref={ref} className={`size-provider size-${providedSize}`}>
        {children}
      </div>
    </SizeContext.Provider>
  );
};

export const useSize = (): SizeContextType => {
  const context = useContext(SizeContext);
  if (!context) {
    throw new Error("useSize must be used within a SizeProvider");
  }
  return context;
};
