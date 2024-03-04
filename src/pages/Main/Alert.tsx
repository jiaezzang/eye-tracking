import { learningStatusAtom } from '@/atoms';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import clsx from 'clsx';
import cat_heart from '@/assets/images/alert/cat_heart.png';
import cat_question from '@/assets/images/alert/cat_question.png';
import cat_sleep from '@/assets/images/alert/cat_sleep.png';

/** status code
 *  0 - 측정하지 않는 상태
 *  1 - 집중 상태
 *  2 - 집중하지 않은 상태
 *  3 - 학습 영역을 벗어나 측정할 수 없는 상태
 */
const textData = ['', '잘 하고 있어요!', '조금 더 집중해볼까요?', '똑똑! 어디에 있나요?'];

/**
 * 시선 추적 결과에 따라 alert을 띄워준다.
 * @returns 시선 추적 피드백 alert
 */
export default function Alert() {
    const [isShowAlert, setShowAlert] = useState(false);
    const learningStatus = useAtomValue(learningStatusAtom);

    /** 알림 컴포넌트를 관리한다. */
    useEffect(() => {
        if (!learningStatus) return;

        setShowAlert(true);
        if (learningStatus !== 3) {
            const timeId = setTimeout(() => {
                setShowAlert(false);
            }, 4000);

            return () => clearTimeout(timeId);
        }
    }, [learningStatus]);

    return (
        <>
            {isShowAlert && learningStatus !== 0 && (
                <div
                    className={clsx(
                        `absolute top-[210px] border border-[14px] p-2 z-10 rounded-3xl w-[600px] h-[400px] text-white flex flex-col gap-4 items-center justify-center animate-[slideIn_2000ms_linear] shadow-2xl bg-white`,
                        learningStatus === 1 ? 'border-[skyblue]/50' : learningStatus === 2 ? 'border-[red]/50' : 'border-black/50'
                    )}
                >
                    <img src={learningStatus === 1 ? cat_heart : learningStatus === 2 ? cat_question : cat_sleep} className="w-[250px]"></img>
                    <h2 className="text-center text-3xl text-black font-semibold">{textData[learningStatus]}</h2>
                </div>
            )}
        </>
    );
}
