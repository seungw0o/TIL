# Today I Learn

공부한 내용을 올립니다

## 커밋 규칙

- 커밋 메시지는 날짜만 입력합니다.
  - 형식: `YYYY-MM-DD`
  - 예시: `2025-11-25`

- 커밋 방법:
  - 직접 입력: `git commit -m '2025-11-25'`
  - 자동 입력: `yarn commit:date` (스크립트 사용)

- Prettier로 변경 파일을 자동 포맷합니다 (pre-commit).

### 사용 방법

- 자동 날짜 커밋:

```zsh
yarn commit
```

- 변경 파일 포맷팅 수동 실행:

```zsh
yarn format
```

### 훅 동작

- `pre-commit`: `lint-staged`가 스테이징된 파일에 Prettier를 적용합니다.
- `commit-msg`: 커밋 메시지가 Conventional Commits 규칙을 따르는지 검사합니다.
