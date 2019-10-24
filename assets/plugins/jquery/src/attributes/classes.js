define([
    '../core',
    '../core/stripAndCollapse',
    '../var/rnothtmlwhite',
    '../data/var/dataPriv',
    '../core/init'
], function (jQuery, stripAndCollapse, rnothtmlwhite, dataPriv) {
    'use strict'

    function getClass (elem) {
        return elem.getAttribute && elem.getAttribute('class') || ''
    }

    jQuery.fn.extend({
        addClass (value) {
            let classes; let elem; let cur; let curValue; let clazz; let j; let finalValue
            let i = 0

            if (jQuery.isFunction(value)) {
                return this.each(function (j) {
                    jQuery(this).addClass(value.call(this, j, getClass(this)))
                })
            }

            if (typeof value === 'string' && value) {
                classes = value.match(rnothtmlwhite) || []

                while ((elem = this[ i++ ])) {
                    curValue = getClass(elem)
                    cur = elem.nodeType === 1 && (' ' + stripAndCollapse(curValue) + ' ')

                    if (cur) {
                        j = 0
                        while ((clazz = classes[ j++ ])) {
                            if (!cur.includes(' ' + clazz + ' ')) {
                                cur += clazz + ' '
                            }
                        }

                        // Only assign if different to avoid unneeded rendering.
                        finalValue = stripAndCollapse(cur)
                        if (curValue !== finalValue) {
                            elem.setAttribute('class', finalValue)
                        }
                    }
                }
            }

            return this
        },

        removeClass (value) {
            let classes; let elem; let cur; let curValue; let clazz; let j; let finalValue
            let i = 0

            if (jQuery.isFunction(value)) {
                return this.each(function (j) {
                    jQuery(this).removeClass(value.call(this, j, getClass(this)))
                })
            }

            if (!arguments.length) {
                return this.attr('class', '')
            }

            if (typeof value === 'string' && value) {
                classes = value.match(rnothtmlwhite) || []

                while ((elem = this[ i++ ])) {
                    curValue = getClass(elem)

                    // This expression is here for better compressibility (see addClass)
                    cur = elem.nodeType === 1 && (' ' + stripAndCollapse(curValue) + ' ')

                    if (cur) {
                        j = 0
                        while ((clazz = classes[ j++ ])) {
                            // Remove *all* instances
                            while (cur.includes(' ' + clazz + ' ')) {
                                cur = cur.replace(' ' + clazz + ' ', ' ')
                            }
                        }

                        // Only assign if different to avoid unneeded rendering.
                        finalValue = stripAndCollapse(cur)
                        if (curValue !== finalValue) {
                            elem.setAttribute('class', finalValue)
                        }
                    }
                }
            }

            return this
        },

        toggleClass (value, stateVal) {
            const type = typeof value

            if (typeof stateVal === 'boolean' && type === 'string') {
                return stateVal ? this.addClass(value) : this.removeClass(value)
            }

            if (jQuery.isFunction(value)) {
                return this.each(function (i) {
                    jQuery(this).toggleClass(
                        value.call(this, i, getClass(this), stateVal),
                        stateVal
                    )
                })
            }

            return this.each(function () {
                let className, i, self, classNames

                if (type === 'string') {
                    // Toggle individual class names
                    i = 0
                    self = jQuery(this)
                    classNames = value.match(rnothtmlwhite) || []

                    while ((className = classNames[ i++ ])) {
                        // Check each className given, space separated list
                        if (self.hasClass(className)) {
                            self.removeClass(className)
                        } else {
                            self.addClass(className)
                        }
                    }

                    // Toggle whole class name
                } else if (value === undefined || type === 'boolean') {
                    className = getClass(this)
                    if (className) {
                        // Store className if set
                        dataPriv.set(this, '__className__', className)
                    }

                    // If the element has a class name or if we're passed `false`,
                    // then remove the whole classname (if there was one, the above saved it).
                    // Otherwise bring back whatever was previously saved (if anything),
                    // falling back to the empty string if nothing was stored.
                    if (this.setAttribute) {
                        this.setAttribute('class',
                            className || value === false
                                ? ''
                                : dataPriv.get(this, '__className__') || ''
                        )
                    }
                }
            })
        },

        hasClass (selector) {
            let className; let elem
            let i = 0

            className = ' ' + selector + ' '
            while ((elem = this[ i++ ])) {
                if (elem.nodeType === 1 &&
				(' ' + stripAndCollapse(getClass(elem)) + ' ').includes(className)) {
                    return true
                }
            }

            return false
        }
    })
})
