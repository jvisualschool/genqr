#!/bin/bash

# QR Future - 미래지향적 QR 코드 애플리케이션 시작 스크립트
# Python 3.13 완전 호환, 외부 의존성 없음

echo "🚀 QR Future 앱 시작 중..."
echo "=================================="

# Python 버전 확인
if ! command -v python3 &> /dev/null; then
    if ! command -v python &> /dev/null; then
        echo "❌ Python이 설치되어 있지 않습니다."
        echo "   Python 3.x를 설치한 후 다시 시도해주세요."
        exit 1
    else
        PYTHON_CMD="python"
    fi
else
    PYTHON_CMD="python3"
fi

# Python 버전 표시
PYTHON_VERSION=$($PYTHON_CMD --version 2>&1)
echo "🐍 $PYTHON_VERSION"

# 현재 디렉토리 확인
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "📁 실행 디렉토리: $SCRIPT_DIR"

# 필요한 파일들 존재 확인
REQUIRED_FILES=("index.html" "static/css/style.css" "static/js/app.js" "server.py")
MISSING_FILES=()

for file in "${REQUIRED_FILES[@]}"; do
    if [[ ! -f "$file" ]]; then
        MISSING_FILES+=("$file")
    fi
done

if [[ ${#MISSING_FILES[@]} -gt 0 ]]; then
    echo "❌ 다음 파일들이 없습니다:"
    for file in "${MISSING_FILES[@]}"; do
        echo "   - $file"
    done
    echo ""
    echo "💡 모든 파일이 올바른 위치에 있는지 확인해주세요."
    exit 1
fi

echo "✅ 모든 필요 파일 확인 완료"
echo "=================================="
echo ""

# 서버 시작
echo "🌐 QR Future 서버를 시작합니다..."
echo "   브라우저가 자동으로 열립니다."
echo "   종료하려면 Ctrl+C를 누르세요."
echo ""

exec $PYTHON_CMD server.py "$@"
