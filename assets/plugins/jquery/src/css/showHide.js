define([
    '../core',
    '../data/var/dataPriv',
    '../css/var/isHiddenWithinTree'
], function (jQuery, dataPriv, isHiddenWithinTree) {
    'use strict'

    const defaultDisplayMap = {}

    function getDefaultDisplay (elem) {
        let temp
        const doc = elem.ownerDocument
        const nodeName = elem.nodeName
        let display = defaultDisplayMap[ nodeName ]

        if (display) {
            return display
        }

        temp = doc.body.appendChild(doc.createElement(nodeName))
        display = jQuery.css(temp, 'display')

        temp.parentNode.removeChild(temp)

        if (display === 'none') {
            display = 'block'
        }
        defaultDisplayMap[ nodeName ] = display

        return display
    }

    function showHide (elements, show) {
        let display; let elem
        const values = []
        let index = 0
        const length = elements.length

        // Determine new display value for elements that need to change
        for (; index < length; index++) {
            elem = elements[ index ]
            if (!elem.style) {
                continue
            }

            display = elem.style.display
            if (show) {
                // Since we force visibility upon cascade-hidden elements, an immediate (and slow)
                // check is required in this first loop unless we have a nonempty display value (either
                // inline or about-to-be-restored)
                if (display === 'none') {
                    values[ index ] = dataPriv.get(elem, 'display') || null
                    if (!values[ index ]) {
                        elem.style.display = ''
                    }
                }
                if (elem.style.display === '' && isHiddenWithinTree(elem)) {
                    values[ index ] = getDefaultDisplay(elem)
                }
            } else if (display !== 'none') {
                values[ index ] = 'none'

                // Remember what we're overwriting
                dataPriv.set(elem, 'display', display)
            }
        }

        // Set the display of the elements in a second loop to avoid constant reflow
        for (index = 0; index < length; index++) {
            if (values[ index ] != null) {
                elements[ index ].style.display = values[ index ]
            }
        }

        return elements
    }

    jQuery.fn.extend({
        show () {
            return showHide(this, true)
        },
        hide () {
            return showHide(this)
        },
        toggle (state) {
            if (typeof state === 'boolean') {
                return state ? this.show() : this.hide()
            }

            return this.each(function () {
                if (isHiddenWithinTree(this)) {
                    jQuery(this).show()
                } else {
                    jQuery(this).hide()
                }
            })
        }
    })

    return showHide
})
