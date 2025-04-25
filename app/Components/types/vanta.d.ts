// types/vanta.d.ts


declare module 'vanta/dist/vanta.waves.min' {
    import * as THREE from 'three';
  
    interface VantaEffect {
      destroy: () => void;
      // Add other methods if necessary
    }
  
    interface VantaOptions {
      el: HTMLElement;
      THREE: typeof THREE;
      mouseControls: boolean;
      touchControls: boolean;
      gyroControls: boolean;
      minHeight: number;
      minWidth: number;
      scale: number;
      scaleMobile: number;
      color: number;
      shininess: number;
      waveHeight: number;
      zoom: number;
      backgroundColor: number;
      // Include any additional options you use
    }
  
    const WAVES: (options: VantaOptions) => VantaEffect;
  
    export default WAVES;
  }