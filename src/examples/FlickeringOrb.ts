import html from 'solid-js/html'
import {element, numberAttribute, stringAttribute} from '@lume/element'
import {autoDefineElements} from '../LumeConfig.js'
import {Element3D, Element3DAttributes} from '../core/Element3D.js'
import {Motor} from '../core/Motor.js'

import type {PointLight} from '../lights/PointLight.js'
import type {Sphere} from '../meshes/Sphere.js'

export type FlickeringOrbAttributes = Element3DAttributes | 'color' | 'intensity' | 'shadowBias'

@element('flickering-orb', autoDefineElements)
export class FlickeringOrb extends Element3D {
	@stringAttribute('royalblue') color = 'royalblue'
	@numberAttribute(1.3) intensity = 1.3
	@numberAttribute(0) shadowBias = 0

	light?: PointLight
	sphere?: Sphere

	// FIXME 'attr:' is used to work around an issue with default property behavior
	override template = () => html`
		<lume-point-light
			ref=${(l: PointLight) => (this.light = l)}
			attr:color=${() => this.color}
			attr:intensity=${() => this.intensity}
			attr:shadow-bias=${() => this.shadowBias}
			distance="10000"
		>
			<lume-sphere
				ref=${(s: Sphere) => (this.sphere = s)}
				has="basic-material"
				attr:color=${() => this.color}
				opacity="0.5"
				mount-point="0.5 0.5 0.5"
				size="10 10 10"
				cast-shadow="false"
				receive-shadow="false"
			></lume-sphere>
		</lume-point-light>
	`

	override connectedCallback() {
		super.connectedCallback()

		const initialIntensity = this.intensity
		const initialOpacity = this.opacity

		// Prior art: https://www.instructables.com/Realistic-Fire-Effect-with-Arduino-and-LEDs/
		const flickerFunction = () => {
			const flicker = (Math.random() - 1) * 0.4
			this.light!.intensity = initialIntensity + flicker
			this.sphere!.opacity = initialOpacity + flicker

			setTimeout(() => Motor.once(flickerFunction), Math.random() * 100)
		}

		Motor.once(flickerFunction)
	}
}

import type {ElementAttributes} from '@lume/element'

declare module '@lume/element' {
	namespace JSX {
		interface IntrinsicElements {
			'flickering-orb': ElementAttributes<FlickeringOrb, FlickeringOrbAttributes>
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'flickering-orb': FlickeringOrb
	}
}
