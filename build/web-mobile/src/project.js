window.__require = function t(e, i, o) {
    function n(a, s) {
        if (!i[a]) {
            if (!e[a]) {
                var h = a.split("/");
                if (h = h[h.length - 1], !e[h]) {
                    var d = "function" == typeof __require && __require;
                    if (!s && d) return d(h, !0);
                    if (r) return r(h, !0);
                    throw new Error("Cannot find module '" + a + "'")
                }
            }
            var c = i[a] = {
                exports: {}
            };
            e[a][0].call(c.exports, function(t) {
                return n(e[a][1][t] || t)
            }, c, c.exports, t, e, i, o)
        }
        return i[a].exports
    }
    for (var r = "function" == typeof __require && __require, a = 0; a < o.length; a++) n(o[a]);
    return n
}({
    AStarRoadSeeker: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "a3a193EdkVIWoDgtJ/bBisA", "AStarRoadSeeker"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = function() {
            function t(t) {
                this.COST_STRAIGHT = 10, this.COST_DIAGONAL = 14, this.maxStep = 1e3, this._round = [
                    [0, -1],
                    [1, -1],
                    [1, 0],
                    [1, 1],
                    [0, 1],
                    [-1, 1],
                    [-1, 0],
                    [-1, -1]
                ], this.handle = -1, this.optimize = !0, this._roadNodes = t
            }
            return t.prototype.seekPath = function(t, e) {
                if (this._startNode = t, this._currentNode = t, this._targetNode = e, !this._startNode || !this._targetNode) return [];
                if (1 == this._targetNode.value) return console.log("\u76ee\u6807\u4e0d\u53ef\u8fbe\u5230\uff1a"), [];
                this._openlist = [], this._closelist = [];
                for (var i = 0;;) {
                    if (i > this.maxStep) return console.log("\u6ca1\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", i), [];
                    if (i++, this.searchRoundNodes(this._currentNode), 0 == this._openlist.length) return console.log("\u6ca1\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", i), [];
                    if (this._openlist.sort(this.sortNode), this._currentNode = this._openlist.shift(), this._currentNode == this._targetNode) return console.log("\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", i), this.getPath();
                    this._closelist.push(this._currentNode)
                }
                return []
            }, t.prototype.seekPath2 = function(t, e) {
                if (this._startNode = t, this._currentNode = t, this._targetNode = e, !this._startNode || !this._targetNode) return [];
                this._openlist = [], this._closelist = [];
                for (var i = 0, o = null;;) {
                    if (i > this.maxStep) return console.log("\u6ca1\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", i), this.seekPath(t, o);
                    if (i++, this.searchRoundNodes(this._currentNode), 0 == this._openlist.length) return console.log("\u6ca1\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", i), this.seekPath(t, o);
                    if (this._openlist.sort(this.sortNode), this._currentNode = this._openlist.shift(), null == o ? o = this._currentNode : this._currentNode.h < o.h && (o = this._currentNode), this._currentNode == this._targetNode) return console.log("\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", i), this.getPath();
                    this._closelist.push(this._currentNode)
                }
                return this.seekPath(t, o)
            }, t.prototype.sortNode = function(t, e) {
                return t.f < e.f ? -1 : t.f > e.f ? 1 : 0
            }, t.prototype.getPath = function() {
                for (var t = [], e = this._targetNode; e != this._startNode;) t.unshift(e), e = e.parent;
                if (t.unshift(this._startNode), !this.optimize) return t;
                for (var i = 1; i < t.length - 1; i++) {
                    var o = t[i - 1],
                        n = t[i],
                        r = t[i + 1],
                        a = n.cx == o.cx && n.cx == r.cx,
                        s = n.cy == o.cy && n.cy == r.cy,
                        h = (n.cx - o.cx) / (n.cy - o.cy) * ((r.cx - n.cx) / (r.cy - n.cy)) == 1;
                    (a || s || h) && (t.splice(i, 1), i--)
                }
                for (i = 0; i < t.length - 2; i++) {
                    for (var d = t[i], c = null, p = t.length - 1; p > i + 1; p--) {
                        var l = t[p];
                        if (d.cx != l.cx && d.cy != l.cy && Math.abs(l.cx - d.cx) != Math.abs(l.cy - d.cy) && this.isArriveBetweenTwoNodes(d, l)) {
                            c = l;
                            break
                        }
                    }
                    if (c) {
                        var u = p - i - 1;
                        t.splice(i + 1, u)
                    }
                }
                return t
            }, t.prototype.isArriveBetweenTwoNodes = function(t, e) {
                if (t == e) return !1;
                var i = Math.abs(e.cx - t.cx),
                    o = Math.abs(e.cy - t.cy),
                    n = 0;
                e.cx > t.cx ? n = 1 : e.cx < t.cx && (n = -1);
                var r = 0;
                e.cy > t.cy ? r = 1 : e.cy < t.cy && (r = -1);
                var a = 0,
                    s = 0,
                    h = 0,
                    d = 0;
                if (i > o)
                    for (var c = o / i, p = 0; p < i; p++) {
                        s = t.cy + p * r * c, h = Math.floor(s), d = s % 1;
                        var l = t.cx + p * n,
                            u = d <= .5 ? h : h + 1;
                        s = t.cy + (p + 1) * r * c, h = Math.floor(s), d = s % 1;
                        var y = t.cx + (p + 1) * n,
                            _ = d <= .5 ? h : h + 1,
                            f = this._roadNodes[l + "_" + u],
                            g = this._roadNodes[y + "_" + _];
                        if (!this.isCrossAtAdjacentNodes(f, g)) return !1
                    } else
                        for (c = i / o, p = 0; p < o; p++) {
                            a = p * n * c, h = n > 0 ? Math.floor(t.cx + a) : Math.ceil(t.cx + a);
                            l = (d = Math.abs(a % 1)) <= .5 ? h : h + 1 * n, u = t.cy + p * r;
                            a = (p + 1) * n * c, h = n > 0 ? Math.floor(t.cx + a) : Math.ceil(t.cx + a);
                            y = (d = Math.abs(a % 1)) <= .5 ? h : h + 1 * n, _ = t.cy + (p + 1) * r, f = this._roadNodes[l + "_" + u], g = this._roadNodes[y + "_" + _];
                            if (!this.isCrossAtAdjacentNodes(f, g)) return !1
                        }
                return !0
            }, t.prototype.isCrossAtAdjacentNodes = function(t, e) {
                if (t == e) return !1;
                if (!this.isPassNode(t) || !this.isPassNode(e)) return !1;
                var i = e.cx - t.cx,
                    o = e.cy - t.cy;
                return !(Math.abs(i) > 1 || Math.abs(o) > 1) && (t.cx == e.cx || t.cy == e.cy || !(!this.isPassNode(this._roadNodes[t.cx + "_" + (t.cy + o)]) || !this.isPassNode(this._roadNodes[t.cx + i + "_" + t.cy])))
            }, t.prototype.isPassNode = function(t) {
                return !(!t || 1 == t.value)
            }, t.prototype.testSeekPathStep = function(t, e, i, o, n) {
                var r = this;
                if (void 0 === n && (n = 100), this._startNode = t, this._currentNode = t, this._targetNode = e, 1 != this._targetNode.value) {
                    this._openlist = [], this._closelist = [];
                    var a = 0;
                    clearInterval(this.handle), this.handle = setInterval(function() {
                        return a > r.maxStep ? (console.log("\u6ca1\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", a), void clearInterval(r.handle)) : (a++, r.searchRoundNodes(r._currentNode), 0 == r._openlist.length ? (console.log("\u6ca1\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", a), void clearInterval(r.handle)) : (r._openlist.sort(r.sortNode), r._currentNode = r._openlist.shift(), void(r._currentNode == r._targetNode ? (console.log("\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", a), clearInterval(r.handle), i.apply(o, [r._startNode, r._targetNode, r._currentNode, r._openlist, r._closelist, r.getPath()])) : (r._closelist.push(r._currentNode), i.apply(o, [r._startNode, r._targetNode, r._currentNode, r._openlist, r._closelist, null])))))
                    }, n)
                }
            }, t.prototype.searchRoundNodes = function(t) {
                for (var e = 0; e < this._round.length; e++) {
                    var i = t.cx + this._round[e][0],
                        o = t.cy + this._round[e][1],
                        n = this._roadNodes[i + "_" + o];
                    null == n || n == this._startNode || 1 == n.value || this.isInCloseList(n) || this.inInCorner(n) || this.setNodeF(n)
                }
            }, t.prototype.setNodeF = function(t) {
                var e;
                if (e = t.cx == this._currentNode.cx || t.cy == this._currentNode.cy ? this._currentNode.g + this.COST_STRAIGHT : this._currentNode.g + this.COST_DIAGONAL, this.isInOpenList(t)) {
                    if (!(e < t.g)) return;
                    t.g = e
                } else t.g = e, this._openlist.push(t);
                t.parent = this._currentNode, t.h = (Math.abs(this._targetNode.cx - t.cx) + Math.abs(this._targetNode.cy - t.cy)) * this.COST_STRAIGHT, t.f = t.g + t.h
            }, t.prototype.isInOpenList = function(t) {
                return -1 != this._openlist.indexOf(t)
            }, t.prototype.isInCloseList = function(t) {
                return -1 != this._closelist.indexOf(t)
            }, t.prototype.inInCorner = function(t) {
                if (t.cx == this._currentNode.cx || t.cy == this._currentNode.cy) return !1;
                var e = this._roadNodes[this._currentNode.cx + "_" + t.cy],
                    i = this._roadNodes[t.cx + "_" + this._currentNode.cy];
                return !this.isPassNode(e) || !this.isPassNode(i)
            }, t.prototype.dispose = function() {
                this._roadNodes = null, this._round = null
            }, t
        }();
        i.default = o, cc._RF.pop()
    }, {}],
    AstarHoneycombRoadSeeker: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "470f8oyv3xHR719BwQrvDie", "AstarHoneycombRoadSeeker"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = function() {
            function t(t) {
                this.COST_STRAIGHT = 10, this.COST_DIAGONAL = 10, this.maxStep = 1e3, this._round1 = [
                    [0, -1],
                    [1, -1],
                    [1, 0],
                    [0, 1],
                    [-1, 0],
                    [-1, -1]
                ], this._round2 = [
                    [0, -1],
                    [1, 0],
                    [1, 1],
                    [0, 1],
                    [-1, 1],
                    [-1, 0]
                ], this.handle = -1, this.optimize = !0, this._roadNodes = t
            }
            return t.prototype.seekPath = function(t, e) {
                if (this._startNode = t, this._currentNode = t, this._targetNode = e, !this._startNode || !this._targetNode) return [];
                if (1 == this._targetNode.value) return console.log("\u76ee\u6807\u4e0d\u53ef\u8fbe\u5230\uff1a"), [];
                this._openlist = [], this._closelist = [];
                for (var i = 0;;) {
                    if (i > this.maxStep) return console.log("\u6ca1\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", i), [];
                    if (i++, this.searchRoundNodes(this._currentNode), 0 == this._openlist.length) return console.log("\u6ca1\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", i), [];
                    if (this._openlist.sort(this.sortNode), this._currentNode = this._openlist.shift(), this._currentNode == this._targetNode) return console.log("\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", i), this.getPath();
                    this._closelist.push(this._currentNode)
                }
                return []
            }, t.prototype.seekPath2 = function(t, e) {
                if (this._startNode = t, this._currentNode = t, this._targetNode = e, !this._startNode || !this._targetNode) return [];
                this._openlist = [], this._closelist = [];
                for (var i = 0, o = null;;) {
                    if (i > this.maxStep) return console.log("\u6ca1\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", i), this.seekPath(t, o);
                    if (i++, this.searchRoundNodes(this._currentNode), 0 == this._openlist.length) return console.log("\u6ca1\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", i), this.seekPath(t, o);
                    if (this._openlist.sort(this.sortNode), this._currentNode = this._openlist.shift(), null == o ? o = this._currentNode : this._currentNode.h < o.h && (o = this._currentNode), this._currentNode == this._targetNode) return console.log("\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", i), this.getPath();
                    this._closelist.push(this._currentNode)
                }
                return this.seekPath(t, o)
            }, t.prototype.sortNode = function(t, e) {
                return t.f < e.f ? -1 : t.f > e.f ? 1 : 0
            }, t.prototype.getPath = function() {
                for (var t, e, i, o, n, r, a = [], s = this._targetNode; s != this._startNode;) a.unshift(s), s = s.parent;
                if (a.unshift(this._startNode), !this.optimize) return a;
                for (l = 1; l < a.length - 1; l++) {
                    t = a[l - 1], e = a[l], i = a[l + 1], o = this.getHoneyPoint(t), n = this.getHoneyPoint(e), r = this.getHoneyPoint(i);
                    var h = e.cx == t.cx && e.cx == i.cx,
                        d = e.cy == t.cy && e.cy == i.cy && t.cx % 2 == e.cx % 2 && e.cx % 2 == i.cx % 2,
                        c = o.hx == n.hx && n.hx == r.hx,
                        p = o.hy == n.hy && n.hy == r.hy;
                    (h || d || c || p) && (a.splice(l, 1), l--)
                }
                for (var l = 0; l < a.length - 2; l++) {
                    for (var u = a[l], y = null, _ = a.length - 1; _ > l + 1; _--) {
                        var f = a[_];
                        if (this.isArriveBetweenTwoNodes(this.getHoneyPoint(u), this.getHoneyPoint(f))) {
                            y = f;
                            break
                        }
                    }
                    if (y) {
                        var g = _ - l - 1;
                        a.splice(l + 1, g)
                    }
                }
                return a
            }, t.prototype.isArriveBetweenTwoNodes = function(t, e) {
                if (t.hx == e.hx && t.hy == e.hy) return !1;
                var i = Math.abs(e.hx - t.hx),
                    o = Math.abs(e.hy - t.hy),
                    r = 0;
                e.hx > t.hx ? r = 1 : e.hx < t.hx && (r = -1);
                var a = 0;
                e.hy > t.hy ? a = 1 : e.hy < t.hy && (a = -1);
                var s = 0,
                    h = 0,
                    d = 0,
                    c = 0;
                if (i > o)
                    for (var p = o / i, l = 0; l < i; l += 2) {
                        if (h = l * a * p, d = a > 0 ? Math.floor(t.hy + h) : Math.ceil(t.hy + h), c = Math.abs(h % 1), (u = new n).hx = t.hx + l * r, u.hy = c <= .5 ? d : d + 1 * a, h = (l + 1) * a * p, d = a > 0 ? Math.floor(t.hy + h) : Math.ceil(t.hy + h), c = Math.abs(h % 1), (y = new n).hx = t.hx + (l + 1) * r, y.hy = c <= .5 ? d : d + 1 * a, h = (l + 2) * a * p, d = a > 0 ? Math.floor(t.hy + h) : Math.ceil(t.hy + h), c = Math.abs(h % 1), (_ = new n).hx = t.hx + (l + 2) * r, _.hy = c <= .5 ? d : d + 1 * a, !this.isCrossAtAdjacentNodes(t, e, u, y, _)) return !1
                    } else
                        for (p = i / o, l = 0; l < o; l += 2) {
                            var u, y, _;
                            if (s = l * r * p, d = r > 0 ? Math.floor(t.hx + s) : Math.ceil(t.hx + s), c = Math.abs(s % 1), (u = new n).hx = c <= .5 ? d : d + 1 * r, u.hy = t.hy + l * a, s = (l + 1) * r * p, d = r > 0 ? Math.floor(t.hx + s) : Math.ceil(t.hx + s), c = Math.abs(s % 1), (y = new n).hx = c <= .5 ? d : d + 1 * r, y.hy = t.hy + (l + 1) * a, s = (l + 2) * r * p, d = r > 0 ? Math.floor(t.hx + s) : Math.ceil(t.hx + s), c = Math.abs(s % 1), (_ = new n).hx = c <= .5 ? d : d + 1 * r, _.hy = t.hy + (l + 2) * a, !this.isCrossAtAdjacentNodes(t, e, u, y, _)) return !1
                        }
                return !0
            }, t.prototype.isCrossAtAdjacentNodes = function(t, e, i, o, n) {
                var r = this.getNodeByHoneyPoint(i.hx, i.hy),
                    a = this.getNodeByHoneyPoint(o.hx, o.hy);
                this.getNodeByHoneyPoint(n.hx, n.hy);
                if (r == a) return !1;
                if (!this.isPassNode(r) || !this.isPassNode(a)) return !1;
                var s = i.hx - o.hx,
                    h = i.hy - o.hy,
                    d = n.hx - o.hx,
                    c = n.hy - o.hy;
                if (Math.abs(s) > 1 || Math.abs(h) > 1 || Math.abs(d) > 1 || Math.abs(c) > 1) return !1;
                if (s == -h)
                    if (-1 == s) {
                        if (!this.isPassNode(this.getNodeByHoneyPoint(o.hx - 1, o.hy)) || !this.isPassNode(this.getNodeByHoneyPoint(o.hx, o.hy + 1))) return !1
                    } else if (!this.isPassNode(this.getNodeByHoneyPoint(o.hx + 1, o.hy)) || !this.isPassNode(this.getNodeByHoneyPoint(o.hx, o.hy - 1))) return !1;
                if (o.hx == e.hx && o.hy == e.hy) return !0;
                if (d == -c)
                    if (-1 == d) {
                        if (!this.isPassNode(this.getNodeByHoneyPoint(o.hx - 1, o.hy)) || !this.isPassNode(this.getNodeByHoneyPoint(o.hx, o.hy + 1))) return !1
                    } else if (!this.isPassNode(this.getNodeByHoneyPoint(o.hx + 1, o.hy)) || !this.isPassNode(this.getNodeByHoneyPoint(o.hx, o.hy - 1))) return !1;
                return i.hx == o.hx && o.hx == n.hx || !!this.isPassNode(this.getNodeByHoneyPoint(o.hx + (s + d), o.hy + (h + c)))
            }, t.prototype.getHoneyPoint = function(t) {
                var e = t.cy + Math.ceil(t.cx / 2),
                    i = t.cy - Math.floor(t.cx / 2);
                return new n(e, i)
            }, t.prototype.getNodeByHoneyPoint = function(t, e) {
                var i = t - e,
                    o = Math.floor((t - e) / 2) + e;
                return this._roadNodes[i + "_" + o]
            }, t.prototype.getRoundNodeByIndex = function(t, e) {
                if (!t) return null;
                var i;
                e %= 6, i = t.cx % 2 == 0 ? this._round1 : this._round2;
                var o = t.cx + i[e][0],
                    n = t.cy + i[e][1];
                return this._roadNodes[o + "_" + n]
            }, t.prototype.getRoundNodes = function(t) {
                var e;
                e = t.cx % 2 == 0 ? this._round1 : this._round2;
                for (var i = [], o = 0; o < e.length; o++) {
                    var n = t.cx + e[o][0],
                        r = t.cy + e[o][1],
                        a = this._roadNodes[n + "_" + r];
                    i.push(a)
                }
                return i
            }, t.prototype.isPassNode = function(t) {
                return !(!t || 1 == t.value)
            }, t.prototype.testSeekPathStep = function(t, e, i, o, n) {
                var r = this;
                if (void 0 === n && (n = 100), this._startNode = t, this._currentNode = t, this._targetNode = e, 1 != this._targetNode.value) {
                    this._openlist = [], this._closelist = [];
                    var a = 0;
                    clearInterval(this.handle), this.handle = setInterval(function() {
                        return a > r.maxStep ? (console.log("\u6ca1\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", a), void clearInterval(r.handle)) : (a++, r.searchRoundNodes(r._currentNode), 0 == r._openlist.length ? (console.log("\u6ca1\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", a), void clearInterval(r.handle)) : (r._openlist.sort(r.sortNode), r._currentNode = r._openlist.shift(), void(r._currentNode == r._targetNode ? (console.log("\u627e\u5230\u76ee\u6807\u8ba1\u7b97\u6b65\u9aa4\u4e3a\uff1a", a), clearInterval(r.handle), i.apply(o, [r._startNode, r._targetNode, r._currentNode, r._openlist, r._closelist, r.getPath()])) : (r._closelist.push(r._currentNode), i.apply(o, [r._startNode, r._targetNode, r._currentNode, r._openlist, r._closelist, null])))))
                    }, n)
                }
            }, t.prototype.searchRoundNodes = function(t) {
                var e;
                e = t.cx % 2 == 0 ? this._round1 : this._round2;
                for (var i = 0; i < e.length; i++) {
                    var o = t.cx + e[i][0],
                        n = t.cy + e[i][1],
                        r = this._roadNodes[o + "_" + n];
                    null == r || r == this._startNode || 1 == r.value || this.isInCloseList(r) || this.setNodeF(r)
                }
            }, t.prototype.setNodeF = function(t) {
                var e;
                if (e = t.cx == this._currentNode.cx || t.cy == this._currentNode.cy ? this._currentNode.g + this.COST_STRAIGHT : this._currentNode.g + this.COST_DIAGONAL, this.isInOpenList(t)) {
                    if (!(e < t.g)) return;
                    t.g = e
                } else t.g = e, this._openlist.push(t);
                t.parent = this._currentNode, t.h = (Math.abs(this._targetNode.cx - t.cx) + Math.abs(this._targetNode.cy - t.cy)) * this.COST_STRAIGHT, t.f = t.g + t.h
            }, t.prototype.isInOpenList = function(t) {
                return -1 != this._openlist.indexOf(t)
            }, t.prototype.isInCloseList = function(t) {
                return -1 != this._closelist.indexOf(t)
            }, t.prototype.dispose = function() {
                this._roadNodes = null, this._round1 = null, this._round2 = null
            }, t
        }();
        i.default = o;
        var n = function() {
            return function(t, e) {
                void 0 === t && (t = 0), void 0 === e && (e = 0), this.hx = 0, this.hy = 0, this.hx = t, this.hy = e
            }
        }();
        cc._RF.pop()
    }, {}],
    BaseView: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "fa0a6xU1slHuanA+q9oE3z8", "BaseView"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = cc._decorator,
            n = o.ccclass,
            r = o.property,
            a = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.canDrag = !0, e.content = null, e.title = null, e.closeBtn = null, e._startDrag = !1, e
                }
                return __extends(e, t), e.prototype.onLoad = function() {
                    var t = this;
                    this.closeBtn.on(cc.Node.EventType.TOUCH_START, function(e) {
                        t.close()
                    }, this), this.canDrag && (this.title.on(cc.Node.EventType.TOUCH_START, function(e) {
                        t._startDrag = !0
                    }, this), this.title.on(cc.Node.EventType.TOUCH_END, function(e) {
                        t._startDrag = !1
                    }, this), this.node.on(cc.Node.EventType.TOUCH_MOVE, function(e) {
                        if (t._startDrag) {
                            var i = t.node.parent.convertToNodeSpaceAR(e.getLocation()).sub(t.title.position);
                            i.x < -(cc.winSize.width - t.node.width) / 2 ? i.x = -(cc.winSize.width - t.node.width) / 2 : i.x > (cc.winSize.width - t.node.width) / 2 && (i.x = (cc.winSize.width - t.node.width) / 2), i.y < -(cc.winSize.height - t.node.height) / 2 ? i.y = -(cc.winSize.height - t.node.height) / 2 : i.y > (cc.winSize.height - t.node.height) / 2 && (i.y = (cc.winSize.height - t.node.height) / 2), t.node.position = i
                        }
                    }, this))
                }, e.prototype.start = function() {}, e.prototype.open = function() {
                    this.node.active = !0
                }, e.prototype.close = function() {
                    this.node.active = !1
                }, __decorate([r()], e.prototype, "canDrag", void 0), __decorate([r(cc.Node)], e.prototype, "content", void 0), __decorate([r(cc.Node)], e.prototype, "title", void 0), __decorate([r(cc.Node)], e.prototype, "closeBtn", void 0), e = __decorate([n], e)
            }(cc.Component);
        i.default = a, cc._RF.pop()
    }, {}],
    Charactor: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "cbc16hPLjJAiKeEPBR8m28x", "Charactor"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o, n = t("./MovieClip"),
            r = cc._decorator,
            a = r.ccclass;
        r.property;
        (function(t) {
            t[t.stand = 0] = "stand", t[t.run = 1] = "run", t[t.sitdown = 2] = "sitdown", t[t.sitdown_run = 3] = "sitdown_run"
        })(o = i.CharactorState || (i.CharactorState = {}));
        var s = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e._movieClip = null, e._direction = 0, e._state = 0, e._alpha = 1, e.sceneMap = null, e.moving = !1, e.moveSpeed = 200, e._moveAngle = 0, e._roadNodeArr = [], e._nodeIndex = 0, e
            }
            return __extends(e, t), Object.defineProperty(e.prototype, "movieClip", {
                get: function() {
                    return this._movieClip || (this._movieClip = this.getComponent(n.default)), this._movieClip
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "direction", {
                get: function() {
                    return this._direction
                },
                set: function(t) {
                    this._direction = t, t > 4 ? (this.movieClip.rowIndex = 4 - t % 4, this.node.scaleX = -1) : (this.movieClip.rowIndex = t, this.node.scaleX = 1)
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "state", {
                get: function() {
                    return this._state
                },
                set: function(t) {
                    switch (this._state = t, this._state) {
                        case o.stand:
                            this.movieClip.begin = 0, this.movieClip.end = 6;
                            break;
                        case o.run:
                            this.movieClip.begin = 6, this.movieClip.end = 12;
                            break;
                        case o.sitdown:
                            this.movieClip.begin = 12, this.movieClip.end = 18;
                            break;
                        case o.sitdown_run:
                            this.movieClip.begin = 18, this.movieClip.end = 24
                    }
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "alpha", {
                get: function() {
                    return this._alpha
                },
                set: function(t) {
                    this._alpha = t, this.node.opacity = Math.floor(t / 1 * 255)
                },
                enumerable: !0,
                configurable: !0
            }), e.prototype.start = function() {
                this.direction = 0, this.state = 3
            }, e.prototype.update = function(t) {
                if (this.moving) {
                    var e = this._roadNodeArr[this._nodeIndex],
                        i = e.px - this.node.x,
                        o = e.py - this.node.y,
                        n = this.moveSpeed * t;
                    if (i * i + o * o > n * n) {
                        if (0 == this._moveAngle) {
                            this._moveAngle = Math.atan2(o, i);
                            var r = Math.round((-this._moveAngle + Math.PI) / (Math.PI / 4));
                            this.direction = r > 5 ? r - 6 : r + 2
                        }
                        var a = Math.cos(this._moveAngle) * n,
                            s = Math.sin(this._moveAngle) * n;
                        this.node.x += a, this.node.y += s
                    } else this._moveAngle = 0, this._nodeIndex == this._roadNodeArr.length - 1 ? (this.node.x = e.px, this.node.y = e.py, this.stop()) : this.walk()
                }
                this.setPlayerStateByNode()
            }, e.prototype.setPlayerStateByNode = function() {
                var t = this.sceneMap.getMapNodeByPixel(this.node.x, this.node.y);
                if (t != this._currentNode && (this._currentNode = t, this._currentNode)) switch (this._currentNode.value) {
                    case 2:
                        .4 != this.alpha && (this.alpha = .4);
                        break;
                    case 3:
                        this.alpha > 0 && (this.alpha = 0);
                        break;
                    default:
                        this.alpha < 1 && (this.alpha = 1)
                }
            }, e.prototype.walkByRoad = function(t) {
                this._roadNodeArr = t, this._nodeIndex = 0, this._moveAngle = 0, this.walk(), this.move()
            }, e.prototype.walk = function() {
                this._nodeIndex < this._roadNodeArr.length - 1 && this._nodeIndex++
            }, e.prototype.move = function() {
                this.moving = !0, this.state = o.run
            }, e.prototype.stop = function() {
                this.moving = !1, this.state = o.stand
            }, e = __decorate([a], e)
        }(cc.Component);
        i.default = s, cc._RF.pop()
    }, {
        "./MovieClip": "MovieClip"
    }],
    EditArea: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "0d505IXUiFCEqJGZtfbVaf7", "EditArea"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../layer/MapLayer"),
            n = t("../layer/GridLayer"),
            r = t("../layer/RoadPointLayer"),
            a = t("../layer/EntityLayer"),
            s = t("../road/MapRoadUtils"),
            h = t("./MapEditor"),
            d = t("../operation/KeyBoardExecute"),
            c = t("../base/MapType"),
            p = cc._decorator,
            l = p.ccclass,
            u = p.property,
            y = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.layer = null, e.mapLayer = null, e.gridLayer = null, e.roadPointLayer = null, e.entityLayer = null, e.hScrollbar = null, e.vScrollbar = null, e._tempDic = {}, e._lastEditorNode = null, e._round = [], e._round1 = [
                        [0, -1],
                        [1, -1],
                        [1, 0],
                        [0, 1],
                        [-1, 0],
                        [-1, -1]
                    ], e._round2 = [
                        [0, -1],
                        [1, 0],
                        [1, 1],
                        [0, 1],
                        [-1, 1],
                        [-1, 0]
                    ], e._round3 = [
                        [0, -1],
                        [1, -1],
                        [1, 0],
                        [1, 1],
                        [0, 1],
                        [-1, 1],
                        [-1, 0],
                        [-1, -1]
                    ], e.mapParams = null, e
                }
                return __extends(e, t), e.prototype.start = function() {
                    this.node.on(cc.Node.EventType.MOUSE_MOVE, this.onShowRoadMsg, this), this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this), this.node.on(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this), this.node.on(cc.Node.EventType.MOUSE_LEAVE, this.onMouseUp, this), this.initScrollArea(), this.initKeyBoardFunction()
                }, e.prototype.init = function(t) {
                    this.mapParams = t, this.node.position = cc.Vec2.ZERO, this.node.width = t.mapWidth > h.default.instance.editAreaView.width ? t.mapWidth : h.default.instance.editAreaView.width, this.node.height = t.mapHeight > h.default.instance.editAreaView.height ? t.mapHeight : h.default.instance.editAreaView.height, this.mapLayer.init(h.default.instance.editAreaView.width, h.default.instance.editAreaView.height, 256, 256, t.bgTex), this.gridLayer.drawGrid(t.mapWidth, t.mapHeight, t.ceilWidth, t.ceilHeight, t.mapType)
                }, e.prototype.initMapData = function(t) {
                    this.roadPointLayer.initRoadPointInfo(t)
                }, e.prototype.clear = function() {
                    this.mapLayer.clear(), this.roadPointLayer.clear(), this.entityLayer.clear(), this.clearAllEditorAreaExecute()
                }, e.prototype.update = function(t) {
                    if (this.mapLayer.width > h.default.instance.editAreaView.width) {
                        this.hScrollbar.active = !0;
                        var e = this.hScrollbar.getChildByName("bar"),
                            i = this.mapLayer.width - h.default.instance.editAreaView.width;
                        e.width = i / this.mapLayer.width * h.default.instance.editAreaView.width;
                        var o = h.default.instance.editAreaView.width - e.width;
                        e.x = -this.node.x / i * o, e.x < 0 && (e.x = 0), e.x > o && (e.x = o)
                    } else this.hScrollbar.active = !1;
                    if (this.mapLayer.height > h.default.instance.editAreaView.height) {
                        this.vScrollbar.active = !0;
                        var n = this.vScrollbar.getChildByName("bar"),
                            r = this.mapLayer.height - h.default.instance.editAreaView.height;
                        n.height = r / this.mapLayer.height * h.default.instance.editAreaView.height;
                        var a = h.default.instance.editAreaView.height - n.height;
                        n.y = -(r + this.node.y) / r * a, n.y > 0 && (n.y = 0), n.y < -a && (n.y = -a)
                    } else this.vScrollbar.active = !1
                }, e.prototype.initScrollArea = function() {
                    var t = this;
                    this.hScrollbar.on(cc.Node.EventType.MOUSE_DOWN, function(e) {
                        t.hScrollbar.scroll = !0;
                        var i = t.hScrollbar.convertToNodeSpaceAR(e.getLocation());
                        t.setStrollX(i.x)
                    }), this.hScrollbar.on(cc.Node.EventType.MOUSE_MOVE, function(e) {
                        if (t.hScrollbar.scroll) {
                            var i = t.hScrollbar.convertToNodeSpaceAR(e.getLocation());
                            t.setStrollX(i.x)
                        }
                    }), this.hScrollbar.on(cc.Node.EventType.MOUSE_UP, function(e) {
                        t.hScrollbar.scroll = !1
                    }), this.vScrollbar.on(cc.Node.EventType.MOUSE_DOWN, function(e) {
                        t.vScrollbar.scroll = !0;
                        var i = t.vScrollbar.convertToNodeSpaceAR(e.getLocation());
                        t.setStrollY(i.y)
                    }), this.vScrollbar.on(cc.Node.EventType.MOUSE_MOVE, function(e) {
                        if (t.vScrollbar.scroll) {
                            var i = t.vScrollbar.convertToNodeSpaceAR(e.getLocation());
                            t.setStrollY(i.y)
                        }
                    }), this.vScrollbar.on(cc.Node.EventType.MOUSE_UP, function(e) {
                        t.vScrollbar.scroll = !1
                    })
                }, e.prototype.setStrollX = function(t) {
                    var e = this.mapLayer.width - h.default.instance.editAreaView.width,
                        i = t / (h.default.instance.editAreaView.width - this.hScrollbar.getChildByName("bar").width);
                    this.node.x = -i * e, this.node.x > 0 && (this.node.x = 0), this.node.x < -e && (this.node.x = -e), h.default.instance.miniMapView.refreshViewRect(-this.node.x, -this.node.y)
                }, e.prototype.setStrollY = function(t) {
                    var e = this.mapLayer.height - h.default.instance.editAreaView.height,
                        i = -t / (h.default.instance.editAreaView.height - this.hScrollbar.getChildByName("bar").height);
                    this.node.y = -(e - i * e), this.node.y > 0 && (this.node.y = 0), this.node.y < -e && (this.node.y = -e), h.default.instance.miniMapView.refreshViewRect(-this.node.x, -this.node.y)
                }, e.prototype.setMapViewToPoint = function(t, e) {
                    this.mapLayer.width <= h.default.instance.editAreaView.width ? this.node.x = 0 : t <= h.default.instance.editAreaView.width / 2 ? this.node.x = 0 : t >= this.mapLayer.width - h.default.instance.editAreaView.width / 2 ? this.node.x = -(this.mapLayer.width - h.default.instance.editAreaView.width) : this.node.x = -(t - h.default.instance.editAreaView.width / 2), this.mapLayer.height <= h.default.instance.editAreaView.height ? this.node.y = 0 : e <= h.default.instance.editAreaView.height / 2 ? this.node.y = 0 : e >= this.mapLayer.height - h.default.instance.editAreaView.height / 2 ? this.node.y = -(this.mapLayer.height - h.default.instance.editAreaView.height) : this.node.y = -(e - h.default.instance.editAreaView.height / 2);
                    var i = -this.node.x,
                        o = -this.node.y;
                    h.default.instance.miniMapView.refreshViewRect(i, o)
                }, e.prototype.initKeyBoardFunction = function() {
                    d.default.addKeyDownListener(this.addEnableNode, cc.macro.KEY.q, this), d.default.addKeyDownListener(this.addDisableNode, cc.macro.KEY.w, this), d.default.addKeyDownListener(this.addTransParentNode, cc.macro.KEY.e, this), d.default.addKeyDownListener(this.addTransferNode, cc.macro.KEY.r, this), d.default.addKeyDownListener(this.notDrawNode, cc.macro.KEY.t, this), d.default.addKeyDownListener(this.deleteNode, cc.macro.KEY.d, this), d.default.addKeyDownListener(this.clearAllEditorAreaExecute, cc.macro.KEY.s, this), d.default.addKeyDownListener(this.showMapLayer, cc.macro.KEY.u, this), d.default.addKeyDownListener(this.showRoadLayer, cc.macro.KEY.i, this), d.default.addKeyDownListener(this.showEntityLayer, cc.macro.KEY.o, this), d.default.addKeyDownListener(this.showGridLayer, cc.macro.KEY.p, this), d.default.addKeyDownListener(this.setEditRoadModel, cc.macro.KEY.n, this), d.default.addKeyDownListener(this.setNormalRoadModel, cc.macro.KEY.m, this)
                }, e.prototype.onShowRoadMsg = function(t) {
                    var e = this.node.convertToNodeSpaceAR(t.getLocation()),
                        i = s.default.instance.getNodeByPixel(e.x, e.y);
                    h.default.instance.editUI.pixelInfoTxt.string = "(" + i.px + "," + i.py + ")", h.default.instance.editUI.gridInfoTxt.string = "(" + i.dx + "," + i.dy + ")", h.default.instance.editUI.worldInfoTxt.string = "(" + i.cx + "," + i.cy + ")"
                }, e.prototype.onMouseDown = function(t) {
                    t.getButton() == cc.Event.EventMouse.BUTTON_LEFT ? (this._editorDownHandler && this._editorDownHandler.apply(this, [t]), d.default.instance.pressSpace ? (this._tempDic._editorMoveHandler = this._editorMoveHandler, this._editorMoveHandler = this.onDragMap) : this._editorMoveHandler == this.onDragMap && (this._editorMoveHandler = this._editorDownHandler)) : t.getButton() == cc.Event.EventMouse.BUTTON_RIGHT ? (this._editorRightDownHandler && this._editorRightDownHandler.apply(this, [t]), this._tempDic._editorMoveHandler = this._editorMoveHandler, this._editorMoveHandler = this.onRemoveNodeHandler) : t.getButton() == cc.Event.EventMouse.BUTTON_MIDDLE && (this._tempDic._editorMoveHandler = this._editorMoveHandler, this._editorMoveHandler = this.onDragMap), this.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this)
                }, e.prototype.onMouseMove = function(t) {
                    this._editorMoveHandler && this._editorMoveHandler.apply(this, [t])
                }, e.prototype.onMouseUp = function(t) {
                    t.getButton() == cc.Event.EventMouse.BUTTON_LEFT ? this._editorUpHandler && this._editorUpHandler.apply(this, [t]) : t.getButton() == cc.Event.EventMouse.BUTTON_RIGHT ? (this._editorRightUpHandler && this._editorRightUpHandler.apply(this, [t]), this._editorMoveHandler = this._tempDic._editorMoveHandler, this._tempDic._editorMoveHandler = null) : t.getButton() == cc.Event.EventMouse.BUTTON_MIDDLE && (this._editorMidUpHandler && this._editorMidUpHandler.apply(this, [t]), this._editorMoveHandler = this._tempDic._editorMoveHandler, this._tempDic._editorMoveHandler = null), this.node.hasEventListener(cc.Node.EventType.MOUSE_MOVE) && this.node.off(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this)
                }, e.prototype.addEnableNode = function() {
                    this._editorDownHandler = this.onAddEnableNodeHandler, this._editorMoveHandler = this.onAddEnableNodeHandler, this._editorRightDownHandler = this.onRemoveNodeHandler, this._editorUpHandler = this.clearLastEditorNode, this._editorRightUpHandler = this.clearLastEditorNode
                }, e.prototype.addDisableNode = function() {
                    this._editorDownHandler = this.onAddDisableNodeHandler, this._editorMoveHandler = this.onAddDisableNodeHandler, this._editorRightDownHandler = this.onRemoveNodeHandler, this._editorUpHandler = this.clearLastEditorNode, this._editorRightUpHandler = this.clearLastEditorNode
                }, e.prototype.addTransParentNode = function() {
                    this._editorDownHandler = this.onAddTransParentNodeHandler, this._editorMoveHandler = this.onAddTransParentNodeHandler, this._editorRightDownHandler = this.onRemoveNodeHandler, this._editorUpHandler = this.clearLastEditorNode, this._editorRightUpHandler = this.clearLastEditorNode
                }, e.prototype.addTransferNode = function() {
                    this._editorDownHandler = this.onAddTransferNodeHandler, this._editorMoveHandler = this.onAddTransferNodeHandler, this._editorRightDownHandler = this.onRemoveNodeHandler, this._editorUpHandler = this.clearLastEditorNode, this._editorRightUpHandler = this.clearLastEditorNode
                }, e.prototype.deleteNode = function() {
                    this._editorDownHandler = this.onRemoveNodeHandler, this._editorMoveHandler = this.onRemoveNodeHandler
                }, e.prototype.notDrawNode = function() {
                    this._editorDownHandler = null, this._editorMoveHandler = null
                }, e.prototype.showMapLayer = function(t) {
                    this.mapLayer.node.active = !this.mapLayer.node.active, h.default.instance.editUI.msBtn.getComponentInChildren(cc.Label).string = this.mapLayer.node.active ? "\u9690\u85cf\u5730\u56fe(U)" : "\u663e\u793a\u5730\u56fe(U)"
                }, e.prototype.showEntityLayer = function(t) {
                    this.entityLayer.node.active = !this.entityLayer.node.active, h.default.instance.editUI.esBtn.getComponentInChildren(cc.Label).string = this.entityLayer.node.active ? "\u9690\u85cf\u7269\u4f53(O)" : "\u663e\u793a\u7269\u4f53(O)"
                }, e.prototype.showRoadLayer = function(t) {
                    this.roadPointLayer.node.active = !this.roadPointLayer.node.active, h.default.instance.editUI.rsBtn.getComponentInChildren(cc.Label).string = this.roadPointLayer.node.active ? "\u9690\u85cf\u8def\u70b9(I)" : "\u663e\u793a\u8def\u70b9(I)"
                }, e.prototype.showGridLayer = function(t) {
                    this.gridLayer.node.active = !this.gridLayer.node.active, h.default.instance.editUI.gsBtn.getComponentInChildren(cc.Label).string = this.gridLayer.node.active ? "\u9690\u85cf\u7f51\u683c(P)" : "\u663e\u793a\u7f51\u683c(P)"
                }, e.prototype.showMiniMap = function(t) {
                    h.default.instance.miniMapView.open()
                }, e.prototype.setEditRoadModel = function(t) {
                    this.mapLayer.node.zIndex = 0, this.gridLayer.node.zIndex = 1, this.roadPointLayer.node.zIndex = 2, this.entityLayer.node.zIndex = 3
                }, e.prototype.setNormalRoadModel = function(t) {
                    this.mapLayer.node.zIndex = 0, this.gridLayer.node.zIndex = 3, this.roadPointLayer.node.zIndex = 2, this.entityLayer.node.zIndex = 1
                }, e.prototype.onAddEnableNodeHandler = function(t) {
                    var e = this.node.convertToNodeSpaceAR(t.getLocation()),
                        i = s.default.instance.getNodeByPixel(e.x, e.y);
                    if (i.value = 0, !(this._lastEditorNode && this._lastEditorNode.dx == i.dx && this._lastEditorNode.dy == i.dy && this._lastEditorNode.value == i.value || (this._lastEditorNode = i, d.default.instance.pressSpace)))
                        if (d.default.instance.pressShiftKey) {
                            var o = this.getRoundNodes(i);
                            o.push(i), this.roadPointLayer.addRoadPoints(o)
                        } else this.roadPointLayer.addRoadPoint(i)
                }, e.prototype.onAddDisableNodeHandler = function(t) {
                    var e = this.node.convertToNodeSpaceAR(t.getLocation()),
                        i = s.default.instance.getNodeByPixel(e.x, e.y);
                    if (i.value = 1, !(this._lastEditorNode && this._lastEditorNode.dx == i.dx && this._lastEditorNode.dy == i.dy && this._lastEditorNode.value == i.value || (this._lastEditorNode = i, d.default.instance.pressSpace)))
                        if (d.default.instance.pressShiftKey) {
                            var o = this.getRoundNodes(i);
                            o.push(i), this.roadPointLayer.addRoadPoints(o)
                        } else this.roadPointLayer.addRoadPoint(i)
                }, e.prototype.onAddTransParentNodeHandler = function(t) {
                    var e = this.node.convertToNodeSpaceAR(t.getLocation()),
                        i = s.default.instance.getNodeByPixel(e.x, e.y);
                    if (i.value = 2, !(this._lastEditorNode && this._lastEditorNode.dx == i.dx && this._lastEditorNode.dy == i.dy && this._lastEditorNode.value == i.value || (this._lastEditorNode = i, d.default.instance.pressSpace)))
                        if (d.default.instance.pressShiftKey) {
                            var o = this.getRoundNodes(i);
                            o.push(i), this.roadPointLayer.addRoadPoints(o)
                        } else this.roadPointLayer.addRoadPoint(i)
                }, e.prototype.onAddTransferNodeHandler = function(t) {
                    var e = this.node.convertToNodeSpaceAR(t.getLocation()),
                        i = s.default.instance.getNodeByPixel(e.x, e.y);
                    if (i.value = 3, !(this._lastEditorNode && this._lastEditorNode.dx == i.dx && this._lastEditorNode.dy == i.dy && this._lastEditorNode.value == i.value || (this._lastEditorNode = i, d.default.instance.pressSpace)))
                        if (d.default.instance.pressShiftKey) {
                            var o = this.getRoundNodes(i);
                            o.push(i), this.roadPointLayer.addRoadPoints(o)
                        } else this.roadPointLayer.addRoadPoint(i)
                }, e.prototype.onRemoveNodeHandler = function(t) {
                    var e = this.node.convertToNodeSpaceAR(t.getLocation()),
                        i = s.default.instance.getNodeByPixel(e.x, e.y);
                    if (!(this._lastEditorNode && this._lastEditorNode.dx == i.dx && this._lastEditorNode.dy == i.dy && this._lastEditorNode.value == i.value || (this._lastEditorNode = i, d.default.instance.pressSpace)))
                        if (d.default.instance.pressShiftKey) {
                            var o = this.getRoundNodes(i);
                            o.push(i), this.roadPointLayer.removeRoadPoints(o)
                        } else this.roadPointLayer.removeRoadPoint(i)
                }, e.prototype.clearLastEditorNode = function() {
                    this._lastEditorNode = null
                }, e.prototype.getRoundNodes = function(t) {
                    s.default.instance.mapType == c.MapType.honeycomb ? t.cx % 2 == 0 ? this._round = this._round1 : this._round = this._round2 : this._round = this._round3;
                    for (var e = [], i = 0; i < this._round.length; i++) {
                        var o = t.cx + this._round[i][0],
                            n = t.cy + this._round[i][1],
                            r = s.default.instance.getNodeByWorldPoint(o, n);
                        r.value = t.value, e.push(r)
                    }
                    return e
                }, e.prototype.onDragMap = function(t) {
                    var e = t.getDelta(),
                        i = this.mapLayer.width - h.default.instance.editAreaView.width,
                        o = this.mapLayer.height - h.default.instance.editAreaView.height;
                    this.node.x += e.x, this.node.y += e.y, this.node.x > 0 && (this.node.x = 0), this.node.x < -i && (this.node.x = -i), this.node.y > 0 && (this.node.y = 0), this.node.y < -o && (this.node.y = -o)
                }, e.prototype.clearAllEditorAreaExecute = function() {
                    this._editorMoveHandler = null, this._editorDownHandler = null, this._editorUpHandler = null, this._editorRightDownHandler = null, this._editorRightUpHandler = null, this._editorMidUpHandler = null
                }, __decorate([u(cc.Node)], e.prototype, "layer", void 0), __decorate([u(o.default)], e.prototype, "mapLayer", void 0), __decorate([u(n.default)], e.prototype, "gridLayer", void 0), __decorate([u(r.default)], e.prototype, "roadPointLayer", void 0), __decorate([u(a.default)], e.prototype, "entityLayer", void 0), __decorate([u(cc.Node)], e.prototype, "hScrollbar", void 0), __decorate([u(cc.Node)], e.prototype, "vScrollbar", void 0), e = __decorate([l], e)
            }(cc.Component);
        i.default = y, cc._RF.pop()
    }, {
        "../base/MapType": "MapType",
        "../layer/EntityLayer": "EntityLayer",
        "../layer/GridLayer": "GridLayer",
        "../layer/MapLayer": "MapLayer",
        "../layer/RoadPointLayer": "RoadPointLayer",
        "../operation/KeyBoardExecute": "KeyBoardExecute",
        "../road/MapRoadUtils": "MapRoadUtils",
        "./MapEditor": "MapEditor"
    }],
    EditUI: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "1519bbq+IlFHbneY160G6zv", "EditUI"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("./MapEditor"),
            n = cc._decorator,
            r = n.ccclass,
            a = n.property,
            s = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.titleTxt = null, e.pixelInfoTxt = null, e.gridInfoTxt = null, e.worldInfoTxt = null, e.msBtn = null, e.rsBtn = null, e.esBtn = null, e.gsBtn = null, e
                }
                return __extends(e, t), e.prototype.start = function() {
                    o.default.instance
                }, __decorate([a(cc.Label)], e.prototype, "titleTxt", void 0), __decorate([a(cc.Label)], e.prototype, "pixelInfoTxt", void 0), __decorate([a(cc.Label)], e.prototype, "gridInfoTxt", void 0), __decorate([a(cc.Label)], e.prototype, "worldInfoTxt", void 0), __decorate([a(cc.Button)], e.prototype, "msBtn", void 0), __decorate([a(cc.Button)], e.prototype, "rsBtn", void 0), __decorate([a(cc.Button)], e.prototype, "esBtn", void 0), __decorate([a(cc.Button)], e.prototype, "gsBtn", void 0), e = __decorate([r], e)
            }(cc.Component);
        i.default = s, cc._RF.pop()
    }, {
        "./MapEditor": "MapEditor"
    }],
    EnemyAI: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "72fbdguulVMxJajkMweM3jb", "EnemyAI"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("./Enemy"),
            n = cc._decorator,
            r = n.ccclass,
            a = (n.property, function(t) {
                function e() {
                    return null !== t && t.apply(this, arguments) || this
                }
                return __extends(e, t), e.prototype.onLoad = function() {
                    this.enemy = this.getComponent(o.default)
                }, e.prototype.start = function() {}, e = __decorate([r], e)
            }(cc.Component));
        i.default = a, cc._RF.pop()
    }, {
        "./Enemy": "Enemy"
    }],
    Enemy: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "8098eVwZ0xGLb7Iz8WI8MEy", "Enemy"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = cc._decorator,
            n = o.ccclass,
            r = o.property,
            a = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.label = null, e.text = "hello", e
                }
                return __extends(e, t), e.prototype.start = function() {}, __decorate([r(cc.Label)], e.prototype, "label", void 0), __decorate([r], e.prototype, "text", void 0), e = __decorate([n], e)
            }(cc.Component);
        i.default = a, cc._RF.pop()
    }, {}],
    EntityLayer: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "6639ayo4DFKZYCU2OBZzyb+", "EntityLayer"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = cc._decorator,
            n = o.ccclass,
            r = o.property,
            a = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.label = null, e.text = "hello", e
                }
                return __extends(e, t), e.prototype.start = function() {}, e.prototype.clear = function() {}, __decorate([r(cc.Label)], e.prototype, "label", void 0), __decorate([r], e.prototype, "text", void 0), e = __decorate([n], e)
            }(cc.Component);
        i.default = a, cc._RF.pop()
    }, {}],
    GameLoop: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "372aagGwhtF/5R/OLKCIjed", "GameLoop"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = cc._decorator,
            n = o.ccclass,
            r = o.property,
            a = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.videoPlayer = null, e.text = "hello", e
                }
                return __extends(e, t), e.prototype.start = function() {
                    this.videoPlayer.play();
                    [2, 1, 3, 0].sort(function(t, e) {
                        return t < e ? -1 : t > e ? 1 : 0
                    })
                }, __decorate([r(cc.VideoPlayer)], e.prototype, "videoPlayer", void 0), __decorate([r], e.prototype, "text", void 0), e = __decorate([n], e)
            }(cc.Component);
        i.default = a, cc._RF.pop()
    }, {}],
    GridLayer: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "09018XO6StGcov2GC6ehVqo", "GridLayer"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = cc._decorator,
            n = o.ccclass,
            r = (o.property, function(t) {
                function e() {
                    var e = t.call(this) || this;
                    return e.lingColor1 = "#00550025", e.lingColor2 = "#11115566", e.lingColor3 = "#bbbbbbbb", e._graphics = null, e
                }
                return __extends(e, t), Object.defineProperty(e.prototype, "graphics", {
                    get: function() {
                        return this._graphics || (this._graphics = this.addComponent(cc.Graphics)), this._graphics
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.drawGrid = function(t, e, i, o, n) {
                    this._mapWidth = t, this._mapHeight = e, this._ceilWidth = i, this._ceilHeight = o, this._halfCeilWidth = Math.floor(i / 2), this._halfCeilHeight = Math.floor(o / 2);
                    var r = 2 * Math.ceil(t / this._ceilWidth) + 1,
                        a = 2 * Math.ceil(e / this._ceilHeight) + 1,
                        s = r * this._halfCeilWidth,
                        h = a * this._halfCeilHeight;
                    0 == n ? this.draw45AngleGrid(a, r, s, h) : 1 == n ? this.draw90AngleGrid(a, r, s, h) : 2 == n && this.drawHoneycombGrid(s, h)
                }, e.prototype.draw45AngleGrid = function(t, e, i, o) {
                    this.graphics.clear();
                    for (var n = 0; n < t + 1; n++) n % 2 == 0 ? (this.graphics.strokeColor.fromHEX(this.lingColor2), this.graphics.lineWidth = 1) : (this.graphics.strokeColor.fromHEX(this.lingColor1), this.graphics.lineWidth = 1), this.graphics.moveTo(0, n * this._halfCeilHeight), this.graphics.lineTo(i, n * this._halfCeilHeight), this.graphics.stroke();
                    for (var r = 0; r < e + 1; r++) r % 2 == 0 ? (this.graphics.strokeColor.fromHEX(this.lingColor2), this.graphics.lineWidth = 1) : (this.graphics.strokeColor.fromHEX(this.lingColor1), this.graphics.lineWidth = 1), this.graphics.moveTo(r * this._halfCeilWidth, 0), this.graphics.lineTo(r * this._halfCeilWidth, o), this.graphics.stroke();
                    for (var a = 1; a < e + t; a++) {
                        var s, h, d, c;
                        this.graphics.strokeColor.fromHEX(this.lingColor3), this.graphics.lineWidth = 2, a % 2 == 1 ? (s = a * this._halfCeilWidth, h = 0, d = 0, c = a * this._halfCeilHeight, s > i && (s = i, h = (a - e) * this._halfCeilHeight), c > o && (d = (a - t) * this._halfCeilWidth, c = o), this.graphics.moveTo(s, h), this.graphics.lineTo(d, c)) : (s = a * this._halfCeilWidth, h = o, d = 0, c = (t - a) * this._halfCeilHeight, s > i && (s = i, h = (t - (a - e)) * this._halfCeilHeight), c < 0 && (d = (a - t) * this._halfCeilWidth, c = 0), this.graphics.moveTo(s, h), this.graphics.lineTo(d, c), this.graphics.stroke())
                    }
                }, e.prototype.draw90AngleGrid = function(t, e, i, o) {
                    this.graphics.clear();
                    for (var n = 0; n < t + 1; n++) n % 2 == 0 ? (this.graphics.strokeColor.fromHEX(this.lingColor3), this.graphics.lineWidth = 2) : (this.graphics.strokeColor.fromHEX(this.lingColor1), this.graphics.lineWidth = 1), this.graphics.moveTo(0, n * this._halfCeilHeight), this.graphics.lineTo(i, n * this._halfCeilHeight), this.graphics.stroke();
                    for (var r = 0; r < e + 1; r++) r % 2 == 0 ? (this.graphics.strokeColor.fromHEX(this.lingColor3), this.graphics.lineWidth = 2) : (this.graphics.strokeColor.fromHEX(this.lingColor1), this.graphics.lineWidth = 1), this.graphics.moveTo(r * this._halfCeilWidth, 0), this.graphics.lineTo(r * this._halfCeilWidth, o), this.graphics.stroke()
                }, e.prototype.drawHoneycombGrid = function(t, e) {
                    this.graphics.clear();
                    this._ceilWidth;
                    for (var i = this._ceilWidth / 4, o = 2 * i, n = 3 * i, r = this._ceilHeight / 2, a = o - r, s = t / this._ceilWidth, h = e / this._ceilWidth, d = 2 * Math.ceil((this._mapWidth - i) / (6 * i)), c = Math.ceil((this._mapHeight - r) / this._ceilHeight), p = 0; p < 4 * h + 1; p++) p % 4 == 0 ? (this.graphics.strokeColor.fromHEX(this.lingColor2), this.graphics.lineWidth = 1) : (this.graphics.strokeColor.fromHEX(this.lingColor1), this.graphics.lineWidth = 1.2), p % 4 == 1 ? (this.graphics.moveTo(0, (p - 1) * i + a), this.graphics.lineTo(t, (p - 1) * i + a), this.graphics.stroke()) : p % 4 == 3 ? (this.graphics.moveTo(0, (p - 1) * i + r), this.graphics.lineTo(t, (p - 1) * i + r), this.graphics.stroke()) : (this.graphics.moveTo(0, p * i), this.graphics.lineTo(t, p * i), this.graphics.stroke());
                    for (var l = 0; l < 4 * s + 1; l++) l % 4 == 0 ? (this.graphics.strokeColor.fromHEX(this.lingColor2), this.graphics.lineWidth = 1) : (this.graphics.strokeColor.fromHEX(this.lingColor1), this.graphics.lineWidth = 1), this.graphics.moveTo(l * i, 0), this.graphics.lineTo(l * i, e), this.graphics.stroke();
                    this.graphics.strokeColor.fromHEX(this.lingColor3), this.graphics.lineWidth = 1.5;
                    for (var u = 0; u < d; u++) {
                        var y = u * n,
                            _ = 0;
                        u % 2 != 0 && (_ = r);
                        for (var f = 0; f < c; f++) {
                            var g = f * this._ceilHeight + _;
                            u % 2 == 0 ? (this.drawLine(y + i, 0 + g, y + n, 0 + g), this.drawLine(y + n, 0 + g, y + this._ceilWidth, r + g), this.drawLine(y + this._ceilWidth, r + g, y + n, this._ceilHeight + g), f == c - 1 && this.drawLine(y + n, this._ceilHeight + g, y + i, this._ceilHeight + g), this.drawLine(y + i, this._ceilHeight + g, y + 0, r + g), this.drawLine(y + 0, r + g, y + i, 0 + g)) : (this.drawLine(y + i, 0 + g, y + n, 0 + g), u == d - 1 && (this.drawLine(y + n, 0 + g, y + this._ceilWidth, r + g), this.drawLine(y + this._ceilWidth, r + g, y + n, this._ceilHeight + g)), f == c - 1 && (this.drawLine(y + n, this._ceilHeight + g, y + i, this._ceilHeight + g), this.drawLine(y + i, this._ceilHeight + g, y + 0, r + g), u != d - 1 && this.drawLine(y + this._ceilWidth, r + g, y + n, this._ceilHeight + g)))
                        }
                    }
                }, e.prototype.drawLine = function(t, e, i, o) {
                    this.graphics.moveTo(t, e), this.graphics.lineTo(i, o), this.graphics.stroke()
                }, e = __decorate([n], e)
            }(cc.Component));
        i.default = r, cc._RF.pop()
    }, {}],
    IRoadSeeker: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "e4f3f6Ez/xAyqwa4NhT8jTY", "IRoadSeeker"), Object.defineProperty(i, "__esModule", {
            value: !0
        }), cc._RF.pop()
    }, {}],
    KeyBoardExecute: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "bee75tJWB9Dsp7UhfMuqRi2", "KeyBoardExecute"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = cc._decorator,
            n = o.ccclass,
            r = (o.property, function() {
                function t() {
                    this._keyDownDic = {}, this._keyUpDic = {}, this._keyStatusDic = {}, this._pressCtrlKey = !1, this._pressShiftKey = !1, this._pressAltKey = !1, this._pressSpace = !1
                }
                var e;
                return e = t, Object.defineProperty(t, "instance", {
                    get: function() {
                        return this._instance || (this._instance = new e, this._instance.init()), this._instance
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "pressCtrlKey", {
                    get: function() {
                        return this._pressCtrlKey
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "pressShiftKey", {
                    get: function() {
                        return this._pressShiftKey
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "pressAltKey", {
                    get: function() {
                        return this._pressAltKey
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "pressSpace", {
                    get: function() {
                        return this._pressSpace
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.init = function() {
                    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this), cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
                }, t.prototype.onKeyDown = function(t) {
                    if (this._keyStatusDic[t.keyCode] && this._keyStatusDic[t.keyCode] != a.none && this._keyStatusDic[t.keyCode] != a.keyUp ? this._keyStatusDic[t.keyCode] == a.keyDown && (this._keyStatusDic[t.keyCode] = a.press) : this._keyStatusDic[t.keyCode] = a.keyDown, this._keyStatusDic[t.keyCode] == a.keyDown) {
                        switch (t.keyCode) {
                            case cc.macro.KEY.ctrl:
                                this._pressCtrlKey = !0;
                                break;
                            case cc.macro.KEY.shift:
                                this._pressShiftKey = !0;
                                break;
                            case cc.macro.KEY.alt:
                                this._pressAltKey = !0;
                                break;
                            case cc.macro.KEY.space:
                                this._pressSpace = !0
                        }
                        var e = "" + t.keyCode + this._pressCtrlKey + this._pressShiftKey + this._pressAltKey;
                        this._keyDownDic[e] && this._keyDownDic[e].callback.apply(this._keyDownDic[e].target, [t.keyCode, this._pressCtrlKey, this._pressShiftKey, this._pressAltKey])
                    } else this._keyStatusDic[t.keyCode], a.press
                }, t.prototype.onKeyUp = function(t) {
                    switch (this._keyStatusDic[t.keyCode] = a.keyUp, t.keyCode) {
                        case cc.macro.KEY.ctrl:
                            this._pressCtrlKey = !1;
                            break;
                        case cc.macro.KEY.shift:
                            this._pressShiftKey = !1;
                            break;
                        case cc.macro.KEY.alt:
                            this._pressAltKey = !1;
                            break;
                        case cc.macro.KEY.space:
                            this._pressSpace = !1
                    }
                    var e = "" + t.keyCode + this._pressCtrlKey + this._pressShiftKey + this._pressAltKey;
                    this._keyUpDic[e] && this._keyUpDic[e].callback.apply(this._keyUpDic[e].target, [t.keyCode, this._pressCtrlKey, this._pressShiftKey, this._pressAltKey])
                }, t.prototype.addKeyDownListener = function(t, e, i, o, n, r) {
                    void 0 === i && (i = null), void 0 === o && (o = !1), void 0 === n && (n = !1), void 0 === r && (r = !1);
                    var a = "" + e + o + n + r;
                    this._keyDownDic[a] = new s(i, t)
                }, t.prototype.addKeyUpListener = function(t, e, i, o, n, r) {
                    void 0 === i && (i = null), void 0 === o && (o = !1), void 0 === n && (n = !1), void 0 === r && (r = !1);
                    var a = "" + e + o + n + r;
                    this._keyUpDic[a] = new s(i, t)
                }, t.prototype.removeKeyDownListener = function(t, e, i, o, n, r) {
                    void 0 === i && (i = null), void 0 === o && (o = !1), void 0 === n && (n = !1), void 0 === r && (r = !1);
                    var a = "" + e + o + n + r;
                    this._keyDownDic[a] && (this._keyDownDic[a] = null, delete this._keyDownDic[a])
                }, t.prototype.removeKeyUpListener = function(t, e, i, o, n, r) {
                    void 0 === i && (i = null), void 0 === o && (o = !1), void 0 === n && (n = !1), void 0 === r && (r = !1);
                    var a = "" + e + o + n + r;
                    this._keyDownDic[a] && (this._keyDownDic[a] = null, delete this._keyDownDic[a])
                }, t.addKeyDownListener = function(t, e, i, o, n, r) {
                    void 0 === i && (i = null), void 0 === o && (o = !1), void 0 === n && (n = !1), void 0 === r && (r = !1), this.instance.addKeyDownListener(t, e, i, o, n, r)
                }, t.addKeyUpListener = function(t, e, i, o, n, r) {
                    void 0 === i && (i = null), void 0 === o && (o = !1), void 0 === n && (n = !1), void 0 === r && (r = !1), this.instance.addKeyUpListener(t, e, i, o, n, r)
                }, t.removeKeyDownListener = function(t, e, i, o, n, r) {
                    void 0 === i && (i = null), void 0 === o && (o = !1), void 0 === n && (n = !1), void 0 === r && (r = !1), this.instance.removeKeyDownListener(t, e, i, o, n, r)
                }, t.removeKeyUpListener = function(t, e, i, o, n, r) {
                    void 0 === i && (i = null), void 0 === o && (o = !1), void 0 === n && (n = !1), void 0 === r && (r = !1), this.instance.removeKeyUpListener(t, e, i, o, n, r)
                }, t = e = __decorate([n], t)
            }());
        i.default = r;
        var a, s = function() {
            return function(t, e) {
                this.target = t, this.callback = e
            }
        }();
        (function(t) {
            t[t.none = 0] = "none", t[t.keyDown = 1] = "keyDown", t[t.press = 2] = "press", t[t.keyUp = 3] = "keyUp"
        })(a || (a = {})), cc._RF.pop()
    }, {}],
    MapData: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "a0091ubw51FsLzsP1pcYli/", "MapData"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("./MapType"),
            n = function() {
                return function() {
                    this.name = "\u672a\u547d\u540d", this.bgName = "map_bg", this.type = o.MapType.angle45, this.mapWidth = 0, this.mapHeight = 0, this.nodeWidth = 0, this.nodeHeight = 0, this.roadDataArr = [], this.mapItem = []
                }
            }();
        i.default = n, cc._RF.pop()
    }, {
        "./MapType": "MapType"
    }],
    MapEditor: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "f651f/bSbZBZLU3/nbkyBZi", "MapEditor"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../road/MapRoadUtils"),
            n = t("../base/MapType"),
            r = t("./EditArea"),
            a = t("../base/MapParams"),
            s = t("./EditUI"),
            h = t("../operation/KeyBoardExecute"),
            d = t("../test/TestView"),
            c = t("../base/MapData"),
            p = t("./MiniMapView"),
            l = t("./NewMapView"),
            u = t("./OpenMapView"),
            y = t("./BaseView"),
            _ = t("./TeachView"),
            f = cc._decorator,
            g = f.ccclass,
            v = f.property,
            m = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.editAreaView = null, e.editAreaNode = null, e._editArea = null, e.editUINode = null, e._editUI = null, e.newMapViewPrefab = null, e.openMapViewPrefab = null, e.miniMapViewNode = null, e._miniMapView = null, e.testViewNode = null, e._testView = null, e.teachViewNode = null, e._teachView = null, e.copyrightViewNode = null, e.uiNode = null, e.mapName = "mapData", e.bgName = "map_bg", e.mapType = n.MapType.angle45, e.mapWidth = 1920, e.mapHeight = 1080, e.ceilWidth = 75, e.ceilHeight = 75, e._mapData = new c.default, e
                }
                var i;
                return __extends(e, t), i = e, Object.defineProperty(e.prototype, "editArea", {
                    get: function() {
                        return this._editArea || (this._editArea = this.editAreaNode.getComponent(r.default)), this._editArea
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "editUI", {
                    get: function() {
                        return this._editUI || (this._editUI = this.editUINode.getComponent(s.default)), this._editUI
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "miniMapView", {
                    get: function() {
                        return this._miniMapView || (this._miniMapView = this.miniMapViewNode.getComponent(p.default)), this._miniMapView
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "testView", {
                    get: function() {
                        return this._testView || (this._testView = this.testViewNode.getComponent(d.default)), this._testView
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "teachView", {
                    get: function() {
                        return this._teachView || (this._teachView = this.teachViewNode.getComponent(_.default)), this._teachView
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.onLoad = function() {
                    i.instance = this, cc.debug.setDisplayStats(!1)
                }, e.prototype.start = function() {
                    this.editUI.titleTxt.string = this.mapName;
                    var t = new a.default;
                    t.mapType = this.mapType, t.mapWidth = this.mapWidth, t.mapHeight = this.mapHeight, t.ceilWidth = this.ceilWidth, t.ceilHeight = this.ceilHeight, this.initKeyBoardFunction(), this.init(t)
                }, e.prototype.init = function(t) {
                    o.default.instance.updateMapInfo(t.mapWidth, t.mapHeight, t.ceilWidth, t.ceilHeight, t.mapType), this.editArea.init(t), this.miniMapView.init()
                }, e.prototype.initKeyBoardFunction = function() {
                    h.default.addKeyDownListener(this.testProject, cc.macro.KEY.enter, this, !0), h.default.addKeyDownListener(this.saveFile, cc.macro.KEY.s, this, !0), h.default.addKeyDownListener(this.saveAsFile, cc.macro.KEY.s, this, !0, !0)
                }, e.prototype.getMapData = function() {
                    return this._mapData.name = this.mapName, this._mapData.bgName = this.bgName, this._mapData.type = this.mapType, this._mapData.mapWidth = this.mapWidth, this._mapData.mapHeight = this.mapHeight, this._mapData.nodeWidth = this.ceilWidth, this._mapData.nodeHeight = this.ceilHeight, this._mapData.roadDataArr = this.editArea.roadPointLayer.getRoadPointInfo(), this._mapData
                }, e.prototype.testProject = function() {
                    this.testView.open(), this.testView.init(this.getMapData()), this.close()
                }, e.prototype.createNewFile = function() {
                    var t = cc.instantiate(this.newMapViewPrefab).getComponent(l.default);
                    t.node.active = !0, t.node.parent = this.uiNode, t.node.zIndex = 100
                }, e.prototype.openFile = function() {
                    var t = cc.instantiate(this.openMapViewPrefab).getComponent(u.default);
                    t.node.active = !0, t.node.parent = this.uiNode, t.node.zIndex = 100
                }, e.prototype.initMap = function(t) {
                    this.mapName = t.name, this.bgName = t.bgName, this.mapType = t.mapType, this.mapWidth = t.mapWidth, this.mapHeight = t.mapHeight, this.ceilWidth = t.ceilWidth, this.ceilHeight = t.ceilHeight, this.editUI.titleTxt.string = this.mapName, o.default.instance.updateMapInfo(t.mapWidth, t.mapHeight, t.ceilWidth, t.ceilHeight, t.mapType), this.editArea.clear(), this.editArea.init(t), this.miniMapView.init()
                }, e.prototype.openMap = function(t, e) {
                    this.mapName = t.name, this.bgName = t.bgName, this.mapType = t.type, this.mapWidth = t.mapWidth, this.mapHeight = t.mapHeight, this.ceilWidth = t.nodeWidth, this.ceilHeight = t.nodeHeight;
                    var i = new a.default;
                    i.mapType = this.mapType, i.mapWidth = this.mapWidth, i.mapHeight = this.mapHeight, i.ceilWidth = this.ceilWidth, i.ceilHeight = this.ceilHeight, i.bgTex = e, this.editUI.titleTxt.string = this.mapName, o.default.instance.updateMapInfo(i.mapWidth, i.mapHeight, i.ceilWidth, i.ceilHeight, i.mapType), this.editArea.clear(), this.editArea.init(i), this.editArea.initMapData(t), this.miniMapView.init()
                }, e.prototype.saveFile = function() {
                    var t = JSON.stringify(this.getMapData());
                    this.saveForBrowser(t, this._mapData.name + ".json")
                }, e.prototype.saveAsFile = function() {
                    cc.log("\u53e6\u5b58\u4e3a")
                }, e.prototype.downloadSource = function() {
                    cc.loader.loadRes("EasyMapEditorSource", function(t, e) {
                        var i = document.createElement("a");
                        i.setAttribute("href", e.url), i.setAttribute("download", "EasyMapEditorSource.zip"), i.style.display = "none", document.body.appendChild(i), i.click(), document.body.removeChild(i)
                    })
                }, e.prototype.downloadImageClipTool = function() {
                    cc.loader.loadRes("ImageClip", function(t, e) {
                        var i = document.createElement("a");
                        i.setAttribute("href", e.url), i.setAttribute("download", "ImageClip.zip"), i.style.display = "none", document.body.appendChild(i), i.click(), document.body.removeChild(i)
                    })
                }, e.prototype.saveForBrowser = function(t, e) {
                    if (cc.sys.isBrowser) {
                        var i = new Blob([t], {
                                type: "application/json"
                            }),
                            o = document.createElement("a");
                        o.download = e, o.innerHTML = "Download File", null != window.webkitURL ? o.href = window.webkitURL.createObjectURL(i) : (o.href = window.URL.createObjectURL(i), o.style.display = "none", document.body.appendChild(o)), o.click(), window.URL.revokeObjectURL(o.href)
                    }
                }, e.prototype.showTeach = function() {
                    this.teachView.open()
                }, e.prototype.showCopyright = function() {
                    this.copyrightViewNode.getComponent(y.default).open()
                }, e.prototype.open = function() {
                    this.editAreaView.active = !0
                }, e.prototype.close = function() {
                    this.editAreaView.active = !1
                }, __decorate([v(cc.Node)], e.prototype, "editAreaView", void 0), __decorate([v(cc.Node)], e.prototype, "editAreaNode", void 0), __decorate([v(cc.Node)], e.prototype, "editUINode", void 0), __decorate([v(cc.Node)], e.prototype, "newMapViewPrefab", void 0), __decorate([v(cc.Node)], e.prototype, "openMapViewPrefab", void 0), __decorate([v(cc.Node)], e.prototype, "miniMapViewNode", void 0), __decorate([v(cc.Node)], e.prototype, "testViewNode", void 0), __decorate([v(cc.Node)], e.prototype, "teachViewNode", void 0), __decorate([v(cc.Node)], e.prototype, "copyrightViewNode", void 0), __decorate([v(cc.Node)], e.prototype, "uiNode", void 0), __decorate([v()], e.prototype, "mapName", void 0), __decorate([v()], e.prototype, "bgName", void 0), __decorate([v({
                    type: cc.Enum(n.MapType)
                })], e.prototype, "mapType", void 0), __decorate([v()], e.prototype, "mapWidth", void 0), __decorate([v()], e.prototype, "mapHeight", void 0), __decorate([v()], e.prototype, "ceilWidth", void 0), __decorate([v()], e.prototype, "ceilHeight", void 0), e = i = __decorate([g], e)
            }(cc.Component);
        i.default = m, cc._RF.pop()
    }, {
        "../base/MapData": "MapData",
        "../base/MapParams": "MapParams",
        "../base/MapType": "MapType",
        "../operation/KeyBoardExecute": "KeyBoardExecute",
        "../road/MapRoadUtils": "MapRoadUtils",
        "../test/TestView": "TestView",
        "./BaseView": "BaseView",
        "./EditArea": "EditArea",
        "./EditUI": "EditUI",
        "./MiniMapView": "MiniMapView",
        "./NewMapView": "NewMapView",
        "./OpenMapView": "OpenMapView",
        "./TeachView": "TeachView"
    }],
    MapLayer: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "753fbcKY45E1Lc2+Glt9EhY", "MapLayer"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = cc._decorator,
            n = o.ccclass,
            r = o.property,
            a = function(t) {
                function e() {
                    var e = t.call(this) || this;
                    return e._sliceWidth = 200, e._sliceHeight = 200, e._sliceImgDic = {}, e.bgImg = null, e
                }
                return __extends(e, t), e.prototype.init = function(t, e, i, o, n) {
                    this._viewWidth = t, this._viewHeight = e, this._sliceWidth = i, this._sliceHeight = o, n && (this.bgImg.spriteFrame = new cc.SpriteFrame(n)), this.node.width = this.width, this.node.height = this.height
                }, e.prototype.load = function(t) {}, e.prototype.onLoadComplete = function() {}, e.prototype.loadSmallImage = function(t, e) {
                    if (this._bitmapDataArr) Math.floor(t / this._sliceWidth), Math.floor(e / this._sliceHeight), Math.floor((t + this._viewWidth) / this._sliceWidth), Math.floor((e + this._viewHeight) / this._sliceHeight)
                }, e.prototype.clear = function() {
                    this.bgImg.spriteFrame = null
                }, Object.defineProperty(e.prototype, "bgImage", {
                    get: function() {
                        return this.bgImg
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "width", {
                    get: function() {
                        return this.bgImg ? this.bgImg.node.width : this._viewWidth
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(e.prototype, "height", {
                    get: function() {
                        return this.bgImg ? this.bgImg.node.height : this._viewHeight
                    },
                    enumerable: !0,
                    configurable: !0
                }), __decorate([r(cc.Sprite)], e.prototype, "bgImg", void 0), e = __decorate([n], e)
            }(cc.Component);
        i.default = a, cc._RF.pop()
    }, {}],
    MapParams: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "6b00e3/60pNy69HrXB4iMm4", "MapParams"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("./MapType"),
            n = function() {
                return function() {
                    this.name = "", this.mapType = o.MapType.angle45, this.mapWidth = 750, this.mapHeight = 1600, this.ceilWidth = 75, this.ceilHeight = 75, this.bgTex = null, this.bgName = ""
                }
            }();
        i.default = n, cc._RF.pop()
    }, {
        "./MapType": "MapType"
    }],
    MapRoadUtils: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "38983rww8xCor2DSeawAfiI", "MapRoadUtils"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("./Point"),
            n = t("./RoadNode"),
            r = t("../base/MapType"),
            a = function() {
                function t() {}
                return Object.defineProperty(t, "instance", {
                    get: function() {
                        return null == this._instance && (this._instance = new t), this._instance
                    },
                    enumerable: !0,
                    configurable: !0
                }), t.prototype.updateMapInfo = function(t, e, i, o, n) {
                    switch (this._mapWidth = t, this._mapHeight = e, this._nodeWidth = i, this._nodeHeight = o, this._halfNodeWidth = Math.floor(this._nodeWidth / 2), this._halfNodeHeight = Math.floor(this._nodeHeight / 2), this._col = Math.ceil(t / this._nodeWidth), this._row = Math.ceil(e / this._nodeHeight), this._mapType = n, this._mapType) {
                        case r.MapType.angle45:
                            this._mapRoad = new s(this._row, this._col, this._nodeWidth, this._nodeHeight, this._halfNodeWidth, this._halfNodeHeight);
                            break;
                        case r.MapType.angle90:
                            this._mapRoad = new h(this._row, this._col, this._nodeWidth, this._nodeHeight, this._halfNodeWidth, this._halfNodeHeight);
                            break;
                        case r.MapType.honeycomb:
                            this._col = 2 * Math.ceil((this._mapWidth - this._nodeWidth / 4) / (this._nodeWidth / 4 * 6)), this._row = Math.ceil((this._mapHeight - this._nodeHeight / 2) / this._nodeHeight), this._mapRoad = new d(this._row, this._col, this._nodeWidth, this._nodeHeight, this._halfNodeWidth, this._halfNodeHeight)
                    }
                }, t.prototype.getNodeByPixel = function(t, e) {
                    return this._mapRoad ? this._mapRoad.getNodeByPixel(t, e) : new n.default
                }, t.prototype.getNodeByDerect = function(t, e) {
                    return this._mapRoad ? this._mapRoad.getNodeByDerect(t, e) : new n.default
                }, t.prototype.getNodeByWorldPoint = function(t, e) {
                    return this._mapRoad ? this._mapRoad.getNodeByWorldPoint(t, e) : new n.default
                }, t.prototype.getWorldPointByPixel = function(t, e) {
                    return this._mapRoad ? this._mapRoad.getWorldPointByPixel(t, e) : new o.default
                }, t.prototype.getPixelByWorldPoint = function(t, e) {
                    return this._mapRoad ? this._mapRoad.getPixelByWorldPoint(t, e) : new o.default
                }, t.prototype.getDerectByPixel = function(t, e) {
                    return this._mapRoad ? this._mapRoad.getDerectByPixel(t, e) : new o.default
                }, t.prototype.getDerectByWorldPoint = function(t, e) {
                    return this._mapRoad ? this._mapRoad.getDerectByWorldPoint(t, e) : new o.default
                }, t.prototype.getPixelByDerect = function(t, e) {
                    return this._mapRoad ? this._mapRoad.getPixelByDerect(t, e) : new o.default
                }, Object.defineProperty(t.prototype, "mapWidth", {
                    get: function() {
                        return this._mapWidth
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "mapHeight", {
                    get: function() {
                        return this._mapHeight
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "nodeWidth", {
                    get: function() {
                        return this._nodeWidth
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "nodeHeight", {
                    get: function() {
                        return this._nodeHeight
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "row", {
                    get: function() {
                        return this._row
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "col", {
                    get: function() {
                        return this._col
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "halfNodeWidth", {
                    get: function() {
                        return this._halfNodeWidth
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "halfNodeHeight", {
                    get: function() {
                        return this._halfNodeHeight
                    },
                    enumerable: !0,
                    configurable: !0
                }), Object.defineProperty(t.prototype, "mapType", {
                    get: function() {
                        return this._mapType
                    },
                    enumerable: !0,
                    configurable: !0
                }), t
            }();
        i.default = a;
        var s = function() {
                function t(t, e, i, o, n, r) {
                    this._row = t, this._col = e, this._nodeWidth = i, this._nodeHeight = o, this._halfNodeWidth = n, this._halfNodeHeight = r
                }
                return t.prototype.getNodeByPixel = function(t, e) {
                    var i = this.getWorldPointByPixel(t, e),
                        o = this.getPixelByWorldPoint(i.x, i.y),
                        r = this.getDerectByPixel(t, e),
                        a = new n.default;
                    return a.cx = i.x, a.cy = i.y, a.px = o.x, a.py = o.y, a.dx = r.x, a.dy = r.y, a
                }, t.prototype.getNodeByDerect = function(t, e) {
                    var i = this.getPixelByDerect(t, e),
                        o = this.getWorldPointByPixel(i.x, i.y),
                        r = new n.default;
                    return r.cx = o.x, r.cy = o.y, r.px = i.x, r.py = i.y, r.dx = t, r.dy = e, r
                }, t.prototype.getNodeByWorldPoint = function(t, e) {
                    var i = this.getPixelByWorldPoint(t, e);
                    return this.getNodeByPixel(i.x, i.y)
                }, t.prototype.getWorldPointByPixel = function(t, e) {
                    var i = Math.ceil(t / this._nodeWidth - .5 + e / this._nodeHeight) - 1,
                        n = this._col - 1 - Math.ceil(t / this._nodeWidth - .5 - e / this._nodeHeight);
                    return new o.default(i, n)
                }, t.prototype.getPixelByWorldPoint = function(t, e) {
                    var i = Math.floor((t + 1 - (e - (this._col - 1))) * this._halfNodeWidth),
                        n = Math.floor((t + 1 + (e - (this._col - 1))) * this._halfNodeHeight);
                    return new o.default(i, n)
                }, t.prototype.getDerectByPixel = function(t, e) {
                    var i = this.getWorldPointByPixel(t, e),
                        n = this.getPixelByWorldPoint(i.x, i.y),
                        r = Math.floor(n.x / this._nodeWidth) - (n.x % this._nodeWidth == 0 ? 1 : 0),
                        a = Math.floor(n.y / this._halfNodeHeight) - 1;
                    return new o.default(r, a)
                }, t.prototype.getDerectByWorldPoint = function(t, e) {
                    var i = Math.floor((t - (e - (this._col - 1))) / 2),
                        n = t + (e - (this._col - 1));
                    return new o.default(i, n)
                }, t.prototype.getPixelByDerect = function(t, e) {
                    var i = Math.floor((t + e % 2) * this._nodeWidth + (1 - e % 2) * this._halfNodeWidth),
                        n = Math.floor((e + 1) * this._halfNodeHeight);
                    return new o.default(i, n)
                }, t
            }(),
            h = function() {
                function t(t, e, i, o, n, r) {
                    this._row = t, this._col = e, this._nodeWidth = i, this._nodeHeight = o, this._halfNodeWidth = n, this._halfNodeHeight = r
                }
                return t.prototype.getNodeByPixel = function(t, e) {
                    var i = this.getWorldPointByPixel(t, e),
                        o = this.getPixelByWorldPoint(i.x, i.y),
                        r = this.getDerectByPixel(t, e),
                        a = new n.default;
                    return a.cx = i.x, a.cy = i.y, a.px = o.x, a.py = o.y, a.dx = r.x, a.dy = r.y, a
                }, t.prototype.getNodeByDerect = function(t, e) {
                    var i = this.getPixelByDerect(t, e),
                        o = this.getWorldPointByPixel(i.x, i.y),
                        r = new n.default;
                    return r.cx = o.x, r.cy = o.y, r.px = i.x, r.py = i.y, r.dx = t, r.dy = e, r
                }, t.prototype.getNodeByWorldPoint = function(t, e) {
                    var i = this.getPixelByWorldPoint(t, e);
                    return this.getNodeByPixel(i.x, i.y)
                }, t.prototype.getWorldPointByPixel = function(t, e) {
                    var i = Math.floor(t / this._nodeWidth),
                        n = Math.floor(e / this._nodeHeight);
                    return new o.default(i, n)
                }, t.prototype.getPixelByWorldPoint = function(t, e) {
                    var i = Math.floor((t + 1) * this._nodeWidth - this._halfNodeWidth),
                        n = Math.floor((e + 1) * this._nodeHeight - this._halfNodeHeight);
                    return new o.default(i, n)
                }, t.prototype.getDerectByPixel = function(t, e) {
                    var i = Math.floor(t / this._nodeWidth),
                        n = Math.floor(e / this._nodeHeight);
                    return new o.default(i, n)
                }, t.prototype.getDerectByWorldPoint = function(t, e) {
                    return new o.default(t, e)
                }, t.prototype.getPixelByDerect = function(t, e) {
                    var i = Math.floor((t + 1) * this._nodeWidth - this._halfNodeWidth),
                        n = Math.floor((e + 1) * this._nodeHeight - this._halfNodeHeight);
                    return new o.default(i, n)
                }, t
            }(),
            d = function() {
                function t(t, e, i, o, n, r) {
                    this._proportion = 1.732, this._row = t, this._col = e, this._nodeWidth = i, this._nodeHeight = o, this._halfNodeWidth = n, this._halfNodeHeight = r, this._nwDiv4 = this._nodeWidth / 4, this._radius = 4 * this._nwDiv4, this._proportion = 2 * this._nodeHeight / this._nodeWidth
                }
                return t.prototype.getNodeByPixel = function(t, e) {
                    var i = this.getWorldPointByPixel(t, e),
                        o = this.getPixelByWorldPoint(i.x, i.y),
                        r = new n.default;
                    return r.cx = i.x, r.cy = i.y, r.px = o.x, r.py = o.y, r.dx = i.x, r.dy = i.y, r
                }, t.prototype.getNodeByDerect = function(t, e) {
                    var i = this.getPixelByDerect(t, e),
                        o = new n.default;
                    return o.cx = t, o.cy = e, o.px = i.x, o.py = i.y, o.dx = t, o.dy = e, o
                }, t.prototype.getNodeByWorldPoint = function(t, e) {
                    var i = this.getPixelByWorldPoint(t, e);
                    return this.getNodeByPixel(i.x, i.y)
                }, t.prototype.getWorldPointByPixel = function(t, e) {
                    var i, n, r, a = Math.floor(t / this._nwDiv4),
                        s = Math.floor(a / 3);
                    return (a - 1) % 6 == 0 || (a - 2) % 6 == 0 ? (n = s, r = i = Math.floor(e / this._nodeHeight)) : (a - 4) % 6 == 0 || (a - 5) % 6 == 0 ? (n = s, r = i = e < this._nodeHeight / 2 ? -1 : Math.floor((e - this._nodeHeight / 2) / this._nodeHeight)) : s % 2 == 0 ? (i = Math.floor(e / this._nodeHeight), this.testPointInHoneycomb(s, i, t, e) ? (n = s, r = i) : this.testPointInHoneycomb(s - 1, i - 1, t, e) ? (n = s - 1, r = i - 1) : (n = s - 1, r = i)) : (i = e < this._nodeHeight / 2 ? -1 : Math.floor((e - this._nodeHeight / 2) / this._nodeHeight), this.testPointInHoneycomb(s, i, t, e) ? (n = s, r = i) : this.testPointInHoneycomb(s - 1, i, t, e) ? (n = s - 1, r = i) : (n = s - 1, r = i + 1)), new o.default(n, r)
                }, t.prototype.testPointInHoneycomb = function(t, e, i, o) {
                    var n = 2 * this._nwDiv4,
                        r = this.getPixelByWorldPoint(t, e);
                    return n - Math.abs(i - r.x) >= Math.abs(o - r.y) / this._proportion
                }, t.prototype.getPixelByWorldPoint = function(t, e) {
                    var i = Math.floor((2 + 3 * t) / 4 * this._nodeWidth),
                        n = Math.floor((e + .5 * (1 + t % 2)) * this._nodeHeight);
                    return new o.default(i, n)
                }, t.prototype.getDerectByPixel = function(t, e) {
                    return this.getWorldPointByPixel(t, e)
                }, t.prototype.getDerectByWorldPoint = function(t, e) {
                    return new o.default(t, e)
                }, t.prototype.getPixelByDerect = function(t, e) {
                    var i = (2 + 3 * t) / 4 * this._nodeWidth,
                        n = (e + .5 * (1 + t % 2)) * this._nodeHeight;
                    return new o.default(i, n)
                }, t
            }();
        cc._RF.pop()
    }, {
        "../base/MapType": "MapType",
        "./Point": "Point",
        "./RoadNode": "RoadNode"
    }],
    MapType: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "967a1oZod1CQYHXqS8EHBnp", "MapType"), Object.defineProperty(i, "__esModule", {
                value: !0
            }),
            function(t) {
                t[t.angle45 = 0] = "angle45", t[t.angle90 = 1] = "angle90", t[t.honeycomb = 2] = "honeycomb"
            }(i.MapType || (i.MapType = {})), cc._RF.pop()
    }, {}],
    MiniMapView: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "39642CrwF9G3bswk3K7R/2d", "MiniMapView"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("./MapEditor"),
            n = t("./BaseView"),
            r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            h = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.miniMap = null, e.viewRect = null, e._mapScale = 1, e._rectSize = new cc.Size(0, 0), e
                }
                return __extends(e, t), e.prototype.start = function() {
                    this.miniMap.node.on(cc.Node.EventType.TOUCH_START, this.onClickMiniMap, this)
                }, e.prototype.init = function() {
                    var t = o.default.instance.editArea.mapLayer.bgImage;
                    this.miniMap.spriteFrame = t.spriteFrame, t.node.width > t.node.height ? (this.miniMap.node.width = t.node.width > this.content.width - 4 ? this.content.width - 4 : t.node.width, this.miniMap.node.height = t.node.height * this.miniMap.node.width / t.node.width) : (this.miniMap.node.height = t.node.height > this.content.height - 4 ? this.content.height - 4 : t.node.height, this.miniMap.node.width = t.node.width * this.miniMap.node.height / t.node.height), this.miniMap.node.x = -this.miniMap.node.width / 2, this.miniMap.node.y = -this.miniMap.node.height / 2, this.viewRect.x = this.miniMap.node.x, this.viewRect.y = this.miniMap.node.y, this._mapScale = this.miniMap.node.width / t.node.width, t.node.width > o.default.instance.editAreaView.width || t.node.height > o.default.instance.editAreaView.height ? (this._rectSize.width = o.default.instance.editAreaView.width * this._mapScale, this._rectSize.height = o.default.instance.editAreaView.height * this._mapScale) : (this._rectSize.width = 0, this._rectSize.height = 0), this.refreshViewRect(0, 0)
                }, e.prototype.refreshViewRect = function(t, e) {
                    var i = this.viewRect.getComponent(cc.Graphics);
                    if (i || (i = this.viewRect.addComponent(cc.Graphics)), this._rectSize.width > 0 && this._rectSize.height > 0) {
                        var o = t * this._mapScale,
                            n = e * this._mapScale;
                        i.clear(), i.rect(o, n, this._rectSize.width, this._rectSize.height), i.lineWidth = 4, i.strokeColor.fromHEX("#ffffff"), i.stroke()
                    } else i.clear()
                }, e.prototype.onClickMiniMap = function(t) {
                    var e = this.miniMap.node.convertToNodeSpaceAR(t.getLocation());
                    e.x = e.x / this._mapScale, e.y = e.y / this._mapScale, o.default.instance.editArea.setMapViewToPoint(e.x, e.y)
                }, __decorate([s(cc.Sprite)], e.prototype, "miniMap", void 0), __decorate([s(cc.Node)], e.prototype, "viewRect", void 0), e = __decorate([a], e)
            }(n.default);
        i.default = h, cc._RF.pop()
    }, {
        "./BaseView": "BaseView",
        "./MapEditor": "MapEditor"
    }],
    MovieClip: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "cb924t7AD1JlaIj9BYSsdh8", "MovieClip"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = cc._decorator,
            n = o.ccclass,
            r = o.property,
            a = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.m_sprite = null, e.timer = .1, e.interval = .1, e.texture = null, e.playTimes = 0, e.row = 4, e.col = 4, e.rowIndex = 0, e.isAll = !1, e.autoPlayOnLoad = !0, e.autoDestroy = !1, e.begin = 0, e.end = 0, e.totalFrame = 8, e.currentFrame = 0, e.currentTimes = 0, e.running = !0, e._playIndex = 0, e._pieceWidth = 0, e._pieceHeight = 0, e.rect = new cc.Rect, e
                }
                return __extends(e, t), e.prototype.onLoad = function() {
                    0 == this.end && (this.end = this.col), this.rowIndex = this.clamp(this.rowIndex, 0, this.row - 1), this._pieceWidth = this.texture.width / this.col, this._pieceHeight = this.texture.height / this.row, this.m_sprite = this.getComponent(cc.Sprite), this.m_sprite || (this.m_sprite = this.addComponent(cc.Sprite)), this.m_sprite.spriteFrame ? this.m_sprite.spriteFrame.setTexture(this.texture, new cc.Rect(0, this.rowIndex * this._pieceHeight, this._pieceWidth, this._pieceHeight), !1, cc.v2(0, 0), new cc.Size(this._pieceWidth, this._pieceHeight)) : this.m_sprite.spriteFrame = new cc.SpriteFrame(this.texture, new cc.Rect(0, this.rowIndex * this._pieceHeight, this._pieceWidth, this._pieceHeight), !1, cc.v2(0, 0), new cc.Size(this._pieceWidth, this._pieceHeight)), this.rect.width = this._pieceWidth, this.rect.height = this._pieceHeight, this.node.width = this._pieceWidth, this.node.height = this._pieceHeight, this.timer = 0, this.running = this.autoPlayOnLoad
                }, e.prototype.update = function(t) {
                    this.running && (0 == this.playTimes || this.currentTimes != this.playTimes ? (this.timer -= t, this.timer <= 0 && (this.timer = this.interval, this.currentFrame = this.currentFrame % this.col, this.playAction(), this.currentFrame++, this.currentFrame == this.col && (this.isAll ? (this.rowIndex++, this.rowIndex == this.row && (this.currentTimes++, this.node.emit("completeTimes"), 0 != this.playTimes && this.currentTimes == this.playTimes && (this.node.emit("complete"), this.autoDestroy && this.node.destroy())), this.rowIndex %= this.row) : (this.currentTimes++, this.node.emit("completeTimes"), 0 != this.playTimes && this.currentTimes == this.playTimes && (this.node.emit("complete"), this.autoDestroy && this.node.destroy()))))) : this.running = !1)
                }, e.prototype.playAction = function() {
                    this.rowIndex = this.clamp(this.rowIndex, 0, this.row - 1), this._playIndex = this._playIndex % (this.end - this.begin) + this.begin, this.rect.x = this._playIndex * this._pieceWidth, this.rect.y = this.rowIndex * this._pieceHeight, this.m_sprite.spriteFrame.setRect(this.rect), this._playIndex++
                }, e.prototype.play = function() {
                    this.running = !0
                }, e.prototype.stop = function() {
                    this.running = !1
                }, e.prototype.gotoAndPlay = function(t) {
                    this.running = !0, this._playIndex = t, this._playIndex = this.clamp(this._playIndex, 0, this.col - 1)
                }, e.prototype.gotoAndStop = function(t) {
                    this.running = !1, this._playIndex = t, this._playIndex = this.clamp(this._playIndex, 0, this.col - 1), this.rect.x = this._playIndex * this._pieceWidth, this.rect.y = this.rowIndex * this._pieceHeight, this.m_sprite.spriteFrame.setRect(this.rect)
                }, e.prototype.clamp = function(t, e, i) {
                    return t < e ? e : t > i ? i : t
                }, __decorate([r(cc.Float)], e.prototype, "interval", void 0), __decorate([r({
                    type: cc.Texture2D
                })], e.prototype, "texture", void 0), __decorate([r({
                    type: cc.Integer
                })], e.prototype, "playTimes", void 0), __decorate([r(cc.Integer)], e.prototype, "row", void 0), __decorate([r(cc.Integer)], e.prototype, "col", void 0), __decorate([r(cc.Integer)], e.prototype, "rowIndex", void 0), __decorate([r(cc.Boolean)], e.prototype, "isAll", void 0), __decorate([r(cc.Boolean)], e.prototype, "autoPlayOnLoad", void 0), __decorate([r(cc.Boolean)], e.prototype, "autoDestroy", void 0), __decorate([r()], e.prototype, "begin", void 0), __decorate([r()], e.prototype, "end", void 0), e = __decorate([n], e)
            }(cc.Component);
        i.default = a, cc._RF.pop()
    }, {}],
    NewMapView: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "876be3kvgdLq6Phd63cANOS", "NewMapView"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("./BaseView"),
            n = t("./WebFileHandler"),
            r = t("./MapEditor"),
            a = t("../base/MapParams"),
            s = t("../base/MapType"),
            h = cc._decorator,
            d = h.ccclass,
            c = h.property,
            p = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.mapNameTxt = null, e.mapWidthTxt = null, e.mapHeightTxt = null, e.roadWidthTxt = null, e.roadHeigthTxt = null, e.bgPathTxt = null, e.openBgBtn = null, e.confireBtn = null, e.cancleBtn = null, e.mapTypeToggle = null, e.webFileHandler = new n.default, e.bgTex = null, e.bgName = "", e.mapType = s.MapType.angle45, e.numperspective = .5773, e.maxCeilCountLimit = 65536, e
                }
                return __extends(e, t), e.prototype.start = function() {
                    var t = this;
                    this.openBgBtn.node.on(cc.Node.EventType.TOUCH_START, function(e) {
                        t.webFileHandler.openImageWin(function(e, i) {
                            t.bgTex = e;
                            var o = i.name.lastIndexOf(".");
                            t.bgName = i.name.slice(0, o), t.bgPathTxt.string = i.name, t.mapWidthTxt.string = "" + e.width, t.mapHeightTxt.string = "" + e.height
                        })
                    }, this), this.confireBtn.node.on(cc.Node.EventType.TOUCH_START, function(e) {
                        if (t.bgTex) {
                            var i = Number(t.mapWidthTxt.string) ? Number(t.mapWidthTxt.string) : t.bgTex.width,
                                o = Number(t.mapHeightTxt.string) ? Number(t.mapHeightTxt.string) : t.bgTex.height,
                                n = Number(t.roadWidthTxt.string) ? Number(t.roadWidthTxt.string) : 60,
                                h = Number(t.roadHeigthTxt.string) ? Number(t.roadHeigthTxt.string) : 60,
                                d = Math.ceil(i / n),
                                c = Math.ceil(o / h);
                            if (t.mapType == s.MapType.honeycomb && (d = 2 * Math.ceil((i - n / 4) / (n / 4 * 6)), c = Math.ceil((o - h / 2) / h)), d * c > t.maxCeilCountLimit) cc.sys.isBrowser && setTimeout(function() {
                                alert("\u8def\u70b9\u683c\u5b50\u6570\u4e0d\u80fd\u8d85\u8fc7" + t.maxCeilCountLimit + ",\u521b\u5efa\u5931\u8d25\uff0c\u8bf7\u91cd\u65b0\u8c03\u6574\u8def\u70b9\u683c\u5b50\u5927\u5c0f")
                            }, 100);
                            else {
                                var p = new a.default;
                                p.name = t.mapNameTxt.string, p.mapType = t.mapType, p.mapWidth = i, p.mapHeight = o, p.ceilWidth = n, p.ceilHeight = h, p.bgTex = t.bgTex, p.bgName = t.bgName, r.default.instance.initMap(p), t.close()
                            }
                        } else cc.sys.isBrowser && setTimeout(function() {
                            alert("\u8fd8\u6ca1\u9009\u62e9\u5e95\u56fe")
                        }, 100)
                    }, this), this.cancleBtn.node.on(cc.Node.EventType.TOUCH_START, function(e) {
                        t.close()
                    }, this)
                }, e.prototype.checkToggle = function(t) {
                    this.mapType = this.mapTypeToggle.toggleItems.indexOf(t), this.mapType == s.MapType.angle45 ? (this.roadWidthTxt.string = "60", this.roadHeigthTxt.string = "30", this.roadHeigthTxt.enabled = !0) : this.mapType == s.MapType.angle90 ? (this.roadWidthTxt.string = "40", this.roadHeigthTxt.string = "40", this.roadHeigthTxt.enabled = !0) : this.mapType == s.MapType.honeycomb && (this.roadWidthTxt.string = "40", this.roadHeigthTxt.string = "" + Number(this.roadWidthTxt.string) / 2 * 1.732, this.roadHeigthTxt.enabled = !1)
                }, e.prototype.onTextInputChange = function(t, e, i) {
                    e == this.roadWidthTxt && this.mapType == s.MapType.honeycomb && (this.roadHeigthTxt.string = "" + Number(this.roadWidthTxt.string) / 2 * 1.732)
                }, e.prototype.close = function() {
                    this.node.active = !1
                }, __decorate([c(cc.EditBox)], e.prototype, "mapNameTxt", void 0), __decorate([c(cc.EditBox)], e.prototype, "mapWidthTxt", void 0), __decorate([c(cc.EditBox)], e.prototype, "mapHeightTxt", void 0), __decorate([c(cc.EditBox)], e.prototype, "roadWidthTxt", void 0), __decorate([c(cc.EditBox)], e.prototype, "roadHeigthTxt", void 0), __decorate([c(cc.Label)], e.prototype, "bgPathTxt", void 0), __decorate([c(cc.Button)], e.prototype, "openBgBtn", void 0), __decorate([c(cc.Button)], e.prototype, "confireBtn", void 0), __decorate([c(cc.Button)], e.prototype, "cancleBtn", void 0), __decorate([c(cc.ToggleContainer)], e.prototype, "mapTypeToggle", void 0), e = __decorate([d], e)
            }(o.default);
        i.default = p, cc._RF.pop()
    }, {
        "../base/MapParams": "MapParams",
        "../base/MapType": "MapType",
        "./BaseView": "BaseView",
        "./MapEditor": "MapEditor",
        "./WebFileHandler": "WebFileHandler"
    }],
    OpenMapView: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "d3735DnvSNBD6YEDTVYQt/W", "OpenMapView"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("./WebFileHandler"),
            n = t("./BaseView"),
            r = t("./MapEditor"),
            a = cc._decorator,
            s = a.ccclass,
            h = a.property,
            d = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.dataPathTxt = null, e.openDataBtn = null, e.bgPathTxt = null, e.openBgBtn = null, e.confireBtn = null, e.cancleBtn = null, e.webFileHandler = new o.default, e.bgTex = null, e.bgName = "", e._mapData = null, e
                }
                return __extends(e, t), e.prototype.start = function() {
                    var t = this;
                    this.openDataBtn.node.on(cc.Node.EventType.TOUCH_START, function(e) {
                        t.webFileHandler.openTextWin(function(e, i) {
                            t._mapData = JSON.parse(e), t.dataPathTxt.string = i.name
                        })
                    }, this), this.openBgBtn.node.on(cc.Node.EventType.TOUCH_START, function(e) {
                        t.webFileHandler.openImageWin(function(e, i) {
                            t.bgTex = e;
                            var o = i.name.lastIndexOf(".");
                            t.bgName = i.name.slice(0, o), t.bgPathTxt.string = i.name
                        })
                    }, this), this.confireBtn.node.on(cc.Node.EventType.TOUCH_START, function(e) {
                        t._mapData ? t.bgTex ? (t._mapData.bgName = t.bgName, r.default.instance.openMap(t._mapData, t.bgTex), t.close()) : cc.sys.isBrowser && setTimeout(function() {
                            alert("\u8fd8\u6ca1\u9009\u62e9\u5e95\u56fe")
                        }, 100) : cc.sys.isBrowser && setTimeout(function() {
                            alert("\u8fd8\u6ca1\u9009\u62e9\u5e95\u56fe\u5730\u56fe\u6570\u636e")
                        }, 100)
                    }, this), this.cancleBtn.node.on(cc.Node.EventType.TOUCH_START, function(e) {
                        t.close()
                    }, this)
                }, __decorate([h(cc.Label)], e.prototype, "dataPathTxt", void 0), __decorate([h(cc.Button)], e.prototype, "openDataBtn", void 0), __decorate([h(cc.Label)], e.prototype, "bgPathTxt", void 0), __decorate([h(cc.Button)], e.prototype, "openBgBtn", void 0), __decorate([h(cc.Button)], e.prototype, "confireBtn", void 0), __decorate([h(cc.Button)], e.prototype, "cancleBtn", void 0), e = __decorate([s], e)
            }(n.default);
        i.default = d, cc._RF.pop()
    }, {
        "./BaseView": "BaseView",
        "./MapEditor": "MapEditor",
        "./WebFileHandler": "WebFileHandler"
    }],
    Point: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "520e4cLiBBPLYREzSRGlltJ", "Point"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = function() {
            return function(t, e) {
                void 0 === t && (t = 0), void 0 === e && (e = 0), this.x = 0, this.y = 0, this.x = t, this.y = e
            }
        }();
        i.default = o, cc._RF.pop()
    }, {}],
    RoadNode: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "a5569a7KTRDiKGvGCqxNAHv", "RoadNode"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = function() {
            function t() {
                this._value = 0, this._f = 0, this._g = 0, this._h = 0, this._parent = null
            }
            return t.prototype.toString = function() {
                return "\u8def\u70b9\u50cf\u7d20\u5750\u6807\uff1a\uff08" + this._px + "," + this._py + "),  \u8def\u70b9\u4e16\u754c\u5750\u6807\uff1a\uff08" + this._cx + "," + this._cy + "),  \u8def\u70b9\u5e73\u9762\u76f4\u89d2\u5750\u6807\uff1a\uff08" + this._dx + "," + this._dy + ")"
            }, Object.defineProperty(t.prototype, "px", {
                get: function() {
                    return this._px
                },
                set: function(t) {
                    this._px = t
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "py", {
                get: function() {
                    return this._py
                },
                set: function(t) {
                    this._py = t
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "cx", {
                get: function() {
                    return this._cx
                },
                set: function(t) {
                    this._cx = t
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "cy", {
                get: function() {
                    return this._cy
                },
                set: function(t) {
                    this._cy = t
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "dx", {
                get: function() {
                    return this._dx
                },
                set: function(t) {
                    this._dx = t
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "dy", {
                get: function() {
                    return this._dy
                },
                set: function(t) {
                    this._dy = t
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "value", {
                get: function() {
                    return this._value
                },
                set: function(t) {
                    this._value = t
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "f", {
                get: function() {
                    return this._f
                },
                set: function(t) {
                    this._f = t
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "g", {
                get: function() {
                    return this._g
                },
                set: function(t) {
                    this._g = t
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "h", {
                get: function() {
                    return this._h
                },
                set: function(t) {
                    this._h = t
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(t.prototype, "parent", {
                get: function() {
                    return this._parent
                },
                set: function(t) {
                    this._parent = t
                },
                enumerable: !0,
                configurable: !0
            }), t
        }();
        i.default = o, cc._RF.pop()
    }, {}],
    RoadPointLayer: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "9138aY98exC5LeS2Jj6xd6Q", "RoadPointLayer"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../road/MapRoadUtils"),
            n = t("../base/MapType"),
            r = cc._decorator,
            a = r.ccclass,
            s = (r.property, function(t) {
                function e() {
                    var e = t.call(this) || this;
                    return e._roadPointDic = {}, e._roadNodeDic = {}, e._graphicDic = {}, e._roadTypeShowDic = {}, e._type = 1, e._gsize = 16, e.blockScale = .95, e
                }
                return __extends(e, t), e.prototype.onLoad = function() {
                    this._roadTypeShowDic[0] = !0, this._roadTypeShowDic[1] = !0, this._roadTypeShowDic[2] = !0, this._roadTypeShowDic[3] = !0, this._roadTypeShowDic[4] = !0, this._roadTypeShowDic[5] = !0, this._roadTypeShowDic[6] = !0, this._roadTypeShowDic[7] = !0, this._roadTypeShowDic[8] = !0, this._roadTypeShowDic[9] = !0
                }, e.prototype.initRoadPointInfo = function(t) {
                    if (this.clear(), t.roadDataArr && 0 != t.roadDataArr.length) {
                        for (var e = t.roadDataArr.length, i = t.roadDataArr[0].length, n = 0, r = 0, a = 0, s = 0; s < e; s++)
                            for (var h = 0; h < i; h++) {
                                n = t.roadDataArr[s][h], r = h, a = s;
                                var d = o.default.instance.getNodeByDerect(r, a);
                                d.value = n, 1 != d.value && (this._roadNodeDic[d.dx + "_" + d.dy] = d)
                            }
                        this.drawRointPoint()
                    }
                }, e.prototype.getRoadPointInfo = function() {
                    for (var t, e, i = o.default.instance.row, r = o.default.instance.col, a = [], s = o.default.instance.mapType == n.MapType.angle45 ? 2 * i : i, h = 0; h < s; h++) {
                        e = h, a[h] = [];
                        for (var d = 0; d < r; d++) t = d, null == this._roadNodeDic[t + "_" + e] ? a[h][d] = 1 : a[h][d] = this._roadNodeDic[t + "_" + e].value
                    }
                    return a
                }, e.prototype.drawRointPoint = function() {
                    var t = o.default.instance.row,
                        e = o.default.instance.col,
                        i = o.default.instance.mapType,
                        r = t / this._gsize;
                    i == n.MapType.angle45 && (r = 2 * t / this._gsize);
                    for (var a = e / this._gsize, s = 0; s < r; s++)
                        for (var h = 0; h < a; h++) {
                            var d = h,
                                c = s;
                            this.drawGraphic(d, c)
                        }
                }, e.prototype.drawGraphic = function(t, e, i) {
                    void 0 === i && (i = !0);
                    var n = t + "_" + e,
                        r = this.getGraphic(n);
                    i && r.clear();
                    for (var a = o.default.instance.halfNodeWidth, s = o.default.instance.halfNodeHeight, h = o.default.instance.mapType, d = "00ff0050", c = t * this._gsize, p = c + this._gsize, l = e * this._gsize, u = l + this._gsize, y = l; y < u; y++)
                        for (var _ = c; _ < p; _++) {
                            var f = this._roadNodeDic[_ + "_" + y];
                            f && this._roadTypeShowDic[f.value] && (0 == f.value ? d = "#00ff0050" : 1 == f.value ? d = "#d4d4d450" : 2 == f.value ? d = "#0000ff50" : 3 == f.value && (d = "#ffff0050"), 0 == h ? this.draw45AngleMapRoadPoint(r, f, d, a, s) : 1 == h ? this.draw90AngleMapRoadPoint(r, f, d, a, s) : 2 == h && this.drawHoneycombMapRoadPoint(r, f, d, a, s))
                        }
                }, e.prototype.getGraphic = function(t) {
                    if (!this._graphicDic[t]) {
                        var e = new cc.Node;
                        e.parent = this.node, e.position = cc.v2(0, 0);
                        var i = e.addComponent(cc.Graphics);
                        this._graphicDic[t] = i
                    }
                    return this._graphicDic[t]
                }, e.prototype.draw45AngleMapRoadPoint = function(t, e, i, o, n) {
                    t.fillColor.fromHEX(i), t.moveTo(-o * this.blockScale + e.px, 0 + e.py), t.lineTo(0 + e.px, -n * this.blockScale + e.py), t.lineTo(o * this.blockScale + e.px, 0 + e.py), t.lineTo(0 + e.px, n * this.blockScale + e.py), t.fill()
                }, e.prototype.draw90AngleMapRoadPoint = function(t, e, i, o, n) {
                    t.fillColor.fromHEX(i), t.rect(-o * this.blockScale + e.px, -n * this.blockScale + e.py, o * this.blockScale * 2, n * this.blockScale * 2), t.fill()
                }, e.prototype.drawHoneycombMapRoadPoint = function(t, e, i, n, r) {
                    t.fillColor.fromHEX(i);
                    var a = o.default.instance.nodeWidth * this.blockScale,
                        s = o.default.instance.nodeHeight * this.blockScale,
                        h = a / 4,
                        d = 3 * h,
                        c = s / 2,
                        p = -(2 * h),
                        l = -c;
                    t.moveTo(p + h + e.px, l + e.py), t.lineTo(p + d + e.px, l + e.py), t.lineTo(p + a + e.px, c + l + e.py), t.lineTo(p + d + e.px, s + l + e.py), t.lineTo(p + h + e.px, s + l + e.py), t.lineTo(p + 0 + e.px, c + l + e.py), t.lineTo(p + h + e.px, l + e.py), t.fill()
                }, e.prototype.addRoadPoint = function(t) {
                    this._roadNodeDic[t.dx + "_" + t.dy] = t;
                    var e = Math.floor(t.dx / this._gsize),
                        i = Math.floor(t.dy / this._gsize);
                    this.drawGraphic(e, i)
                }, e.prototype.addRoadPoints = function(t) {
                    for (var e = {}, i = 0; i < t.length; i++) {
                        this._roadNodeDic[t[i].dx + "_" + t[i].dy] = t[i];
                        var o = Math.floor(t[i].dx / this._gsize),
                            n = Math.floor(t[i].dy / this._gsize);
                        e[o + "_" + n] = [o, n]
                    }
                    for (var r in e) this.drawGraphic(e[r][0], e[r][1])
                }, e.prototype.removeRoadPoint = function(t) {
                    null != this._roadNodeDic[t.dx + "_" + t.dy] && (this._roadNodeDic[t.dx + "_" + t.dy] = null, delete this._roadNodeDic[t.dx + "_" + t.dy]);
                    var e = Math.floor(t.dx / this._gsize),
                        i = Math.floor(t.dy / this._gsize);
                    this.drawGraphic(e, i)
                }, e.prototype.removeRoadPoints = function(t) {
                    for (var e = {}, i = 0; i < t.length; i++) {
                        null != this._roadNodeDic[t[i].dx + "_" + t[i].dy] && (this._roadNodeDic[t[i].dx + "_" + t[i].dy] = null, delete this._roadNodeDic[t[i].dx + "_" + t[i].dy]);
                        var o = Math.floor(t[i].dx / this._gsize),
                            n = Math.floor(t[i].dy / this._gsize);
                        e[o + "_" + n] = [o, n]
                    }
                    for (var r in e) this.drawGraphic(e[r][0], e[r][1])
                }, e.prototype.changeRoadPointStyle = function() {
                    for (var t in this._type++, this._type = this._type % 3, this._roadPointDic) {
                        var e = this._roadPointDic[t];
                        e && e.reset(e.node, this._type)
                    }
                }, e.prototype.hiddenUnWalkAbleRoadPoint = function() {
                    var t, e;
                    if (h.hiddenUnWalkAble = !h.hiddenUnWalkAble, h.hiddenUnWalkAble)
                        for (t in this._roadPointDic)(e = this._roadPointDic[t]) && 1 == e.node.value && e.clear();
                    else
                        for (t in this._roadPointDic)(e = this._roadPointDic[t]) && 1 == e.node.value && e.reset(e.node, this._type)
                }, e.prototype.clear = function() {
                    for (var t in this._roadPointDic) this._roadPointDic[t].destroy(), this._roadPointDic[t] = null, delete this._roadPointDic[t];
                    for (var t in this._graphicDic) this._graphicDic[t] && (this._graphicDic[t].clear(), this._graphicDic[t].destroy(), this._graphicDic[t] = null, delete this._roadNodeDic[t]);
                    this._roadNodeDic = {}
                }, e = __decorate([a], e)
            }(cc.Component));
        i.default = s;
        var h = function(t) {
            function e(e, i) {
                void 0 === i && (i = 1);
                var o = t.call(this) || this;
                return o._color0 = "#00ff0090", o._color1 = "#d4d4d490", o._color2 = "#0000ff90", o._color3 = "#ffff0090", o._node = e, o._type = i, o.draw(e, i), o
            }
            return __extends(e, t), e.prototype.reset = function(t, e) {
                void 0 === e && (e = 1), this._node = t, this._type = e, this.draw(t, e)
            }, e.prototype.draw = function(t, i) {
                if (void 0 === i && (i = 1), this.clear(), !e.hiddenUnWalkAble || 1 != t.value) {
                    var n;
                    0 == t.value ? n = this._color0 : 1 == t.value ? n = this._color1 : 2 == t.value ? n = this._color2 : 3 == t.value && (n = this._color3);
                    var r = o.default.instance.halfNodeWidth,
                        a = o.default.instance.halfNodeHeight,
                        s = o.default.instance.mapType;
                    0 == s ? this.draw45AngleMapRoadPoint(i, n, r, a) : 1 == s ? this.draw90AngleMapRoadPoint(i, n, r, a) : 2 == s && this.drawHoneycombMapRoadPoint(i, n, r, a)
                }
            }, e.prototype.draw45AngleMapRoadPoint = function(t, e, i, o) {
                this.graphics.fillColor.fromHEX(e), 1 == t ? (this.graphics.moveTo(-(i - 1), 0), this.graphics.lineTo(0, -(o - 1)), this.graphics.lineTo(i - 1, 0), this.graphics.lineTo(0, o - 1)) : 2 == t ? this.graphics.rect(-o / 2, -o / 2, o, o) : this.graphics.circle(0, 0, i / 3), this.graphics.fill()
            }, e.prototype.draw90AngleMapRoadPoint = function(t, e, i, o) {
                this.graphics.fillColor.fromHEX(e), 1 == t ? this.graphics.rect(-(i - 1), -(o - 1), 2 * (i - 1), 2 * (o - 1)) : 2 == t ? this.graphics.rect(-i / 2, -o / 2, i, o) : this.graphics.circle(0, 0, i / 2), this.graphics.fill()
            }, e.prototype.drawHoneycombMapRoadPoint = function(t, e, i, n) {
                if (this.graphics.fillColor.fromHEX(e), 1 == t) {
                    var r = .95 * o.default.instance.nodeWidth,
                        a = .95 * o.default.instance.nodeHeight,
                        s = r / 4,
                        h = 3 * s,
                        d = a / 2,
                        c = -(2 * s),
                        p = -d;
                    this.graphics.moveTo(c + s, p), this.graphics.lineTo(c + h, p), this.graphics.lineTo(c + r, d + p), this.graphics.lineTo(c + h, a + p), this.graphics.lineTo(c + s, a + p), this.graphics.lineTo(c + 0, d + p), this.graphics.lineTo(c + s, p)
                } else 2 == t ? this.graphics.rect(-i / 2, -n / 2, i, n) : this.graphics.circle(0, 0, i / 2);
                this.graphics.fill()
            }, e.prototype.clear = function() {
                this.graphics.clear()
            }, Object.defineProperty(e.prototype, "node", {
                get: function() {
                    return this._node
                },
                set: function(t) {
                    this._node = t
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "type", {
                get: function() {
                    return this._type
                },
                set: function(t) {
                    this._type = t
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(e.prototype, "graphics", {
                get: function() {
                    return this._graphics || (this._graphics = this.addComponent(cc.Graphics)), this._graphics
                },
                enumerable: !0,
                configurable: !0
            }), e
        }(cc.Node);
        cc._RF.pop()
    }, {
        "../base/MapType": "MapType",
        "../road/MapRoadUtils": "MapRoadUtils"
    }],
    SceneMap: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "85ddcD3jSxBu5hvMsAKj2Q6", "SceneMap"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("../layer/MapLayer"),
            n = t("../layer/GridLayer"),
            r = t("../layer/RoadPointLayer"),
            a = t("../layer/EntityLayer"),
            s = t("../road/MapRoadUtils"),
            h = t("../road/AstarHoneycombRoadSeeker"),
            d = t("../road/AStarRoadSeeker"),
            c = t("../charactor/Charactor"),
            p = t("../editor/MapEditor"),
            l = cc._decorator,
            u = l.ccclass,
            y = l.property,
            _ = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.layer = null, e.mapLayer = null, e.gridLayer = null, e.roadPointLayer = null, e.entityLayer = null, e.player = null, e.container = null, e._roadDic = {}, e._startDrag = !1, e._containerScrollX = 0, e._containerScrollY = 0, e.isFollowPlayer = !1, e.isLookSeekRoad = !1, e.targetPos = cc.Vec2.ZERO, e._testSeekPathGraphic = null, e
                }
                return __extends(e, t), Object.defineProperty(e.prototype, "testSeekPathGraphic", {
                    get: function() {
                        return this._testSeekPathGraphic
                    },
                    enumerable: !0,
                    configurable: !0
                }), e.prototype.start = function() {
                    this.player.sceneMap = this, this.player.node.on(cc.Node.EventType.MOUSE_DOWN, this.onPlayerMouseDown, this), this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMapMouseDown, this), this.node.on(cc.Node.EventType.MOUSE_UP, this.onMapMouseUp, this), this.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMapMouseMove, this), this.container.on(cc.Node.EventType.MOUSE_ENTER, this.onMapMouseEnter, this, !0), this.container.on(cc.Node.EventType.MOUSE_LEAVE, this.onMapMouseLeave, this, !0);
                    var t = new cc.Node;
                    t.anchorX = 0, t.anchorY = 0, this.layer.addChild(t), this._testSeekPathGraphic = t.addComponent(cc.Graphics)
                }, e.prototype.init = function(t) {
                    var e = p.default.instance.editArea.mapLayer.bgImage;
                    this.mapLayer.init(t.mapWidth, t.mapHeight, 256, 256, e.spriteFrame.getTexture()), this.gridLayer.drawGrid(t.mapWidth, t.mapHeight, t.nodeWidth, t.nodeHeight, t.type), this.roadPointLayer.initRoadPointInfo(t);
                    for (var i = t.roadDataArr.length, o = t.roadDataArr[0].length, n = 0, r = 0, a = 0, l = 0; l < i; l++)
                        for (var u = 0; u < o; u++) {
                            n = t.roadDataArr[l][u], r = u, a = l;
                            var y = s.default.instance.getNodeByDerect(r, a);
                            y.value = n, this._roadDic[y.cx + "_" + y.cy] = y
                        }
                    2 == t.type ? this._roadSeeker = new h.default(this._roadDic) : this._roadSeeker = new d.default(this._roadDic), this.node.width = this.mapLayer.width, this.node.height = this.mapLayer.height, this.player.stop(), this.player.state = c.CharactorState.sitdown, this.player.direction = 0, this.player.node.x = 495, this.player.node.y = 250, this.node.x = 0, this.node.y = 0
                }, e.prototype.getMapNodeByPixel = function(t, e) {
                    var i = s.default.instance.getWorldPointByPixel(t, e);
                    return this._roadDic[i.x + "_" + i.y]
                }, e.prototype.onPlayerMouseDown = function(t) {
                    this._startDrag = !0, t.stopPropagation()
                }, e.prototype.onMapMouseDown = function(t) {
                    var e = this.node.convertToNodeSpaceAR(t.getLocation());
                    this.isLookSeekRoad ? this.testSeekRood(e.x, e.y) : this.movePlayer(e.x, e.y)
                }, e.prototype.onMapMouseUp = function(t) {
                    this._startDrag = !1
                }, e.prototype.onMapMouseMove = function(t) {
                    if (this._startDrag) {
                        this.player.stop();
                        var e = this.node.convertToNodeSpaceAR(t.getLocation());
                        this.player.node.position = e
                    }
                }, e.prototype.onMapMouseEnter = function(t) {
                    this.container.hasEventListener(cc.Node.EventType.MOUSE_MOVE) || this.container.on(cc.Node.EventType.MOUSE_MOVE, this.onMapContainerMouseMove, this)
                }, e.prototype.onMapMouseLeave = function(t) {
                    this.container.hasEventListener(cc.Node.EventType.MOUSE_MOVE) && this.container.off(cc.Node.EventType.MOUSE_MOVE, this.onMapContainerMouseMove, this), this._containerScrollX = 0, this._containerScrollY = 0
                }, e.prototype.onMapContainerMouseMove = function(t) {
                    var e = this.container.convertToNodeSpaceAR(t.getLocation()),
                        i = this.container.width - 80,
                        o = this.container.height - 80;
                    this._containerScrollX = 0, this._containerScrollY = 0, e.x < 80 ? this._containerScrollX = -25 : e.x > i && (this._containerScrollX = 25), e.y < 80 ? this._containerScrollY = -25 : e.y > o && (this._containerScrollY = 25)
                }, e.prototype.scrollSceneMap = function() {
                    var t = this.container.width,
                        e = this.container.height,
                        i = this.node.width,
                        o = this.node.height;
                    i <= this.container.width ? this.node.x = 0 : (this.node.x -= this._containerScrollX, this.node.x > 0 ? this.node.x = 0 : this.node.x < -(i - t) && (this.node.x = -(i - t))), o <= this.container.height ? this.node.y = 0 : (this.node.y -= this._containerScrollY, this.node.y > 0 ? this.node.y = 0 : this.node.y < -(o - e) && (this.node.y = -(o - e)))
                }, e.prototype.followPlayer = function(t) {
                    this.targetPos.x = -(this.player.node.x - this.container.width / 2), this.targetPos.y = -(this.player.node.y - this.container.height / 2);
                    var e = this.node.width - this.container.width,
                        i = this.node.height - this.container.height;
                    e <= 0 ? this.targetPos.x = 0 : this.targetPos.x > 0 ? this.targetPos.x = 0 : this.targetPos.x < -e && (this.targetPos.x = -e), i <= 0 ? this.targetPos.y = 0 : this.targetPos.y > 0 ? this.targetPos.y = 0 : this.targetPos.y < -i && (this.targetPos.y = -i), this.node.position.lerp(this.targetPos, 2 * t, this.targetPos), this.node.position = this.targetPos
                }, e.prototype.movePlayer = function(t, e) {
                    var i = s.default.instance.getWorldPointByPixel(this.player.node.x, this.player.node.y),
                        o = s.default.instance.getWorldPointByPixel(t, e),
                        n = this._roadDic[i.x + "_" + i.y],
                        r = this._roadDic[o.x + "_" + o.y],
                        a = this._roadSeeker.seekPath(n, r);
                    a.length > 0 && this.player.walkByRoad(a)
                }, e.prototype.testSeekRood = function(t, e) {
                    this.player.stop();
                    var i = s.default.instance.getWorldPointByPixel(this.player.node.x, this.player.node.y),
                        o = s.default.instance.getWorldPointByPixel(t, e),
                        n = this._roadDic[i.x + "_" + i.y],
                        r = this._roadDic[o.x + "_" + o.y];
                    this._roadSeeker.testSeekPathStep(n, r, this.testSeekRoadCallback, this, 100)
                }, e.prototype.testSeekRoadCallback = function(t, e, i, o, n, r) {
                    var a, s, h = this;
                    if (this._testSeekPathGraphic.clear(), r) {
                        for (this._testSeekPathGraphic.lineWidth = 4, this._testSeekPathGraphic.strokeColor.fromHEX("#2b2b2b"), this._testSeekPathGraphic.fillColor.fromHEX("#ffcc00"), s = 0; s < r.length; s++) a = r[s], this._testSeekPathGraphic.circle(a.px, a.py, 10);
                        this._testSeekPathGraphic.fill(), this._testSeekPathGraphic.unscheduleAllCallbacks(), s = 0, this._testSeekPathGraphic.schedule(function() {
                            h._testSeekPathGraphic.moveTo(r[s].px, r[s].py), h._testSeekPathGraphic.lineTo(r[s + 1].px, r[s + 1].py), h._testSeekPathGraphic.stroke(), s++
                        }, .1, r.length - 2, 0), this.player.walkByRoad(r)
                    } else {
                        for (this._testSeekPathGraphic.fillColor.fromHEX("#d4d4d4"), s = 0; s < o.length; s++) a = o[s], this._testSeekPathGraphic.circle(a.px, a.py, 10);
                        for (this._testSeekPathGraphic.fill(), this._testSeekPathGraphic.fillColor.fromHEX("#ffcc00"), s = 0; s < n.length; s++) a = n[s], this._testSeekPathGraphic.circle(a.px, a.py, 10);
                        this._testSeekPathGraphic.fill()
                    }
                }, e.prototype.update = function(t) {
                    this.isFollowPlayer ? this._startDrag || this.followPlayer(t) : this.scrollSceneMap()
                }, __decorate([y(cc.Node)], e.prototype, "layer", void 0), __decorate([y(o.default)], e.prototype, "mapLayer", void 0), __decorate([y(n.default)], e.prototype, "gridLayer", void 0), __decorate([y(r.default)], e.prototype, "roadPointLayer", void 0), __decorate([y(a.default)], e.prototype, "entityLayer", void 0), __decorate([y(c.default)], e.prototype, "player", void 0), __decorate([y(cc.Node)], e.prototype, "container", void 0), e = __decorate([u], e)
            }(cc.Component);
        i.default = _, cc._RF.pop()
    }, {
        "../charactor/Charactor": "Charactor",
        "../editor/MapEditor": "MapEditor",
        "../layer/EntityLayer": "EntityLayer",
        "../layer/GridLayer": "GridLayer",
        "../layer/MapLayer": "MapLayer",
        "../layer/RoadPointLayer": "RoadPointLayer",
        "../road/AStarRoadSeeker": "AStarRoadSeeker",
        "../road/AstarHoneycombRoadSeeker": "AstarHoneycombRoadSeeker",
        "../road/MapRoadUtils": "MapRoadUtils"
    }],
    TeachView: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "96cae0iqiRKAqRfzDroU7OA", "TeachView"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("./BaseView"),
            n = cc._decorator,
            r = n.ccclass,
            a = n.property,
            s = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.videoPlayer = null, e.loadingPanel = null, e.loadingTxt = null, e.index = 0, e.arr = [".", "..", "..."], e.time = 0, e.vpClip = null, e
                }
                return __extends(e, t), e.prototype.start = function() {}, e.prototype.update = function(t) {
                    this.vpClip || (this.time -= t, this.time <= 0 && (this.time = .25, this.index++, this.index %= this.arr.length, this.loadingTxt.string = "Loading" + this.arr[this.index]))
                }, e.prototype.playVideo = function() {
                    var t = this;
                    this.vpClip ? (this.loadingPanel.active = !1, this.videoPlayer.clip = this.vpClip, this.videoPlayer.play()) : (this.loadingPanel.active = !0, cc.loader.loadRes("Teach", function(e, i) {
                        t.loadingPanel.active = !1, t.vpClip = i, t.videoPlayer.clip = t.vpClip, t.videoPlayer.play()
                    }))
                }, e.prototype.stopVideo = function() {
                    this.videoPlayer.stop()
                }, e.prototype.open = function() {
                    t.prototype.open.call(this), this.playVideo()
                }, e.prototype.close = function() {
                    t.prototype.close.call(this), this.stopVideo()
                }, __decorate([a(cc.VideoPlayer)], e.prototype, "videoPlayer", void 0), __decorate([a(cc.Node)], e.prototype, "loadingPanel", void 0), __decorate([a(cc.Label)], e.prototype, "loadingTxt", void 0), e = __decorate([r], e)
            }(o.default);
        i.default = s, cc._RF.pop()
    }, {
        "./BaseView": "BaseView"
    }],
    TestView: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "fb67dZSfaNB8oFzxgVa/A/+", "TestView"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = t("./SceneMap"),
            n = t("../editor/MapEditor"),
            r = t("../road/MapRoadUtils"),
            a = cc._decorator,
            s = a.ccclass,
            h = a.property,
            d = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.sceneMap = null, e.closeBtn = null, e.pixelInfoTxt = null, e.gridInfoTxt = null, e.worldInfoTxt = null, e.msBtn = null, e.rsBtn = null, e.esBtn = null, e.gsBtn = null, e.minMapBtn = null, e.followBtn = null, e.lookSeekBtn = null, e
                }
                return __extends(e, t), e.prototype.start = function() {
                    var t = this;
                    this.closeBtn.on(cc.Node.EventType.TOUCH_START, function(e) {
                        t.close()
                    }, this), this.sceneMap.node.on(cc.Node.EventType.MOUSE_MOVE, this.onShowRoadMsg, this)
                }, e.prototype.init = function(t) {
                    this.sceneMap.init(t), this.sceneMap.mapLayer.node.active = !0, this.msBtn.getComponentInChildren(cc.Label).string = this.sceneMap.mapLayer.node.active ? "\u9690\u85cf\u5730\u56fe(U)" : "\u663e\u793a\u5730\u56fe(U)", this.sceneMap.entityLayer.node.active = !0, this.esBtn.getComponentInChildren(cc.Label).string = this.sceneMap.entityLayer.node.active ? "\u9690\u85cf\u7269\u4f53(O)" : "\u663e\u793a\u7269\u4f53(O)", this.sceneMap.roadPointLayer.node.active = !0, this.rsBtn.getComponentInChildren(cc.Label).string = this.sceneMap.roadPointLayer.node.active ? "\u9690\u85cf\u8def\u70b9(I)" : "\u663e\u793a\u8def\u70b9(I)", this.sceneMap.gridLayer.node.active = !0, this.gsBtn.getComponentInChildren(cc.Label).string = this.sceneMap.gridLayer.node.active ? "\u9690\u85cf\u7f51\u683c(P)" : "\u663e\u793a\u7f51\u683c(P)"
                }, e.prototype.onShowRoadMsg = function(t) {
                    var e = this.sceneMap.node.convertToNodeSpaceAR(t.getLocation()),
                        i = r.default.instance.getNodeByPixel(e.x, e.y);
                    this.pixelInfoTxt.string = "(" + i.px + "," + i.py + ")", this.gridInfoTxt.string = "(" + i.dx + "," + i.dy + ")", this.worldInfoTxt.string = "(" + i.cx + "," + i.cy + ")"
                }, e.prototype.showMapLayer = function(t) {
                    this.sceneMap.mapLayer.node.active = !this.sceneMap.mapLayer.node.active, this.msBtn.getComponentInChildren(cc.Label).string = this.sceneMap.mapLayer.node.active ? "\u9690\u85cf\u5730\u56fe(U)" : "\u663e\u793a\u5730\u56fe(U)"
                }, e.prototype.showEntityLayer = function(t) {
                    this.sceneMap.entityLayer.node.active = !this.sceneMap.entityLayer.node.active, this.esBtn.getComponentInChildren(cc.Label).string = this.sceneMap.entityLayer.node.active ? "\u9690\u85cf\u7269\u4f53(O)" : "\u663e\u793a\u7269\u4f53(O)"
                }, e.prototype.showRoadLayer = function(t) {
                    this.sceneMap.roadPointLayer.node.active = !this.sceneMap.roadPointLayer.node.active, this.rsBtn.getComponentInChildren(cc.Label).string = this.sceneMap.roadPointLayer.node.active ? "\u9690\u85cf\u8def\u70b9(I)" : "\u663e\u793a\u8def\u70b9(I)"
                }, e.prototype.showGridLayer = function(t) {
                    this.sceneMap.gridLayer.node.active = !this.sceneMap.gridLayer.node.active, this.gsBtn.getComponentInChildren(cc.Label).string = this.sceneMap.gridLayer.node.active ? "\u9690\u85cf\u7f51\u683c(P)" : "\u663e\u793a\u7f51\u683c(P)"
                }, e.prototype.showMinMap = function(t) {}, e.prototype.sceneScrollByPlayer = function(t) {
                    this.sceneMap.isFollowPlayer = !this.sceneMap.isFollowPlayer, this.followBtn.getComponentInChildren(cc.Label).string = this.sceneMap.isFollowPlayer ? "\u5c4f\u5e55\u4e0d\u8ddf\u968f\u73a9\u5bb6(F3)" : "\u5c4f\u5e55\u8ddf\u968f\u73a9\u5bb6(F3)"
                }, e.prototype.lookSeekRoad = function(t) {
                    this.sceneMap.isLookSeekRoad = !this.sceneMap.isLookSeekRoad, this.lookSeekBtn.getComponentInChildren(cc.Label).string = this.sceneMap.isLookSeekRoad ? "\u6b63\u5e38\u5bfb\u8def(F4)" : "\u67e5\u770b\u5bfb\u8def\u8fc7\u7a0b(F4)", !this.sceneMap.isLookSeekRoad && this.sceneMap.testSeekPathGraphic.clear()
                }, e.prototype.open = function() {
                    this.node.active = !0
                }, e.prototype.close = function() {
                    this.node.active = !1, n.default.instance.open()
                }, __decorate([h(o.default)], e.prototype, "sceneMap", void 0), __decorate([h(cc.Node)], e.prototype, "closeBtn", void 0), __decorate([h(cc.Label)], e.prototype, "pixelInfoTxt", void 0), __decorate([h(cc.Label)], e.prototype, "gridInfoTxt", void 0), __decorate([h(cc.Label)], e.prototype, "worldInfoTxt", void 0), __decorate([h(cc.Button)], e.prototype, "msBtn", void 0), __decorate([h(cc.Button)], e.prototype, "rsBtn", void 0), __decorate([h(cc.Button)], e.prototype, "esBtn", void 0), __decorate([h(cc.Button)], e.prototype, "gsBtn", void 0), __decorate([h(cc.Button)], e.prototype, "minMapBtn", void 0), __decorate([h(cc.Button)], e.prototype, "followBtn", void 0), __decorate([h(cc.Button)], e.prototype, "lookSeekBtn", void 0), e = __decorate([s], e)
            }(cc.Component);
        i.default = d, cc._RF.pop()
    }, {
        "../editor/MapEditor": "MapEditor",
        "../road/MapRoadUtils": "MapRoadUtils",
        "./SceneMap": "SceneMap"
    }],
    Tile: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "d14c5BWpXNA5IOxPZnbtOTT", "Tile"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o, n = cc._decorator,
            r = n.ccclass,
            a = n.property;
        (function(t) {
            t[t.none = 0] = "none", t[t.box = 1] = "box", t[t.cube = 2] = "cube"
        })(o = i.TileType || (i.TileType = {}));
        var s = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.type = o.none, e.row = 0, e.col = 0, e
            }
            return __extends(e, t), e.prototype.onLoad = function() {
                this.col = Math.floor(this.node.x / 100), this.row = Math.floor(this.node.y / 100), this.node.x = Math.floor(100 * (this.col + 1) - 50), this.node.y = Math.floor(100 * (this.row + 1) - 50)
            }, e.prototype.start = function() {}, e.prototype.getKey = function() {
                return this.node.name
            }, e.prototype.awake = function() {
                this.node.active = !0, this.node.angle = 0, this.node.position = cc.Vec2.ZERO, this.node.color = cc.Color.WHITE, this.node.opacity = 255, this.node.scale = 1
            }, e.prototype.sleep = function() {
                this.node.stopAllActions(), this.node.parent = null, this.node.active = !1
            }, e.prototype.destroySelf = function() {}, __decorate([a({
                type: cc.Enum(o)
            })], e.prototype, "type", void 0), e = __decorate([r], e)
        }(cc.Component);
        i.default = s, cc._RF.pop()
    }, {}],
    WebFileHandler: [function(t, e, i) {
        "use strict";
        cc._RF.push(e, "2903eoAE3tGy65P07/1s0+t", "WebFileHandler"), Object.defineProperty(i, "__esModule", {
            value: !0
        });
        var o = cc._decorator,
            n = o.ccclass,
            r = (o.property, function() {
                function t() {
                    this.loadComplete = null, this.file = null, this.fileType = 0, this.init()
                }
                return t.prototype.init = function() {
                    var t = this;
                    this._fileInput = document.createElement("input"), this._fileInput.id = "finput", this._fileInput.type = "file", this._fileInput.accept = "image/*", this._fileInput.style.height = "0px", this._fileInput.style.display = "block", this._fileInput.style.overflow = "hidden", document.body.insertBefore(this._fileInput, document.body.firstChild), this._fileInput.addEventListener("change", function(e) {
                        t.onSelectFile(e)
                    }, !1)
                }, t.prototype.openImageWin = function(t) {
                    var e = this;
                    this.fileType = 0, this._fileInput.accept = "image/png,image/jpeg", this.loadComplete = t, setTimeout(function() {
                        e._fileInput.click()
                    }, 100)
                }, t.prototype.openTextWin = function(t) {
                    var e = this;
                    this.fileType = 1, this._fileInput.accept = "application/json", this.loadComplete = t, setTimeout(function() {
                        e._fileInput.click()
                    }, 100)
                }, t.prototype.onSelectFile = function(t) {
                    if (this.file = t.target.files[0], 0 == this.fileType) {
                        var e = this.createObjectURL(this.file);
                        this.loadLocalImg(e)
                    } else 1 == this.fileType && this.loadLocalText(this.file)
                }, t.prototype.loadLocalImg = function(t) {
                    var e = this;
                    this._img || (this._img = document.getElementById("f_img"), this._img || (this._img = document.createElement("img"), this._img.id = "f_img"), this._img.onload = function() {
                        var t = new cc.Texture2D;
                        t.initWithElement(e._img), t.handleLoadedTexture(), e.loadComplete && e.loadComplete(t, e.file)
                    }), this._img.src = t
                }, t.prototype.loadLocalText = function(t) {
                    var e = this,
                        i = new FileReader;
                    i.readAsText(t, "utf-8"), i.onprogress = function(t) {
                        cc.log("pg =", t.loaded)
                    }, i.onload = function() {
                        e.loadComplete && e.loadComplete(i.result, e.file)
                    }
                }, t.prototype.createObjectURL = function(t) {
                    return void 0 != window.URL ? window.URL.createObjectURL(t) : window.webkitURL.createObjectURL(t)
                }, t = __decorate([n], t)
            }());
        i.default = r, cc._RF.pop()
    }, {}]
}, {}, ["GameLoop", "Enemy", "EnemyAI", "MapData", "MapParams", "MapType", "Charactor", "MovieClip", "BaseView", "EditArea", "EditUI", "MapEditor", "MiniMapView", "NewMapView", "OpenMapView", "TeachView", "WebFileHandler", "EntityLayer", "GridLayer", "MapLayer", "RoadPointLayer", "KeyBoardExecute", "AStarRoadSeeker", "AstarHoneycombRoadSeeker", "IRoadSeeker", "MapRoadUtils", "Point", "RoadNode", "SceneMap", "TestView", "Tile"]);