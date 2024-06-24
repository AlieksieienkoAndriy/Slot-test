import { gsap } from 'gsap';
import { Reel } from './Reel';

export class SpinAnimation {
    static spin(reel: Reel, target: number, duration: number, onComplete: () => void) {
        reel.isSpinning = true;
        gsap.to(reel, {
            position: target,
            duration: duration / 1000,
            ease: 'back.out(0.5)',
            onComplete: () => {
                reel.isSpinning = false;
                onComplete();
            }
        });
    }
}