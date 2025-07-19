# genQR - 간편한 QR 코드 생성 및 스캔

![genQR](https://img.shields.io/badge/genQR-QR%20Generator-4c51bf?style=for-the-badge&logo=qrcode&logoColor=white)
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=githubpages)](https://jvisualschool.github.io/genqr/)
[![GitHub](https://img.shields.io/github/license/jvisualschool/genqr?style=for-the-badge)](https://github.com/jvisualschool/genqr/blob/main/LICENSE)

**genQR**은 간편하고 빠른 QR 코드 생성 및 스캔을 위한 웹 애플리케이션입니다. 직관적인 인터페이스와 강력한 기능으로 누구나 쉽게 QR 코드를 만들고 읽을 수 있습니다.

## ✨ 주요 기능

### 🎨 QR 코드 생성
- **URL/텍스트 입력**: 웹사이트 주소나 텍스트를 QR 코드로 변환
- **크기 선택**: 256x256, 512x512, 1024x1024 픽셀 지원
- **색상 커스터마이징**: QR 코드 색상과 배경색 자유롭게 변경
- **다중 포맷 다운로드**: PNG, JPG, SVG 형식으로 다운로드

### 📱 QR 코드 스캔
- **파일 업로드**: QR 코드 이미지 파일을 업로드하여 스캔
- **드래그 앤 드롭**: 이미지를 간편하게 끌어서 놓기
- **즉시 결과 표시**: 스캔된 내용을 바로 확인
- **클립보드 복사**: 결과를 한 번의 클릭으로 복사

### 🌙 사용자 경험
- **다크/라이트 모드**: 취향에 맞는 테마 선택
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 기기 지원
- **키보드 단축키**: 빠른 작업을 위한 단축키 지원
- **깔끔한 인터페이스**: 직관적이고 모던한 디자인

## 🚀 시작하기

### 1. 다운로드 및 실행
```bash
# 프로젝트 다운로드
git clone https://github.com/jvisualschool/genqr.git
cd genqr

# 빠른 시작 (추천)
./start.sh

# 또는 직접 Python 서버 실행
python3 server.py

# 또는 간단한 HTTP 서버
python3 -m http.server 8000
```

### 2. 브라우저에서 접속
```
http://localhost:8000
```

### 3. 바로 사용 가능!
- QR 생성: URL 입력 → 색상 선택 → 생성 버튼 클릭
- QR 스캔: 스캔 탭 → 이미지 파일 업로드

## 📖 사용법

### QR 코드 생성하기
1. **QR 생성** 탭 선택
2. URL 또는 텍스트 입력
3. 원하는 크기 선택 (256px ~ 1024px)
4. QR 코드 색상 선택
5. 배경 색상 선택
6. **QR 코드 생성** 버튼 클릭
7. 생성된 QR 코드를 PNG/JPG/SVG로 다운로드

### QR 코드 스캔하기
1. **QR 스캔** 탭 선택
2. **파일 선택** 버튼 클릭하거나 이미지 드래그 앤 드롭
3. QR 코드가 포함된 이미지 파일 선택
4. 자동으로 스캔되어 결과 표시
5. **복사** 버튼으로 클립보드에 복사

## ⌨️ 키보드 단축키

| 단축키 | 기능 |
|--------|------|
| `Ctrl/Cmd + 1` | QR 생성 탭으로 이동 |
| `Ctrl/Cmd + 2` | QR 스캔 탭으로 이동 |
| `Ctrl/Cmd + Enter` | QR 코드 생성 (생성 탭에서) |

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **QR 생성**: QRServer API
- **QR 스캔**: jsQR 라이브러리
- **스타일링**: CSS Custom Properties, Flexbox, Grid
- **아이콘**: Font Awesome
- **폰트**: Inter, JetBrains Mono

## 📁 프로젝트 구조

```
genqr/
├── index.html              # 메인 HTML 파일
├── static/
│   ├── css/
│   │   └── style.css       # 스타일 시트
│   └── js/
│       └── app.js          # 메인 JavaScript 애플리케이션
├── server.py               # Python 웹 서버
├── start.sh                # 시작 스크립트
├── README.md               # 프로젝트 문서
└── README.html             # HTML 형태의 문서
```

## 🎨 테마 시스템

genQR은 라이트 모드와 다크 모드를 지원합니다:

- **라이트 모드**: 밝고 깔끔한 인터페이스
- **다크 모드**: 눈의 피로를 줄이는 어두운 테마
- **자동 감지**: 시스템 설정에 따라 자동으로 테마 적용
- **수동 전환**: 헤더의 테마 버튼으로 언제든지 전환

## 🌟 특징

### 색상 커스터마이징
- 16진수 색상 선택기
- 실시간 미리보기
- 다운로드 시에도 색상 유지

### 파일 형식 지원
- **PNG**: 투명 배경 지원, 웹 최적화
- **JPG**: 작은 파일 크기, 인쇄용
- **SVG**: 벡터 형식, 무한 확대 가능

### 접근성
- 키보드 네비게이션 지원
- 고대비 모드 지원
- 화면 리더 친화적
- 모션 감소 옵션 지원

## 🔧 브라우저 호환성

| 브라우저 | 버전 |
|----------|------|
| Chrome | 80+ |
| Firefox | 75+ |
| Safari | 13+ |
| Edge | 80+ |

## 📱 모바일 지원

- 반응형 디자인으로 모든 화면 크기 지원
- 터치 친화적 인터페이스
- 모바일 브라우저 최적화

## ⚡ 성능

- **빠른 로딩**: 최소한의 외부 종속성
- **오프라인 지원**: 서비스 워커로 캐싱
- **경량**: 전체 앱 크기 < 500KB

## 🔒 보안 및 개인정보

- **로컬 처리**: 입력 데이터는 브라우저에서만 처리
- **외부 전송 없음**: QR 생성을 위한 API 호출 외 데이터 전송 없음
- **저장 안함**: 개인 데이터를 서버에 저장하지 않음

## 🤝 기여하기

프로젝트에 기여하고 싶으시다면:

1. 이 저장소를 Fork 하기
2. Feature 브랜치 생성 (`git checkout -b feature/AmazingFeature`)
3. 변경사항 커밋 (`git commit -m 'Add some AmazingFeature'`)
4. 브랜치에 Push (`git push origin feature/AmazingFeature`)
5. [Pull Request](https://github.com/jvisualschool/genqr/pulls) 열기

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 지원 및 문의

- **이슈 리포트**: [GitHub Issues](https://github.com/jvisualschool/genqr/issues)
- **기능 요청**: [GitHub Discussions](https://github.com/jvisualschool/genqr/discussions)

## 🙏 감사의 말

- [QRServer](https://goqr.me/) - QR 코드 생성 API 제공
- [jsQR](https://github.com/cozmo/jsQR) - JavaScript QR 코드 스캔 라이브러리
- [Font Awesome](https://fontawesome.com/) - 아이콘 제공
- [Google Fonts](https://fonts.google.com/) - 웹 폰트 제공

---

**genQR**로 QR 코드를 더욱 쉽고 빠르게 만들어보세요! 🚀