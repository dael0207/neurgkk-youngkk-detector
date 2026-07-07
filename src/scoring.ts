import { maxScore } from "./quiz-data";
import { resultProfiles } from "./result-data";
import type {
  QuizAnswer,
  QuizQuestion,
  QuizResult,
  ResultProfile,
} from "./types";

export class ResultProfileError extends Error {
  public constructor(public readonly score: number) {
    super(`No result profile configured for score ${score}`);
    this.name = "ResultProfileError";
  }
}

export function calculateScore(answers: readonly QuizAnswer[]): number {
  return answers.reduce((total, answer) => total + answer.points, 0);
}

export function findProfile(score: number): ResultProfile {
  const profile = resultProfiles.find(
    (candidate) => score >= candidate.minScore && score <= candidate.maxScore,
  );

  if (profile === undefined) {
    throw new ResultProfileError(score);
  }

  return profile;
}

export function buildResult(answers: readonly QuizAnswer[]): QuizResult {
  const score = calculateScore(answers);

  return {
    score,
    maxScore,
    profile: findProfile(score),
  };
}

export function findChoice(
  question: QuizQuestion,
  choiceId: string,
): QuizQuestion["choices"][number] | undefined {
  return question.choices.find((choice) => choice.id === choiceId);
}
