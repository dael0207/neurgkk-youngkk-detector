export type ChoiceId = `q${number}-c${number}`;

export type QuizChoice = {
  readonly id: ChoiceId;
  readonly label: string;
  readonly points: number;
};

export type QuizQuestion = {
  readonly id: `q${number}`;
  readonly question: string;
  readonly choices: readonly QuizChoice[];
};

export type ResultGrade = "fossil" | "old" | "bridge" | "young" | "ultraYoung";

export type ResultProfile = {
  readonly grade: ResultGrade;
  readonly minScore: number;
  readonly maxScore: number;
  readonly title: string;
  readonly badge: string;
  readonly comparison: string;
  readonly description: string;
  readonly taunt: string;
  readonly accent: string;
};

export type QuizAnswer = {
  readonly questionId: QuizQuestion["id"];
  readonly choiceId: ChoiceId;
  readonly points: number;
};

export type QuizResult = {
  readonly score: number;
  readonly maxScore: number;
  readonly profile: ResultProfile;
};

export type SharePayload = {
  readonly title: string;
  readonly text: string;
  readonly url: string;
};

export type TrackEventName =
  | "quiz_start"
  | "quiz_answer"
  | "quiz_complete"
  | "result_view"
  | "share_web_click"
  | "copy_link_click"
  | "save_image_click"
  | "share_kakao_click"
  | "retry_click"
  | "ad_slot_view"
  | "affiliate_click";
