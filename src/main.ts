import { trackEvent } from "./analytics";
import { assertNever, escapeHtml, mustElement } from "./dom";
import { quizQuestions } from "./quiz-data";
import { bindResultEvents } from "./result-actions";
import { buildResult, findChoice } from "./scoring";
import "./styles.css";
import "./soft-theme.css";
import "./quiz-timer.css";
import type { QuizAnswer, QuizQuestion, QuizResult } from "./types";

type ViewState =
  | { readonly screen: "landing" }
  | {
      readonly screen: "quiz";
      readonly index: number;
      readonly answers: readonly QuizAnswer[];
    }
  | { readonly screen: "result"; readonly result: QuizResult };

const questionTimeLimitSeconds = 8;
const app = mustElement(document, "#app", HTMLElement);
let state: ViewState = { screen: "landing" };
let quizTimerId: number | undefined;

render();

function render(): void {
  clearQuizTimer();
  switch (state.screen) {
    case "landing":
      renderLanding();
      return;
    case "quiz":
      renderQuiz(state.index, state.answers);
      return;
    case "result":
      renderResult(state.result);
      return;
    default:
      assertNever(state);
  }
}

function renderLanding(): void {
  app.innerHTML = `
    <section class="hero">
      <div class="hero-copy">
        <p class="eyebrow">12문항 밈 감각 테스트</p>
        <h1>너 알고리즘<br />몇 년도에<br />멈췄냐?</h1>
        <p class="subcopy">각 문제 8초. 요즘 밈을 진짜 아는지, 아는 척만 하는지 영크크 지수로 확인.</p>
        <button class="primary-action" data-action="start">8초 제한 판독 시작</button>
      </div>
      <div class="sample-result" aria-label="결과 카드 미리보기">
        <span>예상 결과</span>
        <strong>영크크 76%</strong>
        <em>릴스 현지인</em>
      </div>
    </section>
  `;
  mustElement(app, "[data-action='start']", HTMLButtonElement).addEventListener(
    "click",
    () => {
      trackEvent("quiz_start");
      state = { screen: "quiz", index: 0, answers: [] };
      render();
    },
  );
}

function renderQuiz(index: number, answers: readonly QuizAnswer[]): void {
  const question = quizQuestions[index];

  if (question === undefined) {
    state = { screen: "result", result: buildResult(answers) };
    trackEvent("quiz_complete", { count: answers.length });
    render();
    return;
  }

  const progressPercent = Math.round((index / quizQuestions.length) * 100);
  app.innerHTML = `
    <section class="quiz-shell">
      <header class="quiz-header">
        <button class="ghost-action" data-action="back" ${index === 0 ? "disabled" : ""}>이전</button>
        <div class="quiz-status">
          <strong>${questionTimeLimitSeconds}초</strong>
          <span>${index + 1} / ${quizQuestions.length}</span>
        </div>
      </header>
      <div class="progress" aria-label="진행률">
        <span style="width: ${progressPercent}%"></span>
      </div>
      <div class="timer-meter" aria-label="문항 제한 시간">
        <span style="animation-duration: ${questionTimeLimitSeconds}s"></span>
      </div>
      <h2>${escapeHtml(question.question)}</h2>
      <div class="choice-list">
        ${question.choices
          .map(
            (choice) => `
              <button class="choice-button" data-choice-id="${choice.id}">
                ${escapeHtml(choice.label)}
              </button>
            `,
          )
          .join("")}
      </div>
    </section>
  `;
  startQuestionTimer(question, index, answers);
  bindQuizEvents(question, index, answers);
}

function clearQuizTimer(): void {
  if (quizTimerId === undefined) {
    return;
  }

  window.clearTimeout(quizTimerId);
  quizTimerId = undefined;
}

function startQuestionTimer(
  question: QuizQuestion,
  index: number,
  answers: readonly QuizAnswer[],
): void {
  quizTimerId = window.setTimeout(() => {
    if (state.screen !== "quiz" || state.index !== index) {
      return;
    }

    trackEvent("quiz_timeout", { question: question.id });
    state = { screen: "quiz", index: index + 1, answers };
    render();
  }, questionTimeLimitSeconds * 1000);
}

function bindQuizEvents(
  question: QuizQuestion,
  index: number,
  answers: readonly QuizAnswer[],
): void {
  mustElement(app, "[data-action='back']", HTMLButtonElement).addEventListener(
    "click",
    () => {
      state = {
        screen: "quiz",
        index: Math.max(0, index - 1),
        answers: answers.slice(0, Math.max(0, answers.length - 1)),
      };
      render();
    },
  );

  for (const button of app.querySelectorAll("[data-choice-id]")) {
    if (!(button instanceof HTMLButtonElement)) {
      continue;
    }
    button.addEventListener("click", () => {
      const choiceId = button.getAttribute("data-choice-id");
      const choice =
        choiceId === null ? undefined : findChoice(question, choiceId);

      if (choice === undefined) {
        return;
      }

      trackEvent("quiz_answer", {
        question: question.id,
        points: choice.points,
      });
      state = {
        screen: "quiz",
        index: index + 1,
        answers: [
          ...answers,
          {
            questionId: question.id,
            choiceId: choice.id,
            points: choice.points,
          },
        ],
      };
      render();
    });
  }
}

function renderResult(result: QuizResult): void {
  trackEvent("result_view", {
    grade: result.profile.grade,
    score: result.score,
  });
  app.innerHTML = `
    <section class="result-layout">
      <article class="result-panel" style="--accent: ${result.profile.accent}">
        <p class="eyebrow">${escapeHtml(result.profile.badge)}</p>
        <h1>${escapeHtml(result.profile.title)}</h1>
        <div class="score-line">
          <strong>${result.score}</strong><span>/ ${result.maxScore}</span>
        </div>
        <p class="comparison">${escapeHtml(result.profile.comparison)}</p>
        <p class="description">${escapeHtml(result.profile.description)}</p>
        <p class="taunt">${escapeHtml(result.profile.taunt)}</p>
      </article>
      <div class="action-grid">
        <button class="primary-action" data-action="save">스토리용 이미지 저장</button>
        <button class="secondary-action" data-action="system-share">OS 공유</button>
        <button class="secondary-action" data-action="copy">링크 복사</button>
        <button class="secondary-action" data-action="kakao">카카오톡 공유 준비</button>
        <button class="ghost-action wide" data-action="retry">다시 판독</button>
      </div>
      <p class="launch-note">결과 이미지는 스토리 크기에 맞춰 저장됩니다. 친구 결과와 나란히 보면 더 애매하게 재밌습니다.</p>
      <aside class="ad-placeholder" aria-label="비활성 광고 자리">광고/제휴 실험 자리 · 첫 출시 비활성</aside>
      <p class="toast" id="toast" role="status"></p>
    </section>
  `;
  trackEvent("ad_slot_view", { status: "disabled" });
  bindResultEvents(app, result, () => {
    state = { screen: "landing" };
    render();
  });
}
