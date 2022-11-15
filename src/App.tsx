import { useState, WheelEventHandler, useRef } from 'react';
import './App.css';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
// import animationData from './animation.json';

interface WheelEvent<T = Element> extends WheelEventHandler<T> {
  deltaMode: number;
  deltaX: number;
  deltaY: number;
  deltaZ: number;
}

function App() {
  const [animProgress, setAnimProgress] = useState(0);
  const animation = useRef(null);

  const onScroll = (event: WheelEvent<HTMLDivElement>) => {
    // console.log("scroll", event);
    let progress = 0;
    const step = 4;

    switch (event.type) {
      case 'wheel':
        progress = (event.deltaY > 0 ? step : -step) / 100;
        break;

      default:
      case 'touchmove':
        progress = step / 100;
        break;
    }

    setAnimProgress(Math.max(Math.min(progress + animProgress, 1), 0));

    const { current: lottie }: { current: typeof Player } = animation as any;
    const totalFrames = lottie.state.instance.totalFrames;

    lottie.setSeeker(totalFrames * animProgress, false);
  };

  const onPress = () => {
    const { current: lottie }: { current: typeof Player } = animation as any;
    console.log(lottie);
    lottie.play();
  };

  const onReset = () => {
    const { current: lottie }: { current: typeof Player } = animation as any;
    console.log(lottie);
    lottie.setSeeker(0);
    setAnimProgress(0);
  };

  return (
    //@ts-ignore
    <div className="App" onWheel={onScroll} onTouchMove={onScroll}>
      <header>
        scroll position {animProgress}
        <div className="Animation">
          <Player
            loop
            ref={animation}
            src="https://assets8.lottiefiles.com/packages/lf20_svotowoc.json"
            style={{ height: '300px', width: '300px' }}
          ></Player>

          <button onClick={onPress}>play</button>
          <button onClick={onReset}>reset</button>
        </div>
      </header>
    </div>
  );
}

export default App;
