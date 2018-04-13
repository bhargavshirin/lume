import { Color } from 'three'
import Class from 'lowclass'
import { native } from 'lowclass/native'

const twoOrMoreSpaces = /\s\s+/g

export default
function ValueProcessor( Base ) {
    Base = Base ? native( Base ) : Class()

    return Class( 'ValueProcessor' ).extends( Base, {

        processColorValue( value, context, prop ) {
            context = context || this.threeObject3d
            prop = prop || 'color'
            context[ prop ] = new Color( value )
        },

        processNumberValue( prop, value, context ) {
            context = context || this.threeObject3d
            const number = parseFloat( value )

            if ( isNaN( number ) ) {

                console.warn( (
                    `The value for the "${ prop }" attribute should be a number. It
                    is passed to window.parseFloat. Your value ("${ value }")
                    cannot be parsed into a number (it becomes NaN).`
                ).replace( twoOrMoreSpaces, ' ' ) )

            }

            context[ prop ] = number
        },

    })

}
