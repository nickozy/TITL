/*! For license information please see gsap.js.LICENSE.txt */
!(function () {
  "use strict";
  function t(t) {
    if (void 0 === t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return t;
  }
  function e(t, e) {
    (t.prototype = Object.create(e.prototype)),
      (t.prototype.constructor = t),
      (t.__proto__ = e);
  }
  var r,
    i,
    n,
    s,
    a,
    o,
    u,
    h,
    f,
    l,
    c,
    p,
    _,
    d,
    m,
    g = {
      autoSleep: 120,
      force3D: "auto",
      nullTargetWarn: 1,
      units: { lineHeight: "" },
    },
    v = { duration: 0.5, overwrite: !1, delay: 0 },
    y = 1e8,
    T = 1e-8,
    x = 2 * Math.PI,
    w = x / 4,
    b = 0,
    M = Math.sqrt,
    O = Math.cos,
    k = Math.sin,
    A = function (t) {
      return "string" == typeof t;
    },
    C = function (t) {
      return "function" == typeof t;
    },
    D = function (t) {
      return "number" == typeof t;
    },
    E = function (t) {
      return void 0 === t;
    },
    P = function (t) {
      return "object" == typeof t;
    },
    S = function (t) {
      return !1 !== t;
    },
    R = function () {
      return "undefined" != typeof window;
    },
    z = function (t) {
      return C(t) || A(t);
    },
    F =
      ("function" == typeof ArrayBuffer && ArrayBuffer.isView) ||
      function () {},
    B = Array.isArray,
    L = /(?:-?\.?\d|\.)+/gi,
    I = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
    Y = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
    U = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
    X = /[+-]=-?[.\d]+/,
    N = /[^,'"\[\]\s]+/gi,
    q = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,
    V = {},
    j = {},
    G = function (t) {
      return (j = xt(t, V)) && Tr;
    },
    W = function (t, e) {
      return console.warn(
        "Invalid property",
        t,
        "set to",
        e,
        "Missing plugin? gsap.registerPlugin()"
      );
    },
    Q = function (t, e) {
      return !e && console.warn(t);
    },
    H = function (t, e) {
      return (t && (V[t] = e) && j && (j[t] = e)) || V;
    },
    Z = function () {
      return 0;
    },
    $ = { suppressEvents: !0, isStart: !0, kill: !1 },
    J = { suppressEvents: !0, kill: !1 },
    K = { suppressEvents: !0 },
    tt = {},
    et = [],
    rt = {},
    it = {},
    nt = {},
    st = 30,
    at = [],
    ot = "",
    ut = function (t) {
      var e,
        r,
        i = t[0];
      if ((P(i) || C(i) || (t = [t]), !(e = (i._gsap || {}).harness))) {
        for (r = at.length; r-- && !at[r].targetTest(i); );
        e = at[r];
      }
      for (r = t.length; r--; )
        (t[r] && (t[r]._gsap || (t[r]._gsap = new Fe(t[r], e)))) ||
          t.splice(r, 1);
      return t;
    },
    ht = function (t) {
      return t._gsap || ut(Jt(t))[0]._gsap;
    },
    ft = function (t, e, r) {
      return (r = t[e]) && C(r)
        ? t[e]()
        : (E(r) && t.getAttribute && t.getAttribute(e)) || r;
    },
    lt = function (t, e) {
      return (t = t.split(",")).forEach(e) || t;
    },
    ct = function (t) {
      return Math.round(1e5 * t) / 1e5 || 0;
    },
    pt = function (t) {
      return Math.round(1e7 * t) / 1e7 || 0;
    },
    _t = function (t, e) {
      var r = e.charAt(0),
        i = parseFloat(e.substr(2));
      return (
        (t = parseFloat(t)),
        "+" === r ? t + i : "-" === r ? t - i : "*" === r ? t * i : t / i
      );
    },
    dt = function (t, e) {
      for (var r = e.length, i = 0; t.indexOf(e[i]) < 0 && ++i < r; );
      return i < r;
    },
    mt = function () {
      var t,
        e,
        r = et.length,
        i = et.slice(0);
      for (rt = {}, et.length = 0, t = 0; t < r; t++)
        (e = i[t]) &&
          e._lazy &&
          (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0);
    },
    gt = function (t, e, r, n) {
      et.length && !i && mt(),
        t.render(e, r, n || (i && e < 0 && (t._initted || t._startAt))),
        et.length && !i && mt();
    },
    vt = function (t) {
      var e = parseFloat(t);
      return (e || 0 === e) && (t + "").match(N).length < 2
        ? e
        : A(t)
        ? t.trim()
        : t;
    },
    yt = function (t) {
      return t;
    },
    Tt = function (t, e) {
      for (var r in e) r in t || (t[r] = e[r]);
      return t;
    },
    xt = function (t, e) {
      for (var r in e) t[r] = e[r];
      return t;
    },
    wt = function t(e, r) {
      for (var i in r)
        "__proto__" !== i &&
          "constructor" !== i &&
          "prototype" !== i &&
          (e[i] = P(r[i]) ? t(e[i] || (e[i] = {}), r[i]) : r[i]);
      return e;
    },
    bt = function (t, e) {
      var r,
        i = {};
      for (r in t) r in e || (i[r] = t[r]);
      return i;
    },
    Mt = function (t) {
      var e,
        r = t.parent || s,
        i = t.keyframes
          ? ((e = B(t.keyframes)),
            function (t, r) {
              for (var i in r)
                i in t ||
                  ("duration" === i && e) ||
                  "ease" === i ||
                  (t[i] = r[i]);
            })
          : Tt;
      if (S(t.inherit))
        for (; r; ) i(t, r.vars.defaults), (r = r.parent || r._dp);
      return t;
    },
    Ot = function (t, e, r, i, n) {
      void 0 === r && (r = "_first"), void 0 === i && (i = "_last");
      var s,
        a = t[i];
      if (n) for (s = e[n]; a && a[n] > s; ) a = a._prev;
      return (
        a
          ? ((e._next = a._next), (a._next = e))
          : ((e._next = t[r]), (t[r] = e)),
        e._next ? (e._next._prev = e) : (t[i] = e),
        (e._prev = a),
        (e.parent = e._dp = t),
        e
      );
    },
    kt = function (t, e, r, i) {
      void 0 === r && (r = "_first"), void 0 === i && (i = "_last");
      var n = e._prev,
        s = e._next;
      n ? (n._next = s) : t[r] === e && (t[r] = s),
        s ? (s._prev = n) : t[i] === e && (t[i] = n),
        (e._next = e._prev = e.parent = null);
    },
    At = function (t, e) {
      t.parent && (!e || t.parent.autoRemoveChildren) && t.parent.remove(t),
        (t._act = 0);
    },
    Ct = function (t, e) {
      if (t && (!e || e._end > t._dur || e._start < 0))
        for (var r = t; r; ) (r._dirty = 1), (r = r.parent);
      return t;
    },
    Dt = function (t, e, r, n) {
      return (
        t._startAt &&
        (i
          ? t._startAt.revert(J)
          : (t.vars.immediateRender && !t.vars.autoRevert) ||
            t._startAt.render(e, !0, n))
      );
    },
    Et = function t(e) {
      return !e || (e._ts && t(e.parent));
    },
    Pt = function (t) {
      return t._repeat ? St(t._tTime, (t = t.duration() + t._rDelay)) * t : 0;
    },
    St = function (t, e) {
      var r = Math.floor((t /= e));
      return t && r === t ? r - 1 : r;
    },
    Rt = function (t, e) {
      return (
        (t - e._start) * e._ts +
        (e._ts >= 0 ? 0 : e._dirty ? e.totalDuration() : e._tDur)
      );
    },
    zt = function (t) {
      return (t._end = pt(
        t._start + (t._tDur / Math.abs(t._ts || t._rts || T) || 0)
      ));
    },
    Ft = function (t, e) {
      var r = t._dp;
      return (
        r &&
          r.smoothChildTiming &&
          t._ts &&
          ((t._start = pt(
            r._time -
              (t._ts > 0
                ? e / t._ts
                : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)
          )),
          zt(t),
          r._dirty || Ct(r, t)),
        t
      );
    },
    Bt = function (t, e) {
      var r;
      if (
        ((e._time || (e._initted && !e._dur)) &&
          ((r = Rt(t.rawTime(), e)),
          (!e._dur || Qt(0, e.totalDuration(), r) - e._tTime > T) &&
            e.render(r, !0)),
        Ct(t, e)._dp && t._initted && t._time >= t._dur && t._ts)
      ) {
        if (t._dur < t.duration())
          for (r = t; r._dp; )
            r.rawTime() >= 0 && r.totalTime(r._tTime), (r = r._dp);
        t._zTime = -1e-8;
      }
    },
    Lt = function (t, e, r, i) {
      return (
        e.parent && At(e),
        (e._start = pt(
          (D(r) ? r : r || t !== s ? jt(t, r, e) : t._time) + e._delay
        )),
        (e._end = pt(
          e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)
        )),
        Ot(t, e, "_first", "_last", t._sort ? "_start" : 0),
        Xt(e) || (t._recent = e),
        i || Bt(t, e),
        t._ts < 0 && Ft(t, t._tTime),
        t
      );
    },
    It = function (t, e) {
      return (
        (V.ScrollTrigger || W("scrollTrigger", e)) &&
        V.ScrollTrigger.create(e, t)
      );
    },
    Yt = function (t, e, r, n, s) {
      return (
        qe(t, e, s),
        t._initted
          ? !r &&
            t._pt &&
            !i &&
            ((t._dur && !1 !== t.vars.lazy) || (!t._dur && t.vars.lazy)) &&
            f !== we.frame
            ? (et.push(t), (t._lazy = [s, n]), 1)
            : void 0
          : 1
      );
    },
    Ut = function t(e) {
      var r = e.parent;
      return r && r._ts && r._initted && !r._lock && (r.rawTime() < 0 || t(r));
    },
    Xt = function (t) {
      var e = t.data;
      return "isFromStart" === e || "isStart" === e;
    },
    Nt = function (t, e, r, i) {
      var n = t._repeat,
        s = pt(e) || 0,
        a = t._tTime / t._tDur;
      return (
        a && !i && (t._time *= s / t._dur),
        (t._dur = s),
        (t._tDur = n ? (n < 0 ? 1e10 : pt(s * (n + 1) + t._rDelay * n)) : s),
        a > 0 && !i && Ft(t, (t._tTime = t._tDur * a)),
        t.parent && zt(t),
        r || Ct(t.parent, t),
        t
      );
    },
    qt = function (t) {
      return t instanceof Le ? Ct(t) : Nt(t, t._dur);
    },
    Vt = { _start: 0, endTime: Z, totalDuration: Z },
    jt = function t(e, r, i) {
      var n,
        s,
        a,
        o = e.labels,
        u = e._recent || Vt,
        h = e.duration() >= y ? u.endTime(!1) : e._dur;
      return A(r) && (isNaN(r) || r in o)
        ? ((s = r.charAt(0)),
          (a = "%" === r.substr(-1)),
          (n = r.indexOf("=")),
          "<" === s || ">" === s
            ? (n >= 0 && (r = r.replace(/=/, "")),
              ("<" === s ? u._start : u.endTime(u._repeat >= 0)) +
                (parseFloat(r.substr(1)) || 0) *
                  (a ? (n < 0 ? u : i).totalDuration() / 100 : 1))
            : n < 0
            ? (r in o || (o[r] = h), o[r])
            : ((s = parseFloat(r.charAt(n - 1) + r.substr(n + 1))),
              a && i && (s = (s / 100) * (B(i) ? i[0] : i).totalDuration()),
              n > 1 ? t(e, r.substr(0, n - 1), i) + s : h + s))
        : null == r
        ? h
        : +r;
    },
    Gt = function (t, e, r) {
      var i,
        n,
        s = D(e[1]),
        a = (s ? 2 : 1) + (t < 2 ? 0 : 1),
        o = e[a];
      if ((s && (o.duration = e[1]), (o.parent = r), t)) {
        for (i = o, n = r; n && !("immediateRender" in i); )
          (i = n.vars.defaults || {}), (n = S(n.vars.inherit) && n.parent);
        (o.immediateRender = S(i.immediateRender)),
          t < 2 ? (o.runBackwards = 1) : (o.startAt = e[a - 1]);
      }
      return new Qe(e[0], o, e[a + 1]);
    },
    Wt = function (t, e) {
      return t || 0 === t ? e(t) : e;
    },
    Qt = function (t, e, r) {
      return r < t ? t : r > e ? e : r;
    },
    Ht = function (t, e) {
      return A(t) && (e = q.exec(t)) ? e[1] : "";
    },
    Zt = [].slice,
    $t = function (t, e) {
      return (
        t &&
        P(t) &&
        "length" in t &&
        ((!e && !t.length) || (t.length - 1 in t && P(t[0]))) &&
        !t.nodeType &&
        t !== a
      );
    },
    Jt = function (t, e, r) {
      return n && !e && n.selector
        ? n.selector(t)
        : !A(t) || r || (!o && be())
        ? B(t)
          ? (function (t, e, r) {
              return (
                void 0 === r && (r = []),
                t.forEach(function (t) {
                  var i;
                  return (A(t) && !e) || $t(t, 1)
                    ? (i = r).push.apply(i, Jt(t))
                    : r.push(t);
                }) || r
              );
            })(t, r)
          : $t(t)
          ? Zt.call(t, 0)
          : t
          ? [t]
          : []
        : Zt.call((e || u).querySelectorAll(t), 0);
    },
    Kt = function (t) {
      return (
        (t = Jt(t)[0] || Q("Invalid scope") || {}),
        function (e) {
          var r = t.current || t.nativeElement || t;
          return Jt(
            e,
            r.querySelectorAll
              ? r
              : r === t
              ? Q("Invalid scope") || u.createElement("div")
              : t
          );
        }
      );
    },
    te = function (t) {
      return t.sort(function () {
        return 0.5 - Math.random();
      });
    },
    ee = function (t) {
      if (C(t)) return t;
      var e = P(t) ? t : { each: t },
        r = Ee(e.ease),
        i = e.from || 0,
        n = parseFloat(e.base) || 0,
        s = {},
        a = i > 0 && i < 1,
        o = isNaN(i) || a,
        u = e.axis,
        h = i,
        f = i;
      return (
        A(i)
          ? (h = f = { center: 0.5, edges: 0.5, end: 1 }[i] || 0)
          : !a && o && ((h = i[0]), (f = i[1])),
        function (t, a, l) {
          var c,
            p,
            _,
            d,
            m,
            g,
            v,
            T,
            x,
            w = (l || e).length,
            b = s[w];
          if (!b) {
            if (!(x = "auto" === e.grid ? 0 : (e.grid || [1, y])[1])) {
              for (
                v = -y;
                v < (v = l[x++].getBoundingClientRect().left) && x < w;

              );
              x--;
            }
            for (
              b = s[w] = [],
                c = o ? Math.min(x, w) * h - 0.5 : i % x,
                p = x === y ? 0 : o ? (w * f) / x - 0.5 : (i / x) | 0,
                v = 0,
                T = y,
                g = 0;
              g < w;
              g++
            )
              (_ = (g % x) - c),
                (d = p - ((g / x) | 0)),
                (b[g] = m = u ? Math.abs("y" === u ? d : _) : M(_ * _ + d * d)),
                m > v && (v = m),
                m < T && (T = m);
            "random" === i && te(b),
              (b.max = v - T),
              (b.min = T),
              (b.v = w =
                (parseFloat(e.amount) ||
                  parseFloat(e.each) *
                    (x > w
                      ? w - 1
                      : u
                      ? "y" === u
                        ? w / x
                        : x
                      : Math.max(x, w / x)) ||
                  0) * ("edges" === i ? -1 : 1)),
              (b.b = w < 0 ? n - w : n),
              (b.u = Ht(e.amount || e.each) || 0),
              (r = r && w < 0 ? Ce(r) : r);
          }
          return (
            (w = (b[t] - b.min) / b.max || 0),
            pt(b.b + (r ? r(w) : w) * b.v) + b.u
          );
        }
      );
    },
    re = function (t) {
      var e = Math.pow(10, ((t + "").split(".")[1] || "").length);
      return function (r) {
        var i = pt(Math.round(parseFloat(r) / t) * t * e);
        return (i - (i % 1)) / e + (D(r) ? 0 : Ht(r));
      };
    },
    ie = function (t, e) {
      var r,
        i,
        n = B(t);
      return (
        !n &&
          P(t) &&
          ((r = n = t.radius || y),
          t.values
            ? ((t = Jt(t.values)), (i = !D(t[0])) && (r *= r))
            : (t = re(t.increment))),
        Wt(
          e,
          n
            ? C(t)
              ? function (e) {
                  return (i = t(e)), Math.abs(i - e) <= r ? i : e;
                }
              : function (e) {
                  for (
                    var n,
                      s,
                      a = parseFloat(i ? e.x : e),
                      o = parseFloat(i ? e.y : 0),
                      u = y,
                      h = 0,
                      f = t.length;
                    f--;

                  )
                    (n = i
                      ? (n = t[f].x - a) * n + (s = t[f].y - o) * s
                      : Math.abs(t[f] - a)) < u && ((u = n), (h = f));
                  return (
                    (h = !r || u <= r ? t[h] : e),
                    i || h === e || D(e) ? h : h + Ht(e)
                  );
                }
            : re(t)
        )
      );
    },
    ne = function (t, e, r, i) {
      return Wt(B(t) ? !e : !0 === r ? !!(r = 0) : !i, function () {
        return B(t)
          ? t[~~(Math.random() * t.length)]
          : (r = r || 1e-5) &&
              (i = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) &&
              Math.floor(
                Math.round(
                  (t - r / 2 + Math.random() * (e - t + 0.99 * r)) / r
                ) *
                  r *
                  i
              ) / i;
      });
    },
    se = function (t, e, r) {
      return Wt(r, function (r) {
        return t[~~e(r)];
      });
    },
    ae = function (t) {
      for (var e, r, i, n, s = 0, a = ""; ~(e = t.indexOf("random(", s)); )
        (i = t.indexOf(")", e)),
          (n = "[" === t.charAt(e + 7)),
          (r = t.substr(e + 7, i - e - 7).match(n ? N : L)),
          (a +=
            t.substr(s, e - s) +
            ne(n ? r : +r[0], n ? 0 : +r[1], +r[2] || 1e-5)),
          (s = i + 1);
      return a + t.substr(s, t.length - s);
    },
    oe = function (t, e, r, i, n) {
      var s = e - t,
        a = i - r;
      return Wt(n, function (e) {
        return r + (((e - t) / s) * a || 0);
      });
    },
    ue = function (t, e, r) {
      var i,
        n,
        s,
        a = t.labels,
        o = y;
      for (i in a)
        (n = a[i] - e) < 0 == !!r &&
          n &&
          o > (n = Math.abs(n)) &&
          ((s = i), (o = n));
      return s;
    },
    he = function (t, e, r) {
      var i,
        s,
        a,
        o = t.vars,
        u = o[e],
        h = n,
        f = t._ctx;
      if (u)
        return (
          (i = o[e + "Params"]),
          (s = o.callbackScope || t),
          r && et.length && mt(),
          f && (n = f),
          (a = i ? u.apply(s, i) : u.call(s)),
          (n = h),
          a
        );
    },
    fe = function (t) {
      return (
        At(t),
        t.scrollTrigger && t.scrollTrigger.kill(!!i),
        t.progress() < 1 && he(t, "onInterrupt"),
        t
      );
    },
    le = [],
    ce = function (t) {
      if (R()) {
        var e = (t = (!t.name && t.default) || t).name,
          r = C(t),
          i =
            e && !r && t.init
              ? function () {
                  this._props = [];
                }
              : t,
          n = {
            init: Z,
            render: ir,
            add: Xe,
            kill: sr,
            modifier: nr,
            rawVars: 0,
          },
          s = {
            targetTest: 0,
            get: 0,
            getSetter: Ke,
            aliases: {},
            register: 0,
          };
        if ((be(), t !== i)) {
          if (it[e]) return;
          Tt(i, Tt(bt(t, n), s)),
            xt(i.prototype, xt(n, bt(t, s))),
            (it[(i.prop = e)] = i),
            t.targetTest && (at.push(i), (tt[e] = 1)),
            (e =
              ("css" === e ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) +
              "Plugin");
        }
        H(e, i), t.register && t.register(Tr, i, ur);
      } else le.push(t);
    },
    pe = 255,
    _e = {
      aqua: [0, pe, pe],
      lime: [0, pe, 0],
      silver: [192, 192, 192],
      black: [0, 0, 0],
      maroon: [128, 0, 0],
      teal: [0, 128, 128],
      blue: [0, 0, pe],
      navy: [0, 0, 128],
      white: [pe, pe, pe],
      olive: [128, 128, 0],
      yellow: [pe, pe, 0],
      orange: [pe, 165, 0],
      gray: [128, 128, 128],
      purple: [128, 0, 128],
      green: [0, 128, 0],
      red: [pe, 0, 0],
      pink: [pe, 192, 203],
      cyan: [0, pe, pe],
      transparent: [pe, pe, pe, 0],
    },
    de = function (t, e, r) {
      return (
        ((6 * (t += t < 0 ? 1 : t > 1 ? -1 : 0) < 1
          ? e + (r - e) * t * 6
          : t < 0.5
          ? r
          : 3 * t < 2
          ? e + (r - e) * (2 / 3 - t) * 6
          : e) *
          pe +
          0.5) |
        0
      );
    },
    me = function (t, e, r) {
      var i,
        n,
        s,
        a,
        o,
        u,
        h,
        f,
        l,
        c,
        p = t ? (D(t) ? [t >> 16, (t >> 8) & pe, t & pe] : 0) : _e.black;
      if (!p) {
        if (("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), _e[t]))
          p = _e[t];
        else if ("#" === t.charAt(0)) {
          if (
            (t.length < 6 &&
              ((i = t.charAt(1)),
              (n = t.charAt(2)),
              (s = t.charAt(3)),
              (t =
                "#" +
                i +
                i +
                n +
                n +
                s +
                s +
                (5 === t.length ? t.charAt(4) + t.charAt(4) : ""))),
            9 === t.length)
          )
            return [
              (p = parseInt(t.substr(1, 6), 16)) >> 16,
              (p >> 8) & pe,
              p & pe,
              parseInt(t.substr(7), 16) / 255,
            ];
          p = [(t = parseInt(t.substr(1), 16)) >> 16, (t >> 8) & pe, t & pe];
        } else if ("hsl" === t.substr(0, 3))
          if (((p = c = t.match(L)), e)) {
            if (~t.indexOf("="))
              return (p = t.match(I)), r && p.length < 4 && (p[3] = 1), p;
          } else
            (a = (+p[0] % 360) / 360),
              (o = +p[1] / 100),
              (i =
                2 * (u = +p[2] / 100) -
                (n = u <= 0.5 ? u * (o + 1) : u + o - u * o)),
              p.length > 3 && (p[3] *= 1),
              (p[0] = de(a + 1 / 3, i, n)),
              (p[1] = de(a, i, n)),
              (p[2] = de(a - 1 / 3, i, n));
        else p = t.match(L) || _e.transparent;
        p = p.map(Number);
      }
      return (
        e &&
          !c &&
          ((i = p[0] / pe),
          (n = p[1] / pe),
          (s = p[2] / pe),
          (u = ((h = Math.max(i, n, s)) + (f = Math.min(i, n, s))) / 2),
          h === f
            ? (a = o = 0)
            : ((l = h - f),
              (o = u > 0.5 ? l / (2 - h - f) : l / (h + f)),
              (a =
                h === i
                  ? (n - s) / l + (n < s ? 6 : 0)
                  : h === n
                  ? (s - i) / l + 2
                  : (i - n) / l + 4),
              (a *= 60)),
          (p[0] = ~~(a + 0.5)),
          (p[1] = ~~(100 * o + 0.5)),
          (p[2] = ~~(100 * u + 0.5))),
        r && p.length < 4 && (p[3] = 1),
        p
      );
    },
    ge = function (t) {
      var e = [],
        r = [],
        i = -1;
      return (
        t.split(ye).forEach(function (t) {
          var n = t.match(Y) || [];
          e.push.apply(e, n), r.push((i += n.length + 1));
        }),
        (e.c = r),
        e
      );
    },
    ve = function (t, e, r) {
      var i,
        n,
        s,
        a,
        o = "",
        u = (t + o).match(ye),
        h = e ? "hsla(" : "rgba(",
        f = 0;
      if (!u) return t;
      if (
        ((u = u.map(function (t) {
          return (
            (t = me(t, e, 1)) &&
            h +
              (e
                ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3]
                : t.join(",")) +
              ")"
          );
        })),
        r && ((s = ge(t)), (i = r.c).join(o) !== s.c.join(o)))
      )
        for (a = (n = t.replace(ye, "1").split(Y)).length - 1; f < a; f++)
          o +=
            n[f] +
            (~i.indexOf(f)
              ? u.shift() || h + "0,0,0,0)"
              : (s.length ? s : u.length ? u : r).shift());
      if (!n)
        for (a = (n = t.split(ye)).length - 1; f < a; f++) o += n[f] + u[f];
      return o + n[a];
    },
    ye = (function () {
      var t,
        e =
          "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
      for (t in _e) e += "|" + t + "\\b";
      return new RegExp(e + ")", "gi");
    })(),
    Te = /hsl[a]?\(/,
    xe = function (t) {
      var e,
        r = t.join(" ");
      if (((ye.lastIndex = 0), ye.test(r)))
        return (
          (e = Te.test(r)),
          (t[1] = ve(t[1], e)),
          (t[0] = ve(t[0], e, ge(t[1]))),
          !0
        );
    },
    we = (function () {
      var t,
        e,
        r,
        i,
        n,
        s,
        f = Date.now,
        l = 500,
        p = 33,
        _ = f(),
        d = _,
        m = 1e3 / 240,
        g = m,
        v = [],
        y = function r(a) {
          var o,
            u,
            h,
            c,
            y = f() - d,
            T = !0 === a;
          if (
            (y > l && (_ += y - p),
            ((o = (h = (d += y) - _) - g) > 0 || T) &&
              ((c = ++i.frame),
              (n = h - 1e3 * i.time),
              (i.time = h /= 1e3),
              (g += o + (o >= m ? 4 : m - o)),
              (u = 1)),
            T || (t = e(r)),
            u)
          )
            for (s = 0; s < v.length; s++) v[s](h, n, c, a);
        };
      return (i = {
        time: 0,
        frame: 0,
        tick: function () {
          y(!0);
        },
        deltaRatio: function (t) {
          return n / (1e3 / (t || 60));
        },
        wake: function () {
          h &&
            (!o &&
              R() &&
              ((a = o = window),
              (u = a.document || {}),
              (V.gsap = Tr),
              (a.gsapVersions || (a.gsapVersions = [])).push(Tr.version),
              G(j || a.GreenSockGlobals || (!a.gsap && a) || {}),
              (r = a.requestAnimationFrame),
              le.forEach(ce)),
            t && i.sleep(),
            (e =
              r ||
              function (t) {
                return setTimeout(t, (g - 1e3 * i.time + 1) | 0);
              }),
            (c = 1),
            y(2));
        },
        sleep: function () {
          (r ? a.cancelAnimationFrame : clearTimeout)(t), (c = 0), (e = Z);
        },
        lagSmoothing: function (t, e) {
          (l = t || 1 / 0), (p = Math.min(e || 33, l));
        },
        fps: function (t) {
          (m = 1e3 / (t || 240)), (g = 1e3 * i.time + m);
        },
        add: function (t, e, r) {
          var n = e
            ? function (e, r, s, a) {
                t(e, r, s, a), i.remove(n);
              }
            : t;
          return i.remove(t), v[r ? "unshift" : "push"](n), be(), n;
        },
        remove: function (t, e) {
          ~(e = v.indexOf(t)) && v.splice(e, 1) && s >= e && s--;
        },
        _listeners: v,
      });
    })(),
    be = function () {
      return !c && we.wake();
    },
    Me = {},
    Oe = /^[\d.\-M][\d.\-,\s]/,
    ke = /["']/g,
    Ae = function (t) {
      for (
        var e,
          r,
          i,
          n = {},
          s = t.substr(1, t.length - 3).split(":"),
          a = s[0],
          o = 1,
          u = s.length;
        o < u;
        o++
      )
        (r = s[o]),
          (e = o !== u - 1 ? r.lastIndexOf(",") : r.length),
          (i = r.substr(0, e)),
          (n[a] = isNaN(i) ? i.replace(ke, "").trim() : +i),
          (a = r.substr(e + 1).trim());
      return n;
    },
    Ce = function (t) {
      return function (e) {
        return 1 - t(1 - e);
      };
    },
    De = function t(e, r) {
      for (var i, n = e._first; n; )
        n instanceof Le
          ? t(n, r)
          : !n.vars.yoyoEase ||
            (n._yoyo && n._repeat) ||
            n._yoyo === r ||
            (n.timeline
              ? t(n.timeline, r)
              : ((i = n._ease),
                (n._ease = n._yEase),
                (n._yEase = i),
                (n._yoyo = r))),
          (n = n._next);
    },
    Ee = function (t, e) {
      return (
        (t &&
          (C(t)
            ? t
            : Me[t] ||
              (function (t) {
                var e,
                  r,
                  i,
                  n,
                  s = (t + "").split("("),
                  a = Me[s[0]];
                return a && s.length > 1 && a.config
                  ? a.config.apply(
                      null,
                      ~t.indexOf("{")
                        ? [Ae(s[1])]
                        : ((e = t),
                          (r = e.indexOf("(") + 1),
                          (i = e.indexOf(")")),
                          (n = e.indexOf("(", r)),
                          e.substring(
                            r,
                            ~n && n < i ? e.indexOf(")", i + 1) : i
                          ))
                            .split(",")
                            .map(vt)
                    )
                  : Me._CE && Oe.test(t)
                  ? Me._CE("", t)
                  : a;
              })(t))) ||
        e
      );
    },
    Pe = function (t, e, r, i) {
      void 0 === r &&
        (r = function (t) {
          return 1 - e(1 - t);
        }),
        void 0 === i &&
          (i = function (t) {
            return t < 0.5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2;
          });
      var n,
        s = { easeIn: e, easeOut: r, easeInOut: i };
      return (
        lt(t, function (t) {
          for (var e in ((Me[t] = V[t] = s),
          (Me[(n = t.toLowerCase())] = r),
          s))
            Me[
              n + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")
            ] = Me[t + "." + e] = s[e];
        }),
        s
      );
    },
    Se = function (t) {
      return function (e) {
        return e < 0.5 ? (1 - t(1 - 2 * e)) / 2 : 0.5 + t(2 * (e - 0.5)) / 2;
      };
    },
    Re = function t(e, r, i) {
      var n = r >= 1 ? r : 1,
        s = (i || (e ? 0.3 : 0.45)) / (r < 1 ? r : 1),
        a = (s / x) * (Math.asin(1 / n) || 0),
        o = function (t) {
          return 1 === t ? 1 : n * Math.pow(2, -10 * t) * k((t - a) * s) + 1;
        },
        u =
          "out" === e
            ? o
            : "in" === e
            ? function (t) {
                return 1 - o(1 - t);
              }
            : Se(o);
      return (
        (s = x / s),
        (u.config = function (r, i) {
          return t(e, r, i);
        }),
        u
      );
    },
    ze = function t(e, r) {
      void 0 === r && (r = 1.70158);
      var i = function (t) {
          return t ? --t * t * ((r + 1) * t + r) + 1 : 0;
        },
        n =
          "out" === e
            ? i
            : "in" === e
            ? function (t) {
                return 1 - i(1 - t);
              }
            : Se(i);
      return (
        (n.config = function (r) {
          return t(e, r);
        }),
        n
      );
    };
  lt("Linear,Quad,Cubic,Quart,Quint,Strong", function (t, e) {
    var r = e < 5 ? e + 1 : e;
    Pe(
      t + ",Power" + (r - 1),
      e
        ? function (t) {
            return Math.pow(t, r);
          }
        : function (t) {
            return t;
          },
      function (t) {
        return 1 - Math.pow(1 - t, r);
      },
      function (t) {
        return t < 0.5
          ? Math.pow(2 * t, r) / 2
          : 1 - Math.pow(2 * (1 - t), r) / 2;
      }
    );
  }),
    (Me.Linear.easeNone = Me.none = Me.Linear.easeIn),
    Pe("Elastic", Re("in"), Re("out"), Re()),
    (p = 7.5625),
    (d = 1 / (_ = 2.75)),
    Pe(
      "Bounce",
      function (t) {
        return 1 - m(1 - t);
      },
      (m = function (t) {
        return t < d
          ? p * t * t
          : t < 0.7272727272727273
          ? p * Math.pow(t - 1.5 / _, 2) + 0.75
          : t < 0.9090909090909092
          ? p * (t -= 2.25 / _) * t + 0.9375
          : p * Math.pow(t - 2.625 / _, 2) + 0.984375;
      })
    ),
    Pe("Expo", function (t) {
      return t ? Math.pow(2, 10 * (t - 1)) : 0;
    }),
    Pe("Circ", function (t) {
      return -(M(1 - t * t) - 1);
    }),
    Pe("Sine", function (t) {
      return 1 === t ? 1 : 1 - O(t * w);
    }),
    Pe("Back", ze("in"), ze("out"), ze()),
    (Me.SteppedEase =
      Me.steps =
      V.SteppedEase =
        {
          config: function (t, e) {
            void 0 === t && (t = 1);
            var r = 1 / t,
              i = t + (e ? 0 : 1),
              n = e ? 1 : 0;
            return function (t) {
              return (((i * Qt(0, 0.99999999, t)) | 0) + n) * r;
            };
          },
        }),
    (v.ease = Me["quad.out"]),
    lt(
      "onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",
      function (t) {
        return (ot += t + "," + t + "Params,");
      }
    );
  var Fe = function (t, e) {
      (this.id = b++),
        (t._gsap = this),
        (this.target = t),
        (this.harness = e),
        (this.get = e ? e.get : ft),
        (this.set = e ? e.getSetter : Ke);
    },
    Be = (function () {
      function t(t) {
        (this.vars = t),
          (this._delay = +t.delay || 0),
          (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) &&
            ((this._rDelay = t.repeatDelay || 0),
            (this._yoyo = !!t.yoyo || !!t.yoyoEase)),
          (this._ts = 1),
          Nt(this, +t.duration, 1, 1),
          (this.data = t.data),
          n && ((this._ctx = n), n.data.push(this)),
          c || we.wake();
      }
      var e = t.prototype;
      return (
        (e.delay = function (t) {
          return t || 0 === t
            ? (this.parent &&
                this.parent.smoothChildTiming &&
                this.startTime(this._start + t - this._delay),
              (this._delay = t),
              this)
            : this._delay;
        }),
        (e.duration = function (t) {
          return arguments.length
            ? this.totalDuration(
                this._repeat > 0 ? t + (t + this._rDelay) * this._repeat : t
              )
            : this.totalDuration() && this._dur;
        }),
        (e.totalDuration = function (t) {
          return arguments.length
            ? ((this._dirty = 0),
              Nt(
                this,
                this._repeat < 0
                  ? t
                  : (t - this._repeat * this._rDelay) / (this._repeat + 1)
              ))
            : this._tDur;
        }),
        (e.totalTime = function (t, e) {
          if ((be(), !arguments.length)) return this._tTime;
          var r = this._dp;
          if (r && r.smoothChildTiming && this._ts) {
            for (
              Ft(this, t), !r._dp || r.parent || Bt(r, this);
              r && r.parent;

            )
              r.parent._time !==
                r._start +
                  (r._ts >= 0
                    ? r._tTime / r._ts
                    : (r.totalDuration() - r._tTime) / -r._ts) &&
                r.totalTime(r._tTime, !0),
                (r = r.parent);
            !this.parent &&
              this._dp.autoRemoveChildren &&
              ((this._ts > 0 && t < this._tDur) ||
                (this._ts < 0 && t > 0) ||
                (!this._tDur && !t)) &&
              Lt(this._dp, this, this._start - this._delay);
          }
          return (
            (this._tTime !== t ||
              (!this._dur && !e) ||
              (this._initted && Math.abs(this._zTime) === T) ||
              (!t && !this._initted && (this.add || this._ptLookup))) &&
              (this._ts || (this._pTime = t), gt(this, t, e)),
            this
          );
        }),
        (e.time = function (t, e) {
          return arguments.length
            ? this.totalTime(
                Math.min(this.totalDuration(), t + Pt(this)) %
                  (this._dur + this._rDelay) || (t ? this._dur : 0),
                e
              )
            : this._time;
        }),
        (e.totalProgress = function (t, e) {
          return arguments.length
            ? this.totalTime(this.totalDuration() * t, e)
            : this.totalDuration()
            ? Math.min(1, this._tTime / this._tDur)
            : this.ratio;
        }),
        (e.progress = function (t, e) {
          return arguments.length
            ? this.totalTime(
                this.duration() *
                  (!this._yoyo || 1 & this.iteration() ? t : 1 - t) +
                  Pt(this),
                e
              )
            : this.duration()
            ? Math.min(1, this._time / this._dur)
            : this.ratio;
        }),
        (e.iteration = function (t, e) {
          var r = this.duration() + this._rDelay;
          return arguments.length
            ? this.totalTime(this._time + (t - 1) * r, e)
            : this._repeat
            ? St(this._tTime, r) + 1
            : 1;
        }),
        (e.timeScale = function (t) {
          if (!arguments.length) return -1e-8 === this._rts ? 0 : this._rts;
          if (this._rts === t) return this;
          var e =
            this.parent && this._ts ? Rt(this.parent._time, this) : this._tTime;
          return (
            (this._rts = +t || 0),
            (this._ts = this._ps || -1e-8 === t ? 0 : this._rts),
            this.totalTime(Qt(-Math.abs(this._delay), this._tDur, e), !0),
            zt(this),
            (function (t) {
              for (var e = t.parent; e && e.parent; )
                (e._dirty = 1), e.totalDuration(), (e = e.parent);
              return t;
            })(this)
          );
        }),
        (e.paused = function (t) {
          return arguments.length
            ? (this._ps !== t &&
                ((this._ps = t),
                t
                  ? ((this._pTime =
                      this._tTime || Math.max(-this._delay, this.rawTime())),
                    (this._ts = this._act = 0))
                  : (be(),
                    (this._ts = this._rts),
                    this.totalTime(
                      this.parent && !this.parent.smoothChildTiming
                        ? this.rawTime()
                        : this._tTime || this._pTime,
                      1 === this.progress() &&
                        Math.abs(this._zTime) !== T &&
                        (this._tTime -= T)
                    ))),
              this)
            : this._ps;
        }),
        (e.startTime = function (t) {
          if (arguments.length) {
            this._start = t;
            var e = this.parent || this._dp;
            return (
              e && (e._sort || !this.parent) && Lt(e, this, t - this._delay),
              this
            );
          }
          return this._start;
        }),
        (e.endTime = function (t) {
          return (
            this._start +
            (S(t) ? this.totalDuration() : this.duration()) /
              Math.abs(this._ts || 1)
          );
        }),
        (e.rawTime = function (t) {
          var e = this.parent || this._dp;
          return e
            ? t &&
              (!this._ts ||
                (this._repeat && this._time && this.totalProgress() < 1))
              ? this._tTime % (this._dur + this._rDelay)
              : this._ts
              ? Rt(e.rawTime(t), this)
              : this._tTime
            : this._tTime;
        }),
        (e.revert = function (t) {
          void 0 === t && (t = K);
          var e = i;
          return (
            (i = t),
            (this._initted || this._startAt) &&
              (this.timeline && this.timeline.revert(t),
              this.totalTime(-0.01, t.suppressEvents)),
            "nested" !== this.data && !1 !== t.kill && this.kill(),
            (i = e),
            this
          );
        }),
        (e.globalTime = function (t) {
          for (var e = this, r = arguments.length ? t : e.rawTime(); e; )
            (r = e._start + r / (e._ts || 1)), (e = e._dp);
          return !this.parent && this._sat
            ? this._sat.vars.immediateRender
              ? -1
              : this._sat.globalTime(t)
            : r;
        }),
        (e.repeat = function (t) {
          return arguments.length
            ? ((this._repeat = t === 1 / 0 ? -2 : t), qt(this))
            : -2 === this._repeat
            ? 1 / 0
            : this._repeat;
        }),
        (e.repeatDelay = function (t) {
          if (arguments.length) {
            var e = this._time;
            return (this._rDelay = t), qt(this), e ? this.time(e) : this;
          }
          return this._rDelay;
        }),
        (e.yoyo = function (t) {
          return arguments.length ? ((this._yoyo = t), this) : this._yoyo;
        }),
        (e.seek = function (t, e) {
          return this.totalTime(jt(this, t), S(e));
        }),
        (e.restart = function (t, e) {
          return this.play().totalTime(t ? -this._delay : 0, S(e));
        }),
        (e.play = function (t, e) {
          return null != t && this.seek(t, e), this.reversed(!1).paused(!1);
        }),
        (e.reverse = function (t, e) {
          return (
            null != t && this.seek(t || this.totalDuration(), e),
            this.reversed(!0).paused(!1)
          );
        }),
        (e.pause = function (t, e) {
          return null != t && this.seek(t, e), this.paused(!0);
        }),
        (e.resume = function () {
          return this.paused(!1);
        }),
        (e.reversed = function (t) {
          return arguments.length
            ? (!!t !== this.reversed() &&
                this.timeScale(-this._rts || (t ? -1e-8 : 0)),
              this)
            : this._rts < 0;
        }),
        (e.invalidate = function () {
          return (this._initted = this._act = 0), (this._zTime = -1e-8), this;
        }),
        (e.isActive = function () {
          var t,
            e = this.parent || this._dp,
            r = this._start;
          return !(
            e &&
            !(
              this._ts &&
              this._initted &&
              e.isActive() &&
              (t = e.rawTime(!0)) >= r &&
              t < this.endTime(!0) - T
            )
          );
        }),
        (e.eventCallback = function (t, e, r) {
          var i = this.vars;
          return arguments.length > 1
            ? (e
                ? ((i[t] = e),
                  r && (i[t + "Params"] = r),
                  "onUpdate" === t && (this._onUpdate = e))
                : delete i[t],
              this)
            : i[t];
        }),
        (e.then = function (t) {
          var e = this;
          return new Promise(function (r) {
            var i = C(t) ? t : yt,
              n = function () {
                var t = e.then;
                (e.then = null),
                  C(i) && (i = i(e)) && (i.then || i === e) && (e.then = t),
                  r(i),
                  (e.then = t);
              };
            (e._initted && 1 === e.totalProgress() && e._ts >= 0) ||
            (!e._tTime && e._ts < 0)
              ? n()
              : (e._prom = n);
          });
        }),
        (e.kill = function () {
          fe(this);
        }),
        t
      );
    })();
  Tt(Be.prototype, {
    _time: 0,
    _start: 0,
    _end: 0,
    _tTime: 0,
    _tDur: 0,
    _dirty: 0,
    _repeat: 0,
    _yoyo: !1,
    parent: null,
    _initted: !1,
    _rDelay: 0,
    _ts: 1,
    _dp: 0,
    ratio: 0,
    _zTime: -1e-8,
    _prom: 0,
    _ps: !1,
    _rts: 1,
  });
  var Le = (function (r) {
    function n(e, i) {
      var n;
      return (
        void 0 === e && (e = {}),
        ((n = r.call(this, e) || this).labels = {}),
        (n.smoothChildTiming = !!e.smoothChildTiming),
        (n.autoRemoveChildren = !!e.autoRemoveChildren),
        (n._sort = S(e.sortChildren)),
        s && Lt(e.parent || s, t(n), i),
        e.reversed && n.reverse(),
        e.paused && n.paused(!0),
        e.scrollTrigger && It(t(n), e.scrollTrigger),
        n
      );
    }
    e(n, r);
    var a = n.prototype;
    return (
      (a.to = function (t, e, r) {
        return Gt(0, arguments, this), this;
      }),
      (a.from = function (t, e, r) {
        return Gt(1, arguments, this), this;
      }),
      (a.fromTo = function (t, e, r, i) {
        return Gt(2, arguments, this), this;
      }),
      (a.set = function (t, e, r) {
        return (
          (e.duration = 0),
          (e.parent = this),
          Mt(e).repeatDelay || (e.repeat = 0),
          (e.immediateRender = !!e.immediateRender),
          new Qe(t, e, jt(this, r), 1),
          this
        );
      }),
      (a.call = function (t, e, r) {
        return Lt(this, Qe.delayedCall(0, t, e), r);
      }),
      (a.staggerTo = function (t, e, r, i, n, s, a) {
        return (
          (r.duration = e),
          (r.stagger = r.stagger || i),
          (r.onComplete = s),
          (r.onCompleteParams = a),
          (r.parent = this),
          new Qe(t, r, jt(this, n)),
          this
        );
      }),
      (a.staggerFrom = function (t, e, r, i, n, s, a) {
        return (
          (r.runBackwards = 1),
          (Mt(r).immediateRender = S(r.immediateRender)),
          this.staggerTo(t, e, r, i, n, s, a)
        );
      }),
      (a.staggerFromTo = function (t, e, r, i, n, s, a, o) {
        return (
          (i.startAt = r),
          (Mt(i).immediateRender = S(i.immediateRender)),
          this.staggerTo(t, e, i, n, s, a, o)
        );
      }),
      (a.render = function (t, e, r) {
        var n,
          a,
          o,
          u,
          h,
          f,
          l,
          c,
          p,
          _,
          d,
          m,
          g = this._time,
          v = this._dirty ? this.totalDuration() : this._tDur,
          y = this._dur,
          x = t <= 0 ? 0 : pt(t),
          w = this._zTime < 0 != t < 0 && (this._initted || !y);
        if (
          (this !== s && x > v && t >= 0 && (x = v),
          x !== this._tTime || r || w)
        ) {
          if (
            (g !== this._time &&
              y &&
              ((x += this._time - g), (t += this._time - g)),
            (n = x),
            (p = this._start),
            (f = !(c = this._ts)),
            w && (y || (g = this._zTime), (t || !e) && (this._zTime = t)),
            this._repeat)
          ) {
            if (
              ((d = this._yoyo),
              (h = y + this._rDelay),
              this._repeat < -1 && t < 0)
            )
              return this.totalTime(100 * h + t, e, r);
            if (
              ((n = pt(x % h)),
              x === v
                ? ((u = this._repeat), (n = y))
                : ((u = ~~(x / h)) && u === x / h && ((n = y), u--),
                  n > y && (n = y)),
              (_ = St(this._tTime, h)),
              !g &&
                this._tTime &&
                _ !== u &&
                this._tTime - _ * h - this._dur <= 0 &&
                (_ = u),
              d && 1 & u && ((n = y - n), (m = 1)),
              u !== _ && !this._lock)
            ) {
              var b = d && 1 & _,
                M = b === (d && 1 & u);
              if (
                (u < _ && (b = !b),
                (g = b ? 0 : y),
                (this._lock = 1),
                (this.render(g || (m ? 0 : pt(u * h)), e, !y)._lock = 0),
                (this._tTime = x),
                !e && this.parent && he(this, "onRepeat"),
                this.vars.repeatRefresh && !m && (this.invalidate()._lock = 1),
                (g && g !== this._time) ||
                  f !== !this._ts ||
                  (this.vars.onRepeat && !this.parent && !this._act))
              )
                return this;
              if (
                ((y = this._dur),
                (v = this._tDur),
                M &&
                  ((this._lock = 2),
                  (g = b ? y : -1e-4),
                  this.render(g, !0),
                  this.vars.repeatRefresh && !m && this.invalidate()),
                (this._lock = 0),
                !this._ts && !f)
              )
                return this;
              De(this, m);
            }
          }
          if (
            (this._hasPause &&
              !this._forcing &&
              this._lock < 2 &&
              ((l = (function (t, e, r) {
                var i;
                if (r > e)
                  for (i = t._first; i && i._start <= r; ) {
                    if ("isPause" === i.data && i._start > e) return i;
                    i = i._next;
                  }
                else
                  for (i = t._last; i && i._start >= r; ) {
                    if ("isPause" === i.data && i._start < e) return i;
                    i = i._prev;
                  }
              })(this, pt(g), pt(n))),
              l && (x -= n - (n = l._start))),
            (this._tTime = x),
            (this._time = n),
            (this._act = !c),
            this._initted ||
              ((this._onUpdate = this.vars.onUpdate),
              (this._initted = 1),
              (this._zTime = t),
              (g = 0)),
            !g && n && !e && !u && (he(this, "onStart"), this._tTime !== x))
          )
            return this;
          if (n >= g && t >= 0)
            for (a = this._first; a; ) {
              if (
                ((o = a._next), (a._act || n >= a._start) && a._ts && l !== a)
              ) {
                if (a.parent !== this) return this.render(t, e, r);
                if (
                  (a.render(
                    a._ts > 0
                      ? (n - a._start) * a._ts
                      : (a._dirty ? a.totalDuration() : a._tDur) +
                          (n - a._start) * a._ts,
                    e,
                    r
                  ),
                  n !== this._time || (!this._ts && !f))
                ) {
                  (l = 0), o && (x += this._zTime = -1e-8);
                  break;
                }
              }
              a = o;
            }
          else {
            a = this._last;
            for (var O = t < 0 ? t : n; a; ) {
              if (
                ((o = a._prev), (a._act || O <= a._end) && a._ts && l !== a)
              ) {
                if (a.parent !== this) return this.render(t, e, r);
                if (
                  (a.render(
                    a._ts > 0
                      ? (O - a._start) * a._ts
                      : (a._dirty ? a.totalDuration() : a._tDur) +
                          (O - a._start) * a._ts,
                    e,
                    r || (i && (a._initted || a._startAt))
                  ),
                  n !== this._time || (!this._ts && !f))
                ) {
                  (l = 0), o && (x += this._zTime = O ? -1e-8 : T);
                  break;
                }
              }
              a = o;
            }
          }
          if (
            l &&
            !e &&
            (this.pause(),
            (l.render(n >= g ? 0 : -1e-8)._zTime = n >= g ? 1 : -1),
            this._ts)
          )
            return (this._start = p), zt(this), this.render(t, e, r);
          this._onUpdate && !e && he(this, "onUpdate", !0),
            ((x === v && this._tTime >= this.totalDuration()) || (!x && g)) &&
              ((p !== this._start && Math.abs(c) === Math.abs(this._ts)) ||
                this._lock ||
                ((t || !y) &&
                  ((x === v && this._ts > 0) || (!x && this._ts < 0)) &&
                  At(this, 1),
                e ||
                  (t < 0 && !g) ||
                  (!x && !g && v) ||
                  (he(
                    this,
                    x === v && t >= 0 ? "onComplete" : "onReverseComplete",
                    !0
                  ),
                  this._prom &&
                    !(x < v && this.timeScale() > 0) &&
                    this._prom())));
        }
        return this;
      }),
      (a.add = function (t, e) {
        var r = this;
        if ((D(e) || (e = jt(this, e, t)), !(t instanceof Be))) {
          if (B(t))
            return (
              t.forEach(function (t) {
                return r.add(t, e);
              }),
              this
            );
          if (A(t)) return this.addLabel(t, e);
          if (!C(t)) return this;
          t = Qe.delayedCall(0, t);
        }
        return this !== t ? Lt(this, t, e) : this;
      }),
      (a.getChildren = function (t, e, r, i) {
        void 0 === t && (t = !0),
          void 0 === e && (e = !0),
          void 0 === r && (r = !0),
          void 0 === i && (i = -y);
        for (var n = [], s = this._first; s; )
          s._start >= i &&
            (s instanceof Qe
              ? e && n.push(s)
              : (r && n.push(s),
                t && n.push.apply(n, s.getChildren(!0, e, r)))),
            (s = s._next);
        return n;
      }),
      (a.getById = function (t) {
        for (var e = this.getChildren(1, 1, 1), r = e.length; r--; )
          if (e[r].vars.id === t) return e[r];
      }),
      (a.remove = function (t) {
        return A(t)
          ? this.removeLabel(t)
          : C(t)
          ? this.killTweensOf(t)
          : (kt(this, t),
            t === this._recent && (this._recent = this._last),
            Ct(this));
      }),
      (a.totalTime = function (t, e) {
        return arguments.length
          ? ((this._forcing = 1),
            !this._dp &&
              this._ts &&
              (this._start = pt(
                we.time -
                  (this._ts > 0
                    ? t / this._ts
                    : (this.totalDuration() - t) / -this._ts)
              )),
            r.prototype.totalTime.call(this, t, e),
            (this._forcing = 0),
            this)
          : this._tTime;
      }),
      (a.addLabel = function (t, e) {
        return (this.labels[t] = jt(this, e)), this;
      }),
      (a.removeLabel = function (t) {
        return delete this.labels[t], this;
      }),
      (a.addPause = function (t, e, r) {
        var i = Qe.delayedCall(0, e || Z, r);
        return (
          (i.data = "isPause"), (this._hasPause = 1), Lt(this, i, jt(this, t))
        );
      }),
      (a.removePause = function (t) {
        var e = this._first;
        for (t = jt(this, t); e; )
          e._start === t && "isPause" === e.data && At(e), (e = e._next);
      }),
      (a.killTweensOf = function (t, e, r) {
        for (var i = this.getTweensOf(t, r), n = i.length; n--; )
          Ie !== i[n] && i[n].kill(t, e);
        return this;
      }),
      (a.getTweensOf = function (t, e) {
        for (var r, i = [], n = Jt(t), s = this._first, a = D(e); s; )
          s instanceof Qe
            ? dt(s._targets, n) &&
              (a
                ? (!Ie || (s._initted && s._ts)) &&
                  s.globalTime(0) <= e &&
                  s.globalTime(s.totalDuration()) > e
                : !e || s.isActive()) &&
              i.push(s)
            : (r = s.getTweensOf(n, e)).length && i.push.apply(i, r),
            (s = s._next);
        return i;
      }),
      (a.tweenTo = function (t, e) {
        e = e || {};
        var r,
          i = this,
          n = jt(i, t),
          s = e,
          a = s.startAt,
          o = s.onStart,
          u = s.onStartParams,
          h = s.immediateRender,
          f = Qe.to(
            i,
            Tt(
              {
                ease: e.ease || "none",
                lazy: !1,
                immediateRender: !1,
                time: n,
                overwrite: "auto",
                duration:
                  e.duration ||
                  Math.abs(
                    (n - (a && "time" in a ? a.time : i._time)) / i.timeScale()
                  ) ||
                  T,
                onStart: function () {
                  if ((i.pause(), !r)) {
                    var t =
                      e.duration ||
                      Math.abs(
                        (n - (a && "time" in a ? a.time : i._time)) /
                          i.timeScale()
                      );
                    f._dur !== t && Nt(f, t, 0, 1).render(f._time, !0, !0),
                      (r = 1);
                  }
                  o && o.apply(f, u || []);
                },
              },
              e
            )
          );
        return h ? f.render(0) : f;
      }),
      (a.tweenFromTo = function (t, e, r) {
        return this.tweenTo(e, Tt({ startAt: { time: jt(this, t) } }, r));
      }),
      (a.recent = function () {
        return this._recent;
      }),
      (a.nextLabel = function (t) {
        return void 0 === t && (t = this._time), ue(this, jt(this, t));
      }),
      (a.previousLabel = function (t) {
        return void 0 === t && (t = this._time), ue(this, jt(this, t), 1);
      }),
      (a.currentLabel = function (t) {
        return arguments.length
          ? this.seek(t, !0)
          : this.previousLabel(this._time + T);
      }),
      (a.shiftChildren = function (t, e, r) {
        void 0 === r && (r = 0);
        for (var i, n = this._first, s = this.labels; n; )
          n._start >= r && ((n._start += t), (n._end += t)), (n = n._next);
        if (e) for (i in s) s[i] >= r && (s[i] += t);
        return Ct(this);
      }),
      (a.invalidate = function (t) {
        var e = this._first;
        for (this._lock = 0; e; ) e.invalidate(t), (e = e._next);
        return r.prototype.invalidate.call(this, t);
      }),
      (a.clear = function (t) {
        void 0 === t && (t = !0);
        for (var e, r = this._first; r; )
          (e = r._next), this.remove(r), (r = e);
        return (
          this._dp && (this._time = this._tTime = this._pTime = 0),
          t && (this.labels = {}),
          Ct(this)
        );
      }),
      (a.totalDuration = function (t) {
        var e,
          r,
          i,
          n = 0,
          a = this,
          o = a._last,
          u = y;
        if (arguments.length)
          return a.timeScale(
            (a._repeat < 0 ? a.duration() : a.totalDuration()) /
              (a.reversed() ? -t : t)
          );
        if (a._dirty) {
          for (i = a.parent; o; )
            (e = o._prev),
              o._dirty && o.totalDuration(),
              (r = o._start) > u && a._sort && o._ts && !a._lock
                ? ((a._lock = 1), (Lt(a, o, r - o._delay, 1)._lock = 0))
                : (u = r),
              r < 0 &&
                o._ts &&
                ((n -= r),
                ((!i && !a._dp) || (i && i.smoothChildTiming)) &&
                  ((a._start += r / a._ts), (a._time -= r), (a._tTime -= r)),
                a.shiftChildren(-r, !1, -Infinity),
                (u = 0)),
              o._end > n && o._ts && (n = o._end),
              (o = e);
          Nt(a, a === s && a._time > n ? a._time : n, 1, 1), (a._dirty = 0);
        }
        return a._tDur;
      }),
      (n.updateRoot = function (t) {
        if ((s._ts && (gt(s, Rt(t, s)), (f = we.frame)), we.frame >= st)) {
          st += g.autoSleep || 120;
          var e = s._first;
          if ((!e || !e._ts) && g.autoSleep && we._listeners.length < 2) {
            for (; e && !e._ts; ) e = e._next;
            e || we.sleep();
          }
        }
      }),
      n
    );
  })(Be);
  Tt(Le.prototype, { _lock: 0, _hasPause: 0, _forcing: 0 });
  var Ie,
    Ye,
    Ue = function (t, e, r, i, n, s, a) {
      var o,
        u,
        h,
        f,
        l,
        c,
        p,
        _,
        d = new ur(this._pt, t, e, 0, 1, rr, null, n),
        m = 0,
        g = 0;
      for (
        d.b = r,
          d.e = i,
          r += "",
          (p = ~(i += "").indexOf("random(")) && (i = ae(i)),
          s && (s((_ = [r, i]), t, e), (r = _[0]), (i = _[1])),
          u = r.match(U) || [];
        (o = U.exec(i));

      )
        (f = o[0]),
          (l = i.substring(m, o.index)),
          h ? (h = (h + 1) % 5) : "rgba(" === l.substr(-5) && (h = 1),
          f !== u[g++] &&
            ((c = parseFloat(u[g - 1]) || 0),
            (d._pt = {
              _next: d._pt,
              p: l || 1 === g ? l : ",",
              s: c,
              c: "=" === f.charAt(1) ? _t(c, f) - c : parseFloat(f) - c,
              m: h && h < 4 ? Math.round : 0,
            }),
            (m = U.lastIndex));
      return (
        (d.c = m < i.length ? i.substring(m, i.length) : ""),
        (d.fp = a),
        (X.test(i) || p) && (d.e = 0),
        (this._pt = d),
        d
      );
    },
    Xe = function (t, e, r, i, n, s, a, o, u, h) {
      C(i) && (i = i(n || 0, t, s));
      var f,
        l = t[e],
        c =
          "get" !== r
            ? r
            : C(l)
            ? u
              ? t[
                  e.indexOf("set") || !C(t["get" + e.substr(3)])
                    ? e
                    : "get" + e.substr(3)
                ](u)
              : t[e]()
            : l,
        p = C(l) ? (u ? $e : Ze) : He;
      if (
        (A(i) &&
          (~i.indexOf("random(") && (i = ae(i)),
          "=" === i.charAt(1) &&
            ((f = _t(c, i) + (Ht(c) || 0)) || 0 === f) &&
            (i = f)),
        !h || c !== i || Ye)
      )
        return isNaN(c * i) || "" === i
          ? (!l && !(e in t) && W(e, i),
            Ue.call(this, t, e, c, i, p, o || g.stringFilter, u))
          : ((f = new ur(
              this._pt,
              t,
              e,
              +c || 0,
              i - (c || 0),
              "boolean" == typeof l ? er : tr,
              0,
              p
            )),
            u && (f.fp = u),
            a && f.modifier(a, this, t),
            (this._pt = f));
    },
    Ne = function (t, e, r, i, n, s) {
      var a, o, u, h;
      if (
        it[t] &&
        !1 !==
          (a = new it[t]()).init(
            n,
            a.rawVars
              ? e[t]
              : (function (t, e, r, i, n) {
                  if (
                    (C(t) && (t = je(t, n, e, r, i)),
                    !P(t) || (t.style && t.nodeType) || B(t) || F(t))
                  )
                    return A(t) ? je(t, n, e, r, i) : t;
                  var s,
                    a = {};
                  for (s in t) a[s] = je(t[s], n, e, r, i);
                  return a;
                })(e[t], i, n, s, r),
            r,
            i,
            s
          ) &&
        ((r._pt = o = new ur(r._pt, n, t, 0, 1, a.render, a, 0, a.priority)),
        r !== l)
      )
        for (u = r._ptLookup[r._targets.indexOf(n)], h = a._props.length; h--; )
          u[a._props[h]] = o;
      return a;
    },
    qe = function t(e, n, a) {
      var o,
        u,
        h,
        f,
        l,
        c,
        p,
        _,
        d,
        m,
        g,
        x,
        w,
        b = e.vars,
        M = b.ease,
        O = b.startAt,
        k = b.immediateRender,
        A = b.lazy,
        C = b.onUpdate,
        D = b.onUpdateParams,
        E = b.callbackScope,
        P = b.runBackwards,
        R = b.yoyoEase,
        z = b.keyframes,
        F = b.autoRevert,
        B = e._dur,
        L = e._startAt,
        I = e._targets,
        Y = e.parent,
        U = Y && "nested" === Y.data ? Y.vars.targets : I,
        X = "auto" === e._overwrite && !r,
        N = e.timeline;
      if (
        (N && (!z || !M) && (M = "none"),
        (e._ease = Ee(M, v.ease)),
        (e._yEase = R ? Ce(Ee(!0 === R ? M : R, v.ease)) : 0),
        R &&
          e._yoyo &&
          !e._repeat &&
          ((R = e._yEase), (e._yEase = e._ease), (e._ease = R)),
        (e._from = !N && !!b.runBackwards),
        !N || (z && !b.stagger))
      ) {
        if (
          ((x = (_ = I[0] ? ht(I[0]).harness : 0) && b[_.prop]),
          (o = bt(b, tt)),
          L &&
            (L._zTime < 0 && L.progress(1),
            n < 0 && P && k && !F ? L.render(-1, !0) : L.revert(P && B ? J : $),
            (L._lazy = 0)),
          O)
        ) {
          if (
            (At(
              (e._startAt = Qe.set(
                I,
                Tt(
                  {
                    data: "isStart",
                    overwrite: !1,
                    parent: Y,
                    immediateRender: !0,
                    lazy: !L && S(A),
                    startAt: null,
                    delay: 0,
                    onUpdate: C,
                    onUpdateParams: D,
                    callbackScope: E,
                    stagger: 0,
                  },
                  O
                )
              ))
            ),
            (e._startAt._dp = 0),
            (e._startAt._sat = e),
            n < 0 && (i || (!k && !F)) && e._startAt.revert(J),
            k && B && n <= 0 && a <= 0)
          )
            return void (n && (e._zTime = n));
        } else if (P && B && !L)
          if (
            (n && (k = !1),
            (h = Tt(
              {
                overwrite: !1,
                data: "isFromStart",
                lazy: k && !L && S(A),
                immediateRender: k,
                stagger: 0,
                parent: Y,
              },
              o
            )),
            x && (h[_.prop] = x),
            At((e._startAt = Qe.set(I, h))),
            (e._startAt._dp = 0),
            (e._startAt._sat = e),
            n < 0 && (i ? e._startAt.revert(J) : e._startAt.render(-1, !0)),
            (e._zTime = n),
            k)
          ) {
            if (!n) return;
          } else t(e._startAt, T, T);
        for (
          e._pt = e._ptCache = 0, A = (B && S(A)) || (A && !B), u = 0;
          u < I.length;
          u++
        ) {
          if (
            ((p = (l = I[u])._gsap || ut(I)[u]._gsap),
            (e._ptLookup[u] = m = {}),
            rt[p.id] && et.length && mt(),
            (g = U === I ? u : U.indexOf(l)),
            _ &&
              !1 !== (d = new _()).init(l, x || o, e, g, U) &&
              ((e._pt = f =
                new ur(e._pt, l, d.name, 0, 1, d.render, d, 0, d.priority)),
              d._props.forEach(function (t) {
                m[t] = f;
              }),
              d.priority && (c = 1)),
            !_ || x)
          )
            for (h in o)
              it[h] && (d = Ne(h, o, e, g, l, U))
                ? d.priority && (c = 1)
                : (m[h] = f =
                    Xe.call(e, l, h, "get", o[h], g, U, 0, b.stringFilter));
          e._op && e._op[u] && e.kill(l, e._op[u]),
            X &&
              e._pt &&
              ((Ie = e),
              s.killTweensOf(l, m, e.globalTime(n)),
              (w = !e.parent),
              (Ie = 0)),
            e._pt && A && (rt[p.id] = 1);
        }
        c && or(e), e._onInit && e._onInit(e);
      }
      (e._onUpdate = C),
        (e._initted = (!e._op || e._pt) && !w),
        z && n <= 0 && N.render(y, !0, !0);
    },
    Ve = function (t, e, r, i) {
      var n,
        s,
        a = e.ease || i || "power1.inOut";
      if (B(e))
        (s = r[t] || (r[t] = [])),
          e.forEach(function (t, r) {
            return s.push({ t: (r / (e.length - 1)) * 100, v: t, e: a });
          });
      else
        for (n in e)
          (s = r[n] || (r[n] = [])),
            "ease" === n || s.push({ t: parseFloat(t), v: e[n], e: a });
    },
    je = function (t, e, r, i, n) {
      return C(t)
        ? t.call(e, r, i, n)
        : A(t) && ~t.indexOf("random(")
        ? ae(t)
        : t;
    },
    Ge = ot + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,autoRevert",
    We = {};
  lt(Ge + ",id,stagger,delay,duration,paused,scrollTrigger", function (t) {
    return (We[t] = 1);
  });
  var Qe = (function (n) {
    function a(e, i, a, o) {
      var u;
      "number" == typeof i && ((a.duration = i), (i = a), (a = null));
      var h,
        f,
        l,
        c,
        p,
        _,
        d,
        m,
        v = (u = n.call(this, o ? i : Mt(i)) || this).vars,
        y = v.duration,
        T = v.delay,
        x = v.immediateRender,
        w = v.stagger,
        b = v.overwrite,
        M = v.keyframes,
        O = v.defaults,
        k = v.scrollTrigger,
        A = v.yoyoEase,
        C = i.parent || s,
        E = (B(e) || F(e) ? D(e[0]) : "length" in i) ? [e] : Jt(e);
      if (
        ((u._targets = E.length
          ? ut(E)
          : Q(
              "GSAP target " + e + " not found. https://greensock.com",
              !g.nullTargetWarn
            ) || []),
        (u._ptLookup = []),
        (u._overwrite = b),
        M || w || z(y) || z(T))
      ) {
        if (
          ((i = u.vars),
          (h = u.timeline =
            new Le({
              data: "nested",
              defaults: O || {},
              targets: C && "nested" === C.data ? C.vars.targets : E,
            })).kill(),
          (h.parent = h._dp = t(u)),
          (h._start = 0),
          w || z(y) || z(T))
        ) {
          if (((c = E.length), (d = w && ee(w)), P(w)))
            for (p in w) ~Ge.indexOf(p) && (m || (m = {}), (m[p] = w[p]));
          for (f = 0; f < c; f++)
            ((l = bt(i, We)).stagger = 0),
              A && (l.yoyoEase = A),
              m && xt(l, m),
              (_ = E[f]),
              (l.duration = +je(y, t(u), f, _, E)),
              (l.delay = (+je(T, t(u), f, _, E) || 0) - u._delay),
              !w &&
                1 === c &&
                l.delay &&
                ((u._delay = T = l.delay), (u._start += T), (l.delay = 0)),
              h.to(_, l, d ? d(f, _, E) : 0),
              (h._ease = Me.none);
          h.duration() ? (y = T = 0) : (u.timeline = 0);
        } else if (M) {
          Mt(Tt(h.vars.defaults, { ease: "none" })),
            (h._ease = Ee(M.ease || i.ease || "none"));
          var R,
            L,
            I,
            Y = 0;
          if (B(M))
            M.forEach(function (t) {
              return h.to(E, t, ">");
            }),
              h.duration();
          else {
            for (p in ((l = {}), M))
              "ease" === p || "easeEach" === p || Ve(p, M[p], l, M.easeEach);
            for (p in l)
              for (
                R = l[p].sort(function (t, e) {
                  return t.t - e.t;
                }),
                  Y = 0,
                  f = 0;
                f < R.length;
                f++
              )
                ((I = {
                  ease: (L = R[f]).e,
                  duration: ((L.t - (f ? R[f - 1].t : 0)) / 100) * y,
                })[p] = L.v),
                  h.to(E, I, Y),
                  (Y += I.duration);
            h.duration() < y && h.to({}, { duration: y - h.duration() });
          }
        }
        y || u.duration((y = h.duration()));
      } else u.timeline = 0;
      return (
        !0 !== b || r || ((Ie = t(u)), s.killTweensOf(E), (Ie = 0)),
        Lt(C, t(u), a),
        i.reversed && u.reverse(),
        i.paused && u.paused(!0),
        (x ||
          (!y &&
            !M &&
            u._start === pt(C._time) &&
            S(x) &&
            Et(t(u)) &&
            "nested" !== C.data)) &&
          ((u._tTime = -1e-8), u.render(Math.max(0, -T) || 0)),
        k && It(t(u), k),
        u
      );
    }
    e(a, n);
    var o = a.prototype;
    return (
      (o.render = function (t, e, r) {
        var n,
          s,
          a,
          o,
          u,
          h,
          f,
          l,
          c,
          p = this._time,
          _ = this._tDur,
          d = this._dur,
          m = t < 0,
          g = t > _ - T && !m ? _ : t < T ? 0 : t;
        if (d) {
          if (
            g !== this._tTime ||
            !t ||
            r ||
            (!this._initted && this._tTime) ||
            (this._startAt && this._zTime < 0 !== m)
          ) {
            if (((n = g), (l = this.timeline), this._repeat)) {
              if (((o = d + this._rDelay), this._repeat < -1 && m))
                return this.totalTime(100 * o + t, e, r);
              if (
                ((n = pt(g % o)),
                g === _
                  ? ((a = this._repeat), (n = d))
                  : ((a = ~~(g / o)) && a === g / o && ((n = d), a--),
                    n > d && (n = d)),
                (h = this._yoyo && 1 & a) && ((c = this._yEase), (n = d - n)),
                (u = St(this._tTime, o)),
                n === p && !r && this._initted)
              )
                return (this._tTime = g), this;
              a !== u &&
                (l && this._yEase && De(l, h),
                !this.vars.repeatRefresh ||
                  h ||
                  this._lock ||
                  ((this._lock = r = 1),
                  (this.render(pt(o * a), !0).invalidate()._lock = 0)));
            }
            if (!this._initted) {
              if (Yt(this, m ? t : n, r, e, g)) return (this._tTime = 0), this;
              if (p !== this._time) return this;
              if (d !== this._dur) return this.render(t, e, r);
            }
            if (
              ((this._tTime = g),
              (this._time = n),
              !this._act && this._ts && ((this._act = 1), (this._lazy = 0)),
              (this.ratio = f = (c || this._ease)(n / d)),
              this._from && (this.ratio = f = 1 - f),
              n && !p && !e && !a && (he(this, "onStart"), this._tTime !== g))
            )
              return this;
            for (s = this._pt; s; ) s.r(f, s.d), (s = s._next);
            (l &&
              l.render(
                t < 0 ? t : !n && h ? -1e-8 : l._dur * l._ease(n / this._dur),
                e,
                r
              )) ||
              (this._startAt && (this._zTime = t)),
              this._onUpdate &&
                !e &&
                (m && Dt(this, t, 0, r), he(this, "onUpdate")),
              this._repeat &&
                a !== u &&
                this.vars.onRepeat &&
                !e &&
                this.parent &&
                he(this, "onRepeat"),
              (g !== this._tDur && g) ||
                this._tTime !== g ||
                (m && !this._onUpdate && Dt(this, t, 0, !0),
                (t || !d) &&
                  ((g === this._tDur && this._ts > 0) ||
                    (!g && this._ts < 0)) &&
                  At(this, 1),
                e ||
                  (m && !p) ||
                  !(g || p || h) ||
                  (he(this, g === _ ? "onComplete" : "onReverseComplete", !0),
                  this._prom &&
                    !(g < _ && this.timeScale() > 0) &&
                    this._prom()));
          }
        } else
          !(function (t, e, r, n) {
            var s,
              a,
              o,
              u = t.ratio,
              h =
                e < 0 ||
                (!e &&
                  ((!t._start && Ut(t) && (t._initted || !Xt(t))) ||
                    ((t._ts < 0 || t._dp._ts < 0) && !Xt(t))))
                  ? 0
                  : 1,
              f = t._rDelay,
              l = 0;
            if (
              (f &&
                t._repeat &&
                ((l = Qt(0, t._tDur, e)),
                (a = St(l, f)),
                t._yoyo && 1 & a && (h = 1 - h),
                a !== St(t._tTime, f) &&
                  ((u = 1 - h),
                  t.vars.repeatRefresh && t._initted && t.invalidate())),
              h !== u || i || n || t._zTime === T || (!e && t._zTime))
            ) {
              if (!t._initted && Yt(t, e, n, r, l)) return;
              for (
                o = t._zTime,
                  t._zTime = e || (r ? T : 0),
                  r || (r = e && !o),
                  t.ratio = h,
                  t._from && (h = 1 - h),
                  t._time = 0,
                  t._tTime = l,
                  s = t._pt;
                s;

              )
                s.r(h, s.d), (s = s._next);
              e < 0 && Dt(t, e, 0, !0),
                t._onUpdate && !r && he(t, "onUpdate"),
                l && t._repeat && !r && t.parent && he(t, "onRepeat"),
                (e >= t._tDur || e < 0) &&
                  t.ratio === h &&
                  (h && At(t, 1),
                  r ||
                    i ||
                    (he(t, h ? "onComplete" : "onReverseComplete", !0),
                    t._prom && t._prom()));
            } else t._zTime || (t._zTime = e);
          })(this, t, e, r);
        return this;
      }),
      (o.targets = function () {
        return this._targets;
      }),
      (o.invalidate = function (t) {
        return (
          (!t || !this.vars.runBackwards) && (this._startAt = 0),
          (this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0),
          (this._ptLookup = []),
          this.timeline && this.timeline.invalidate(t),
          n.prototype.invalidate.call(this, t)
        );
      }),
      (o.resetTo = function (t, e, r, i) {
        c || we.wake(), this._ts || this.play();
        var n = Math.min(this._dur, (this._dp._time - this._start) * this._ts);
        return (
          this._initted || qe(this, n),
          (function (t, e, r, i, n, s, a) {
            var o,
              u,
              h,
              f,
              l = ((t._pt && t._ptCache) || (t._ptCache = {}))[e];
            if (!l)
              for (
                l = t._ptCache[e] = [], h = t._ptLookup, f = t._targets.length;
                f--;

              ) {
                if ((o = h[f][e]) && o.d && o.d._pt)
                  for (o = o.d._pt; o && o.p !== e && o.fp !== e; ) o = o._next;
                if (!o)
                  return (Ye = 1), (t.vars[e] = "+=0"), qe(t, a), (Ye = 0), 1;
                l.push(o);
              }
            for (f = l.length; f--; )
              ((o = (u = l[f])._pt || u).s =
                (!i && 0 !== i) || n ? o.s + (i || 0) + s * o.c : i),
                (o.c = r - o.s),
                u.e && (u.e = ct(r) + Ht(u.e)),
                u.b && (u.b = o.s + Ht(u.b));
          })(this, t, e, r, i, this._ease(n / this._dur), n)
            ? this.resetTo(t, e, r, i)
            : (Ft(this, 0),
              this.parent ||
                Ot(
                  this._dp,
                  this,
                  "_first",
                  "_last",
                  this._dp._sort ? "_start" : 0
                ),
              this.render(0))
        );
      }),
      (o.kill = function (t, e) {
        if ((void 0 === e && (e = "all"), !(t || (e && "all" !== e))))
          return (this._lazy = this._pt = 0), this.parent ? fe(this) : this;
        if (this.timeline) {
          var r = this.timeline.totalDuration();
          return (
            this.timeline.killTweensOf(t, e, Ie && !0 !== Ie.vars.overwrite)
              ._first || fe(this),
            this.parent &&
              r !== this.timeline.totalDuration() &&
              Nt(this, (this._dur * this.timeline._tDur) / r, 0, 1),
            this
          );
        }
        var i,
          n,
          s,
          a,
          o,
          u,
          h,
          f = this._targets,
          l = t ? Jt(t) : f,
          c = this._ptLookup,
          p = this._pt;
        if (
          (!e || "all" === e) &&
          (function (t, e) {
            for (
              var r = t.length, i = r === e.length;
              i && r-- && t[r] === e[r];

            );
            return r < 0;
          })(f, l)
        )
          return "all" === e && (this._pt = 0), fe(this);
        for (
          i = this._op = this._op || [],
            "all" !== e &&
              (A(e) &&
                ((o = {}),
                lt(e, function (t) {
                  return (o[t] = 1);
                }),
                (e = o)),
              (e = (function (t, e) {
                var r,
                  i,
                  n,
                  s,
                  a = t[0] ? ht(t[0]).harness : 0,
                  o = a && a.aliases;
                if (!o) return e;
                for (i in ((r = xt({}, e)), o))
                  if ((i in r))
                    for (n = (s = o[i].split(",")).length; n--; )
                      r[s[n]] = r[i];
                return r;
              })(f, e))),
            h = f.length;
          h--;

        )
          if (~l.indexOf(f[h]))
            for (o in ((n = c[h]),
            "all" === e
              ? ((i[h] = e), (a = n), (s = {}))
              : ((s = i[h] = i[h] || {}), (a = e)),
            a))
              (u = n && n[o]) &&
                (("kill" in u.d && !0 !== u.d.kill(o)) || kt(this, u, "_pt"),
                delete n[o]),
                "all" !== s && (s[o] = 1);
        return this._initted && !this._pt && p && fe(this), this;
      }),
      (a.to = function (t, e) {
        return new a(t, e, arguments[2]);
      }),
      (a.from = function (t, e) {
        return Gt(1, arguments);
      }),
      (a.delayedCall = function (t, e, r, i) {
        return new a(e, 0, {
          immediateRender: !1,
          lazy: !1,
          overwrite: !1,
          delay: t,
          onComplete: e,
          onReverseComplete: e,
          onCompleteParams: r,
          onReverseCompleteParams: r,
          callbackScope: i,
        });
      }),
      (a.fromTo = function (t, e, r) {
        return Gt(2, arguments);
      }),
      (a.set = function (t, e) {
        return (e.duration = 0), e.repeatDelay || (e.repeat = 0), new a(t, e);
      }),
      (a.killTweensOf = function (t, e, r) {
        return s.killTweensOf(t, e, r);
      }),
      a
    );
  })(Be);
  Tt(Qe.prototype, { _targets: [], _lazy: 0, _startAt: 0, _op: 0, _onInit: 0 }),
    lt("staggerTo,staggerFrom,staggerFromTo", function (t) {
      Qe[t] = function () {
        var e = new Le(),
          r = Zt.call(arguments, 0);
        return r.splice("staggerFromTo" === t ? 5 : 4, 0, 0), e[t].apply(e, r);
      };
    });
  var He = function (t, e, r) {
      return (t[e] = r);
    },
    Ze = function (t, e, r) {
      return t[e](r);
    },
    $e = function (t, e, r, i) {
      return t[e](i.fp, r);
    },
    Je = function (t, e, r) {
      return t.setAttribute(e, r);
    },
    Ke = function (t, e) {
      return C(t[e]) ? Ze : E(t[e]) && t.setAttribute ? Je : He;
    },
    tr = function (t, e) {
      return e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e);
    },
    er = function (t, e) {
      return e.set(e.t, e.p, !!(e.s + e.c * t), e);
    },
    rr = function (t, e) {
      var r = e._pt,
        i = "";
      if (!t && e.b) i = e.b;
      else if (1 === t && e.e) i = e.e;
      else {
        for (; r; )
          (i =
            r.p +
            (r.m
              ? r.m(r.s + r.c * t)
              : Math.round(1e4 * (r.s + r.c * t)) / 1e4) +
            i),
            (r = r._next);
        i += e.c;
      }
      e.set(e.t, e.p, i, e);
    },
    ir = function (t, e) {
      for (var r = e._pt; r; ) r.r(t, r.d), (r = r._next);
    },
    nr = function (t, e, r, i) {
      for (var n, s = this._pt; s; )
        (n = s._next), s.p === i && s.modifier(t, e, r), (s = n);
    },
    sr = function (t) {
      for (var e, r, i = this._pt; i; )
        (r = i._next),
          (i.p === t && !i.op) || i.op === t
            ? kt(this, i, "_pt")
            : i.dep || (e = 1),
          (i = r);
      return !e;
    },
    ar = function (t, e, r, i) {
      i.mSet(t, e, i.m.call(i.tween, r, i.mt), i);
    },
    or = function (t) {
      for (var e, r, i, n, s = t._pt; s; ) {
        for (e = s._next, r = i; r && r.pr > s.pr; ) r = r._next;
        (s._prev = r ? r._prev : n) ? (s._prev._next = s) : (i = s),
          (s._next = r) ? (r._prev = s) : (n = s),
          (s = e);
      }
      t._pt = i;
    },
    ur = (function () {
      function t(t, e, r, i, n, s, a, o, u) {
        (this.t = e),
          (this.s = i),
          (this.c = n),
          (this.p = r),
          (this.r = s || tr),
          (this.d = a || this),
          (this.set = o || He),
          (this.pr = u || 0),
          (this._next = t),
          t && (t._prev = this);
      }
      return (
        (t.prototype.modifier = function (t, e, r) {
          (this.mSet = this.mSet || this.set),
            (this.set = ar),
            (this.m = t),
            (this.mt = r),
            (this.tween = e);
        }),
        t
      );
    })();
  lt(
    ot +
      "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger",
    function (t) {
      return (tt[t] = 1);
    }
  ),
    (V.TweenMax = V.TweenLite = Qe),
    (V.TimelineLite = V.TimelineMax = Le),
    (s = new Le({
      sortChildren: !1,
      defaults: v,
      autoRemoveChildren: !0,
      id: "root",
      smoothChildTiming: !0,
    })),
    (g.stringFilter = xe);
  var hr = [],
    fr = {},
    lr = [],
    cr = 0,
    pr = function (t) {
      return (fr[t] || lr).map(function (t) {
        return t();
      });
    },
    _r = function () {
      var t = Date.now(),
        e = [];
      t - cr > 2 &&
        (pr("matchMediaInit"),
        hr.forEach(function (t) {
          var r,
            i,
            n,
            s,
            o = t.queries,
            u = t.conditions;
          for (i in o)
            (r = a.matchMedia(o[i]).matches) && (n = 1),
              r !== u[i] && ((u[i] = r), (s = 1));
          s && (t.revert(), n && e.push(t));
        }),
        pr("matchMediaRevert"),
        e.forEach(function (t) {
          return t.onMatch(t);
        }),
        (cr = t),
        pr("matchMedia"));
    },
    dr = (function () {
      function t(t, e) {
        (this.selector = e && Kt(e)),
          (this.data = []),
          (this._r = []),
          (this.isReverted = !1),
          t && this.add(t);
      }
      var e = t.prototype;
      return (
        (e.add = function (t, e, r) {
          C(t) && ((r = e), (e = t), (t = C));
          var i = this,
            s = function () {
              var t,
                s = n,
                a = i.selector;
              return (
                s && s !== i && s.data.push(i),
                r && (i.selector = Kt(r)),
                (n = i),
                (t = e.apply(i, arguments)),
                C(t) && i._r.push(t),
                (n = s),
                (i.selector = a),
                (i.isReverted = !1),
                t
              );
            };
          return (i.last = s), t === C ? s(i) : t ? (i[t] = s) : s;
        }),
        (e.ignore = function (t) {
          var e = n;
          (n = null), t(this), (n = e);
        }),
        (e.getTweens = function () {
          var e = [];
          return (
            this.data.forEach(function (r) {
              return r instanceof t
                ? e.push.apply(e, r.getTweens())
                : r instanceof Qe &&
                    !(r.parent && "nested" === r.parent.data) &&
                    e.push(r);
            }),
            e
          );
        }),
        (e.clear = function () {
          this._r.length = this.data.length = 0;
        }),
        (e.kill = function (t, e) {
          var r = this;
          if (t) {
            var i = this.getTweens();
            this.data.forEach(function (t) {
              "isFlip" === t.data &&
                (t.revert(),
                t.getChildren(!0, !0, !1).forEach(function (t) {
                  return i.splice(i.indexOf(t), 1);
                }));
            }),
              i
                .map(function (t) {
                  return { g: t.globalTime(0), t: t };
                })
                .sort(function (t, e) {
                  return e.g - t.g || -1;
                })
                .forEach(function (e) {
                  return e.t.revert(t);
                }),
              this.data.forEach(function (e) {
                return !(e instanceof Be) && e.revert && e.revert(t);
              }),
              this._r.forEach(function (e) {
                return e(t, r);
              }),
              (this.isReverted = !0);
          } else
            this.data.forEach(function (t) {
              return t.kill && t.kill();
            });
          if ((this.clear(), e)) {
            var n = hr.indexOf(this);
            ~n && hr.splice(n, 1);
          }
        }),
        (e.revert = function (t) {
          this.kill(t || {});
        }),
        t
      );
    })(),
    mr = (function () {
      function t(t) {
        (this.contexts = []), (this.scope = t);
      }
      var e = t.prototype;
      return (
        (e.add = function (t, e, r) {
          P(t) || (t = { matches: t });
          var i,
            n,
            s,
            o = new dr(0, r || this.scope),
            u = (o.conditions = {});
          for (n in (this.contexts.push(o),
          (e = o.add("onMatch", e)),
          (o.queries = t),
          t))
            "all" === n
              ? (s = 1)
              : (i = a.matchMedia(t[n])) &&
                (hr.indexOf(o) < 0 && hr.push(o),
                (u[n] = i.matches) && (s = 1),
                i.addListener
                  ? i.addListener(_r)
                  : i.addEventListener("change", _r));
          return s && e(o), this;
        }),
        (e.revert = function (t) {
          this.kill(t || {});
        }),
        (e.kill = function (t) {
          this.contexts.forEach(function (e) {
            return e.kill(t, !0);
          });
        }),
        t
      );
    })(),
    gr = {
      registerPlugin: function () {
        for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
          e[r] = arguments[r];
        e.forEach(function (t) {
          return ce(t);
        });
      },
      timeline: function (t) {
        return new Le(t);
      },
      getTweensOf: function (t, e) {
        return s.getTweensOf(t, e);
      },
      getProperty: function (t, e, r, i) {
        A(t) && (t = Jt(t)[0]);
        var n = ht(t || {}).get,
          s = r ? yt : vt;
        return (
          "native" === r && (r = ""),
          t
            ? e
              ? s(((it[e] && it[e].get) || n)(t, e, r, i))
              : function (e, r, i) {
                  return s(((it[e] && it[e].get) || n)(t, e, r, i));
                }
            : t
        );
      },
      quickSetter: function (t, e, r) {
        if ((t = Jt(t)).length > 1) {
          var i = t.map(function (t) {
              return Tr.quickSetter(t, e, r);
            }),
            n = i.length;
          return function (t) {
            for (var e = n; e--; ) i[e](t);
          };
        }
        t = t[0] || {};
        var s = it[e],
          a = ht(t),
          o = (a.harness && (a.harness.aliases || {})[e]) || e,
          u = s
            ? function (e) {
                var i = new s();
                (l._pt = 0),
                  i.init(t, r ? e + r : e, l, 0, [t]),
                  i.render(1, i),
                  l._pt && ir(1, l);
              }
            : a.set(t, o);
        return s
          ? u
          : function (e) {
              return u(t, o, r ? e + r : e, a, 1);
            };
      },
      quickTo: function (t, e, r) {
        var i,
          n = Tr.to(
            t,
            xt((((i = {})[e] = "+=0.1"), (i.paused = !0), i), r || {})
          ),
          s = function (t, r, i) {
            return n.resetTo(e, t, r, i);
          };
        return (s.tween = n), s;
      },
      isTweening: function (t) {
        return s.getTweensOf(t, !0).length > 0;
      },
      defaults: function (t) {
        return t && t.ease && (t.ease = Ee(t.ease, v.ease)), wt(v, t || {});
      },
      config: function (t) {
        return wt(g, t || {});
      },
      registerEffect: function (t) {
        var e = t.name,
          r = t.effect,
          i = t.plugins,
          n = t.defaults,
          s = t.extendTimeline;
        (i || "").split(",").forEach(function (t) {
          return (
            t && !it[t] && !V[t] && Q(e + " effect requires " + t + " plugin.")
          );
        }),
          (nt[e] = function (t, e, i) {
            return r(Jt(t), Tt(e || {}, n), i);
          }),
          s &&
            (Le.prototype[e] = function (t, r, i) {
              return this.add(nt[e](t, P(r) ? r : (i = r) && {}, this), i);
            });
      },
      registerEase: function (t, e) {
        Me[t] = Ee(e);
      },
      parseEase: function (t, e) {
        return arguments.length ? Ee(t, e) : Me;
      },
      getById: function (t) {
        return s.getById(t);
      },
      exportRoot: function (t, e) {
        void 0 === t && (t = {});
        var r,
          i,
          n = new Le(t);
        for (
          n.smoothChildTiming = S(t.smoothChildTiming),
            s.remove(n),
            n._dp = 0,
            n._time = n._tTime = s._time,
            r = s._first;
          r;

        )
          (i = r._next),
            (!e &&
              !r._dur &&
              r instanceof Qe &&
              r.vars.onComplete === r._targets[0]) ||
              Lt(n, r, r._start - r._delay),
            (r = i);
        return Lt(s, n, 0), n;
      },
      context: function (t, e) {
        return t ? new dr(t, e) : n;
      },
      matchMedia: function (t) {
        return new mr(t);
      },
      matchMediaRefresh: function () {
        return (
          hr.forEach(function (t) {
            var e,
              r,
              i = t.conditions;
            for (r in i) i[r] && ((i[r] = !1), (e = 1));
            e && t.revert();
          }) || _r()
        );
      },
      addEventListener: function (t, e) {
        var r = fr[t] || (fr[t] = []);
        ~r.indexOf(e) || r.push(e);
      },
      removeEventListener: function (t, e) {
        var r = fr[t],
          i = r && r.indexOf(e);
        i >= 0 && r.splice(i, 1);
      },
      utils: {
        wrap: function t(e, r, i) {
          var n = r - e;
          return B(e)
            ? se(e, t(0, e.length), r)
            : Wt(i, function (t) {
                return ((n + ((t - e) % n)) % n) + e;
              });
        },
        wrapYoyo: function t(e, r, i) {
          var n = r - e,
            s = 2 * n;
          return B(e)
            ? se(e, t(0, e.length - 1), r)
            : Wt(i, function (t) {
                return e + ((t = (s + ((t - e) % s)) % s || 0) > n ? s - t : t);
              });
        },
        distribute: ee,
        random: ne,
        snap: ie,
        normalize: function (t, e, r) {
          return oe(t, e, 0, 1, r);
        },
        getUnit: Ht,
        clamp: function (t, e, r) {
          return Wt(r, function (r) {
            return Qt(t, e, r);
          });
        },
        splitColor: me,
        toArray: Jt,
        selector: Kt,
        mapRange: oe,
        pipe: function () {
          for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
            e[r] = arguments[r];
          return function (t) {
            return e.reduce(function (t, e) {
              return e(t);
            }, t);
          };
        },
        unitize: function (t, e) {
          return function (r) {
            return t(parseFloat(r)) + (e || Ht(r));
          };
        },
        interpolate: function t(e, r, i, n) {
          var s = isNaN(e + r)
            ? 0
            : function (t) {
                return (1 - t) * e + t * r;
              };
          if (!s) {
            var a,
              o,
              u,
              h,
              f,
              l = A(e),
              c = {};
            if ((!0 === i && (n = 1) && (i = null), l))
              (e = { p: e }), (r = { p: r });
            else if (B(e) && !B(r)) {
              for (u = [], h = e.length, f = h - 2, o = 1; o < h; o++)
                u.push(t(e[o - 1], e[o]));
              h--,
                (s = function (t) {
                  t *= h;
                  var e = Math.min(f, ~~t);
                  return u[e](t - e);
                }),
                (i = r);
            } else n || (e = xt(B(e) ? [] : {}, e));
            if (!u) {
              for (a in r) Xe.call(c, e, a, "get", r[a]);
              s = function (t) {
                return ir(t, c) || (l ? e.p : e);
              };
            }
          }
          return Wt(i, s);
        },
        shuffle: te,
      },
      install: G,
      effects: nt,
      ticker: we,
      updateRoot: Le.updateRoot,
      plugins: it,
      globalTimeline: s,
      core: {
        PropTween: ur,
        globals: H,
        Tween: Qe,
        Timeline: Le,
        Animation: Be,
        getCache: ht,
        _removeLinkedListItem: kt,
        reverting: function () {
          return i;
        },
        context: function (t) {
          return t && n && (n.data.push(t), (t._ctx = n)), n;
        },
        suppressOverwrites: function (t) {
          return (r = t);
        },
      },
    };
  lt("to,from,fromTo,delayedCall,set,killTweensOf", function (t) {
    return (gr[t] = Qe[t]);
  }),
    we.add(Le.updateRoot),
    (l = gr.to({}, { duration: 0 }));
  var vr = function (t, e) {
      for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e; )
        r = r._next;
      return r;
    },
    yr = function (t, e) {
      return {
        name: t,
        rawVars: 1,
        init: function (t, r, i) {
          i._onInit = function (t) {
            var i, n;
            if (
              (A(r) &&
                ((i = {}),
                lt(r, function (t) {
                  return (i[t] = 1);
                }),
                (r = i)),
              e)
            ) {
              for (n in ((i = {}), r)) i[n] = e(r[n]);
              r = i;
            }
            !(function (t, e) {
              var r,
                i,
                n,
                s = t._targets;
              for (r in e)
                for (i = s.length; i--; )
                  (n = t._ptLookup[i][r]) &&
                    (n = n.d) &&
                    (n._pt && (n = vr(n, r)),
                    n && n.modifier && n.modifier(e[r], t, s[i], r));
            })(t, r);
          };
        },
      };
    },
    Tr =
      gr.registerPlugin(
        {
          name: "attr",
          init: function (t, e, r, i, n) {
            var s, a, o;
            for (s in ((this.tween = r), e))
              (o = t.getAttribute(s) || ""),
                ((a = this.add(
                  t,
                  "setAttribute",
                  (o || 0) + "",
                  e[s],
                  i,
                  n,
                  0,
                  0,
                  s
                )).op = s),
                (a.b = o),
                this._props.push(s);
          },
          render: function (t, e) {
            for (var r = e._pt; r; )
              i ? r.set(r.t, r.p, r.b, r) : r.r(t, r.d), (r = r._next);
          },
        },
        {
          name: "endArray",
          init: function (t, e) {
            for (var r = e.length; r--; )
              this.add(t, r, t[r] || 0, e[r], 0, 0, 0, 0, 0, 1);
          },
        },
        yr("roundProps", re),
        yr("modifiers"),
        yr("snap", ie)
      ) || gr;
  (Qe.version = Le.version = Tr.version = "3.11.5"),
    (h = 1),
    R() && be(),
    Me.Power0,
    Me.Power1,
    Me.Power2,
    Me.Power3,
    Me.Power4,
    Me.Linear,
    Me.Quad,
    Me.Cubic,
    Me.Quart,
    Me.Quint,
    Me.Strong,
    Me.Elastic,
    Me.Back,
    Me.SteppedEase,
    Me.Bounce,
    Me.Sine,
    Me.Expo,
    Me.Circ;
  var xr,
    wr,
    br,
    Mr,
    Or,
    kr,
    Ar,
    Cr,
    Dr = {},
    Er = 180 / Math.PI,
    Pr = Math.PI / 180,
    Sr = Math.atan2,
    Rr = /([A-Z])/g,
    zr = /(left|right|width|margin|padding|x)/i,
    Fr = /[\s,\(]\S/,
    Br = {
      autoAlpha: "opacity,visibility",
      scale: "scaleX,scaleY",
      alpha: "opacity",
    },
    Lr = function (t, e) {
      return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e);
    },
    Ir = function (t, e) {
      return e.set(
        e.t,
        e.p,
        1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u,
        e
      );
    },
    Yr = function (t, e) {
      return e.set(
        e.t,
        e.p,
        t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b,
        e
      );
    },
    Ur = function (t, e) {
      var r = e.s + e.c * t;
      e.set(e.t, e.p, ~~(r + (r < 0 ? -0.5 : 0.5)) + e.u, e);
    },
    Xr = function (t, e) {
      return e.set(e.t, e.p, t ? e.e : e.b, e);
    },
    Nr = function (t, e) {
      return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e);
    },
    qr = function (t, e, r) {
      return (t.style[e] = r);
    },
    Vr = function (t, e, r) {
      return t.style.setProperty(e, r);
    },
    jr = function (t, e, r) {
      return (t._gsap[e] = r);
    },
    Gr = function (t, e, r) {
      return (t._gsap.scaleX = t._gsap.scaleY = r);
    },
    Wr = function (t, e, r, i, n) {
      var s = t._gsap;
      (s.scaleX = s.scaleY = r), s.renderTransform(n, s);
    },
    Qr = function (t, e, r, i, n) {
      var s = t._gsap;
      (s[e] = r), s.renderTransform(n, s);
    },
    Hr = "transform",
    Zr = Hr + "Origin",
    $r = function t(e, r) {
      var i = this,
        n = this.target,
        s = n.style;
      if (e in Dr) {
        if (((this.tfm = this.tfm || {}), "transform" === e))
          return Br.transform.split(",").forEach(function (e) {
            return t.call(i, e, r);
          });
        if (
          (~(e = Br[e] || e).indexOf(",")
            ? e.split(",").forEach(function (t) {
                return (i.tfm[t] = di(n, t));
              })
            : (this.tfm[e] = n._gsap.x ? n._gsap[e] : di(n, e)),
          this.props.indexOf(Hr) >= 0)
        )
          return;
        n._gsap.svg &&
          ((this.svgo = n.getAttribute("data-svg-origin")),
          this.props.push(Zr, r, "")),
          (e = Hr);
      }
      (s || r) && this.props.push(e, r, s[e]);
    },
    Jr = function (t) {
      t.translate &&
        (t.removeProperty("translate"),
        t.removeProperty("scale"),
        t.removeProperty("rotate"));
    },
    Kr = function () {
      var t,
        e,
        r = this.props,
        i = this.target,
        n = i.style,
        s = i._gsap;
      for (t = 0; t < r.length; t += 3)
        r[t + 1]
          ? (i[r[t]] = r[t + 2])
          : r[t + 2]
          ? (n[r[t]] = r[t + 2])
          : n.removeProperty(
              "--" === r[t].substr(0, 2)
                ? r[t]
                : r[t].replace(Rr, "-$1").toLowerCase()
            );
      if (this.tfm) {
        for (e in this.tfm) s[e] = this.tfm[e];
        s.svg &&
          (s.renderTransform(),
          i.setAttribute("data-svg-origin", this.svgo || "")),
          ((t = Ar()) && t.isStart) || n[Hr] || (Jr(n), (s.uncache = 1));
      }
    },
    ti = function (t, e) {
      var r = { target: t, props: [], revert: Kr, save: $r };
      return (
        t._gsap || Tr.core.getCache(t),
        e &&
          e.split(",").forEach(function (t) {
            return r.save(t);
          }),
        r
      );
    },
    ei = function (t, e) {
      var r = wr.createElementNS
        ? wr.createElementNS(
            (e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"),
            t
          )
        : wr.createElement(t);
      return r.style ? r : wr.createElement(t);
    },
    ri = function t(e, r, i) {
      var n = getComputedStyle(e);
      return (
        n[r] ||
        n.getPropertyValue(r.replace(Rr, "-$1").toLowerCase()) ||
        n.getPropertyValue(r) ||
        (!i && t(e, ni(r) || r, 1)) ||
        ""
      );
    },
    ii = "O,Moz,ms,Ms,Webkit".split(","),
    ni = function (t, e, r) {
      var i = (e || Or).style,
        n = 5;
      if (t in i && !r) return t;
      for (
        t = t.charAt(0).toUpperCase() + t.substr(1);
        n-- && !(ii[n] + t in i);

      );
      return n < 0 ? null : (3 === n ? "ms" : n >= 0 ? ii[n] : "") + t;
    },
    si = function () {
      "undefined" != typeof window &&
        window.document &&
        ((xr = window),
        (wr = xr.document),
        (br = wr.documentElement),
        (Or = ei("div") || { style: {} }),
        ei("div"),
        (Hr = ni(Hr)),
        (Zr = Hr + "Origin"),
        (Or.style.cssText =
          "border-width:0;line-height:0;position:absolute;padding:0"),
        (Cr = !!ni("perspective")),
        (Ar = Tr.core.reverting),
        (Mr = 1));
    },
    ai = function t(e) {
      var r,
        i = ei(
          "svg",
          (this.ownerSVGElement &&
            this.ownerSVGElement.getAttribute("xmlns")) ||
            "http://www.w3.org/2000/svg"
        ),
        n = this.parentNode,
        s = this.nextSibling,
        a = this.style.cssText;
      if (
        (br.appendChild(i),
        i.appendChild(this),
        (this.style.display = "block"),
        e)
      )
        try {
          (r = this.getBBox()),
            (this._gsapBBox = this.getBBox),
            (this.getBBox = t);
        } catch (t) {}
      else this._gsapBBox && (r = this._gsapBBox());
      return (
        n && (s ? n.insertBefore(this, s) : n.appendChild(this)),
        br.removeChild(i),
        (this.style.cssText = a),
        r
      );
    },
    oi = function (t, e) {
      for (var r = e.length; r--; )
        if (t.hasAttribute(e[r])) return t.getAttribute(e[r]);
    },
    ui = function (t) {
      var e;
      try {
        e = t.getBBox();
      } catch (r) {
        e = ai.call(t, !0);
      }
      return (
        (e && (e.width || e.height)) ||
          t.getBBox === ai ||
          (e = ai.call(t, !0)),
        !e || e.width || e.x || e.y
          ? e
          : {
              x: +oi(t, ["x", "cx", "x1"]) || 0,
              y: +oi(t, ["y", "cy", "y1"]) || 0,
              width: 0,
              height: 0,
            }
      );
    },
    hi = function (t) {
      return !(!t.getCTM || (t.parentNode && !t.ownerSVGElement) || !ui(t));
    },
    fi = function (t, e) {
      if (e) {
        var r = t.style;
        e in Dr && e !== Zr && (e = Hr),
          r.removeProperty
            ? (("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6)) ||
                (e = "-" + e),
              r.removeProperty(e.replace(Rr, "-$1").toLowerCase()))
            : r.removeAttribute(e);
      }
    },
    li = function (t, e, r, i, n, s) {
      var a = new ur(t._pt, e, r, 0, 1, s ? Nr : Xr);
      return (t._pt = a), (a.b = i), (a.e = n), t._props.push(r), a;
    },
    ci = { deg: 1, rad: 1, turn: 1 },
    pi = { grid: 1, flex: 1 },
    _i = function t(e, r, i, n) {
      var s,
        a,
        o,
        u,
        h = parseFloat(i) || 0,
        f = (i + "").trim().substr((h + "").length) || "px",
        l = Or.style,
        c = zr.test(r),
        p = "svg" === e.tagName.toLowerCase(),
        _ = (p ? "client" : "offset") + (c ? "Width" : "Height"),
        d = 100,
        m = "px" === n,
        g = "%" === n;
      return n === f || !h || ci[n] || ci[f]
        ? h
        : ("px" !== f && !m && (h = t(e, r, i, "px")),
          (u = e.getCTM && hi(e)),
          (!g && "%" !== f) || (!Dr[r] && !~r.indexOf("adius"))
            ? ((l[c ? "width" : "height"] = d + (m ? f : n)),
              (a =
                ~r.indexOf("adius") || ("em" === n && e.appendChild && !p)
                  ? e
                  : e.parentNode),
              u && (a = (e.ownerSVGElement || {}).parentNode),
              (a && a !== wr && a.appendChild) || (a = wr.body),
              (o = a._gsap) &&
              g &&
              o.width &&
              c &&
              o.time === we.time &&
              !o.uncache
                ? ct((h / o.width) * d)
                : ((g || "%" === f) &&
                    !pi[ri(a, "display")] &&
                    (l.position = ri(e, "position")),
                  a === e && (l.position = "static"),
                  a.appendChild(Or),
                  (s = Or[_]),
                  a.removeChild(Or),
                  (l.position = "absolute"),
                  c && g && (((o = ht(a)).time = we.time), (o.width = a[_])),
                  ct(m ? (s * h) / d : s && h ? (d / s) * h : 0)))
            : ((s = u ? e.getBBox()[c ? "width" : "height"] : e[_]),
              ct(g ? (h / s) * d : (h / 100) * s)));
    },
    di = function (t, e, r, i) {
      var n;
      return (
        Mr || si(),
        e in Br &&
          "transform" !== e &&
          ~(e = Br[e]).indexOf(",") &&
          (e = e.split(",")[0]),
        Dr[e] && "transform" !== e
          ? ((n = ki(t, i)),
            (n =
              "transformOrigin" !== e
                ? n[e]
                : n.svg
                ? n.origin
                : Ai(ri(t, Zr)) + " " + n.zOrigin + "px"))
          : (!(n = t.style[e]) ||
              "auto" === n ||
              i ||
              ~(n + "").indexOf("calc(")) &&
            (n =
              (yi[e] && yi[e](t, e, r)) ||
              ri(t, e) ||
              ft(t, e) ||
              ("opacity" === e ? 1 : 0)),
        r && !~(n + "").trim().indexOf(" ") ? _i(t, e, n, r) + r : n
      );
    },
    mi = function (t, e, r, i) {
      if (!r || "none" === r) {
        var n = ni(e, t, 1),
          s = n && ri(t, n, 1);
        s && s !== r
          ? ((e = n), (r = s))
          : "borderColor" === e && (r = ri(t, "borderTopColor"));
      }
      var a,
        o,
        u,
        h,
        f,
        l,
        c,
        p,
        _,
        d,
        m,
        v = new ur(this._pt, t.style, e, 0, 1, rr),
        y = 0,
        T = 0;
      if (
        ((v.b = r),
        (v.e = i),
        (r += ""),
        "auto" == (i += "") &&
          ((t.style[e] = i), (i = ri(t, e) || i), (t.style[e] = r)),
        xe((a = [r, i])),
        (i = a[1]),
        (u = (r = a[0]).match(Y) || []),
        (i.match(Y) || []).length)
      ) {
        for (; (o = Y.exec(i)); )
          (c = o[0]),
            (_ = i.substring(y, o.index)),
            f
              ? (f = (f + 1) % 5)
              : ("rgba(" !== _.substr(-5) && "hsla(" !== _.substr(-5)) ||
                (f = 1),
            c !== (l = u[T++] || "") &&
              ((h = parseFloat(l) || 0),
              (m = l.substr((h + "").length)),
              "=" === c.charAt(1) && (c = _t(h, c) + m),
              (p = parseFloat(c)),
              (d = c.substr((p + "").length)),
              (y = Y.lastIndex - d.length),
              d ||
                ((d = d || g.units[e] || m),
                y === i.length && ((i += d), (v.e += d))),
              m !== d && (h = _i(t, e, l, d) || 0),
              (v._pt = {
                _next: v._pt,
                p: _ || 1 === T ? _ : ",",
                s: h,
                c: p - h,
                m: (f && f < 4) || "zIndex" === e ? Math.round : 0,
              }));
        v.c = y < i.length ? i.substring(y, i.length) : "";
      } else v.r = "display" === e && "none" === i ? Nr : Xr;
      return X.test(i) && (v.e = 0), (this._pt = v), v;
    },
    gi = {
      top: "0%",
      bottom: "100%",
      left: "0%",
      right: "100%",
      center: "50%",
    },
    vi = function (t, e) {
      if (e.tween && e.tween._time === e.tween._dur) {
        var r,
          i,
          n,
          s = e.t,
          a = s.style,
          o = e.u,
          u = s._gsap;
        if ("all" === o || !0 === o) (a.cssText = ""), (i = 1);
        else
          for (n = (o = o.split(",")).length; --n > -1; )
            (r = o[n]),
              Dr[r] && ((i = 1), (r = "transformOrigin" === r ? Zr : Hr)),
              fi(s, r);
        i &&
          (fi(s, Hr),
          u &&
            (u.svg && s.removeAttribute("transform"),
            ki(s, 1),
            (u.uncache = 1),
            Jr(a)));
      }
    },
    yi = {
      clearProps: function (t, e, r, i, n) {
        if ("isFromStart" !== n.data) {
          var s = (t._pt = new ur(t._pt, e, r, 0, 0, vi));
          return (s.u = i), (s.pr = -10), (s.tween = n), t._props.push(r), 1;
        }
      },
    },
    Ti = [1, 0, 0, 1, 0, 0],
    xi = {},
    wi = function (t) {
      return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t;
    },
    bi = function (t) {
      var e = ri(t, Hr);
      return wi(e) ? Ti : e.substr(7).match(I).map(ct);
    },
    Mi = function (t, e) {
      var r,
        i,
        n,
        s,
        a = t._gsap || ht(t),
        o = t.style,
        u = bi(t);
      return a.svg && t.getAttribute("transform")
        ? "1,0,0,1,0,0" ===
          (u = [
            (n = t.transform.baseVal.consolidate().matrix).a,
            n.b,
            n.c,
            n.d,
            n.e,
            n.f,
          ]).join(",")
          ? Ti
          : u
        : (u !== Ti ||
            t.offsetParent ||
            t === br ||
            a.svg ||
            ((n = o.display),
            (o.display = "block"),
            ((r = t.parentNode) && t.offsetParent) ||
              ((s = 1), (i = t.nextElementSibling), br.appendChild(t)),
            (u = bi(t)),
            n ? (o.display = n) : fi(t, "display"),
            s &&
              (i
                ? r.insertBefore(t, i)
                : r
                ? r.appendChild(t)
                : br.removeChild(t))),
          e && u.length > 6 ? [u[0], u[1], u[4], u[5], u[12], u[13]] : u);
    },
    Oi = function (t, e, r, i, n, s) {
      var a,
        o,
        u,
        h = t._gsap,
        f = n || Mi(t, !0),
        l = h.xOrigin || 0,
        c = h.yOrigin || 0,
        p = h.xOffset || 0,
        _ = h.yOffset || 0,
        d = f[0],
        m = f[1],
        g = f[2],
        v = f[3],
        y = f[4],
        T = f[5],
        x = e.split(" "),
        w = parseFloat(x[0]) || 0,
        b = parseFloat(x[1]) || 0;
      r
        ? f !== Ti &&
          (o = d * v - m * g) &&
          ((u = w * (-m / o) + b * (d / o) - (d * T - m * y) / o),
          (w = w * (v / o) + b * (-g / o) + (g * T - v * y) / o),
          (b = u))
        : ((w = (a = ui(t)).x + (~x[0].indexOf("%") ? (w / 100) * a.width : w)),
          (b =
            a.y + (~(x[1] || x[0]).indexOf("%") ? (b / 100) * a.height : b))),
        i || (!1 !== i && h.smooth)
          ? ((y = w - l),
            (T = b - c),
            (h.xOffset = p + (y * d + T * g) - y),
            (h.yOffset = _ + (y * m + T * v) - T))
          : (h.xOffset = h.yOffset = 0),
        (h.xOrigin = w),
        (h.yOrigin = b),
        (h.smooth = !!i),
        (h.origin = e),
        (h.originIsAbsolute = !!r),
        (t.style[Zr] = "0px 0px"),
        s &&
          (li(s, h, "xOrigin", l, w),
          li(s, h, "yOrigin", c, b),
          li(s, h, "xOffset", p, h.xOffset),
          li(s, h, "yOffset", _, h.yOffset)),
        t.setAttribute("data-svg-origin", w + " " + b);
    },
    ki = function (t, e) {
      var r = t._gsap || new Fe(t);
      if ("x" in r && !e && !r.uncache) return r;
      var i,
        n,
        s,
        a,
        o,
        u,
        h,
        f,
        l,
        c,
        p,
        _,
        d,
        m,
        v,
        y,
        T,
        x,
        w,
        b,
        M,
        O,
        k,
        A,
        C,
        D,
        E,
        P,
        S,
        R,
        z,
        F,
        B = t.style,
        L = r.scaleX < 0,
        I = "px",
        Y = "deg",
        U = getComputedStyle(t),
        X = ri(t, Zr) || "0";
      return (
        (i = n = s = u = h = f = l = c = p = 0),
        (a = o = 1),
        (r.svg = !(!t.getCTM || !hi(t))),
        U.translate &&
          (("none" === U.translate &&
            "none" === U.scale &&
            "none" === U.rotate) ||
            (B[Hr] =
              ("none" !== U.translate
                ? "translate3d(" +
                  (U.translate + " 0 0").split(" ").slice(0, 3).join(", ") +
                  ") "
                : "") +
              ("none" !== U.rotate ? "rotate(" + U.rotate + ") " : "") +
              ("none" !== U.scale
                ? "scale(" + U.scale.split(" ").join(",") + ") "
                : "") +
              ("none" !== U[Hr] ? U[Hr] : "")),
          (B.scale = B.rotate = B.translate = "none")),
        (m = Mi(t, r.svg)),
        r.svg &&
          (r.uncache
            ? ((C = t.getBBox()),
              (X = r.xOrigin - C.x + "px " + (r.yOrigin - C.y) + "px"),
              (A = ""))
            : (A = !e && t.getAttribute("data-svg-origin")),
          Oi(t, A || X, !!A || r.originIsAbsolute, !1 !== r.smooth, m)),
        (_ = r.xOrigin || 0),
        (d = r.yOrigin || 0),
        m !== Ti &&
          ((x = m[0]),
          (w = m[1]),
          (b = m[2]),
          (M = m[3]),
          (i = O = m[4]),
          (n = k = m[5]),
          6 === m.length
            ? ((a = Math.sqrt(x * x + w * w)),
              (o = Math.sqrt(M * M + b * b)),
              (u = x || w ? Sr(w, x) * Er : 0),
              (l = b || M ? Sr(b, M) * Er + u : 0) &&
                (o *= Math.abs(Math.cos(l * Pr))),
              r.svg && ((i -= _ - (_ * x + d * b)), (n -= d - (_ * w + d * M))))
            : ((F = m[6]),
              (R = m[7]),
              (E = m[8]),
              (P = m[9]),
              (S = m[10]),
              (z = m[11]),
              (i = m[12]),
              (n = m[13]),
              (s = m[14]),
              (h = (v = Sr(F, S)) * Er),
              v &&
                ((A = O * (y = Math.cos(-v)) + E * (T = Math.sin(-v))),
                (C = k * y + P * T),
                (D = F * y + S * T),
                (E = O * -T + E * y),
                (P = k * -T + P * y),
                (S = F * -T + S * y),
                (z = R * -T + z * y),
                (O = A),
                (k = C),
                (F = D)),
              (f = (v = Sr(-b, S)) * Er),
              v &&
                ((y = Math.cos(-v)),
                (z = M * (T = Math.sin(-v)) + z * y),
                (x = A = x * y - E * T),
                (w = C = w * y - P * T),
                (b = D = b * y - S * T)),
              (u = (v = Sr(w, x)) * Er),
              v &&
                ((A = x * (y = Math.cos(v)) + w * (T = Math.sin(v))),
                (C = O * y + k * T),
                (w = w * y - x * T),
                (k = k * y - O * T),
                (x = A),
                (O = C)),
              h &&
                Math.abs(h) + Math.abs(u) > 359.9 &&
                ((h = u = 0), (f = 180 - f)),
              (a = ct(Math.sqrt(x * x + w * w + b * b))),
              (o = ct(Math.sqrt(k * k + F * F))),
              (v = Sr(O, k)),
              (l = Math.abs(v) > 2e-4 ? v * Er : 0),
              (p = z ? 1 / (z < 0 ? -z : z) : 0)),
          r.svg &&
            ((A = t.getAttribute("transform")),
            (r.forceCSS = t.setAttribute("transform", "") || !wi(ri(t, Hr))),
            A && t.setAttribute("transform", A))),
        Math.abs(l) > 90 &&
          Math.abs(l) < 270 &&
          (L
            ? ((a *= -1),
              (l += u <= 0 ? 180 : -180),
              (u += u <= 0 ? 180 : -180))
            : ((o *= -1), (l += l <= 0 ? 180 : -180))),
        (e = e || r.uncache),
        (r.x =
          i -
          ((r.xPercent =
            i &&
            ((!e && r.xPercent) ||
              (Math.round(t.offsetWidth / 2) === Math.round(-i) ? -50 : 0)))
            ? (t.offsetWidth * r.xPercent) / 100
            : 0) +
          I),
        (r.y =
          n -
          ((r.yPercent =
            n &&
            ((!e && r.yPercent) ||
              (Math.round(t.offsetHeight / 2) === Math.round(-n) ? -50 : 0)))
            ? (t.offsetHeight * r.yPercent) / 100
            : 0) +
          I),
        (r.z = s + I),
        (r.scaleX = ct(a)),
        (r.scaleY = ct(o)),
        (r.rotation = ct(u) + Y),
        (r.rotationX = ct(h) + Y),
        (r.rotationY = ct(f) + Y),
        (r.skewX = l + Y),
        (r.skewY = c + Y),
        (r.transformPerspective = p + I),
        (r.zOrigin = parseFloat(X.split(" ")[2]) || 0) && (B[Zr] = Ai(X)),
        (r.xOffset = r.yOffset = 0),
        (r.force3D = g.force3D),
        (r.renderTransform = r.svg ? zi : Cr ? Ri : Di),
        (r.uncache = 0),
        r
      );
    },
    Ai = function (t) {
      return (t = t.split(" "))[0] + " " + t[1];
    },
    Ci = function (t, e, r) {
      var i = Ht(e);
      return ct(parseFloat(e) + parseFloat(_i(t, "x", r + "px", i))) + i;
    },
    Di = function (t, e) {
      (e.z = "0px"),
        (e.rotationY = e.rotationX = "0deg"),
        (e.force3D = 0),
        Ri(t, e);
    },
    Ei = "0deg",
    Pi = "0px",
    Si = ") ",
    Ri = function (t, e) {
      var r = e || this,
        i = r.xPercent,
        n = r.yPercent,
        s = r.x,
        a = r.y,
        o = r.z,
        u = r.rotation,
        h = r.rotationY,
        f = r.rotationX,
        l = r.skewX,
        c = r.skewY,
        p = r.scaleX,
        _ = r.scaleY,
        d = r.transformPerspective,
        m = r.force3D,
        g = r.target,
        v = r.zOrigin,
        y = "",
        T = ("auto" === m && t && 1 !== t) || !0 === m;
      if (v && (f !== Ei || h !== Ei)) {
        var x,
          w = parseFloat(h) * Pr,
          b = Math.sin(w),
          M = Math.cos(w);
        (w = parseFloat(f) * Pr),
          (x = Math.cos(w)),
          (s = Ci(g, s, b * x * -v)),
          (a = Ci(g, a, -Math.sin(w) * -v)),
          (o = Ci(g, o, M * x * -v + v));
      }
      d !== Pi && (y += "perspective(" + d + Si),
        (i || n) && (y += "translate(" + i + "%, " + n + "%) "),
        (T || s !== Pi || a !== Pi || o !== Pi) &&
          (y +=
            o !== Pi || T
              ? "translate3d(" + s + ", " + a + ", " + o + ") "
              : "translate(" + s + ", " + a + Si),
        u !== Ei && (y += "rotate(" + u + Si),
        h !== Ei && (y += "rotateY(" + h + Si),
        f !== Ei && (y += "rotateX(" + f + Si),
        (l === Ei && c === Ei) || (y += "skew(" + l + ", " + c + Si),
        (1 === p && 1 === _) || (y += "scale(" + p + ", " + _ + Si),
        (g.style[Hr] = y || "translate(0, 0)");
    },
    zi = function (t, e) {
      var r,
        i,
        n,
        s,
        a,
        o = e || this,
        u = o.xPercent,
        h = o.yPercent,
        f = o.x,
        l = o.y,
        c = o.rotation,
        p = o.skewX,
        _ = o.skewY,
        d = o.scaleX,
        m = o.scaleY,
        g = o.target,
        v = o.xOrigin,
        y = o.yOrigin,
        T = o.xOffset,
        x = o.yOffset,
        w = o.forceCSS,
        b = parseFloat(f),
        M = parseFloat(l);
      (c = parseFloat(c)),
        (p = parseFloat(p)),
        (_ = parseFloat(_)) && ((p += _ = parseFloat(_)), (c += _)),
        c || p
          ? ((c *= Pr),
            (p *= Pr),
            (r = Math.cos(c) * d),
            (i = Math.sin(c) * d),
            (n = Math.sin(c - p) * -m),
            (s = Math.cos(c - p) * m),
            p &&
              ((_ *= Pr),
              (a = Math.tan(p - _)),
              (n *= a = Math.sqrt(1 + a * a)),
              (s *= a),
              _ &&
                ((a = Math.tan(_)), (r *= a = Math.sqrt(1 + a * a)), (i *= a))),
            (r = ct(r)),
            (i = ct(i)),
            (n = ct(n)),
            (s = ct(s)))
          : ((r = d), (s = m), (i = n = 0)),
        ((b && !~(f + "").indexOf("px")) || (M && !~(l + "").indexOf("px"))) &&
          ((b = _i(g, "x", f, "px")), (M = _i(g, "y", l, "px"))),
        (v || y || T || x) &&
          ((b = ct(b + v - (v * r + y * n) + T)),
          (M = ct(M + y - (v * i + y * s) + x))),
        (u || h) &&
          ((a = g.getBBox()),
          (b = ct(b + (u / 100) * a.width)),
          (M = ct(M + (h / 100) * a.height))),
        (a =
          "matrix(" +
          r +
          "," +
          i +
          "," +
          n +
          "," +
          s +
          "," +
          b +
          "," +
          M +
          ")"),
        g.setAttribute("transform", a),
        w && (g.style[Hr] = a);
    },
    Fi = function (t, e, r, i, n) {
      var s,
        a,
        o = 360,
        u = A(n),
        h = parseFloat(n) * (u && ~n.indexOf("rad") ? Er : 1) - i,
        f = i + h + "deg";
      return (
        u &&
          ("short" === (s = n.split("_")[1]) &&
            (h %= o) != h % 180 &&
            (h += h < 0 ? o : -360),
          "cw" === s && h < 0
            ? (h = ((h + 36e9) % o) - ~~(h / o) * o)
            : "ccw" === s && h > 0 && (h = ((h - 36e9) % o) - ~~(h / o) * o)),
        (t._pt = a = new ur(t._pt, e, r, i, h, Ir)),
        (a.e = f),
        (a.u = "deg"),
        t._props.push(r),
        a
      );
    },
    Bi = function (t, e) {
      for (var r in e) t[r] = e[r];
      return t;
    },
    Li = function (t, e, r) {
      var i,
        n,
        s,
        a,
        o,
        u,
        h,
        f = Bi({}, r._gsap),
        l = r.style;
      for (n in (f.svg
        ? ((s = r.getAttribute("transform")),
          r.setAttribute("transform", ""),
          (l[Hr] = e),
          (i = ki(r, 1)),
          fi(r, Hr),
          r.setAttribute("transform", s))
        : ((s = getComputedStyle(r)[Hr]),
          (l[Hr] = e),
          (i = ki(r, 1)),
          (l[Hr] = s)),
      Dr))
        (s = f[n]) !== (a = i[n]) &&
          "perspective,force3D,transformOrigin,svgOrigin".indexOf(n) < 0 &&
          ((o = Ht(s) !== (h = Ht(a)) ? _i(r, n, s, h) : parseFloat(s)),
          (u = parseFloat(a)),
          (t._pt = new ur(t._pt, i, n, o, u - o, Lr)),
          (t._pt.u = h || 0),
          t._props.push(n));
      Bi(i, f);
    };
  lt("padding,margin,Width,Radius", function (t, e) {
    var r = "Top",
      i = "Right",
      n = "Bottom",
      s = "Left",
      a = (e < 3 ? [r, i, n, s] : [r + s, r + i, n + i, n + s]).map(function (
        r
      ) {
        return e < 2 ? t + r : "border" + r + t;
      });
    yi[e > 1 ? "border" + t : t] = function (t, e, r, i, n) {
      var s, o;
      if (arguments.length < 4)
        return (
          (s = a.map(function (e) {
            return di(t, e, r);
          })),
          5 === (o = s.join(" ")).split(s[0]).length ? s[0] : o
        );
      (s = (i + "").split(" ")),
        (o = {}),
        a.forEach(function (t, e) {
          return (o[t] = s[e] = s[e] || s[((e - 1) / 2) | 0]);
        }),
        t.init(e, o, n);
    };
  });
  var Ii,
    Yi,
    Ui = {
      name: "css",
      register: si,
      targetTest: function (t) {
        return t.style && t.nodeType;
      },
      init: function (t, e, r, i, n) {
        var s,
          a,
          o,
          u,
          h,
          f,
          l,
          c,
          p,
          _,
          d,
          m,
          v,
          y,
          T,
          x,
          w,
          b,
          M,
          O,
          k = this._props,
          C = t.style,
          D = r.vars.startAt;
        for (l in (Mr || si(),
        (this.styles = this.styles || ti(t)),
        (x = this.styles.props),
        (this.tween = r),
        e))
          if (
            "autoRound" !== l &&
            ((a = e[l]), !it[l] || !Ne(l, e, r, i, t, n))
          )
            if (
              ((h = typeof a),
              (f = yi[l]),
              "function" === h && (h = typeof (a = a.call(r, i, t, n))),
              "string" === h && ~a.indexOf("random(") && (a = ae(a)),
              f)
            )
              f(this, t, l, a, r) && (T = 1);
            else if ("--" === l.substr(0, 2))
              (s = (getComputedStyle(t).getPropertyValue(l) + "").trim()),
                (a += ""),
                (ye.lastIndex = 0),
                ye.test(s) || ((c = Ht(s)), (p = Ht(a))),
                p ? c !== p && (s = _i(t, l, s, p) + p) : c && (a += c),
                this.add(C, "setProperty", s, a, i, n, 0, 0, l),
                k.push(l),
                x.push(l, 0, C[l]);
            else if ("undefined" !== h) {
              if (
                (D && l in D
                  ? ((s =
                      "function" == typeof D[l] ? D[l].call(r, i, t, n) : D[l]),
                    A(s) && ~s.indexOf("random(") && (s = ae(s)),
                    Ht(s + "") || (s += g.units[l] || Ht(di(t, l)) || ""),
                    "=" === (s + "").charAt(1) && (s = di(t, l)))
                  : (s = di(t, l)),
                (u = parseFloat(s)),
                (_ = "string" === h && "=" === a.charAt(1) && a.substr(0, 2)) &&
                  (a = a.substr(2)),
                (o = parseFloat(a)),
                l in Br &&
                  ("autoAlpha" === l &&
                    (1 === u &&
                      "hidden" === di(t, "visibility") &&
                      o &&
                      (u = 0),
                    x.push("visibility", 0, C.visibility),
                    li(
                      this,
                      C,
                      "visibility",
                      u ? "inherit" : "hidden",
                      o ? "inherit" : "hidden",
                      !o
                    )),
                  "scale" !== l &&
                    "transform" !== l &&
                    ~(l = Br[l]).indexOf(",") &&
                    (l = l.split(",")[0])),
                (d = l in Dr))
              )
                if (
                  (this.styles.save(l),
                  m ||
                    (((v = t._gsap).renderTransform && !e.parseTransform) ||
                      ki(t, e.parseTransform),
                    (y = !1 !== e.smoothOrigin && v.smooth),
                    ((m = this._pt =
                      new ur(
                        this._pt,
                        C,
                        Hr,
                        0,
                        1,
                        v.renderTransform,
                        v,
                        0,
                        -1
                      )).dep = 1)),
                  "scale" === l)
                )
                  (this._pt = new ur(
                    this._pt,
                    v,
                    "scaleY",
                    v.scaleY,
                    (_ ? _t(v.scaleY, _ + o) : o) - v.scaleY || 0,
                    Lr
                  )),
                    (this._pt.u = 0),
                    k.push("scaleY", l),
                    (l += "X");
                else {
                  if ("transformOrigin" === l) {
                    x.push(Zr, 0, C[Zr]),
                      (b = void 0),
                      (M = void 0),
                      (O = void 0),
                      (M = (b = (w = a).split(" "))[0]),
                      (O = b[1] || "50%"),
                      ("top" !== M &&
                        "bottom" !== M &&
                        "left" !== O &&
                        "right" !== O) ||
                        ((w = M), (M = O), (O = w)),
                      (b[0] = gi[M] || M),
                      (b[1] = gi[O] || O),
                      (a = b.join(" ")),
                      v.svg
                        ? Oi(t, a, 0, y, 0, this)
                        : ((p = parseFloat(a.split(" ")[2]) || 0) !==
                            v.zOrigin && li(this, v, "zOrigin", v.zOrigin, p),
                          li(this, C, l, Ai(s), Ai(a)));
                    continue;
                  }
                  if ("svgOrigin" === l) {
                    Oi(t, a, 1, y, 0, this);
                    continue;
                  }
                  if (l in xi) {
                    Fi(this, v, l, u, _ ? _t(u, _ + a) : a);
                    continue;
                  }
                  if ("smoothOrigin" === l) {
                    li(this, v, "smooth", v.smooth, a);
                    continue;
                  }
                  if ("force3D" === l) {
                    v[l] = a;
                    continue;
                  }
                  if ("transform" === l) {
                    Li(this, a, t);
                    continue;
                  }
                }
              else l in C || (l = ni(l) || l);
              if (
                d ||
                ((o || 0 === o) && (u || 0 === u) && !Fr.test(a) && l in C)
              )
                o || (o = 0),
                  (c = (s + "").substr((u + "").length)) !==
                    (p = Ht(a) || (l in g.units ? g.units[l] : c)) &&
                    (u = _i(t, l, s, p)),
                  (this._pt = new ur(
                    this._pt,
                    d ? v : C,
                    l,
                    u,
                    (_ ? _t(u, _ + o) : o) - u,
                    d || ("px" !== p && "zIndex" !== l) || !1 === e.autoRound
                      ? Lr
                      : Ur
                  )),
                  (this._pt.u = p || 0),
                  c !== p && "%" !== p && ((this._pt.b = s), (this._pt.r = Yr));
              else if (l in C) mi.call(this, t, l, s, _ ? _ + a : a);
              else if (l in t) this.add(t, l, s || t[l], _ ? _ + a : a, i, n);
              else if ("parseTransform" !== l) {
                W(l, a);
                continue;
              }
              d || (l in C ? x.push(l, 0, C[l]) : x.push(l, 1, s || t[l])),
                k.push(l);
            }
        T && or(this);
      },
      render: function (t, e) {
        if (e.tween._time || !Ar())
          for (var r = e._pt; r; ) r.r(t, r.d), (r = r._next);
        else e.styles.revert();
      },
      get: di,
      aliases: Br,
      getSetter: function (t, e, r) {
        var i = Br[e];
        return (
          i && i.indexOf(",") < 0 && (e = i),
          e in Dr && e !== Zr && (t._gsap.x || di(t, "x"))
            ? r && kr === r
              ? "scale" === e
                ? Gr
                : jr
              : (kr = r || {}) && ("scale" === e ? Wr : Qr)
            : t.style && !E(t.style[e])
            ? qr
            : ~e.indexOf("-")
            ? Vr
            : Ke(t, e)
        );
      },
      core: { _removeProperty: fi, _getMatrix: Mi },
    };
  (Tr.utils.checkPrefix = ni),
    (Tr.core.getStyleSaver = ti),
    (Yi = lt(
      "x,y,z,scale,scaleX,scaleY,xPercent,yPercent" +
        "," +
        (Ii = "rotation,rotationX,rotationY,skewX,skewY") +
        ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective",
      function (t) {
        Dr[t] = 1;
      }
    )),
    lt(Ii, function (t) {
      (g.units[t] = "deg"), (xi[t] = 1);
    }),
    (Br[Yi[13]] = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent," + Ii),
    lt(
      "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY",
      function (t) {
        var e = t.split(":");
        Br[e[1]] = Yi[e[0]];
      }
    ),
    lt(
      "x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",
      function (t) {
        g.units[t] = "px";
      }
    ),
    Tr.registerPlugin(Ui),
    (Tr.registerPlugin(Ui) || Tr).core.Tween;
})();
