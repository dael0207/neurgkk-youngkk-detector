import type { ResultProfile } from "./types";

export const resultProfiles = [
  {
    grade: "fossil",
    minScore: 0,
    maxScore: 9,
    title: "늙크크 92%",
    badge: "알고리즘 휴면 계정",
    comparison: "최신 밈 업데이트가 꽤 밀린 상태",
    description:
      "요즘 밈을 완전히 모르는 건 아니지만 웃음 타이밍이 예전 인터넷에 더 가까움. 낮은 수치인데 캐릭터는 확실함.",
    taunt:
      "이 결과는 조용히 저장해두면 나중에 단톡방에서 꽤 오래 놀림감이 됩니다.",
    accent: "#ff4b24",
  },
  {
    grade: "old",
    minScore: 10,
    maxScore: 20,
    title: "늙크크 71%",
    badge: "한 박자 늦은 웃음",
    comparison: "알기는 아는데 반응이 살짝 늦음",
    description:
      "릴스에서 본 적은 있는데 정확히 어디에 쓰는지 헷갈리는 구간. 친구가 맥락을 던져주면 그때부터 웃김.",
    taunt: "친구 결과를 보면 내 알고리즘만 느린 건지 바로 감이 옵니다.",
    accent: "#f06d06",
  },
  {
    grade: "bridge",
    minScore: 21,
    maxScore: 31,
    title: "영크크 51%",
    badge: "세대 통역사",
    comparison: "요즘 밈과 옛날 밈 사이 중간값",
    description:
      "옛날 밈도 알고 최신 밈도 대충 따라가는 단톡방 통역사. 너무 빠르지도 늦지도 않은 애매한 실전형.",
    taunt: "비슷한 친구끼리 비교하면 누가 진짜 최신 쪽인지 은근 갈립니다.",
    accent: "#2f66ff",
  },
  {
    grade: "young",
    minScore: 32,
    maxScore: 41,
    title: "영크크 76%",
    badge: "릴스 현지인",
    comparison: "릴스와 단톡방 흐름을 꽤 빠르게 따라감",
    description:
      "요즘 밈을 설명으로 배우기보다 피드에서 먼저 만나는 쪽. 모르는 척해도 반응 속도에서 티가 남.",
    taunt:
      "이 정도면 결과 카드만 올려도 누가 조용히 다시 해볼 가능성이 높습니다.",
    accent: "#16a34a",
  },
  {
    grade: "ultraYoung",
    minScore: 42,
    maxScore: 48,
    title: "영크크 93%",
    badge: "알고리즘 직계",
    comparison: "알고리즘이 거의 실시간으로 반영되는 상태",
    description:
      "밈을 일부러 찾는다기보다 밈이 먼저 당신에게 도착함. 새 유행을 알아차리는 속도가 꽤 빠른 편.",
    taunt: "이 결과는 설명보다 캡처 한 장이 더 빨리 분위기를 만듭니다.",
    accent: "#111111",
  },
] as const satisfies readonly ResultProfile[];

export const shareCopies = [
  "내 밈 감각 지수 나왔는데 은근 신경 쓰임",
  "이거 낮게 나오면 조용히 다시 하게 됨",
  "단톡방 밈 감각 검사 들어간다",
  "내 웃음 코드 몇 년도에 멈췄는지 나옴",
  "친구 결과랑 비교하면 묘하게 재밌음",
  "요즘 밈 아는 척하다가 걸리는 테스트",
  "내 알고리즘 최신화율 확인함",
  "결과 카드만 봐도 성격 나옴",
  "영크크인지 늙크크인지 퍼센트로 나옴",
  "애매하게 맞히는 게 더 킹받는 테스트",
] as const;
