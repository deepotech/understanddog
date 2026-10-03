"use client";

import React, { useState } from "react";
import { Mic, UploadCloud, Sparkles, Loader2, AlertCircle } from "lucide-react";
import { AudioRecorder } from "./AudioRecorder";
import { AudioUploader } from "./AudioUploader";
import { ContextSelector } from "./ContextSelector";
import { AnalysisResultCard } from "./AnalysisResultCard";
import { ContextTrigger, DogAnalysisResult } from "@/lib/ai/types";
import { analytics } from "@/lib/analytics/tracker";

type InputMode = "record" | "upload";

export function TranslatorShell() {
  const [mode, setMode] = useState<InputMode>("record");
  const [audioData, setAudioData] = useState<{
    blob: Blob;
    durationSeconds: number;
    fileName?: string;
  } | null>(null);
  const [selectedContext, setSelectedContext] = useState<ContextTrigger>("unknown");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DogAnalysisResult | null>(null);

  const handleAudioReady = (blob: Blob, durationSeconds: number, fileName?: string) => {
    setAudioData({ blob, durationSeconds, fileName });
    setError(null);
    if (mode === "record") {
      analytics.track("audio_recorded", { durationSeconds });
    } else {
      analytics.track("audio_uploaded", {
        sizeBytes: blob.size,
        format: blob.type || "unknown",
      });
    }
  };

  const handleClear = () => {
    setAudioData(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!audioData) {
      setError("Please record or upload a dog sound before requesting analysis.");
      return;
    }

    setIsLoading(true);
    setError(null);

    analytics.track("translator_started", {
      source: mode === "record" ? "recording" : "upload",
      hasContext: selectedContext !== "unknown",
    });

    try {
      const formData = new FormData();
      const fileExt = audioData.fileName
        ? audioData.fileName.split(".").pop()
        : audioData.blob.type.includes("wav")
        ? "wav"
        : audioData.blob.type.includes("mp3")
        ? "mp3"
        : "webm";

      const file = new File(
        [audioData.blob],
        audioData.fileName || `dog-sound.${fileExt}`,
        { type: audioData.blob.type || "audio/webm" }
      );

      formData.append("audio", file);
      formData.append("context", selectedContext);
      formData.append("duration", String(audioData.durationSeconds || 1));

      const response = await fetch("/api/translate-dog", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        if (data && data.status) {
          setResult({
            status: data.status,
            vocalization: "unidentified",
            interpretation: {
              primary:
                data.status === "rate_limited"
                  ? "Rate Limit Reached"
                  : "Audio Validation Notice",
              summary: data.error || "Please verify your recording and try again.",
              confidence: "possible",
            },
            possibleContexts: [],
            observations: [],
            suggestions: [
              data.status === "rate_limited"
                ? "Please wait a moment before sending another analysis request."
                : "Ensure your audio is a valid WAV, MP3, WebM, OGG, or M4A file under 10MB.",
            ],
            disclaimer:
              "UnderstandDog provides probabilistic behavioral interpretations grounded in canine bioacoustics.",
          });
          return;
        }
        throw new Error(data.error || "Unable to analyze audio at this time.");
      }

      setResult(data);
      analytics.track("translator_completed", {
        vocalization: data.vocalization,
        confidence: data.interpretation?.confidence || "possible",
        durationSeconds: audioData.durationSeconds,
        isDemoMode: data.isDemoMode,
      });
    } catch (err: unknown) {
      console.error("Analysis error:", err);
      const errMsg =
        err instanceof Error ? err.message : "An unexpected network error occurred.";
      setError(errMsg);
      analytics.track("translator_failed", { errorType: errMsg });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetAll = () => {
    setAudioData(null);
    setResult(null);
    setError(null);
    setSelectedContext("unknown");
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      {result ? (
        <AnalysisResultCard result={result} onReset={handleResetAll} />
      ) : (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-7 space-y-6">
          {/* Mode Switcher Tabs */}
          <div className="flex rounded-xl bg-stone-100 p-1">
            <button
              type="button"
              onClick={() => {
                setMode("record");
                handleClear();
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                mode === "record"
                  ? "bg-white text-stone-900 shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <Mic className="w-4 h-4 text-amber-700" />
              <span>Record Audio</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("upload");
                handleClear();
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
                mode === "upload"
                  ? "bg-white text-stone-900 shadow-xs"
                  : "text-stone-600 hover:text-stone-900"
              }`}
            >
              <UploadCloud className="w-4 h-4 text-amber-700" />
              <span>Upload Audio</span>
            </button>
          </div>

          {/* Primary Audio Input Section */}
          <div>
            {mode === "record" ? (
              <AudioRecorder
                onAudioReady={(blob, dur) => handleAudioReady(blob, dur)}
                onClear={handleClear}
              />
            ) : (
              <AudioUploader
                onAudioReady={(file, dur) => handleAudioReady(file, dur, file.name)}
                onClear={handleClear}
              />
            )}
          </div>

          {/* Optional Context Picker */}
          <div className="pt-2 border-t border-stone-100">
            <ContextSelector
              selectedContext={selectedContext}
              onChange={setSelectedContext}
            />
          </div>

          {/* Error Banner */}
          {error && (
            <div
              role="alert"
              className="flex items-start gap-2.5 p-3.5 bg-red-50 text-red-800 text-sm rounded-xl border border-red-200"
            >
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          {/* Analyze Action Button */}
          <div>
            <button
              type="button"
              disabled={isLoading || !audioData}
              onClick={handleAnalyze}
              aria-label={
                isLoading
                  ? "Analyzing sound..."
                  : !audioData
                  ? "Record or upload a sound first"
                  : "Analyze My Dog's Sound"
              }
              className={`w-full py-3.5 px-6 rounded-xl font-semibold text-base flex items-center justify-center gap-2 shadow-sm transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/50 ${
                isLoading || !audioData
                  ? "bg-stone-200 text-stone-500 cursor-not-allowed"
                  : "bg-amber-700 hover:bg-amber-800 text-white shadow-amber-900/10 active:scale-[0.99]"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Analyzing canine acoustics...</span>
                </>
              ) : !audioData ? (
                <span>Record or upload a sound first</span>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-amber-200" />
                  <span>Analyze My Dog&apos;s Sound</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-center text-stone-500 mt-2">
              Privacy by Design: Audio is processed ephemerally in memory and is not permanently stored.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
