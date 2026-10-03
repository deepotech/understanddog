"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, FileAudio, RotateCcw, AlertCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";

interface AudioUploaderProps {
  onAudioReady: (file: File, durationSeconds: number) => void;
  onClear: () => void;
}

export function AudioUploader({ onAudioReady, onClear }: AudioUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const maxBytes = SITE_CONFIG.limits.maxAudioMb * 1024 * 1024;
  const maxSec = SITE_CONFIG.limits.maxAudioSeconds;

  const processFile = (selectedFile: File) => {
    setError(null);

    // Size check
    if (selectedFile.size > maxBytes) {
      setError(`Audio file exceeds maximum size of ${SITE_CONFIG.limits.maxAudioMb} MB.`);
      return;
    }

    if (selectedFile.size < 1000) {
      setError("File is too small to contain valid audio.");
      return;
    }

    const url = URL.createObjectURL(selectedFile);
    const audio = new Audio(url);

    audio.onloadedmetadata = () => {
      const dur = audio.duration;
      if (dur && dur > maxSec + 2) {
        URL.revokeObjectURL(url);
        setError(`Audio exceeds maximum length of ${maxSec} seconds (${Math.round(dur)}s detected).`);
        return;
      }
      setDuration(dur || 0);
      setFile(selectedFile);
      setPreviewUrl(url);
      onAudioReady(selectedFile, dur || 1);
    };

    audio.onerror = () => {
      // In case metadata read fails in browser, accept file if format seems audio
      setDuration(null);
      setFile(selectedFile);
      setPreviewUrl(url);
      onAudioReady(selectedFile, 5);
    };
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleReset = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl(null);
    setDuration(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    onClear();
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-8 bg-white rounded-2xl border border-stone-200 shadow-sm transition-all">
      {error && (
        <div
          role="alert"
          className="mb-4 flex items-start gap-2.5 p-3.5 bg-red-50 text-red-800 text-sm rounded-xl border border-red-200 w-full"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      {!file ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`w-full flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
            dragOver
              ? "border-amber-600 bg-amber-50/50"
              : "border-stone-300 hover:border-amber-600 hover:bg-stone-50"
          }`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              fileInputRef.current?.click();
            }
          }}
          aria-label="Upload an audio file of your dog"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/wav,audio/mp3,audio/mpeg,audio/webm,audio/ogg,audio/m4a,audio/x-m4a"
            onChange={handleChange}
            className="hidden"
          />
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-800 flex items-center justify-center mb-3">
            <UploadCloud className="w-7 h-7" />
          </div>
          <p className="text-sm sm:text-base font-semibold text-stone-900 text-center">
            Click to upload or drag & drop audio
          </p>
          <p className="text-xs text-stone-500 mt-1 text-center">
            WAV, MP3, M4A, WebM, or OGG up to {SITE_CONFIG.limits.maxAudioMb} MB (max 30s)
          </p>
        </div>
      ) : (
        <div className="w-full max-w-sm flex flex-col items-center gap-3">
          <div className="flex items-center gap-2.5 text-sm font-semibold text-stone-800">
            <FileAudio className="w-5 h-5 text-amber-700" />
            <span className="truncate max-w-[200px]">{file.name}</span>
            {duration !== null && (
              <span className="text-xs text-stone-500 font-normal">
                ({Math.round(duration)}s)
              </span>
            )}
          </div>

          {previewUrl && (
            <audio
              controls
              src={previewUrl}
              className="w-full h-10 rounded-lg focus:outline-none"
            >
              Your browser does not support the audio playback element.
            </audio>
          )}

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 p-1.5 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Select Another File</span>
          </button>
        </div>
      )}
    </div>
  );
}
