import { describe, expect, it } from "vitest";
import { quizQuestions } from "./quiz-data";
import { resultProfiles, shareCopies } from "./result-data";

describe("content contract", () => {
  it("Given MVP quiz content When loaded Then it has twelve four-choice questions", () => {
    expect(quizQuestions).toHaveLength(12);
    for (const question of quizQuestions) {
      expect(question.choices).toHaveLength(4);
    }
  });

  it("Given quiz answer choices When loaded Then top-scoring answers are positionally mixed", () => {
    const topAnswerPositions = quizQuestions.map((question) => {
      const maxPoints = Math.max(
        ...question.choices.map((choice) => choice.points),
      );

      return question.choices.findIndex(
        (choice) => choice.points === maxPoints,
      );
    });

    const positionCounts = new Map<number, number>();
    for (const position of topAnswerPositions) {
      positionCounts.set(position, (positionCounts.get(position) ?? 0) + 1);
    }

    expect(new Set(topAnswerPositions).size).toBeGreaterThanOrEqual(3);
    expect(Math.max(...positionCounts.values())).toBeLessThanOrEqual(4);
  });

  it("Given result content When loaded Then it exposes five result grades and share copy", () => {
    expect(resultProfiles).toHaveLength(5);
    expect(shareCopies.length).toBeGreaterThanOrEqual(10);
  });

  it("Given MVP constraints When content is inspected Then upload and AI claims are absent", () => {
    const joinedContent = JSON.stringify({
      quizQuestions,
      resultProfiles,
      shareCopies,
    });

    expect(joinedContent).not.toContain("사진 업로드");
    expect(joinedContent).not.toContain("AI 판독");
  });
});
