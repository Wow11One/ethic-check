"use client";

import { useState } from "react";
import { AIRequestForm } from "../AIRequestForm";
import { AIResponseDisplay } from "../AIResponseDisplay/AIResponseDisplay";
import { CheckResults } from "@/types/formTypes";

export const AIServicePage = () => {
  const [checkResult, setCheckResults] = useState<{
    geminiResponse: CheckResults[];
  }>({
    geminiResponse: [],
  });
  const [loading, setIsLoading] = useState(false);

  return (
    <div className="bg-black min-h-screen grid grid-cols-1 lg:grid-cols-5">
      <div className="lg:col-span-3">
        <AIResponseDisplay checkResult={checkResult} loading={loading} />
      </div>
      <div className="lg:col-span-2">
        <AIRequestForm
          setCheckResults={setCheckResults}
          setLoading={setIsLoading}
          loading={loading}
          checkResult={checkResult}
        />
      </div>
    </div>
  );
};
