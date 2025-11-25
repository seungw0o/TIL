# Today I Learn

공부한 내용을 올립니다

## 커밋 컨벤션 & 개발 규칙

- 커밋 메시지: Conventional Commits를 사용합니다.
  - 형식: `type(scope): subject`
  - 예시: `feat(js): 학습 노트에 이벤트 루프 추가`
- 타입 예시: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore` 등
- Prettier로 변경 파일을 자동 포맷합니다 (pre-commit).
- 커밋 메시지는 Commitlint로 검증됩니다 (commit-msg).

### 사용 방법

- 커밋 작성을 도와주는 인터랙티브 툴:

```zsh
yarn commit
```

- 날짜 형식으로 작성하고 싶다면:

```zsh
yarn commit:date
```

- 변경 파일 포맷팅 수동 실행:

```zsh
yarn format
```

### 훅 동작

- `pre-commit`: `lint-staged`가 스테이징된 파일에 Prettier를 적용합니다.
- `commit-msg`: 커밋 메시지가 Conventional Commits 규칙을 따르는지 검사합니다.
