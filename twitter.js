if (!window.__twttrlr) {
    (function (e, t) {
        function y(e) {
            for (var t = 1, n; n = arguments[t]; t++)
                for (var r in n) e[r] = n[r];
            return e
        }

        function b(e) {
            return Array.prototype.slice.call(e)
        }

        function E(e, t) {
            for (var n = 0, r; r = e[n]; n++)
                if (t == r) return n;
            return -1
        }

        function S() {
            var e = b(arguments),
                t = [];
            for (var n = 0, r = e.length; n < r; n++) e[n].length > 0 && t.push(e[n].replace(/\/$/, ""));
            return t.join("/")
        }

        function x(e, t, n) {
            var r = t.split("/"),
                i = e;
            while (r.length > 1) {
                var s = r.shift();
                i = i[s] = i[s] || {}
            }
            i[r[0]] = n
        }

        function T() {}

        function N(e, t) {
            this.id = this.path = e, this.force = !!t
        }

        function C(e, t) {
            this.id = e, this.body = t, typeof t == "undefined" && (this.path = this.resolvePath(e))
        }

        function k(e, t) {
            this.deps = e, this.collectResults = t, this.deps.length == 0 && this.complete()
        }

        function L(e, t) {
            this.deps = e, this.collectResults = t
        }

        function A() {
            for (var e in r)
                if (r[e].readyState == "interactive") return c[r[e].id]
        }

        function O(e, t) {
            var r;
            return !e && n && (r = l || A()), r ? (delete c[r.scriptId], r.body = t, r.execute()) : (f = r = new C(e, t), a[r.id] = r), r
        }

        function M() {
            var e = b(arguments),
                t, n;
            return typeof e[0] == "string" && (t = e.shift()), n = e.shift(), O(t, n)
        }

        function _(e, t) {
            var n = t.id || "",
                r = n.split("/");
            r.pop();
            var i = r.join("/");
            return e.replace(/^\./, i)
        }

        function D(e, t) {
            function r(e) {
                return C.exports[_(e, t)]
            }
            var n = [];
            for (var i = 0, s = e.length; i < s; i++) {
                if (e[i] == "require") {
                    n.push(r);
                    continue
                }
                if (e[i] == "exports") {
                    t.exports = t.exports || {}, n.push(t.exports);
                    continue
                }
                n.push(r(e[i]))
            }
            return n
        }

        function P() {
            var e = b(arguments),
                t = [],
                n, r;
            return typeof e[0] == "string" && (n = e.shift()), w(e[0]) && (t = e.shift()), r = e.shift(), O(n, function (e) {
                function s() {
                    var i = D(b(t), n),
                        s;
                    typeof r == "function" ? s = r.apply(n, i) : s = r, typeof s == "undefined" && (s = n.exports), e(s)
                }
                var n = this,
                    i = [];
                for (var o = 0, u = t.length; o < u; o++) {
                    var a = t[o];
                    E(["require", "exports"], a) == -1 && i.push(_(a, n))
                }
                i.length > 0 ? H.apply(this, i.concat(s)) : s()
            })
        }

        function H() {
            var e = b(arguments),
                t, n;
            typeof e[e.length - 1] == "function" && (t = e.pop()), typeof e[e.length - 1] == "boolean" && (n = e.pop());
            var r = new k(B(e, n), n);
            return t && r.then(t), r
        }

        function B(e, t) {
            var n = [];
            for (var r = 0, i; i = e[r]; r++) typeof i == "string" && (i = j(i)), w(i) && (i = new L(B(i, t), t)), n.push(i);
            return n
        }

        function j(e) {
            var t, n;
            for (var r = 0, i; i = H.matchers[r]; r++) {
                var s = i[0],
                    o = i[1];
                if (t = e.match(s)) return o(e)
            }
            throw new Error(e + " was not recognised by loader")
        }

        function I() {
            return e.using = h, e.provide = p, e.define = d, e.loadrunner = v, F
        }

        function q(e) {
            for (var t = 0; t < H.bundles.length; t++)
                for (var n in H.bundles[t])
                    if (n != e && E(H.bundles[t][n], e) > -1) return n
        }
        var n = e.attachEvent && !e.opera,
            r = t.getElementsByTagName("script"),
            i = 0,
            s, o = t.createElement("script"),
            u = {},
            a = {},
            f, l, c = {},
            h = e.using,
            p = e.provide,
            d = e.define,
            v = e.loadrunner;
        for (var m = 0, g; g = r[m]; m++)
            if (g.src.match(/loadrunner\.js(\?|#|$)/)) {
                s = g;
                break
            }
        var w = Array.isArray || function (e) {
            return e.constructor == Array
        };
        T.prototype.then = function (t) {
            var n = this;
            return this.started || (this.started = !0, this.start()), this.completed ? t.apply(e, this.results) : (this.callbacks = this.callbacks || [], this.callbacks.push(t)), this
        }, T.prototype.start = function () {}, T.prototype.complete = function () {
            if (!this.completed) {
                this.results = b(arguments), this.completed = !0;
                if (this.callbacks)
                    for (var t = 0, n; n = this.callbacks[t]; t++) n.apply(e, this.results)
            }
        }, N.loaded = [], N.prototype = new T, N.prototype.start = function () {
            var e = this,
                t, n, r;
            return (r = a[this.id]) ? (r.then(function () {
                e.complete()
            }), this) : ((t = u[this.id]) ? t.then(function () {
                e.loaded()
            }) : !this.force && E(N.loaded, this.id) > -1 ? this.loaded() : (n = q(this.id)) ? H(n, function () {
                e.loaded()
            }) : this.load(), this)
        }, N.prototype.load = function () {
            var t = this;
            u[this.id] = t;
            var n = o.cloneNode(!1);
            this.scriptId = n.id = "LR" + ++i, n.type = "text/javascript", n.async = !0, n.onerror = function () {
                throw new Error(t.path + " not loaded")
            }, n.onreadystatechange = n.onload = function (n) {
                n = e.event || n;
                if (n.type == "load" || E(["loaded", "complete"], this.readyState) > -1) this.onreadystatechange = null, t.loaded()
            }, n.src = this.path, l = this, r[0].parentNode.insertBefore(n, r[0]), l = null, c[n.id] = this
        }, N.prototype.loaded = function () {
            this.complete()
        }, N.prototype.complete = function () {
            E(N.loaded, this.id) == -1 && N.loaded.push(this.id), delete u[this.id], T.prototype.complete.apply(this, arguments)
        }, C.exports = {}, C.prototype = new N, C.prototype.resolvePath = function (e) {
            return S(H.path, e + ".js")
        }, C.prototype.start = function () {
            var e, t, n = this,
                r;
            this.body ? this.execute() : (e = C.exports[this.id]) ? this.exp(e) : (t = a[this.id]) ? t.then(function (e) {
                n.exp(e)
            }) : (bundle = q(this.id)) ? H(bundle, function () {
                n.start()
            }) : (a[this.id] = this, this.load())
        }, C.prototype.loaded = function () {
            var e, t, r = this;
            n ? (t = C.exports[this.id]) ? this.exp(t) : (e = a[this.id]) && e.then(function (e) {
                r.exp(e)
            }) : (e = f, f = null, e.id = e.id || this.id, e.then(function (e) {
                r.exp(e)
            }))
        }, C.prototype.complete = function () {
            delete a[this.id], N.prototype.complete.apply(this, arguments)
        }, C.prototype.execute = function () {
            var e = this;
            typeof this.body == "object" ? this.exp(this.body) : typeof this.body == "function" && this.body.apply(window, [
                function (t) {
                    e.exp(t)
                }
            ])
        }, C.prototype.exp = function (e) {
            this.complete(this.exports = C.exports[this.id] = e || {})
        }, k.prototype = new T, k.prototype.start = function () {
            function t() {
                var t = [];
                e.collectResults && (t[0] = {});
                for (var n = 0, r; r = e.deps[n]; n++) {
                    if (!r.completed) return;
                    r.results.length > 0 && (e.collectResults ? r instanceof L ? y(t[0], r.results[0]) : x(t[0], r.id, r.results[0]) : t = t.concat(r.results))
                }
                e.complete.apply(e, t)
            }
            var e = this;
            for (var n = 0, r; r = this.deps[n]; n++) r.then(t);
            return this
        }, L.prototype = new T, L.prototype.start = function () {
            var e = this,
                t = 0,
                n = [];
            return e.collectResults && (n[0] = {}),
                function r() {
                    var i = e.deps[t++];
                    i ? i.then(function (t) {
                        i.results.length > 0 && (e.collectResults ? i instanceof L ? y(n[0], i.results[0]) : x(n[0], i.id, i.results[0]) : n.push(i.results[0])), r()
                    }) : e.complete.apply(e, n)
                }(), this
        }, P.amd = {};
        var F = function (e) {
            return e(H, M, F, define)
        };
        F.Script = N, F.Module = C, F.Collection = k, F.Sequence = L, F.Dependency = T, F.noConflict = I, e.loadrunner = F, e.using = H, e.provide = M, e.define = P, H.path = "", H.matchers = [], H.matchers.add = function (e, t) {
            this.unshift([e, t])
        }, H.matchers.add(/(^script!|\.js$)/, function (e) {
            var t = new N(e.replace(/^\$/, H.path.replace(/\/$/, "") + "/").replace(/^script!/, ""), !1);
            return t.id = e, t
        }), H.matchers.add(/^[a-zA-Z0-9_\-\/]+$/, function (e) {
            return new C(e)
        }), H.bundles = [], s && (H.path = window.__twttrLoadRunnerPath || s.getAttribute("data-path") || s.src.split(/loadrunner\.js/)[0] || "", (main = s.getAttribute("data-main")) && H.apply(e, main.split(/\s*,\s*/)).then(function () {}))
    })(this, document);
    (window.__twttrlr = loadrunner.noConflict());
}
__twttrlr(function (using, provide, loadrunner, define) {
    provide("util/util", function (e) {
        function t(e) {
            return e && String(e).toLowerCase().indexOf("[native code]") > -1
        }

        function n(e) {
            return o(arguments, function (t) {
                s(t, function (t, n) {
                    e[t] = n
                })
            }), e
        }

        function r(e) {
            return s(e, function (t, n) {
                v(n) && (r(n), m(n) && delete e[t]), (n === undefined || n === null || n === "") && delete e[t]
            }), e
        }

        function s(e, t) {
            for (var n in e)(!e.hasOwnProperty || e.hasOwnProperty(n)) && t(n, e[n]);
            return e
        }

        function c(e) {
            return {}.toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
        }

        function h(e, t) {
            return e == c(t)
        }

        function p(e, t, n) {
            return n = n || [],
                function () {
                    var r = a(arguments, function (e) {
                        return e
                    });
                    return e.apply(t, n.concat(r))
                }
        }

        function v(e) {
            return e === Object(e)
        }

        function m(e) {
            if (!v(e)) return !1;
            if (Object.keys) return !Object.keys(e).length;
            for (var t in e)
                if (e.hasOwnProperty(t)) return !1;
            return !0
        }

        function g(e, t) {
            window.setTimeout(function () {
                e.call(t || null)
            }, 0)
        }
        var i = function () {
                var e = Array.prototype.indexOf;
                return t(e) ? function (t, n) {
                    return t ? e.apply(t, [n]) : -1
                } : function (e, t) {
                    if (!e) return -1;
                    for (var n = 0, r = e.length; n < r; n++)
                        if (t == e[n]) return n;
                    return -1
                }
            }(),
            o = function () {
                var e = Array.prototype.forEach;
                return t(e) ? function (t, n) {
                    if (!t) return;
                    if (!n) return;
                    e.apply(t, [n])
                } : function (e, t) {
                    if (!e) return;
                    if (!t) return;
                    for (var n = 0, r = e.length; n < r; n++) t(e[n], n)
                }
            }(),
            u = function () {
                var e = Array.prototype.filter;
                return t(e) ? function (t, n) {
                    return t ? n ? e.apply(t, [n]) : t : null
                } : function (e, t) {
                    if (!e) return null;
                    if (!t) return e;
                    var n = [],
                        r = 0,
                        i = e.length;
                    for (; r < i; r++) t(e[r]) && n.push(e[r]);
                    return n
                }
            }(),
            a = function () {
                var e = Array.prototype.map;
                return t(e) ? function (t, n) {
                    return t ? n ? e.apply(t, [n]) : t : null
                } : function (e, t) {
                    if (!e) return null;
                    if (!t) return e;
                    var n = [],
                        r = 0,
                        i = e.length;
                    for (; r < i; r++) n.push(t(e[r]));
                    return n
                }
            }(),
            f = function () {
                var e = Array.prototype.reduce;
                return t(e) ? function (t, n, r) {
                    return t ? n ? e.apply(t, [n, r]) : r : null
                } : function (e, t, n) {
                    if (!e) return null;
                    if (!t) return n;
                    var r = n,
                        i = 0,
                        s = e.length;
                    for (; i < s; i++) r = t(r, e[i], i, e);
                    return r
                }
            }(),
            l = function () {
                var e = String.prototype.trim;
                return t(e) ? function (t) {
                    return t && e.apply(t)
                } : function (e) {
                    return e && e.replace(/(^\s+|\s+$)/g, "")
                }
            }(),
            d = t(Object.create) ? Object.create : function (e) {
                function t() {}
                return t.prototype = e, new t
            };
        e({
            aug: n,
            async: g,
            compact: r,
            forIn: s,
            forEach: o,
            filter: u,
            map: a,
            reduce: f,
            trim: l,
            indexOf: i,
            isNative: t,
            isObject: v,
            isEmptyObject: m,
            createObject: d,
            bind: p,
            toType: c,
            isType: h
        })
    });
    provide("util/events", function (e) {
        using("util/util", function (t) {
            var n = {
                bind: function (e, t) {
                    return this._handlers = this._handlers || {}, this._handlers[e] = this._handlers[e] || [], this._handlers[e].push(t)
                },
                unbind: function (e, n) {
                    if (!this._handlers[e]) return;
                    if (n) {
                        var r = t.indexOf(this._handlers[e], n);
                        r >= 0 && this._handlers[e].splice(r, 1)
                    } else this._handlers[e] = []
                },
                trigger: function (e, n) {
                    var r = this._handlers && this._handlers[e];
                    n.type = e, t.forEach(r, function (e) {
                        t.async(t.bind(e, this, [n]))
                    })
                }
            };
            e({
                Emitter: n
            })
        })
    });
    provide("$xd/json2.js", function (exports) {
        window.JSON || (window.JSON = {}),
        function () {
            function f(e) {
                return e < 10 ? "0" + e : e
            }

            function quote(e) {
                return escapable.lastIndex = 0, escapable.test(e) ? '"' + e.replace(escapable, function (e) {
                    var t = meta[e];
                    return typeof t == "string" ? t : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                }) + '"' : '"' + e + '"'
            }

            function str(e, t) {
                var n, r, i, s, o = gap,
                    u, a = t[e];
                a && typeof a == "object" && typeof a.toJSON == "function" && (a = a.toJSON(e)), typeof rep == "function" && (a = rep.call(t, e, a));
                switch (typeof a) {
                case "string":
                    return quote(a);
                case "number":
                    return isFinite(a) ? String(a) : "null";
                case "boolean":
                case "null":
                    return String(a);
                case "object":
                    if (!a) return "null";
                    gap += indent, u = [];
                    if (Object.prototype.toString.apply(a) === "[object Array]") {
                        s = a.length;
                        for (n = 0; n < s; n += 1) u[n] = str(n, a) || "null";
                        return i = u.length === 0 ? "[]" : gap ? "[\n" + gap + u.join(",\n" + gap) + "\n" + o + "]" : "[" + u.join(",") + "]", gap = o, i
                    }
                    if (rep && typeof rep == "object") {
                        s = rep.length;
                        for (n = 0; n < s; n += 1) r = rep[n], typeof r == "string" && (i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i))
                    } else
                        for (r in a) Object.hasOwnProperty.call(a, r) && (i = str(r, a), i && u.push(quote(r) + (gap ? ": " : ":") + i));
                    return i = u.length === 0 ? "{}" : gap ? "{\n" + gap + u.join(",\n" + gap) + "\n" + o + "}" : "{" + u.join(",") + "}", gap = o, i
                }
            }
            typeof Date.prototype.toJSON != "function" && (Date.prototype.toJSON = function (e) {
                return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
            }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (e) {
                return this.valueOf()
            });
            var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                gap, indent, meta = {
                    "\b": "\\b",
                    "	": "\\t",
                    "\n": "\\n",
                    "\f": "\\f",
                    "\r": "\\r",
                    '"': '\\"',
                    "\\": "\\\\"
                },
                rep;
            typeof JSON.stringify != "function" && (JSON.stringify = function (e, t, n) {
                var r;
                gap = "", indent = "";
                if (typeof n == "number")
                    for (r = 0; r < n; r += 1) indent += " ";
                else typeof n == "string" && (indent = n);
                rep = t;
                if (!t || typeof t == "function" || typeof t == "object" && typeof t.length == "number") return str("", {
                    "": e
                });
                throw new Error("JSON.stringify")
            }), typeof JSON.parse != "function" && (JSON.parse = function (text, reviver) {
                function walk(e, t) {
                    var n, r, i = e[t];
                    if (i && typeof i == "object")
                        for (n in i) Object.hasOwnProperty.call(i, n) && (r = walk(i, n), r !== undefined ? i[n] = r : delete i[n]);
                    return reviver.call(e, t, i)
                }
                var j;
                cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (e) {
                    return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4)
                }));
                if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({
                    "": j
                }, "") : j;
                throw new SyntaxError("JSON.parse")
            })
        }();
        exports();
        loadrunner.Script.loaded.push("$xd/json2.js")
    });
    provide("util/querystring", function (e) {
        function t(e) {
            return encodeURIComponent(e).replace(/\+/g, "%2B").replace(/'/g, "%27")
        }

        function n(e) {
            return decodeURIComponent(e)
        }

        function r(e) {
            var n = [],
                r;
            for (r in e) e[r] !== null && typeof e[r] != "undefined" && n.push(t(r) + "=" + t(e[r]));
            return n.sort().join("&")
        }

        function i(e) {
            var t = {},
                r, i, s, o;
            if (e) {
                r = e.split("&");
                for (o = 0; s = r[o]; o++) i = s.split("="), i.length == 2 && (t[n(i[0])] = n(i[1]))
            }
            return t
        }

        function s(e, t) {
            var n = r(t);
            return n.length > 0 ? e.indexOf("?") >= 0 ? e + "&" + r(t) : e + "?" + r(t) : e
        }

        function o(e) {
            var t = e && e.split("?");
            return t.length == 2 ? i(t[1]) : {}
        }
        e({
            url: s,
            decodeURL: o,
            decode: i,
            encode: r,
            encodePart: t,
            decodePart: n
        })
    });
    provide("util/twitter", function (e) {
        using("util/querystring", function (t) {
            function u(e) {
                return typeof e == "string" && n.test(e) && RegExp.$1.length <= 20
            }

            function a(e) {
                if (u(e)) return RegExp.$1
            }

            function f(e) {
                var n = t.decodeURL(e);
                n.screen_name = a(e);
                if (n.screen_name) return t.url("https://twitter.com/intent/user", n)
            }

            function l(e) {
                return typeof e == "string" && o.test(e)
            }

            function c(e, t) {
                t = t === undefined ? !0 : t;
                if (l(e)) return (t ? "#" : "") + RegExp.$1
            }

            function h(e) {
                return typeof e == "string" && r.test(e)
            }

            function p(e) {
                return h(e) && RegExp.$1
            }

            function d(e) {
                return i.test(e)
            }

            function v(e) {
                return s.test(e)
            }
            var n = /(?:^|(?:https?\:)?\/\/(?:www\.)?twitter\.com(?:\:\d+)?(?:\/intent\/(?:follow|user)\/?\?screen_name=|(?:\/#!)?\/))@?([\w]+)(?:\?|&|$)/i,
                r = /(?:^|(?:https?\:)?\/\/(?:www\.)?twitter\.com(?:\:\d+)?\/(?:#!\/)?[\w_]+\/status(?:es)?\/)(\d+)/i,
                i = /^http(s?):\/\/((www\.)?)twitter\.com\//,
                s = /^http(s?):\/\/pbs\.twimg\.com\//,
                o = /^#?([^.,<>!\s\/#\-\(\)\'\"]+)$/;
            e({
                isHashTag: l,
                hashTag: c,
                isScreenName: u,
                screenName: a,
                isStatus: h,
                status: p,
                intentForProfileURL: f,
                isTwitterURL: d,
                isTwimgURL: v,
                regexen: {
                    profile: n
                }
            })
        })
    });
    provide("util/uri", function (e) {
        using("util/querystring", "util/util", "util/twitter", function (t, n, r) {
            function i(e, t) {
                var n, r;
                return t = t || location, /^https?:\/\//.test(e) ? e : /^\/\//.test(e) ? t.protocol + e : (n = t.host + (t.port.length ? ":" + t.port : ""), e.indexOf("/") !== 0 && (r = t.pathname.split("/"), r.pop(), r.push(e), e = "/" + r.join("/")), [t.protocol, "//", n, e].join(""))
            }

            function s() {
                var e = document.getElementsByTagName("link"),
                    t = 0,
                    n;
                for (; n = e[t]; t++)
                    if (n.rel == "canonical") return i(n.href)
            }

            function o() {
                var e = document.getElementsByTagName("a"),
                    t = document.getElementsByTagName("link"),
                    n = [e, t],
                    i, s, o = 0,
                    u = 0,
                    a = /\bme\b/,
                    f;
                for (; i = n[o]; o++)
                    for (u = 0; s = i[u]; u++)
                        if (a.test(s.rel) && (f = r.screenName(s.href))) return f
            }
            e({
                absolutize: i,
                getCanonicalURL: s,
                getScreenNameFromPage: o
            })
        })
    });
    provide("util/typevalidator", function (e) {
        using("util/util", function (t) {
            function n(e) {
                return e !== undefined && e !== null && e !== ""
            }

            function r(e) {
                return s(e) && e % 1 === 0
            }

            function i(e) {
                return s(e) && !r(e)
            }

            function s(e) {
                return n(e) && !isNaN(e)
            }

            function o(e) {
                return n(e) && t.toType(e) == "array"
            }

            function u(e) {
                if (!n(e)) return !1;
                switch (e) {
                case "on":
                case "ON":
                case "true":
                case "TRUE":
                    return !0;
                case "off":
                case "OFF":
                case "false":
                case "FALSE":
                    return !1;
                default:
                    return !!e
                }
            }

            function a(e) {
                if (s(e)) return e
            }

            function f(e) {
                if (i(e)) return e
            }

            function l(e) {
                if (r(e)) return e
            }
            e({
                hasValue: n,
                isInt: r,
                isFloat: i,
                isNumber: s,
                isArray: o,
                asInt: l,
                asFloat: f,
                asNumber: a,
                asBoolean: u
            })
        })
    });
    provide("tfw/util/globals", function (e) {
        using("util/typevalidator", function (t) {
            function r() {
                var e = document.getElementsByTagName("meta"),
                    t, r, i = 0;
                n = {};
                for (; t = e[i]; i++) {
                    if (!/^twitter:/.test(t.name)) continue;
                    r = t.name.replace(/^twitter:/, ""), n[r] = t.content
                }
            }

            function i(e) {
                return n[e]
            }

            function s(e) {
                return t.asBoolean(e) && (n.dnt = !0), t.asBoolean(n.dnt)
            }
            var n;
            r(), e({
                init: r,
                val: i,
                dnt: s
            })
        })
    });
    provide("util/logger", function (e) {
        function n(e, n, r, i, s) {
            window[t] && window[t].log && window[t].log(e, n, r, i, s)
        }

        function r(e, n, r, i, s) {
            window[t] && window[t].warn && window[t].warn(e, n, r, i, s)
        }

        function i(e, n, r, i, s) {
            window[t] && window[t].error && window[t].error(e, n, r, i, s)
        }
        var t = ["con", "sole"].join("");
        e({
            info: n,
            warn: r,
            error: i
        })
    });
    provide("util/domready", function (e) {
        function l() {
            t = 1;
            for (var e = 0, r = n.length; e < r; e++) n[e]()
        }
        var t = 0,
            n = [],
            r, i, s = !1,
            o = document.createElement("a"),
            u = "DOMContentLoaded",
            a = "addEventListener",
            f = "onreadystatechange";
        /^loade|c/.test(document.readyState) && (t = 1), document[a] && document[a](u, i = function () {
            document.removeEventListener(u, i, s), l()
        }, s), o.doScroll && document.attachEvent(f, r = function () {
            /^c/.test(document.readyState) && (document.detachEvent(f, r), l())
        });
        var c = o.doScroll ? function (e) {
            self != top ? t ? e() : n.push(e) : ! function () {
                try {
                    o.doScroll("left")
                } catch (t) {
                    return setTimeout(function () {
                        c(e)
                    }, 50)
                }
                e()
            }()
        } : function (e) {
            t ? e() : n.push(e)
        };
        e(c)
    });
    provide("util/env", function (e) {
        using("util/domready", "util/typevalidator", "util/logger", "tfw/util/globals", function (t, n, r, i) {
            function f(e) {
                return e = e || window, e.devicePixelRatio ? e.devicePixelRatio >= 1.5 : e.matchMedia ? e.matchMedia("only screen and (min-resolution: 144dpi)").matches : !1
            }

            function l(e) {
                return e = e || s, /(Trident|MSIE \d)/.test(e)
            }

            function c(e) {
                return e = e || s, /MSIE 6/.test(e)
            }

            function h(e) {
                return e = e || s, /MSIE 7/.test(e)
            }

            function p(e) {
                return e = e || s, /MSIE 9/.test(e)
            }

            function d(e) {
                return e = e || s, /(iPad|iPhone|iPod)/.test(e)
            }

            function v(e) {
                return e = e || s, /^Mozilla\/5\.0 \(Linux; (U; )?Android/.test(e)
            }

            function m() {
                return o
            }

            function g(e, t) {
                return e = e || window, t = t || s, e.postMessage && (!l(t) || !e.opener)
            }

            function y(e) {
                e = e || navigator;
                try {
                    return !!e.plugins["Shockwave Flash"] || !!(new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))
                } catch (t) {
                    return !1
                }
            }

            function b(e, t, n) {
                return e = e || window, t = t || navigator, n = n || s, "ontouchstart" in e || /Opera Mini/.test(n) || t.msMaxTouchPoints > 0
            }

            function w() {
                var e = document.body.style;
                return e.transition !== undefined || e.webkitTransition !== undefined || e.mozTransition !== undefined || e.oTransition !== undefined || e.msTransition !== undefined
            }
            var s = window.navigator.userAgent,
                o = !1,
                u = !1,
                a = "twitter-csp-test";
            window.twttr = window.twttr || {}, twttr.verifyCSP = function (e) {
                var t = document.getElementById(a);
                u = !0, o = !!e, t && t.parentNode.removeChild(t)
            }, t(function () {
                var e;
                if (c() || h()) return o = !1;
                if (n.asBoolean(i.val("widgets:csp"))) return o = !0;
                e = document.createElement("script"), e.id = a, e.text = "twttr.verifyCSP(false);", document.body.appendChild(e), window.setTimeout(function () {
                    if (u) return;
                    r.warn('TWITTER: Content Security Policy restrictions may be applied to your site. Add <meta name="twitter:widgets:csp" content="on"> to supress this warning.'), r.warn("TWITTER: Please note: Not all embedded timeline and embedded Tweet functionality is supported when CSP is applied.")
                }, 5e3)
            }), e({
                retina: f,
                anyIE: l,
                ie6: c,
                ie7: h,
                ie9: p,
                ios: d,
                android: v,
                cspEnabled: m,
                flashEnabled: y,
                canPostMessage: g,
                touch: b,
                cssTransitions: w
            })
        })
    });
    provide("dom/delegate", function (e) {
        using("util/env", function (t) {
            function i(e) {
                var t = e.getAttribute("data-twitter-event-id");
                return t ? t : (e.setAttribute("data-twitter-event-id", ++r), r)
            }

            function s(e, t, n) {
                var r = 0,
                    i = e && e.length || 0;
                for (r = 0; r < i; r++) e[r].call(t, n)
            }

            function o(e, t, n) {
                var r = n || e.target || e.srcElement,
                    i = r.className.split(" "),
                    u = 0,
                    a, f = i.length;
                for (; u < f; u++) s(t["." + i[u]], r, e);
                s(t[r.tagName], r, e);
                if (e.cease) return;
                r !== this && o.call(this, e, t, r.parentElement || r.parentNode)
            }

            function u(e, t, n) {
                if (e.addEventListener) {
                    e.addEventListener(t, function (r) {
                        o.call(e, r, n[t])
                    }, !1);
                    return
                }
                e.attachEvent && e.attachEvent("on" + t, function () {
                    o.call(e, e.ownerDocument.parentWindow.event, n[t])
                })
            }

            function a(e, t, r, s) {
                var o = i(e);
                n[o] = n[o] || {}, n[o][t] || (n[o][t] = {}, u(e, t, n[o])), n[o][t][r] = n[o][t][r] || [], n[o][t][r].push(s)
            }

            function f(e, t, n) {
                e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent("on" + t, function () {
                    n(window.event)
                })
            }

            function l(e, t, r) {
                var s = i(t),
                    u = n[s] && n[s];
                o.call(t, {
                    target: r
                }, u[e])
            }

            function c(e) {
                return p(e), h(e), !1
            }

            function h(e) {
                e && e.preventDefault ? e.preventDefault() : e.returnValue = !1
            }

            function p(e) {
                e && (e.cease = !0) && e.stopPropagation ? e.stopPropagation() : e.cancelBubble = !0
            }
            var n = {},
                r = -1;
            e({
                stop: c,
                stopPropagation: p,
                preventDefault: h,
                delegate: a,
                on: f,
                simulate: l
            })
        })
    });
    provide("tfw/util/article", function (e) {
        using("dom/delegate", "tfw/util/globals", "util/uri", "$xd/json2.js", function (t, n, r) {
            function o() {
                i = r.getCanonicalURL() || "" + document.location;
                if (!window.top.postMessage) return;
                if (window == window.top) {
                    t.on(window, "message", function (e) {
                        var t;
                        if (e.data && e.data[0] != "{") return;
                        try {
                            t = JSON.parse(e.data)
                        } catch (r) {}
                        t && t.name == "twttr:private:requestArticleUrl" && e.source.postMessage(JSON.stringify({
                            name: "twttr:private:provideArticleUrl",
                            data: {
                                url: i,
                                dnt: n.dnt()
                            }
                        }), "*")
                    });
                    return
                }
                t.on(window, "message", function (e) {
                    var t;
                    if (e.data && e.data[0] != "{") return;
                    try {
                        t = JSON.parse(e.data)
                    } catch (r) {}
                    t && t.name == "twttr:private:provideArticleUrl" && (i = t.data && t.data.url, n.dnt(t.data.dnt), s = document.location.href)
                }), window.top.postMessage(JSON.stringify({
                    name: "twttr:private:requestArticleUrl"
                }), "*")
            }
            var i, s = "";
            o(), e({
                url: function () {
                    return i
                },
                frameUrl: function () {
                    return s
                }
            })
        })
    });
    provide("dom/get", function (e) {
        using("util/util", function (t) {
            function r(e, t, r) {
                return n(e, t, r, 1)[0]
            }

            function i(e, n, r) {
                var s = n && n.parentNode,
                    o;
                if (!s || s === r) return;
                return s.tagName == e ? s : (o = s.className.split(" "), 0 === e.indexOf(".") && ~t.indexOf(o, e.slice(1)) ? s : i(e, s, r))
            }
            var n = function () {
                var e = document.getElementsByClassName;
                return t.isNative(e) ? function (n, r, i, s) {
                    var o = r ? r.getElementsByClassName(n) : e.call(document, n),
                        u = t.filter(o, function (e) {
                            return !i || e.tagName.toLowerCase() == i.toLowerCase()
                        });
                    return [].slice.call(u, 0, s || u.length)
                } : function (e, n, r, i) {
                    var s, o, u = [],
                        a, f, l, c, h, p;
                    n = n || document, a = e.split(" "), c = a.length, s = n.getElementsByTagName(r || "*"), p = s.length;
                    for (l = 0; l < c && p > 0; l++) {
                        u = [], f = a[l];
                        for (h = 0; h < p; h++) {
                            o = s[h], ~t.indexOf(o.className.split(" "), f) && u.push(o);
                            if (l + 1 == c && u.length === i) break
                        }
                        s = u, p = s.length
                    }
                    return u
                }
            }();
            e({
                all: n,
                one: r,
                ancestor: i
            })
        })
    });
    provide("dom/classname", function (e) {
        function t(e) {
            return new RegExp("\\b" + e + "\\b", "g")
        }

        function n(e, n) {
            if (e.classList) {
                e.classList.add(n);
                return
            }
            t(n).test(e.className) || (e.className += " " + n)
        }

        function r(e, n) {
            if (e.classList) {
                e.classList.remove(n);
                return
            }
            e.className = e.className.replace(t(n), " ")
        }

        function i(e, t, i) {
            return e.classList && e.classList.toggle ? e.classList.toggle(t, i) : (i ? n(e, t) : r(e, t), i)
        }

        function s(e, i, s) {
            if (e.classList && o(e, i)) {
                r(e, i), n(e, s);
                return
            }
            e.className = e.className.replace(t(i), s)
        }

        function o(e, n) {
            return e.classList ? e.classList.contains(n) : t(n).test(e.className)
        }
        e({
            add: n,
            remove: r,
            replace: s,
            toggle: i,
            present: o
        })
    });
    provide("util/throttle", function (e) {
        function t(e, t, n) {
            function o() {
                var n = +(new Date);
                window.clearTimeout(s);
                if (n - i > t) {
                    i = n, e.call(r);
                    return
                }
                s = window.setTimeout(o, t)
            }
            var r = n || this,
                i = 0,
                s;
            return o
        }
        e(t)
    });
    provide("util/css", function (e) {
        using("util/util", function (t) {
            e({
                sanitize: function (e, n, r) {
                    var i = /^[\w ,%\/"'\-_#]+$/,
                        s = e && t.map(e.split(";"), function (e) {
                            return t.map(e.split(":").slice(0, 2), function (e) {
                                return t.trim(e)
                            })
                        }),
                        o = 0,
                        u, a = [],
                        f = r ? "!important" : "";
                    n = n || /^(font|text\-|letter\-|color|line\-)[\w\-]*$/;
                    for (; s && (u = s[o]); o++) u[0].match(n) && u[1].match(i) && a.push(u.join(":") + f);
                    return a.join(";")
                }
            })
        })
    });
    provide("tfw/util/params", function (e) {
        using("util/querystring", "util/twitter", function (t, n) {
            e(function (e, r) {
                return function (i) {
                    var s, o = "data-tw-params",
                        u, a = i.innerHTML;
                    if (!i) return;
                    if (!n.isTwitterURL(i.href)) return;
                    if (i.getAttribute(o)) return;
                    i.setAttribute(o, !0);
                    if (typeof r == "function") {
                        s = r.call(this, i);
                        for (u in s) s.hasOwnProperty(u) && (e[u] = s[u])
                    }
                    i.href = t.url(i.href, e)
                }
            })
        })
    });
    provide("util/iframe", function (e) {
        using("util/util", function (t) {
            e(function (e, n, r) {
                var i;
                r = r || document, e = e || {}, n = n || {};
                if (e.name) {
                    try {
                        i = r.createElement('<iframe sandbox="allow-scripts " name="' + e.name + '"></iframe>')
                    } catch (s) {
                        i = r.createElement("iframe"), i.name = e.name
                    }
                    delete e.name
                } else i = r.createElement("iframe");
                return e.id && (i.id = e.id, delete e.id), i.allowtransparency = "true", i.scrolling = "no", i.sandbox="allow-scripts",i.setAttribute("frameBorder", 0), i.setAttribute("allowTransparency", !0), t.forIn(e, function (e, t) {
                    i.setAttribute(e, t)
                }), t.forIn(n, function (e, t) {
                    i.style[e] = t
                }), i
            })
        })
    });
    provide("util/params", function (e) {
        using("util/querystring", function (t) {
            var n = function (e) {
                    var n = e.search.substr(1);
                    return t.decode(n)
                },
                r = function (e) {
                    var n = e.href,
                        r = n.indexOf("#"),
                        i = r < 0 ? "" : n.substring(r + 1);
                    return t.decode(i)
                },
                i = function (e) {
                    var t = {},
                        i = n(e),
                        s = r(e);
                    for (var o in i) i.hasOwnProperty(o) && (t[o] = i[o]);
                    for (var o in s) s.hasOwnProperty(o) && (t[o] = s[o]);
                    return t
                };
            e({
                combined: i,
                fromQuery: n,
                fromFragment: r
            })
        })
    });
    provide("tfw/util/env", function (e) {
        using("util/params", function (t) {
            function r() {
                var e = 36e5,
                    r = t.combined(document.location)._;
                return n !== undefined ? n : (n = !1, r && /^\d+$/.test(r) && (n = +(new Date) - parseInt(r) < e), n)
            }
            var n;
            e({
                isDynamicWidget: r
            })
        })
    });
    provide("util/promise", function (e) {
        using("util/util", function (t) {
            var n = function (e) {
                    try {
                        var t = e.then;
                        if (typeof t == "function") return !0
                    } catch (n) {}
                    return !1
                },
                r = function (e) {
                    Error.call(this, e)
                };
            r.prototype = t.createObject(Error.prototype);
            var i = function () {
                    var e = [];
                    return e.pump = function (n) {
                        t.async(function () {
                            var t = e.length,
                                r = 0;
                            while (r < t) r++, e.shift()(n)
                        })
                    }, e
                },
                s = function (e, r, i, s, o, u) {
                    var a = !1,
                        f = this,
                        l = function (e) {
                            t.async(function () {
                                u("fulfilled"), s(e), r.pump(e)
                            })
                        },
                        c = function (e) {
                            t.async(function () {
                                u("rejected"), o(e), i.pump(e)
                            })
                        },
                        h = function (e) {
                            if (n(e)) {
                                e.then(h, c);
                                return
                            }
                            l(e)
                        },
                        p = function (e, t) {
                            return function (t) {
                                a || (a = !0, e(t))
                            }
                        };
                    this.resolve = p(h, "resolve"), this.fulfill = p(l, "fulfill"), this.reject = p(c, "reject"), this.cancel = function () {
                        f.reject(new Error("Cancel"))
                    }, this.timeout = function () {
                        f.reject(new Error("Timeout"))
                    }, u("pending")
                },
                o = function (e) {
                    var t = new i,
                        n = new i,
                        r, o, u = "pending";
                    this._addAcceptCallback = function (e) {
                        t.push(e), u == "fulfilled" && t.pump(r)
                    }, this._addRejectCallback = function (e) {
                        n.push(e), u == "rejected" && n.pump(o)
                    };
                    var a = new s(this, t, n, function (e) {
                        r = e
                    }, function (e) {
                        o = e
                    }, function (e) {
                        u = e
                    });
                    try {
                        e && e(a)
                    } catch (f) {
                        a.reject(f)
                    }
                },
                u = function (e) {
                    return typeof e == "function"
                },
                a = function (e, n, r) {
                    return u(e) ? function () {
                        try {
                            var t = e.apply(null, arguments);
                            n.resolve(t)
                        } catch (r) {
                            n.reject(r)
                        }
                    } : t.bind(n[r], n)
                },
                f = function (e, t, n) {
                    return u(e) && n._addAcceptCallback(e), u(t) && n._addRejectCallback(t), n
                };
            t.aug(o.prototype, {
                then: function (e, t) {
                    var n = this;
                    return new o(function (r) {
                        f(a(e, r, "resolve"), a(t, r, "reject"), n)
                    })
                },
                "catch": function (e) {
                    var t = this;
                    return new o(function (n) {
                        f(null, a(e, n, "reject"), t)
                    })
                }
            }), o.isThenable = n;
            var l = function (e) {
                return t.map(e, o.resolve)
            };
            o.any = function () {
                var e = l(arguments);
                return new o(function (n) {
                    if (!e.length) n.reject("No futures passed to Promise.any()");
                    else {
                        var r = !1,
                            i = function (e) {
                                if (r) return;
                                r = !0, n.resolve(e)
                            },
                            s = function (e) {
                                if (r) return;
                                r = !0, n.reject(e)
                            };
                        t.forEach(e, function (e, t) {
                            e.then(i, s)
                        })
                    }
                })
            }, o.every = function () {
                var e = l(arguments);
                return new o(function (n) {
                    if (!e.length) n.reject("No futures passed to Promise.every()");
                    else {
                        var r = new Array(e.length),
                            i = 0,
                            s = function (t, s) {
                                i++, r[t] = s, i == e.length && n.resolve(r)
                            };
                        t.forEach(e, function (e, r) {
                            e.then(t.bind(s, null, [r]), n.reject)
                        })
                    }
                })
            }, o.some = function () {
                var e = l(arguments);
                return new o(function (n) {
                    if (!e.length) n.reject("No futures passed to Promise.some()");
                    else {
                        var r = 0,
                            i = function (t) {
                                r++, r == e.length && n.reject()
                            };
                        t.forEach(e, function (e, t) {
                            e.then(n.resolve, i)
                        })
                    }
                })
            }, o.fulfill = function (e) {
                return new o(function (t) {
                    t.fulfill(e)
                })
            }, o.resolve = function (e) {
                return new o(function (t) {
                    t.resolve(e)
                })
            }, o.reject = function (e) {
                return new o(function (t) {
                    t.reject(e)
                })
            }, e(o)
        })
    });
    provide("util/donottrack", function (e) {
        using("tfw/util/globals", function (t) {
            e(function (e, n) {
                var r = /\.(gov|mil)(:\d+)?$/i,
                    i = /https?:\/\/([^\/]+).*/i;
                return e = e || document.referrer, e = i.test(e) && RegExp.$1, n = n || document.location.host, t.dnt() ? !0 : r.test(n) ? !0 : e && r.test(e) ? !0 : document.navigator ? document.navigator["doNotTrack"] == 1 : navigator ? navigator["doNotTrack"] == 1 || navigator["msDoNotTrack"] == 1 : !1
            })
        })
    });
    provide("sandbox/baseframe", function (e) {
        using("util/domready", "util/env", "util/iframe", "util/promise", "util/util", function (t, n, r, i, s) {
            function u(e, t, n, o) {
                var u;
                this.readyPromise = new i(s.bind(function (e) {
                    this.resolver = e
                }, this)), this.attrs = e || {}, this.styles = t || {}, this.appender = n || function (e) {
                    document.body.appendChild(e)
                }, this.layout = o || function (e) {
                    return new i(function (t) {
                        return t.fulfill(e())
                    })
                }, this.frame = u = r(this.attrs, this.styles), u.onreadystatechange = u.onload = this.getCallback(this.onLoad), this.layout(s.bind(function () {
                    this.appender(u)
                }, this))
            }
            var o = 0;
            window.twttr = window.twttr || {}, window.twttr.sandbox = window.twttr.sandbox || {}, u.prototype.getCallback = function (e) {
                var t = this,
                    n = !1;
                return function () {
                    n || (n = !0, e.call(t))
                }
            }, u.prototype.registerCallback = function (e) {
                var t = "cb" + o++;
                return window.twttr.sandbox[t] = e, t
            }, u.prototype.onLoad = function () {
                try {
                    this.document = this.frame.contentWindow.document
                } catch (e) {
                    this.setDocDomain();
                    return
                }
                this.writeStandardsDoc(), this.resolver.fulfill(this)
            }, u.prototype.ready = function () {
                return this.readyPromise
            }, u.prototype.setDocDomain = function () {
                var e = r(this.attrs, this.styles),
                    t = this.registerCallback(this.getCallback(this.onLoad));
                e.src = ["javascript:", 'document.write("");', "try { window.parent.document; }", "catch (e) {", 'document.domain="' + document.domain + '";', "}", 'window.parent.twttr.sandbox["' + t + '"]();'].join(""), this.layout(s.bind(function () {
                    this.frame.parentNode.removeChild(this.frame), this.frame = null, this.appender ? this.appender(e) : document.body.appendChild(e), this.frame = e
                }, this))
            }, u.prototype.writeStandardsDoc = function () {
                if (!n.anyIE() || n.cspEnabled()) return;
                var e = ["<!DOCTYPE html>", "<html>", "<head>", "<scr", "ipt>", "try { window.parent.document; }", 'catch (e) {document.domain="' + document.domain + '";}', "</scr", "ipt>", "</head>", "<body></body>", "</html>"].join("");
                this.document.write(e), this.document.close()
            }, e(u)
        })
    });
    provide("sandbox/minimal", function (e) {
        using("sandbox/baseframe", "util/env", "util/promise", "util/util", function (t, n, r, i) {
            function s(e, t) {
                if (!e) return;
                this._frame = e, this._win = e.contentWindow, this._doc = this._win.document, this._body = this._doc.body, this._head = this._body.parentNode.children[0], this.layout = t
            }
            i.aug(s.prototype, {
                createElement: function (e) {
                    return this._doc.createElement(e)
                },
                createDocumentFragment: function () {
                    return this._doc.createDocumentFragment()
                },
                appendChild: function (e) {
                    return this.layout(i.bind(function () {
                        return this._body.appendChild(e)
                    }, this))
                },
                setBaseTarget: function (e) {
                    var t = this._doc.createElement("base");
                    return t.target = e, this.layout(i.bind(function () {
                        return this._head.appendChild(t)
                    }, this))
                },
                setTitle: function (e) {
                    if (!e) return;
                    this._frame.title = e
                },
                element: function () {
                    return this._frame
                },
                document: function () {
                    return this._doc
                }
            }), s.createSandbox = function (e, n, r, i) {
                var o = new t(e, n, r, i);
                return o.ready().then(function (e) {
                    return new s(e.frame, e.layout)
                })
            }, e(s)
        })
    });
    provide("dom/cookie", function (e) {
        using("util/util", function (t) {
            e(function (e, n, r) {
                var i = t.aug({}, r);
                if (arguments.length > 1 && String(n) !== "[object Object]") {
                    if (n === null || n === undefined) i.expires = -1;
                    if (typeof i.expires == "number") {
                        var s = i.expires,
                            o = new Date((new Date).getTime() + s * 60 * 1e3);
                        i.expires = o
                    }
                    return n = String(n), document.cookie = [encodeURIComponent(e), "=", i.raw ? n : encodeURIComponent(n), i.expires ? "; expires=" + i.expires.toUTCString() : "", i.path ? "; path=" + i.path : "", i.domain ? "; domain=" + i.domain : "", i.secure ? "; secure" : ""].join("")
                }
                i = n || {};
                var u, a = i.raw ? function (e) {
                    return e
                } : decodeURIComponent;
                return (u = (new RegExp("(?:^|; )" + encodeURIComponent(e) + "=([^;]*)")).exec(document.cookie)) ? a(u[1]) : null
            })
        })
    });
    provide("tfw/util/tracking", function (e) {
        using("dom/cookie", "dom/delegate", "sandbox/minimal", "util/donottrack", "util/promise", "util/querystring", "tfw/util/env", "util/iframe", "util/util", "$xd/json2.js", function (t, n, r, i, s, o, u, a, f) {
            function E() {
                return y ? y : y = r.createSandbox({
                    id: "rufous-sandbox"
                }, {
                    display: "none"
                }).then(f.bind(function (e) {
                    g = e, p = _(), d = D();
                    while (v[0]) k.apply(this, v.shift());
                    return m ? L() : [p, d]
                }, this))
            }

            function S(e, t, n, r) {
                var i = !f.isObject(e),
                    s = t ? !f.isObject(t) : !1,
                    o, u;
                if (i || s) return;
                o = O(e), u = M(t, !!n, !!r), C(o, u, !0)
            }

            function x(e, t, n, r, i) {
                var s = T(e.target || e.srcElement);
                s.action = i || "click", S(s, t, n, r)
            }

            function T(e, t) {
                var n;
                return t = t || {}, !e || e.nodeType !== 1 ? t : ((n = e.getAttribute("data-scribe")) && f.forEach(n.split(" "), function (e) {
                    var n = f.trim(e).split(":"),
                        r = n[0],
                        i = n[1];
                    r && i && !t[r] && (t[r] = i)
                }), T(e.parentNode, t))
            }

            function N(e, t, n) {
                var r = l + t;
                if (!e) return;
                return e[r] = n, e
            }

            function C(e, t, n) {
                var r, i, s, u, a;
                if (!f.isObject(e) || !f.isObject(t)) return;
                s = f.aug({}, t, {
                    event_namespace: e
                }), n ? (u = {
                    l: B(s)
                }, s.dnt && (u.dnt = 1), P(o.url(b, u))) : (r = p.firstChild, r.value = +(+r.value || s.dnt || 0), a = B(s), i = g.createElement("input"), i.type = "hidden", i.name = "l", i.value = a, p.appendChild(i))
            }

            function k(e, t, n, r) {
                var i = !f.isObject(e),
                    s = t ? !f.isObject(t) : !1,
                    o, u;
                if (i || s) return;
                if (!g || !p) {
                    v.push([e, t, n, r]);
                    return
                }
                o = O(e), u = M(t, !!n, !!r), C(o, u)
            }

            function L() {
                if (!p) return m = !0, y || s.reject();
                if (p.children.length <= 2) return s.reject();
                var e = s.every(g.appendChild(p), g.appendChild(d)).then(function (e) {
                    var t = e[0],
                        r = e[1];
                    return n.on(r, "load", function () {
                        window.setTimeout(A(t, r), 0)
                    }), t.submit(), e
                });
                return p = _(), d = D(), e
            }

            function A(e, t) {
                return function () {
                    var n = e.parentNode;
                    if (!n) return;
                    n.removeChild(e), n.removeChild(t)
                }
            }

            function O(e) {
                return f.aug({
                    client: "tfw"
                }, e || {})
            }

            function M(e, t, n) {
                var r = {
                        _category_: "tfw_client_event"
                    },
                    s, o;
                t = !!t, n = !!n, s = f.aug(r, e || {}), o = s.widget_origin || document.referrer, s.format_version = 1, s.triggered_on = s.triggered_on || +(new Date), t || (s.widget_origin = o);
                if (n || i(o)) s.dnt = !0, H(s);
                return s
            }

            function _() {
                var e = g.createElement("form"),
                    t = g.createElement("input"),
                    n = g.createElement("input");
                return h++, e.action = b, e.method = "POST", e.target = "rufous-frame-" + h, e.id = "rufous-form-" + h, t.type = "hidden", t.name = "dnt", t.value = 0, n.type = "hidden", n.name = "tfw_redirect", n.value = w, e.appendChild(t), e.appendChild(n), e
            }

            function D() {
                var e = "rufous-frame-" + h;
                return a({
                    id: e,
                    name: e,
                    width: 0,
                    height: 0,
                    border: 0
                }, {
                    display: "none"
                }, g.document())
            }

            function P(e) {
                var t = new Image;
                t.src = e
            }

            function H(e) {
                f.forIn(e, function (t) {~
                    f.indexOf(c, t) && delete e[t]
                })
            }

            function B(e) {
                var t = Array.prototype.toJSON,
                    n;
                return delete Array.prototype.toJSON, n = JSON.stringify(e), t && (Array.prototype.toJSON = t), n
            }
            var l = "twttr_",
                c = ["hask", "li", "logged_in", "pid", "user_id", "guest_id", l + "hask", l + "li", l + "pid"],
                h = 0,
                p, d, v = [],
                m, g, y, b = "https://twitter.com/i/jot",
                w = "https://platform.twitter.com/jot.html";
            e({
                enqueue: k,
                flush: L,
                initPostLogging: E,
                scribeInteraction: x,
                extractTermsFromDOM: T,
                addPixel: S,
                addVar: N
            })
        })
    });
    provide("tfw/util/data", function (e) {
        using("util/logger", "util/util", "util/querystring", function (t, n, r) {
            function c(e) {
                return function (n) {
                    n.error ? e.error && e.error(n) : n.headers && n.headers.status != 200 ? (e.error && e.error(n), t.warn(n.headers.message)) : e.success && e.success(n), e.complete && e.complete(n), h(e)
                }
            }

            function h(e) {
                var t = e.script;
                t && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), e.script = undefined, t = undefined), e.callbackName && twttr.tfw.callbacks[e.callbackName] && delete twttr.tfw.callbacks[e.callbackName]
            }

            function p(e) {
                var t = {};
                return e.success && n.isType("function", e.success) && (t.success = e.success), e.error && n.isType("function", e.error) && (t.error = e.error), e.complete && n.isType("function", e.complete) && (t.complete = e.complete), t
            }
            window.twttr = window.twttr || {}, twttr.tfw = twttr.tfw || {}, twttr.tfw.callbacks = twttr.tfw.callbacks || {};
            var i = "twttr.tfw.callbacks",
                s = twttr.tfw.callbacks,
                o = "cb",
                u = 0,
                a = !1,
                f = {},
                l = {
                    tweets: "https://syndication.twitter.com/tweets.json",
                    timeline: "https://cdn.syndication.twimg.com/widgets/timelines/",
                    timelinePoll: "https://syndication.twitter.com/widgets/timelines/paged/",
                    timelinePreview: "https://syndication.twitter.com/widgets/timelines/preview/"
                };
            twttr.widgets && twttr.widgets.endpoints && n.aug(l, twttr.widgets.endpoints), f.jsonp = function (e, t, n) {
                var f = n || o + u,
                    l = i + "." + f,
                    h = document.createElement("script"),
                    p = {
                        callback: l,
                        suppress_response_codes: !0
                    };
                s[f] = c(t);
                if (a || !/^https?\:$/.test(window.location.protocol)) e = e.replace(/^\/\//, "https://");
                h.src = r.url(e, p), h.async = "async", document.body.appendChild(h), t.script = h, t.callbackName = f, n || u++
            }, f.config = function (e) {
                if (e.forceSSL === !0 || e.forceSSL === !1) a = e.forceSSL
            }, f.tweets = function (e) {
                var t = arguments[0],
                    n = p(t),
                    i = {
                        ids: e.ids.join(","),
                        lang: e.lang
                    },
                    s = r.url(l.tweets, i);
                this.jsonp(s, n)
            }, f.timeline = function (e) {
                var t = arguments[0],
                    i = p(t),
                    s, o = 9e5,
                    u = Math.floor(+(new Date) / o),
                    a = {
                        lang: e.lang,
                        t: u,
                        domain: window.location.host,
                        dnt: e.dnt,
                        override_type: e.overrideType,
                        override_id: e.overrideId,
                        override_name: e.overrideName,
                        override_owner_id: e.overrideOwnerId,
                        override_owner_name: e.overrideOwnerName,
                        with_replies: e.withReplies
                    };
                n.compact(a), s = r.url(l.timeline + e.id, a), this.jsonp(s, i, "tl_" + e.id + "_" + e.instanceId)
            }, f.timelinePoll = function (e) {
                var t = arguments[0],
                    i = p(t),
                    s = {
                        lang: e.lang,
                        since_id: e.sinceId,
                        max_id: e.maxId,
                        min_position: e.minPosition,
                        max_position: e.maxPosition,
                        domain: window.location.host,
                        dnt: e.dnt,
                        override_type: e.overrideType,
                        override_id: e.overrideId,
                        override_name: e.overrideName,
                        override_owner_id: e.overrideOwnerId,
                        override_owner_name: e.overrideOwnerName,
                        with_replies: e.withReplies
                    },
                    o;
                n.compact(s), o = r.url(l.timelinePoll + e.id, s), this.jsonp(o, i, "tlPoll_" + e.id + "_" + e.instanceId + "_" + (e.sinceId || e.maxId || e.maxPosition || e.minPosition))
            }, f.timelinePreview = function (e) {
                var t = arguments[0],
                    n = p(t),
                    i = e.params,
                    s = r.url(l.timelinePreview, i);
                this.jsonp(s, n)
            }, e(f)
        })
    });
    provide("anim/transition", function (e) {
        function t(e, t) {
            var n;
            return t = t || window, n = t.requestAnimationFrame || t.webkitRequestAnimationFrame || t.mozRequestAnimationFrame || t.msRequestAnimationFrame || t.oRequestAnimationFrame || function (n) {
                t.setTimeout(function () {
                    e(+(new Date))
                }, 1e3 / 60)
            }, n(e)
        }

        function n(e, t) {
            return Math.sin(Math.PI / 2 * t) * e
        }

        function r(e, n, r, i, s) {
            function a() {
                var u = +(new Date),
                    f = u - o,
                    l = Math.min(f / r, 1),
                    c = i ? i(n, l) : n * l;
                e(c);
                if (l == 1) return;
                t(a, s)
            }
            var o = +(new Date),
                u;
            t(a)
        }
        e({
            animate: r,
            requestAnimationFrame: t,
            easeOut: n
        })
    });
    provide("util/datetime", function (e) {
        using("util/util", function (t) {
            function h(e) {
                return e < 10 ? "0" + e : e
            }

            function p(e) {
                function i(e, n) {
                    return t && t[e] && (e = t[e]), e.replace(/%\{([\w_]+)\}/g, function (e, t) {
                        return n[t] !== undefined ? n[t] : e
                    })
                }
                var t = e && e.phrases,
                    n = e && e.months || s,
                    r = e && e.formats || o;
                this.timeAgo = function (e) {
                    var t = p.parseDate(e),
                        s = +(new Date),
                        o = s - t,
                        h;
                    return t ? isNaN(o) || o < u * 2 ? i("now") : o < a ? (h = Math.floor(o / u), i(r.abbr, {
                        number: h,
                        symbol: i(c, {
                            abbr: i("s"),
                            expanded: h > 1 ? i("seconds") : i("second")
                        })
                    })) : o < f ? (h = Math.floor(o / a), i(r.abbr, {
                        number: h,
                        symbol: i(c, {
                            abbr: i("m"),
                            expanded: h > 1 ? i("minutes") : i("minute")
                        })
                    })) : o < l ? (h = Math.floor(o / f), i(r.abbr, {
                        number: h,
                        symbol: i(c, {
                            abbr: i("h"),
                            expanded: h > 1 ? i("hours") : i("hour")
                        })
                    })) : o < l * 365 ? i(r.shortdate, {
                        day: t.getDate(),
                        month: i(n[t.getMonth()])
                    }) : i(r.longdate, {
                        day: t.getDate(),
                        month: i(n[t.getMonth()]),
                        year: t.getFullYear().toString().slice(2)
                    }) : ""
                }, this.localTimeStamp = function (e) {
                    var t = p.parseDate(e),
                        s = t && t.getHours();
                    return t ? i(r.full, {
                        day: t.getDate(),
                        month: i(n[t.getMonth()]),
                        year: t.getFullYear(),
                        hours24: h(s),
                        hours12: s < 13 ? s ? s : "12" : s - 12,
                        minutes: h(t.getMinutes()),
                        seconds: h(t.getSeconds()),
                        amPm: s < 12 ? i("AM") : i("PM")
                    }) : ""
                }
            }
            var n = /(\d{4})-?(\d{2})-?(\d{2})T(\d{2}):?(\d{2}):?(\d{2})(Z|[\+\-]\d{2}:?\d{2})/,
                r = /[a-z]{3,4} ([a-z]{3}) (\d{1,2}) (\d{1,2}):(\d{2}):(\d{2}) ([\+\-]\d{2}:?\d{2}) (\d{4})/i,
                i = /^\d+$/,
                s = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                o = {
                    abbr: "%{number}%{symbol}",
                    shortdate: "%{day} %{month}",
                    longdate: "%{day} %{month} %{year}",
                    full: "%{hours12}:%{minutes} %{amPm} - %{day} %{month} %{year}"
                },
                u = 1e3,
                a = u * 60,
                f = a * 60,
                l = f * 24,
                c = '<abbr title="%{expanded}">%{abbr}</abbr>';
            p.parseDate = function (e) {
                var o = e || "",
                    u = o.toString(),
                    a, f;
                return a = function () {
                    var e;
                    if (i.test(u)) return parseInt(u, 10);
                    if (e = u.match(r)) return Date.UTC(e[7], t.indexOf(s, e[1]), e[2], e[3], e[4], e[5]);
                    if (e = u.match(n)) return Date.UTC(e[1], e[2] - 1, e[3], e[4], e[5], e[6])
                }(), a ? (f = new Date(a), !isNaN(f.getTime()) && f) : !1
            }, e(p)
        })
    });
    provide("sandbox/frame", function (e) {
        using("sandbox/baseframe", "sandbox/minimal", "util/env", "util/promise", "util/util", function (t, n, r, i, s) {
            function h() {
                var e, t;
                a = {};
                if (f) return;
                e = document.body.offsetHeight, t = document.body.offsetWidth;
                if (e == c && t == l) return;
                s.forEach(u, function (e) {
                    e.dispatchFrameResize(l, c)
                }), c = e, l = t
            }

            function p(e) {
                var t;
                return e.id ? e.id : (t = e.getAttribute("data-twttr-id")) ? t : (t = "twttr-sandbox-" + o++, e.setAttribute("data-twttr-id", t), t)
            }

            function d(e, t) {
                n.apply(this, [e, t]), this._resizeHandlers = [], u.push(this), this._win.addEventListener ? this._win.addEventListener("resize", s.bind(function () {
                    this.dispatchFrameResize()
                }, this), !0) : this._win.attachEvent("onresize", s.bind(function () {
                    this.dispatchFrameResize(this._win.event)
                }, this))
            }
            var o = 0,
                u = [],
                a = {},
                f, l = 0,
                c = 0;
            window.addEventListener ? window.addEventListener("resize", h, !0) : document.body.attachEvent("onresize", function () {
                h(window.event)
            }), d.prototype = new n, s.aug(d.prototype, {
                dispatchFrameResize: function () {
                    var e = this._frame.parentNode,
                        t = p(e),
                        n = a[t];
                    f = !0;
                    if (!this._resizeHandlers.length) return;
                    n || (n = a[t] = {
                        w: this._frame.offsetWidth,
                        h: this._frame.offsetHeight
                    });
                    if (this._frameWidth == n.w && this._frameHeight == n.h) return;
                    this._frameWidth = n.w, this._frameHeight = n.h, s.forEach(this._resizeHandlers, function (e) {
                        e(n.w, n.h)
                    }), window.setTimeout(function () {
                        a = {}
                    }, 50)
                },
                appendStyleSheet: function (e) {
                    var t = this._doc.createElement("link");
                    return t.type = "text/css", t.rel = "stylesheet", t.href = e, this.layout(s.bind(function () {
                        return this._head.appendChild(t)
                    }, this))
                },
                appendCss: function (e) {
                    var t;
                    return r.cspEnabled() ? i.reject("CSP enabled; cannot embed inline styles.") : (t = this._doc.createElement("style"), t.type = "text/css", t.styleSheet ? t.styleSheet.cssText = e : t.appendChild(this._doc.createTextNode(e)), this.layout(s.bind(function () {
                        return this._head.appendChild(t)
                    }, this)))
                },
                style: function (e) {
                    return this.layout(s.bind(function () {
                        s.forIn(e, s.bind(function (e, t) {
                            this._frame.style[e] = t
                        }, this))
                    }, this))
                },
                onresize: function (e) {
                    this._resizeHandlers.push(e)
                },
                width: function (e) {
                    return e !== undefined && (this._frame.style.width = e + "px"), r.ios() ? Math.min(this._frame.parentNode.offsetWidth, this._frame.offsetWidth) : this._frame.offsetWidth
                },
                height: function (e) {
                    return e !== undefined && (this._frame.height = e), this._frame.offsetHeight
                }
            }), d.createSandbox = function (e, n, r, i) {
                var s = new t(e, n, r, i);
                return s.ready().then(function (e) {
                    return new d(e.frame, e.layout)
                })
            }, e(d)
        })
    });
    provide("tfw/util/assets", function (e) {
        using("util/env", function (t) {
            function r(e, r) {
                var i = n[e],
                    s;
                return t.retina() ? s = "2x" : t.ie6() || t.ie7() ? s = "gif" : s = "default", r && (s += ".rtl"), i[s]
            }
            var n = {
                "embed/timeline.css": {
                    "default": "embed/timeline.6a72a50e1a93dc4d97ff897124263ab7.default.css",
                    "2x": "embed/timeline.6a72a50e1a93dc4d97ff897124263ab7.2x.css",
                    gif: "embed/timeline.6a72a50e1a93dc4d97ff897124263ab7.gif.css",
                    "default.rtl": "embed/timeline.6a72a50e1a93dc4d97ff897124263ab7.default.rtl.css",
                    "2x.rtl": "embed/timeline.6a72a50e1a93dc4d97ff897124263ab7.2x.rtl.css",
                    "gif.rtl": "embed/timeline.6a72a50e1a93dc4d97ff897124263ab7.gif.rtl.css"
                }
            };
            e(r)
        })
    });
    provide("util/layout", function (e) {
        using("util/promise", "util/logger", function (t, n) {
            function s() {}
            var r = [],
                i;
            s.prototype.enqueue = function (e, n) {
                return new t(function (t) {
                    r.push({
                        action: e,
                        resolver: t,
                        note: n
                    })
                })
            }, s.prototype.exec = function () {
                var e = r,
                    t;
                if (!e.length) return;
                r = [];
                while (e.length) t = e.shift(), t && t.action ? t.resolver.fulfill(t.action()) : t.resolver.reject()
            }, s.prototype.delayedExec = function () {
                i && window.clearTimeout(i), i = window.setTimeout(this.exec, 100)
            }, e(s)
        })
    });
    provide("tfw/widget/base", function (e) {
        using("dom/get", "util/domready", "util/iframe", "util/layout", "util/promise", "util/querystring", "util/typevalidator", "util/util", "tfw/util/globals", function (t, n, r, i, s, o, u, a, f) {
            function g(e) {
                var t;
                if (!e) return;
                e.ownerDocument ? (this.srcEl = e, this.classAttr = e.className.split(" ")) : (this.srcOb = e, this.classAttr = []), t = this.params(), this.id = this.generateId(), this.setLanguage(), this.related = t.related || this.dataAttr("related"), this.partner = t.partner || this.dataAttr("partner") || f.val("partner"), this.dnt = t.dnt || this.dataAttr("dnt") || f.dnt() || "", this.styleAttr = [], this.targetEl = e.targetEl, this.completePromise = new s(a.bind(function (e) {
                    this.completeResolver = e
                }, this)), this.completed().then(function (e) {
                    if (!e || e == document.body) return;
                    twttr.events.trigger("rendered", {
                        target: e
                    })
                })
            }

            function y() {
                a.forEach(p, function (e) {
                    e()
                }), g.doLayout()
            }

            function b(e) {
                if (!e) return;
                return e.lang ? e.lang : b(e.parentNode)
            }
            var l = 0,
                c, h = {
                    list: [],
                    byId: {}
                },
                p = [],
                d = new i,
                v = "data-twttr-rendered",
                m = {
                    ar: {
                        "%{followers_count} followers": "Ø¹Ø¯Ø¯ Ø§Ù„Ù…ØªØ§Ø¨Ø¹ÙŠÙ† %{followers_count}",
                        "100K+": "+100 Ø£Ù„Ù",
                        "10k unit": "10 Ø¢Ù„Ø§Ù ÙˆØ­Ø¯Ø©",
                        Follow: "ØªØ§Ø¨ÙØ¹",
                        "Follow %{screen_name}": "ØªØ§Ø¨ÙØ¹ %{screen_name}",
                        K: "Ø£Ù„Ù",
                        M: "Ù…",
                        Tweet: "ØºØ±ÙÙ‘Ø¯",
                        "Tweet %{hashtag}": "ØºØ±ÙÙ‘Ø¯ %{hashtag}",
                        "Tweet to %{name}": "ØºØ±ÙÙ‘Ø¯ Ù„Ù€ %{name}"
                    },
                    da: {
                        "%{followers_count} followers": "%{followers_count} fÃ¸lgere",
                        "10k unit": "10k enhed",
                        Follow: "FÃ¸lg",
                        "Follow %{screen_name}": "FÃ¸lg %{screen_name}",
                        "Tweet to %{name}": "Tweet til %{name}"
                    },
                    de: {
                        "%{followers_count} followers": "%{followers_count} Follower",
                        "100K+": "100Tsd+",
                        "10k unit": "10tsd-Einheit",
                        Follow: "Folgen",
                        "Follow %{screen_name}": "%{screen_name} folgen",
                        K: "Tsd",
                        Tweet: "Twittern",
                        "Tweet to %{name}": "Tweet an %{name}"
                    },
                    es: {
                        "%{followers_count} followers": "%{followers_count} seguidores",
                        "10k unit": "10k unidad",
                        Follow: "Seguir",
                        "Follow %{screen_name}": "Seguir a %{screen_name}",
                        Tweet: "Twittear",
                        "Tweet %{hashtag}": "Twittear %{hashtag}",
                        "Tweet to %{name}": "Twittear a %{name}"
                    },
                    fa: {
                        "%{followers_count} followers": "%{followers_count} Ø¯Ù†Ø¨Ø§Ù„â€ŒÚ©Ù†Ù†Ø¯Ù‡",
                        "100K+": ">Û±Û°Û°Ù‡Ø²Ø§Ø±",
                        "10k unit": "Û±Û°Ù‡Ø²Ø§Ø± ÙˆØ§Ø­Ø¯",
                        Follow: "Ø¯Ù†Ø¨Ø§Ù„ Ú©Ø±Ø¯Ù†",
                        "Follow %{screen_name}": "Ø¯Ù†Ø¨Ø§Ù„ Ú©Ø±Ø¯Ù† %{screen_name}",
                        K: "Ù‡Ø²Ø§Ø±",
                        M: "Ù…ÛŒÙ„ÛŒÙˆÙ†",
                        Tweet: "ØªÙˆÛŒÛŒØª",
                        "Tweet %{hashtag}": "ØªÙˆÛŒÛŒØª Ú©Ø±Ø¯Ù† %{hashtag}",
                        "Tweet to %{name}": "Ø¨Ù‡ %{name} ØªÙˆÛŒÛŒØª Ú©Ù†ÛŒØ¯"
                    },
                    fi: {
                        "%{followers_count} followers": "%{followers_count} seuraajaa",
                        "100K+": "100 000+",
                        "10k unit": "10 000 yksikkÃ¶Ã¤",
                        Follow: "Seuraa",
                        "Follow %{screen_name}": "Seuraa kÃ¤yttÃ¤jÃ¤Ã¤ %{screen_name}",
                        K: "tuhatta",
                        M: "milj.",
                        Tweet: "Twiittaa",
                        "Tweet %{hashtag}": "Twiittaa %{hashtag}",
                        "Tweet to %{name}": "Twiittaa kÃ¤yttÃ¤jÃ¤lle %{name}"
                    },
                    fil: {
                        "%{followers_count} followers": "%{followers_count} mga tagasunod",
                        "10k unit": "10k yunit",
                        Follow: "Sundan",
                        "Follow %{screen_name}": "Sundan si %{screen_name}",
                        Tweet: "I-tweet",
                        "Tweet %{hashtag}": "I-tweet ang %{hashtag}",
                        "Tweet to %{name}": "Mag-Tweet kay %{name}"
                    },
                    fr: {
                        "%{followers_count} followers": "%{followers_count} abonnÃ©s",
                        "10k unit": "unitÃ© de 10k",
                        Follow: "Suivre",
                        "Follow %{screen_name}": "Suivre %{screen_name}",
                        Tweet: "Tweeter",
                        "Tweet %{hashtag}": "Tweeter %{hashtag}",
                        "Tweet to %{name}": "Tweeter Ã  %{name}"
                    },
                    he: {
                        "%{followers_count} followers": "%{followers_count} ×¢×•×§×‘×™×",
                        "100K+": "×ž××•×ª ××œ×¤×™×",
                        "10k unit": "×¢×©×¨×•×ª ××œ×¤×™×",
                        Follow: "×ž×¢×§×‘",
                        "Follow %{screen_name}": "×œ×¢×§×•×‘ ××—×¨ %{screen_name}",
                        K: "××œ×£",
                        M: "×ž×™×œ×™×•×Ÿ",
                        Tweet: "×¦×™×•×¥",
                        "Tweet %{hashtag}": "×¦×™×™×¦×• %{hashtag}",
                        "Tweet to %{name}": "×¦×™×•×¥ ××œ %{name}"
                    },
                    hi: {
                        "%{followers_count} followers": "%{followers_count} à¤«à¤¼à¥‰à¤²à¥‹à¤…à¤°à¥à¤¸",
                        "100K+": "1 à¤²à¤¾à¤–+",
                        "10k unit": "10 à¤¹à¤œà¤¾à¤° à¤‡à¤•à¤¾à¤ˆà¤¯à¤¾à¤‚",
                        Follow: "à¤«à¤¼à¥‰à¤²à¥‹",
                        "Follow %{screen_name}": "%{screen_name} à¤•à¥‹ à¤«à¤¼à¥‰à¤²à¥‹ à¤•à¤°à¥‡à¤‚",
                        K: "à¤¹à¤œà¤¾à¤°",
                        M: "à¤®à¤¿à¤²à¤¿à¤¯à¤¨",
                        Tweet: "à¤Ÿà¥à¤µà¥€à¤Ÿ",
                        "Tweet %{hashtag}": "à¤Ÿà¥à¤µà¥€à¤Ÿ %{hashtag}",
                        "Tweet to %{name}": "%{name} à¤•à¥‹ à¤Ÿà¥à¤µà¥€à¤Ÿ à¤•à¤°à¥‡à¤‚"
                    },
                    hu: {
                        "%{followers_count} followers": "%{followers_count} kÃ¶vetÅ‘",
                        "100K+": "100E+",
                        "10k unit": "10E+",
                        Follow: "KÃ¶vetÃ©s",
                        "Follow %{screen_name}": "%{screen_name} kÃ¶vetÃ©se",
                        K: "E",
                        "Tweet %{hashtag}": "%{hashtag} tweetelÃ©se",
                        "Tweet to %{name}": "Tweet kÃ¼ldÃ©se neki: %{name}"
                    },
                    id: {
                        "%{followers_count} followers": "%{followers_count} pengikut",
                        "100K+": "100 ribu+",
                        "10k unit": "10 ribu unit",
                        Follow: "Ikuti",
                        "Follow %{screen_name}": "Ikuti %{screen_name}",
                        K: "&nbsp;ribu",
                        M: "&nbsp;juta",
                        "Tweet to %{name}": "Tweet ke %{name}"
                    },
                    it: {
                        "%{followers_count} followers": "%{followers_count} follower",
                        "10k unit": "10k unitÃ ",
                        Follow: "Segui",
                        "Follow %{screen_name}": "Segui %{screen_name}",
                        "Tweet %{hashtag}": "Twitta %{hashtag}",
                        "Tweet to %{name}": "Twitta a %{name}"
                    },
                    ja: {
                        "%{followers_count} followers": "%{followers_count}äººã®ãƒ•ã‚©ãƒ­ãƒ¯ãƒ¼",
                        "100K+": "100Kä»¥ä¸Š",
                        "10k unit": "ä¸‡",
                        Follow: "ãƒ•ã‚©ãƒ­ãƒ¼ã™ã‚‹",
                        "Follow %{screen_name}": "%{screen_name}ã•ã‚“ã‚’ãƒ•ã‚©ãƒ­ãƒ¼",
                        Tweet: "ãƒ„ã‚¤ãƒ¼ãƒˆ",
                        "Tweet %{hashtag}": "%{hashtag} ã‚’ãƒ„ã‚¤ãƒ¼ãƒˆã™ã‚‹",
                        "Tweet to %{name}": "%{name}ã•ã‚“ã¸ãƒ„ã‚¤ãƒ¼ãƒˆã™ã‚‹"
                    },
                    ko: {
                        "%{followers_count} followers": "%{followers_count}ëª…ì˜ íŒ”ë¡œì›Œ",
                        "100K+": "100ë§Œ ì´ìƒ",
                        "10k unit": "ë§Œ ë‹¨ìœ„",
                        Follow: "íŒ”ë¡œìš°",
                        "Follow %{screen_name}": "%{screen_name} ë‹˜ íŒ”ë¡œìš°í•˜ê¸°",
                        K: "ì²œ",
                        M: "ë°±ë§Œ",
                        Tweet: "íŠ¸ìœ—",
                        "Tweet %{hashtag}": "%{hashtag} ê´€ë ¨ íŠ¸ìœ—í•˜ê¸°",
                        "Tweet to %{name}": "%{name} ë‹˜ì—ê²Œ íŠ¸ìœ—í•˜ê¸°"
                    },
                    msa: {
                        "%{followers_count} followers": "%{followers_count} pengikut",
                        "100K+": "100 ribu+",
                        "10k unit": "10 ribu unit",
                        Follow: "Ikut",
                        "Follow %{screen_name}": "Ikut %{screen_name}",
                        K: "ribu",
                        M: "juta",
                        "Tweet to %{name}": "Tweet kepada %{name}"
                    },
                    nl: {
                        "%{followers_count} followers": "%{followers_count} volgers",
                        "100K+": "100k+",
                        "10k unit": "10k-eenheid",
                        Follow: "Volgen",
                        "Follow %{screen_name}": "%{screen_name} volgen",
                        K: "k",
                        M: " mln.",
                        Tweet: "Tweeten",
                        "Tweet %{hashtag}": "%{hashtag} tweeten",
                        "Tweet to %{name}": "Tweeten naar %{name}"
                    },
                    no: {
                        "%{followers_count} followers": "%{followers_count} fÃ¸lgere",
                        "100K+": "100 K+",
                        "10k unit": "10-K-enhet",
                        Follow: "FÃ¸lg",
                        "Follow %{screen_name}": "FÃ¸lg %{screen_name}",
                        "Tweet to %{name}": "Send en tweet til %{name}"
                    },
                    pl: {
                        "%{followers_count} followers": "%{followers_count} obserwujÄ…cych",
                        "100K+": "100 tys.+",
                        "10k unit": "10 tys.",
                        Follow: "Obserwuj",
                        "Follow %{screen_name}": "Obserwuj %{screen_name}",
                        K: "tys.",
                        M: "mln",
                        Tweet: "Tweetnij",
                        "Tweet %{hashtag}": "Tweetnij %{hashtag}",
                        "Tweet to %{name}": "Tweetnij do %{name}"
                    },
                    pt: {
                        "%{followers_count} followers": "%{followers_count} seguidores",
                        "100K+": "+100 mil",
                        "10k unit": "10 mil unidades",
                        Follow: "Seguir",
                        "Follow %{screen_name}": "Seguir %{screen_name}",
                        K: "Mil",
                        Tweet: "Tweetar",
                        "Tweet %{hashtag}": "Tweetar %{hashtag}",
                        "Tweet to %{name}": "Tweetar para %{name}"
                    },
                    ru: {
                        "%{followers_count} followers": "Ð§Ð¸Ñ‚Ð°Ñ‚ÐµÐ»Ð¸: %{followers_count} ",
                        "100K+": "100 Ñ‚Ñ‹Ñ.+",
                        "10k unit": "Ð±Ð»Ð¾Ðº 10k",
                        Follow: "Ð§Ð¸Ñ‚Ð°Ñ‚ÑŒ",
                        "Follow %{screen_name}": "Ð§Ð¸Ñ‚Ð°Ñ‚ÑŒ %{screen_name}",
                        K: "Ñ‚Ñ‹Ñ.",
                        M: "Ð¼Ð»Ð½.",
                        Tweet: "Ð¢Ð²Ð¸Ñ‚Ð½ÑƒÑ‚ÑŒ",
                        "Tweet %{hashtag}": "Ð¢Ð²Ð¸Ñ‚Ð½ÑƒÑ‚ÑŒ %{hashtag}",
                        "Tweet to %{name}": "Ð¢Ð²Ð¸Ñ‚Ð½ÑƒÑ‚ÑŒ %{name}"
                    },
                    sv: {
                        "%{followers_count} followers": "%{followers_count} fÃ¶ljare",
                        "10k unit": "10k",
                        Follow: "FÃ¶lj",
                        "Follow %{screen_name}": "FÃ¶lj %{screen_name}",
                        Tweet: "Tweeta",
                        "Tweet %{hashtag}": "Tweeta %{hashtag}",
                        "Tweet to %{name}": "Tweeta till %{name}"
                    },
                    th: {
                        "%{followers_count} followers": "%{followers_count} à¸œà¸¹à¹‰à¸•à¸´à¸”à¸•à¸²à¸¡",
                        "100K+": "100à¸žà¸±à¸™+",
                        "10k unit": "à¸«à¸™à¹ˆà¸§à¸¢ 10à¸žà¸±à¸™",
                        Follow: "à¸•à¸´à¸”à¸•à¸²à¸¡",
                        "Follow %{screen_name}": "à¸•à¸´à¸”à¸•à¸²à¸¡ %{screen_name}",
                        M: "à¸¥à¹‰à¸²à¸™",
                        Tweet: "à¸—à¸§à¸µà¸•",
                        "Tweet %{hashtag}": "à¸—à¸§à¸µà¸• %{hashtag}",
                        "Tweet to %{name}": "à¸—à¸§à¸µà¸•à¸–à¸¶à¸‡ %{name}"
                    },
                    tr: {
                        "%{followers_count} followers": "%{followers_count} takipÃ§i",
                        "100K+": "+100 bin",
                        "10k unit": "10 bin birim",
                        Follow: "Takip et",
                        "Follow %{screen_name}": "Takip et: %{screen_name}",
                        K: "bin",
                        M: "milyon",
                        Tweet: "Tweetle",
                        "Tweet %{hashtag}": "Tweetle: %{hashtag}",
                        "Tweet to %{name}": "Tweetle: %{name}"
                    },
                    ur: {
                        "%{followers_count} followers": "%{followers_count} ÙØ§Ù„ÙˆØ±Ø²",
                        "100K+": "Ø§ÛŒÚ© Ù„Ø§Ú©Ú¾ Ø³Û’ Ø²ÛŒØ§Ø¯Û",
                        "10k unit": "Ø¯Ø³ ÛØ²Ø§Ø± ÛŒÙˆÙ†Ù¹",
                        Follow: "ÙØ§Ù„Ùˆ Ú©Ø±ÛŒÚº",
                        "Follow %{screen_name}": "%{screen_name} Ú©Ùˆ ÙØ§Ù„Ùˆ Ú©Ø±ÛŒÚº",
                        K: "ÛØ²Ø§Ø±",
                        M: "Ù…Ù„ÛŒÙ†",
                        Tweet: "Ù¹ÙˆÛŒÙ¹ Ú©Ø±ÛŒÚº",
                        "Tweet %{hashtag}": "%{hashtag} Ù¹ÙˆÛŒÙ¹ Ú©Ø±ÛŒÚº",
                        "Tweet to %{name}": "%{name} Ú©Ùˆ Ù¹ÙˆÛŒÙ¹ Ú©Ø±ÛŒÚº"
                    },
                    "zh-cn": {
                        "%{followers_count} followers": "%{followers_count} å…³æ³¨è€…",
                        "100K+": "10ä¸‡+",
                        "10k unit": "1ä¸‡å•å…ƒ",
                        Follow: "å…³æ³¨",
                        "Follow %{screen_name}": "å…³æ³¨ %{screen_name}",
                        K: "åƒ",
                        M: "ç™¾ä¸‡",
                        Tweet: "å‘æŽ¨",
                        "Tweet %{hashtag}": "ä»¥ %{hashtag} å‘æŽ¨",
                        "Tweet to %{name}": "å‘æŽ¨ç»™ %{name}"
                    },
                    "zh-tw": {
                        "%{followers_count} followers": "%{followers_count} ä½è·Ÿéš¨è€…",
                        "100K+": "è¶…éŽåè¬",
                        "10k unit": "1è¬ å–®ä½",
                        Follow: "è·Ÿéš¨",
                        "Follow %{screen_name}": "è·Ÿéš¨ %{screen_name}",
                        K: "åƒ",
                        M: "ç™¾è¬",
                        Tweet: "æŽ¨æ–‡",
                        "Tweet %{hashtag}": "æŽ¨æ–‡%{hashtag}",
                        "Tweet to %{name}": "æŽ¨æ–‡çµ¦%{name}"
                    }
                };
            a.aug(g.prototype, {
                setLanguage: function (e) {
                    var t;
                    e || (e = this.params().lang || this.dataAttr("lang") || b(this.srcEl)), e = e && e.toLowerCase();
                    if (!e) return this.lang = "en";
                    if (m[e]) return this.lang = e;
                    t = e.replace(/[\-_].*/, "");
                    if (m[t]) return this.lang = t;
                    this.lang = "en"
                },
                _: function (e, t) {
                    var n = this.lang;
                    t = t || {};
                    if (!n || !m.hasOwnProperty(n)) n = this.lang = "en";
                    return e = m[n] && m[n][e] || e, this.ringo(e, t, /%\{([\w_]+)\}/g)
                },
                ringo: function (e, t, n) {
                    return n = n || /\{\{([\w_]+)\}\}/g, e.replace(n, function (e, n) {
                        return t[n] !== undefined ? t[n] : e
                    })
                },
                add: function (e) {
                    h.list.push(this), h.byId[this.id] = e
                },
                create: function (e, t, n) {
                    var i = this,
                        o;
                    return n[v] = !0, o = r(a.aug({
                        id: this.id,
                        src: e,
                        "class": this.classAttr.join(" ")
                    }, n), t, this.targetEl && this.targetEl.ownerDocument), this.srcEl ? this.layout(function () {
                        return i.srcEl.parentNode.replaceChild(o, i.srcEl), i.completeResolver.fulfill(o), o
                    }) : this.targetEl ? this.layout(function () {
                        return i.targetEl.appendChild(o), i.completeResolver.fulfill(o), o
                    }) : s.reject("Did not append widget")
                },
                params: function () {
                    var e, t;
                    return this.srcOb ? t = this.srcOb : (e = this.srcEl && this.srcEl.href && this.srcEl.href.split("?")[1], t = e ? o.decode(e) : {}), this.params = function () {
                        return t
                    }, t
                },
                dataAttr: function (e) {
                    return this.srcEl && this.srcEl.getAttribute("data-" + e)
                },
                attr: function (e) {
                    return this.srcEl && this.srcEl.getAttribute(e)
                },
                layout: function (e) {
                    return d.enqueue(e)
                },
                styles: {
                    base: [
                        ["font", "normal normal normal 11px/18px 'Helvetica Neue', Arial, sans-serif"],
                        ["margin", "0"],
                        ["padding", "0"],
                        ["whiteSpace", "nowrap"]
                    ],
                    button: [
                        ["fontWeight", "bold"],
                        ["textShadow", "0 1px 0 rgba(255,255,255,.5)"]
                    ],
                    large: [
                        ["fontSize", "13px"],
                        ["lineHeight", "26px"]
                    ],
                    vbubble: [
                        ["fontSize", "16px"]
                    ]
                },
                width: function () {
                    throw new Error(name + " not implemented")
                },
                height: function () {
                    return this.size == "m" ? 20 : 28
                },
                minWidth: function () {},
                maxWidth: function () {},
                minHeight: function () {},
                maxHeight: function () {},
                dimensions: function () {
                    function e(e) {
                        switch (typeof e) {
                        case "string":
                            return e;
                        case "undefined":
                            return;
                        default:
                            return e + "px"
                        }
                    }
                    var t = {
                        width: this.width(),
                        height: this.height()
                    };
                    return this.minWidth() && (t["min-width"] = this.minWidth()), this.maxWidth() && (t["max-width"] = this.maxWidth()), this.minHeight() && (t["min-height"] = this.minHeight()), this.maxHeight() && (t["max-height"] = this.maxHeight()), a.forIn(t, function (n, r) {
                        t[n] = e(r)
                    }), t
                },
                generateId: function () {
                    return this.srcEl && this.srcEl.id || "twitter-widget-" + l++
                },
                completed: function () {
                    return this.completePromise
                }
            }), g.afterLoad = function (e) {
                p.push(e)
            }, g.doLayout = function () {
                d.exec()
            }, g.doLayoutAsync = function () {
                d.delayedExec()
            }, g.init = function (e) {
                c = e
            }, g.find = function (e) {
                return e && h.byId[e] ? h.byId[e].element : null
            }, g.embed = function (e) {
                var n = c.widgets,
                    r = [],
                    i = [];
                u.isArray(e) || (e = [e || document]), a.forEach(e, function (e) {
                    a.forIn(n, function (n, i) {
                        var s, o;
                        n.match(/\./) ? (s = n.split("."), o = t.all(s[1], e, s[0])) : o = e.getElementsByTagName(n), a.forEach(o, function (e) {
                            if (e.getAttribute(v)) return;
                            e.setAttribute(v, "true"), r.push(new i(e))
                        })
                    })
                }), g.doLayout(), a.forEach(r, function (e) {
                    h.byId[e.id] = e, h.list.push(e), i.push(e.completed()), e.render(c)
                }), s.every.apply(null, i).then(function (e) {
                    e = a.filter(e, function (t) {
                        return t
                    });
                    if (!e.length) return;
                    twttr.events.trigger("loaded", {
                        widgets: e
                    })
                }), g.doLayoutAsync(), y()
            }, window.setInterval(function () {
                g.doLayout()
            }, 500), e(g)
        })
    });
    provide("tfw/widget/intent", function (e) {
        using("tfw/widget/base", "util/util", "util/querystring", "util/uri", "util/promise", function (t, n, r, i, s) {
            function p(e) {
                var t = Math.round(c / 2 - a / 2),
                    n = 0;
                l > f && (n = Math.round(l / 2 - f / 2)), window.open(e, undefined, [u, "width=" + a, "height=" + f, "left=" + t, "top=" + n].join(","))
            }

            function d(e, t) {
                using("tfw/hub/client", function (n) {
                    n.openIntent(e, t)
                })
            }

            function v(e) {
                var t = ~location.host.indexOf("poptip.com") ? "https://poptip.com" : location.href,
                    n = "original_referer=" + t;
                return [e, n].join(e.indexOf("?") == -1 ? "?" : "&")
            }

            function m(e) {
                var t, r, i, s;
                e = e || window.event, t = e.target || e.srcElement;
                if (e.altKey || e.metaKey || e.shiftKey) return;
                while (t) {
                    if (~n.indexOf(["A", "AREA"], t.nodeName)) break;
                    t = t.parentNode
                }
                t && t.href && (r = t.href.match(o), r && (s = v(t.href), s = s.replace(/^http[:]/, "https:"), s = s.replace(/^\/\//, "https://"), g(s, t), e.returnValue = !1, e.preventDefault && e.preventDefault()))
            }

            function g(e, t) {
                if (twttr.events.hub && t) {
                    var n = new y(h.generateId(), t);
                    h.add(n), d(e, t), twttr.events.trigger("click", {
                        target: t,
                        region: "intent",
                        type: "click",
                        data: {}
                    })
                } else p(e)
            }

            function y(e, t) {
                this.id = e, this.element = this.srcEl = t
            }

            function b(e) {
                this.srcEl = [], this.element = e
            }
            var o = /twitter\.com(\:\d{2,4})?\/intent\/(\w+)/,
                u = "scrollbars=yes,resizable=yes,toolbar=no,location=yes",
                a = 550,
                f = 520,
                l = screen.height,
                c = screen.width,
                h;
            b.prototype = new t, n.aug(b.prototype, {
                render: function (e) {
                    return h = this, window.__twitterIntentHandler || (document.addEventListener ? document.addEventListener("click", m, !1) : document.attachEvent && document.attachEvent("onclick", m), window.__twitterIntentHandler = !0), s.fulfill(document.body)
                }
            }), b.open = g, e(b)
        })
    });
    provide("tfw/widget/syndicatedbase", function (e) {
        using("tfw/widget/base", "tfw/widget/intent", "tfw/util/assets", "tfw/util/globals", "tfw/util/tracking", "dom/classname", "dom/get", "dom/delegate", "sandbox/frame", "util/env", "util/promise", "util/twitter", "util/typevalidator", "util/util", function (t, n, r, i, s, o, u, a, f, l, c, h, p, d) {
            function C() {
                b = k.VALID_COLOR.test(i.val("widgets:link-color")) && RegExp.$1, E = k.VALID_COLOR.test(i.val("widgets:border-color")) && RegExp.$1, w = i.val("widgets:theme")
            }

            function k(e) {
                if (!e) return;
                var n;
                this.readyPromise = new c(d.bind(function (e) {
                    this.readyResolver = e
                }, this)), this.renderedPromise = new c(d.bind(function (e) {
                    this.renderResolver = e
                }, this)), t.apply(this, [e]), n = this.params(), this.targetEl = this.srcEl && this.srcEl.parentNode || n.targetEl || document.body, this.predefinedWidth = k.VALID_UNIT.test(n.width || this.attr("width")) && RegExp.$1, this.layout(d.bind(function () {
                    return this.containerWidth = this.targetEl && this.targetEl.offsetWidth
                }, this)).then(d.bind(function (e) {
                    var t = this.predefinedWidth || e || this.dimensions.DEFAULT_WIDTH;
                    this.height = k.VALID_UNIT.test(n.height || this.attr("height")) && RegExp.$1, this.width = Math.max(this.dimensions.MIN_WIDTH, Math.min(t, this.dimensions.DEFAULT_WIDTH))
                }, this)), k.VALID_COLOR.test(n.linkColor || this.dataAttr("link-color")) ? this.linkColor = RegExp.$1 : this.linkColor = b, k.VALID_COLOR.test(n.borderColor || this.dataAttr("border-color")) ? this.borderColor = RegExp.$1 : this.borderColor = E, this.theme = n.theme || this.attr("data-theme") || w, this.theme = /(dark|light)/.test(this.theme) ? this.theme : "", this.classAttr.push(l.touch() ? "is-touch" : "not-touch"), l.ie9() && this.classAttr.push("ie9"), f.createSandbox({
                    "class": this.renderedClassNames,
                    id: this.id
                }, {
                    width: "1px",
                    height: "0px",
                    border: "none",
                    position: "absolute",
                    visibility: "hidden"
                }, d.bind(function (e) {
                    this.srcEl ? this.targetEl.insertBefore(e, this.srcEl) : this.targetEl.appendChild(e)
                }, this), this.layout).then(d.bind(function (e) {
                    this.setupSandbox(e)
                }, this))
            }

            function L(e, t) {
                return e + t
            }

            function A(e, t) {
                return e == 2 || e == 3 && t == 0
            }
            var v = [".customisable", ".customisable:link", ".customisable:visited", ".customisable:hover", ".customisable:focus", ".customisable:active", ".customisable-highlight:hover", ".customisable-highlight:focus", "a:hover .customisable-highlight", "a:focus .customisable-highlight"],
                m = ["a:hover .ic-mask", "a:focus .ic-mask"],
                g = [".customisable-border"],
                y = [".timeline-header h1.summary", ".timeline-header h1.summary a:link", ".timeline-header h1.summary a:visited"],
                b, w, E, S = {
                    TWEET: 0,
                    RETWEET: 10
                },
                x = 6,
                T = 8 / 9,
                N = 16 / 9;
            k.prototype = new t, d.aug(k.prototype, {
                setupSandbox: function (e) {
                    this.sandbox = e, c.some(e.appendCss("body{display:none}"), e.setBaseTarget("_blank"), e.appendStyleSheet(twttr.widgets.config.assetUrl() + "/" + r("embed/timeline.css"))).then(d.bind(function () {
                        this.readyResolver.fulfill(e)
                    }, this))
                },
                ready: function () {
                    return this.readyPromise
                },
                rendered: function () {
                    return this.renderedPromise
                },
                contentWidth: function (e) {
                    var t = this.dimensions,
                        n = this.fullBleedPhoto ? 0 : this.chromeless && this.narrow ? t.NARROW_MEDIA_PADDING_CL : this.chromeless ? t.WIDE_MEDIA_PADDING_CL : this.narrow ? t.NARROW_MEDIA_PADDING : t.WIDE_MEDIA_PADDING;
                    return (e || this.width) - n
                },
                addSiteStyles: function () {
                    var e = d.bind(function (e) {
                            return (this.theme == "dark" ? ".thm-dark " : "") + e
                        }, this),
                        t = [];
                    this.headingStyle && t.push(d.map(y, e).join(",") + "{" + this.headingStyle + "}"), this.linkColor && (t.push(d.map(v, e).join(",") + "{color:" + this.linkColor + "}"), t.push(d.map(m, e).join(",") + "{background-color:" + this.linkColor + "}")), this.borderColor && t.push(d.map(g, e).concat(this.theme == "dark" ? [".thm-dark.customisable-border"] : []).join(",") + "{border-color:" + this.borderColor + "}");
                    if (!t.length) return;
                    return this.sandbox.appendCss(t.join(""))
                },
                setNarrow: function () {
                    var e = this.narrow;
                    return this.narrow = this.width < this.dimensions.NARROW_WIDTH, e != this.narrow ? this.layout(d.bind(function () {
                        return o.toggle(this.element, "var-narrow", this.narrow)
                    }, this)) : c.fulfill(this.narrow)
                },
                bindIntentHandlers: function () {
                    function r(n) {
                        var r = u.ancestor(".tweet", this, t),
                            i = d.aug({}, e.baseScribeData(), e.extractTweetScribeDetails(r));
                        s.scribeInteraction(n, i, !0, e.dnt)
                    }
                    var e = this,
                        t = this.element;
                    a.delegate(t, "click", "A", r), a.delegate(t, "click", "BUTTON", r), a.delegate(t, "click", ".profile", function () {
                        e.addUrlParams(this)
                    }), a.delegate(t, "click", ".follow-button", function (t) {
                        var r;
                        if (t.altKey || t.metaKey || t.shiftKey) return;
                        if (l.ios() || l.android()) return;
                        if (p.asBoolean(this.getAttribute("data-age-gate"))) return;
                        r = h.intentForProfileURL(this.href), r && (n.open(r, e.sandbox.element()), a.preventDefault(t))
                    }), a.delegate(t, "click", ".web-intent", function (t) {
                        e.addUrlParams(this);
                        if (t.altKey || t.metaKey || t.shiftKey) return;
                        n.open(this.href, e.sandbox.element()), a.preventDefault(t)
                    })
                },
                baseScribeData: function () {
                    return {}
                },
                extractTweetScribeDetails: function (e) {
                    var t, n, r = {};
                    return e ? (t = e.getAttribute("data-tweet-id"), n = e.getAttribute("data-rendered-tweet-id") || t, n == t ? r[n] = {
                        item_type: S.TWEET
                    } : t && (r[n] = {
                        item_type: S.RETWEET,
                        target_type: S.TWEET,
                        target_id: t
                    }), r) : r
                },
                constrainMedia: function (e, t) {
                    var n = 0,
                        r = this.fullBleedPhoto ? 600 : 375,
                        i = u.one("multi-photo", e, "DIV"),
                        s = i && +i.getAttribute("data-photo-count");
                    e = e || this.element, t = t || this.contentWidth();
                    if (!e) return;
                    return d.forEach(u.all("autosized-media", e), d.bind(function (e) {
                        var i = k.scaleDimensions(e.getAttribute("data-width"), e.getAttribute("data-height"), t, r);
                        this.layout(function () {
                            e.width = i.width, e.height = i.height
                        }), n = i.height > n ? i.height : n
                    }, this)), d.forEach(u.all("cropped-media", e, "IMG"), d.bind(function (e) {
                        var i = t - 12,
                            o = e.parentNode,
                            u = e.getAttribute("data-crop-x") || 0,
                            a = e.getAttribute("data-crop-y") || 0,
                            f, l, c = A(s, e.getAttribute("data-image-index")),
                            h = Math.floor(i / 2 - x),
                            p = Math.floor(h / (c ? T : N)),
                            d;
                        c || (p -= x / 2), d = k.scaleDimensions(e.getAttribute("data-width"), e.getAttribute("data-height"), h, r, h, p), f = d.width - h - u, l = d.height - p - a, f < 0 && Math.max(0, u += f), l < 0 && Math.max(0, a += l), this.layout(function () {
                            e.width = d.width, e.height = d.height, o.style.width = h - 1 + "px", o.style.height = p + "px", u && (e.style.marginLeft = "-" + Math.floor(d.width * u / 100) + "px"), a && (e.style.marginTop = "-" + Math.floor(d.height * a / 100) + "px")
                        }), n = d.height * (c ? 2 : 1) > n ? d.height : n
                    }, this)), n
                },
                collapseRegions: function () {
                    d.forEach(u.all("collapsible-container", this.element), d.bind(function (e) {
                        var t = e.children,
                            n = t.length && e.offsetWidth,
                            r = t.length && d.map(t, function (e) {
                                return e.offsetWidth
                            }),
                            i = t.length,
                            s, u;
                        if (!t.length) return;
                        while (i > 0) {
                            i--, s = d.reduce(r, L, 0);
                            if (!n || !s) return;
                            if (s < n) return;
                            u = t[i].getAttribute("data-collapsed-class");
                            if (!u) continue;
                            o.add(this.element, u), r[i] = t[i].offsetWidth
                        }
                    }, this))
                }
            }), k.VALID_UNIT = /^([0-9]+)( ?px)?$/, k.VALID_COLOR = /^(#(?:[0-9a-f]{3}|[0-9a-f]{6}))$/i, k.retinize = function (e) {
                if (!l.retina()) return;
                d.forEach(e.getElementsByTagName("IMG"), function (e) {
                    var t = e.getAttribute("data-src-2x");
                    t && (e.src = t)
                })
            }, k.scaleDimensions = function (e, t, n, r, i, s) {
                return n = n || e, r = r || t, i = i || 0, s = s || 0, e > n && (t *= n / e, e = n), t > r && (e *= r / t, t = r), e < i && (t *= i / e, e = i), t < s && (e *= s / t, t = s), {
                    width: Math.floor(e),
                    height: Math.floor(t)
                }
            }, C(), e(k)
        })
    });
    provide("tfw/widget/timeline", function (e) {
        using("tfw/widget/base", "tfw/widget/syndicatedbase", "util/datetime", "util/promise", "anim/transition", "tfw/util/article", "tfw/util/data", "tfw/util/tracking", "tfw/util/params", "util/css", "util/env", "util/throttle", "util/twitter", "util/querystring", "util/typevalidator", "util/util", "dom/delegate", "dom/classname", "dom/get", function (t, n, r, i, s, o, u, a, f, l, c, h, p, d, v, m, g, y, b) {
            function I(e) {
                if (!e) return;
                var t, r, i, s, o, u, a, f;
                n.apply(this, [e]), t = this.params(), r = (t.chrome || this.dataAttr("chrome") || "").split(" "), this.preview = t.previewParams, this.widgetId = t.widgetId || this.dataAttr("widget-id"), this.instanceId = ++F, this.cursors = {
                    maxPosition: 0,
                    minPosition: 0
                }, (s = t.screenName || this.dataAttr("screen-name")) || (o = t.userId || this.dataAttr("user-id")) ? this.override = {
                    overrideType: "user",
                    overrideId: o,
                    overrideName: s,
                    withReplies: v.asBoolean(t.showReplies || this.dataAttr("show-replies")) ? "true" : "false"
                } : (s = t.favoritesScreenName || this.dataAttr("favorites-screen-name")) || (o = t.favoritesUserId || this.dataAttr("favorites-user-id")) ? this.override = {
                    overrideType: "favorites",
                    overrideId: o,
                    overrideName: s
                } : ((s = t.listOwnerScreenName || this.dataAttr("list-owner-screen-name")) || (o = t.listOwnerId || this.dataAttr("list-owner-id"))) && ((u = t.listId || this.dataAttr("list-id")) || (a = t.listSlug || this.dataAttr("list-slug"))) ? this.override = {
                    overrideType: "list",
                    overrideOwnerId: o,
                    overrideOwnerName: s,
                    overrideId: u,
                    overrideName: a
                } : (f = t.customTimelineId || this.dataAttr("custom-timeline-id")) ? this.override = {
                    overrideType: "custom",
                    overrideId: f
                } : this.override = {}, this.tweetLimit = v.asInt(t.tweetLimit || this.dataAttr("tweet-limit")), this.staticTimeline = this.tweetLimit > 0, r.length && (i = ~m.indexOf(r, "none"), this.chromeless = i || ~m.indexOf(r, "transparent"), this.headerless = i || ~m.indexOf(r, "noheader"), this.footerless = i || ~m.indexOf(r, "nofooter"), this.borderless = i || ~m.indexOf(r, "noborders"), this.noscrollbar = ~m.indexOf(r, "noscrollbar")), this.headingStyle = l.sanitize(t.headingStyle || this.dataAttr("heading-style"), undefined, !0), this.classAttr.push("twitter-timeline-rendered"), this.ariaPolite = t.ariaPolite || this.dataAttr("aria-polite")
            }
            var w = "1.0",
                E = {
                    CLIENT_SIDE_USER: 0,
                    CLIENT_SIDE_APP: 2
                },
                S = "timeline",
                x = "new-tweets-bar",
                T = "timeline-header",
                N = "timeline-footer",
                C = "stream",
                k = "h-feed",
                L = "tweet",
                A = "expanded",
                O = "detail-expander",
                M = "expand",
                _ = "permalink",
                D = "twitter-follow-button",
                P = "no-more-pane",
                H = "pending-scroll-in",
                B = "pending-new-tweet",
                j = "pending-new-tweet-display",
                F = 0;
            I.prototype = new n, m.aug(I.prototype, {
                renderedClassNames: "twitter-timeline twitter-timeline-rendered",
                dimensions: {
                    DEFAULT_HEIGHT: "600",
                    DEFAULT_WIDTH: "520",
                    NARROW_WIDTH: "320",
                    MIN_WIDTH: "180",
                    MIN_HEIGHT: "200",
                    WIDE_MEDIA_PADDING: 81,
                    NARROW_MEDIA_PADDING: 16,
                    WIDE_MEDIA_PADDING_CL: 60,
                    NARROW_MEDIA_PADDING_CL: 12
                },
                create: function (e) {
                    var r = this.sandbox.createElement("div"),
                        i, s, o, u = [],
                        f;
                    r.innerHTML = e.body, i = r.children[0] || !1;
                    if (!i) return;
                    return this.reconfigure(e.config), this.discardStaticOverflow(i), this.sandbox.setTitle(i.getAttribute("data-iframe-title") || "Timeline"), n.retinize(i), this.constrainMedia(i), this.searchQuery = i.getAttribute("data-search-query"), this.profileId = i.getAttribute("data-profile-id"), this.timelineType = i.getAttribute("data-timeline-type"), f = this.getTweetDetails(r), m.forIn(f, function (e) {
                        u.push(e)
                    }), o = this.baseScribeData(), o.item_ids = u, o.item_details = f, this.timelineType && a.enqueue({
                        page: this.timelineType + "_timeline",
                        component: "timeline",
                        element: "initial",
                        action: u.length ? "results" : "no_results"
                    }, o, !0, this.dnt), a.enqueue({
                        page: "timeline",
                        component: "timeline",
                        element: "initial",
                        action: u.length ? "results" : "no_results"
                    }, o, !0, this.dnt), a.flush(), this.ariaPolite == "assertive" && (s = b.one(x, i, "DIV"), s.setAttribute("aria-polite", "assertive")), i.id = this.id, i.className += " " + this.classAttr.join(" "), i.lang = this.lang, this.augmentWidgets(i), this.ready().then(m.bind(function (e) {
                        e.appendChild(i).then(m.bind(function () {
                            this.renderResolver.fulfill(this.sandbox)
                        }, this)), e.style({
                            cssText: "",
                            border: "none",
                            maxWidth: "100%",
                            minWidth: this.dimensions.MIN_WIDTH + "px"
                        }), this.layout(m.bind(function () {
                            this.srcEl && this.srcEl.parentNode && this.srcEl.parentNode.removeChild(this.srcEl), this.predefinedWidth = this.width, this.predefinedHeight = this.height, this.width = e.width(this.width), this.height = e.height(this.height)
                        }, this)).then(m.bind(function () {
                            this.completeResolver.fulfill(this.sandbox.element()), this.width < this.predefinedWidth && (this.layout(m.bind(function () {
                                this.width = e.width(this.predefinedWidth)
                            }, this)), t.doLayoutAsync()), this.height < this.predefinedHeight && (this.layout(m.bind(function () {
                                this.height = e.height(this.predefinedHeight), this.recalculateStreamHeight()
                            }, this)), t.doLayoutAsync())
                        }, this)), this.setNarrow().then(m.bind(function () {
                            this.sandbox.onresize(m.bind(this.handleResize, this))
                        }, this))
                    }, this)), i
                },
                render: function (e, n) {
                    return !this.preview && !this.widgetId ? (this.completeResolver.reject(400), this.completed()) : (this.staticTimeline ? this.rendered().then(m.bind(function (e) {
                        this.layout(m.bind(function () {
                            e.height(this.height = this.element.offsetHeight)
                        }, this)), t.doLayoutAsync()
                    }, this)) : this.rendered().then(m.bind(function () {
                        this.recalculateStreamHeight(), t.doLayoutAsync()
                    }, this)), this.preview ? this.getPreviewTimeline() : this.getTimeline(), n && this.completed().then(n), this.completed())
                },
                getPreviewTimeline: function () {
                    u.timelinePreview({
                        success: m.bind(function (e) {
                            this.ready().then(m.bind(function () {
                                this.element = this.create(e), this.readTranslations(), this.bindInteractions(), this.updateCursors(e.headers, {
                                    initial: !0
                                }), t.doLayoutAsync()
                            }, this))
                        }, this),
                        error: function (e) {
                            if (!e || !e.headers) {
                                this.completeResolver.fulfill(this.srcEl);
                                return
                            }
                            this.completeResolver.reject(e.headers.status)
                        },
                        params: this.preview
                    })
                },
                getTimeline: function () {
                    a.initPostLogging(), u.timeline(m.aug({
                        id: this.widgetId,
                        instanceId: this.instanceId,
                        dnt: this.dnt,
                        lang: this.lang,
                        success: m.bind(function (e) {
                            this.ready().then(m.bind(function () {
                                this.element = this.create(e), this.readTranslations(), this.bindInteractions(), this.updateTimeStamps(), this.updateCursors(e.headers, {
                                    initial: !0
                                }), e.headers.xPolling && /\d/.test(e.headers.xPolling) && (this.pollInterval = e.headers.xPolling * 1e3), this.staticTimeline || this.schedulePolling(), t.doLayoutAsync()
                            }, this))
                        }, this),
                        error: function (e) {
                            if (!e || !e.headers) {
                                this.completeResolver.fulfill(this.srcEl);
                                return
                            }
                            this.completeResolver.reject(e.headers.status)
                        }
                    }, this.override))
                },
                reconfigure: function (e) {
                    this.lang = e.lang, this.theme || (this.theme = e.theme), this.theme == "dark" && this.classAttr.push("thm-dark"), this.chromeless && this.classAttr.push("var-chromeless"), this.borderless && this.classAttr.push("var-borderless"), this.headerless && this.classAttr.push("var-headerless"), this.footerless && this.classAttr.push("var-footerless"), this.staticTimeline && this.classAttr.push("var-static"), !this.linkColor && e.linkColor && n.VALID_COLOR.test(e.linkColor) && (this.linkColor = RegExp.$1), !this.height && n.VALID_UNIT.test(e.height) && (this.height = RegExp.$1), this.height = Math.max(this.dimensions.MIN_HEIGHT, this.height ? this.height : this.dimensions.DEFAULT_HEIGHT), this.preview && this.classAttr.push("var-preview"), this.narrow = this.width <= this.dimensions.NARROW_WIDTH, this.narrow && this.classAttr.push("var-narrow"), this.addSiteStyles()
                },
                getTweetDetails: function (e) {
                    var t = b.one(k, e),
                        n, r = {},
                        i, s, o = 0;
                    n = t && t.children || [];
                    for (; i = n[o]; o++) s = b.one(_, i, "A"), m.aug(r, this.extractTweetScribeDetails(i));
                    return r
                },
                baseScribeData: function () {
                    return {
                        widget_id: this.widgetId,
                        widget_origin: o.url(),
                        client_version: w,
                        message: this.partner,
                        query: this.searchQuery,
                        profile_id: this.profileId
                    }
                },
                bindInteractions: function () {
                    var e = this,
                        t = this.element,
                        n = !0;
                    this.bindIntentHandlers(), g.delegate(t, "click", ".load-tweets", function (t) {
                        n && (n = !1, e.forceLoad(), g.stop(t))
                    }), g.delegate(t, "click", ".display-sensitive-image", function (n) {
                        e.showNSFW(b.ancestor("." + L, this, t)), g.stop(n)
                    }), g.delegate(t, "mouseover", "." + S, function () {
                        e.mouseOver = !0
                    }), g.delegate(t, "mouseout", "." + S, function () {
                        e.mouseOver = !1
                    }), g.delegate(t, "mouseover", "." + x, function () {
                        e.mouseOverNotifier = !0
                    }), g.delegate(t, "mouseout", "." + x, function () {
                        e.mouseOverNotifier = !1, window.setTimeout(function () {
                            e.hideNewTweetNotifier()
                        }, 3e3)
                    });
                    if (this.staticTimeline) return;
                    g.delegate(t, "click", "." + M, function (n) {
                        if (n.altKey || n.metaKey || n.shiftKey) return;
                        e.toggleExpando(b.ancestor("." + L, this, t)), g.stop(n)
                    }), g.delegate(t, "click", "A", function (e) {
                        g.stopPropagation(e)
                    }), g.delegate(t, "click", ".with-expansion", function (t) {
                        e.toggleExpando(this), g.stop(t)
                    }), g.delegate(t, "click", ".load-more", function () {
                        e.loadMore()
                    }), g.delegate(t, "click", "." + x, function () {
                        e.scrollToTop(), e.hideNewTweetNotifier(!0)
                    })
                },
                scrollToTop: function () {
                    var e = b.one(C, this.element, "DIV");
                    e.scrollTop = 0, e.focus()
                },
                update: function () {
                    var e = this,
                        t = b.one(k, this.element),
                        n = t && t.children[0],
                        r = n && n.getAttribute("data-tweet-id");
                    this.updateTimeStamps(), this.requestTweets(r, !0, function (t) {
                        t.childNodes.length > 0 && e.insertNewTweets(t)
                    })
                },
                loadMore: function () {
                    var e = this,
                        t = b.all(L, this.element, "LI").pop(),
                        n = t && t.getAttribute("data-tweet-id");
                    this.requestTweets(n, !1, function (t) {
                        var r = b.one(P, e.element, "P"),
                            i = t.childNodes[0];
                        r.style.cssText = "", i && i.getAttribute("data-tweet-id") == n && t.removeChild(i);
                        if (t.childNodes.length > 0) {
                            e.appendTweets(t);
                            return
                        }
                        y.add(e.element, "no-more"), r.focus()
                    })
                },
                forceLoad: function () {
                    var e = this,
                        t = !!b.all(k, this.element, "OL").length;
                    this.requestTweets(1, !0, function (n) {
                        n.childNodes.length && (e[t ? "insertNewTweets" : "appendTweets"](n), y.add(e.element, "has-tweets"))
                    })
                },
                schedulePolling: function (e) {
                    var t = this;
                    if (this.pollInterval === null) return;
                    e = twttr.widgets.poll || e || this.pollInterval || 1e4, e > -1 && window.setTimeout(function () {
                        this.isUpdating || t.update(), t.schedulePolling()
                    }, e)
                },
                updateCursors: function (e, t) {
                    (t || {}).initial ? (this.cursors.maxPosition = e.maxPosition, this.cursors.minPosition = e.minPosition) : (t || {}).newer ? this.cursors.maxPosition = e.maxPosition || this.cursors.maxPosition : this.cursors.minPosition = e.minPosition || this.cursors.minPosition
                },
                requestTweets: function (e, t, r) {
                    var i = this,
                        s = {
                            id: this.widgetId,
                            instanceId: this.instanceId,
                            screenName: this.widgetScreenName,
                            userId: this.widgetUserId,
                            withReplies: this.widgetShowReplies,
                            dnt: this.dnt,
                            lang: this.lang
                        };
                    t && this.cursors.maxPosition ? s.minPosition = this.cursors.maxPosition : !t && this.cursors.minPosition ? s.maxPosition = this.cursors.minPosition : t ? s.sinceId = e : s.maxId = e, s.complete = function () {
                        this.isUpdating = !1
                    }, s.error = function (e) {
                        if (e && e.headers) {
                            if (e.headers.status == "404") {
                                i.pollInterval = null;
                                return
                            }
                            if (e.headers.status == "503") {
                                i.pollInterval *= 1.5;
                                return
                            }
                        }
                    }, s.success = function (e) {
                        var s = i.sandbox.createDocumentFragment(),
                            o = i.sandbox.createElement("div"),
                            u, f = [],
                            l, c;
                        i.updateCursors(e.headers, {
                            newer: t
                        }), e && e.headers && e.headers.xPolling && /\d+/.test(e.headers.xPolling) && (i.pollInterval = e.headers.xPolling * 1e3);
                        if (e && e.body !== undefined) {
                            o.innerHTML = e.body;
                            if (o.children[0] && o.children[0].tagName != "LI") return;
                            l = i.getTweetDetails(o);
                            for (c in l) l.hasOwnProperty(c) && f.push(c);
                            f.length && (u = i.baseScribeData(), u.item_ids = f, u.item_details = l, u.event_initiator = t ? E.CLIENT_SIDE_APP : E.CLIENT_SIDE_USER, this.timelineType && a.enqueue({
                                page: this.timelineType + "_timeline",
                                component: "timeline",
                                element: "initial",
                                action: f.length ? "results" : "no_results"
                            }, u, !0, this.dnt), a.enqueue({
                                page: "timeline",
                                component: "timeline",
                                element: t ? "newer" : "older",
                                action: "results"
                            }, u, !0, i.dnt), a.flush()), n.retinize(o), i.constrainMedia(o);
                            while (o.children[0]) s.appendChild(o.children[0]);
                            r(s)
                        }
                    }, u.timelinePoll(m.aug(s, this.override))
                },
                insertNewTweets: function (e) {
                    var t = this,
                        n = b.one(C, this.element, "DIV"),
                        r = b.one(k, n, "OL"),
                        i = r.offsetHeight,
                        o;
                    r.insertBefore(e, r.firstChild), o = r.offsetHeight - i;
                    if (n.scrollTop > 40 || this.mouseIsOver()) {
                        n.scrollTop = n.scrollTop + o, this.updateTimeStamps(), this.showNewTweetNotifier();
                        return
                    }
                    y.remove(this.element, H), r.style.cssText = "margin-top: -" + o + "px", window.setTimeout(function () {
                        n.scrollTop = 0, y.add(t.element, H), c.cssTransitions() ? r.style.cssText = "" : s.animate(function (e) {
                            e < o ? r.style.cssText = "margin-top: -" + (o - e) + "px" : r.style.cssText = ""
                        }, o, 500, s.easeOut)
                    }, 500), this.updateTimeStamps(), this.timelineType != "custom" && this.gcTweets(50)
                },
                appendTweets: function (e) {
                    var t = b.one(C, this.element, "DIV"),
                        n = b.one(k, t, "OL");
                    n.appendChild(e), this.updateTimeStamps()
                },
                gcTweets: function (e) {
                    var t = b.one(k, this.element, "OL"),
                        n = t.children.length,
                        r;
                    e = e || 50;
                    for (; n > e && (r = t.children[n - 1]); n--) t.removeChild(r)
                },
                showNewTweetNotifier: function () {
                    var e = this,
                        t = b.one(x, this.element, "DIV"),
                        n = t.children[0];
                    t.style.cssText = "", t.removeChild(n), t.appendChild(n), y.add(this.element, j), window.setTimeout(function () {
                        y.add(e.element, B)
                    }, 10), this.newNoticeDisplayTime = +(new Date), window.setTimeout(function () {
                        e.hideNewTweetNotifier()
                    }, 5e3)
                },
                hideNewTweetNotifier: function (e) {
                    var t = this;
                    if (!e && this.mouseOverNotifier) return;
                    y.remove(this.element, B), window.setTimeout(function () {
                        y.remove(t.element, j)
                    }, 500)
                },
                augmentWidgets: function (e) {
                    var t = b.one(D, e, "A");
                    if (!t) return;
                    t.setAttribute("data-related", this.related), t.setAttribute("data-partner", this.partner), t.setAttribute("data-dnt", this.dnt), t.setAttribute("data-search-query", this.searchQuery), t.setAttribute("data-profile-id", this.profileId), this.width < 250 && t.setAttribute("data-show-screen-name", "false"), twttr.widgets.load(t.parentNode)
                },
                discardStaticOverflow: function (e) {
                    var t = b.one(k, e, "OL"),
                        n;
                    if (this.staticTimeline) {
                        this.height = 0;
                        while (n = t.children[this.tweetLimit]) t.removeChild(n)
                    }
                },
                hideStreamScrollBar: function () {
                    var e = b.one(C, this.element, "DIV"),
                        t = b.one(k, this.element, "OL"),
                        n;
                    e.style.width = "", n = this.element.offsetWidth - t.offsetWidth, n > 0 && (e.style.width = this.element.offsetWidth + n + "px")
                },
                readTranslations: function () {
                    var e = this.element,
                        t = "data-dt-";
                    this.datetime = new r(m.compact({
                        phrases: {
                            now: e.getAttribute(t + "now"),
                            s: e.getAttribute(t + "s"),
                            m: e.getAttribute(t + "m"),
                            h: e.getAttribute(t + "h"),
                            second: e.getAttribute(t + "second"),
                            seconds: e.getAttribute(t + "seconds"),
                            minute: e.getAttribute(t + "minute"),
                            minutes: e.getAttribute(t + "minutes"),
                            hour: e.getAttribute(t + "hour"),
                            hours: e.getAttribute(t + "hours")
                        },
                        months: e.getAttribute(t + "months").split("|"),
                        formats: {
                            abbr: e.getAttribute(t + "abbr"),
                            shortdate: e.getAttribute(t + "short"),
                            longdate: e.getAttribute(t + "long")
                        }
                    }))
                },
                updateTimeStamps: function () {
                    var e = b.all(_, this.element, "A"),
                        t, n, r = 0,
                        i, s;
                    for (; t = e[r]; r++) {
                        i = t.getAttribute("data-datetime"), s = i && this.datetime.timeAgo(i, this.i18n), n = t.getElementsByTagName("TIME")[0];
                        if (!s) continue;
                        if (n && n.innerHTML) {
                            n.innerHTML = s;
                            continue
                        }
                        t.innerHTML = s
                    }
                },
                mouseIsOver: function () {
                    return this.mouseOver
                },
                addUrlParams: function (e) {
                    var t = this,
                        n = {
                            tw_w: this.widgetId,
                            related: this.related,
                            partner: this.partner,
                            query: this.searchQuery,
                            profile_id: this.profileId,
                            original_referer: o.url(),
                            tw_p: "embeddedtimeline"
                        };
                    return this.addUrlParams = f(n, function (e) {
                        var n = b.ancestor("." + L, e, t.element);
                        return n && {
                            tw_i: n.getAttribute("data-tweet-id")
                        }
                    }), this.addUrlParams(e)
                },
                showNSFW: function (e) {
                    var t = b.one("nsfw", e, "DIV"),
                        r, i, s = 0,
                        o, u, a, f;
                    if (!t) return;
                    i = n.scaleDimensions(t.getAttribute("data-width"), t.getAttribute("data-height"), this.contentWidth(), t.getAttribute("data-height")), r = !!(u = t.getAttribute("data-player")), r ? a = this.sandbox.createElement("iframe") : (a = this.sandbox.createElement("img"), u = t.getAttribute(c.retina() ? "data-image-2x" : "data-image"), a.alt = t.getAttribute("data-alt"), f = this.sandbox.createElement("a"), f.href = t.getAttribute("data-href"), f.appendChild(a)), a.title = t.getAttribute("data-title"), a.src = u, a.width = i.width, a.height = i.height, o = b.ancestor("." + O, t, e), s = i.height - t.offsetHeight, t.parentNode.replaceChild(r ? a : f, t), o.style.cssText = "height:" + (o.offsetHeight + s) + "px"
                },
                toggleExpando: function (e) {
                    var r = b.one(O, e, "DIV"),
                        i = r && r.children[0],
                        s = i && i.getAttribute("data-expanded-media"),
                        o, u = 0,
                        a = b.one(M, e, "A"),
                        f = a && a.getElementsByTagName("B")[0],
                        l = f && (f.innerText || f.textContent),
                        c;
                    if (!f) return;
                    this.layout(function () {
                        f.innerHTML = a.getAttribute("data-toggled-text"), a.setAttribute("data-toggled-text", l)
                    });
                    if (y.present(e, A)) {
                        this.layout(function () {
                            y.remove(e, A)
                        });
                        if (!r) {
                            t.doLayout();
                            return
                        }
                        this.layout(function () {
                            r.style.cssText = "", i.innerHTML = ""
                        }), t.doLayout();
                        return
                    }
                    s && (o = this.sandbox.createElement("DIV"), o.innerHTML = s, n.retinize(o), u = this.constrainMedia(o), this.layout(function () {
                        i.appendChild(o)
                    })), r && this.layout(function () {
                        c = Math.max(i.offsetHeight, u), r.style.cssText = "height:" + c + "px"
                    }), this.layout(function () {
                        y.add(e, A)
                    }), t.doLayout()
                },
                recalculateStreamHeight: function (e) {
                    var t = b.one(T, this.element, "DIV"),
                        n = b.one(N, this.element, "DIV"),
                        r = b.one(C, this.element, "DIV");
                    this.layout(m.bind(function () {
                        var i = t.offsetHeight + (n ? n.offsetHeight : 0),
                            s = e || this.sandbox.height();
                        r.style.cssText = "height:" + (s - i - 2) + "px", this.noscrollbar && this.hideStreamScrollBar()
                    }, this))
                },
                handleResize: function (e, n) {
                    var r = Math.min(this.dimensions.DEFAULT_WIDTH, Math.max(this.dimensions.MIN_WIDTH, Math.min(this.predefinedWidth || this.dimensions.DEFAULT_WIDTH, e)));
                    if (r == this.width && n == this.height) return;
                    this.width = r, this.height = n, this.setNarrow(), this.constrainMedia(this.element, this.contentWidth(r)), this.staticTimeline ? this.layout(m.bind(function () {
                        this.height = this.element.offsetHeight, this.sandbox.height(this.height)
                    }, this)) : this.recalculateStreamHeight(n), t.doLayoutAsync()
                }
            }), e(I)
        })
    });
    provide("tfw/widget/embed", function (e) {
        using("tfw/widget/base", "tfw/widget/syndicatedbase", "util/datetime", "tfw/util/params", "dom/classname", "dom/get", "util/env", "util/promise", "util/util", "util/throttle", "util/twitter", "tfw/util/article", "tfw/util/data", "tfw/util/tracking", function (t, n, r, i, s, o, u, a, f, l, c, h, p, d) {
            function w(e, t, n, r) {
                var i = o.one("subject", e, "BLOCKQUOTE"),
                    s = o.one("reply", e, "BLOCKQUOTE"),
                    u = i && i.getAttribute("data-tweet-id"),
                    a = s && s.getAttribute("data-tweet-id"),
                    l = {},
                    c = {};
                if (!u) return;
                l[u] = {
                    item_type: 0
                }, d.enqueue({
                    page: "tweet",
                    section: "subject",
                    component: "tweet",
                    action: "results"
                }, f.aug({}, t, {
                    item_ids: [u],
                    item_details: l
                }), !0, r);
                if (!a) return;
                c[a] = {
                    item_type: 0
                }, d.enqueue({
                    page: "tweet",
                    section: "conversation",
                    component: "tweet",
                    action: "results"
                }, f.aug({}, t, {
                    item_ids: [a],
                    item_details: c,
                    associations: {
                        4: {
                            association_id: u,
                            association_type: 4
                        }
                    }
                }), !0, r)
            }

            function E(e, t, n) {
                var r = {};
                if (!e) return;
                r[e] = {
                    item_type: 0
                }, d.enqueue({
                    page: "tweet",
                    section: "subject",
                    component: "rawembedcode",
                    action: "no_results"
                }, {
                    client_version: v,
                    widget_origin: h.url(),
                    widget_frame: h.frameUrl(),
                    message: t,
                    item_ids: [e],
                    item_details: r
                }, !0, n)
            }

            function S(e, t, n, r) {
                g[e] = g[e] || [], g[e].push({
                    s: n,
                    f: r,
                    lang: t
                })
            }

            function x() {
                b.length && twttr.widgets.load(b)
            }

            function T(e) {
                if (!e) return;
                var t, r, i;
                n.apply(this, [e]), t = this.params(), r = this.srcEl && this.srcEl.getElementsByTagName("A"), i = r && r[r.length - 1], this.hideThread = (t.conversation || this.dataAttr("conversation")) == "none" || ~f.indexOf(this.classAttr, "tw-hide-thread"), this.hideCard = (t.cards || this.dataAttr("cards")) == "hidden" || ~f.indexOf(this.classAttr, "tw-hide-media");
                if ((t.align || this.attr("align")) == "left" || ~f.indexOf(this.classAttr, "tw-align-left")) this.align = "left";
                else if ((t.align || this.attr("align")) == "right" || ~f.indexOf(this.classAttr, "tw-align-right")) this.align = "right";
                else if ((t.align || this.attr("align")) == "center" || ~f.indexOf(this.classAttr, "tw-align-center")) this.align = "center", this.containerWidth > this.dimensions.MIN_WIDTH * (1 / .7) && this.width > this.containerWidth * .7 && (this.width = this.containerWidth * .7);
                this.narrow = t.narrow || this.width <= this.dimensions.NARROW_WIDTH, this.narrow && this.classAttr.push("var-narrow"), this.tweetId = t.tweetId || i && c.status(i.href)
            }
            var v = "2.0",
                m = "tweetembed",
                g = {},
                y = [],
                b = [];
            T.prototype = new n, f.aug(T.prototype, {
                renderedClassNames: "twitter-tweet twitter-tweet-rendered",
                dimensions: {
                    DEFAULT_HEIGHT: "0",
                    DEFAULT_WIDTH: "500",
                    NARROW_WIDTH: "350",
                    MIN_WIDTH: "220",
                    MIN_HEIGHT: "0",
                    WIDE_MEDIA_PADDING: 32,
                    NARROW_MEDIA_PADDING: 32
                },
                create: function (e) {
                    var t = this.sandbox.createElement("div"),
                        r, i;
                    t.innerHTML = e, r = t.children[0] || !1;
                    if (!r) return;
                    return this.theme == "dark" && this.classAttr.push("thm-dark"), this.linkColor && this.addSiteStyles(), s.present(r, "media-forward") && (this.fullBleedPhoto = !0), this.augmentWidgets(r), n.retinize(r), r.id = this.id, r.className += " " + this.classAttr.join(" "), r.lang = this.lang, this.sandbox.setTitle(r.getAttribute("data-iframe-title") || "Tweet"), this.sandbox.appendChild(r).then(f.bind(function () {
                        this.renderResolver.fulfill(this.sandbox)
                    }, this)), this.sandbox.style({
                        cssText: "",
                        display: "block",
                        maxWidth: "99%",
                        minWidth: this.dimensions.MIN_WIDTH + "px",
                        padding: "0",
                        borderRadius: "5px",
                        margin: "10px 0",
                        border: "#ddd 1px solid",
                        borderTopColor: "#eee",
                        borderBottomColor: "#bbb",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                        position: "absolute",
                        visibility: "hidden"
                    }), i = this.layout(f.bind(function () {
                        this.predefinedWidth = this.width, this.width = this.sandbox.width(this.width), this.collapseRegions()
                    }, this), "Insert Sandbox"), i.then(f.bind(function () {
                        this.constrainMedia(r, this.contentWidth(this.width)), this.setNarrow().then(f.bind(function () {
                            this.layout(f.bind(function () {
                                this.completeResolver.fulfill(this.sandbox.element())
                            }, this))
                        }, this))
                    }, this)), w(r, this.baseScribeData(), this.partner, this.dnt), r
                },
                render: function (e, n) {
                    var r = "",
                        i = this.tweetId;
                    return i ? (this.hideCard && (r += "c"), this.hideThread && (r += "t"), r && (i += "-" + r), this.rendered().then(f.bind(function (e) {
                        this.srcEl && this.srcEl.parentNode && this.layout(f.bind(function () {
                            this.srcEl && this.srcEl.parentNode && this.srcEl.parentNode.removeChild(this.srcEl)
                        }, this), "Remove Embed Code"), this.align == "center" ? e.style({
                            margin: "7px auto",
                            cssFloat: "none"
                        }) : this.align && (this.width == this.dimensions.DEFAULT_WIDTH && (this.predefinedWidth = this.width = this.dimensions.NARROW_WIDTH), e.style({
                            cssFloat: this.align
                        })), this.layout(f.bind(function () {
                            this.height = this.sandbox.height(this.element.offsetHeight)
                        }, this)).then(f.bind(function () {
                            return t.doLayoutAsync(), this.layout(f.bind(function () {
                                this.height = this.sandbox.height(this.element.offsetHeight)
                            }, this))
                        }, this)).then(f.bind(function () {
                            e.onresize(f.bind(this.handleResize, this))
                        }, this)), e.style({
                            position: "static",
                            visibility: "visible"
                        }), t.doLayoutAsync()
                    }, this)), S(i, this.lang, f.bind(function (n) {
                        this.ready().then(f.bind(function () {
                            this.element = this.create(n), this.readTimestampTranslations(), this.updateTimeStamps(), this.bindIntentHandlers(), t.doLayoutAsync()
                        }, this))
                    }, this), f.bind(function () {
                        E(this.tweetId, this.partner, this.dnt), this.completeResolver.fulfill(this.srcEl)
                    }, this)), y.push(this.rendered()), n && this.completed().then(n), this.completed()) : (this.completeResolver.fulfill(this.srcEl), this.completed())
                },
                augmentWidgets: function (e) {
                    var t = o.one("twitter-follow-button", e, "A");
                    if (!t) return;
                    t.setAttribute("data-related", this.related), t.setAttribute("data-partner", this.partner), t.setAttribute("data-dnt", this.dnt), t.setAttribute("data-show-screen-name", "false"), b.push(t.parentNode)
                },
                addUrlParams: function (e) {
                    var t = this,
                        n = {
                            related: this.related,
                            partner: this.partner,
                            original_referer: h.url(),
                            tw_p: m
                        };
                    return this.addUrlParams = i(n, function (e) {
                        var n = o.ancestor(".tweet", e, t.element);
                        return {
                            tw_i: n.getAttribute("data-tweet-id")
                        }
                    }), this.addUrlParams(e)
                },
                baseScribeData: function () {
                    return {
                        client_version: v,
                        widget_origin: h.url(),
                        widget_frame: h.frameUrl(),
                        message: this.partner
                    }
                },
                handleResize: function (e) {
                    var n = Math.min(this.dimensions.DEFAULT_WIDTH, Math.max(this.dimensions.MIN_WIDTH, Math.min(this.predefinedWidth || this.dimensions.DEFAULT_WIDTH, e)));
                    if (n == this.width) return;
                    this.width = n, this.setNarrow(), this.constrainMedia(this.element, this.contentWidth(n)), this.collapseRegions(), this.layout(f.bind(function () {
                        this.height = this.element.offsetHeight, this.sandbox.height(this.height)
                    }, this), "Embed Resize"), t.doLayoutAsync()
                },
                readTimestampTranslations: function () {
                    var e = this.element,
                        t = "data-dt-",
                        n = e.getAttribute(t + "months") || "";
                    this.datetime = new r(f.compact({
                        phrases: {
                            AM: e.getAttribute(t + "am"),
                            PM: e.getAttribute(t + "pm")
                        },
                        months: n.split("|"),
                        formats: {
                            full: e.getAttribute(t + "full")
                        }
                    }))
                },
                updateTimeStamps: function () {
                    var e = o.one("long-permalink", this.element, "A"),
                        n = e.getAttribute("data-datetime"),
                        r = n && this.datetime.localTimeStamp(n),
                        i = e.getElementsByTagName("TIME")[0];
                    if (!r) return;
                    this.layout(function () {
                        if (i && i.innerHTML) {
                            i.innerHTML = r;
                            return
                        }
                        e.innerHTML = r
                    }, "Update Timestamp"), t.doLayoutAsync()
                }
            }), T.fetchAndRender = function () {
                var e = g,
                    n = [],
                    r, i;
                g = {};
                if (e.keys) n = e.keys();
                else
                    for (r in e) e.hasOwnProperty(r) && n.push(r); if (!n.length) return;
                d.initPostLogging(), i = e[n[0]][0].lang, p.tweets({
                    ids: n.sort(),
                    lang: i,
                    complete: function (n) {
                        f.forIn(n, function (t, n) {
                            var r = e[t];
                            f.forEach(r, function (e) {
                                e.s && e.s.call(this, n)
                            }), delete e[t]
                        }), t.doLayout(), f.forIn(e, function (e, t) {
                            f.forEach(t, function (t) {
                                t.f && t.f.call(this, e)
                            })
                        }), t.doLayout()
                    }
                }), a.every.apply(null, y).then(function () {
                    x(), d.flush()
                })
            }, t.afterLoad(T.fetchAndRender), e(T)
        })
    });
    provide("dom/textsize", function (e) {
        function n(e, t, n) {
            var r = [],
                i = 0,
                s;
            for (; s = n[i]; i++) r.push(s[0]), r.push(s[1]);
            return e + t + r.join(":")
        }

        function r(e) {
            var t = e || "";
            return t.replace(/([A-Z])/g, function (e) {
                return "-" + e.toLowerCase()
            })
        }
        var t = {};
        e(function (e, i, s) {
            var o = document.createElement("span"),
                u = {},
                a = "",
                f, l = 0,
                c = 0,
                h = [];
            s = s || [], i = i || "", a = n(e, i, s);
            if (t[a]) return t[a];
            o.className = i + " twitter-measurement";
            try {
                for (; f = s[l]; l++) o.style[f[0]] = f[1]
            } catch (p) {
                for (; f = s[c]; c++) h.push(r(f[0]) + ":" + f[1]);
                o.setAttribute("style", h.join(";") + ";")
            }
            return o.innerHTML = e, document.body.appendChild(o), u.width = o.clientWidth || o.offsetWidth, u.height = o.clientHeight || o.offsetHeight, document.body.removeChild(o), delete o, t[a] = u
        })
    });
    provide("tfw/widget/follow", function (e) {
        using("util/util", "tfw/widget/base", "util/querystring", "util/uri", "util/twitter", "util/promise", "dom/textsize", function (t, n, r, i, s, o, u) {
            function a(e) {
                if (!e) return;
                var t, r, i, o;
                n.apply(this, [e]), t = this.params(), r = t.size || this.dataAttr("size"), i = t.showScreenName || this.dataAttr("show-screen-name"), o = t.count || this.dataAttr("count"), this.classAttr.push("twitter-follow-button"), this.showScreenName = i != "false", this.showCount = t.showCount !== !1 && this.dataAttr("show-count") != "false", o == "none" && (this.showCount = !1), this.explicitWidth = t.width || this.dataAttr("width") || "", this.screenName = t.screen_name || t.screenName || s.screenName(this.attr("href")), this.preview = t.preview || this.dataAttr("preview") || "", this.align = t.align || this.dataAttr("align") || "", this.size = r == "large" ? "l" : "m"
            }
            a.prototype = new n, t.aug(a.prototype, {
                parameters: function () {
                    var e = {
                        screen_name: this.screenName,
                        lang: this.lang,
                        show_count: this.showCount,
                        show_screen_name: this.showScreenName,
                        align: this.align,
                        id: this.id,
                        preview: this.preview,
                        size: this.size,
                        partner: this.partner,
                        dnt: this.dnt,
                        _: +(new Date)
                    };
                    return t.compact(e), r.encode(e)
                },
                width: function () {
                    if (this.calculatedWidth) return this.calculatedWidth;
                    if (this.explicitWidth) return this.explicitWidth;
                    var e = {
                            cnt: 13,
                            btn: 24,
                            xlcnt: 22,
                            xlbtn: 38
                        },
                        n = this.showScreenName ? "Follow %{screen_name}" : "Follow",
                        r = this._(n, {
                            screen_name: "@" + this.screenName
                        }),
                        i = ~t.indexOf(["ja", "ko"], this.lang) ? this._("10k unit") : this._("M"),
                        s = this._("%{followers_count} followers", {
                            followers_count: "88888" + i
                        }),
                        o = 0,
                        a = 0,
                        f, l, c = this.styles.base;
                    return this.size == "l" ? (c = c.concat(this.styles.large), f = e.xlbtn, l = e.xlcnt) : (f = e.btn, l = e.cnt), this.showCount && (a = u(s, "", c).width + l), o = u(r, "", c.concat(this.styles.button)).width + f, this.calculatedWidth = o + a
                },
                render: function (e, n) {
                    if (!this.screenName) return o.reject("Missing Screen Name").then(n);
                    var r = twttr.widgets.config.assetUrl() + "/widgets/follow_button.1401325387.html#" + this.parameters(),
                        i = this.create(r, this.dimensions(), {
                            title: this._("Twitter Follow Button")
                        }).then(t.bind(function (e) {
                            return this.element = e
                        }, this));
                    return n && i.then(n), i
                }
            }), e(a)
        })
    });
    provide("tfw/widget/tweetbutton", function (e) {
        using("tfw/widget/base", "tfw/util/globals", "util/util", "util/querystring", "util/uri", "util/twitter", "util/typevalidator", "dom/textsize", function (t, n, r, i, s, o, u, a) {
            function p(e) {
                t.apply(this, [e]);
                var i = this.params(),
                    u = i.count || this.dataAttr("count"),
                    a = i.size || this.dataAttr("size"),
                    p = s.getScreenNameFromPage(),
                    d = "" + (i.shareWithRetweet || this.dataAttr("share-with-retweet") || n.val("share-with-retweet"));
                this.classAttr.push("twitter-tweet-button"), i.type == "hashtag" || ~r.indexOf(this.classAttr, "twitter-hashtag-button") ? (this.type = "hashtag", this.classAttr.push("twitter-hashtag-button")) : i.type == "mention" || ~r.indexOf(this.classAttr, "twitter-mention-button") ? (this.type = "mention", this.classAttr.push("twitter-mention-button")) : this.classAttr.push("twitter-share-button"), this.text = i.text || this.dataAttr("text"), this.text && /\+/.test(this.text) && !/ /.test(this.text) && (this.text = this.text.replace(/\+/g, " ")), this.counturl = i.counturl || this.dataAttr("counturl"), this.searchlink = i.searchlink || this.dataAttr("searchlink"), this.button_hashtag = o.hashTag(i.button_hashtag || i.hashtag || this.dataAttr("button-hashtag"), !1), this.size = a == "large" ? "l" : "m", this.align = i.align || this.dataAttr("align") || "", this.via = i.via || this.dataAttr("via"), this.hashtags = i.hashtags || this.dataAttr("hashtags"), this.screen_name = o.screenName(i.screen_name || i.screenName || this.dataAttr("button-screen-name")), this.url = i.url || this.dataAttr("url"), this.type ? (this.count = "none", this.shareWithRetweet = "never", p && (this.related = this.related ? p + "," + this.related : p)) : (this.text = this.text || f, this.url = this.url || s.getCanonicalURL() || l, this.count = ~r.indexOf(c, u) ? u : "horizontal", this.count = this.count == "vertical" && this.size == "l" ? "none" : this.count, this.via = this.via || p, d && ~r.indexOf(h, d) && (this.shareWithRetweet = d.replace("-", "_")))
            }
            var f = document.title,
                l = encodeURI(location.href),
                c = ["vertical", "horizontal", "none"],
                h = [, "never", "publisher-first", "publisher-only", "author-first", "author-only"];
            p.prototype = new t, r.aug(p.prototype, {
                widgetUrlParams: function () {
                    return r.compact({
                        text: this.text,
                        url: this.url,
                        via: this.via,
                        related: this.related,
                        count: this.count,
                        lang: this.lang,
                        counturl: this.counturl,
                        searchlink: this.searchlink,
                        placeid: this.placeid,
                        original_referer: location.href,
                        id: this.id,
                        size: this.size,
                        type: this.type,
                        screen_name: this.screen_name,
                        share_with_retweet: this.shareWithRetweet,
                        button_hashtag: this.button_hashtag,
                        hashtags: this.hashtags,
                        align: this.align,
                        partner: this.partner,
                        dnt: this.dnt,
                        _: +(new Date)
                    })
                },
                parameters: function () {
                    return i.encode(this.widgetUrlParams())
                },
                height: function () {
                    return this.count == "vertical" ? 62 : this.size == "m" ? 20 : 28
                },
                width: function () {
                    var e = {
                            ver: 8,
                            cnt: 14,
                            btn: 24,
                            xlcnt: 18,
                            xlbtn: 38
                        },
                        t = this.count == "vertical",
                        n = this.type == "hashtag" && this.button_hashtag ? "Tweet %{hashtag}" : this.type == "mention" && this.screen_name ? "Tweet to %{name}" : "Tweet",
                        i = this._(n, {
                            name: "@" + this.screen_name,
                            hashtag: "#" + this.button_hashtag
                        }),
                        s = this._("K"),
                        o = this._("100K+"),
                        u = (t ? "8888" : "88888") + s,
                        f = 0,
                        l = 0,
                        c = 0,
                        h = 0,
                        p = this.styles.base,
                        d = p;
                    return~ r.indexOf(["ja", "ko"], this.lang) ? u += this._("10k unit") : u = u.length > o.length ? u : o, t ? (d = p.concat(this.styles.vbubble), h = e.ver, c = e.btn) : this.size == "l" ? (p = d = p.concat(this.styles.large), c = e.xlbtn, h = e.xlcnt) : (c = e.btn, h = e.cnt), this.count != "none" && (l = a(u, "", d).width + h), f = a(i, "", p.concat(this.styles.button)).width + c, t ? f > l ? f : l : this.calculatedWidth = f + l
                },
                render: function (e, t) {
                    var n = twttr.widgets.config.assetUrl() + "/widgets/tweet_button.1401325387.html#" + this.parameters(),
                        i;
                    return this.count && this.classAttr.push("twitter-count-" + this.count), i = this.create(n, this.dimensions(), {
                        title: this._("Twitter Tweet Button")
                    }).then(r.bind(function (e) {
                        return this.element = e
                    }, this)), t && i.then(t), i
                }
            }), e(p)
        })
    });
    provide("tfw/factories", function (e) {
        using("util/util", "util/promise", "util/twitter", "tfw/widget/base", "tfw/widget/tweetbutton", "tfw/widget/follow", "tfw/widget/embed", "tfw/widget/timeline", function (t, n, r, i, s, o, u, a) {
            function f(e, r, s, o) {
                return e = e || [], s = s || {},
                    function () {
                        var u, a, f, l = Array.prototype.slice.apply(arguments, [0, e.length]),
                            c = Array.prototype.slice.apply(arguments, [e.length]),
                            h;
                        return t.forEach(c, function (e) {
                            if (!e) return;
                            if (e.nodeType === 1) {
                                f = e;
                                return
                            }
                            if (t.isType("function", e)) {
                                u = e;
                                return
                            }
                            t.isType("object", e) && (a = e)
                        }), l.length != e.length || c.length === 0 ? (u && t.async(function () {
                            u(!1)
                        }), n.reject("Not enough parameters")) : f ? (a = t.aug(a || {}, s), a.targetEl = f, t.forEach(e, function (e) {
                            a[e] = l.shift()
                        }), h = new r(a), i.doLayout(), h.render(twttr.widgets.config), o && o(), u && h.completed().then(u, function () {
                            u(!1)
                        }), h.completed()) : (u && t.async(function () {
                            u(!1)
                        }), n.reject("No target specified"))
                    }
            }

            function l(e) {
                var n;
                e.linkColor = e.linkColor || e.previewParams.link_color, e.theme = e.theme || e.previewParams.theme, e.height = e.height || e.previewParams.height, n = new a(e), this.render = t.bind(n.render, n), this.completed = t.bind(n.completed, n)
            }
            var c = f(["url"], s, {
                    type: "share"
                }),
                h = f(["hashtag"], s, {
                    type: "hashtag"
                }),
                p = f(["screenName"], s, {
                    type: "mention"
                }),
                d = f(["screenName"], o),
                v = f(["tweetId"], u, {}, u.fetchAndRender),
                m = f(["widgetId"], a),
                g = f(["previewParams"], l),
                y = {
                    createShareButton: c,
                    createMentionButton: p,
                    createHashtagButton: h,
                    createFollowButton: d,
                    createTweet: v,
                    createTweetEmbed: v,
                    createTimeline: m
                };
            r.isTwitterURL(window.location.href) && (y.createTimelinePreview = g), e(y)
        })
    });
    ! function () {
        window.twttr = window.twttr || {}, twttr.host = twttr.host || "platform.twitter.com", using("util/domready", "util/env", function (e, t) {
            function n(e) {
                return (e || !/^http\:$/.test(window.location.protocol)) && !twttr.ignoreSSL ? "https" : "http"
            }
            if (t.ie6()) return;
            if (twttr.widgets && twttr.widgets.loaded) return twttr.widgets.load(), !1;
            if (twttr.init) return !1;
            twttr.init = !0, twttr._e = twttr._e || [], twttr.ready = twttr.ready || function (e) {
                twttr.widgets && twttr.widgets.loaded ? e(twttr) : twttr._e.push(e)
            }, using.path.length || (using.path = n() + "://" + twttr.host + "/js"), twttr.ignoreSSL = twttr.ignoreSSL || !1;
            var r = [];
            twttr.events = {
                bind: function (e, t) {
                    return r.push([e, t])
                }
            }, e(function () {
                using("tfw/widget/base", "tfw/widget/follow", "tfw/widget/tweetbutton", "tfw/widget/embed", "tfw/widget/timeline", "tfw/widget/intent", "tfw/factories", "tfw/util/article", "util/events", "util/util", function (e, t, i, s, o, u, a, f, l, c) {
                    function v(e) {
                        var t = twttr.host;
                        return n(e) == "https" && twttr.secureHost && (t = twttr.secureHost), n(e) + "://" + t
                    }

                    function m() {
                        using("tfw/hub/client", function (e) {
                            twttr.events.hub = e.init(h), e.init(h, !0)
                        })
                    }
                    var h = {
                            widgets: {
                                "a.twitter-share-button": i,
                                "a.twitter-mention-button": i,
                                "a.twitter-hashtag-button": i,
                                "a.twitter-follow-button": t,
                                "blockquote.twitter-tweet": s,
                                "a.twitter-timeline": o,
                                "div.twitter-timeline": o,
                                body: u
                            }
                        },
                        p = twttr.events && twttr.events.hub ? twttr.events : {},
                        d;
                    h.assetUrl = v, twttr.widgets = twttr.widgets || {}, c.aug(twttr.widgets, a, {
                        config: {
                            assetUrl: v
                        },
                        load: function (t) {
                            e.init(h), e.embed(t), twttr.widgets.loaded = !0
                        }
                    }), c.aug(twttr.events, p, l.Emitter), d = twttr.events.bind, twttr.events.bind = function (e, t) {
                        m(), this.bind = d, this.bind(e, t)
                    }, c.forEach(r, function (e) {
                        twttr.events.bind(e[0], e[1])
                    }), c.forEach(twttr._e, function (e) {
                        c.async(function () {
                            e(twttr)
                        })
                    }), twttr.ready = function (e) {
                        c.async(function () {
                            e(twttr)
                        })
                    }, twttr.widgets.load()
                })
            })
        })
    }()
});
