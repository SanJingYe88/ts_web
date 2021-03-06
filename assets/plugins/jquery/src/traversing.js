define([
    './core',
    './var/indexOf',
    './traversing/var/dir',
    './traversing/var/siblings',
    './traversing/var/rneedsContext',
    './core/nodeName',

    './core/init',
    './traversing/findFilter',
    './selector'
], function (jQuery, indexOf, dir, siblings, rneedsContext, nodeName) {
    'use strict'

    const rparentsprev = /^(?:parents|prev(?:Until|All))/

    // Methods guaranteed to produce a unique set when starting from a unique set
    const guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
    }

    jQuery.fn.extend({
        has (target) {
            const targets = jQuery(target, this)
            const l = targets.length

            return this.filter(function () {
                let i = 0
                for (; i < l; i++) {
                    if (jQuery.contains(this, targets[ i ])) {
                        return true
                    }
                }
            })
        },

        closest (selectors, context) {
            let cur
            let i = 0
            const l = this.length
            const matched = []
            const targets = typeof selectors !== 'string' && jQuery(selectors)

            // Positional selectors never match, since there's no _selection_ context
            if (!rneedsContext.test(selectors)) {
                for (; i < l; i++) {
                    for (cur = this[ i ]; cur && cur !== context; cur = cur.parentNode) {
                        // Always skip document fragments
                        if (cur.nodeType < 11 && (targets
                            ? targets.index(cur) > -1

                        // Don't pass non-elements to Sizzle
                            : cur.nodeType === 1 &&
							jQuery.find.matchesSelector(cur, selectors))) {
                            matched.push(cur)
                            break
                        }
                    }
                }
            }

            return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched)
        },

        // Determine the position of an element within the set
        index (elem) {
            // No argument, return index in parent
            if (!elem) {
                return (this[ 0 ] && this[ 0 ].parentNode) ? this.first().prevAll().length : -1
            }

            // Index in selector
            if (typeof elem === 'string') {
                return indexOf.call(jQuery(elem), this[ 0 ])
            }

            // Locate the position of the desired element
            return indexOf.call(this,

                // If it receives a jQuery object, the first element is used
                elem.jquery ? elem[ 0 ] : elem
            )
        },

        add (selector, context) {
            return this.pushStack(
                jQuery.uniqueSort(
                    jQuery.merge(this.get(), jQuery(selector, context))
                )
            )
        },

        addBack (selector) {
            return this.add(selector == null
                ? this.prevObject : this.prevObject.filter(selector)
            )
        }
    })

    function sibling (cur, dir) {
        while ((cur = cur[ dir ]) && cur.nodeType !== 1) {}
        return cur
    }

    jQuery.each({
        parent (elem) {
            const parent = elem.parentNode
            return parent && parent.nodeType !== 11 ? parent : null
        },
        parents (elem) {
            return dir(elem, 'parentNode')
        },
        parentsUntil (elem, i, until) {
            return dir(elem, 'parentNode', until)
        },
        next (elem) {
            return sibling(elem, 'nextSibling')
        },
        prev (elem) {
            return sibling(elem, 'previousSibling')
        },
        nextAll (elem) {
            return dir(elem, 'nextSibling')
        },
        prevAll (elem) {
            return dir(elem, 'previousSibling')
        },
        nextUntil (elem, i, until) {
            return dir(elem, 'nextSibling', until)
        },
        prevUntil (elem, i, until) {
            return dir(elem, 'previousSibling', until)
        },
        siblings (elem) {
            return siblings((elem.parentNode || {}).firstChild, elem)
        },
        children (elem) {
            return siblings(elem.firstChild)
        },
        contents (elem) {
            if (nodeName(elem, 'iframe')) {
                return elem.contentDocument
            }

            // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
            // Treat the template element as a regular one in browsers that
            // don't support it.
            if (nodeName(elem, 'template')) {
                elem = elem.content || elem
            }

            return jQuery.merge([], elem.childNodes)
        }
    }, function (name, fn) {
        jQuery.fn[ name ] = function (until, selector) {
            let matched = jQuery.map(this, fn, until)

            if (name.slice(-5) !== 'Until') {
                selector = until
            }

            if (selector && typeof selector === 'string') {
                matched = jQuery.filter(selector, matched)
            }

            if (this.length > 1) {
                // Remove duplicates
                if (!guaranteedUnique[ name ]) {
                    jQuery.uniqueSort(matched)
                }

                // Reverse order for parents* and prev-derivatives
                if (rparentsprev.test(name)) {
                    matched.reverse()
                }
            }

            return this.pushStack(matched)
        }
    })

    return jQuery
})
