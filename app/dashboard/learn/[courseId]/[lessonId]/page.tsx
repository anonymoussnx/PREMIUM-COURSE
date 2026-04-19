"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft, ChevronRight, Check, Lock, Play,
  FileText, Settings, Volume2, Maximize,
  Pause, SkipForward, SkipBack, X
} from "lucide-react";
import { mockCourses } from "@/lib/mockData";

const DEMO_VIDEO = "https://sample-videos.com/video321/mp4/720/big_buck_bunny_720p_1mb.mp4";

export default function LessonPage({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) {
  const course = mockCourses.find((c) => c.id === params.courseId) || mockCourses[0];
  const allLessons = course.modules.flatMap((m) => m.lessons);
  const currentLesson = allLessons.find((l) => l.id === params.lessonId) || allLessons[0];
  const currentIdx = allLessons.indexOf(currentLesson);

  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notesOpen, setNotesOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [notes, setNotes] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);

  const markComplete = () => {
    if (!completedLessons.includes(currentLesson.id)) {
      setCompletedLessons([...completedLessons, currentLesson.id]);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      setProgress((video.currentTime / video.duration) * 100);
      if (video.currentTime / video.duration > 0.9) markComplete();
    }
  };

  const prevLesson = allLessons[currentIdx - 1];
  const nextLesson = allLessons[currentIdx + 1];

  return (
    <div className="min-h-screen bg-brand-black flex flex-col">
      {/* Top bar */}
      <div className="glass-dark border-b border-white/5 h-14 flex items-center px-4 gap-4 fixed top-0 left-0 right-0 z-40">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-white/60 hover:text-white text-sm transition-colors"
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Dashboard</span>
        </Link>
        <div className="w-px h-5 bg-white/10" />
        <p className="text-white text-sm font-medium truncate flex-1">
          {course.title}
        </p>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="glass px-3 py-1.5 rounded-lg text-xs text-white/60 hover:text-white transition-colors"
        >
          {sidebarOpen ? "Hide" : "Show"} Lessons
        </button>
      </div>

      <div className="flex flex-1 pt-14">
        {/* Main video area */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "mr-0 lg:mr-80" : ""}`}>
          {/* Video */}
          <div className="video-player-container bg-black w-full" style={{ aspectRatio: "16/9" }}>
            <video
              ref={videoRef}
              src={DEMO_VIDEO}
              className="w-full h-full"
              onTimeUpdate={handleTimeUpdate}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              controlsList="nodownload nofullscreen"
              disablePictureInPicture
            />
            {/* Custom overlay controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 p-4">
              {/* Progress */}
              <div className="w-full h-1 bg-white/20 rounded-full mb-3 cursor-pointer">
                <div
                  className="h-full bg-gradient-to-r from-brand-purple to-brand-blue rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => videoRef.current && (videoRef.current.currentTime -= 10)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <SkipBack size={18} />
                </button>
                <button
                  onClick={() => {
                    if (videoRef.current) {
                      isPlaying ? videoRef.current.pause() : videoRef.current.play();
                    }
                  }}
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform"
                >
                  {isPlaying ? (
                    <Pause size={16} className="text-black" />
                  ) : (
                    <Play size={16} className="text-black ml-0.5" fill="black" />
                  )}
                </button>
                <button
                  onClick={() => videoRef.current && (videoRef.current.currentTime += 10)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <SkipForward size={18} />
                </button>
                <span className="text-xs text-white/50 ml-1">{currentLesson.duration}</span>
                <div className="ml-auto flex items-center gap-3">
                  <button className="text-white/60 hover:text-white"><Volume2 size={16} /></button>
                  <button
                    onClick={() => videoRef.current?.requestFullscreen()}
                    className="text-white/60 hover:text-white"
                  >
                    <Maximize size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson info */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 w-full">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-xs text-white/40 mb-1">
                  Lesson {currentIdx + 1} of {allLessons.length}
                </p>
                <h1 className="font-heading text-2xl font-bold text-white">
                  {currentLesson.title}
                </h1>
              </div>
              <button
                onClick={markComplete}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all flex-shrink-0 ${
                  completedLessons.includes(currentLesson.id)
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "btn-primary"
                }`}
              >
                <Check size={15} />
                {completedLessons.includes(currentLesson.id) ? "Completed" : "Mark Complete"}
              </button>
            </div>

            {/* Nav buttons */}
            <div className="flex items-center gap-3 mb-8">
              {prevLesson ? (
                <Link
                  href={`/dashboard/learn/${course.id}/${prevLesson.id}`}
                  className="btn-secondary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
                >
                  <ChevronLeft size={16} /> Previous
                </Link>
              ) : (
                <button disabled className="btn-secondary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm opacity-30 cursor-not-allowed">
                  <ChevronLeft size={16} /> Previous
                </button>
              )}
              {nextLesson ? (
                <Link
                  href={`/dashboard/learn/${course.id}/${nextLesson.id}`}
                  className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
                >
                  Next <ChevronRight size={16} />
                </Link>
              ) : (
                <button disabled className="btn-primary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm opacity-30 cursor-not-allowed">
                  Next <ChevronRight size={16} />
                </button>
              )}
              <button
                onClick={() => setNotesOpen(!notesOpen)}
                className="ml-auto btn-secondary flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm"
              >
                <FileText size={15} /> Notes
              </button>
            </div>

            {/* Notes panel */}
            {notesOpen && (
              <div className="glass rounded-2xl p-5 mb-8">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white text-sm">My Notes</h3>
                  <button onClick={() => setNotesOpen(false)}>
                    <X size={16} className="text-white/40 hover:text-white" />
                  </button>
                </div>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Write your notes here..."
                  className="w-full h-32 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none resize-none"
                />
                <button className="btn-primary mt-3 px-4 py-2 rounded-xl text-xs">Save Notes</button>
              </div>
            )}

            <div className="glass rounded-2xl p-6">
              <h2 className="font-heading font-semibold text-white mb-3">About This Lesson</h2>
              <p className="text-white/60 text-sm leading-relaxed">
                In this lesson, you'll learn the core concepts of {currentLesson.title}. Follow along with the video and practice by completing the exercises at the end. This lesson is from the {course.title} course.
              </p>
            </div>
          </div>
        </div>

        {/* Fixed sidebar */}
        {sidebarOpen && (
          <div className="fixed right-0 top-14 bottom-0 w-80 glass-dark border-l border-white/5 overflow-y-auto z-30 hidden lg:block">
            <div className="p-4 border-b border-white/5">
              <h3 className="font-heading font-bold text-white text-sm">Course Content</h3>
              <p className="text-xs text-white/40 mt-0.5">
                {completedLessons.length} / {allLessons.length} completed
              </p>
              <div className="w-full h-1 bg-white/10 rounded-full mt-2">
                <div
                  className="progress-bar h-full"
                  style={{ width: `${(completedLessons.length / allLessons.length) * 100}%` }}
                />
              </div>
            </div>

            {course.modules.map((mod) => (
              <div key={mod.id}>
                <div className="px-4 py-3 bg-white/2 border-b border-white/3">
                  <p className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                    {mod.title}
                  </p>
                </div>
                {mod.lessons.map((lesson) => {
                  const isActive = lesson.id === currentLesson.id;
                  const isDone = completedLessons.includes(lesson.id);
                  return (
                    <Link
                      key={lesson.id}
                      href={`/dashboard/learn/${course.id}/${lesson.id}`}
                      className={`lesson-item flex items-center gap-3 px-4 py-3.5 border-b border-white/3 ${
                        isActive ? "active" : ""
                      } ${isDone ? "completed" : ""}`}
                    >
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${
                        isDone
                          ? "bg-green-500/20 text-green-400"
                          : isActive
                          ? "bg-brand-purple/30 text-brand-purple-light"
                          : "bg-white/5 text-white/30"
                      }`}>
                        {isDone ? <Check size={12} /> : isActive ? <Play size={10} fill="currentColor" /> : null}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-medium leading-snug ${isActive ? "text-white" : isDone ? "text-white/40" : "text-white/65"}`}>
                          {lesson.title}
                        </p>
                        <p className="text-[10px] text-white/30 mt-0.5">{lesson.duration}</p>
                      </div>
                      {!lesson.isFree && !isDone && !isActive && (
                        <Lock size={11} className="text-white/20 flex-shrink-0" />
                      )}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
