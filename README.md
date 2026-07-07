# 늙크크 영크크 판독기

밈 지식 퀴즈로 사용자의 웃음 코드가 늙크크인지 영크크인지 판독하는 모바일 우선 정적 웹 MVP입니다.

## 포함 범위

- 12문항 밈 지식 퀴즈
- 5단계 결과 등급
- 결과 이미지 저장
- Web Share API
- 링크 복사 fallback
- Kakao SDK placeholder
- Instagram export-only 결과 카드 흐름
- `trackEvent(name, payload)` 분석 추상화와 console fallback

## 제외 범위

- 사진/얼굴 업로드
- 실제 AI 판독
- 로그인/DB/실제 랭킹
- 인스타그램 자동 게시
- 첫 출시 광고/제휴 활성화

## 실행

```bash
pnpm install
pnpm dev
pnpm test
pnpm build
```

## 배포

Netlify에서 GitHub 저장소를 연결하고 기본 빌드 명령 `pnpm build`, 배포 폴더 `dist`를 사용합니다.
