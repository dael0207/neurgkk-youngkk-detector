import { describe, expect, it } from "vitest";
import { quizQuestions } from "./quiz-data";
import { buildResult, findProfile } from "./scoring";
import type { QuizAnswer } from "./types";

describe("score mapping", () => {
  it("Given every result boundary When profile is selected Then the expected grade is returned", () => {
    expect(findProfile(0).grade).toBe("fossil");
    expect(findProfile(9).grade).toBe("fossil");
    expect(findProfile(10).grade).toBe("old");
    expect(findProfile(20).grade).toBe("old");
    expect(findProfile(21).grade).toBe("bridge");
    expect(findProfile(31).grade).toBe("bridge");
    expect(findProfile(32).grade).toBe("young");
    expect(findProfile(41).grade).toBe("young");
    expect(findProfile(42).grade).toBe("ultraYoung");
    expect(findProfile(48).grade).toBe("ultraYoung");
  });

  it("Given twelve maximum answers When result is built Then max score is ultraYoung", () => {
    const answers: readonly QuizAnswer[] = quizQuestions.map((question) => {
      const topChoice = question.choices.reduce((best, choice) =>
        choice.points > best.points ? choice : best,
      );

      return {
        questionId: question.id,
        choiceId: topChoice.id,
        points: topChoice.points,
      };
    });

    const result = buildResult(answers);

    expect(result.score).toBe(48);
    expect(result.profile.grade).toBe("ultraYoung");
  });
});
