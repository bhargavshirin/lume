import 'element-behaviors';
import { GLTFLoader, GLTF } from '../../../lib/three/examples/jsm/loaders/GLTFLoader.js';
import { RenderableBehavior } from '../../RenderableBehavior.js';
export declare type GltfModelBehaviorAttributes = 'src' | 'dracoDecoder' | 'centerGeometry';
export declare class GltfModelBehavior extends RenderableBehavior {
    #private;
    src: string | null;
    dracoDecoder: string;
    centerGeometry: boolean;
    gltfLoader?: GLTFLoader;
    model: GLTF | null;
    loadGL(): void;
    unloadGL(): void;
}
//# sourceMappingURL=GltfModelBehavior.d.ts.map