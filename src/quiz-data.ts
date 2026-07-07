import type { QuizQuestion } from "./types";

export const quizQuestions = [
  {
    id: "q1",
    question: "친구가 “오늘 요아정 각?”이라고 했다. 가장 자연스러운 반응은?",
    choices: [
      { id: "q1-c1", label: "아이돌 정리 계정 링크를 보낸다", points: 0 },
      { id: "q1-c2", label: "정모 장소부터 물어본다", points: 1 },
      { id: "q1-c3", label: "토핑 뭐 올릴지부터 고른다", points: 4 },
      { id: "q1-c4", label: "일단 건강식인지 확인한다", points: 2 },
    ],
  },
  {
    id: "q2",
    question: "망한 줄 알았던 친구가 끝까지 버틴다. 댓글로 가장 덜 어색한 건?",
    choices: [
      { id: "q2-c1", label: "중간에 꺾으면 마이너스지", points: 1 },
      { id: "q2-c2", label: "중요한 건 마감부터", points: 2 },
      { id: "q2-c3", label: "중독은 꺾어야지", points: 0 },
      { id: "q2-c4", label: "중꺾마 아직 살아있다", points: 4 },
    ],
  },
  {
    id: "q3",
    question: "친구 발표가 예상보다 너무 잘 끝났다. 제일 요즘식 칭찬은?",
    choices: [
      { id: "q3-c1", label: "폼 미쳤는데?", points: 4 },
      { id: "q3-c2", label: "양식이 아주 반듯하네", points: 1 },
      { id: "q3-c3", label: "발표 폼팩터 좋다", points: 0 },
      { id: "q3-c4", label: "제법인데요 선생님", points: 2 },
    ],
  },
  {
    id: "q4",
    question:
      "단톡방에서 “알잘딱깔센으로 부탁”이라는 말이 나왔다. 실제 요구는?",
    choices: [
      { id: "q4-c1", label: "알림부터 깔끔하게 끄기", points: 2 },
      { id: "q4-c2", label: "맥락 보고 센스 있게 처리", points: 4 },
      { id: "q4-c3", label: "센터 맞춰서 정렬하기", points: 1 },
      { id: "q4-c4", label: "딱딱하지만 세게 말하기", points: 0 },
    ],
  },
  {
    id: "q5",
    question: "새벽에 괜히 일 벌렸다가 본인이 수습 중이다. 뭐라고 할까?",
    choices: [
      { id: "q5-c1", label: "스토리 불펌 재업 각이다", points: 1 },
      { id: "q5-c2", label: "스마트폰부터 재부팅하자", points: 0 },
      { id: "q5-c3", label: "이건 완전 스불재다", points: 4 },
      { id: "q5-c4", label: "불고기 재료가 문제네", points: 0 },
    ],
  },
  {
    id: "q6",
    question: "말도 안 되는 장면을 보고 “ㄹㅈㄷ”라고 남겼다. 뉘앙스는?",
    choices: [
      { id: "q6-c1", label: "로제 떡볶이가 생각남", points: 1 },
      { id: "q6-c2", label: "리즈 시절 도전 중", points: 2 },
      { id: "q6-c3", label: "라지 사이즈 디자인", points: 0 },
      { id: "q6-c4", label: "그 장면 진짜 레전드", points: 4 },
    ],
  },
  {
    id: "q7",
    question: "별일 아닌데 누가 계속 몰아붙인다. 가장 가까운 표현은?",
    choices: [
      { id: "q7-c1", label: "이건 좀 억까 아니냐", points: 4 },
      { id: "q7-c2", label: "억울하지만 까먹었다", points: 1 },
      { id: "q7-c3", label: "억 단위로 손해 봤다", points: 0 },
      { id: "q7-c4", label: "까다롭게 보는 편이다", points: 2 },
    ],
  },
  {
    id: "q8",
    question: "처음 보는 밈인데 다들 웃고 있다. 가장 덜 늙크크 같은 반응은?",
    choices: [
      { id: "q8-c1", label: "대략난감이네요", points: 1 },
      { id: "q8-c2", label: "나만 이해 못 함?", points: 4 },
      { id: "q8-c3", label: "방가방가 무슨 뜻임?", points: 0 },
      { id: "q8-c4", label: "즐이라고 치면 되나", points: 0 },
    ],
  },
  {
    id: "q9",
    question: "누가 댓글에 “즐”이라고 썼다. 이 말이 풍기는 감성은?",
    choices: [
      { id: "q9-c1", label: "요즘 릴스식 리액션", points: 0 },
      { id: "q9-c2", label: "선물 보낼 때 쓰는 말", points: 1 },
      { id: "q9-c3", label: "옛날 커뮤니티의 짧은 컷", points: 4 },
      { id: "q9-c4", label: "개발자들이 쓰는 축약어", points: 0 },
    ],
  },
  {
    id: "q10",
    question: "분명 별거 아닌데 묘하게 신경을 긁는다. 가장 맞는 말은?",
    choices: [
      { id: "q10-c1", label: "왕 받으셨다", points: 0 },
      { id: "q10-c2", label: "킹 사이즈로 받자", points: 0 },
      { id: "q10-c3", label: "감동받아서 킹정", points: 2 },
      { id: "q10-c4", label: "킹받네", points: 4 },
    ],
  },
  {
    id: "q11",
    question: "줄임말이 너무 많아서 친구가 “별다줄”이라고 했다. 뜻은?",
    choices: [
      { id: "q11-c1", label: "별걸 다 줄인다", points: 4 },
      { id: "q11-c2", label: "별점을 다 준다", points: 1 },
      { id: "q11-c3", label: "별다방 줄이 길다", points: 0 },
      { id: "q11-c4", label: "별로 다정한 줄임말", points: 2 },
    ],
  },
  {
    id: "q12",
    question: "친구가 최신 밈을 설명해준다. 가장 늙크크에 가까운 반응은?",
    choices: [
      { id: "q12-c1", label: "그게 왜 웃긴데?", points: 0 },
      { id: "q12-c2", label: "ㅇㅈㅋㅋ", points: 4 },
      { id: "q12-c3", label: "아 그 맥락이면 웃기네", points: 2 },
      { id: "q12-c4", label: "릴스에서 본 듯", points: 3 },
    ],
  },
] as const satisfies readonly QuizQuestion[];

export const maxScore = 48;
