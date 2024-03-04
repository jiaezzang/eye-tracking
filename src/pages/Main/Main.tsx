import { useEffect, useState } from 'react';
import EyeTrackingSetting from './EyeTrackingSetting';
import { useAtom } from 'jotai';
import { eyeTrackingModeAtom, learningStatusAtom } from '@/atoms';
import clsx from 'clsx';
import Alert from './Alert';

/** state로 관리하는 entered의 초기 설정 */
const initialEntered = { area: '', timestamp: Number.POSITIVE_INFINITY };

/**
 * 메인페이지
 * @returns Main 페이지 컴포넌트
 */
export default function Main() {
    const [modal, setModal] = useState(false);
    const [eyeTrackingMode, setEyeTrackingMode] = useAtom(eyeTrackingModeAtom);
    const [learningStatus, setLearningStatus] = useAtom(learningStatusAtom);
    const [loading, setLoading] = useState(false);

    /** webGazer 세팅 모달 노출 여부를 설정한다. */
    const settingModal = () => {
        if (!eyeTrackingMode) return;
        setModal((prev) => !prev);
    };
    /** Start(Stop) 버튼 클릭 시 실행된다. */
    const onClickStart = () => {
        setEyeTrackingMode((prev) => !prev);
        setLoading(true);
    };

    /**사용자의 시선이 특정 영역에 처음으로 진입한 시간*/
    const [entered, setEntered] = useState<{ area: string; timestamp: number }>(initialEntered);
    /** 특정 영역에 눈이 머무르고 있는 시간*/
    const lookDelay = 5000;
    /** 학습영역 */
    const topContainer = document.querySelector('.top-container') as HTMLDivElement;

    //EyeTracking
    /**시선 추적의 결과로 학습자의 학습 상태를 알린다. */
    window.webgazer.setGazeListener((data, timestamp) => {
        // 학습자가 카메라에서 완전히 벗어났을 때 피드백
        if (modal) return;
        if (window.webgazer.getGlobalDataLength() > 1 && window.webgazer.faceFeedbackBoxBorder() === 'black') {
            setEntered(initialEntered);
            updateStatus(3);
            return;
        }
        if (learningStatus === 3 && window.webgazer.faceFeedbackBoxBorder() !== 'black') {
            if (timestamp - entered.timestamp >= 1500) {
                updateStatus(0);
                setEntered(initialEntered);
            }
        }
        if (!topContainer) return;
        /** 학습 영역에서 배제할 좌우 영역 크기 */
        const widthCutOff = (window.innerWidth - topContainer.offsetWidth) / 2;
        if (!data || !timestamp) return;
        /** 학습 영역 내부에 있는지 여부 */
        const isInArea = data.x >= widthCutOff && data.x <= window.innerWidth - widthCutOff;
        /** 학습 영역 외부에 있는지 여부 */
        const isOutArea = data.x <= widthCutOff * (2 / 3) || data.x >= window.innerWidth - widthCutOff * (2 / 3);

        // 학습 영역에 들어오거나 벗어난 경우, 현재 타임스탬프로 초기화
        setEntered((prev) => ({ ...prev, timestamp: entered.timestamp === Number.POSITIVE_INFINITY ? timestamp : entered.timestamp }));

        //학습 영역 내에 시선이 있고 정면을 응시할 때 긍정 피드백
        if (isInArea && window.webgazer.gazeDotColor() === 'red') {
            if (entered.area !== 'inArea') setEntered({ area: 'inArea', timestamp: timestamp });
            if (entered.area === 'inArea') isTimeOut(timestamp, 1);
        }

        // 학습영역 밖에 시선이 위치할 때 또는 고개가 틀어졌을 때 부정 피드백
        if (isOutArea || window.webgazer.gazeDotColor() === 'green') {
            if (entered.area !== 'inOutArea') setEntered({ area: 'inOutArea', timestamp: timestamp });
            if (entered.area === 'inOutArea') isTimeOut(timestamp, 2);
        }
    });

    /** 특정 영역에 머무르는 시간이 lookDelay값을 넘어갈 때 learningStatus를 업데이트 하고 entered를 초기화 한다. */
    const isTimeOut = (timestamp: number, status: number) => {
        if (timestamp - entered.timestamp >= lookDelay) {
            updateStatus(status);
            setEntered(initialEntered);
        }
    };

    /** 이전 상태와 값이 다른 경우에만 값을 업데이트 한다. */
    const updateStatus = (value: number) => {
        if (learningStatus === value) return;
        setLearningStatus(value);
    };

    useEffect(() => {
        window.webgazer.saveDataAcrossSessions(false);
        window.webgazer.removeMouseEventListeners();
        window.webgazer.showVideo(false);
        if (eyeTrackingMode)
            window.webgazer.begin().then(() => {
                console.log('START!!');
                setLoading(false);
                setModal(true);
            });
        else window.webgazer.end();
    }, [eyeTrackingMode]);
    return (
        <>
            <div className="flex justify-center w-full h-screen bg-blue-100">
                <div className="top-container relative flex flex-col gap-1 justify-center items-center w-full h-full min-w-[1240px] max-w-[1440px] bg-white overflow-hidden">
                    <div
                        className={clsx(
                            'flex items-center justify-center rounded-full border w-[200px] h-[50px] cursor-pointer',
                            eyeTrackingMode ? 'bg-red-500 hover:bg-gray-600' : 'bg-blue-200 hover:bg-blue-300'
                        )}
                        onClick={() => onClickStart()}
                    >
                        {eyeTrackingMode ? 'Stop eye tracking' : 'Start eye tracking'}
                    </div>
                    {loading && <div className="absolute top-14 text-xl text-bold"> 잠시만 기다려 주시면 시선추적 세팅모드가 열립니다. </div>}

                    {modal && <EyeTrackingSetting onComplete={settingModal} />}
                    {!modal && <Alert />}
                </div>
            </div>
        </>
    );
}
