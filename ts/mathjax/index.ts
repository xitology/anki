// Copyright: Ankitects Pty Ltd and contributors
// License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html

/// <reference types="./mathjax-types" />

window.MathJax = {
    tex: {
        displayMath: [["\\[", "\\]"]],
        processEscapes: false,
        processEnvironments: false,
        processRefs: false,
        packages: {
            "[+]": ["noerrors", "mathtools", "mhchem", "xypic"],
        },
    },
    loader: {
        load: ["[tex]/noerrors", "[tex]/mathtools", "[tex]/mhchem", "../xypic"],
        paths: {
            mathjax: "/_anki/js/vendor/mathjax",
        },
    },
    startup: {
        typeset: false,
    },
};
