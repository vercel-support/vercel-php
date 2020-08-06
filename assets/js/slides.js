window.pluginsAttached
  ? alert(
      "Attention: plugins.js library is attached twice and needs to be removed. The slides.min.js already contains both of scripts."
    )
  : (window.pluginsAttached = 1),
  (function (a) {
    a.extend(a, {
      cacheImage: function (b, c) {
        if ("object" == typeof b)
          return void a.each(b, function () {
            a.cacheImage(String(this), c);
          });
        var d = new Image();
        return (
          (c = c || {}),
          a.each(["load", "error", "abort"], function () {
            var b = String(this);
            "function" == typeof c[b] && a(d).bind(b, c[b]),
              "function" == typeof c.complete && a(d).bind(b, c.complete);
          }),
          (d.src = b),
          d
        );
      },
    }),
      a.extend(a.fn, {
        cacheImage: function (b) {
          return this.each(function () {
            a.cacheImage(this.src, b);
          });
        },
      });
  })(jQuery),
  ($.fn.redraw = function () {
    $(this).each(function () {
      this.offsetHeight;
    });
  }),
  !(function (a) {
    "function" == typeof define && define.amd
      ? define(["jquery"], a)
      : "object" == typeof exports
      ? (module.exports = a)
      : a(jQuery);
  })(function (a) {
    function b(b) {
      var g = b || window.event,
        h = i.call(arguments, 1),
        j = 0,
        l = 0,
        m = 0,
        n = 0,
        o = 0,
        p = 0;
      if (
        ((b = a.event.fix(g)),
        (b.type = "mousewheel"),
        "detail" in g && (m = -1 * g.detail),
        "wheelDelta" in g && (m = g.wheelDelta),
        "wheelDeltaY" in g && (m = g.wheelDeltaY),
        "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX),
        "axis" in g && g.axis === g.HORIZONTAL_AXIS && ((l = -1 * m), (m = 0)),
        (j = 0 === m ? l : m),
        "deltaY" in g && ((m = -1 * g.deltaY), (j = m)),
        "deltaX" in g && ((l = g.deltaX), 0 === m && (j = -1 * l)),
        0 !== m || 0 !== l)
      ) {
        if (1 === g.deltaMode) {
          var q = a.data(this, "mousewheel-line-height");
          (j *= q), (m *= q), (l *= q);
        } else if (2 === g.deltaMode) {
          var r = a.data(this, "mousewheel-page-height");
          (j *= r), (m *= r), (l *= r);
        }
        if (
          ((n = Math.max(Math.abs(m), Math.abs(l))),
          (!f || f > n) && ((f = n), d(g, n) && (f /= 40)),
          d(g, n) && ((j /= 40), (l /= 40), (m /= 40)),
          (j = Math[j >= 1 ? "floor" : "ceil"](j / f)),
          (l = Math[l >= 1 ? "floor" : "ceil"](l / f)),
          (m = Math[m >= 1 ? "floor" : "ceil"](m / f)),
          k.settings.normalizeOffset && this.getBoundingClientRect)
        ) {
          var s = this.getBoundingClientRect();
          (o = b.clientX - s.left), (p = b.clientY - s.top);
        }
        return (
          (b.deltaX = l),
          (b.deltaY = m),
          (b.deltaFactor = f),
          (b.offsetX = o),
          (b.offsetY = p),
          (b.deltaMode = 0),
          h.unshift(b, j, l, m),
          e && clearTimeout(e),
          (e = setTimeout(c, 200)),
          (a.event.dispatch || a.event.handle).apply(this, h)
        );
      }
    }
    function c() {
      f = null;
    }
    function d(a, b) {
      return (
        k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0
      );
    }
    var e,
      f,
      g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
      h =
        "onwheel" in document || document.documentMode >= 9
          ? ["wheel"]
          : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
      i = Array.prototype.slice;
    if (a.event.fixHooks)
      for (var j = g.length; j; ) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
    var k = (a.event.special.mousewheel = {
      version: "3.1.12",
      setup: function () {
        if (this.addEventListener)
          for (var c = h.length; c; ) this.addEventListener(h[--c], b, !1);
        else this.onmousewheel = b;
        a.data(this, "mousewheel-line-height", k.getLineHeight(this)),
          a.data(this, "mousewheel-page-height", k.getPageHeight(this));
      },
      teardown: function () {
        if (this.removeEventListener)
          for (var c = h.length; c; ) this.removeEventListener(h[--c], b, !1);
        else this.onmousewheel = null;
        a.removeData(this, "mousewheel-line-height"),
          a.removeData(this, "mousewheel-page-height");
      },
      getLineHeight: function (b) {
        var c = a(b),
          d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
        return (
          d.length || (d = a("body")),
          parseInt(d.css("fontSize"), 10) ||
            parseInt(c.css("fontSize"), 10) ||
            16
        );
      },
      getPageHeight: function (b) {
        return a(b).height();
      },
      settings: { adjustOldDeltas: !0, normalizeOffset: !0 },
    });
    a.fn.extend({
      mousewheel: function (a) {
        return a ? this.bind("mousewheel", a) : this.trigger("mousewheel");
      },
      unmousewheel: function (a) {
        return this.unbind("mousewheel", a);
      },
    });
  }),
  ($.fn.removeClassByPrefix = function (a) {
    return (
      this.each(function (b, c) {
        var d = c.className.split(" ").filter(function (b) {
          return 0 !== b.lastIndexOf(a, 0);
        });
        c.className = $.trim(d.join(" "));
      }),
      this
    );
  }),
  !(function (a, b) {
    var c = {};
    (c.eventName = "resizeEnd"),
      (c.delay = 250),
      (c.poll = function () {
        var b = a(this),
          d = b.data(c.eventName);
        d.timeoutId && window.clearTimeout(d.timeoutId),
          (d.timeoutId = window.setTimeout(function () {
            b.trigger(c.eventName);
          }, c.delay));
      }),
      (a.event.special[c.eventName] = {
        setup: function () {
          var b = a(this);
          b.data(c.eventName, {}), b.on("resize", c.poll);
        },
        teardown: function () {
          var b = a(this),
            d = b.data(c.eventName);
          d.timeoutId && window.clearTimeout(d.timeoutId),
            b.removeData(c.eventName),
            b.off("resize", c.poll);
        },
      }),
      (a.fn[c.eventName] = function (a, b) {
        return arguments.length > 0
          ? this.on(c.eventName, null, a, b)
          : this.trigger(c.eventName);
      });
  })(jQuery, this),
  (function (a) {
    "function" == typeof define && define.amd && define.amd.jQuery
      ? define(["jquery"], a)
      : a(jQuery);
  })(function (a) {
    function b(b) {
      return (
        !b ||
          void 0 !== b.allowPageScroll ||
          (void 0 === b.swipe && void 0 === b.swipeStatus) ||
          (b.allowPageScroll = j),
        void 0 !== b.click && void 0 === b.tap && (b.tap = b.click),
        b || (b = {}),
        (b = a.extend({}, a.fn.swipe.defaults, b)),
        this.each(function () {
          var d = a(this),
            e = d.data(B);
          e || ((e = new c(this, b)), d.data(B, e));
        })
      );
    }
    function c(b, c) {
      function C(b) {
        if (!(ja() || a(b.target).closest(c.excludedElements, Sa).length > 0)) {
          var d,
            e = b.originalEvent ? b.originalEvent : b,
            f = y ? e.touches[0] : e;
          return (
            (Ta = u),
            y ? (Ua = e.touches.length) : b.preventDefault(),
            (Ja = 0),
            (Ka = null),
            (Qa = null),
            (La = 0),
            (Ma = 0),
            (Na = 0),
            (Oa = 1),
            (Pa = 0),
            (Va = oa()),
            (Ra = ra()),
            ha(),
            !y || Ua === c.fingers || c.fingers === s || R()
              ? (la(0, f),
                (Wa = Aa()),
                2 == Ua &&
                  (la(1, e.touches[1]),
                  (Ma = Na = ua(Va[0].start, Va[1].start))),
                (c.swipeStatus || c.pinchStatus) && (d = J(e, Ta)))
              : (d = !1),
            d === !1
              ? ((Ta = x), J(e, Ta), d)
              : (c.hold &&
                  (ab = setTimeout(
                    a.proxy(function () {
                      Sa.trigger("hold", [e.target]),
                        c.hold && (d = c.hold.call(Sa, e, e.target));
                    }, this),
                    c.longTapThreshold
                  )),
                ka(!0),
                null)
          );
        }
      }
      function D(a) {
        var b = a.originalEvent ? a.originalEvent : a;
        if (Ta !== w && Ta !== x && !ia()) {
          var d,
            e = y ? b.touches[0] : b,
            f = ma(e);
          if (
            ((Xa = Aa()),
            y && (Ua = b.touches.length),
            c.hold && clearTimeout(ab),
            (Ta = v),
            2 == Ua &&
              (0 == Ma
                ? (la(1, b.touches[1]),
                  (Ma = Na = ua(Va[0].start, Va[1].start)))
                : (ma(b.touches[1]),
                  (Na = ua(Va[0].end, Va[1].end)),
                  (Qa = wa(Va[0].end, Va[1].end))),
              (Oa = va(Ma, Na)),
              (Pa = Math.abs(Ma - Na))),
            Ua === c.fingers || c.fingers === s || !y || R())
          ) {
            if (
              ((Ka = za(f.start, f.end)),
              P(a, Ka),
              (Ja = xa(f.start, f.end)),
              (La = ta()),
              pa(Ka, Ja),
              (c.swipeStatus || c.pinchStatus) && (d = J(b, Ta)),
              !c.triggerOnTouchEnd || c.triggerOnTouchLeave)
            ) {
              var g = !0;
              if (c.triggerOnTouchLeave) {
                var h = Ba(this);
                g = Ca(f.end, h);
              }
              !c.triggerOnTouchEnd && g
                ? (Ta = I(v))
                : c.triggerOnTouchLeave && !g && (Ta = I(w)),
                (Ta != x && Ta != w) || J(b, Ta);
            }
          } else (Ta = x), J(b, Ta);
          d === !1 && ((Ta = x), J(b, Ta));
        }
      }
      function E(a) {
        var b = a.originalEvent;
        return y && b.touches.length > 0
          ? (ga(), !0)
          : (ia() && (Ua = Za),
            (Xa = Aa()),
            (La = ta()),
            M() || !L()
              ? ((Ta = x), J(b, Ta))
              : c.triggerOnTouchEnd || (0 == c.triggerOnTouchEnd && Ta === v)
              ? (a.preventDefault(), (Ta = w), J(b, Ta))
              : !c.triggerOnTouchEnd && Y()
              ? ((Ta = w), K(b, Ta, n))
              : Ta === v && ((Ta = x), J(b, Ta)),
            ka(!1),
            null);
      }
      function F() {
        (Ua = 0),
          (Xa = 0),
          (Wa = 0),
          (Ma = 0),
          (Na = 0),
          (Oa = 1),
          ha(),
          ka(!1);
      }
      function G(a) {
        var b = a.originalEvent;
        c.triggerOnTouchLeave && ((Ta = I(w)), J(b, Ta));
      }
      function H() {
        Sa.unbind(Ea, C),
          Sa.unbind(Ia, F),
          Sa.unbind(Fa, D),
          Sa.unbind(Ga, E),
          Ha && Sa.unbind(Ha, G),
          ka(!1);
      }
      function I(a) {
        var b = a,
          d = O(),
          e = L(),
          f = M();
        return (
          !d || f
            ? (b = x)
            : !e || a != v || (c.triggerOnTouchEnd && !c.triggerOnTouchLeave)
            ? !e && a == w && c.triggerOnTouchLeave && (b = x)
            : (b = w),
          b
        );
      }
      function J(a, b) {
        var c = void 0;
        return (
          V() || U()
            ? (c = K(a, b, l))
            : (S() || R()) && c !== !1 && (c = K(a, b, m)),
          ea() && c !== !1
            ? (c = K(a, b, o))
            : fa() && c !== !1
            ? (c = K(a, b, p))
            : da() && c !== !1 && (c = K(a, b, n)),
          b === x && F(a),
          b === w && (y ? 0 == a.touches.length && F(a) : F(a)),
          c
        );
      }
      function K(b, j, k) {
        var q = void 0;
        if (k == l) {
          if (
            (Sa.trigger("swipeStatus", [
              j,
              Ka || null,
              Ja || 0,
              La || 0,
              Ua,
              Va,
            ]),
            c.swipeStatus &&
              ((q = c.swipeStatus.call(
                Sa,
                b,
                j,
                Ka || null,
                Ja || 0,
                La || 0,
                Ua,
                Va
              )),
              q === !1))
          )
            return !1;
          if (j == w && T()) {
            if (
              (Sa.trigger("swipe", [Ka, Ja, La, Ua, Va]),
              c.swipe &&
                ((q = c.swipe.call(Sa, b, Ka, Ja, La, Ua, Va)), q === !1))
            )
              return !1;
            switch (Ka) {
              case d:
                Sa.trigger("swipeLeft", [Ka, Ja, La, Ua, Va]),
                  c.swipeLeft &&
                    (q = c.swipeLeft.call(Sa, b, Ka, Ja, La, Ua, Va));
                break;
              case e:
                Sa.trigger("swipeRight", [Ka, Ja, La, Ua, Va]),
                  c.swipeRight &&
                    (q = c.swipeRight.call(Sa, b, Ka, Ja, La, Ua, Va));
                break;
              case f:
                Sa.trigger("swipeUp", [Ka, Ja, La, Ua, Va]),
                  c.swipeUp && (q = c.swipeUp.call(Sa, b, Ka, Ja, La, Ua, Va));
                break;
              case g:
                Sa.trigger("swipeDown", [Ka, Ja, La, Ua, Va]),
                  c.swipeDown &&
                    (q = c.swipeDown.call(Sa, b, Ka, Ja, La, Ua, Va));
            }
          }
        }
        if (k == m) {
          if (
            (Sa.trigger("pinchStatus", [
              j,
              Qa || null,
              Pa || 0,
              La || 0,
              Ua,
              Oa,
              Va,
            ]),
            c.pinchStatus &&
              ((q = c.pinchStatus.call(
                Sa,
                b,
                j,
                Qa || null,
                Pa || 0,
                La || 0,
                Ua,
                Oa,
                Va
              )),
              q === !1))
          )
            return !1;
          if (j == w && Q())
            switch (Qa) {
              case h:
                Sa.trigger("pinchIn", [
                  Qa || null,
                  Pa || 0,
                  La || 0,
                  Ua,
                  Oa,
                  Va,
                ]),
                  c.pinchIn &&
                    (q = c.pinchIn.call(
                      Sa,
                      b,
                      Qa || null,
                      Pa || 0,
                      La || 0,
                      Ua,
                      Oa,
                      Va
                    ));
                break;
              case i:
                Sa.trigger("pinchOut", [
                  Qa || null,
                  Pa || 0,
                  La || 0,
                  Ua,
                  Oa,
                  Va,
                ]),
                  c.pinchOut &&
                    (q = c.pinchOut.call(
                      Sa,
                      b,
                      Qa || null,
                      Pa || 0,
                      La || 0,
                      Ua,
                      Oa,
                      Va
                    ));
            }
        }
        return (
          k == n
            ? (j !== x && j !== w) ||
              (clearTimeout(_a),
              clearTimeout(ab),
              Z() && !aa()
                ? (($a = Aa()),
                  (_a = setTimeout(
                    a.proxy(function () {
                      ($a = null),
                        Sa.trigger("tap", [b.target]),
                        c.tap && (q = c.tap.call(Sa, b, b.target));
                    }, this),
                    c.doubleTapThreshold
                  )))
                : (($a = null),
                  Sa.trigger("tap", [b.target]),
                  c.tap && (q = c.tap.call(Sa, b, b.target))))
            : k == o
            ? (j !== x && j !== w) ||
              (clearTimeout(_a),
              ($a = null),
              Sa.trigger("doubletap", [b.target]),
              c.doubleTap && (q = c.doubleTap.call(Sa, b, b.target)))
            : k == p &&
              ((j !== x && j !== w) ||
                (clearTimeout(_a),
                ($a = null),
                Sa.trigger("longtap", [b.target]),
                c.longTap && (q = c.longTap.call(Sa, b, b.target)))),
          q
        );
      }
      function L() {
        var a = !0;
        return null !== c.threshold && (a = Ja >= c.threshold), a;
      }
      function M() {
        var a = !1;
        return (
          null !== c.cancelThreshold &&
            null !== Ka &&
            (a = qa(Ka) - Ja >= c.cancelThreshold),
          a
        );
      }
      function N() {
        return null === c.pinchThreshold || Pa >= c.pinchThreshold;
      }
      function O() {
        var a;
        return (a = !c.maxTimeThreshold || !(La >= c.maxTimeThreshold));
      }
      function P(a, b) {
        if (c.allowPageScroll === j || R()) a.preventDefault();
        else {
          var h = c.allowPageScroll === k;
          switch (b) {
            case d:
              ((c.swipeLeft && h) || (!h && c.allowPageScroll != q)) &&
                a.preventDefault();
              break;
            case e:
              ((c.swipeRight && h) || (!h && c.allowPageScroll != q)) &&
                a.preventDefault();
              break;
            case f:
              ((c.swipeUp && h) || (!h && c.allowPageScroll != r)) &&
                a.preventDefault();
              break;
            case g:
              ((c.swipeDown && h) || (!h && c.allowPageScroll != r)) &&
                a.preventDefault();
          }
        }
      }
      function Q() {
        var a = W(),
          b = X(),
          c = N();
        return a && b && c;
      }
      function R() {
        return !!(c.pinchStatus || c.pinchIn || c.pinchOut);
      }
      function S() {
        return !(!Q() || !R());
      }
      function T() {
        var a = O(),
          b = L(),
          c = W(),
          d = X(),
          e = M(),
          f = !e && d && c && b && a;
        return f;
      }
      function U() {
        return !!(
          c.swipe ||
          c.swipeStatus ||
          c.swipeLeft ||
          c.swipeRight ||
          c.swipeUp ||
          c.swipeDown
        );
      }
      function V() {
        return !(!T() || !U());
      }
      function W() {
        return Ua === c.fingers || c.fingers === s || !y;
      }
      function X() {
        return 0 !== Va[0].end.x;
      }
      function Y() {
        return !!c.tap;
      }
      function Z() {
        return !!c.doubleTap;
      }
      function $() {
        return !!c.longTap;
      }
      function _() {
        if (null == $a) return !1;
        var a = Aa();
        return Z() && a - $a <= c.doubleTapThreshold;
      }
      function aa() {
        return _();
      }
      function ba() {
        return (1 === Ua || !y) && (isNaN(Ja) || Ja < c.threshold);
      }
      function ca() {
        return La > c.longTapThreshold && Ja < t;
      }
      function da() {
        return !(!ba() || !Y());
      }
      function ea() {
        return !(!_() || !Z());
      }
      function fa() {
        return !(!ca() || !$());
      }
      function ga() {
        (Ya = Aa()), (Za = event.touches.length + 1);
      }
      function ha() {
        (Ya = 0), (Za = 0);
      }
      function ia() {
        var a = !1;
        if (Ya) {
          var b = Aa() - Ya;
          b <= c.fingerReleaseThreshold && (a = !0);
        }
        return a;
      }
      function ja() {
        return !(Sa.data(B + "_intouch") !== !0);
      }
      function ka(a) {
        a === !0
          ? (Sa.bind(Fa, D), Sa.bind(Ga, E), Ha && Sa.bind(Ha, G))
          : (Sa.unbind(Fa, D, !1),
            Sa.unbind(Ga, E, !1),
            Ha && Sa.unbind(Ha, G, !1)),
          Sa.data(B + "_intouch", a === !0);
      }
      function la(a, b) {
        var c = void 0 !== b.identifier ? b.identifier : 0;
        return (
          (Va[a].identifier = c),
          (Va[a].start.x = Va[a].end.x = b.pageX || b.clientX),
          (Va[a].start.y = Va[a].end.y = b.pageY || b.clientY),
          Va[a]
        );
      }
      function ma(a) {
        var b = void 0 !== a.identifier ? a.identifier : 0,
          c = na(b);
        return (
          (c.end.x = a.pageX || a.clientX), (c.end.y = a.pageY || a.clientY), c
        );
      }
      function na(a) {
        for (var b = 0; b < Va.length; b++)
          if (Va[b].identifier == a) return Va[b];
      }
      function oa() {
        for (var a = [], b = 0; b <= 5; b++)
          a.push({ start: { x: 0, y: 0 }, end: { x: 0, y: 0 }, identifier: 0 });
        return a;
      }
      function pa(a, b) {
        (b = Math.max(b, qa(a))), (Ra[a].distance = b);
      }
      function qa(a) {
        if (Ra[a]) return Ra[a].distance;
      }
      function ra() {
        var a = {};
        return (
          (a[d] = sa(d)), (a[e] = sa(e)), (a[f] = sa(f)), (a[g] = sa(g)), a
        );
      }
      function sa(a) {
        return { direction: a, distance: 0 };
      }
      function ta() {
        return Xa - Wa;
      }
      function ua(a, b) {
        var c = Math.abs(a.x - b.x),
          d = Math.abs(a.y - b.y);
        return Math.round(Math.sqrt(c * c + d * d));
      }
      function va(a, b) {
        var c = (b / a) * 1;
        return c.toFixed(2);
      }
      function wa() {
        return Oa < 1 ? i : h;
      }
      function xa(a, b) {
        return Math.round(
          Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2))
        );
      }
      function ya(a, b) {
        var c = a.x - b.x,
          d = b.y - a.y,
          e = Math.atan2(d, c),
          f = Math.round((180 * e) / Math.PI);
        return f < 0 && (f = 360 - Math.abs(f)), f;
      }
      function za(a, b) {
        var c = ya(a, b);
        return c <= 45 && c >= 0
          ? d
          : c <= 360 && c >= 315
          ? d
          : c >= 135 && c <= 225
          ? e
          : c > 45 && c < 135
          ? g
          : f;
      }
      function Aa() {
        var a = new Date();
        return a.getTime();
      }
      function Ba(b) {
        b = a(b);
        var c = b.offset(),
          d = {
            left: c.left,
            right: c.left + b.outerWidth(),
            top: c.top,
            bottom: c.top + b.outerHeight(),
          };
        return d;
      }
      function Ca(a, b) {
        return a.x > b.left && a.x < b.right && a.y > b.top && a.y < b.bottom;
      }
      var Da = y || A || !c.fallbackToMouseEvents,
        Ea = Da
          ? A
            ? z
              ? "MSPointerDown"
              : "pointerdown"
            : "touchstart"
          : "mousedown",
        Fa = Da
          ? A
            ? z
              ? "MSPointerMove"
              : "pointermove"
            : "touchmove"
          : "mousemove",
        Ga = Da
          ? A
            ? z
              ? "MSPointerUp"
              : "pointerup"
            : "touchend"
          : "mouseup",
        Ha = Da ? null : "mouseleave",
        Ia = A ? (z ? "MSPointerCancel" : "pointercancel") : "touchcancel",
        Ja = 0,
        Ka = null,
        La = 0,
        Ma = 0,
        Na = 0,
        Oa = 1,
        Pa = 0,
        Qa = 0,
        Ra = null,
        Sa = a(b),
        Ta = "start",
        Ua = 0,
        Va = null,
        Wa = 0,
        Xa = 0,
        Ya = 0,
        Za = 0,
        $a = 0,
        _a = null,
        ab = null;
      try {
        Sa.bind(Ea, C), Sa.bind(Ia, F);
      } catch (b) {
        a.error("events not supported " + Ea + "," + Ia + " on jQuery.swipe");
      }
      (this.enable = function () {
        return Sa.bind(Ea, C), Sa.bind(Ia, F), Sa;
      }),
        (this.disable = function () {
          return H(), Sa;
        }),
        (this.destroy = function () {
          return H(), Sa.data(B, null), Sa;
        }),
        (this.option = function (b, d) {
          if (void 0 !== c[b]) {
            if (void 0 === d) return c[b];
            c[b] = d;
          } else
            a.error("Option " + b + " does not exist on jQuery.swipe.options");
          return null;
        });
    }
    var d = "left",
      e = "right",
      f = "up",
      g = "down",
      h = "in",
      i = "out",
      j = "none",
      k = "auto",
      l = "swipe",
      m = "pinch",
      n = "tap",
      o = "doubletap",
      p = "longtap",
      q = "horizontal",
      r = "vertical",
      s = "all",
      t = 10,
      u = "start",
      v = "move",
      w = "end",
      x = "cancel",
      y = "ontouchstart" in window,
      z = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled,
      A = window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
      B = "TouchSwipe",
      C = {
        fingers: 1,
        threshold: 75,
        cancelThreshold: null,
        pinchThreshold: 20,
        maxTimeThreshold: null,
        fingerReleaseThreshold: 250,
        longTapThreshold: 500,
        doubleTapThreshold: 200,
        swipe: null,
        swipeLeft: null,
        swipeRight: null,
        swipeUp: null,
        swipeDown: null,
        swipeStatus: null,
        pinchIn: null,
        pinchOut: null,
        pinchStatus: null,
        click: null,
        tap: null,
        doubleTap: null,
        longTap: null,
        hold: null,
        triggerOnTouchEnd: !0,
        triggerOnTouchLeave: !1,
        allowPageScroll: "auto",
        fallbackToMouseEvents: !0,
        excludedElements: "label, button, input, select, textarea, a, .noSwipe",
      };
    (a.fn.swipe = function (c) {
      var d = a(this),
        e = d.data(B);
      if (e && "string" == typeof c) {
        if (e[c])
          return e[c].apply(this, Array.prototype.slice.call(arguments, 1));
        a.error("Method " + c + " does not exist on jQuery.swipe");
      } else if (!(e || ("object" != typeof c && c)))
        return b.apply(this, arguments);
      return d;
    }),
      (a.fn.swipe.defaults = C),
      (a.fn.swipe.phases = {
        PHASE_START: u,
        PHASE_MOVE: v,
        PHASE_END: w,
        PHASE_CANCEL: x,
      }),
      (a.fn.swipe.directions = {
        LEFT: d,
        RIGHT: e,
        UP: f,
        DOWN: g,
        IN: h,
        OUT: i,
      }),
      (a.fn.swipe.pageScroll = {
        NONE: j,
        HORIZONTAL: q,
        VERTICAL: r,
        AUTO: k,
      }),
      (a.fn.swipe.fingers = { ONE: 1, TWO: 2, THREE: 3, ALL: s });
  }),
  (function (a, b, c, d) {
    function f(b, c) {
      (this.element = b),
        (this.options = a.extend(!0, {}, h, c)),
        (this.options.share = c.share),
        (this._defaults = h),
        (this._name = g),
        this.init();
    }
    var g = "sharrre",
      h = {
        className: "sharrre",
        share: {
          googlePlus: !1,
          facebook: !1,
          twitter: !1,
          digg: !1,
          delicious: !1,
          stumbleupon: !1,
          linkedin: !1,
          pinterest: !1,
        },
        shareTotal: 0,
        template: "",
        title: "",
        url: c.location.href,
        text: c.title,
        urlCurl: "sharrre.php",
        count: {},
        total: 0,
        shorterTotal: !0,
        enableHover: !0,
        enableCounter: !0,
        enableTracking: !1,
        hover: function () {},
        hide: function () {},
        click: function () {},
        render: function () {},
        buttons: {
          googlePlus: {
            url: "",
            urlCount: !1,
            size: "medium",
            lang: "en-US",
            annotation: "",
          },
          facebook: {
            url: "",
            urlCount: !1,
            action: "like",
            layout: "button_count",
            width: "",
            send: "false",
            faces: "false",
            colorscheme: "",
            font: "",
            lang: "en_US",
          },
          twitter: {
            url: "",
            urlCount: !1,
            count: "horizontal",
            hashtags: "",
            via: "",
            related: "",
            lang: "en",
          },
          digg: { url: "", urlCount: !1, type: "DiggCompact" },
          delicious: { url: "", urlCount: !1, size: "medium" },
          stumbleupon: { url: "", urlCount: !1, layout: "1" },
          linkedin: { url: "", urlCount: !1, counter: "" },
          pinterest: {
            url: "",
            media: "",
            description: "",
            layout: "horizontal",
          },
        },
      },
      i = {
        googlePlus: "",
        facebook:
          "https://graph.facebook.com/fql?q=SELECT%20url,%20normalized_url,%20share_count,%20like_count,%20comment_count,%20total_count,commentsbox_count,%20comments_fbid,%20click_count%20FROM%20link_stat%20WHERE%20url=%27{url}%27&callback=?",
        twitter:
          "http://cdn.api.twitter.com/1/urls/count.json?url={url}&callback=?",
        digg:
          "http://services.digg.com/2.0/story.getInfo?links={url}&type=javascript&callback=?",
        delicious:
          "http://feeds.delicious.com/v2/json/urlinfo/data?url={url}&callback=?",
        stumbleupon: "",
        linkedin:
          "http://www.linkedin.com/countserv/count/share?format=jsonp&url={url}&callback=?",
        pinterest:
          "http://api.pinterest.com/v1/urls/count.json?url={url}&callback=?",
      },
      j = {
        googlePlus: function (d) {
          var e = d.options.buttons.googlePlus;
          a(d.element)
            .find(".buttons")
            .append(
              '<div class="button googleplus"><div class="g-plusone" data-size="' +
                e.size +
                '" data-href="' +
                ("" !== e.url ? e.url : d.options.url) +
                '" data-annotation="' +
                e.annotation +
                '"></div></div>'
            ),
            (b.___gcfg = { lang: d.options.buttons.googlePlus.lang });
          var f = 0;
          "undefined" == typeof gapi && 0 == f
            ? ((f = 1),
              (function () {
                var a = c.createElement("script");
                (a.type = "text/javascript"),
                  (a.async = !0),
                  (a.src = "//apis.google.com/js/plusone.js");
                var b = c.getElementsByTagName("script")[0];
                b.parentNode.insertBefore(a, b);
              })())
            : gapi.plusone.go();
        },
        facebook: function (b) {
          var d = b.options.buttons.facebook;
          a(b.element)
            .find(".buttons")
            .append(
              '<div class="button facebook"><div id="fb-root"></div><div class="fb-like" data-href="' +
                ("" !== d.url ? d.url : b.options.url) +
                '" data-send="' +
                d.send +
                '" data-layout="' +
                d.layout +
                '" data-width="' +
                d.width +
                '" data-show-faces="' +
                d.faces +
                '" data-action="' +
                d.action +
                '" data-colorscheme="' +
                d.colorscheme +
                '" data-font="' +
                d.font +
                '" data-via="' +
                d.via +
                '"></div></div>'
            );
          var e = 0;
          "undefined" == typeof FB && 0 == e
            ? ((e = 1),
              (function (a, b, c) {
                var e,
                  f = a.getElementsByTagName(b)[0];
                a.getElementById(c) ||
                  ((e = a.createElement(b)),
                  (e.id = c),
                  (e.src =
                    "//connect.facebook.net/" + d.lang + "/all.js#xfbml=1"),
                  f.parentNode.insertBefore(e, f));
              })(c, "script", "facebook-jssdk"))
            : FB.XFBML.parse();
        },
        twitter: function (b) {
          var d = b.options.buttons.twitter;
          a(b.element)
            .find(".buttons")
            .append(
              '<div class="button twitter"><a href="https://twitter.com/share" class="twitter-share-button" data-url="' +
                ("" !== d.url ? d.url : b.options.url) +
                '" data-count="' +
                d.count +
                '" data-text="' +
                b.options.text +
                '" data-via="' +
                d.via +
                '" data-hashtags="' +
                d.hashtags +
                '" data-related="' +
                d.related +
                '" data-lang="' +
                d.lang +
                '">Tweet</a></div>'
            );
          var e = 0;
          "undefined" == typeof twttr && 0 == e
            ? ((e = 1),
              (function () {
                var a = c.createElement("script");
                (a.type = "text/javascript"),
                  (a.async = !0),
                  (a.src = "//platform.twitter.com/widgets.js");
                var b = c.getElementsByTagName("script")[0];
                b.parentNode.insertBefore(a, b);
              })())
            : a.ajax({
                url: "//platform.twitter.com/widgets.js",
                dataType: "script",
                cache: !0,
              });
        },
        digg: function (b) {
          var d = b.options.buttons.digg;
          a(b.element)
            .find(".buttons")
            .append(
              '<div class="button digg"><a class="DiggThisButton ' +
                d.type +
                '" rel="nofollow external" href="http://digg.com/submit?url=' +
                encodeURIComponent("" !== d.url ? d.url : b.options.url) +
                '"></a></div>'
            );
          var e = 0;
          "undefined" == typeof __DBW &&
            0 == e &&
            ((e = 1),
            (function () {
              var a = c.createElement("SCRIPT"),
                b = c.getElementsByTagName("SCRIPT")[0];
              (a.type = "text/javascript"),
                (a.async = !0),
                (a.src = "//widgets.digg.com/buttons.js"),
                b.parentNode.insertBefore(a, b);
            })());
        },
        delicious: function (b) {
          if ("tall" == b.options.buttons.delicious.size)
            var c = "width:50px;",
              d = "height:35px;width:50px;font-size:15px;line-height:35px;",
              e = "height:18px;line-height:18px;margin-top:3px;";
          else
            var c = "width:93px;",
              d =
                "float:right;padding:0 3px;height:20px;width:26px;line-height:20px;",
              e = "float:left;height:20px;line-height:20px;";
          var f = b.shorterTotal(b.options.count.delicious);
          "undefined" == typeof f && (f = 0),
            a(b.element)
              .find(".buttons")
              .append(
                '<div class="button delicious"><div style="' +
                  c +
                  'font:12px Arial,Helvetica,sans-serif;cursor:pointer;color:#666666;display:inline-block;float:none;height:20px;line-height:normal;margin:0;padding:0;text-indent:0;vertical-align:baseline;"><div style="' +
                  d +
                  'background-color:#fff;margin-bottom:5px;overflow:hidden;text-align:center;border:1px solid #ccc;border-radius:3px;">' +
                  f +
                  '</div><div style="' +
                  e +
                  'display:block;padding:0;text-align:center;text-decoration:none;width:50px;background-color:#7EACEE;border:1px solid #40679C;border-radius:3px;color:#fff;"><img src="http://www.delicious.com/static/img/delicious.small.gif" height="10" width="10" alt="Delicious" /> Add</div></div></div>'
              ),
            a(b.element)
              .find(".delicious")
              .on("click", function () {
                b.openPopup("delicious");
              });
        },
        stumbleupon: function (d) {
          var e = d.options.buttons.stumbleupon;
          a(d.element)
            .find(".buttons")
            .append(
              '<div class="button stumbleupon"><su:badge layout="' +
                e.layout +
                '" location="' +
                ("" !== e.url ? e.url : d.options.url) +
                '"></su:badge></div>'
            );
          var f = 0;
          "undefined" == typeof STMBLPN && 0 == f
            ? ((f = 1),
              (function () {
                var a = c.createElement("script");
                (a.type = "text/javascript"),
                  (a.async = !0),
                  (a.src = "//platform.stumbleupon.com/1/widgets.js");
                var b = c.getElementsByTagName("script")[0];
                b.parentNode.insertBefore(a, b);
              })(),
              (s = b.setTimeout(function () {
                "undefined" != typeof STMBLPN &&
                  (STMBLPN.processWidgets(), clearInterval(s));
              }, 500)))
            : STMBLPN.processWidgets();
        },
        linkedin: function (d) {
          var e = d.options.buttons.linkedin;
          a(d.element)
            .find(".buttons")
            .append(
              '<div class="button linkedin"><script type="in/share" data-url="' +
                ("" !== e.url ? e.url : d.options.url) +
                '" data-counter="' +
                e.counter +
                '"></script></div>'
            );
          var f = 0;
          "undefined" == typeof b.IN && 0 == f
            ? ((f = 1),
              (function () {
                var a = c.createElement("script");
                (a.type = "text/javascript"),
                  (a.async = !0),
                  (a.src = "//platform.linkedin.com/in.js");
                var b = c.getElementsByTagName("script")[0];
                b.parentNode.insertBefore(a, b);
              })())
            : b.IN.init();
        },
        pinterest: function (b) {
          var d = b.options.buttons.pinterest;
          a(b.element)
            .find(".buttons")
            .append(
              '<div class="button pinterest"><a href="http://pinterest.com/pin/create/button/?url=' +
                ("" !== d.url ? d.url : b.options.url) +
                "&media=" +
                d.media +
                "&description=" +
                d.description +
                '" class="pin-it-button" count-layout="' +
                d.layout +
                '">Pin It</a></div>'
            ),
            (function () {
              var a = c.createElement("script");
              (a.type = "text/javascript"),
                (a.async = !0),
                (a.src = "//assets.pinterest.com/js/pinit.js");
              var b = c.getElementsByTagName("script")[0];
              b.parentNode.insertBefore(a, b);
            })();
        },
      },
      k = {
        googlePlus: function () {},
        facebook: function () {
          fb = b.setInterval(function () {
            "undefined" != typeof FB &&
              (FB.Event.subscribe("edge.create", function (a) {
                _gaq.push(["_trackSocial", "facebook", "like", a]);
              }),
              FB.Event.subscribe("edge.remove", function (a) {
                _gaq.push(["_trackSocial", "facebook", "unlike", a]);
              }),
              FB.Event.subscribe("message.send", function (a) {
                _gaq.push(["_trackSocial", "facebook", "send", a]);
              }),
              clearInterval(fb));
          }, 1e3);
        },
        twitter: function () {
          tw = b.setInterval(function () {
            "undefined" != typeof twttr &&
              (twttr.events.bind("tweet", function (a) {
                a && _gaq.push(["_trackSocial", "twitter", "tweet"]);
              }),
              clearInterval(tw));
          }, 1e3);
        },
        digg: function () {},
        delicious: function () {},
        stumbleupon: function () {},
        linkedin: function () {},
        pinterest: function () {},
      },
      l = {
        googlePlus: function (a) {
          b.open(
            "https://plus.google.com/share?hl=" +
              a.buttons.googlePlus.lang +
              "&url=" +
              encodeURIComponent(
                "" !== a.buttons.googlePlus.url
                  ? a.buttons.googlePlus.url
                  : a.url
              ),
            "",
            "toolbar=0, status=0, width=900, height=500"
          );
        },
        facebook: function (a) {
          b.open(
            "http://www.facebook.com/sharer/sharer.php?u=" +
              encodeURIComponent(
                "" !== a.buttons.facebook.url ? a.buttons.facebook.url : a.url
              ) +
              "&t=" +
              a.text,
            "",
            "toolbar=0, status=0, width=900, height=500"
          );
        },
        twitter: function (a) {
          b.open(
            "https://twitter.com/intent/tweet?text=" +
              encodeURIComponent(a.text) +
              "&url=" +
              encodeURIComponent(
                "" !== a.buttons.twitter.url ? a.buttons.twitter.url : a.url
              ) +
              ("" !== a.buttons.twitter.via
                ? "&via=" + a.buttons.twitter.via
                : ""),
            "",
            "toolbar=0, status=0, width=650, height=360"
          );
        },
        digg: function (a) {
          b.open(
            "http://digg.com/tools/diggthis/submit?url=" +
              encodeURIComponent(
                "" !== a.buttons.digg.url ? a.buttons.digg.url : a.url
              ) +
              "&title=" +
              a.text +
              "&related=true&style=true",
            "",
            "toolbar=0, status=0, width=650, height=360"
          );
        },
        delicious: function (a) {
          b.open(
            "http://www.delicious.com/save?v=5&noui&jump=close&url=" +
              encodeURIComponent(
                "" !== a.buttons.delicious.url ? a.buttons.delicious.url : a.url
              ) +
              "&title=" +
              a.text,
            "delicious",
            "toolbar=no,width=550,height=550"
          );
        },
        stumbleupon: function (a) {
          b.open(
            "http://www.stumbleupon.com/badge/?url=" +
              encodeURIComponent(
                "" !== a.buttons.delicious.url ? a.buttons.delicious.url : a.url
              ),
            "stumbleupon",
            "toolbar=no,width=550,height=550"
          );
        },
        linkedin: function (a) {
          b.open(
            "https://www.linkedin.com/cws/share?url=" +
              encodeURIComponent(
                "" !== a.buttons.delicious.url ? a.buttons.delicious.url : a.url
              ) +
              "&token=&isFramed=true",
            "linkedin",
            "toolbar=no,width=550,height=550"
          );
        },
        pinterest: function (a) {
          b.open(
            "http://pinterest.com/pin/create/button/?url=" +
              encodeURIComponent(
                "" !== a.buttons.pinterest.url ? a.buttons.pinterest.url : a.url
              ) +
              "&media=" +
              encodeURIComponent(a.buttons.pinterest.media) +
              "&description=" +
              a.buttons.pinterest.description,
            "pinterest",
            "toolbar=no,width=700,height=300"
          );
        },
      };
    (f.prototype.init = function () {
      var b = this;
      "" !== this.options.urlCurl &&
        ((i.googlePlus = this.options.urlCurl + "?url={url}&type=googlePlus"),
        (i.stumbleupon = this.options.urlCurl + "?url={url}&type=stumbleupon")),
        a(this.element).addClass(this.options.className),
        "undefined" != typeof a(this.element).data("title") &&
          (this.options.title = a(this.element).attr("data-title")),
        "undefined" != typeof a(this.element).data("url") &&
          (this.options.url = a(this.element).data("url")),
        "undefined" != typeof a(this.element).data("text") &&
          (this.options.text = a(this.element).data("text")),
        a.each(this.options.share, function (a, c) {
          c === !0 && b.options.shareTotal++;
        }),
        b.options.enableCounter === !0
          ? a.each(this.options.share, function (a, c) {
              if (c === !0)
                try {
                  b.getSocialJson(a);
                } catch (a) {}
            })
          : "" !== b.options.template
          ? this.options.render(this, this.options)
          : this.loadButtons(),
        a(this.element).hover(
          function () {
            0 === a(this).find(".buttons").length &&
              b.options.enableHover === !0 &&
              b.loadButtons(),
              b.options.hover(b, b.options);
          },
          function () {
            b.options.hide(b, b.options);
          }
        ),
        a(this.element).click(function () {
          return b.options.click(b, b.options), !1;
        });
    }),
      (f.prototype.loadButtons = function () {
        var b = this;
        a(this.element).append('<div class="buttons"></div>'),
          a.each(b.options.share, function (a, c) {
            1 == c && (j[a](b), b.options.enableTracking === !0 && k[a]());
          });
      }),
      (f.prototype.getSocialJson = function (b) {
        var c = this,
          d = 0,
          e = i[b].replace("{url}", encodeURIComponent(this.options.url));
        this.options.buttons[b].urlCount === !0 &&
          "" !== this.options.buttons[b].url &&
          (e = i[b].replace("{url}", this.options.buttons[b].url)),
          "" != e && "" !== c.options.urlCurl
            ? a
                .getJSON(e, function (a) {
                  if ("undefined" != typeof a.count) {
                    var e = a.count + "";
                    (e = e.replace("Â ", "")), (d += parseInt(e, 10));
                  } else a.data && a.data.length > 0 && "undefined" != typeof a.data[0].total_count ? (d += parseInt(a.data[0].total_count, 10)) : "undefined" != typeof a[0] ? (d += parseInt(a[0].total_posts, 10)) : "undefined" != typeof a[0];
                  (c.options.count[b] = d),
                    (c.options.total += d),
                    c.renderer(),
                    c.rendererPerso();
                })
                .error(function () {
                  (c.options.count[b] = 0), c.rendererPerso();
                })
            : (c.renderer(), (c.options.count[b] = 0), c.rendererPerso());
      }),
      (f.prototype.rendererPerso = function () {
        var a = 0;
        for (e in this.options.count) a++;
        a === this.options.shareTotal &&
          this.options.render(this, this.options);
      }),
      (f.prototype.renderer = function () {
        var b = this.options.total,
          c = this.options.template;
        this.options.shorterTotal === !0 && (b = this.shorterTotal(b)),
          "" !== c
            ? ((c = c.replace("{total}", b)), a(this.element).html(c))
            : a(this.element).html(
                '<div class="box"><a class="count" href="#">' +
                  b +
                  "</a>" +
                  ("" !== this.options.title
                    ? '<a class="share" href="#">' + this.options.title + "</a>"
                    : "") +
                  "</div>"
              );
      }),
      (f.prototype.shorterTotal = function (a) {
        return (
          a >= 1e6
            ? (a = (a / 1e6).toFixed(2) + "M")
            : a >= 1e3 && (a = (a / 1e3).toFixed(1) + "k"),
          a
        );
      }),
      (f.prototype.openPopup = function (a) {
        if ((l[a](this.options), this.options.enableTracking === !0)) {
          var b = {
            googlePlus: { site: "Google", action: "+1" },
            facebook: { site: "facebook", action: "like" },
            twitter: { site: "twitter", action: "tweet" },
            digg: { site: "digg", action: "add" },
            delicious: { site: "delicious", action: "add" },
            stumbleupon: { site: "stumbleupon", action: "add" },
            linkedin: { site: "linkedin", action: "share" },
            pinterest: { site: "pinterest", action: "pin" },
          };
          _gaq.push(["_trackSocial", b[a].site, b[a].action]);
        }
      }),
      (f.prototype.simulateClick = function () {
        var b = a(this.element).html();
        a(this.element).html(
          b.replace(this.options.total, this.options.total + 1)
        );
      }),
      (f.prototype.update = function (a, b) {
        "" !== a && (this.options.url = a), "" !== b && (this.options.text = b);
      }),
      (a.fn[g] = function (b) {
        var c = arguments;
        return b === d || "object" == typeof b
          ? this.each(function () {
              a.data(this, "plugin_" + g) ||
                a.data(this, "plugin_" + g, new f(this, b));
            })
          : "string" == typeof b && "_" !== b[0] && "init" !== b
          ? this.each(function () {
              var d = a.data(this, "plugin_" + g);
              d instanceof f &&
                "function" == typeof d[b] &&
                d[b].apply(d, Array.prototype.slice.call(c, 1));
            })
          : void 0;
      });
  })(jQuery, window, document),
  ($.fn.nextOrFirst = function (a) {
    var b = this.next(a);
    return b.length ? b : this.prevAll(a).last();
  }),
  ($.fn.prevOrLast = function (a) {
    var b = this.prev(a);
    return b.length ? b : this.nextAll(a).last();
  }),
  (function (a, b, c) {
    function d(a) {
      return (a = a || location.href), "#" + a.replace(/^[^#]*#?(.*)$/, "$1");
    }
    var e,
      f = "hashchange",
      g = document,
      h = a.event.special,
      i = g.documentMode,
      j = "on" + f in b && (i === c || i > 7);
    (a.fn[f] = function (a) {
      return a ? this.bind(f, a) : this.trigger(f);
    }),
      (a.fn[f].delay = 50),
      (h[f] = a.extend(h[f], {
        setup: function () {
          return !j && void a(e.start);
        },
        teardown: function () {
          return !j && void a(e.stop);
        },
      })),
      (e = (function () {
        function e() {
          var c = d(),
            h = l(i);
          c !== i
            ? (k((i = c), h), a(b).trigger(f))
            : h !== i && (location.href = location.href.replace(/#.*/, "") + h),
            (g = setTimeout(e, a.fn[f].delay));
        }
        var g,
          h = {},
          i = d(),
          j = function (a) {
            return a;
          },
          k = j,
          l = j;
        return (
          (h.start = function () {
            g || e();
          }),
          (h.stop = function () {
            g && clearTimeout(g), (g = c);
          }),
          h
        );
      })());
  })(jQuery, this),
  +(function () {
    "use strict";
    function a(a) {
      var b = { top: 0, left: 0 };
      if (!a.offsetParent) return b;
      do (b.left += a.offsetLeft), (b.top += a.offsetTop);
      while ((a = a.offsetParent));
      return b;
    }
    function b() {
      (this._activeZoom = this._initialScrollPosition = this._initialTouchPosition = this._touchMoveListener = null),
        (this._document = document),
        (this._window = window),
        (this._body = document.body);
    }
    function c(a) {
      (this._fullHeight = this._fullWidth = this._overlay = this._targetImageWrap = null),
        (this._targetImage = a),
        (this._body = document.body);
    }
    var d, e, f, g, h, i;
    (b.prototype.listen = function () {
      document.body.addEventListener(
        "click",
        function (a) {
          "zoom" === a.target.getAttribute("data-action") && this._zoom(a);
        }.bind(this)
      );
    }),
      (b.prototype._zoom = function (a) {
        var b = a.target;
        if (
          b &&
          "IMG" == b.tagName &&
          !this._body.classList.contains("zoom-overlay-open")
        ) {
          if (a.metaKey || a.ctrlKey)
            return window.open(
              a.target.getAttribute("data-original") ||
                a.target.currentSrc ||
                a.target.src,
              "_blank"
            );
          this._activeZoomClose(!0),
            (this._activeZoom = new c(b)),
            this._activeZoom.zoomImage(),
            (d = this._scrollHandler.bind(this)),
            (e = this._clickHandler.bind(this)),
            (f = this._keyHandler.bind(this)),
            (g = this._touchStart.bind(this)),
            this._window.addEventListener("scroll", d),
            this._document.addEventListener("click", e),
            this._document.addEventListener("keyup", f),
            this._document.addEventListener("touchstart", g),
            a.stopPropagation();
        }
      }),
      (b.prototype._activeZoomClose = function (a) {
        this._activeZoom &&
          (a ? this._activeZoom.dispose() : this._activeZoom.close(),
          this._window.removeEventListener("scroll", d),
          this._document.removeEventListener("click", e),
          this._document.removeEventListener("keyup", f),
          this._document.removeEventListener("touchstart", g),
          (this._activeZoom = null));
      }),
      (b.prototype._scrollHandler = function (a) {
        null === this._initialScrollPosition &&
          (this._initialScrollPosition = window.scrollY);
        var b = this._initialScrollPosition - window.scrollY;
        Math.abs(b) >= 40 && this._activeZoomClose();
      }),
      (b.prototype._keyHandler = function (a) {
        27 == a.keyCode && this._activeZoomClose();
      }),
      (b.prototype._clickHandler = function (a) {
        a.stopPropagation(), a.preventDefault(), this._activeZoomClose();
      }),
      (b.prototype._touchStart = function (a) {
        (this._initialTouchPosition = a.touches[0].pageY),
          (h = this._touchMove.bind(this)),
          a.target.addEventListener("touchmove", h);
      }),
      (b.prototype._touchMove = function (a) {
        Math.abs(a.touches[0].pageY - this._initialTouchPosition) > 10 &&
          (this._activeZoomClose(),
          a.target.removeEventListener("touchmove", h));
      }),
      (c.OFFSET = 80),
      (c._MAX_WIDTH = 2560),
      (c._MAX_HEIGHT = 4096),
      (c.prototype.zoomImage = function () {
        var a = document.createElement("img");
        (a.onload = function () {
          (this._fullHeight = Number(a.height)),
            (this._fullWidth = Number(a.width)),
            this._zoomOriginal();
        }.bind(this)),
          (a.src = this._targetImage.currentSrc || this._targetImage.src);
      }),
      (c.prototype._zoomOriginal = function () {
        (this._targetImageWrap = document.createElement("div")),
          (this._targetImageWrap.className = "zoom-img-wrap"),
          (this._targetImageWrap.style.position = "absolute"),
          (this._targetImageWrap.style.top = a(this._targetImage).top + "px"),
          (this._targetImageWrap.style.left = a(this._targetImage).left + "px"),
          (this._targetImageClone = this._targetImage.cloneNode()),
          (this._targetImageClone.style.visibility = "hidden"),
          (this._targetImage.style.width =
            this._targetImage.offsetWidth + "px"),
          this._targetImage.parentNode.replaceChild(
            this._targetImageClone,
            this._targetImage
          ),
          document.body.appendChild(this._targetImageWrap),
          this._targetImageWrap.appendChild(this._targetImage),
          this._targetImage.classList.add("zoom-img"),
          this._targetImage.setAttribute("data-action", "zoom-out"),
          (this._overlay = document.createElement("div")),
          (this._overlay.className = "zoom-overlay"),
          document.body.appendChild(this._overlay),
          this._calculateZoom(),
          this._triggerAnimation();
      }),
      (c.prototype._calculateZoom = function () {
        this._targetImage.offsetWidth;
        var a = this._fullWidth,
          b = this._fullHeight,
          d = (window.scrollY, a / this._targetImage.width),
          e = window.innerHeight - c.OFFSET,
          f = window.innerWidth - c.OFFSET,
          g = a / b,
          h = f / e;
        a < f && b < e
          ? (this._imgScaleFactor = d)
          : g < h
          ? (this._imgScaleFactor = (e / b) * d)
          : (this._imgScaleFactor = (f / a) * d);
      }),
      (c.prototype._triggerAnimation = function () {
        this._targetImage.offsetWidth;
        var b = a(this._targetImage),
          c = window.scrollY,
          d = c + window.innerHeight / 2,
          e = window.innerWidth / 2,
          f = b.top + this._targetImage.height / 2,
          g = b.left + this._targetImage.width / 2;
        (this._translateY = d - f),
          (this._translateX = e - g),
          (this._targetImage.style.webkitTransform =
            "scale3d(" +
            this._imgScaleFactor +
            "," +
            this._imgScaleFactor +
            "," +
            this._imgScaleFactor +
            ")"),
          (this._targetImageWrap.style.webkitTransform =
            "translate(" +
            this._translateX +
            "px, " +
            this._translateY +
            "px) translateZ(0)"),
          (this._targetImage.style.msTransform =
            "scale3d(" +
            this._imgScaleFactor +
            "," +
            this._imgScaleFactor +
            "," +
            this._imgScaleFactor +
            ")"),
          (this._targetImageWrap.style.msTransform =
            "translate(" +
            this._translateX +
            "px, " +
            this._translateY +
            "px) translateZ(0)"),
          (this._targetImage.style.transform =
            "scale3d(" +
            this._imgScaleFactor +
            "," +
            this._imgScaleFactor +
            "," +
            this._imgScaleFactor +
            ")"),
          (this._targetImageWrap.style.transform =
            "translate(" +
            this._translateX +
            "px, " +
            this._translateY +
            "px) translateZ(0)"),
          this._body.classList.add("zoom-overlay-open");
      }),
      (c.prototype.close = function () {
        return (
          this._body.classList.remove("zoom-overlay-open"),
          this._body.classList.add("zoom-overlay-transitioning"),
          (this._targetImage.style.webkitTransform = ""),
          (this._targetImageWrap.style.webkitTransform = ""),
          (this._targetImage.style.msTransform = ""),
          (this._targetImageWrap.style.msTransform = ""),
          (this._targetImage.style.transform = ""),
          (this._targetImageWrap.style.transform = ""),
          !1 in document.body.style
            ? this.dispose()
            : ((i = this.dispose.bind(this)),
              this._targetImage.addEventListener("transitionend", i),
              void this._targetImage.addEventListener("webkitTransitionEnd", i))
        );
      }),
      (c.prototype.dispose = function () {
        this._targetImageWrap &&
          this._targetImageWrap.parentNode &&
          (this._targetImage.classList.remove("zoom-img"),
          this._targetImage.setAttribute("data-action", "zoom"),
          this._targetImageClone.parentNode.replaceChild(
            this._targetImage,
            this._targetImageClone
          ),
          this._targetImageWrap.parentNode.removeChild(this._targetImageWrap),
          this._overlay.parentNode.removeChild(this._overlay),
          this._body.classList.remove("zoom-overlay-transitioning")),
          this._targetImage.removeEventListener("transitionend", i),
          this._targetImage.removeEventListener("webkitTransitionEnd", i);
      }),
      $(function () {
        (window.isMobile && !window.enableMobileZoom) || new b().listen();
      });
  })();
var _gsScope =
  "undefined" != typeof module && module.exports && "undefined" != typeof global
    ? global
    : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
  "use strict";
  var a = document.documentElement,
    b = window,
    c = function (c, d) {
      var e = "x" === d ? "Width" : "Height",
        f = "scroll" + e,
        g = "client" + e,
        h = document.body;
      return c === b || c === a || c === h
        ? Math.max(a[f], h[f]) - (b["inner" + e] || a[g] || h[g])
        : c[f] - c["offset" + e];
    },
    d = _gsScope._gsDefine.plugin({
      propName: "scrollTo",
      API: 2,
      version: "1.7.5",
      init: function (a, d, e) {
        return (
          (this._wdw = a === b),
          (this._target = a),
          (this._tween = e),
          "object" != typeof d && (d = { y: d }),
          (this.vars = d),
          (this._autoKill = d.autoKill !== !1),
          (this.x = this.xPrev = this.getX()),
          (this.y = this.yPrev = this.getY()),
          null != d.x
            ? (this._addTween(
                this,
                "x",
                this.x,
                "max" === d.x ? c(a, "x") : d.x,
                "scrollTo_x",
                !0
              ),
              this._overwriteProps.push("scrollTo_x"))
            : (this.skipX = !0),
          null != d.y
            ? (this._addTween(
                this,
                "y",
                this.y,
                "max" === d.y ? c(a, "y") : d.y,
                "scrollTo_y",
                !0
              ),
              this._overwriteProps.push("scrollTo_y"))
            : (this.skipY = !0),
          !0
        );
      },
      set: function (a) {
        this._super.setRatio.call(this, a);
        var d = this._wdw || !this.skipX ? this.getX() : this.xPrev,
          e = this._wdw || !this.skipY ? this.getY() : this.yPrev,
          f = e - this.yPrev,
          g = d - this.xPrev;
        this._autoKill &&
          (!this.skipX &&
            (g > 7 || -7 > g) &&
            c(this._target, "x") > d &&
            (this.skipX = !0),
          !this.skipY &&
            (f > 7 || -7 > f) &&
            c(this._target, "y") > e &&
            (this.skipY = !0),
          this.skipX &&
            this.skipY &&
            (this._tween.kill(),
            this.vars.onAutoKill &&
              this.vars.onAutoKill.apply(
                this.vars.onAutoKillScope || this._tween,
                this.vars.onAutoKillParams || []
              ))),
          this._wdw
            ? b.scrollTo(this.skipX ? d : this.x, this.skipY ? e : this.y)
            : (this.skipY || (this._target.scrollTop = this.y),
              this.skipX || (this._target.scrollLeft = this.x)),
          (this.xPrev = this.x),
          (this.yPrev = this.y);
      },
    }),
    e = d.prototype;
  (d.max = c),
    (e.getX = function () {
      return this._wdw
        ? null != b.pageXOffset
          ? b.pageXOffset
          : null != a.scrollLeft
          ? a.scrollLeft
          : document.body.scrollLeft
        : this._target.scrollLeft;
    }),
    (e.getY = function () {
      return this._wdw
        ? null != b.pageYOffset
          ? b.pageYOffset
          : null != a.scrollTop
          ? a.scrollTop
          : document.body.scrollTop
        : this._target.scrollTop;
    }),
    (e._kill = function (a) {
      return (
        a.scrollTo_x && (this.skipX = !0),
        a.scrollTo_y && (this.skipY = !0),
        this._super._kill.call(this, a)
      );
    });
}),
  _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
  (function (a, b) {
    "use strict";
    var c = (a.GreenSockGlobals = a.GreenSockGlobals || a);
    if (!c.TweenLite) {
      var d,
        e,
        f,
        g,
        h,
        i = function (a) {
          var b,
            d = a.split("."),
            e = c;
          for (b = 0; d.length > b; b++) e[d[b]] = e = e[d[b]] || {};
          return e;
        },
        j = i("com.greensock"),
        k = 1e-10,
        l = function (a) {
          var b,
            c = [],
            d = a.length;
          for (b = 0; b !== d; c.push(a[b++]));
          return c;
        },
        m = function () {},
        n = (function () {
          var a = Object.prototype.toString,
            b = a.call([]);
          return function (c) {
            return (
              null != c &&
              (c instanceof Array ||
                ("object" == typeof c && !!c.push && a.call(c) === b))
            );
          };
        })(),
        o = {},
        p = function (d, e, f, g) {
          (this.sc = o[d] ? o[d].sc : []),
            (o[d] = this),
            (this.gsClass = null),
            (this.func = f);
          var h = [];
          (this.check = function (j) {
            for (var k, l, m, n, q = e.length, r = q; --q > -1; )
              (k = o[e[q]] || new p(e[q], [])).gsClass
                ? ((h[q] = k.gsClass), r--)
                : j && k.sc.push(this);
            if (0 === r && f)
              for (
                l = ("com.greensock." + d).split("."),
                  m = l.pop(),
                  n = i(l.join("."))[m] = this.gsClass = f.apply(f, h),
                  g &&
                    ((c[m] = n),
                    "function" == typeof define && define.amd
                      ? define((a.GreenSockAMDPath
                          ? a.GreenSockAMDPath + "/"
                          : "") + d.split(".").pop(), [], function () {
                          return n;
                        })
                      : d === b &&
                        "undefined" != typeof module &&
                        module.exports &&
                        (module.exports = n)),
                  q = 0;
                this.sc.length > q;
                q++
              )
                this.sc[q].check();
          }),
            this.check(!0);
        },
        q = (a._gsDefine = function (a, b, c, d) {
          return new p(a, b, c, d);
        }),
        r = (j._class = function (a, b, c) {
          return (
            (b = b || function () {}),
            q(
              a,
              [],
              function () {
                return b;
              },
              c
            ),
            b
          );
        });
      q.globals = c;
      var s = [0, 0, 1, 1],
        t = [],
        u = r(
          "easing.Ease",
          function (a, b, c, d) {
            (this._func = a),
              (this._type = c || 0),
              (this._power = d || 0),
              (this._params = b ? s.concat(b) : s);
          },
          !0
        ),
        v = (u.map = {}),
        w = (u.register = function (a, b, c, d) {
          for (
            var e,
              f,
              g,
              h,
              i = b.split(","),
              k = i.length,
              l = (c || "easeIn,easeOut,easeInOut").split(",");
            --k > -1;

          )
            for (
              f = i[k],
                e = d ? r("easing." + f, null, !0) : j.easing[f] || {},
                g = l.length;
              --g > -1;

            )
              (h = l[g]),
                (v[f + "." + h] = v[h + f] = e[h] = a.getRatio
                  ? a
                  : a[h] || new a());
        });
      for (
        f = u.prototype,
          f._calcEnd = !1,
          f.getRatio = function (a) {
            if (this._func)
              return (
                (this._params[0] = a), this._func.apply(null, this._params)
              );
            var b = this._type,
              c = this._power,
              d = 1 === b ? 1 - a : 2 === b ? a : 0.5 > a ? 2 * a : 2 * (1 - a);
            return (
              1 === c
                ? (d *= d)
                : 2 === c
                ? (d *= d * d)
                : 3 === c
                ? (d *= d * d * d)
                : 4 === c && (d *= d * d * d * d),
              1 === b ? 1 - d : 2 === b ? d : 0.5 > a ? d / 2 : 1 - d / 2
            );
          },
          d = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"],
          e = d.length;
        --e > -1;

      )
        (f = d[e] + ",Power" + e),
          w(new u(null, null, 1, e), f, "easeOut", !0),
          w(
            new u(null, null, 2, e),
            f,
            "easeIn" + (0 === e ? ",easeNone" : "")
          ),
          w(new u(null, null, 3, e), f, "easeInOut");
      (v.linear = j.easing.Linear.easeIn), (v.swing = j.easing.Quad.easeInOut);
      var x = r("events.EventDispatcher", function (a) {
        (this._listeners = {}), (this._eventTarget = a || this);
      });
      (f = x.prototype),
        (f.addEventListener = function (a, b, c, d, e) {
          e = e || 0;
          var f,
            i,
            j = this._listeners[a],
            k = 0;
          for (
            null == j && (this._listeners[a] = j = []), i = j.length;
            --i > -1;

          )
            (f = j[i]),
              f.c === b && f.s === c
                ? j.splice(i, 1)
                : 0 === k && e > f.pr && (k = i + 1);
          j.splice(k, 0, { c: b, s: c, up: d, pr: e }),
            this !== g || h || g.wake();
        }),
        (f.removeEventListener = function (a, b) {
          var c,
            d = this._listeners[a];
          if (d)
            for (c = d.length; --c > -1; )
              if (d[c].c === b) return void d.splice(c, 1);
        }),
        (f.dispatchEvent = function (a) {
          var b,
            c,
            d,
            e = this._listeners[a];
          if (e)
            for (b = e.length, c = this._eventTarget; --b > -1; )
              (d = e[b]),
                d &&
                  (d.up
                    ? d.c.call(d.s || c, { type: a, target: c })
                    : d.c.call(d.s || c));
        });
      var y = a.requestAnimationFrame,
        z = a.cancelAnimationFrame,
        A =
          Date.now ||
          function () {
            return new Date().getTime();
          },
        B = A();
      for (d = ["ms", "moz", "webkit", "o"], e = d.length; --e > -1 && !y; )
        (y = a[d[e] + "RequestAnimationFrame"]),
          (z =
            a[d[e] + "CancelAnimationFrame"] ||
            a[d[e] + "CancelRequestAnimationFrame"]);
      r("Ticker", function (a, b) {
        var c,
          d,
          e,
          f,
          i,
          j = this,
          l = A(),
          n = b !== !1 && y,
          o = 500,
          p = 33,
          q = "tick",
          r = function (a) {
            var b,
              g,
              h = A() - B;
            h > o && (l += h - p),
              (B += h),
              (j.time = (B - l) / 1e3),
              (b = j.time - i),
              (!c || b > 0 || a === !0) &&
                (j.frame++, (i += b + (b >= f ? 0.004 : f - b)), (g = !0)),
              a !== !0 && (e = d(r)),
              g && j.dispatchEvent(q);
          };
        x.call(j),
          (j.time = j.frame = 0),
          (j.tick = function () {
            r(!0);
          }),
          (j.lagSmoothing = function (a, b) {
            (o = a || 1 / k), (p = Math.min(b, o, 0));
          }),
          (j.sleep = function () {
            null != e &&
              (n && z ? z(e) : clearTimeout(e),
              (d = m),
              (e = null),
              j === g && (h = !1));
          }),
          (j.wake = function () {
            null !== e ? j.sleep() : j.frame > 10 && (B = A() - o + 5),
              (d =
                0 === c
                  ? m
                  : n && y
                  ? y
                  : function (a) {
                      return setTimeout(a, 0 | (1e3 * (i - j.time) + 1));
                    }),
              j === g && (h = !0),
              r(2);
          }),
          (j.fps = function (a) {
            return arguments.length
              ? ((c = a),
                (f = 1 / (c || 60)),
                (i = this.time + f),
                void j.wake())
              : c;
          }),
          (j.useRAF = function (a) {
            return arguments.length ? (j.sleep(), (n = a), void j.fps(c)) : n;
          }),
          j.fps(a),
          setTimeout(function () {
            n && 5 > j.frame && j.useRAF(!1);
          }, 1500);
      }),
        (f = j.Ticker.prototype = new j.events.EventDispatcher()),
        (f.constructor = j.Ticker);
      var C = r("core.Animation", function (a, b) {
        if (
          ((this.vars = b = b || {}),
          (this._duration = this._totalDuration = a || 0),
          (this._delay = Number(b.delay) || 0),
          (this._timeScale = 1),
          (this._active = b.immediateRender === !0),
          (this.data = b.data),
          (this._reversed = b.reversed === !0),
          R)
        ) {
          h || g.wake();
          var c = this.vars.useFrames ? Q : R;
          c.add(this, c._time), this.vars.paused && this.paused(!0);
        }
      });
      (g = C.ticker = new j.Ticker()),
        (f = C.prototype),
        (f._dirty = f._gc = f._initted = f._paused = !1),
        (f._totalTime = f._time = 0),
        (f._rawPrevTime = -1),
        (f._next = f._last = f._onUpdate = f._timeline = f.timeline = null),
        (f._paused = !1);
      var D = function () {
        h && A() - B > 2e3 && g.wake(), setTimeout(D, 2e3);
      };
      D(),
        (f.play = function (a, b) {
          return null != a && this.seek(a, b), this.reversed(!1).paused(!1);
        }),
        (f.pause = function (a, b) {
          return null != a && this.seek(a, b), this.paused(!0);
        }),
        (f.resume = function (a, b) {
          return null != a && this.seek(a, b), this.paused(!1);
        }),
        (f.seek = function (a, b) {
          return this.totalTime(Number(a), b !== !1);
        }),
        (f.restart = function (a, b) {
          return this.reversed(!1)
            .paused(!1)
            .totalTime(a ? -this._delay : 0, b !== !1, !0);
        }),
        (f.reverse = function (a, b) {
          return (
            null != a && this.seek(a || this.totalDuration(), b),
            this.reversed(!0).paused(!1)
          );
        }),
        (f.render = function () {}),
        (f.invalidate = function () {
          return (
            (this._time = this._totalTime = 0),
            (this._initted = this._gc = !1),
            (this._rawPrevTime = -1),
            (this._gc || !this.timeline) && this._enabled(!0),
            this
          );
        }),
        (f.isActive = function () {
          var a,
            b = this._timeline,
            c = this._startTime;
          return (
            !b ||
            (!this._gc &&
              !this._paused &&
              b.isActive() &&
              (a = b.rawTime()) >= c &&
              c + this.totalDuration() / this._timeScale > a)
          );
        }),
        (f._enabled = function (a, b) {
          return (
            h || g.wake(),
            (this._gc = !a),
            (this._active = this.isActive()),
            b !== !0 &&
              (a && !this.timeline
                ? this._timeline.add(this, this._startTime - this._delay)
                : !a && this.timeline && this._timeline._remove(this, !0)),
            !1
          );
        }),
        (f._kill = function () {
          return this._enabled(!1, !1);
        }),
        (f.kill = function (a, b) {
          return this._kill(a, b), this;
        }),
        (f._uncache = function (a) {
          for (var b = a ? this : this.timeline; b; )
            (b._dirty = !0), (b = b.timeline);
          return this;
        }),
        (f._swapSelfInParams = function (a) {
          for (var b = a.length, c = a.concat(); --b > -1; )
            "{self}" === a[b] && (c[b] = this);
          return c;
        }),
        (f._callback = function (a) {
          var b = this.vars;
          b[a].apply(
            b[a + "Scope"] || b.callbackScope || this,
            b[a + "Params"] || t
          );
        }),
        (f.eventCallback = function (a, b, c, d) {
          if ("on" === (a || "").substr(0, 2)) {
            var e = this.vars;
            if (1 === arguments.length) return e[a];
            null == b
              ? delete e[a]
              : ((e[a] = b),
                (e[a + "Params"] =
                  n(c) && -1 !== c.join("").indexOf("{self}")
                    ? this._swapSelfInParams(c)
                    : c),
                (e[a + "Scope"] = d)),
              "onUpdate" === a && (this._onUpdate = b);
          }
          return this;
        }),
        (f.delay = function (a) {
          return arguments.length
            ? (this._timeline.smoothChildTiming &&
                this.startTime(this._startTime + a - this._delay),
              (this._delay = a),
              this)
            : this._delay;
        }),
        (f.duration = function (a) {
          return arguments.length
            ? ((this._duration = this._totalDuration = a),
              this._uncache(!0),
              this._timeline.smoothChildTiming &&
                this._time > 0 &&
                this._time < this._duration &&
                0 !== a &&
                this.totalTime(this._totalTime * (a / this._duration), !0),
              this)
            : ((this._dirty = !1), this._duration);
        }),
        (f.totalDuration = function (a) {
          return (
            (this._dirty = !1),
            arguments.length ? this.duration(a) : this._totalDuration
          );
        }),
        (f.time = function (a, b) {
          return arguments.length
            ? (this._dirty && this.totalDuration(),
              this.totalTime(a > this._duration ? this._duration : a, b))
            : this._time;
        }),
        (f.totalTime = function (a, b, c) {
          if ((h || g.wake(), !arguments.length)) return this._totalTime;
          if (this._timeline) {
            if (
              (0 > a && !c && (a += this.totalDuration()),
              this._timeline.smoothChildTiming)
            ) {
              this._dirty && this.totalDuration();
              var d = this._totalDuration,
                e = this._timeline;
              if (
                (a > d && !c && (a = d),
                (this._startTime =
                  (this._paused ? this._pauseTime : e._time) -
                  (this._reversed ? d - a : a) / this._timeScale),
                e._dirty || this._uncache(!1),
                e._timeline)
              )
                for (; e._timeline; )
                  e._timeline._time !==
                    (e._startTime + e._totalTime) / e._timeScale &&
                    e.totalTime(e._totalTime, !0),
                    (e = e._timeline);
            }
            this._gc && this._enabled(!0, !1),
              (this._totalTime !== a || 0 === this._duration) &&
                (this.render(a, b, !1), I.length && T());
          }
          return this;
        }),
        (f.progress = f.totalProgress = function (a, b) {
          return arguments.length
            ? this.totalTime(this.duration() * a, b)
            : this._time / this.duration();
        }),
        (f.startTime = function (a) {
          return arguments.length
            ? (a !== this._startTime &&
                ((this._startTime = a),
                this.timeline &&
                  this.timeline._sortChildren &&
                  this.timeline.add(this, a - this._delay)),
              this)
            : this._startTime;
        }),
        (f.endTime = function (a) {
          return (
            this._startTime +
            (0 != a ? this.totalDuration() : this.duration()) / this._timeScale
          );
        }),
        (f.timeScale = function (a) {
          if (!arguments.length) return this._timeScale;
          if (
            ((a = a || k), this._timeline && this._timeline.smoothChildTiming)
          ) {
            var b = this._pauseTime,
              c = b || 0 === b ? b : this._timeline.totalTime();
            this._startTime = c - ((c - this._startTime) * this._timeScale) / a;
          }
          return (this._timeScale = a), this._uncache(!1);
        }),
        (f.reversed = function (a) {
          return arguments.length
            ? (a != this._reversed &&
                ((this._reversed = a),
                this.totalTime(
                  this._timeline && !this._timeline.smoothChildTiming
                    ? this.totalDuration() - this._totalTime
                    : this._totalTime,
                  !0
                )),
              this)
            : this._reversed;
        }),
        (f.paused = function (a) {
          if (!arguments.length) return this._paused;
          var b,
            c,
            d = this._timeline;
          return (
            a != this._paused &&
              d &&
              (h || a || g.wake(),
              (b = d.rawTime()),
              (c = b - this._pauseTime),
              !a &&
                d.smoothChildTiming &&
                ((this._startTime += c), this._uncache(!1)),
              (this._pauseTime = a ? b : null),
              (this._paused = a),
              (this._active = this.isActive()),
              !a &&
                0 !== c &&
                this._initted &&
                this.duration() &&
                this.render(
                  d.smoothChildTiming
                    ? this._totalTime
                    : (b - this._startTime) / this._timeScale,
                  !0,
                  !0
                )),
            this._gc && !a && this._enabled(!0, !1),
            this
          );
        });
      var E = r("core.SimpleTimeline", function (a) {
        C.call(this, 0, a),
          (this.autoRemoveChildren = this.smoothChildTiming = !0);
      });
      (f = E.prototype = new C()),
        (f.constructor = E),
        (f.kill()._gc = !1),
        (f._first = f._last = f._recent = null),
        (f._sortChildren = !1),
        (f.add = f.insert = function (a, b) {
          var c, d;
          if (
            ((a._startTime = Number(b || 0) + a._delay),
            a._paused &&
              this !== a._timeline &&
              (a._pauseTime =
                a._startTime + (this.rawTime() - a._startTime) / a._timeScale),
            a.timeline && a.timeline._remove(a, !0),
            (a.timeline = a._timeline = this),
            a._gc && a._enabled(!0, !0),
            (c = this._last),
            this._sortChildren)
          )
            for (d = a._startTime; c && c._startTime > d; ) c = c._prev;
          return (
            c
              ? ((a._next = c._next), (c._next = a))
              : ((a._next = this._first), (this._first = a)),
            a._next ? (a._next._prev = a) : (this._last = a),
            (a._prev = c),
            (this._recent = a),
            this._timeline && this._uncache(!0),
            this
          );
        }),
        (f._remove = function (a, b) {
          return (
            a.timeline === this &&
              (b || a._enabled(!1, !0),
              a._prev
                ? (a._prev._next = a._next)
                : this._first === a && (this._first = a._next),
              a._next
                ? (a._next._prev = a._prev)
                : this._last === a && (this._last = a._prev),
              (a._next = a._prev = a.timeline = null),
              a === this._recent && (this._recent = this._last),
              this._timeline && this._uncache(!0)),
            this
          );
        }),
        (f.render = function (a, b, c) {
          var d,
            e = this._first;
          for (this._totalTime = this._time = this._rawPrevTime = a; e; )
            (d = e._next),
              (e._active || (a >= e._startTime && !e._paused)) &&
                (e._reversed
                  ? e.render(
                      (e._dirty ? e.totalDuration() : e._totalDuration) -
                        (a - e._startTime) * e._timeScale,
                      b,
                      c
                    )
                  : e.render((a - e._startTime) * e._timeScale, b, c)),
              (e = d);
        }),
        (f.rawTime = function () {
          return h || g.wake(), this._totalTime;
        });
      var F = r(
          "TweenLite",
          function (b, c, d) {
            if (
              (C.call(this, c, d),
              (this.render = F.prototype.render),
              null == b)
            )
              throw "Cannot tween a null target.";
            this.target = b = "string" != typeof b ? b : F.selector(b) || b;
            var e,
              f,
              g,
              h =
                b.jquery ||
                (b.length &&
                  b !== a &&
                  b[0] &&
                  (b[0] === a || (b[0].nodeType && b[0].style && !b.nodeType))),
              i = this.vars.overwrite;
            if (
              ((this._overwrite = i =
                null == i
                  ? P[F.defaultOverwrite]
                  : "number" == typeof i
                  ? i >> 0
                  : P[i]),
              (h || b instanceof Array || (b.push && n(b))) &&
                "number" != typeof b[0])
            )
              for (
                this._targets = g = l(b),
                  this._propLookup = [],
                  this._siblings = [],
                  e = 0;
                g.length > e;
                e++
              )
                (f = g[e]),
                  f
                    ? "string" != typeof f
                      ? f.length &&
                        f !== a &&
                        f[0] &&
                        (f[0] === a ||
                          (f[0].nodeType && f[0].style && !f.nodeType))
                        ? (g.splice(e--, 1),
                          (this._targets = g = g.concat(l(f))))
                        : ((this._siblings[e] = U(f, this, !1)),
                          1 === i &&
                            this._siblings[e].length > 1 &&
                            W(f, this, null, 1, this._siblings[e]))
                      : ((f = g[e--] = F.selector(f)),
                        "string" == typeof f && g.splice(e + 1, 1))
                    : g.splice(e--, 1);
            else
              (this._propLookup = {}),
                (this._siblings = U(b, this, !1)),
                1 === i &&
                  this._siblings.length > 1 &&
                  W(b, this, null, 1, this._siblings);
            (this.vars.immediateRender ||
              (0 === c &&
                0 === this._delay &&
                this.vars.immediateRender !== !1)) &&
              ((this._time = -k), this.render(-this._delay));
          },
          !0
        ),
        G = function (b) {
          return (
            b &&
            b.length &&
            b !== a &&
            b[0] &&
            (b[0] === a || (b[0].nodeType && b[0].style && !b.nodeType))
          );
        },
        H = function (a, b) {
          var c,
            d = {};
          for (c in a)
            O[c] ||
              (c in b &&
                "transform" !== c &&
                "x" !== c &&
                "y" !== c &&
                "width" !== c &&
                "height" !== c &&
                "className" !== c &&
                "border" !== c) ||
              !(!L[c] || (L[c] && L[c]._autoCSS)) ||
              ((d[c] = a[c]), delete a[c]);
          a.css = d;
        };
      (f = F.prototype = new C()),
        (f.constructor = F),
        (f.kill()._gc = !1),
        (f.ratio = 0),
        (f._firstPT = f._targets = f._overwrittenProps = f._startAt = null),
        (f._notifyPluginsOfEnabled = f._lazy = !1),
        (F.version = "1.17.0"),
        (F.defaultEase = f._ease = new u(null, null, 1, 1)),
        (F.defaultOverwrite = "auto"),
        (F.ticker = g),
        (F.autoSleep = 120),
        (F.lagSmoothing = function (a, b) {
          g.lagSmoothing(a, b);
        }),
        (F.selector =
          a.$ ||
          a.jQuery ||
          function (b) {
            var c = a.$ || a.jQuery;
            return c
              ? ((F.selector = c), c(b))
              : "undefined" == typeof document
              ? b
              : document.querySelectorAll
              ? document.querySelectorAll(b)
              : document.getElementById("#" === b.charAt(0) ? b.substr(1) : b);
          });
      var I = [],
        J = {},
        K = (F._internals = { isArray: n, isSelector: G, lazyTweens: I }),
        L = (F._plugins = {}),
        M = (K.tweenLookup = {}),
        N = 0,
        O = (K.reservedProps = {
          ease: 1,
          delay: 1,
          overwrite: 1,
          onComplete: 1,
          onCompleteParams: 1,
          onCompleteScope: 1,
          useFrames: 1,
          runBackwards: 1,
          startAt: 1,
          onUpdate: 1,
          onUpdateParams: 1,
          onUpdateScope: 1,
          onStart: 1,
          onStartParams: 1,
          onStartScope: 1,
          onReverseComplete: 1,
          onReverseCompleteParams: 1,
          onReverseCompleteScope: 1,
          onRepeat: 1,
          onRepeatParams: 1,
          onRepeatScope: 1,
          easeParams: 1,
          yoyo: 1,
          immediateRender: 1,
          repeat: 1,
          repeatDelay: 1,
          data: 1,
          paused: 1,
          reversed: 1,
          autoCSS: 1,
          lazy: 1,
          onOverwrite: 1,
          callbackScope: 1,
        }),
        P = {
          none: 0,
          all: 1,
          auto: 2,
          concurrent: 3,
          allOnStart: 4,
          preexisting: 5,
          true: 1,
          false: 0,
        },
        Q = (C._rootFramesTimeline = new E()),
        R = (C._rootTimeline = new E()),
        S = 30,
        T = (K.lazyRender = function () {
          var a,
            b = I.length;
          for (J = {}; --b > -1; )
            (a = I[b]),
              a &&
                a._lazy !== !1 &&
                (a.render(a._lazy[0], a._lazy[1], !0), (a._lazy = !1));
          I.length = 0;
        });
      (R._startTime = g.time),
        (Q._startTime = g.frame),
        (R._active = Q._active = !0),
        setTimeout(T, 1),
        (C._updateRoot = F.render = function () {
          var a, b, c;
          if (
            (I.length && T(),
            R.render((g.time - R._startTime) * R._timeScale, !1, !1),
            Q.render((g.frame - Q._startTime) * Q._timeScale, !1, !1),
            I.length && T(),
            g.frame >= S)
          ) {
            S = g.frame + (parseInt(F.autoSleep, 10) || 120);
            for (c in M) {
              for (b = M[c].tweens, a = b.length; --a > -1; )
                b[a]._gc && b.splice(a, 1);
              0 === b.length && delete M[c];
            }
            if (
              ((c = R._first),
              (!c || c._paused) &&
                F.autoSleep &&
                !Q._first &&
                1 === g._listeners.tick.length)
            ) {
              for (; c && c._paused; ) c = c._next;
              c || g.sleep();
            }
          }
        }),
        g.addEventListener("tick", C._updateRoot);
      var U = function (a, b, c) {
          var d,
            e,
            f = a._gsTweenID;
          if (
            (M[f || (a._gsTweenID = f = "t" + N++)] ||
              (M[f] = { target: a, tweens: [] }),
            b && ((d = M[f].tweens), (d[(e = d.length)] = b), c))
          )
            for (; --e > -1; ) d[e] === b && d.splice(e, 1);
          return M[f].tweens;
        },
        V = function (a, b, c, d) {
          var e,
            f,
            g = a.vars.onOverwrite;
          return (
            g && (e = g(a, b, c, d)),
            (g = F.onOverwrite),
            g && (f = g(a, b, c, d)),
            e !== !1 && f !== !1
          );
        },
        W = function (a, b, c, d, e) {
          var f, g, h, i;
          if (1 === d || d >= 4) {
            for (i = e.length, f = 0; i > f; f++)
              if ((h = e[f]) !== b) h._gc || (h._kill(null, a, b) && (g = !0));
              else if (5 === d) break;
            return g;
          }
          var j,
            l = b._startTime + k,
            m = [],
            n = 0,
            o = 0 === b._duration;
          for (f = e.length; --f > -1; )
            (h = e[f]) === b ||
              h._gc ||
              h._paused ||
              (h._timeline !== b._timeline
                ? ((j = j || X(b, 0, o)), 0 === X(h, j, o) && (m[n++] = h))
                : l >= h._startTime &&
                  h._startTime + h.totalDuration() / h._timeScale > l &&
                  (((o || !h._initted) && 2e-10 >= l - h._startTime) ||
                    (m[n++] = h)));
          for (f = n; --f > -1; )
            if (
              ((h = m[f]),
              2 === d && h._kill(c, a, b) && (g = !0),
              2 !== d || (!h._firstPT && h._initted))
            ) {
              if (2 !== d && !V(h, b)) continue;
              h._enabled(!1, !1) && (g = !0);
            }
          return g;
        },
        X = function (a, b, c) {
          for (
            var d = a._timeline, e = d._timeScale, f = a._startTime;
            d._timeline;

          ) {
            if (((f += d._startTime), (e *= d._timeScale), d._paused))
              return -100;
            d = d._timeline;
          }
          return (
            (f /= e),
            f > b
              ? f - b
              : (c && f === b) || (!a._initted && 2 * k > f - b)
              ? k
              : (f += a.totalDuration() / a._timeScale / e) > b + k
              ? 0
              : f - b - k
          );
        };
      (f._init = function () {
        var a,
          b,
          c,
          d,
          e,
          f = this.vars,
          g = this._overwrittenProps,
          h = this._duration,
          i = !!f.immediateRender,
          j = f.ease;
        if (f.startAt) {
          this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()),
            (e = {});
          for (d in f.startAt) e[d] = f.startAt[d];
          if (
            ((e.overwrite = !1),
            (e.immediateRender = !0),
            (e.lazy = i && f.lazy !== !1),
            (e.startAt = e.delay = null),
            (this._startAt = F.to(this.target, 0, e)),
            i)
          )
            if (this._time > 0) this._startAt = null;
            else if (0 !== h) return;
        } else if (f.runBackwards && 0 !== h)
          if (this._startAt)
            this._startAt.render(-1, !0),
              this._startAt.kill(),
              (this._startAt = null);
          else {
            0 !== this._time && (i = !1), (c = {});
            for (d in f) (O[d] && "autoCSS" !== d) || (c[d] = f[d]);
            if (
              ((c.overwrite = 0),
              (c.data = "isFromStart"),
              (c.lazy = i && f.lazy !== !1),
              (c.immediateRender = i),
              (this._startAt = F.to(this.target, 0, c)),
              i)
            ) {
              if (0 === this._time) return;
            } else
              this._startAt._init(),
                this._startAt._enabled(!1),
                this.vars.immediateRender && (this._startAt = null);
          }
        if (
          ((this._ease = j = j
            ? j instanceof u
              ? j
              : "function" == typeof j
              ? new u(j, f.easeParams)
              : v[j] || F.defaultEase
            : F.defaultEase),
          f.easeParams instanceof Array &&
            j.config &&
            (this._ease = j.config.apply(j, f.easeParams)),
          (this._easeType = this._ease._type),
          (this._easePower = this._ease._power),
          (this._firstPT = null),
          this._targets)
        )
          for (a = this._targets.length; --a > -1; )
            this._initProps(
              this._targets[a],
              (this._propLookup[a] = {}),
              this._siblings[a],
              g ? g[a] : null
            ) && (b = !0);
        else
          b = this._initProps(this.target, this._propLookup, this._siblings, g);
        if (
          (b && F._onPluginEvent("_onInitAllProps", this),
          g &&
            (this._firstPT ||
              ("function" != typeof this.target && this._enabled(!1, !1))),
          f.runBackwards)
        )
          for (c = this._firstPT; c; )
            (c.s += c.c), (c.c = -c.c), (c = c._next);
        (this._onUpdate = f.onUpdate), (this._initted = !0);
      }),
        (f._initProps = function (b, c, d, e) {
          var f, g, h, i, j, k;
          if (null == b) return !1;
          J[b._gsTweenID] && T(),
            this.vars.css ||
              (b.style &&
                b !== a &&
                b.nodeType &&
                L.css &&
                this.vars.autoCSS !== !1 &&
                H(this.vars, b));
          for (f in this.vars) {
            if (((k = this.vars[f]), O[f]))
              k &&
                (k instanceof Array || (k.push && n(k))) &&
                -1 !== k.join("").indexOf("{self}") &&
                (this.vars[f] = k = this._swapSelfInParams(k, this));
            else if (
              L[f] &&
              (i = new L[f]())._onInitTween(b, this.vars[f], this)
            ) {
              for (
                this._firstPT = j = {
                  _next: this._firstPT,
                  t: i,
                  p: "setRatio",
                  s: 0,
                  c: 1,
                  f: !0,
                  n: f,
                  pg: !0,
                  pr: i._priority,
                },
                  g = i._overwriteProps.length;
                --g > -1;

              )
                c[i._overwriteProps[g]] = this._firstPT;
              (i._priority || i._onInitAllProps) && (h = !0),
                (i._onDisable || i._onEnable) &&
                  (this._notifyPluginsOfEnabled = !0);
            } else
              (this._firstPT = c[f] = j = {
                _next: this._firstPT,
                t: b,
                p: f,
                f: "function" == typeof b[f],
                n: f,
                pg: !1,
                pr: 0,
              }),
                (j.s = j.f
                  ? b[
                      f.indexOf("set") ||
                      "function" != typeof b["get" + f.substr(3)]
                        ? f
                        : "get" + f.substr(3)
                    ]()
                  : parseFloat(b[f])),
                (j.c =
                  "string" == typeof k && "=" === k.charAt(1)
                    ? parseInt(k.charAt(0) + "1", 10) * Number(k.substr(2))
                    : Number(k) - j.s || 0);
            j && j._next && (j._next._prev = j);
          }
          return e && this._kill(e, b)
            ? this._initProps(b, c, d, e)
            : this._overwrite > 1 &&
              this._firstPT &&
              d.length > 1 &&
              W(b, this, c, this._overwrite, d)
            ? (this._kill(c, b), this._initProps(b, c, d, e))
            : (this._firstPT &&
                ((this.vars.lazy !== !1 && this._duration) ||
                  (this.vars.lazy && !this._duration)) &&
                (J[b._gsTweenID] = !0),
              h);
        }),
        (f.render = function (a, b, c) {
          var d,
            e,
            f,
            g,
            h = this._time,
            i = this._duration,
            j = this._rawPrevTime;
          if (a >= i)
            (this._totalTime = this._time = i),
              (this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1),
              this._reversed ||
                ((d = !0),
                (e = "onComplete"),
                (c = c || this._timeline.autoRemoveChildren)),
              0 === i &&
                (this._initted || !this.vars.lazy || c) &&
                (this._startTime === this._timeline._duration && (a = 0),
                (0 === a || 0 > j || (j === k && "isPause" !== this.data)) &&
                  j !== a &&
                  ((c = !0), j > k && (e = "onReverseComplete")),
                (this._rawPrevTime = g = !b || a || j === a ? a : k));
          else if (1e-7 > a)
            (this._totalTime = this._time = 0),
              (this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0),
              (0 !== h || (0 === i && j > 0)) &&
                ((e = "onReverseComplete"), (d = this._reversed)),
              0 > a &&
                ((this._active = !1),
                0 === i &&
                  (this._initted || !this.vars.lazy || c) &&
                  (j >= 0 && (j !== k || "isPause" !== this.data) && (c = !0),
                  (this._rawPrevTime = g = !b || a || j === a ? a : k))),
              this._initted || (c = !0);
          else if (((this._totalTime = this._time = a), this._easeType)) {
            var l = a / i,
              m = this._easeType,
              n = this._easePower;
            (1 === m || (3 === m && l >= 0.5)) && (l = 1 - l),
              3 === m && (l *= 2),
              1 === n
                ? (l *= l)
                : 2 === n
                ? (l *= l * l)
                : 3 === n
                ? (l *= l * l * l)
                : 4 === n && (l *= l * l * l * l),
              (this.ratio =
                1 === m
                  ? 1 - l
                  : 2 === m
                  ? l
                  : 0.5 > a / i
                  ? l / 2
                  : 1 - l / 2);
          } else this.ratio = this._ease.getRatio(a / i);
          if (this._time !== h || c) {
            if (!this._initted) {
              if ((this._init(), !this._initted || this._gc)) return;
              if (
                !c &&
                this._firstPT &&
                ((this.vars.lazy !== !1 && this._duration) ||
                  (this.vars.lazy && !this._duration))
              )
                return (
                  (this._time = this._totalTime = h),
                  (this._rawPrevTime = j),
                  I.push(this),
                  void (this._lazy = [a, b])
                );
              this._time && !d
                ? (this.ratio = this._ease.getRatio(this._time / i))
                : d &&
                  this._ease._calcEnd &&
                  (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
            }
            for (
              this._lazy !== !1 && (this._lazy = !1),
                this._active ||
                  (!this._paused &&
                    this._time !== h &&
                    a >= 0 &&
                    (this._active = !0)),
                0 === h &&
                  (this._startAt &&
                    (a >= 0
                      ? this._startAt.render(a, b, c)
                      : e || (e = "_dummyGS")),
                  this.vars.onStart &&
                    (0 !== this._time || 0 === i) &&
                    (b || this._callback("onStart"))),
                f = this._firstPT;
              f;

            )
              f.f
                ? f.t[f.p](f.c * this.ratio + f.s)
                : (f.t[f.p] = f.c * this.ratio + f.s),
                (f = f._next);
            this._onUpdate &&
              (0 > a &&
                this._startAt &&
                a !== -1e-4 &&
                this._startAt.render(a, b, c),
              b || ((this._time !== h || d) && this._callback("onUpdate"))),
              e &&
                (!this._gc || c) &&
                (0 > a &&
                  this._startAt &&
                  !this._onUpdate &&
                  a !== -1e-4 &&
                  this._startAt.render(a, b, c),
                d &&
                  (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                  (this._active = !1)),
                !b && this.vars[e] && this._callback(e),
                0 === i &&
                  this._rawPrevTime === k &&
                  g !== k &&
                  (this._rawPrevTime = 0));
          }
        }),
        (f._kill = function (a, b, c) {
          if (
            ("all" === a && (a = null),
            null == a && (null == b || b === this.target))
          )
            return (this._lazy = !1), this._enabled(!1, !1);
          b =
            "string" != typeof b
              ? b || this._targets || this.target
              : F.selector(b) || b;
          var d,
            e,
            f,
            g,
            h,
            i,
            j,
            k,
            l,
            m =
              c &&
              this._time &&
              c._startTime === this._startTime &&
              this._timeline === c._timeline;
          if ((n(b) || G(b)) && "number" != typeof b[0])
            for (d = b.length; --d > -1; ) this._kill(a, b[d], c) && (i = !0);
          else {
            if (this._targets) {
              for (d = this._targets.length; --d > -1; )
                if (b === this._targets[d]) {
                  (h = this._propLookup[d] || {}),
                    (this._overwrittenProps = this._overwrittenProps || []),
                    (e = this._overwrittenProps[d] = a
                      ? this._overwrittenProps[d] || {}
                      : "all");
                  break;
                }
            } else {
              if (b !== this.target) return !1;
              (h = this._propLookup),
                (e = this._overwrittenProps = a
                  ? this._overwrittenProps || {}
                  : "all");
            }
            if (h) {
              if (
                ((j = a || h),
                (k =
                  a !== e &&
                  "all" !== e &&
                  a !== h &&
                  ("object" != typeof a || !a._tempKill)),
                c && (F.onOverwrite || this.vars.onOverwrite))
              ) {
                for (f in j) h[f] && (l || (l = []), l.push(f));
                if ((l || !a) && !V(this, c, b, l)) return !1;
              }
              for (f in j)
                (g = h[f]) &&
                  (m && (g.f ? g.t[g.p](g.s) : (g.t[g.p] = g.s), (i = !0)),
                  g.pg && g.t._kill(j) && (i = !0),
                  (g.pg && 0 !== g.t._overwriteProps.length) ||
                    (g._prev
                      ? (g._prev._next = g._next)
                      : g === this._firstPT && (this._firstPT = g._next),
                    g._next && (g._next._prev = g._prev),
                    (g._next = g._prev = null)),
                  delete h[f]),
                  k && (e[f] = 1);
              !this._firstPT && this._initted && this._enabled(!1, !1);
            }
          }
          return i;
        }),
        (f.invalidate = function () {
          return (
            this._notifyPluginsOfEnabled &&
              F._onPluginEvent("_onDisable", this),
            (this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null),
            (this._notifyPluginsOfEnabled = this._active = this._lazy = !1),
            (this._propLookup = this._targets ? {} : []),
            C.prototype.invalidate.call(this),
            this.vars.immediateRender &&
              ((this._time = -k), this.render(-this._delay)),
            this
          );
        }),
        (f._enabled = function (a, b) {
          if ((h || g.wake(), a && this._gc)) {
            var c,
              d = this._targets;
            if (d)
              for (c = d.length; --c > -1; )
                this._siblings[c] = U(d[c], this, !0);
            else this._siblings = U(this.target, this, !0);
          }
          return (
            C.prototype._enabled.call(this, a, b),
            !(!this._notifyPluginsOfEnabled || !this._firstPT) &&
              F._onPluginEvent(a ? "_onEnable" : "_onDisable", this)
          );
        }),
        (F.to = function (a, b, c) {
          return new F(a, b, c);
        }),
        (F.from = function (a, b, c) {
          return (
            (c.runBackwards = !0),
            (c.immediateRender = 0 != c.immediateRender),
            new F(a, b, c)
          );
        }),
        (F.fromTo = function (a, b, c, d) {
          return (
            (d.startAt = c),
            (d.immediateRender =
              0 != d.immediateRender && 0 != c.immediateRender),
            new F(a, b, d)
          );
        }),
        (F.delayedCall = function (a, b, c, d, e) {
          return new F(b, 0, {
            delay: a,
            onComplete: b,
            onCompleteParams: c,
            callbackScope: d,
            onReverseComplete: b,
            onReverseCompleteParams: c,
            immediateRender: !1,
            lazy: !1,
            useFrames: e,
            overwrite: 0,
          });
        }),
        (F.set = function (a, b) {
          return new F(a, 0, b);
        }),
        (F.getTweensOf = function (a, b) {
          if (null == a) return [];
          a = "string" != typeof a ? a : F.selector(a) || a;
          var c, d, e, f;
          if ((n(a) || G(a)) && "number" != typeof a[0]) {
            for (c = a.length, d = []; --c > -1; )
              d = d.concat(F.getTweensOf(a[c], b));
            for (c = d.length; --c > -1; )
              for (f = d[c], e = c; --e > -1; ) f === d[e] && d.splice(c, 1);
          } else
            for (d = U(a).concat(), c = d.length; --c > -1; )
              (d[c]._gc || (b && !d[c].isActive())) && d.splice(c, 1);
          return d;
        }),
        (F.killTweensOf = F.killDelayedCallsTo = function (a, b, c) {
          "object" == typeof b && ((c = b), (b = !1));
          for (var d = F.getTweensOf(a, b), e = d.length; --e > -1; )
            d[e]._kill(c, a);
        });
      var Y = r(
        "plugins.TweenPlugin",
        function (a, b) {
          (this._overwriteProps = (a || "").split(",")),
            (this._propName = this._overwriteProps[0]),
            (this._priority = b || 0),
            (this._super = Y.prototype);
        },
        !0
      );
      if (
        ((f = Y.prototype),
        (Y.version = "1.10.1"),
        (Y.API = 2),
        (f._firstPT = null),
        (f._addTween = function (a, b, c, d, e, f) {
          var g, h;
          return null != d &&
            (g =
              "number" == typeof d || "=" !== d.charAt(1)
                ? Number(d) - Number(c)
                : parseInt(d.charAt(0) + "1", 10) * Number(d.substr(2)))
            ? ((this._firstPT = h = {
                _next: this._firstPT,
                t: a,
                p: b,
                s: c,
                c: g,
                f: "function" == typeof a[b],
                n: e || b,
                r: f,
              }),
              h._next && (h._next._prev = h),
              h)
            : void 0;
        }),
        (f.setRatio = function (a) {
          for (var b, c = this._firstPT, d = 1e-6; c; )
            (b = c.c * a + c.s),
              c.r ? (b = Math.round(b)) : d > b && b > -d && (b = 0),
              c.f ? c.t[c.p](b) : (c.t[c.p] = b),
              (c = c._next);
        }),
        (f._kill = function (a) {
          var b,
            c = this._overwriteProps,
            d = this._firstPT;
          if (null != a[this._propName]) this._overwriteProps = [];
          else for (b = c.length; --b > -1; ) null != a[c[b]] && c.splice(b, 1);
          for (; d; )
            null != a[d.n] &&
              (d._next && (d._next._prev = d._prev),
              d._prev
                ? ((d._prev._next = d._next), (d._prev = null))
                : this._firstPT === d && (this._firstPT = d._next)),
              (d = d._next);
          return !1;
        }),
        (f._roundProps = function (a, b) {
          for (var c = this._firstPT; c; )
            (a[this._propName] ||
              (null != c.n && a[c.n.split(this._propName + "_").join("")])) &&
              (c.r = b),
              (c = c._next);
        }),
        (F._onPluginEvent = function (a, b) {
          var c,
            d,
            e,
            f,
            g,
            h = b._firstPT;
          if ("_onInitAllProps" === a) {
            for (; h; ) {
              for (g = h._next, d = e; d && d.pr > h.pr; ) d = d._next;
              (h._prev = d ? d._prev : f) ? (h._prev._next = h) : (e = h),
                (h._next = d) ? (d._prev = h) : (f = h),
                (h = g);
            }
            h = b._firstPT = e;
          }
          for (; h; )
            h.pg && "function" == typeof h.t[a] && h.t[a]() && (c = !0),
              (h = h._next);
          return c;
        }),
        (Y.activate = function (a) {
          for (var b = a.length; --b > -1; )
            a[b].API === Y.API && (L[new a[b]()._propName] = a[b]);
          return !0;
        }),
        (q.plugin = function (a) {
          if (!(a && a.propName && a.init && a.API))
            throw "illegal plugin definition.";
          var b,
            c = a.propName,
            d = a.priority || 0,
            e = a.overwriteProps,
            f = {
              init: "_onInitTween",
              set: "setRatio",
              kill: "_kill",
              round: "_roundProps",
              initAll: "_onInitAllProps",
            },
            g = r(
              "plugins." + c.charAt(0).toUpperCase() + c.substr(1) + "Plugin",
              function () {
                Y.call(this, c, d), (this._overwriteProps = e || []);
              },
              a.global === !0
            ),
            h = (g.prototype = new Y(c));
          (h.constructor = g), (g.API = a.API);
          for (b in f) "function" == typeof a[b] && (h[f[b]] = a[b]);
          return (g.version = a.version), Y.activate([g]), g;
        }),
        (d = a._gsQueue))
      ) {
        for (e = 0; d.length > e; e++) d[e]();
        for (f in o)
          o[f].func ||
            a.console.log(
              "GSAP encountered missing dependency: com.greensock." + f
            );
      }
      h = !1;
    }
  })(
    "undefined" != typeof module &&
      module.exports &&
      "undefined" != typeof global
      ? global
      : this || window,
    "TweenLite"
  ),
  (function (a, b) {
    "use strict";
    a.addEventListener(
      "DOMContentLoaded",
      function () {
        var c = b.location.href.replace(b.location.hash, "");
        [].slice
          .call(a.querySelectorAll("use[*|href]"))
          .filter(function (a) {
            return 0 === a.getAttribute("xlink:href").indexOf("#");
          })
          .forEach(function (a) {
            a.setAttribute(
              "xlink:href",
              c.replace("#", "") + a.getAttribute("xlink:href")
            );
          });
      },
      !1
    );
  })(document, window),
  !(function (a, b) {
    "function" == typeof define && define.amd
      ? define("ev-emitter/ev-emitter", b)
      : "object" == typeof module && module.exports
      ? (module.exports = b())
      : (a.EvEmitter = b());
  })("undefined" != typeof window ? window : this, function () {
    function a() {}
    var b = a.prototype;
    return (
      (b.on = function (a, b) {
        if (a && b) {
          var c = (this._events = this._events || {}),
            d = (c[a] = c[a] || []);
          return d.indexOf(b) == -1 && d.push(b), this;
        }
      }),
      (b.once = function (a, b) {
        if (a && b) {
          this.on(a, b);
          var c = (this._onceEvents = this._onceEvents || {}),
            d = (c[a] = c[a] || {});
          return (d[b] = !0), this;
        }
      }),
      (b.off = function (a, b) {
        var c = this._events && this._events[a];
        if (c && c.length) {
          var d = c.indexOf(b);
          return d != -1 && c.splice(d, 1), this;
        }
      }),
      (b.emitEvent = function (a, b) {
        var c = this._events && this._events[a];
        if (c && c.length) {
          (c = c.slice(0)), (b = b || []);
          for (
            var d = this._onceEvents && this._onceEvents[a], e = 0;
            e < c.length;
            e++
          ) {
            var f = c[e],
              g = d && d[f];
            g && (this.off(a, f), delete d[f]), f.apply(this, b);
          }
          return this;
        }
      }),
      (b.allOff = function () {
        delete this._events, delete this._onceEvents;
      }),
      a
    );
  }),
  (function (a, b) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["ev-emitter/ev-emitter"], function (c) {
          return b(a, c);
        })
      : "object" == typeof module && module.exports
      ? (module.exports = b(a, require("ev-emitter")))
      : (a.imagesLoaded = b(a, a.EvEmitter));
  })("undefined" != typeof window ? window : this, function (a, b) {
    function c(a, b) {
      for (var c in b) a[c] = b[c];
      return a;
    }
    function d(a) {
      if (Array.isArray(a)) return a;
      var b = "object" == typeof a && "number" == typeof a.length;
      return b ? j.call(a) : [a];
    }
    function e(a, b, f) {
      if (!(this instanceof e)) return new e(a, b, f);
      var g = a;
      return (
        "string" == typeof a && (g = document.querySelectorAll(a)),
        g
          ? ((this.elements = d(g)),
            (this.options = c({}, this.options)),
            "function" == typeof b ? (f = b) : c(this.options, b),
            f && this.on("always", f),
            this.getImages(),
            h && (this.jqDeferred = new h.Deferred()),
            void setTimeout(this.check.bind(this)))
          : void i.error("Bad element for imagesLoaded " + (g || a))
      );
    }
    function f(a) {
      this.img = a;
    }
    function g(a, b) {
      (this.url = a), (this.element = b), (this.img = new Image());
    }
    var h = a.jQuery,
      i = a.console,
      j = Array.prototype.slice;
    (e.prototype = Object.create(b.prototype)),
      (e.prototype.options = {}),
      (e.prototype.getImages = function () {
        (this.images = []), this.elements.forEach(this.addElementImages, this);
      }),
      (e.prototype.addElementImages = function (a) {
        "IMG" == a.nodeName && this.addImage(a),
          this.options.background === !0 && this.addElementBackgroundImages(a);
        var b = a.nodeType;
        if (b && k[b]) {
          for (var c = a.querySelectorAll("img"), d = 0; d < c.length; d++) {
            var e = c[d];
            this.addImage(e);
          }
          if ("string" == typeof this.options.background) {
            var f = a.querySelectorAll(this.options.background);
            for (d = 0; d < f.length; d++) {
              var g = f[d];
              this.addElementBackgroundImages(g);
            }
          }
        }
      });
    var k = { 1: !0, 9: !0, 11: !0 };
    return (
      (e.prototype.addElementBackgroundImages = function (a) {
        var b = getComputedStyle(a);
        if (b)
          for (
            var c = /url\((['"])?(.*?)\1\)/gi, d = c.exec(b.backgroundImage);
            null !== d;

          ) {
            var e = d && d[2];
            e && this.addBackground(e, a), (d = c.exec(b.backgroundImage));
          }
      }),
      (e.prototype.addImage = function (a) {
        var b = new f(a);
        this.images.push(b);
      }),
      (e.prototype.addBackground = function (a, b) {
        var c = new g(a, b);
        this.images.push(c);
      }),
      (e.prototype.check = function () {
        function a(a, c, d) {
          setTimeout(function () {
            b.progress(a, c, d);
          });
        }
        var b = this;
        return (
          (this.progressedCount = 0),
          (this.hasAnyBroken = !1),
          this.images.length
            ? void this.images.forEach(function (b) {
                b.once("progress", a), b.check();
              })
            : void this.complete()
        );
      }),
      (e.prototype.progress = function (a, b, c) {
        this.progressedCount++,
          (this.hasAnyBroken = this.hasAnyBroken || !a.isLoaded),
          this.emitEvent("progress", [this, a, b]),
          this.jqDeferred &&
            this.jqDeferred.notify &&
            this.jqDeferred.notify(this, a),
          this.progressedCount == this.images.length && this.complete(),
          this.options.debug && i && i.log("progress: " + c, a, b);
      }),
      (e.prototype.complete = function () {
        var a = this.hasAnyBroken ? "fail" : "done";
        if (
          ((this.isComplete = !0),
          this.emitEvent(a, [this]),
          this.emitEvent("always", [this]),
          this.jqDeferred)
        ) {
          var b = this.hasAnyBroken ? "reject" : "resolve";
          this.jqDeferred[b](this);
        }
      }),
      (f.prototype = Object.create(b.prototype)),
      (f.prototype.check = function () {
        var a = this.getIsImageComplete();
        return a
          ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
          : ((this.proxyImage = new Image()),
            this.proxyImage.addEventListener("load", this),
            this.proxyImage.addEventListener("error", this),
            this.img.addEventListener("load", this),
            this.img.addEventListener("error", this),
            void (this.proxyImage.src = this.img.src));
      }),
      (f.prototype.getIsImageComplete = function () {
        return this.img.complete && this.img.naturalWidth;
      }),
      (f.prototype.confirm = function (a, b) {
        (this.isLoaded = a), this.emitEvent("progress", [this, this.img, b]);
      }),
      (f.prototype.handleEvent = function (a) {
        var b = "on" + a.type;
        this[b] && this[b](a);
      }),
      (f.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents();
      }),
      (f.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents();
      }),
      (f.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this),
          this.proxyImage.removeEventListener("error", this),
          this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (g.prototype = Object.create(f.prototype)),
      (g.prototype.check = function () {
        this.img.addEventListener("load", this),
          this.img.addEventListener("error", this),
          (this.img.src = this.url);
        var a = this.getIsImageComplete();
        a &&
          (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
          this.unbindEvents());
      }),
      (g.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (g.prototype.confirm = function (a, b) {
        (this.isLoaded = a),
          this.emitEvent("progress", [this, this.element, b]);
      }),
      (e.makeJQueryPlugin = function (b) {
        (b = b || a.jQuery),
          b &&
            ((h = b),
            (h.fn.imagesLoaded = function (a, b) {
              var c = new e(this, a, b);
              return c.jqDeferred.promise(h(this));
            }));
      }),
      e.makeJQueryPlugin(),
      e
    );
  }),
  !(function (a) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(["jquery"], a)
      : a("undefined" != typeof jQuery ? jQuery : window.Zepto);
  })(function (a) {
    "use strict";
    function b(b) {
      var c = b.data;
      b.isDefaultPrevented() || (b.preventDefault(), a(b.target).ajaxSubmit(c));
    }
    function c(b) {
      var c = b.target,
        d = a(c);
      if (!d.is("[type=submit],[type=image]")) {
        var e = d.closest("[type=submit]");
        if (0 === e.length) return;
        c = e[0];
      }
      var f = this;
      if (((f.clk = c), "image" == c.type))
        if (void 0 !== b.offsetX) (f.clk_x = b.offsetX), (f.clk_y = b.offsetY);
        else if ("function" == typeof a.fn.offset) {
          var g = d.offset();
          (f.clk_x = b.pageX - g.left), (f.clk_y = b.pageY - g.top);
        } else
          (f.clk_x = b.pageX - c.offsetLeft), (f.clk_y = b.pageY - c.offsetTop);
      setTimeout(function () {
        f.clk = f.clk_x = f.clk_y = null;
      }, 100);
    }
    function d() {
      if (a.fn.ajaxSubmit.debug) {
        var b = "[jquery.form] " + Array.prototype.join.call(arguments, "");
        window.console && window.console.log
          ? window.console.log(b)
          : window.opera && window.opera.postError && window.opera.postError(b);
      }
    }
    var e = {};
    (e.fileapi = void 0 !== a("<input type='file'/>").get(0).files),
      (e.formdata = void 0 !== window.FormData);
    var f = !!a.fn.prop;
    (a.fn.attr2 = function () {
      if (!f) return this.attr.apply(this, arguments);
      var a = this.prop.apply(this, arguments);
      return (a && a.jquery) || "string" == typeof a
        ? a
        : this.attr.apply(this, arguments);
    }),
      (a.fn.ajaxSubmit = function (b) {
        function c(c) {
          var d,
            e,
            f = a.param(c, b.traditional).split("&"),
            g = f.length,
            h = [];
          for (d = 0; g > d; d++)
            (f[d] = f[d].replace(/\+/g, " ")),
              (e = f[d].split("=")),
              h.push([decodeURIComponent(e[0]), decodeURIComponent(e[1])]);
          return h;
        }
        function g(d) {
          for (var e = new FormData(), f = 0; f < d.length; f++)
            e.append(d[f].name, d[f].value);
          if (b.extraData) {
            var g = c(b.extraData);
            for (f = 0; f < g.length; f++) g[f] && e.append(g[f][0], g[f][1]);
          }
          b.data = null;
          var h = a.extend(!0, {}, a.ajaxSettings, b, {
            contentType: !1,
            processData: !1,
            cache: !1,
            type: i || "POST",
          });
          b.uploadProgress &&
            (h.xhr = function () {
              var c = a.ajaxSettings.xhr();
              return (
                c.upload &&
                  c.upload.addEventListener(
                    "progress",
                    function (a) {
                      var c = 0,
                        d = a.loaded || a.position,
                        e = a.total;
                      a.lengthComputable && (c = Math.ceil((d / e) * 100)),
                        b.uploadProgress(a, d, e, c);
                    },
                    !1
                  ),
                c
              );
            }),
            (h.data = null);
          var j = h.beforeSend;
          return (
            (h.beforeSend = function (a, c) {
              (c.data = b.formData ? b.formData : e), j && j.call(this, a, c);
            }),
            a.ajax(h)
          );
        }
        function h(c) {
          function e(a) {
            var b = null;
            try {
              a.contentWindow && (b = a.contentWindow.document);
            } catch (a) {
              d("cannot get iframe.contentWindow document: " + a);
            }
            if (b) return b;
            try {
              b = a.contentDocument ? a.contentDocument : a.document;
            } catch (c) {
              d("cannot get iframe.contentDocument: " + c), (b = a.document);
            }
            return b;
          }
          function g() {
            function b() {
              try {
                var a = e(r).readyState;
                d("state = " + a),
                  a && "uninitialized" == a.toLowerCase() && setTimeout(b, 50);
              } catch (a) {
                d("Server abort: ", a, " (", a.name, ")"),
                  h(A),
                  w && clearTimeout(w),
                  (w = void 0);
              }
            }
            var c = l.attr2("target"),
              f = l.attr2("action"),
              g = "multipart/form-data",
              j = l.attr("enctype") || l.attr("encoding") || g;
            x.setAttribute("target", o),
              (!i || /post/i.test(i)) && x.setAttribute("method", "POST"),
              f != m.url && x.setAttribute("action", m.url),
              m.skipEncodingOverride ||
                (i && !/post/i.test(i)) ||
                l.attr({
                  encoding: "multipart/form-data",
                  enctype: "multipart/form-data",
                }),
              m.timeout &&
                (w = setTimeout(function () {
                  (v = !0), h(z);
                }, m.timeout));
            var k = [];
            try {
              if (m.extraData)
                for (var n in m.extraData)
                  m.extraData.hasOwnProperty(n) &&
                    k.push(
                      a.isPlainObject(m.extraData[n]) &&
                        m.extraData[n].hasOwnProperty("name") &&
                        m.extraData[n].hasOwnProperty("value")
                        ? a(
                            '<input type="hidden" name="' +
                              m.extraData[n].name +
                              '">'
                          )
                            .val(m.extraData[n].value)
                            .appendTo(x)[0]
                        : a('<input type="hidden" name="' + n + '">')
                            .val(m.extraData[n])
                            .appendTo(x)[0]
                    );
              m.iframeTarget || q.appendTo("body"),
                r.attachEvent
                  ? r.attachEvent("onload", h)
                  : r.addEventListener("load", h, !1),
                setTimeout(b, 15);
              try {
                x.submit();
              } catch (a) {
                var p = document.createElement("form").submit;
                p.apply(x);
              }
            } finally {
              x.setAttribute("action", f),
                x.setAttribute("enctype", j),
                c ? x.setAttribute("target", c) : l.removeAttr("target"),
                a(k).remove();
            }
          }
          function h(b) {
            if (!s.aborted && !F) {
              if (
                ((E = e(r)),
                E || (d("cannot access response document"), (b = A)),
                b === z && s)
              )
                return s.abort("timeout"), void y.reject(s, "timeout");
              if (b == A && s)
                return (
                  s.abort("server abort"),
                  void y.reject(s, "error", "server abort")
                );
              if ((E && E.location.href != m.iframeSrc) || v) {
                r.detachEvent
                  ? r.detachEvent("onload", h)
                  : r.removeEventListener("load", h, !1);
                var c,
                  f = "success";
                try {
                  if (v) throw "timeout";
                  var g = "xml" == m.dataType || E.XMLDocument || a.isXMLDoc(E);
                  if (
                    (d("isXml=" + g),
                    !g &&
                      window.opera &&
                      (null === E.body || !E.body.innerHTML) &&
                      --G)
                  )
                    return (
                      d("requeing onLoad callback, DOM not available"),
                      void setTimeout(h, 250)
                    );
                  var i = E.body ? E.body : E.documentElement;
                  (s.responseText = i ? i.innerHTML : null),
                    (s.responseXML = E.XMLDocument ? E.XMLDocument : E),
                    g && (m.dataType = "xml"),
                    (s.getResponseHeader = function (a) {
                      var b = { "content-type": m.dataType };
                      return b[a.toLowerCase()];
                    }),
                    i &&
                      ((s.status =
                        Number(i.getAttribute("status")) || s.status),
                      (s.statusText =
                        i.getAttribute("statusText") || s.statusText));
                  var j = (m.dataType || "").toLowerCase(),
                    k = /(json|script|text)/.test(j);
                  if (k || m.textarea) {
                    var l = E.getElementsByTagName("textarea")[0];
                    if (l)
                      (s.responseText = l.value),
                        (s.status =
                          Number(l.getAttribute("status")) || s.status),
                        (s.statusText =
                          l.getAttribute("statusText") || s.statusText);
                    else if (k) {
                      var o = E.getElementsByTagName("pre")[0],
                        p = E.getElementsByTagName("body")[0];
                      o
                        ? (s.responseText = o.textContent
                            ? o.textContent
                            : o.innerText)
                        : p &&
                          (s.responseText = p.textContent
                            ? p.textContent
                            : p.innerText);
                    }
                  } else
                    "xml" == j &&
                      !s.responseXML &&
                      s.responseText &&
                      (s.responseXML = H(s.responseText));
                  try {
                    D = J(s, j, m);
                  } catch (a) {
                    (f = "parsererror"), (s.error = c = a || f);
                  }
                } catch (a) {
                  d("error caught: ", a), (f = "error"), (s.error = c = a || f);
                }
                s.aborted && (d("upload aborted"), (f = null)),
                  s.status &&
                    (f =
                      (s.status >= 200 && s.status < 300) || 304 === s.status
                        ? "success"
                        : "error"),
                  "success" === f
                    ? (m.success && m.success.call(m.context, D, "success", s),
                      y.resolve(s.responseText, "success", s),
                      n && a.event.trigger("ajaxSuccess", [s, m]))
                    : f &&
                      (void 0 === c && (c = s.statusText),
                      m.error && m.error.call(m.context, s, f, c),
                      y.reject(s, "error", c),
                      n && a.event.trigger("ajaxError", [s, m, c])),
                  n && a.event.trigger("ajaxComplete", [s, m]),
                  n && !--a.active && a.event.trigger("ajaxStop"),
                  m.complete && m.complete.call(m.context, s, f),
                  (F = !0),
                  m.timeout && clearTimeout(w),
                  setTimeout(function () {
                    m.iframeTarget ? q.attr("src", m.iframeSrc) : q.remove(),
                      (s.responseXML = null);
                  }, 100);
              }
            }
          }
          var j,
            k,
            m,
            n,
            o,
            q,
            r,
            s,
            t,
            u,
            v,
            w,
            x = l[0],
            y = a.Deferred();
          if (
            ((y.abort = function (a) {
              s.abort(a);
            }),
            c)
          )
            for (k = 0; k < p.length; k++)
              (j = a(p[k])),
                f ? j.prop("disabled", !1) : j.removeAttr("disabled");
          if (
            ((m = a.extend(!0, {}, a.ajaxSettings, b)),
            (m.context = m.context || m),
            (o = "jqFormIO" + new Date().getTime()),
            m.iframeTarget
              ? ((q = a(m.iframeTarget)),
                (u = q.attr2("name")),
                u ? (o = u) : q.attr2("name", o))
              : ((q = a(
                  '<iframe name="' + o + '" src="' + m.iframeSrc + '" />'
                )),
                q.css({
                  position: "absolute",
                  top: "-1000px",
                  left: "-1000px",
                })),
            (r = q[0]),
            (s = {
              aborted: 0,
              responseText: null,
              responseXML: null,
              status: 0,
              statusText: "n/a",
              getAllResponseHeaders: function () {},
              getResponseHeader: function () {},
              setRequestHeader: function () {},
              abort: function (b) {
                var c = "timeout" === b ? "timeout" : "aborted";
                d("aborting upload... " + c), (this.aborted = 1);
                try {
                  r.contentWindow.document.execCommand &&
                    r.contentWindow.document.execCommand("Stop");
                } catch (a) {}
                q.attr("src", m.iframeSrc),
                  (s.error = c),
                  m.error && m.error.call(m.context, s, c, b),
                  n && a.event.trigger("ajaxError", [s, m, c]),
                  m.complete && m.complete.call(m.context, s, c);
              },
            }),
            (n = m.global),
            n && 0 === a.active++ && a.event.trigger("ajaxStart"),
            n && a.event.trigger("ajaxSend", [s, m]),
            m.beforeSend && m.beforeSend.call(m.context, s, m) === !1)
          )
            return m.global && a.active--, y.reject(), y;
          if (s.aborted) return y.reject(), y;
          (t = x.clk),
            t &&
              ((u = t.name),
              u &&
                !t.disabled &&
                ((m.extraData = m.extraData || {}),
                (m.extraData[u] = t.value),
                "image" == t.type &&
                  ((m.extraData[u + ".x"] = x.clk_x),
                  (m.extraData[u + ".y"] = x.clk_y))));
          var z = 1,
            A = 2,
            B = a("meta[name=csrf-token]").attr("content"),
            C = a("meta[name=csrf-param]").attr("content");
          C && B && ((m.extraData = m.extraData || {}), (m.extraData[C] = B)),
            m.forceSync ? g() : setTimeout(g, 10);
          var D,
            E,
            F,
            G = 50,
            H =
              a.parseXML ||
              function (a, b) {
                return (
                  window.ActiveXObject
                    ? ((b = new ActiveXObject("Microsoft.XMLDOM")),
                      (b.async = "false"),
                      b.loadXML(a))
                    : (b = new DOMParser().parseFromString(a, "text/xml")),
                  b &&
                  b.documentElement &&
                  "parsererror" != b.documentElement.nodeName
                    ? b
                    : null
                );
              },
            I =
              a.parseJSON ||
              function (a) {
                return window.eval("(" + a + ")");
              },
            J = function (b, c, d) {
              var e = b.getResponseHeader("content-type") || "",
                f = "xml" === c || (!c && e.indexOf("xml") >= 0),
                g = f ? b.responseXML : b.responseText;
              return (
                f &&
                  "parsererror" === g.documentElement.nodeName &&
                  a.error &&
                  a.error("parsererror"),
                d && d.dataFilter && (g = d.dataFilter(g, c)),
                "string" == typeof g &&
                  ("json" === c || (!c && e.indexOf("json") >= 0)
                    ? (g = I(g))
                    : ("script" === c ||
                        (!c && e.indexOf("javascript") >= 0)) &&
                      a.globalEval(g)),
                g
              );
            };
          return y;
        }
        if (!this.length)
          return (
            d("ajaxSubmit: skipping submit process - no element selected"), this
          );
        var i,
          j,
          k,
          l = this;
        "function" == typeof b
          ? (b = { success: b })
          : void 0 === b && (b = {}),
          (i = b.type || this.attr2("method")),
          (j = b.url || this.attr2("action")),
          (k = "string" == typeof j ? a.trim(j) : ""),
          (k = k || window.location.href || ""),
          k && (k = (k.match(/^([^#]+)/) || [])[1]),
          (b = a.extend(
            !0,
            {
              url: k,
              success: a.ajaxSettings.success,
              type: i || a.ajaxSettings.type,
              iframeSrc: /^https/i.test(window.location.href || "")
                ? "javascript:false"
                : "about:blank",
            },
            b
          ));
        var m = {};
        if ((this.trigger("form-pre-serialize", [this, b, m]), m.veto))
          return (
            d("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this
          );
        if (b.beforeSerialize && b.beforeSerialize(this, b) === !1)
          return (
            d("ajaxSubmit: submit aborted via beforeSerialize callback"), this
          );
        var n = b.traditional;
        void 0 === n && (n = a.ajaxSettings.traditional);
        var o,
          p = [],
          q = this.formToArray(b.semantic, p);
        if (
          (b.data && ((b.extraData = b.data), (o = a.param(b.data, n))),
          b.beforeSubmit && b.beforeSubmit(q, this, b) === !1)
        )
          return (
            d("ajaxSubmit: submit aborted via beforeSubmit callback"), this
          );
        if ((this.trigger("form-submit-validate", [q, this, b, m]), m.veto))
          return (
            d("ajaxSubmit: submit vetoed via form-submit-validate trigger"),
            this
          );
        var r = a.param(q, n);
        o && (r = r ? r + "&" + o : o),
          "GET" == b.type.toUpperCase()
            ? ((b.url += (b.url.indexOf("?") >= 0 ? "&" : "?") + r),
              (b.data = null))
            : (b.data = r);
        var s = [];
        if (
          (b.resetForm &&
            s.push(function () {
              l.resetForm();
            }),
          b.clearForm &&
            s.push(function () {
              l.clearForm(b.includeHidden);
            }),
          !b.dataType && b.target)
        ) {
          var t = b.success || function () {};
          s.push(function (c) {
            var d = b.replaceTarget ? "replaceWith" : "html";
            a(b.target)[d](c).each(t, arguments);
          });
        } else b.success && s.push(b.success);
        if (
          ((b.success = function (a, c, d) {
            for (var e = b.context || this, f = 0, g = s.length; g > f; f++)
              s[f].apply(e, [a, c, d || l, l]);
          }),
          b.error)
        ) {
          var u = b.error;
          b.error = function (a, c, d) {
            var e = b.context || this;
            u.apply(e, [a, c, d, l]);
          };
        }
        if (b.complete) {
          var v = b.complete;
          b.complete = function (a, c) {
            var d = b.context || this;
            v.apply(d, [a, c, l]);
          };
        }
        var w = a("input[type=file]:enabled", this).filter(function () {
            return "" !== a(this).val();
          }),
          x = w.length > 0,
          y = "multipart/form-data",
          z = l.attr("enctype") == y || l.attr("encoding") == y,
          A = e.fileapi && e.formdata;
        d("fileAPI :" + A);
        var B,
          C = (x || z) && !A;
        b.iframe !== !1 && (b.iframe || C)
          ? b.closeKeepAlive
            ? a.get(b.closeKeepAlive, function () {
                B = h(q);
              })
            : (B = h(q))
          : (B = (x || z) && A ? g(q) : a.ajax(b)),
          l.removeData("jqxhr").data("jqxhr", B);
        for (var D = 0; D < p.length; D++) p[D] = null;
        return this.trigger("form-submit-notify", [this, b]), this;
      }),
      (a.fn.ajaxForm = function (e) {
        if (
          ((e = e || {}),
          (e.delegation = e.delegation && a.isFunction(a.fn.on)),
          !e.delegation && 0 === this.length)
        ) {
          var f = { s: this.selector, c: this.context };
          return !a.isReady && f.s
            ? (d("DOM not ready, queuing ajaxForm"),
              a(function () {
                a(f.s, f.c).ajaxForm(e);
              }),
              this)
            : (d(
                "terminating; zero elements found by selector" +
                  (a.isReady ? "" : " (DOM not ready)")
              ),
              this);
        }
        return e.delegation
          ? (a(document)
              .off("submit.form-plugin", this.selector, b)
              .off("click.form-plugin", this.selector, c)
              .on("submit.form-plugin", this.selector, e, b)
              .on("click.form-plugin", this.selector, e, c),
            this)
          : this.ajaxFormUnbind()
              .bind("submit.form-plugin", e, b)
              .bind("click.form-plugin", e, c);
      }),
      (a.fn.ajaxFormUnbind = function () {
        return this.unbind("submit.form-plugin click.form-plugin");
      }),
      (a.fn.formToArray = function (b, c) {
        var d = [];
        if (0 === this.length) return d;
        var f,
          g = this[0],
          h = this.attr("id"),
          i = b ? g.getElementsByTagName("*") : g.elements;
        if (
          (i && !/MSIE [678]/.test(navigator.userAgent) && (i = a(i).get()),
          h &&
            ((f = a(':input[form="' + h + '"]').get()),
            f.length && (i = (i || []).concat(f))),
          !i || !i.length)
        )
          return d;
        var j, k, l, m, n, o, p;
        for (j = 0, o = i.length; o > j; j++)
          if (((n = i[j]), (l = n.name), l && !n.disabled))
            if (b && g.clk && "image" == n.type)
              g.clk == n &&
                (d.push({ name: l, value: a(n).val(), type: n.type }),
                d.push(
                  { name: l + ".x", value: g.clk_x },
                  { name: l + ".y", value: g.clk_y }
                ));
            else if (((m = a.fieldValue(n, !0)), m && m.constructor == Array))
              for (c && c.push(n), k = 0, p = m.length; p > k; k++)
                d.push({ name: l, value: m[k] });
            else if (e.fileapi && "file" == n.type) {
              c && c.push(n);
              var q = n.files;
              if (q.length)
                for (k = 0; k < q.length; k++)
                  d.push({ name: l, value: q[k], type: n.type });
              else d.push({ name: l, value: "", type: n.type });
            } else
              null !== m &&
                "undefined" != typeof m &&
                (c && c.push(n),
                d.push({
                  name: l,
                  value: m,
                  type: n.type,
                  required: n.required,
                }));
        if (!b && g.clk) {
          var r = a(g.clk),
            s = r[0];
          (l = s.name),
            l &&
              !s.disabled &&
              "image" == s.type &&
              (d.push({ name: l, value: r.val() }),
              d.push(
                { name: l + ".x", value: g.clk_x },
                { name: l + ".y", value: g.clk_y }
              ));
        }
        return d;
      }),
      (a.fn.formSerialize = function (b) {
        return a.param(this.formToArray(b));
      }),
      (a.fn.fieldSerialize = function (b) {
        var c = [];
        return (
          this.each(function () {
            var d = this.name;
            if (d) {
              var e = a.fieldValue(this, b);
              if (e && e.constructor == Array)
                for (var f = 0, g = e.length; g > f; f++)
                  c.push({ name: d, value: e[f] });
              else
                null !== e &&
                  "undefined" != typeof e &&
                  c.push({ name: this.name, value: e });
            }
          }),
          a.param(c)
        );
      }),
      (a.fn.fieldValue = function (b) {
        for (var c = [], d = 0, e = this.length; e > d; d++) {
          var f = this[d],
            g = a.fieldValue(f, b);
          null === g ||
            "undefined" == typeof g ||
            (g.constructor == Array && !g.length) ||
            (g.constructor == Array ? a.merge(c, g) : c.push(g));
        }
        return c;
      }),
      (a.fieldValue = function (b, c) {
        var d = b.name,
          e = b.type,
          f = b.tagName.toLowerCase();
        if (
          (void 0 === c && (c = !0),
          c &&
            (!d ||
              b.disabled ||
              "reset" == e ||
              "button" == e ||
              (("checkbox" == e || "radio" == e) && !b.checked) ||
              (("submit" == e || "image" == e) && b.form && b.form.clk != b) ||
              ("select" == f && -1 == b.selectedIndex)))
        )
          return null;
        if ("select" == f) {
          var g = b.selectedIndex;
          if (0 > g) return null;
          for (
            var h = [],
              i = b.options,
              j = "select-one" == e,
              k = j ? g + 1 : i.length,
              l = j ? g : 0;
            k > l;
            l++
          ) {
            var m = i[l];
            if (m.selected) {
              var n = m.value;
              if (
                (n ||
                  (n =
                    m.attributes &&
                    m.attributes.value &&
                    !m.attributes.value.specified
                      ? m.text
                      : m.value),
                j)
              )
                return n;
              h.push(n);
            }
          }
          return h;
        }
        return a(b).val();
      }),
      (a.fn.clearForm = function (b) {
        return this.each(function () {
          a("input,select,textarea", this).clearFields(b);
        });
      }),
      (a.fn.clearFields = a.fn.clearInputs = function (b) {
        var c = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
        return this.each(function () {
          var d = this.type,
            e = this.tagName.toLowerCase();
          c.test(d) || "textarea" == e
            ? (this.value = "")
            : "checkbox" == d || "radio" == d
            ? (this.checked = !1)
            : "select" == e
            ? (this.selectedIndex = -1)
            : "file" == d
            ? /MSIE/.test(navigator.userAgent)
              ? a(this).replaceWith(a(this).clone(!0))
              : a(this).val("")
            : b &&
              ((b === !0 && /hidden/.test(d)) ||
                ("string" == typeof b && a(this).is(b))) &&
              (this.value = "");
        });
      }),
      (a.fn.resetForm = function () {
        return this.each(function () {
          ("function" == typeof this.reset ||
            ("object" == typeof this.reset && !this.reset.nodeType)) &&
            this.reset();
        });
      }),
      (a.fn.enable = function (a) {
        return (
          void 0 === a && (a = !0),
          this.each(function () {
            this.disabled = !a;
          })
        );
      }),
      (a.fn.selected = function (b) {
        return (
          void 0 === b && (b = !0),
          this.each(function () {
            var c = this.type;
            if ("checkbox" == c || "radio" == c) this.checked = b;
            else if ("option" == this.tagName.toLowerCase()) {
              var d = a(this).parent("select");
              b &&
                d[0] &&
                "select-one" == d[0].type &&
                d.find("option").selected(!1),
                (this.selected = b);
            }
          })
        );
      }),
      (a.fn.ajaxSubmit.debug = !1);
  }),
  ($.cookie = function (a, b, c) {
    if (arguments.length > 1 && "[object Object]" !== String(b)) {
      if (
        ((c = $.extend({}, c)),
        (null !== b && void 0 !== b) || (c.expires = -1),
        "number" == typeof c.expires)
      ) {
        var d = c.expires,
          e = (c.expires = new Date());
        e.setDate(e.getDate() + d);
      }
      return (
        (b = String(b)),
        (document.cookie = [
          encodeURIComponent(a),
          "=",
          c.raw ? b : encodeURIComponent(b),
          c.expires ? "; expires=" + c.expires.toUTCString() : "",
          c.path ? "; path=" + c.path : "",
          c.domain ? "; domain=" + c.domain : "",
          c.secure ? "; secure" : "",
        ].join(""))
      );
    }
    c = b || {};
    var f,
      g = c.raw
        ? function (a) {
            return a;
          }
        : decodeURIComponent;
    return (f = new RegExp(
      "(?:^|; )" + encodeURIComponent(a) + "=([^;]*)"
    ).exec(document.cookie))
      ? g(f[1])
      : null;
  }),
  !(function (a, b, c) {
    "use strict";
    "undefined" != typeof module && module.exports
      ? (module.exports = c(b, a))
      : "function" == typeof define && define.amd
      ? define("detect-zoom", function () {
          return c(b, a);
        })
      : (a[b] = c(b, a));
  })(window, "detectZoom", function () {
    var a = function () {
        return window.devicePixelRatio || 1;
      },
      b = function () {
        return { zoom: 1, devicePxPerCssPx: 1 };
      },
      c = function () {
        var b =
          Math.round((screen.deviceXDPI / screen.logicalXDPI) * 100) / 100;
        return { zoom: b, devicePxPerCssPx: b * a() };
      },
      d = function () {
        var b =
          Math.round(
            (document.documentElement.offsetHeight / window.innerHeight) * 100
          ) / 100;
        return { zoom: b, devicePxPerCssPx: b * a() };
      },
      e = function () {
        var b = Math.round((window.outerWidth / window.innerWidth) * 100) / 100;
        return { zoom: b, devicePxPerCssPx: b * a() };
      },
      f = function () {
        var b =
          Math.round(
            (document.documentElement.clientWidth / window.innerWidth) * 100
          ) / 100;
        return { zoom: b, devicePxPerCssPx: b * a() };
      },
      g = function () {
        var b =
            90 == Math.abs(window.orientation) ? screen.height : screen.width,
          c = b / window.innerWidth;
        return { zoom: c, devicePxPerCssPx: c * a() };
      },
      h = function () {
        var b = function (a) {
            return a.replace(/;/g, " !important;");
          },
          c = document.createElement("div");
        (c.innerHTML = "1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>0"),
          c.setAttribute(
            "style",
            b(
              "font: 100px/1em sans-serif; -webkit-text-size-adjust: none; text-size-adjust: none; height: auto; width: 1em; padding: 0; overflow: visible;"
            )
          );
        var d = document.createElement("div");
        d.setAttribute(
          "style",
          b(
            "width:0; height:0; overflow:hidden; visibility:hidden; position: absolute;"
          )
        ),
          d.appendChild(c),
          document.body.appendChild(d);
        var e = 1e3 / c.clientHeight;
        return (
          (e = Math.round(100 * e) / 100),
          document.body.removeChild(d),
          { zoom: e, devicePxPerCssPx: e * a() }
        );
      },
      i = function () {
        var a = l("min--moz-device-pixel-ratio", "", 0, 10, 20, 1e-4);
        return (
          (a = Math.round(100 * a) / 100), { zoom: a, devicePxPerCssPx: a }
        );
      },
      j = function () {
        return { zoom: i().zoom, devicePxPerCssPx: a() };
      },
      k = function () {
        var b = window.top.outerWidth / window.top.innerWidth;
        return (
          (b = Math.round(100 * b) / 100),
          { zoom: b, devicePxPerCssPx: b * a() }
        );
      },
      l = function (a, b, c, d, e, f) {
        function g(c, d, e) {
          var i = (c + d) / 2;
          if (0 >= e || f > d - c) return i;
          var j = "(" + a + ":" + i + b + ")";
          return h(j).matches ? g(i, d, e - 1) : g(c, i, e - 1);
        }
        var h, i, j, k;
        window.matchMedia
          ? (h = window.matchMedia)
          : ((i = document.getElementsByTagName("head")[0]),
            (j = document.createElement("style")),
            i.appendChild(j),
            (k = document.createElement("div")),
            (k.className = "mediaQueryBinarySearch"),
            (k.style.display = "none"),
            document.body.appendChild(k),
            (h = function (a) {
              j.sheet.insertRule(
                "@media " +
                  a +
                  "{.mediaQueryBinarySearch {text-decoration: underline} }",
                0
              );
              var b = "underline" == getComputedStyle(k, null).textDecoration;
              return j.sheet.deleteRule(0), { matches: b };
            }));
        var l = g(c, d, e);
        return k && (i.removeChild(j), document.body.removeChild(k)), l;
      },
      m = (function () {
        var a = b;
        return (
          isNaN(screen.logicalXDPI) || isNaN(screen.systemXDPI)
            ? window.navigator.msMaxTouchPoints
              ? (a = d)
              : window.chrome &&
                !(window.opera || navigator.userAgent.indexOf(" Opera") >= 0)
              ? (a = e)
              : Object.prototype.toString
                  .call(window.HTMLElement)
                  .indexOf("Constructor") > 0
              ? (a = f)
              : "orientation" in window &&
                "webkitRequestAnimationFrame" in window
              ? (a = g)
              : "webkitRequestAnimationFrame" in window
              ? (a = h)
              : navigator.userAgent.indexOf("Opera") >= 0
              ? (a = k)
              : window.devicePixelRatio
              ? (a = j)
              : i().zoom > 0.001 && (a = i)
            : (a = c),
          a
        );
      })();
    return {
      zoom: function () {
        return m().zoom;
      },
      device: function () {
        return m().devicePxPerCssPx;
      },
    };
  }),
  (window.inAction = 1),
  (window.allowSlide = 1),
  (window.blockScroll = 1),
  (window.effectOffset = 500),
  (window.effectSpeed = 1e3),
  (window.slideSpeed = 1e3),
  (window.cleanupDelay = 1400),
  (window.horizontalMode = 0),
  (window.sidebarShown = 0),
  (window.loadingProgress = 0),
  (window.smoothScroll = 0),
  (window.scrollSpeed = 0.2),
  (window.preload = 1),
  (window.setHashLink = 1),
  (window.hideSidebarOnBodyClick = 1),
  (window.collectScrolls = 0),
  (window.sliderStatus = 0),
  (window.minScrollToSlide = 800),
  (window.minSwipeToSlide = 6),
  (window.minSwipeToSwitch = 200),
  (window.bottomPanel = "visible"),
  (window.enableMobileZoom = 0),
  (window.hideOnScrollSensitivity = 100),
  (window.allowParallaxOnMobile = 1),
  (window.hidePopupOnBodyClick = 1),
  (window.disableKeyNavigation = 0);
var $html = $("html");
$(window).on("load", function () {
  window.loaded = 1;
}),
  $(document).ready(function () {
    "use strict";
    function a() {
      var a = window.location.href.split("#")[1];
      if (a && $('.slide[data-name="' + a + '"]').length > 0) {
        var b = $('.slide[data-name="' + a + '"]');
        (window.isMobile && window.isSimplifiedMobile) || window.isScroll
          ? b.length &&
            (!window.preload || window.loaded
              ? $("html,body")
                  .stop()
                  .clearQueue()
                  .animate({ scrollTop: b.position().top }, window.effectSpeed)
              : $(window).on("load", function () {
                  $("html,body")
                    .stop()
                    .clearQueue()
                    .animate(
                      { scrollTop: b.position().top },
                      window.effectSpeed
                    );
                }))
          : ((window.stage = $(".slide").index(b) + 1), d(window.stage));
      }
    }
    function b() {
      var a = window.loadingProgress / window.images;
      window.progressBar.css("width", 100 * a + "%"),
        window.loadingProgress == window.images &&
          window.progressBar.addClass("loaded");
    }
    function c() {
      $html.addClass("page-loaded"),
        (window.inAction = 0),
        (window.blockScroll = 0),
        (window.loaded = 1),
        setTimeout(function () {
          window.isScroll && (f(), h()),
            window.isMobile && window.isSimplifiedMobile
              ? ($(".slide").addClass("selected animate active"), f(), h())
              : d(window.stage);
        }, 500);
    }
    function d(a) {
      if (
        ((a = parseInt(a)),
        !((window.isMobile && window.isSimplifiedMobile) || window.isScroll))
      ) {
        h();
        var b = $(".slide").eq(a - 1),
          c = $(".slide.selected"),
          d = c.index(".slide") + 1;
        m(),
          e(),
          i(),
          (window.allowSlide = 1),
          n.removeClass(
            "sidebarShown lastSlide firstSlide hidePanel-top hidePanel-bottom"
          ),
          0 != window.setStageClasses &&
            (1 === window.stage && n.addClass("firstSlide"),
            window.stages === window.stage &&
              1 !== window.stages &&
              n.addClass("lastSlide"),
            n.removeClassByPrefix("stage-").addClass("stage-" + window.stage)),
          b.hasClass("whiteSlide")
            ? n.addClass("whiteSlide")
            : n.removeClass("whiteSlide"),
          d !== a &&
            0 != window.setStageClasses &&
            (c.removeClass("selected").addClass("active"),
            b.removeClass("before after").addClass("selected active"),
            b.prevAll(".slide").addClass("before").removeClass("after"),
            b.nextAll(".slide").addClass("after").removeClass("before"),
            $(window).trigger("slideChange", [parseInt(a), b])),
          window.setHashLink &&
            (b.attr("data-name") || b.attr("id")
              ? (window.location.hash = b.attr("data-name")
                  ? b.attr("data-name")
                  : b.attr("id"))
              : window.location.toString().indexOf("#") > 0 &&
                "file:" !== location.protocol &&
                location.href.split("#")[0] &&
                (history.pushState
                  ? window.history.pushState(
                      "",
                      "",
                      location.href.split("#")[0]
                    )
                  : (window.location.hash = ""))),
          b.find(".content, .container").scrollTop(0),
          window.loaded &&
            ((window.blockScroll = 1),
            setTimeout(function () {
              d !== a &&
                (0 === window.animationLoop
                  ? c.removeClass("active")
                  : c.removeClass("active animate")),
                (window.blockScroll = 0);
            }, window.effectSpeed),
            window.effectOffset > window.slideSpeed &&
              (window.effectOffset = window.slideSpeed),
            setTimeout(function () {
              b.addClass("animate");
            }, window.slideSpeed - window.effectOffset),
            0 != window.animationLoop && $(".done").removeClass("done"),
            $(".slide.selected [class*='ae-']").one(
              "webkitTransitionEnd oTransitionEnd msTransitionEnd transitionend",
              function () {
                var a = $(this);
                setTimeout(function () {
                  a.addClass("done");
                }, window.effectOffset);
              }
            ));
      }
    }
    function e(a) {
      $(".zoom-overlay-open").length > 0 &&
        ($(".zoom-img").click(),
        a && $(".zoom-img-wrap, .zoom-overlay").remove());
    }
    function f() {
      p++,
        p >= 2 && (m(), (p = 0)),
        $(".slide").each(function (a, b) {
          var c = $(b),
            d = c.index(".slide"),
            e = $(document).scrollTop(),
            f = c.offset().top,
            g = c.height(),
            i = window.windowHeight / 2 > g ? g / 2 : window.windowHeight / 2,
            j = f < window.windowHeight + e - i && f > e - g + i,
            k =
              2 *
              ((e + window.windowHeight - f) / (window.windowHeight + g) - 0.5),
            l = !0;
          0 === e && (l = 0 === a),
            e + window.windowHeight === window.documentHeight &&
              (l = a === window.stages - 1),
            0 != window.setStageClasses &&
              (j && l
                ? (c.prevAll(".slide").addClass("before").removeClass("after"),
                  c.nextAll(".slide").addClass("after").removeClass("before"),
                  c
                    .addClass("selected animate active")
                    .removeClass("after before"),
                  (window.stage === d + 1 && window.firstTimeTrigger) ||
                    ((window.stage = d + 1),
                    $(window).trigger("slideChange", [window.stage, c]),
                    1 === window.stage
                      ? n.addClass("firstSlide")
                      : n.removeClass("firstSlide"),
                    window.stages === window.stage
                      ? n.addClass("lastSlide")
                      : n.removeClass("lastSlide"),
                    n
                      .removeClassByPrefix("stage-")
                      .addClass("stage-" + window.stage),
                    c.hasClass("whiteSlide")
                      ? n.addClass("whiteSlide")
                      : n.removeClass("whiteSlide"),
                    "auto" == window.isAnimated &&
                      (window.clearElementAnimation = setTimeout(function () {
                        c.find("[class*='ae-']").addClass("done");
                      }, window.effectSpeed + window.cleanupDelay))),
                  window.firstTimeTrigger ||
                    ((window.firstTimeTrigger = 1),
                    $(window).trigger("slideChange", [window.stage, c])))
                : c.removeClass("selected"),
              h()),
            (!window.isMobile ||
              (window.isMobile && window.allowParallaxOnMobile)) &&
              k > -1 &&
              k < 1 &&
              (c.hasClass("parallax") || c.find(".parallax-element")) &&
              c.find(".parallax-element").each(function () {
                var a = $(this),
                  b = parseInt(a.data("parallax-velocity"))
                    ? parseInt(a.data("parallax-velocity"))
                    : 50,
                  c = k * b;
                b > 100 && (b = 100),
                  a
                    .css("-webkit-transform", "translate3d(0, " + c + "%, 0)")
                    .css("transform", "translate3d(0, " + c + "%, 0)");
              });
        }),
        "animateOnEvent" == window.isAnimated &&
          (window.preload
            ? window.loaded &&
              $("[class*='ae-']").each(function (a, b) {
                var c = $(b);
                g(c) &&
                  c
                    .addClass("do")
                    .one(
                      "webkitAnimationEnd oanimationend msAnimationEnd animationend",
                      function () {
                        $(this)
                          .removeClassByPrefix("ae-")
                          .removeClass("do")
                          .addClass("done");
                      }
                    );
              })
            : $("[class*='ae-']:not(.done):not(.do)").each(function (a, b) {
                var c = $(b);
                g(c)
                  ? c
                      .addClass("do")
                      .one(
                        "webkitAnimationEnd oanimationend msAnimationEnd animationend",
                        function () {
                          $(this).removeClass("do").addClass("done");
                        }
                      )
                  : 1 == window.animationLoop &&
                    (g(c) || c.removeClass("done do"));
              }));
    }
    function g(a) {
      var b = $(window).scrollTop(),
        c = $(a),
        d = c.height(),
        e = b + window.windowHeight,
        f = c.offset().top,
        g = f + d;
      return d >= window.windowHeight / 5 ? e >= f + d / 5 : b < f && e > g;
    }
    function h() {
      setTimeout(function () {
        $(z).length > 0 &&
          $(z).each(function (a, b) {
            $(b).find("li.selected").removeClass("selected");
            var c = $(".slide.selected"),
              d = parseInt(c.data("parent-slide-id")),
              e = c.index(".slide:not(.exclude)");
            e !== -1
              ? $(b).find("li").eq(e).addClass("selected")
              : d &&
                ((e = $('.slide[data-slide-id="' + d + '"]').index(
                  ".slide:not(.exclude)"
                )),
                $(b).find("li").eq(e).addClass("selected"));
          });
      }, 100);
    }
    function i() {
      if (window.sidebarShown) {
        $html.removeClass("sidebarShown").removeClassByPrefix("sidebar_");
        var a = $(".sidebar.visible");
        a.removeClass("visible"),
          (window.removeAnimationTimeout = setTimeout(function () {
            a.removeClass("animate active").find(".done").removeClass("done");
          }, 500)),
          (window.sidebarShown = 0),
          (window.allowSlide = 1);
      }
    }
    function j(a) {
      if (((a = "undefined" != typeof a && a), $.isArray(window.popupShown))) {
        var b = a ? a : window.popupShown.slice(-1)[0],
          c = $('.popup.visible[data-popup-id="' + b + '"]'),
          d = c.find("iframe[src]"),
          e = c.find("video");
        d.length > 0 &&
          c.hasClass("autoplay") &&
          $(d).each(function (a, b) {
            var c = $(b).attr("src"),
              d = c.indexOf("?autoplay") > -1 ? "?" : "&";
            $(b).attr(
              "src",
              $(b)
                .attr("src")
                .replace(d + "autoplay=1", "")
            );
          }),
          e.length > 0 &&
            $(e).each(function (a, b) {
              $(b)[0].pause(), ($(b)[0].currentTime = 0);
            }),
          clearTimeout(window.clearPopupElementAnimation),
          c.addClass("hidePopup"),
          $(window).trigger("popupHidden"),
          setTimeout(function () {
            if (
              ((window.allowSlide = 1),
              c
                .removeClass("visible animate active hidePopup")
                .removeAttr("style")
                .find(".done")
                .removeClass("done"),
              $html.removeClass("popup_" + b),
              $.isArray(window.popupShown))
            ) {
              var a = window.popupShown.indexOf(b);
              a != -1 && window.popupShown.splice(a, 1);
            }
            window.popupShown.length <= 0 &&
              ($html.removeClass("popupShown"), (window.popupShown = !1));
          }, 500);
      }
    }
    function k() {
      var a = $(".grid.equal, .flex.equal");
      a.length &&
        $(a).each(function (a, b) {
          var c = window.windowWidth,
            d = $(b).hasClass("later") ? 767 : 1024,
            d = $(b).data("equal-collapse-width")
              ? parseInt($(b).data("equal-collapse-width"))
              : d,
            e = $(b).find(".equalElement"),
            f = $(this).hasClass("equalMobile");
          if (c >= d || f) {
            var g = 0;
            $(e).each(function (a, b) {
              $(b).css("height", "auto"),
                g < $(b).outerHeight() && (g = $(b).outerHeight());
            }),
              $(b)
                .find(".equalElement")
                .each(function (a, b) {
                  $(b).css("height", g + "px");
                });
          } else $(e).css("height", "auto");
        });
    }
    function l(a, b) {
      b = "undefined" != typeof b && b;
      var c = a.offset(),
        d = a.position(),
        e = window.popupShown ? Math.ceil(d.top) : Math.ceil(c.top),
        f = Math.ceil(c.left),
        g = a.data("dropdown-id"),
        h = $('.dropdown[data-dropdown-id="' + g + '"]'),
        i = a.data("dropdown-position")
          ? a.data("dropdown-position")
          : h.attr("class"),
        j = 0 != h.data("dropdown-set-position"),
        i = i.split(" "),
        k = !1;
      if (
        ("number" == typeof window.dropdownInterval &&
          clearInterval(window.dropdownInterval),
        b)
      ) {
        var k = !1;
        $(document).mousemove(function (a) {
          k = !(
            $(a.target).attr("data-dropdown-id") != g &&
            !$(a.target).closest(
              ".dropdownTrigger.hover[data-dropdown-id=" + g + "]"
            ).length &&
            !$(a.target).closest(".dropdown[data-dropdown-id=" + g + "]").length
          );
        }),
          (window.dropdownInterval = setInterval(function () {
            k || (m(), clearInterval(window.dropdownInterval));
          }, 300));
      } else m();
      i.indexOf("bottom") != -1
        ? ((e -= h.outerHeight()), h.removeClass("top").addClass("bottom"))
        : ((e += a.outerHeight()), h.removeClass("bottom").addClass("top")),
        i.indexOf("right") != -1
          ? ((f = f - h.outerWidth() + a.outerWidth()),
            h.removeClass("left center").addClass("right"))
          : i.indexOf("left") != -1
          ? h.removeClass("right center").addClass("left")
          : i.indexOf("center") != -1 &&
            ((f = f - h.outerWidth() / 2 + a.outerWidth() / 2),
            h.removeClass("right left").addClass("center")),
        h.addClass("show"),
        j && h.css("top", e).css("left", f),
        $html.addClass("dropdownShown dropdown_" + g),
        (window.dropdownShown = !0);
    }
    function m() {
      window.dropdownShown &&
        ($html.removeClass("dropdownShown").removeClassByPrefix("dropdown_"),
        (window.dropdownShown = !1),
        (p = 0),
        $(".dropdown.show")
          .addClass("hide")
          .one(
            "webkitTransitionEnd otransitionend msTransitionEnd transitionend",
            function () {
              $(this).removeClass("show hide"),
                $html
                  .removeClass("dropdownShown")
                  .removeClassByPrefix("dropdown_");
            }
          ),
        $(window).trigger("dropdownHidden"));
    }
    var n = $("body");
    if (
      (setTimeout(function () {
        $(window).trigger("ready");
      }, 1),
      n.hide().show(0),
      (window.isScroll = n.hasClass("scroll")),
      (window.isSimplifiedMobile = n.hasClass("simplifiedMobile")),
      (window.isScroll || (window.isSimplifiedMobile && window.isMobile)) &&
        $html.addClass("scrollable"),
      $html.addClass("page-ready"),
      n.hasClass("fast")
        ? ((window.slideSpeed = 700),
          (window.cleanupDelay = 1200),
          (window.effectSpeed = 800),
          (window.scrollSpeed = 0.35),
          (window.effectOffset = 400))
        : n.hasClass("slow") &&
          ((window.slideSpeed = 1400),
          (window.cleanupDelay = 2e3),
          (window.effectSpeed = 1400),
          (window.scrollSpeed = 0.8),
          (window.effectOffset = 600)),
      (window.stage = 1),
      (window.stages = $(".slide").length),
      n.hasClass("horizontal") && (window.horizontalMode = 1),
      n.hasClass("noPreload") && (window.preload = 0),
      n.hasClass("animated")
        ? (window.isAnimated = "auto")
        : n.hasClass("animateOnEvent") &&
          ((window.isAnimated = "animateOnEvent"),
          window.isMobile &&
            ((window.isAnimated = "auto"),
            n.removeClass("animateOnEvent").addClass("animated"))),
      window.isSimplifiedMobile &&
        window.isMobile &&
        ((window.isAnimated = !1),
        n.removeClass("animated animateOnEvent"),
        $("[class*='ae-']").addClass("done")),
      window.isAnimated || (window.cleanupDelay = 0),
      n.hasClass("smoothScroll") &&
        !window.isMobile &&
        (window.smoothScroll = 1),
      a(),
      $(window).on("popstate", function (b) {
        setTimeout(function () {
          a();
        }, 100),
          b.preventDefault();
      }),
      window.preload)
    ) {
      var o = [];
      $("*").each(function () {
        var a,
          b = $(this);
        "none" !== b.css("background-image")
          ? (a = b
              .css("background-image")
              .replace(/.*\s?url\([\'\"]?/, "")
              .replace(/[\'\"]?\).*/, ""))
          : b.is("img") && (a = b.attr("src")),
          a &&
            !/(repeating-)?(linear|radial)-gradient.+/.test(a) &&
            (o.push(a), console.log(a));
      }),
        (window.images = o.length),
        (window.progressBar = $(".progress-bar")),
        $.cacheImage(o, {
          complete: function () {
            window.loadingProgress++, b();
          },
        }),
        b();
    }
    d(window.stage),
      (window.preload && window.images && !window.loaded) || c(),
      window.loaded ||
        $(window).on("load", function () {
          c();
        }),
      $(".animated").on("click", "[class*='ae-']:not('.done')", function () {
        $(this).addClass("done");
      }),
      (window.changeSlide = function (a) {
        if (
          ("increase" === a
            ? (a =
                window.stage + 1 >= window.stages
                  ? window.stages
                  : window.stage + 1)
            : "decrease" === a &&
              (a = window.stage - 1 < 1 ? 1 : window.stage - 1),
          (window.isMobile && window.isSimplifiedMobile) || window.isScroll)
        ) {
          window.stage = a;
          var b = $(".slide:eq(" + (window.stage - 1) + ")"),
            c = $(b).offset().top;
          $("html,body")
            .stop()
            .clearQueue()
            .animate({ scrollTop: c }, window.effectSpeed);
        } else if (
          a !== window.stage &&
          a <= window.stages &&
          1 !== window.inAction
        ) {
          (window.inAction = 1), (window.stage = a);
          var f = 0;
          $(".zoom-overlay-open").length > 0 && (e(), (f = 550)),
            setTimeout(function () {
              d(window.stage),
                setTimeout(function () {
                  window.inAction = 0;
                }, window.slideSpeed);
            }, f);
        }
      }),
      $(".nextSlide").on("click", function () {
        window.changeSlide("increase");
      }),
      $(".prevSlide").on("click", function () {
        window.changeSlide("decrease");
      }),
      $(".toFirstSlide").on("click", function () {
        window.changeSlide(1),
          history.pushState
            ? window.history.pushState("", "", location.href.split("#")[0])
            : (window.location.hash = ""),
          i();
      }),
      $(".toLastSlide").on("click", function () {
        window.changeSlide(window.stages),
          history.pushState
            ? window.history.pushState("", "", location.href.split("#")[0])
            : (window.location.hash = ""),
          i();
      }),
      $('[class*="toSlide-"]').on("click", function () {
        var a = parseInt(
          $(this).attr("class").split("toSlide-")[1].split(" ")[0]
        );
        window.changeSlide(a), i();
      }),
      $(window).on("resize load ready", function () {
        $('[data-action="zoom"]').removeAttr("style"),
          $(".zoom-overlay").length > 0 && e("fast"),
          (window.windowHeight = $(window).height()),
          (window.windowWidth = $(window).width()),
          (window.documentHeight = $(document).height());
      });
    $("html,body").on("DOMMouseScroll mousewheel scroll touchmove", function (
      a
    ) {
      var b = $(".slide.selected .content"),
        c = Math.ceil(Math.abs(a.deltaY) * a.deltaFactor),
        d = window.isFirefox ? 2 : 1,
        e = window.isWindows ? 2 * d : d,
        f = a.originalEvent.wheelDelta
          ? a.originalEvent.wheelDelta
          : a.deltaY * a.deltaFactor,
        g = f * d * e,
        h = a.deltaY >= 0 ? "up" : "down",
        i = b.scrollTop(),
        j = b.find(".container").outerHeight(),
        k = detectZoom.device(),
        l =
          window.isFirefox && window.isWindows ? 200 : window.minScrollToSlide;
      if (c) {
        if (
          window.isScroll &&
          !window.sidebarShown &&
          !window.popupShown &&
          !window.blockScroll
        )
          if (window.smoothScroll && !window.isMobile) {
            g > 1500 && (g = 1500), g < -1e3 && (g = -1500);
            var m = $(window),
              o = m.scrollTop(),
              p = o - g;
            TweenLite.to(m, window.scrollSpeed, {
              scrollTo: { y: p, autoKill: !1 },
              ease: Power4.easeOut,
              overwrite: "all",
            });
          } else window.isWindows || b.scrollTop(i - g);
        window.isScroll ||
          (window.isMobile && window.isSimplifiedMobile) ||
          (j > window.windowHeight &&
            (("up" === h && 0 === b.scrollTop()) ||
            ("down" === h &&
              b.scrollTop() + window.windowHeight >= Math.floor(j / k))
              ? (window.allowSlide = 1)
              : (window.allowSlide = 0),
            window.panelsToHide &&
              ("down" === h && b.scrollTop() > 0
                ? n.addClass("hidePanel-top")
                : "up" === h && n.removeClass("hidePanel-top"),
              n.addClass("hidePanel-bottom"),
              "down" === h &&
              b.scrollTop() + window.windowHeight >= Math.floor(j / k)
                ? n.removeClass("hidePanel-bottom")
                : "up" === h && n.addClass("hidePanel-bottom")),
            window.sidebarShown ||
              window.popupShown ||
              window.blockScroll ||
              (window.smoothScroll
                ? (g > 1500 && (g = 1500),
                  g < -1e3 && (g = -1500),
                  TweenLite.to(b, 0.5, {
                    scrollTo: { y: i - g, autoKill: !1 },
                    ease: Power4.easeOut,
                    overwrite: 5,
                  }))
                : ((i = "up" === h ? i - c : i + c), b.scrollTop(i)))),
          window.allowSlide &&
            c &&
            ("down" == h
              ? (window.collectScrolls = window.collectScrolls + c)
              : (window.collectScrolls = window.collectScrolls - c),
            setTimeout(function () {
              window.collectScrolls = 0;
            }, 200)),
          Math.abs(window.collectScrolls) >= l &&
            window.allowSlide &&
            !window.sidebarShown &&
            !window.popupShown &&
            !window.disableOnScroll &&
            ((window.collectScrolls = 0),
            (("down" === h && window.stage !== window.stages) ||
              ("up" === h && 1 !== window.stage)) &&
              1 !== window.inAction &&
              ("down" === h
                ? window.changeSlide("increase")
                : window.changeSlide("decrease"))));
      }
    }),
      ((window.isMobile && window.isSimplifiedMobile) || window.isScroll) &&
        $(window).on(
          "DOMMouseScroll mousewheel scroll touchmove load",
          function () {
            0 != window.updateScroll && f();
          }
        );
    var p = 0;
    if (
      ($(
        ".mobile .slides:not(.scroll):not(.simplifiedMobile), .slides.desktopSwipe"
      ).swipe({
        swipeStatus: function (a, b, c, d) {
          (window.allowSwipeUp = 1), (window.allowSwipeDown = 1);
          var e = $(".slide.selected .content"),
            f = Math.floor(e.find(".container").outerHeight()),
            g = "up",
            h = "down",
            i = window.minSwipeToSlide,
            j = window.innerHeight,
            k = window.minSwipeToSwitch;
          window.sidebarShown && (e = $(".sidebar .content")),
            window.popupShown && (e = $(".popup .content")),
            "start" === b && (window.scrollTop = e.scrollTop()),
            window.horizontalMode && ((g = "left"), (h = "right")),
            !window.horizontalMode &&
              f > j &&
              (window.scrollTop + j < f && (window.allowSwipeUp = 0),
              window.scrollTop > 0 && (window.allowSwipeDown = 0)),
            window.sidebarShown ||
              window.disableOnSwipe ||
              ((c === "left" || c === "right") &&
              (!window.allowSwipeUp ||
                !window.allowSwipeDown ||
                window.bottomPanel === "visible") &&
              d > k
                ? swtichPage(c, k)
                : ((c === "up" && window.allowSwipeUp) ||
                    (c === "down" && window.allowSwipeDown)) &&
                  d > i &&
                  window.allowSlide &&
                  swtichSlide(c, i));
        },
        maxTimeThreshold: 0,
        fingers: "all",
        allowPageScroll: "vertical",
      }),
      $(".slides.desktopSwipe *").on("click", function () {
        $(this).addClass("selectable");
      }),
      $(".panel .compact").length > 0 &&
        $(".panel .compact").each(function (a, b) {
          var c = $(b).parents(".panel"),
            d = $(c).find(".desktop"),
            e = b,
            f = $(c).hasClass("forceMobileView");
          $(window).on("load resize ready", function () {
            var a = $(document).width(),
              b =
                parseInt($(c).css("padding-left").replace("px", "")) +
                parseInt($(c).css("padding-right").replace("px", ""));
            if ((window.isMobile || $(document).width() < 767) && f)
              $(d).addClass("hidden"), $(e).removeClass("hidden");
            else {
              $(d).removeClass("hidden"), $(e).addClass("hidden");
              var g = 0;
              d.children().each(function () {
                g +=
                  $(this).outerWidth() > $(this).children().outerWidth()
                    ? Math.round($(this).outerWidth())
                    : Math.round($(this).children().outerWidth());
              }),
                g + Math.round(b) > a + 2 || ((window.isMobile || a < 767) && f)
                  ? ($(d).addClass("hidden"), $(e).removeClass("hidden"))
                  : ($(d).removeClass("hidden"), $(e).addClass("hidden"));
            }
          });
        }),
      $(".panel.hideOnScroll").length > 0 &&
        ((window.panelsToHide = !0),
        window.isScroll || window.isSimplifiedMobile))
    ) {
      var q,
        r = 0,
        s = window.hideOnScrollSensitivity
          ? window.hideOnScrollSensitivity
          : 100,
        t = $(".panel.hideOnScroll");
      $(window).on("mousewheel", function (a) {
        var b = $(this).scrollTop(),
          c = $(t),
          d = Math.ceil(Math.abs(a.deltaY) * a.deltaFactor);
        b > q
          ? ((r += d), r >= s && (c.addClass("hide"), (r = s)))
          : ((r -= d), r <= s / 5 && ((r = 0), c.removeClass("hide"))),
          (q = b),
          (b + window.windowHeight + s >= window.documentHeight ||
            b + s <= 0) &&
            c.removeClass("hide");
      });
    }
    if (window.isMobile) {
      var u = window.isScroll ? $(document) : $(".slide .content"),
        v = (u.find(".container").outerHeight(), 0),
        w =
          (Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.offsetHeight,
            document.body.clientHeight,
            document.documentElement.clientHeight
          ),
          $(".panel.top.hideOnScroll")),
        x = $(".panel.bottom.hideOnScroll");
      u.on("scroll", function (a) {
        if (!window.inAction) {
          var b = $(this),
            c = $(this).scrollTop(),
            d = c > v ? "down" : "up";
          "down" === d && b.scrollTop() > 0
            ? (w && n.addClass("hidePanel-top"),
              x &&
                (window.bottomPanel = "visible") &&
                n.removeClass("hidePanel-bottom"))
            : "up" === d &&
              n.removeClass("hidePanel-top") &&
              (window.bottomPanel = "hidden") &&
              n.addClass("hidePanel-bottom"),
            (v = c);
        }
      });
    }
    $(document).on("keydown", function (a) {
      var b = 2.5,
        c = 50,
        d = $(".slide.selected .content"),
        f = d.scrollTop(),
        g = f + parseInt(b * c);
      window.disableKeyNavigation ||
        "input" == a.target.nodeName.toLowerCase() ||
        "textarea" == a.target.nodeName.toLowerCase() ||
        ((37 !== a.keyCode && 33 !== a.keyCode) ||
          (a.preventDefault(),
          window.horizontalMode && window.changeSlide("decrease")),
        (38 !== a.keyCode && 33 !== a.keyCode) ||
          (window.horizontalMode
            ? (a.preventDefault(),
              TweenLite.to(d, window.scrollSpeed, {
                scrollTo: { y: g, autoKill: !0 },
                ease: Power4.easeOut,
                overwrite: 5,
              }))
            : (a.preventDefault(), window.changeSlide("decrease"))),
        (39 !== a.keyCode && 34 !== a.keyCode) ||
          (window.horizontalMode &&
            (a.preventDefault(), window.changeSlide("increase"))),
        (40 !== a.keyCode && 34 !== a.keyCode) ||
          (window.horizontalMode
            ? (a.preventDefault(),
              TweenLite.to(d, window.scrollSpeed, {
                scrollTo: { y: g, autoKill: !0 },
                ease: Power4.easeOut,
                overwrite: 5,
              }))
            : (a.preventDefault(), window.changeSlide("increase"))),
        27 === a.keyCode && (i(), m(), j(), e()));
    });
    var y = $(".navigation"),
      z = $(y).find("ul"),
      A = $(".slide:not(.exclude)").length;
    if (
      ($(z).length > 0 &&
        ($(z).is(":empty") &&
          $(z).each(function (a, b) {
            for (var c = 1; c <= A; c++) {
              var d = $(".slide:not(.exclude):eq(" + (c - 1) + ")").data(
                "title"
              );
              void 0 === d
                ? $(b).append("<li></li>")
                : $(b).append('<li data-title="' + d + '"></li>');
            }
          }),
        $(".navigation li").on("click touchend", function () {
          var a = $(this).index(),
            b = $(".slide:not(.exclude):eq(" + a + ")").index(".slide");
          $(this).blur(), window.changeSlide(b + 1);
        }),
        $(".side").hasClass("compact") ||
          $(window).on("load resize ready", function () {
            var a = window.windowHeight - 140,
              b = $(".side").removeClass("compact").find("ul"),
              c = 0;
            $(b)
              .children()
              .each(function () {
                c += Math.round($(this).outerHeight(!0));
              }),
              c > a
                ? $(".side").addClass("compact")
                : $(".side").removeClass("compact");
          })),
      $("a[href^='#'][target!='_blank']").click(function (a) {
        var b = $(this).attr("href"),
          c = b.split("#")[1],
          e = c
            ? $('.slide[id="' + c + '"], .slide[data-name="' + c + '"]')
            : $(".slide:eq(0)");
        if (e.length > 0) {
          if (
            (a.preventDefault(),
            (window.isMobile && window.isSimplifiedMobile) || window.isScroll)
          ) {
            var f = e;
            f.length &&
              $("html,body")
                .stop()
                .clearQueue()
                .animate({ scrollTop: f.position().top }, 1e3),
              window.setHashLink && (window.location.hash = c);
          } else (window.stage = $(".slide").index(e) + 1), d(window.stage);
          i();
        }
      }),
      $(".sidebarTrigger[data-sidebar-id]").on("click", function () {
        var a = $(this).data("sidebar-id");
        window.showSidebar(a);
      }),
      (window.showSidebar = function (a) {
        var b = a,
          c = $('.sidebar[data-sidebar-id="' + b + '"]'),
          d = $(c).hasClass("animated");
        window.sidebarShown
          ? i()
          : c.length > 0 &&
            ((window.sidebarShown = 1),
            (window.allowSlide = 0),
            $(c).removeClass("animate active").addClass("visible"),
            $html.addClass("sidebarShown sidebar_" + b),
            $(c).find(".content").scrollTop(0),
            d &&
              (clearTimeout(window.removeAnimationTimeout),
              setTimeout(function () {
                $(c).addClass("animate active");
              }, 100))),
          m();
      }),
      $(document).on("mouseup touchstart", function (a) {
        var b = $(".sidebarShown .sidebar, .dropdownTrigger"),
          c = a.target;
        !b.is(c) &&
          0 === b.has(c).length &&
          window.hideSidebarOnBodyClick &&
          $(c).hasClass("ignoreBodyClick") === !1 &&
          i(),
          $(window).trigger("sidebarHidden");
      }),
      $('.sidebar .close, .sidebar [data-sidebar-action="close"]').on(
        "click touchstart",
        function () {
          i();
        }
      ),
      $(".popupTrigger[data-popup-id]").on("click", function () {
        var a = $(this).data("popup-id"),
          b = $(this).data("popup-focus-input");
        "string" != typeof b && "" != b && (b = !1), window.showPopup(a, b);
      }),
      (window.showPopup = function (a, b) {
        function c() {
          var a = jQuery.Deferred();
          return (
            g
              ? setTimeout(function () {
                  $(f).addClass("animate active"),
                    clearTimeout(window.clearPopupElementAnimation),
                    (window.clearPopupElementAnimation = setTimeout(
                      function () {
                        $(f).find("[class*='ae-']").addClass("done"),
                          a.resolve("done");
                      },
                      window.effectSpeed + window.cleanupDelay
                    ));
                }, 100)
              : a.resolve("done"),
            a.promise()
          );
        }
        var d = a,
          e = b,
          f = $('.popup[data-popup-id="' + d + '"]'),
          g = f.hasClass("animated");
        if (f.length > 0) {
          i(),
            $(f).addClass("visible"),
            $(window).trigger("popupShown"),
            $.when(c()).then(
              function (a) {
                e &&
                  $(f)
                    .find("#" + e)
                    .focus();
              },
              function (a) {},
              function (a) {}
            ),
            $html.addClass("popupShown popup_" + d),
            $(f).find(".content").scrollTop(0),
            (window.allowSlide = 0),
            window.popupShown || (window.popupShown = []),
            window.popupShown.push(d);
          var h = $(f),
            j = h.find("iframe"),
            k = h.find("video");
          if (j.length > 0) {
            var l = $(j).attr("src") ? $(j).attr("src") : $(j).data("src"),
              n = l.indexOf("?") > -1 ? "&" : "?";
            $(f).hasClass("autoplay")
              ? $(j).attr("src", l + n + "autoplay=1")
              : $(j).attr("src") || $(j).attr("src", l);
          } else
            k.length > 0 &&
              ($(k).find("source[data-src]").length > 0 &&
                ($(k)
                  .find("source")
                  .each(function () {
                    $(this).attr("src") ||
                      $(this).attr("src", $(this).data("src"));
                  }),
                $(k)[0].load()),
              $(f).hasClass("autoplay") && $(k)[0].play());
        }
        m();
      }),
      window.hidePopupOnBodyClick)
    ) {
      var B = !1;
      $(document).on("mousedown", function (a) {
        B = !!$(a.target).closest(
          ".popupShown .popup .popupContent, .popupTrigger"
        ).length;
      }),
        $(document).on("click", function (a) {
          var b = $(".popupShown .popup .popupContent, .popupTrigger");
          !b.is(a.target) &&
            0 === b.has(a.target).length &&
            b.length > 0 &&
            !B &&
            j();
        });
    }
    $('.popup [data-popup-action="close"]').on("click", function () {
      j($(this).parents(".popup").data("popup-id"));
    }),
      window.setPopupHash &&
        ($(".popupTrigger[data-popup-id]").on("click", function () {
          var a = $(this).attr("data-popup-id");
          window.location.hash = "#" + a;
        }),
        (window.setPopupHash = []),
        $(".popupTrigger").each(function () {
          var a = $(this).attr("data-popup-id");
          $.inArray(a, window.setPopupHash) == -1 &&
            window.setPopupHash.push(a);
        }),
        $.inArray(window.location.hash.split("#")[1], window.setPopupHash) !==
          -1 &&
          setTimeout(function () {
            $(
              '.popupTrigger[data-popup-id="' +
                window.location.hash.split("#")[1] +
                '"]'
            ).click();
          }, 500),
        $(window).on("popupHidden", function () {
          history.pushState
            ? window.history.pushState("", "", location.href.split("#")[0])
            : (window.location.hash = "");
        })),
      $(window).on("resize load ready popupShown", function () {
        setTimeout(function () {
          k();
        }, 1);
      }),
      $(window)
        .on("resize", function () {
          $html.addClass("resizing");
        })
        .on("resizeEnd", function () {
          $html.removeClass("resizing");
        });
    var C = $(".slider");
    $(C).length > 0 &&
      $(C).each(function (a, b) {
        var c = $(b),
          d = c.data("slider-id"),
          e = c.find(".selected").index();
        if (
          (window.sliderStatus &&
            $html
              .removeClassByPrefix("slider_" + d)
              .addClass("slider_" + d + "_" + e),
          c.hasClass("autoplay"))
        ) {
          var f = c.data("slider-interval")
              ? parseInt(c.data("slider-interval"))
              : 5e3,
            g = setInterval(function () {
              c.trigger("next");
            }, f);
          0 != c.data("slider-stoponclick") &&
            $('[data-slider-id="' + d + '"]').on(
              "mousedown touchstart",
              function () {
                clearInterval(g);
              }
            );
        }
        if (
          ((c.hasClass("clickable") ||
            c.hasClass("autoplay") ||
            c.hasClass("swipeable")) &&
            (c.on("next", function (a) {
              var b = $(this),
                c = b.data("slider-id"),
                d = $('.slider[data-slider-id="' + c + '"]'),
                f = a.target;
              "cancel" != $(f).data("slider-event") &&
                (d.each(function () {
                  var a = $(this),
                    b = a.data("slider-id"),
                    c = a.children(".selected"),
                    d = c.nextOrFirst("li"),
                    e = d.index(),
                    f = $('.controller[data-slider-id="' + b + '"]'),
                    g = a.is(".animated, .animateOnEvent");
                  c
                    .removeClass("selected")
                    .addClass("hide")
                    .one(
                      "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
                      function () {
                        $(this).removeClass("hide");
                      }
                    ),
                    d.removeClass("hide").addClass("selected"),
                    window.sliderStatus &&
                      $html
                        .removeClassByPrefix("slider_" + b)
                        .addClass("slider_" + b + "_" + e),
                    g &&
                      (a.addClass("animateOnEvent"),
                      a.find("li").removeClassByPrefix("ae-").removeClass("do"),
                      a.find(".selected").each(function (a) {
                        $(this)
                          .removeClassByPrefix("ae-")
                          .removeClass("do")
                          .addClass("ae-" + (a + 1))
                          .addClass("do");
                      }),
                      $(window).scroll()),
                    b &&
                      f.length > 0 &&
                      f.each(function () {
                        var a = $(this);
                        a.children(".selected").removeClass("selected"),
                          a.children("li:eq(" + e + ")").addClass("selected");
                      });
                }),
                window.sliderStatus &&
                  $html
                    .removeClassByPrefix("slider_" + c)
                    .addClass("slider_" + c + "_" + e));
            }),
            c.on("prev", function (a) {
              var b = $(this),
                c = b.data("slider-id"),
                d = $('.slider[data-slider-id="' + c + '"]'),
                f = a.target;
              "cancel" != $(f).data("slider-event") &&
                (d.each(function () {
                  var a = $(this),
                    b = a.data("slider-id"),
                    c = a.children(".selected"),
                    d = c.prevOrLast("li"),
                    e = d.index(),
                    f = $('.controller[data-slider-id="' + b + '"]'),
                    g = a.is(".animated, .animateOnEvent");
                  c
                    .removeClass("selected")
                    .addClass("hide")
                    .one(
                      "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
                      function () {
                        $(this).removeClass("hide");
                      }
                    ),
                    d.removeClass("hide").addClass("selected"),
                    window.sliderStatus &&
                      $html
                        .removeClassByPrefix("slider_" + b)
                        .addClass("slider_" + b + "_" + e),
                    g &&
                      (a.addClass("animateOnEvent"),
                      a.find("li").removeClassByPrefix("ae-").removeClass("do"),
                      a.find(".selected").each(function (a) {
                        $(this)
                          .removeClassByPrefix("ae-")
                          .removeClass("do")
                          .addClass("ae-" + (a + 1))
                          .addClass("do");
                      }),
                      $(window).scroll()),
                    b &&
                      f.length > 0 &&
                      f.each(function () {
                        var a = $(this);
                        a.children(".selected").removeClass("selected"),
                          a.children("li:eq(" + e + ")").addClass("selected");
                      });
                }),
                window.sliderStatus &&
                  $html
                    .removeClassByPrefix("slider_" + c)
                    .addClass("slider_" + c + "_" + e));
            }),
            (c.hasClass("clickable") || c.hasClass("autoplay")) &&
              c.on("click", function () {
                $(this).trigger("next");
              })),
          c.hasClass("swipeable"))
        ) {
          var h = 50;
          c.swipe({
            swipeStatus: function (a, b, d, e) {
              "end" == b &&
                e > h &&
                ("right" == d && c.trigger("prev"),
                "left" == d && c.trigger("next"));
            },
            maxTimeThreshold: 0,
            fingers: "all",
          });
        }
      });
    var D = $(".controller");
    if (D.length > 0) {
      var E = D.data("controller-selector")
        ? D.data("controller-selector")
        : "li";
      D.on("click", E, function () {
        var a = $(this),
          b = a.closest(".controller"),
          c = $(b.find(E)).index(a),
          d = b.data("slider-id"),
          e = $('.slider[data-slider-id="' + d + '"]'),
          f = $('.controller[data-slider-id="' + d + '"]');
        a.hasClass("selected") ||
          (f.each(function () {
            var a = $(this);
            a.children(".selected").removeClass("selected"),
              a.children("li:eq(" + c + ")").addClass("selected");
          }),
          e.each(function () {
            var a = $(this),
              b = a.hasClass("animated");
            a
              .children(".selected")
              .removeClass("selected")
              .addClass("hide")
              .one(
                "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
                function () {
                  $(this).removeClass("hide");
                }
              ),
              a.children("li").eq(c).removeClass("hide").addClass("selected"),
              b &&
                (a.addClass("animateOnEvent"),
                a.find(">li").removeClassByPrefix("ae-").removeClass("do"),
                a.find(".selected").each(function (a) {
                  $(this)
                    .removeClassByPrefix("ae-")
                    .removeClass("do")
                    .addClass("ae-" + (a + 1))
                    .addClass("do");
                }),
                $(window).scroll());
          }),
          window.sliderStatus &&
            $html
              .removeClassByPrefix("slider_" + sliderID)
              .addClass("slider_" + sliderID + "_" + c));
      });
    }
    $(document).on("click", "[data-slider-action]", function () {
      if ($(this).data("slider-id")) {
        var a,
          b,
          c = $(this),
          d = c.data("slider-id"),
          e = c.data("slider-action"),
          f = $('.slider[data-slider-id="' + d + '"]'),
          g = $('.controller[data-slider-id="' + d + '"]');
        window.sliderStatus &&
          $html
            .removeClassByPrefix("slider_" + d)
            .addClass("slider_" + d + "_" + b),
          f.each(function () {
            var c = $(this),
              d =
                (g.data("controller-selector")
                  ? g.data("controller-selector")
                  : "li",
                c.find(".selected")),
              f = c.hasClass("animated");
            "next" === e
              ? (a = d.nextOrFirst("li"))
              : "prev" === e
              ? (a = d.prevOrLast("li"))
              : (parseInt(e) || 0 === e) &&
                ((b = parseInt(e)), (a = c.find(">li:eq(" + b + ")"))),
              (b = a.index()),
              d.removeClass("selected"),
              a.removeClass("hide").addClass("selected"),
              f &&
                (c.addClass("animateOnEvent"),
                c.find("li").removeClassByPrefix("ae-").removeClass("do"),
                c.find(".selected").each(function (a) {
                  $(this)
                    .removeClassByPrefix("ae-")
                    .removeClass("do")
                    .addClass("ae-" + (a + 1))
                    .addClass("do");
                }),
                $(window).scroll());
          }),
          g.each(function () {
            var a = $(this);
            d &&
              a.length > 0 &&
              (a
                .find(".selected")
                .removeClass("selected")
                .addClass("hide")
                .one(
                  "webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
                  function () {
                    c.removeClass("hide");
                  }
                ),
              a.find(E).eq(b).addClass("selected"));
          });
      }
    }),
      $("[data-slider-id].autoHeight").each(function (a, b) {
        $(window).on("click resize load ready next", function () {
          var a = 0;
          $(b).find(".selected");
          $(b)
            .find(".selected")
            .children()
            .each(function () {
              a += Math.round($(this).outerHeight(!0));
            }),
            $(b).height(a + "px");
        });
      }),
      $(".slider.clickable[data-slider-id], .controller[data-slider-id]").on(
        "click",
        function (a) {
          "cancel" != $(a.target).data("slider-event") && $(window).resize();
        }
      ),
      (window.dropdownShown = !1),
      (window.dropdownInterval = !1),
      $("body").on("click", ".dropdownTrigger", function () {
        l($(this));
      }),
      $(".dropdownTrigger.hover").hover(function () {
        l($(this), "hover");
      }),
      $(window).on("resize", function () {
        m();
      }),
      $(document).on("mouseup touchstart", function (a) {
        var b = $(".dropdownShown .dropdown");
        !b.is(a.target) &&
          0 === b.has(a.target).length &&
          window.dropdownShown &&
          m();
      }),
      (window.shareUrl = window.location.href),
      $(".share").data("url") && (window.shareUrl = $(".dropdown").data("url")),
      (window.shareText = document.title),
      $(".share").data("text") &&
        (window.shareText = $(".dropdown").data("url")),
      $(".share").sharrre({
        enableHover: !1,
        url: window.shareUrl,
        text: window.shareText,
        enableCounter: !1,
        share: {
          twitter: !0,
          facebook: !0,
          pinterest: !0,
          googlePlus: !0,
          stumbleupon: !0,
          linkedin: !0,
        },
        buttons: {
          pinterest: {
            media: $(".dropdown").data("pinterest-image"),
            description:
              $(".dropdown").data("text") + " " + $(".dropdown").data("url"),
          },
        },
        template: $(".share").html(),
        render: function (a) {
          $(a.element).on("click touchstart", ".social-twitter", function () {
            a.openPopup("twitter");
          }),
            $(a.element).on(
              "click touchstart",
              ".social-facebook",
              function () {
                a.openPopup("facebook");
              }
            ),
            $(a.element).on(
              "click touchstart",
              ".social-pinterest",
              function () {
                a.openPopup("pinterest");
              }
            ),
            $(a.element).on(
              "click touchstart",
              ".social-googlePlus",
              function () {
                a.openPopup("googlePlus");
              }
            ),
            $(a.element).on(
              "click touchstart",
              ".social-stumbleupon",
              function () {
                a.openPopup("stumbleupon");
              }
            ),
            $(a.element).on(
              "click touchstart",
              ".social-linkedin",
              function () {
                a.openPopup("linkedin");
              }
            ),
            $(a.element).on("click touchstart", ".mail", function () {
              var a = $(this).data("subject") ? $(this).data("subject") : "",
                b = $(this).data("body") ? $(this).data("body") : "",
                c = $(".dropdown").data("url")
                  ? $(".dropdown").data("url")
                  : window.location.href;
              window.location.href =
                "mailto:?subject=" +
                encodeURIComponent(a) +
                "&body=" +
                encodeURIComponent(b) +
                "%20" +
                c;
            });
        },
      }),
      $(".dialogTrigger[data-dialog-id]").on("click", function () {
        var a = $(this).data("dialog-id");
        window.showDialog(a);
      }),
      (window.showDialog = function (a) {
        var b = a,
          c = $('.dialog[data-dialog-id="' + b + '"]');
        c.is(":visible") ||
          c.addClass("reveal").slideDown(500, function () {
            $(this).removeClass("reveal").removeClass("hidden");
          });
      }),
      $(
        '.dialog [data-dialog-action="close"], .dialog [data-dialog-action="hide"]'
      ).on("click", function () {
        var a = $(this).parents(".dialog"),
          b = $(this).data("dialog-action"),
          c = a.data("dialog-id"),
          d = a.data("set-cookie"),
          e = a.data("cookie-name") ? a.data("cookie-name") : c,
          f = !a.data("cookie-value") || a.data("cookie-value"),
          g = a.data("cookie-path");
        a.addClass("hide").slideUp(500, function () {
          $(this).removeClass("hide"),
            d && "close" == b && $.cookie(e, f, { expires: d, path: g });
        });
      }),
      $(".dialog[data-set-cookie]").each(function (a, b) {
        var c = $(b).data("dialog-id"),
          d = $(b).data("cookie-name") ? $(b).data("cookie-name") : c;
        !$(b).data("cookie-value") || $(b).data("cookie-value");
        $.cookie(d) && $(b).hide();
      }),
      $(".dialog [data-href]").on("click", function () {
        $(this).data("target")
          ? window.open($(this).data("href"), "_blank")
          : (window.location = $(this).data("href"));
      }),
      $(".dialog.hidden[data-dialog-delay]").each(function () {
        var a = parseFloat($(this).attr("data-dialog-delay")),
          b = $(this),
          c = b.attr("data-set-cookie");
        if (c) {
          var d = b.data("dialog-id"),
            e = b.data("cookie-name") ? b.data("cookie-name") : d;
          c = !!$.cookie(e);
        }
        isNaN(a) ||
          c ||
          setTimeout(function () {
            b.addClass("reveal").slideDown(500, function () {
              $(this).removeClass("reveal").removeClass("hidden");
            });
          }, a);
      }),
      $(".dialog[data-dialog-hide-delay]").each(function () {
        var a = parseFloat($(this).attr("data-dialog-hide-delay")),
          b = $(this);
        isNaN(a) ||
          setTimeout(function () {
            b.addClass("hide").slideUp(500, function () {
              $(this).removeClass("hide");
            });
          }, a);
      }),
      $('.dialog [data-type="submit"]').click(function () {
        $(this).parents("form").submit();
      }),
      $("#contact-form, [data-ajax-form]").each(function (a, b) {
        $(b).ajaxForm(function () {
          var a = $(b),
            c = $(b).find('[type="submit"]'),
            d = !!c.is("input"),
            e = c.data("success-text") ? c.data("success-text") : "Done!",
            f = c.data("success-class") ? c.data("success-class") : "green",
            g = d ? c.val() : c.html(),
            h = c.attr("class");
          d ? c.val(e) : c.text(e),
            c.addClass(f),
            setTimeout(function () {
              d ? c.val(g) : c.html(g), c.attr("class", h), a[0].reset();
            }, 4e3);
        });
      }),
      $("audio[data-sound-id]").each(function (a, b) {
        var c = $(b),
          d = c.data("sound-id"),
          e = c[0],
          f = $('.soundTrigger[data-sound-id="' + d + '"]');
        e.autoplay ? f.addClass("playing") : f.removeClass("playing");
      }),
      $(".soundTrigger").click(function () {
        var a = $(this).data("sound-id"),
          b = $('audio[data-sound-id="' + a + '"]'),
          c = b.data("sound-action") ? b.data("sound-action") : "toggle",
          d =
            parseInt(b.data("sound-fade")) >= 0 || b.data("sound-fade")
              ? parseInt(b.data("sound-fade"))
              : 500;
        !b[0].paused || ("toggle" !== c && "play" !== c)
          ? ("toggle" !== c && "pause" !== c) ||
            (b.animate({ volume: 0 }, d, function () {
              b[0].pause();
            }),
            $(this).removeClass("playing"))
          : (b[0].play(),
            b.animate({ volume: 1 }, d),
            $(this).addClass("playing"));
      });
  }),
  (window.isMobile = !1),
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  ) && (window.isMobile = !0),
  (window.isFirefox =
    navigator.userAgent.toLowerCase().indexOf("firefox") > -1),
  (window.isSafari = /^((?!chrome).)*safari/i.test(navigator.userAgent)),
  (window.isChrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase())),
  (window.isChromeiOS = navigator.userAgent.match("CriOS")),
  (window.isMSIE = navigator.userAgent.match("MSIE")),
  (window.isEdge = navigator.userAgent.match("Edge")),
  (window.isAndroid =
    navigator.userAgent.toLowerCase().indexOf("android") > -1),
  (window.isiPad = null !== navigator.userAgent.match(/iPad/i)),
  (window.isWindows = navigator.platform.toUpperCase().indexOf("WIN") !== -1),
  (window.isOSX = navigator.platform.toUpperCase().indexOf("MAC") !== -1),
  (window.isLinux = navigator.platform.toUpperCase().indexOf("LINUX") !== -1),
  window.isOSX && navigator.maxTouchPoints && (window.isMobile = !0),
  window.isSafari && $html.addClass("safari"),
  window.isFirefox && $html.addClass("firefox"),
  window.isChrome && $html.addClass("chrome"),
  window.isMSIE && $html.addClass("msie"),
  window.isEdge && $html.addClass("edge"),
  window.isAndroid && $html.addClass("android"),
  window.isWindows && $html.addClass("windows"),
  window.isOSX && $html.addClass("osx"),
  window.isLinux && $html.addClass("linux"),
  window.isMobile ? $html.addClass("mobile") : $html.addClass("desktop"),
  (window.isRetina =
    (window.matchMedia &&
      (window.matchMedia(
        "only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)"
      ).matches ||
        window.matchMedia(
          "only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)"
        ).matches)) ||
    (window.devicePixelRatio && window.devicePixelRatio > 1.3)),
  window.isRetina && $html.addClass("retina");
