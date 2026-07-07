import type { QuizQuestion } from "./types";

export const quizQuestions = [
  {
    id: "q1",
    question: "친구가 “오늘 요아정 각?”이라고 했다. 가장 자연스러운 반응은?",
    choices: [
      {
        id: "q1-c1",
        label: "요즘 아이돌 정리 계정 얘기냐고 묻는다",
        points: 0,
      },
      { id: "q1-c2", label: "그릭요거트면 대충 맞지 않냐고 한다", points: 3 },
      { id: "q1-c3", label: "토핑 뭐 올릴지부터 고른다", points: 4 },
      { id: "q1-c4", label: "요아정이 장소 이름인지 확인한다", points: 1 },
    ],
  },
  {
    id: "q2",
    question: "망한 줄 알았던 친구가 끝까지 버틴다. 댓글로 가장 덜 어색한 건?",
    choices: [
      { id: "q2-c1", label: "중간에 꺾이면 마상이라며 위로한다", points: 1 },
      { id: "q2-c2", label: "중꺾그마 느낌으로 대충 응원한다", points: 3 },
      { id: "q2-c3", label: "중요한 건 건강부터라고 정리한다", points: 0 },
      { id: "q2-c4", label: "중꺾마 아직 살아있다", points: 4 },
    ],
  },
  {
    id: "q3",
    question: "친구 발표가 예상보다 너무 잘 끝났다. 제일 요즘식 칭찬은?",
    choices: [
      { id: "q3-c1", label: "폼 미쳤는데?", points: 4 },
      { id: "q3-c2", label: "발표 폼이 괜찮게 잡혔네", points: 3 },
      { id: "q3-c3", label: "폼팩터가 안정적이라고 한다", points: 0 },
      { id: "q3-c4", label: "제법인데요 선생님 하고 넘긴다", points: 1 },
    ],
  },
  {
    id: "q4",
    question:
      "단톡방에서 “알잘딱깔센으로 부탁”이라는 말이 나왔다. 실제 요구는?",
    choices: [
      {
        id: "q4-c1",
        label: "알아서 잘 정리만 해달라는 뜻으로 받는다",
        points: 3,
      },
      { id: "q4-c2", label: "맥락 보고 센스 있게 처리", points: 4 },
      {
        id: "q4-c3",
        label: "깔끔하게 센터 정렬하라는 요청으로 본다",
        points: 1,
      },
      { id: "q4-c4", label: "알림을 딱 끄고 조용히 처리한다", points: 0 },
    ],
  },
  {
    id: "q5",
    question: "새벽에 괜히 일 벌렸다가 본인이 수습 중이다. 뭐라고 할까?",
    choices: [
      { id: "q5-c1", label: "스스로 불러온 재앙 같다고 한다", points: 3 },
      { id: "q5-c2", label: "스마트폰 오류라며 재부팅부터 권한다", points: 0 },
      { id: "q5-c3", label: "이건 완전 스불재다", points: 4 },
      { id: "q5-c4", label: "스토리 불펌 재업 이슈냐고 묻는다", points: 1 },
    ],
  },
  {
    id: "q6",
    question: "말도 안 되는 장면을 보고 “ㄹㅈㄷ”라고 남겼다. 뉘앙스는?",
    choices: [
      { id: "q6-c1", label: "레전드 비슷한 과장 리액션으로 읽는다", points: 3 },
      { id: "q6-c2", label: "리즈 시절이 돌아왔다는 뜻으로 본다", points: 1 },
      { id: "q6-c3", label: "라지 사이즈 줄임말이라고 생각한다", points: 0 },
      { id: "q6-c4", label: "그 장면 진짜 레전드", points: 4 },
    ],
  },
  {
    id: "q7",
    question: "별일 아닌데 누가 계속 몰아붙인다. 가장 가까운 표현은?",
    choices: [
      { id: "q7-c1", label: "이건 좀 억까 아니냐", points: 4 },
      { id: "q7-c2", label: "억지로 까는 흐름 같다고 한다", points: 3 },
      { id: "q7-c3", label: "억 단위 손해를 봤다는 말로 이해한다", points: 0 },
      { id: "q7-c4", label: "까다롭게 보는 사람이라고 정리한다", points: 1 },
    ],
  },
  {
    id: "q8",
    question: "처음 보는 밈인데 다들 웃고 있다. 가장 덜 늙크크 같은 반응은?",
    choices: [
      {
        id: "q8-c1",
        label: "이해는 안 되지만 대충 웃긴 흐름이라 본다",
        points: 3,
      },
      { id: "q8-c2", label: "나만 이해 못 함?", points: 4 },
      { id: "q8-c3", label: "방가방가 같은 옛말로 받아친다", points: 0 },
      { id: "q8-c4", label: "즐이라고 치면 분위기 맞냐고 묻는다", points: 1 },
    ],
  },
  {
    id: "q9",
    question: "누가 댓글에 “즐”이라고 썼다. 이 말이 풍기는 감성은?",
    choices: [
      {
        id: "q9-c1",
        label: "요즘 숏폼에서 쓰는 짧은 리액션으로 본다",
        points: 0,
      },
      {
        id: "q9-c2",
        label: "옛날식으로 대충 끊어내는 말 같다고 본다",
        points: 3,
      },
      { id: "q9-c3", label: "옛날 커뮤니티의 짧은 컷", points: 4 },
      { id: "q9-c4", label: "선물 보낼 때 쓰는 말로 이해한다", points: 1 },
    ],
  },
  {
    id: "q10",
    question: "분명 별거 아닌데 묘하게 신경을 긁는다. 가장 맞는 말은?",
    choices: [
      { id: "q10-c1", label: "왕 받으셨다는 말장난으로 넘긴다", points: 0 },
      {
        id: "q10-c2",
        label: "킹정과 비슷하게 인정한다는 뜻으로 본다",
        points: 1,
      },
      { id: "q10-c3", label: "짜증나는데 웃긴 느낌으로 받아들인다", points: 3 },
      { id: "q10-c4", label: "킹받네", points: 4 },
    ],
  },
  {
    id: "q11",
    question: "줄임말이 너무 많아서 친구가 “별다줄”이라고 했다. 뜻은?",
    choices: [
      { id: "q11-c1", label: "별걸 다 줄인다", points: 4 },
      { id: "q11-c2", label: "별걸 다 줄여 말한다는 투로 본다", points: 3 },
      { id: "q11-c3", label: "별다방 줄이 길다는 말로 듣는다", points: 0 },
      { id: "q11-c4", label: "별로 다정한 줄임말이라고 해석한다", points: 1 },
    ],
  },
  {
    id: "q12",
    question: "친구가 최신 밈을 설명해준다. 가장 요즘 맥락에 가까운 반응은?",
    choices: [
      { id: "q12-c1", label: "그게 왜 웃긴데?", points: 0 },
      { id: "q12-c2", label: "ㅇㅈㅋㅋ", points: 4 },
      { id: "q12-c3", label: "아 그 맥락이면 웃기긴 하네", points: 3 },
      { id: "q12-c4", label: "릴스에서 본 듯한데 설명은 필요하다", points: 1 },
    ],
  },
] as const satisfies readonly QuizQuestion[];

export const maxScore = 48;
