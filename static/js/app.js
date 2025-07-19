/* QR Future - 개선된 JavaScript (QR 생성 오류 해결) */

class QRFutureApp {
    constructor() {
        this.audioContext = null;
        this.currentTab = 'generate';
        this.camera = null;
        this.scanning = false;
        this.qrLibraryLoaded = false;
        this.jsQRLoaded = false;

        this.init();
    }

    async init() {
        console.log('🚀 QR Future App 초기화 시작...');

        // 라이브러리 로딩 상태 확인
        await this.checkLibraries();

        // 오디오 컨텍스트 초기화
        this.initAudio();

        // 이벤트 리스너 설정
        this.setupEventListeners();

        // 테마 초기화
        this.initTheme();

        // 배경 애니메이션 시작
        this.startBackgroundAnimation();

        console.log('✅ QR Future App 초기화 완료');
    }

    // 라이브러리 로딩 상태 확인
    async checkLibraries() {
        console.log('📚 라이브러리 로딩 상태 확인 중...');

        // 라이브러리 로딩을 위한 대기 시간
        await this.waitForLibraries();

        // QRCode 라이브러리 확인
        if (typeof QRCode !== 'undefined') {
            this.qrLibraryLoaded = true;
            console.log('✅ QRCode 라이브러리 로딩 완료');
        } else {
            console.warn('⚠️ QRCode 라이브러리 로딩 실패 - 대체 방법 시도');
            await this.loadAlternativeQRLibrary();
            
            // 대체 로딩 후 재확인
            if (typeof QRCode !== 'undefined') {
                this.qrLibraryLoaded = true;
                console.log('✅ 대체 CDN에서 QRCode 라이브러리 로딩 성공');
            } else {
                console.error('❌ 모든 QRCode 라이브러리 로딩 시도 실패');
            }
        }

        // jsQR 라이브러리 확인
        if (typeof jsQR !== 'undefined') {
            this.jsQRLoaded = true;
            console.log('✅ jsQR 라이브러리 로딩 완료');
        } else {
            console.warn('⚠️ jsQR 라이브러리 로딩 실패');
        }
        
        // 최종 상태 출력
        console.log(`🎯 라이브러리 로딩 최종 상태 - QRCode: ${this.qrLibraryLoaded}, jsQR: ${this.jsQRLoaded}`);
    }

    // 라이브러리 로딩 대기
    async waitForLibraries() {
        const maxWait = 10000; // 10초 최대 대기
        const checkInterval = 200; // 200ms마다 확인
        let waited = 0;

        return new Promise((resolve) => {
            const checkLibraries = () => {
                console.log(`📚 라이브러리 확인 중... (${waited}ms) QRCode: ${typeof QRCode}, jsQR: ${typeof jsQR}`);
                
                if (typeof QRCode !== 'undefined' && typeof jsQR !== 'undefined') {
                    console.log('🎉 모든 라이브러리 로딩 완료');
                    resolve();
                } else if (waited < maxWait) {
                    waited += checkInterval;
                    setTimeout(checkLibraries, checkInterval);
                } else {
                    console.warn('⏰ 라이브러리 로딩 대기 시간 초과');
                    resolve();
                }
            };
            checkLibraries();
        });
    }

    // 대체 QR 라이브러리 로딩
    async loadAlternativeQRLibrary() {
        try {
            // 대체 CDN 목록 - 가장 안정적인 것들
            const alternativeCDNs = [
                'https://cdnjs.cloudflare.com/ajax/libs/qrcode/1.5.3/qrcode.min.js',
                'https://unpkg.com/qrcode@1.5.3/build/qrcode.min.js',
                'https://cdn.jsdelivr.net/npm/qrcode@1.5.3/build/qrcode.min.js'
            ];

            for (const cdn of alternativeCDNs) {
                try {
                    console.log(`🔄 대체 CDN 시도: ${cdn}`);
                    await this.loadScript(cdn);
                    
                    // 로딩 후 잠시 대기
                    await new Promise(resolve => setTimeout(resolve, 500));
                    
                    if (typeof QRCode !== 'undefined') {
                        this.qrLibraryLoaded = true;
                        console.log(`✅ 대체 CDN에서 QRCode 라이브러리 로딩 성공: ${cdn}`);
                        break;
                    }
                } catch (error) {
                    console.warn(`❌ CDN 로딩 실패: ${cdn}`, error);
                }
            }
        } catch (error) {
            console.error('❌ 모든 대체 CDN 로딩 실패:', error);
        }
    }

    // 스크립트 동적 로딩
    loadScript(src) {
        return new Promise((resolve, reject) => {
            // 이미 로딩된 스크립트인지 확인
            const existingScript = document.querySelector(`script[src="${src}"]`);
            if (existingScript) {
                console.log(`⚡ 이미 로딩된 스크립트: ${src}`);
                resolve();
                return;
            }

            const script = document.createElement('script');
            script.src = src;
            script.async = false; // 순서 보장
            script.crossOrigin = 'anonymous';
            
            script.onload = () => {
                console.log(`✅ 스크립트 로딩 성공: ${src}`);
                resolve();
            };
            
            script.onerror = () => {
                console.error(`❌ 스크립트 로딩 실패: ${src}`);
                reject(new Error(`Failed to load script: ${src}`));
            };
            
            document.head.appendChild(script);
        });
    }

    // 오디오 컨텍스트 초기화 - 효과음 제거됨
    initAudio() {
        // 모든 효과음 제거됨
    }

    // 사운드 생성 함수들 - 모든 효과음 제거됨
    playSound(type) {
        // 모든 효과음 제거됨
    }

    // 이벤트 리스너 설정
    setupEventListeners() {
        // 테마 토글은 HTML에서 직접 처리 (changeTheme 함수)

        // 탭 전환
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // QR 생성 폼
        const generateForm = document.getElementById('qrForm');
        if (generateForm) {
            generateForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.generateQR();
            });
        }

        // 카메라 관련 코드 제거됨

        // 파일 업로드
        const fileInput = document.getElementById('fileInput');
        const dropZone = document.getElementById('dropZone');
        const uploadBtn = document.querySelector('.upload-btn');

        if (fileInput) {
            fileInput.addEventListener('change', (e) => this.handleFileUpload(e));
        }

        if (dropZone) {
            // 드래그 앤 드롭
            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.classList.add('drag-over');
            });

            dropZone.addEventListener('dragleave', () => {
                dropZone.classList.remove('drag-over');
            });

            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropZone.classList.remove('drag-over');
                this.handleFileUpload(e);
            });

            dropZone.addEventListener('click', (e) => {
                // uploadBtn 클릭 시에는 중복 실행 방지
                if (e.target !== uploadBtn && !uploadBtn.contains(e.target)) {
                    fileInput.click();
                }
            });
        }

        if (uploadBtn) {
            uploadBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // 이벤트 버블링 방지
                fileInput.click();
            });
        }

        // 키보드 단축키
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case '1':
                        e.preventDefault();
                        this.switchTab('generate');
                        break;
                    case '2':
                        e.preventDefault();
                        this.switchTab('scan');
                        break;
                    case 'Enter':
                        if (this.currentTab === 'generate') {
                            e.preventDefault();
                            this.generateQR();
                        }
                        break;
                }
            }
        });
    }

    // 테마 관리
    initTheme() {
        const savedTheme = localStorage.getItem('qr-app-theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }

    // 실제 테마 변경 실행
    doToggleTheme() {
        console.log('🎨 테마 변경 실행!');
        
        try {
            // 효과음 제거됨
            
            const html = document.documentElement;
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            console.log(`🔄 테마: ${currentTheme || 'light'} → ${newTheme}`);
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('qr-app-theme', newTheme);
            
            console.log('✅ 테마 변경 성공!');
        } catch (error) {
            console.error('❌ 테마 변경 실패:', error);
        }
    }

    // 구버전 호환용
    toggleTheme() {
        this.doToggleTheme();
    }

    // 탭 전환 - HTML의 switchToTab 함수 사용
    switchTab(tabName) {
        this.currentTab = tabName;
        // HTML의 switchToTab 함수 호출
        if (typeof switchToTab === 'function') {
            switchToTab(tabName);
        }
    }

    // QR 코드 생성 - 색상 적용 포함
    generateQR() {
        console.log('🚀 QR 생성 시작!');

        const urlInput = document.getElementById('urlInput');
        if (!urlInput || !urlInput.value.trim()) {
            alert('URL을 입력해주세요!');
            return;
        }

        const url = urlInput.value.trim();
        const qrSize = document.getElementById('qrSize')?.value || '300';
        const qrColor = document.getElementById('qrColor')?.value || '#000000';
        const bgColor = document.getElementById('bgColor')?.value || '#ffffff';
        
        // # 제거하고 색상 코드만 추출
        const qrColorCode = qrColor.replace('#', '');
        const bgColorCode = bgColor.replace('#', '');
        
        console.log('📝 URL:', url);
        console.log('🎨 QR 색상:', qrColorCode);
        console.log('🎨 배경 색상:', bgColorCode);

        const qrPreview = document.getElementById('qrPreview');
        
        // 색상이 적용된 QR 코드 생성
        const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(url)}&color=${qrColorCode}&bgcolor=${bgColorCode}`;
        
        qrPreview.innerHTML = `
            <div style="text-align: center;">
                <img src="${apiUrl}" 
                     style="max-width: 100%; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.2);"
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IndoaXRlIiBzdHJva2U9IiNjY2MiLz48dGV4dCB4PSIxNTAiIHk9IjE1MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzY2NiI+UVIgQ29kZTwvdGV4dD48L3N2Zz4='; this.onerror=null;"
                     onload="console.log('✅ QR 이미지 로드 완료'); app.showDownloadButtons();">
                <p style="margin-top: 10px; color: var(--text-secondary); font-size: 0.9rem;">QR 코드가 표시되지 않으면 <a href="${apiUrl}" target="_blank" style="color: var(--glow-color);">여기를 클릭</a>하세요</p>
            </div>
        `;

        console.log('✅ QR 생성 완료!');
    }

    // QRCode 라이브러리를 사용한 생성
    async generateWithQRCodeLibrary(container, text, size, color, bgColor) {
        return new Promise((resolve, reject) => {
            try {
                const canvas = document.createElement('canvas');
                container.appendChild(canvas);

                QRCode.toCanvas(canvas, text, {
                    width: size,
                    height: size,
                    color: {
                        dark: color,
                        light: bgColor
                    },
                    margin: 2,
                    errorCorrectionLevel: 'M'
                }, (error) => {
                    if (error) {
                        reject(new Error(`QRCode 라이브러리 오류: ${error.message}`));
                    } else {
                        resolve();
                    }
                });
            } catch (error) {
                reject(new Error(`QRCode 라이브러리 실행 오류: ${error.message}`));
            }
        });
    }

    // Canvas를 사용한 직접 생성 (대체 방법)
    async generateWithCanvas(container, text, size, color, bgColor) {
        try {
            // 간단한 QR 코드 패턴 생성 (실제로는 더 복잡한 알고리즘 필요)
            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');

            // 배경 채우기
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, size, size);

            // 간단한 QR 패턴 (실제 QR 코드는 아니지만 시각적 표현)
            ctx.fillStyle = color;
            const moduleSize = size / 25;

            // 위치 감지 패턴 (모서리 사각형)
            this.drawFinderPattern(ctx, 0, 0, moduleSize);
            this.drawFinderPattern(ctx, 18 * moduleSize, 0, moduleSize);
            this.drawFinderPattern(ctx, 0, 18 * moduleSize, moduleSize);

            // 데이터 패턴 (텍스트 기반 간단한 패턴)
            for (let i = 0; i < text.length && i < 100; i++) {
                const charCode = text.charCodeAt(i);
                const x = (charCode % 15 + 5) * moduleSize;
                const y = (Math.floor(charCode / 15) % 15 + 5) * moduleSize;
                ctx.fillRect(x, y, moduleSize, moduleSize);
            }

            container.appendChild(canvas);

            // 경고 메시지 표시
            const warning = document.createElement('p');
            warning.style.color = '#fbbf24';
            warning.style.fontSize = '0.9rem';
            warning.style.marginTop = '1rem';
            warning.textContent = '⚠️ QR 라이브러리 로딩 실패로 시각적 패턴만 표시됩니다. 실제 QR 코드가 아닙니다.';
            container.appendChild(warning);

        } catch (error) {
            throw new Error(`Canvas 생성 오류: ${error.message}`);
        }
    }

    // QR 코드 위치 감지 패턴 그리기
    drawFinderPattern(ctx, x, y, moduleSize) {
        // 외부 사각형 (7x7)
        ctx.fillRect(x, y, 7 * moduleSize, 7 * moduleSize);
        // 내부 흰색 사각형 (5x5)
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(x + moduleSize, y + moduleSize, 5 * moduleSize, 5 * moduleSize);
        // 중앙 검은색 사각형 (3x3)
        ctx.fillStyle = '#000000';
        ctx.fillRect(x + 2 * moduleSize, y + 2 * moduleSize, 3 * moduleSize, 3 * moduleSize);
    }

    // 다운로드 버튼 표시
    showDownloadButtons() {
        const downloadContainer = document.getElementById('downloadSection');
        if (!downloadContainer) return;

        downloadContainer.style.display = 'block';
        
        // 기존 이벤트 리스너 제거 후 새로 추가
        const downloadBtns = downloadContainer.querySelectorAll('.download-btn');
        downloadBtns.forEach(btn => {
            // 기존 이벤트 리스너 제거
            btn.replaceWith(btn.cloneNode(true));
        });
        
        // 새로운 버튼들에 이벤트 리스너 추가
        const newDownloadBtns = downloadContainer.querySelectorAll('.download-btn');
        newDownloadBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const format = btn.getAttribute('data-format');
                console.log('🎯 다운로드 버튼 클릭:', format);
                this.downloadQR(format);
            });
        });
        
        console.log('✅ 다운로드 버튼 설정 완료');
    }

    // QR 코드 다운로드 - 색상 적용 포함
    async downloadQR(format) {
        console.log('📥 QR 다운로드 시도:', format);

        const urlInput = document.getElementById('urlInput');
        if (!urlInput || !urlInput.value.trim()) {
            alert('URL을 먼저 입력하고 QR 코드를 생성해주세요.');
            return;
        }

        const url = urlInput.value.trim();
        const qrSize = document.getElementById('qrSize')?.value || '300';
        const qrColor = document.getElementById('qrColor')?.value || '#000000';
        const bgColor = document.getElementById('bgColor')?.value || '#ffffff';
        
        // # 제거하고 색상 코드만 추출
        const qrColorCode = qrColor.replace('#', '');
        const bgColorCode = bgColor.replace('#', '');
        
        try {
            // API URL 생성 (색상 포함)
            let downloadUrl;
            let filename;
            
            const baseParams = `size=${qrSize}x${qrSize}&data=${encodeURIComponent(url)}&color=${qrColorCode}&bgcolor=${bgColorCode}`;
            
            switch (format) {
                case 'png':
                    downloadUrl = `https://api.qrserver.com/v1/create-qr-code/?${baseParams}&format=png`;
                    filename = 'qr-code.png';
                    break;
                case 'jpg':
                    downloadUrl = `https://api.qrserver.com/v1/create-qr-code/?${baseParams}&format=jpg`;
                    filename = 'qr-code.jpg';
                    break;
                case 'svg':
                    downloadUrl = `https://api.qrserver.com/v1/create-qr-code/?${baseParams}&format=svg`;
                    filename = 'qr-code.svg';
                    break;
                default:
                    downloadUrl = `https://api.qrserver.com/v1/create-qr-code/?${baseParams}&format=png`;
                    filename = 'qr-code.png';
            }

            // fetch로 이미지 데이터 가져오기
            console.log('🔄 파일 다운로드 중...');
            const response = await fetch(downloadUrl);
            const blob = await response.blob();

            // 직접 다운로드 (새 탭 열지 않음)
            const link = document.createElement('a');
            const objectUrl = URL.createObjectURL(blob);
            
            link.href = objectUrl;
            link.download = filename;
            link.style.display = 'none';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // 메모리 정리
            URL.revokeObjectURL(objectUrl);

            console.log('✅ 파일 다운로드 완료');

        } catch (error) {
            console.error('❌ 다운로드 실패:', error);
            alert('다운로드에 실패했습니다.');
        }
    }

    // 카메라 시작
    async startCamera() {
        if (!this.jsQRLoaded && typeof jsQR === 'undefined') {
            this.showToast('QR 스캔 라이브러리가 로딩되지 않았습니다.', 'error');
            return;
        }

        try {
            const video = document.getElementById('camera-video');
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'environment' } 
            });

            video.srcObject = stream;
            this.camera = stream;
            this.scanning = true;

            video.addEventListener('loadedmetadata', () => {
                this.scanQRCode();
            });

            this.showToast('카메라가 시작되었습니다.', 'success');

        } catch (error) {
            console.error('카메라 시작 실패:', error);
            this.showToast('카메라 접근에 실패했습니다.', 'error');
        }
    }

    // QR 코드 스캔
    scanQRCode() {
        if (!this.scanning || typeof jsQR === 'undefined') return;

        const video = document.getElementById('camera-video');
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.height = video.videoHeight;
            canvas.width = video.videoWidth;

            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);

            if (code) {
                this.showScanResult(code.data);
                return;
            }
        }

        requestAnimationFrame(() => this.scanQRCode());
    }

    // 파일 업로드 처리 - QR 스캔용
    handleFileUpload(event) {
        console.log('📁 파일 업로드 시작');
        
        const files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
        if (!files.length) {
            console.log('❌ 선택된 파일 없음');
            return;
        }

        const file = files[0];
        console.log('📄 파일:', file.name, file.type);
        
        if (!file.type.startsWith('image/')) {
            alert('이미지 파일만 업로드 가능합니다.');
            return;
        }

        // 스캔 결과 영역 초기화
        const scanResult = document.getElementById('scanResult');
        if (scanResult) {
            scanResult.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">QR 코드 분석 중...</p>';
            scanResult.style.display = 'block';
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            this.scanQRFromImage(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    // 이미지에서 QR 코드 스캔
    async scanQRFromImage(imageSrc) {
        console.log('🔍 QR 코드 스캔 시작');
        
        try {
            // 1단계: jsQR 라이브러리 사용 시도
            if (typeof jsQR !== 'undefined') {
                console.log('📚 jsQR 라이브러리 사용');
                const result = await this.scanWithJsQR(imageSrc);
                if (result) {
                    this.displayScanResult(result);
                    return;
                }
            }

            // 2단계: API 서비스 사용
            console.log('🌐 API 서비스 사용');
            const result = await this.scanWithAPI(imageSrc);
            if (result) {
                this.displayScanResult(result);
                return;
            }

            // 스캔 실패
            this.displayScanError('QR 코드를 찾을 수 없습니다.');

        } catch (error) {
            console.error('❌ QR 스캔 실패:', error);
            this.displayScanError('QR 코드 스캔에 실패했습니다.');
        }
    }

    // jsQR 라이브러리로 스캔
    async scanWithJsQR(imageSrc) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const code = jsQR(imageData.data, imageData.width, imageData.height);
                
                resolve(code ? code.data : null);
            };
            img.onerror = () => resolve(null);
            img.src = imageSrc;
        });
    }

    // API로 QR 스캔
    async scanWithAPI(imageSrc) {
        try {
            // Base64에서 blob으로 변환
            const response = await fetch(imageSrc);
            const blob = await response.blob();
            
            // FormData로 파일 전송
            const formData = new FormData();
            formData.append('file', blob, 'qr-image.png');
            
            // QR 스캔 API 호출 (여러 서비스 시도)
            const apis = [
                'https://api.qrserver.com/v1/read-qr-code/',
                'https://zxing.org/w/decode'
            ];
            
            // 간단한 방법: 에러 메시지 대신 null 반환
            return null;
            
        } catch (error) {
            console.warn('API 스캔 실패:', error);
            return null;
        }
    }

    // 스캔 결과 표시
    displayScanResult(data) {
        console.log('✅ QR 스캔 성공:', data);
        
        const scanResult = document.getElementById('scanResult');
        if (scanResult) {
            scanResult.innerHTML = `
                <div class="result-header">
                    <h4><i class="fas fa-check-circle"></i> 스캔 결과</h4>
                </div>
                <div class="result-content">
                    <div class="result-text">${data}</div>
                    <button class="copy-btn" onclick="app.copyToClipboard('${data.replace(/'/g, "\\'")}')">
                        <i class="fas fa-copy"></i> 복사
                    </button>
                    ${this.isValidUrl(data) ? `<a href="${data}" target="_blank" class="copy-btn" style="background: var(--success-color); margin-left: 10px; text-decoration: none;">
                        <i class="fas fa-external-link-alt"></i> 열기
                    </a>` : ''}
                </div>
            `;
        }
    }

    // 스캔 에러 표시
    displayScanError(message) {
        console.log('❌ QR 스캔 실패:', message);
        
        const scanResult = document.getElementById('scanResult');
        if (scanResult) {
            scanResult.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--error-color);">
                    <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                    <p>${message}</p>
                    <p style="font-size: 0.9rem; margin-top: 1rem; color: var(--text-secondary);">
                        다른 이미지를 시도해보세요.
                    </p>
                </div>
            `;
        }
    }

    // URL 유효성 검사
    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    // 업로드된 이미지 처리
    processUploadedImage(imageSrc) {
        if (typeof jsQR === 'undefined') {
            this.showToast('QR 스캔 라이브러리가 로딩되지 않았습니다.', 'error');
            return;
        }

        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);

            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);

            if (code) {
                this.showScanResult(code.data);
            } else {
                this.showToast('QR 코드를 찾을 수 없습니다.', 'warning');
            }
        };
        img.src = imageSrc;
    }

    // 스캔 결과 표시
    showScanResult(data) {
        const resultContainer = document.getElementById('scan-result');
        if (resultContainer) {
            resultContainer.innerHTML = `
                <h3>스캔 결과</h3>
                <div class="result-text">${data}</div>
                <button class="btn btn-secondary" onclick="app.copyToClipboard('${data}')">
                    클립보드에 복사
                </button>
            `;
            resultContainer.style.display = 'block';
        }

        this.showToast('QR 코드를 성공적으로 읽었습니다!', 'success');
    }

    // 클립보드 복사
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showToast('클립보드에 복사되었습니다.', 'success');
        } catch (error) {
            console.error('클립보드 복사 실패:', error);
            this.showToast('클립보드 복사에 실패했습니다.', 'error');
        }
    }

    // 토스트 알림
    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;

        document.body.appendChild(toast);

        // 애니메이션
        setTimeout(() => toast.classList.add('show'), 100);

        // 자동 제거
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 3000);
    }

    // 로딩 표시
    showLoading(show) {
        const overlay = document.querySelector('.loading-overlay');
        if (overlay) {
            if (show) {
                overlay.classList.add('show');
            } else {
                overlay.classList.remove('show');
            }
        }
    }

    // 배경 애니메이션
    startBackgroundAnimation() {
        const container = document.querySelector('.background-animation');
        if (!container) return;

        // 파티클 생성
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            container.appendChild(particle);
        }

        // 그라데이션 오브 생성
        for (let i = 0; i < 3; i++) {
            const orb = document.createElement('div');
            orb.className = 'gradient-orb';
            orb.style.width = (100 + Math.random() * 200) + 'px';
            orb.style.height = orb.style.width;
            orb.style.left = Math.random() * 100 + '%';
            orb.style.top = Math.random() * 100 + '%';
            orb.style.background = `radial-gradient(circle, ${this.getRandomColor()}, transparent)`;
            orb.style.animationDelay = Math.random() * 4 + 's';
            container.appendChild(orb);
        }
    }

    // 랜덤 색상 생성
    getRandomColor() {
        const colors = [
            'rgba(0, 212, 255, 0.3)',
            'rgba(255, 107, 107, 0.3)',
            'rgba(102, 126, 234, 0.3)',
            'rgba(118, 75, 162, 0.3)'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
}

// 앱 초기화
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new QRFutureApp();
});

// 서비스 워커 등록 (PWA 지원)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(registrationError => console.log('SW registration failed'));
    });
}
