#!/usr/bin/env python3
"""
QR Future - 미래지향적 QR 코드 애플리케이션 서버
순수 Python 내장 모듈만 사용하여 Python 3.13 완전 호환
"""

import http.server
import socketserver
import os
import sys
import webbrowser
import threading
import time
from urllib.parse import urlparse, parse_qs
import json

class QRFutureHandler(http.server.SimpleHTTPRequestHandler):
    """QR Future 앱을 위한 커스텀 HTTP 핸들러"""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.path.dirname(os.path.abspath(__file__)), **kwargs)

    def end_headers(self):
        """CORS 헤더 추가"""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        """OPTIONS 요청 처리 (CORS preflight)"""
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        """GET 요청 처리"""
        if self.path == '/':
            self.path = '/index.html'

        # API 엔드포인트
        if self.path.startswith('/api/'):
            self.handle_api_request()
        else:
            super().do_GET()

    def do_POST(self):
        """POST 요청 처리"""
        if self.path.startswith('/api/'):
            self.handle_api_request()
        else:
            self.send_error(404)

    def handle_api_request(self):
        """API 요청 처리"""
        try:
            if self.path == '/api/health':
                self.send_json_response({
                    'status': 'ok',
                    'message': 'QR Future 서버가 정상 동작 중입니다',
                    'python_version': sys.version,
                    'server_time': time.strftime('%Y-%m-%d %H:%M:%S')
                })
            else:
                self.send_error(404, 'API 엔드포인트를 찾을 수 없습니다')
        except Exception as e:
            self.send_json_response({
                'error': str(e)
            }, status=500)

    def send_json_response(self, data, status=200):
        """JSON 응답 전송"""
        self.send_response(status)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data, ensure_ascii=False).encode('utf-8'))

    def log_message(self, format, *args):
        """로그 메시지 포맷팅"""
        timestamp = time.strftime('%Y-%m-%d %H:%M:%S')
        print(f"[{timestamp}] {format % args}")

class QRFutureServer:
    """QR Future 서버 클래스"""

    def __init__(self, port=8000, host='localhost'):
        self.port = port
        self.host = host
        self.httpd = None

    def start(self, open_browser=True):
        """서버 시작"""
        try:
            # 서버 생성
            self.httpd = socketserver.TCPServer((self.host, self.port), QRFutureHandler)

            print("🚀 QR Future 서버 시작!")
            print(f"📍 서버 주소: http://{self.host}:{self.port}")
            print(f"🐍 Python 버전: {sys.version}")
            print(f"📁 서빙 디렉토리: {os.path.dirname(os.path.abspath(__file__))}")
            print("=" * 50)

            # 브라우저 자동 열기
            if open_browser:
                def open_browser_delayed():
                    time.sleep(1)  # 서버 시작 대기
                    try:
                        webbrowser.open(f'http://{self.host}:{self.port}')
                        print("🌐 브라우저가 자동으로 열렸습니다!")
                    except Exception as e:
                        print(f"⚠️  브라우저 자동 열기 실패: {e}")
                        print(f"   수동으로 http://{self.host}:{self.port} 에 접속해주세요.")

                browser_thread = threading.Thread(target=open_browser_delayed)
                browser_thread.daemon = True
                browser_thread.start()

            print("\n🎯 서버가 실행 중입니다. Ctrl+C로 종료할 수 있습니다.")
            print("=" * 50)

            # 서버 실행
            self.httpd.serve_forever()

        except KeyboardInterrupt:
            print("\n\n🛑 서버 종료 중...")
            self.stop()
        except OSError as e:
            if e.errno == 48:  # Address already in use
                print(f"❌ 포트 {self.port}가 이미 사용 중입니다.")
                print(f"   다른 포트를 사용하려면: python server.py --port 8001")
            else:
                print(f"❌ 서버 시작 오류: {e}")
            sys.exit(1)
        except Exception as e:
            print(f"❌ 예상치 못한 오류: {e}")
            sys.exit(1)

    def stop(self):
        """서버 정지"""
        if self.httpd:
            self.httpd.shutdown()
            self.httpd.server_close()
            print("✅ 서버가 정상적으로 종료되었습니다.")

def main():
    """메인 함수"""
    import argparse

    parser = argparse.ArgumentParser(description='QR Future 서버')
    parser.add_argument('--port', type=int, default=8000, help='서버 포트 (기본값: 8000)')
    parser.add_argument('--host', default='localhost', help='서버 호스트 (기본값: localhost)')
    parser.add_argument('--no-browser', action='store_true', help='브라우저 자동 열기 비활성화')

    args = parser.parse_args()

    # 필요한 파일들 존재 확인
    required_files = ['index.html', 'static/css/style.css', 'static/js/app.js']
    missing_files = []

    for file_path in required_files:
        if not os.path.exists(file_path):
            missing_files.append(file_path)

    if missing_files:
        print("❌ 다음 파일들이 없습니다:")
        for file_path in missing_files:
            print(f"   - {file_path}")
        print("\n💡 모든 파일이 올바른 위치에 있는지 확인해주세요.")
        sys.exit(1)

    # 서버 시작
    server = QRFutureServer(port=args.port, host=args.host)
    server.start(open_browser=not args.no_browser)

if __name__ == '__main__':
    main()
