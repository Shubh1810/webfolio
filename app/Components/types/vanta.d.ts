declare module 'vanta/dist/vanta.globe.min' {
    interface VantaGlobeConfig {
        el: HTMLElement | null;
        THREE: typeof THREE;
        mouseControls: boolean;
        touchControls: boolean;
        gyroControls: boolean;
        minHeight: number;
        minWidth: number;
        scale: number;
        scaleMobile: number;
        color: number;
        backgroundColor: number;
        size: number;
        speed: number;
    }

    interface VantaGlobeEffect {
        destroy: () => void;
    }

    function GLOBE(config: VantaGlobeConfig): VantaGlobeEffect;
    
    export default GLOBE;
}
