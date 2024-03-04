import tako from '@/assets/images/eyeTrackingSetting/cut_tako.png';
import flour from '@/assets/images/eyeTrackingSetting/flour.png';
import katsuobushi from '@/assets/images/eyeTrackingSetting/katsuobushi.png';
import sauce from '@/assets/images/eyeTrackingSetting/sauce.png';
import chef from '@/assets/images/eyeTrackingSetting/chef_cat.png';
import chef2 from '@/assets/images/eyeTrackingSetting/chef_cat2.png';
import { DragEvent, useEffect, useState } from 'react';
import clsx from 'clsx';

/**
 * classRoom 진입 전 시선 추적 데이터를 세팅하는 Modal
 * @returns {JSX.Element} EyeTracking Setting Modal Component
 */
export default function EyeTrackingSetting({ onComplete }: { onComplete: () => void }) {
    const [count, setCount] = useState(0);
    /** 드래그 상태로 특정 영역 안에 진입 시 실행한다. */
    const dragEnter = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    /** 이미지를 Drag했을 때 해당 이미지의 id를 저장하고 시선 추적 데이터를 쌓는다.*/
    const drag = (e: DragEvent<HTMLImageElement>) => {
        e.dataTransfer.setData('text', (e.target as HTMLImageElement).id);
        window.webgazer.recordScreenMultiplePosition(e.clientX, e.clientY);
    };

    /** Drag한 이미지를 특정 영역 안에 Drop한다. */
    const drop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('text');
        const img = document.getElementById(data);
        if (img) {
            img.remove();
            setCount((prev) => ++prev);
        }
    };

    //세팅을 마친 후 모달 닫기
    useEffect(() => {
        if (count === 4) {
            setTimeout(() => {
                onComplete();
            }, 4000);
        }
    }, [count]);
    return (
        <div className="fixed inset-0 z-10 bg-[black] bg-opacity-[0.85] h-screen flex flex-col">
            <header className="py-14 text-center text-lg text-white sm:text-xl mb-4">
                <h3 className="text-3xl font-semibold">타코야끼 재료를 냥셰프에게 가져다 줘!</h3>
            </header>
            <div className="flex-1">
                <div className="h-full flex flex-col justify-center items-center">
                    <div className="absolute flex justify-between w-full px-20 top-14">
                        <div className="draggable w-1/6 max-w-[150px] max-h-[150px]">
                            <img src={tako} id="tako" draggable="true" onDragStart={(e) => drag(e)}></img>
                        </div>
                        <div className="draggable w-1/6 max-w-[150px] max-h-[150px]">
                            <img src={flour} id="flour" draggable="true" onDragStart={(e) => drag(e)}></img>
                        </div>
                    </div>
                    <div className="relative w-1/3 max-w-[400px] max-h-[400px] my-auto p-8 flex justify-center items-center gap-2">
                        <img
                            id="chef"
                            className={clsx(`absolute`, count === 4 && `animate-fadeOut`)}
                            src={chef}
                            onDrop={(e) => drop(e)}
                            onDragOver={(e) => dragEnter(e)}
                        />
                        <img
                            id="chef2"
                            className={clsx(`absolute`, count === 4 ? `animate-fadeIn` : 'opacity-0')}
                            src={chef2}
                            onDrop={(e) => drop(e)}
                            onDragOver={(e) => dragEnter(e)}
                        />
                    </div>
                    <div className="fixed flex justify-between w-full px-20 bottom-14">
                        <div className="draggable w-1/6 max-w-[150px] max-h-[150px]">
                            <img src={katsuobushi} id="katsuobushi" draggable="true" onDragStart={(e) => drag(e)}></img>
                        </div>
                        <div className="draggable w-1/6 max-w-[150px] max-h-[150px]">
                            <img src={sauce} id="sauce" draggable="true" onDragStart={(e) => drag(e)}></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
