interface Webgazer {
    begin: (onFail?: () => void) => Promise<void>;
    isReady: () => boolean;
    pause: () => this;
    resume: () => Promise<this>;
    end: () => this;
    stopVideo: () => this;
    detectCompatibility: () => boolean;
    showVideoPreview: (val: boolean) => this;
    hideVideoElement: (element: HTMLVideoElement) => void;
    showVideo: (val: boolean) => this;
    showFaceOverlay: (val: boolean) => this;
    showFaceFeedbackBox: (val: boolean) => this;
    showPredictionPoints: (val: boolean) => this;
    saveDataAcrossSessions: (val: boolean) => this;
    applyKalmanFilter: (val: boolean) => this;

    setInternalVideoBufferSizes: (width: number, height: number) => void;
    setStaticVideo: (videoLoc: MediaStream) => this;

    removeMouseEventListeners: () => this;
    setGazeListener: (listner: (data: { x: number; y: number }, elapsedTime: number) => void) => this;

    recordScreenMultiplePosition: (x: number, y: number) => void;
    faceFeedbackBoxBorder: () => string;
    gazeDotColor: () => string;
    getGlobalDataLength: () => number;
}
