"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Mic, Square, RotateCcw, Volume2, AlertCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/config/site";

interface AudioRecorderProps {
  onAudioReady: (blob: Blob, durationSeconds: number) => void;
  onClear: () => void;
}

export function AudioRecorder({ onAudioReady, onClear }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recordingSecondsRef = useRef<number>(0);

  const maxSeconds = SITE_CONFIG.limits.maxAudioSeconds;

  const drawVisualizer = useCallback(() => {
    if (!analyserRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const render = () => {
      if (!isRecording) return;
      animationFrameRef.current = requestAnimationFrame(render);
      analyserRef.current?.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight: number;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height;

        ctx.fillStyle = `rgb(${180 + barHeight}, ${90 + barHeight * 0.3}, 40)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    };

    render();
  }, [isRecording]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsRecording(false);
  }, [isRecording]);



  const startRecording = async () => {
    setPermissionError(null);
    audioChunksRef.current = [];

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Microphone access is not supported in this browser.");
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: false,
          autoGainControl: true,
        },
      });
      streamRef.current = stream;

      // Audio visualizer setup
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const audioCtx = new AudioCtx();
        audioContextRef.current = audioCtx;
        const source = audioCtx.createMediaStreamSource(stream);
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 64;
        source.connect(analyser);
        analyserRef.current = analyser;
      } catch {
        // Visualizer is optional progressive enhancement
      }

      // Find supported mime type
      const mimeTypes = [
        "audio/webm;codecs=opus",
        "audio/webm",
        "audio/ogg;codecs=opus",
        "audio/mp4",
        "",
      ];
      const selectedMime = mimeTypes.find(
        (t) => t === "" || MediaRecorder.isTypeSupported(t)
      );

      const recorder = new MediaRecorder(
        stream,
        selectedMime ? { mimeType: selectedMime } : undefined
      );
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, {
          type: recorder.mimeType || "audio/webm",
        });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        onAudioReady(blob, recordingSecondsRef.current || 1);
      };

      recorder.start(250);
      setIsRecording(true);
      setRecordingSeconds(0);
      recordingSecondsRef.current = 0;

      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds((prev) => {
          const next = prev + 1;
          recordingSecondsRef.current = next;
          if (next >= maxSeconds) {
            stopRecording();
          }
          return next;
        });
      }, 1000);
    } catch (err: unknown) {
      console.error("Microphone initialization error:", err);
      const message =
        err instanceof Error && err.name === "NotAllowedError"
          ? "Microphone access was denied. Please allow microphone access in your browser settings to record your dog."
          : "Unable to access microphone. Please check your browser permissions or upload an audio file instead.";
      setPermissionError(message);
    }
  };

  useEffect(() => {
    if (isRecording) {
      drawVisualizer();
    }
  }, [isRecording, drawVisualizer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close();
      }
    };
  }, []);

  const handleReset = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setRecordingSeconds(0);
    setPermissionError(null);
    onClear();
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 sm:p-8 bg-white rounded-2xl border border-stone-200 shadow-sm transition-all">
      {permissionError && (
        <div
          role="alert"
          className="mb-4 flex items-start gap-2.5 p-3.5 bg-red-50 text-red-800 text-sm rounded-xl border border-red-200 w-full"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600 mt-0.5" />
          <p>{permissionError}</p>
        </div>
      )}

      {/* Visual Canvas when recording */}
      {isRecording && (
        <div className="w-full max-w-xs mb-4 flex flex-col items-center">
          <canvas
            ref={canvasRef}
            width={280}
            height={48}
            className="w-full h-12 rounded-lg bg-stone-50 border border-stone-200"
          />
          <div className="flex items-center gap-2 mt-2 text-xs font-mono text-amber-800 font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span>
              RECORDING {String(recordingSeconds).padStart(2, "0")}s / {maxSeconds}s
            </span>
          </div>
        </div>
      )}

      {/* Main Interaction State */}
      {!audioUrl ? (
        <div className="flex flex-col items-center gap-4">
          {!isRecording ? (
            <button
              type="button"
              onClick={startRecording}
              className="group relative flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-amber-700 hover:bg-amber-800 active:scale-95 text-white shadow-lg shadow-amber-900/20 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/50"
              aria-label="Start recording your dog's sound"
            >
              <Mic className="w-10 h-10 sm:w-12 sm:h-12 group-hover:scale-110 transition-transform" />
            </button>
          ) : (
            <button
              type="button"
              onClick={stopRecording}
              className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-red-600 hover:bg-red-700 active:scale-95 text-white shadow-lg shadow-red-900/20 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-red-500/50"
              aria-label="Stop recording"
            >
              <Square className="w-9 h-9 fill-current" />
            </button>
          )}

          <div className="text-center">
            <p className="text-sm sm:text-base font-semibold text-stone-900">
              {isRecording ? "Listening to your dog..." : "Tap to Record Sound"}
            </p>
            <p className="text-xs text-stone-500 mt-0.5">
              {isRecording
                ? "Press the square button when your dog finishes vocalizing"
                : "Record up to 30 seconds of barking, whining, or growling"}
            </p>
          </div>
        </div>
      ) : (
        /* Completed Recording Review */
        <div className="w-full max-w-sm flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-stone-800">
            <Volume2 className="w-4 h-4 text-amber-700" />
            <span>Recorded Audio ({recordingSeconds}s)</span>
          </div>

          <audio
            controls
            src={audioUrl}
            className="w-full h-10 rounded-lg focus:outline-none"
          >
            Your browser does not support the audio playback element.
          </audio>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 p-1.5 rounded-lg hover:bg-stone-100 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Recording</span>
          </button>
        </div>
      )}
    </div>
  );
}
