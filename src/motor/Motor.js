import {
    documentReady,
    animationFrame,
} from './Utility'

class Motor {
    constructor() {
        this._inFrame = false // true when inside a requested animation frame.
        this._rAF = null // the current animation frame, or null.
        this._animationLoopStarted = false
        this._allRenderTasks = []
        this._nodesToBeRendered = new Map
    }

    /**
     * Starts an rAF loop and runs the render tasks in the _renderTasks stack.
     * As long as there are tasks in the stack, the loop continues. When the
     * stack becomes empty due to removal of tasks, the rAF stops and the app
     * sits there doing nothing -- silence, crickets.
     */
    async _startAnimationLoop() {
        this._animationLoopStarted = true

        await documentReady()

        // DIRECT ANIMATION LOOP ///////////////////////////////////
        // So now we can render after the scene is mounted.
        const loop = timestamp => {
            this._inFrame = true

            this._runRenderTasks(timestamp)
            this._renderNodes(timestamp)

            // If any tasks are left to run, continue the animation loop.
            if (this._allRenderTasks.length)
                this._rAF = requestAnimationFrame(loop)
            else {
                this._rAF = null
                this._animationLoopStarted = false
            }

            this._inFrame = false
        }

        this._rAF = requestAnimationFrame(loop)

        // ANIMATION LOOP USING WHILE AND AWAIT ///////////////////////////////////
        //this._rAF = true
        //let timestamp = null
        //while (this._rAF) {
            //timestamp = await animationFrame()
            //this._inFrame = true

            //this._runRenderTasks(timestamp)
            //this._renderNodes(timestamp)

            //// If any tasks are left to run, continue the animation loop.
            //if (!this._allRenderTasks.length) {
                //this._rAF = null
                //this._animationLoopStarted = false
            //}

            //this._inFrame = false
        //}
    }

    /**
     * When a render tasks is added (via Node#addRenderTask) a new rAF loop
     * will be started if there isn't one currently.
     */
    addRenderTask(fn) {
        if (typeof fn != 'function')
            throw new Error('Render task must be a function.')

        this._allRenderTasks.push(fn)

        // If the render loop isn't started, start it.
        if (!this._animationLoopStarted)
            this._startAnimationLoop()
    }

    removeRenderTask(fn) {
        this._allRenderTasks.splice(this._allRenderTasks.indexOf(fn), 1)
    }

    _runRenderTasks(timestamp) {
        for (let task of this._allRenderTasks) {
            task(timestamp)
        }
    }

    _setNodeToBeRendered(node) {
        if (!this._nodesToBeRendered.has(node))
            this._nodesToBeRendered.set(node)
    }

    _unsetNodeToBeRendered(node) {
        this._nodesToBeRendered.delete(node)
    }

    _renderNodes(timestamp) {
        for (let [node] of this._nodesToBeRendered) {
            node._render(timestamp)
        }
        this._nodesToBeRendered.clear()
    }
}

// export a singleton instance rather than the class directly.
export default new Motor