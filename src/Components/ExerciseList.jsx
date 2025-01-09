'use client'

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Activity, Heart, Brain, Dumbbell, Timer, ArrowRight, ChevronDown, Scale, Sparkles, Flame, Trophy, Target, Clock } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import Navigation from "./Navigation"
// Utility function
function cn(...inputs) {
  return twMerge(clsx(inputs))
}

const muscles = {
  upper: {
    title: "Upper Body",
    items: ["chest", "traps", "biceps", "triceps", "forearms"],
    description: "Build upper body strength for daily activities and better posture",
    icon: "💪",
  },
  core: {
    title: "Core",
    items: ["abdominals", "lower_back", "middle_back"],
    description: "Strengthen your core for stability and back health",
    icon: "🎯",
  },
  lower: {
    title: "Lower Body",
    items: ["quadriceps", "hamstrings", "calves", "glutes"],
    description: "Develop leg strength and improve mobility",
    icon: "🦿",
  },
  other: {
    title: "Specialized",
    items: ["neck", "abductors", "adductors", "lats"],
    description: "Target specific muscle groups for balanced development",
    icon: "⚡",
  },
}

const benefits = [
  {
    icon: Heart,
    title: "Heart Health",
    description: "Strengthen cardiovascular system",
    color: "bg-red-50 text-red-600",
    hoverColor: "hover:bg-red-100",
  },
  {
    icon: Brain,
    title: "Mental Clarity",
    description: "Boost cognitive function",
    color: "bg-purple-50 text-purple-600",
    hoverColor: "hover:bg-purple-100",
  },
  {
    icon: Scale,
    title: "Body Composition",
    description: "Improve muscle-to-fat ratio",
    color: "bg-green-50 text-green-600",
    hoverColor: "hover:bg-green-100",
  },
  {
    icon: Timer,
    title: "Energy Levels",
    description: "Increase daily vitality",
    color: "bg-amber-50 text-amber-600",
    hoverColor: "hover:bg-amber-100",
  },
]

const workoutTips = [
  {
    icon: Flame,
    title: "Proper Warm-up",
    description: "Always start with 5-10 minutes of light cardio and dynamic stretching",
  },
  {
    icon: Trophy,
    title: "Progressive Overload",
    description: "Gradually increase weight, frequency, or repetitions",
  },
  {
    icon: Target,
    title: "Form First",
    description: "Focus on proper technique before increasing intensity",
  },
  {
    icon: Clock,
    title: "Rest Periods",
    description: "Allow adequate recovery between sets and workouts",
  },
]

export default function ExerciseList() {
  const [selectedMuscle, setSelectedMuscle] = useState("")
  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeSection, setActiveSection] = useState("info")

  const fetchExercises = async (muscle) => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?muscle=${muscle}`,
        {
          headers: {
            "x-rapidapi-host": "exercises-by-api-ninjas.p.rapidapi.com",
            "x-rapidapi-key": "bf7da1f76bmshee18d06fcbdfa70p19237djsnd2784a2068e4",
          },
        }
      )
      const data = await response.json()
      setExercises(data)
      setActiveSection("exercises")
    } catch (error) {
      console.error("Error fetching exercises:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
    <Navigation/>
    <div className="min-h-screen pt-14 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-5xl font-bold text-transparent">
            Transform Your Fitness Journey
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Discover expert-designed exercises for every muscle group
          </p>
        </motion.header>

        {activeSection === "info" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 space-y-20"
          >
            {/* Benefits Section */}
            <section>
              <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
                Why Exercise Matters
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "group relative overflow-hidden rounded-2xl p-6 transition-all hover:shadow-lg",
                      benefit.color
                    )}
                  >
                    <div className="relative z-10">
                      <benefit.icon className="mb-4 h-8 w-8" />
                      <h3 className="mb-2 text-lg font-semibold">{benefit.title}</h3>
                      <p className="text-sm opacity-90">{benefit.description}</p>
                    </div>
                    <div className="absolute inset-0 -z-10 bg-white opacity-90" />
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Muscle Groups Section */}
            <section>
              <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
                Choose Your Focus Area
              </h2>
              <div className="grid gap-6 md:grid-cols-2">
                {Object.entries(muscles).map(([key, section], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-xl"
                  >
                    <div className="relative z-10">
                      <span className="mb-4 block text-4xl">{section.icon}</span>
                      <h3 className="mb-2 text-2xl font-bold text-gray-900">
                        {section.title}
                      </h3>
                      <p className="mb-6 text-gray-600">{section.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {section.items.map((muscle) => (
                          <button
                            key={muscle}
                            onClick={() => fetchExercises(muscle)}
                            className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
                          >
                            <Dumbbell className="h-4 w-4" />
                            {muscle.replace("_", " ")}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-blue-50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Workout Tips Section */}
            <section className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-12 text-white">
              <h2 className="mb-8 text-center text-3xl font-bold">
                Essential Workout Tips
              </h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {workoutTips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group rounded-2xl bg-white/10 p-6 backdrop-blur-lg transition-all hover:bg-white/20"
                  >
                    <tip.icon className="mb-4 h-8 w-8" />
                    <h3 className="mb-2 text-lg font-semibold">{tip.title}</h3>
                    <p className="text-sm text-blue-50">{tip.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </motion.div>
        )}

        {activeSection === "exercises" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16"
          >
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">
                {selectedMuscle.replace("_", " ")} Exercises
              </h2>
              <button
                onClick={() => setActiveSection("info")}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-100"
              >
                Choose Another Muscle
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {loading ? (
              <div className="grid gap-6 md:grid-cols-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-64 animate-pulse rounded-2xl bg-blue-50"
                  />
                ))}
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                {exercises.map((exercise, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl"
                  >
                    <div className="relative z-10">
                      <div className="mb-4 flex items-start justify-between">
                        <div>
                          <h3 className="mb-2 text-xl font-bold text-gray-900">
                            {exercise.name}
                          </h3>
                          <div className="flex gap-2">
                            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
                              {exercise.type}
                            </span>
                            <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-600">
                              {exercise.difficulty}
                            </span>
                          </div>
                        </div>
                        <span className="rounded-full bg-blue-50 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                          <Sparkles className="h-5 w-5 text-blue-600" />
                        </span>
                      </div>
                      <div className="relative mt-4 overflow-hidden rounded-xl bg-gray-50 p-4">
                        <h4 className="mb-2 font-semibold text-gray-900">Instructions:</h4>
                        <p className="text-sm leading-relaxed text-gray-600">
                          {exercise.instructions}
                        </p>
                        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-gray-50 to-transparent" />
                      </div>
                    </div>
                    <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-blue-50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
    </div>
  )
}

