import {element} from '@lume/element'
import Node, {NodeAttributes} from './Node.js'
import {autoDefineElements} from '../LumeConfig.js'

import type {FBXModelBehavior, FBXModelBehaviorAttributes} from '../html/index.js'

export type FBXModelAttributes = NodeAttributes

/**
 * @element lume-fbx-model
 * @class FBXModel - Defines the `<lume-fbx-model>` element, for loading 3D
 * models in the FBX format (.dae files). It is similar to an `<img>` tag, but for 3D.
 *
 * HTML Example:
 *
 * ```html
 * <lume-scene webgl>
 *   <lume-fbx-model src="path/to/model.fbx"></lume-fbx-model>
 * </lume-scene>
 * ```
 *
 * JavaScript Example:
 *
 * ```js
 * const scene = new Scene
 * document.body.append(scene)
 * const model = new FBXModel
 * model.src = 'path/to/model.fbx'
 * scene.add(model)
 * ```
 */
@element('lume-fbx-model', autoDefineElements)
export class FBXModel extends Node {
	static defaultBehaviors = ['fbx-model']
}

import type {ElementAttributes} from '@lume/element'

declare module '@lume/element' {
	namespace JSX {
		interface IntrinsicElements {
			'lume-fbx-model': ElementAttributes<
				FBXModel,
				FBXModelAttributes,
				ElementAttributes<FBXModelBehavior, FBXModelBehaviorAttributes>
			>
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'lume-fbx-model': FBXModel
	}
}
