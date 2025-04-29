import React, { useState, useEffect, useCallback } from 'react';

function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}
function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}
function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function () {
    return e;
  };
  var t,
    e = {},
    r = Object.prototype,
    n = r.hasOwnProperty,
    o = Object.defineProperty || function (t, e, r) {
      t[e] = r.value;
    },
    i = "function" == typeof Symbol ? Symbol : {},
    a = i.iterator || "@@iterator",
    c = i.asyncIterator || "@@asyncIterator",
    u = i.toStringTag || "@@toStringTag";
  function define(t, e, r) {
    return Object.defineProperty(t, e, {
      value: r,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), t[e];
  }
  try {
    define({}, "");
  } catch (t) {
    define = function (t, e, r) {
      return t[e] = r;
    };
  }
  function wrap(t, e, r, n) {
    var i = e && e.prototype instanceof Generator ? e : Generator,
      a = Object.create(i.prototype),
      c = new Context(n || []);
    return o(a, "_invoke", {
      value: makeInvokeMethod(t, r, c)
    }), a;
  }
  function tryCatch(t, e, r) {
    try {
      return {
        type: "normal",
        arg: t.call(e, r)
      };
    } catch (t) {
      return {
        type: "throw",
        arg: t
      };
    }
  }
  e.wrap = wrap;
  var h = "suspendedStart",
    l = "suspendedYield",
    f = "executing",
    s = "completed",
    y = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var p = {};
  define(p, a, function () {
    return this;
  });
  var d = Object.getPrototypeOf,
    v = d && d(d(values([])));
  v && v !== r && n.call(v, a) && (p = v);
  var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p);
  function defineIteratorMethods(t) {
    ["next", "throw", "return"].forEach(function (e) {
      define(t, e, function (t) {
        return this._invoke(e, t);
      });
    });
  }
  function AsyncIterator(t, e) {
    function invoke(r, o, i, a) {
      var c = tryCatch(t[r], t, o);
      if ("throw" !== c.type) {
        var u = c.arg,
          h = u.value;
        return h && "object" == typeof h && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) {
          invoke("next", t, i, a);
        }, function (t) {
          invoke("throw", t, i, a);
        }) : e.resolve(h).then(function (t) {
          u.value = t, i(u);
        }, function (t) {
          return invoke("throw", t, i, a);
        });
      }
      a(c.arg);
    }
    var r;
    o(this, "_invoke", {
      value: function (t, n) {
        function callInvokeWithMethodAndArg() {
          return new e(function (e, r) {
            invoke(t, n, e, r);
          });
        }
        return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(e, r, n) {
    var o = h;
    return function (i, a) {
      if (o === f) throw Error("Generator is already running");
      if (o === s) {
        if ("throw" === i) throw a;
        return {
          value: t,
          done: !0
        };
      }
      for (n.method = i, n.arg = a;;) {
        var c = n.delegate;
        if (c) {
          var u = maybeInvokeDelegate(c, n);
          if (u) {
            if (u === y) continue;
            return u;
          }
        }
        if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) {
          if (o === h) throw o = s, n.arg;
          n.dispatchException(n.arg);
        } else "return" === n.method && n.abrupt("return", n.arg);
        o = f;
        var p = tryCatch(e, r, n);
        if ("normal" === p.type) {
          if (o = n.done ? s : l, p.arg === y) continue;
          return {
            value: p.arg,
            done: n.done
          };
        }
        "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg);
      }
    };
  }
  function maybeInvokeDelegate(e, r) {
    var n = r.method,
      o = e.iterator[n];
    if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y;
    var i = tryCatch(o, e.iterator, r.arg);
    if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y;
    var a = i.arg;
    return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y);
  }
  function pushTryEntry(t) {
    var e = {
      tryLoc: t[0]
    };
    1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e);
  }
  function resetTryEntry(t) {
    var e = t.completion || {};
    e.type = "normal", delete e.arg, t.completion = e;
  }
  function Context(t) {
    this.tryEntries = [{
      tryLoc: "root"
    }], t.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(e) {
    if (e || "" === e) {
      var r = e[a];
      if (r) return r.call(e);
      if ("function" == typeof e.next) return e;
      if (!isNaN(e.length)) {
        var o = -1,
          i = function next() {
            for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next;
            return next.value = t, next.done = !0, next;
          };
        return i.next = i;
      }
    }
    throw new TypeError(typeof e + " is not iterable");
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), o(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) {
    var e = "function" == typeof t && t.constructor;
    return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name));
  }, e.mark = function (t) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t;
  }, e.awrap = function (t) {
    return {
      __await: t
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () {
    return this;
  }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) {
    void 0 === i && (i = Promise);
    var a = new AsyncIterator(wrap(t, r, n, o), i);
    return e.isGeneratorFunction(r) ? a : a.next().then(function (t) {
      return t.done ? t.value : a.next();
    });
  }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () {
    return this;
  }), define(g, "toString", function () {
    return "[object Generator]";
  }), e.keys = function (t) {
    var e = Object(t),
      r = [];
    for (var n in e) r.push(n);
    return r.reverse(), function next() {
      for (; r.length;) {
        var t = r.pop();
        if (t in e) return next.value = t, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, e.values = values, Context.prototype = {
    constructor: Context,
    reset: function (e) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t);
    },
    stop: function () {
      this.done = !0;
      var t = this.tryEntries[0].completion;
      if ("throw" === t.type) throw t.arg;
      return this.rval;
    },
    dispatchException: function (e) {
      if (this.done) throw e;
      var r = this;
      function handle(n, o) {
        return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o;
      }
      for (var o = this.tryEntries.length - 1; o >= 0; --o) {
        var i = this.tryEntries[o],
          a = i.completion;
        if ("root" === i.tryLoc) return handle("end");
        if (i.tryLoc <= this.prev) {
          var c = n.call(i, "catchLoc"),
            u = n.call(i, "finallyLoc");
          if (c && u) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          } else if (c) {
            if (this.prev < i.catchLoc) return handle(i.catchLoc, !0);
          } else {
            if (!u) throw Error("try statement without catch or finally");
            if (this.prev < i.finallyLoc) return handle(i.finallyLoc);
          }
        }
      }
    },
    abrupt: function (t, e) {
      for (var r = this.tryEntries.length - 1; r >= 0; --r) {
        var o = this.tryEntries[r];
        if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
          var i = o;
          break;
        }
      }
      i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
      var a = i ? i.completion : {};
      return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a);
    },
    complete: function (t, e) {
      if ("throw" === t.type) throw t.arg;
      return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y;
    },
    finish: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y;
      }
    },
    catch: function (t) {
      for (var e = this.tryEntries.length - 1; e >= 0; --e) {
        var r = this.tryEntries[e];
        if (r.tryLoc === t) {
          var n = r.completion;
          if ("throw" === n.type) {
            var o = n.arg;
            resetTryEntry(r);
          }
          return o;
        }
      }
      throw Error("illegal catch attempt");
    },
    delegateYield: function (e, r, n) {
      return this.delegate = {
        iterator: values(e),
        resultName: r,
        nextLoc: n
      }, "next" === this.method && (this.arg = t), y;
    }
  }, e;
}
function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return _arrayLikeToArray(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
  }
}

function ReactDataTable(_ref) {
  var dataSource = _ref.dataSource,
    columns = _ref.columns,
    _ref$loading = _ref.loading,
    loading = _ref$loading === void 0 ? false : _ref$loading,
    _ref$maxHeight = _ref.maxHeight,
    maxHeight = _ref$maxHeight === void 0 ? "600px" : _ref$maxHeight,
    _ref$height = _ref.height,
    height = _ref$height === void 0 ? "600px" : _ref$height,
    _ref$showCheckbox = _ref.showCheckbox,
    showCheckbox = _ref$showCheckbox === void 0 ? false : _ref$showCheckbox,
    onSelectionChange = _ref.onSelectionChange,
    _ref$defaultLimit = _ref.defaultLimit,
    defaultLimit = _ref$defaultLimit === void 0 ? 50 : _ref$defaultLimit,
    onRowClick = _ref.onRowClick,
    _ref$livePagination = _ref.livePagination,
    livePagination = _ref$livePagination === void 0 ? false : _ref$livePagination,
    _ref$staticData = _ref.staticData,
    staticData = _ref$staticData === void 0 ? null : _ref$staticData,
    emptyText = _ref.emptyText,
    _ref$rowHeights = _ref.rowHeights,
    rowHeights = _ref$rowHeights === void 0 ? 40 : _ref$rowHeights,
    _ref$headerProps = _ref.headerProps,
    headerProps = _ref$headerProps === void 0 ? {} : _ref$headerProps,
    _ref$selected = _ref.selected,
    selected = _ref$selected === void 0 ? {} : _ref$selected,
    _ref$showSelectAllChe = _ref.showSelectAllCheckbox,
    showSelectAllCheckbox = _ref$showSelectAllChe === void 0 ? true : _ref$showSelectAllChe,
    _ref$rowStyle = _ref.rowStyle,
    rowStyle = _ref$rowStyle === void 0 ? {} : _ref$rowStyle,
    _ref$rowClassName = _ref.rowClassName,
    rowClassName = _ref$rowClassName === void 0 ? "" : _ref$rowClassName;
  var tableContainerRef = React.useRef(null);
  var _React$useState = React.useState({
      pages: [],
      meta: {
        totalPages: 1
      }
    }),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    data = _React$useState2[0],
    setData = _React$useState2[1];
  var _React$useState3 = React.useState(false),
    _React$useState4 = _slicedToArray(_React$useState3, 2),
    isFetching = _React$useState4[0],
    setIsFetching = _React$useState4[1];
  var _React$useState5 = React.useState(1),
    _React$useState6 = _slicedToArray(_React$useState5, 2),
    pageParam = _React$useState6[0],
    setPageParam = _React$useState6[1];
  var _React$useState7 = React.useState(selected),
    _React$useState8 = _slicedToArray(_React$useState7, 2),
    selectedRows = _React$useState8[0],
    setSelectedRows = _React$useState8[1];
  var previousSelected = React.useRef(selected);
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    resizingIndex = _useState2[0],
    setResizingIndex = _useState2[1];
  var _useState3 = useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    columnWidths = _useState4[0],
    setColumnWidths = _useState4[1];
  var _useState5 = useState(null),
    _useState6 = _slicedToArray(_useState5, 2),
    startX = _useState6[0],
    setStartX = _useState6[1];
  var _useState7 = useState(null),
    _useState8 = _slicedToArray(_useState7, 2),
    initialWidth = _useState8[0],
    setInitialWidth = _useState8[1];
  var _useState9 = useState(0),
    _useState10 = _slicedToArray(_useState9, 2);
    _useState10[0];
    var setTableWidth = _useState10[1];
  // Ref to store column widths to ensure persistence during data loading
  var persistedColumnWidthsRef = React.useRef([]);
  var flatData = data.pages.flatMap(function (page) {
    return page.data;
  });
  var checkboxColumn = {
    id: 'select',
    size: 50,
    minWidth: 50,
    resizable: false,
    textAlign: "center",
    header: function header(_ref2) {
      var data = _ref2.data;
      var allSelected = flatData.length > 0 && flatData.every(function (row) {
        return selectedRows[row.id];
      });
      var someSelected = flatData.some(function (row) {
        return selectedRows[row.id];
      }) && !allSelected;
      return /*#__PURE__*/React.createElement("div", {
        className: "flex items-center justify-center h-[40px]"
      }, showSelectAllCheckbox && /*#__PURE__*/React.createElement("div", {
        className: "relative"
      }, /*#__PURE__*/React.createElement("input", {
        id: data.id,
        type: "checkbox",
        className: "bg-gray-700 rounded-4 border-gray-200 text-blue-400 focus:ring-0 focus:ring-white",
        checked: allSelected,
        onChange: function onChange(e) {
          return handleSelectAll(e.target.checked, flatData);
        }
      }), allSelected ? /*#__PURE__*/React.createElement("svg", {
        className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none text-white",
        viewBox: "0 0 20 20",
        fill: "currentColor"
      }, /*#__PURE__*/React.createElement("path", {
        fillRule: "evenodd",
        d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
        clipRule: "evenodd"
      })) : someSelected && /*#__PURE__*/React.createElement("svg", {
        className: "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 pointer-events-none ",
        viewBox: "0 0 20 20",
        fill: "currentColor"
      }, /*#__PURE__*/React.createElement("path", {
        fillRule: "evenodd",
        d: "M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z",
        clipRule: "evenodd"
      }))));
    },
    cell: function cell(_ref3) {
      var row = _ref3.row;
      return /*#__PURE__*/React.createElement("div", {
        className: "flex items-center justify-center h-[40px]",
        onClick: function onClick(e) {
          return e.stopPropagation();
        }
      }, /*#__PURE__*/React.createElement("input", {
        id: row.id,
        type: "checkbox",
        className: "bg-gray-700 rounded-4 border-gray-200 text-blue-400 focus:ring-0 focus:ring-white",
        checked: !!selectedRows[row.id],
        onClick: function onClick(e) {
          return e.stopPropagation();
        },
        onChange: function onChange(e) {
          e.stopPropagation();
          handleSelectRow(e.target.checked, row, flatData);
        }
      }));
    }
  };
  var enhancedColumns = showCheckbox ? [checkboxColumn].concat(_toConsumableArray(columns)) : columns;
  useEffect(function () {
    if (JSON.stringify(previousSelected.current) !== JSON.stringify(selected)) {
      setSelectedRows(_objectSpread2({}, selected));
      previousSelected.current = selected;
    }
  }, [selected]);

  // Initialize column widths array only once when component mounts or columns change
  useEffect(function () {
    var allColumns = showCheckbox ? [{
      id: 'select',
      size: 50
    }].concat(_toConsumableArray(columns)) : columns;

    // If we have persisted widths and the number of columns matches, use those
    if (persistedColumnWidthsRef.current.length === allColumns.length) {
      setColumnWidths(_toConsumableArray(persistedColumnWidthsRef.current));
      setTableWidth(persistedColumnWidthsRef.current.reduce(function (sum, width) {
        return sum + width;
      }, 0));
    } else {
      // Otherwise initialize with default widths
      var initialWidths = allColumns.map(function (column) {
        return column.size || column.minWidth || 150;
      });
      setColumnWidths(initialWidths);
      setTableWidth(initialWidths.reduce(function (sum, width) {
        return sum + width;
      }, 0));
      // Store in our ref for persistence
      persistedColumnWidthsRef.current = _toConsumableArray(initialWidths);
    }
  }, [columns, showCheckbox]);
  useEffect(function () {
    setData({
      pages: [],
      meta: {
        totalPages: 1
      }
    });
    setPageParam(1);
    if (staticData) {
      setData({
        pages: [{
          data: staticData,
          meta: {
            totalPages: 1,
            totalCount: staticData.length
          }
        }],
        meta: {
          totalPages: 1,
          totalCount: staticData.length
        }
      });
    } else {
      loadInitialData();
    }
  }, [dataSource, staticData]);
  var handleMouseMove = useCallback(function (e) {
    var _enhancedColumns$resi;
    if (resizingIndex === null || startX === null || initialWidth === null) return;
    var delta = e.clientX - startX;
    var newWidth = Math.max(((_enhancedColumns$resi = enhancedColumns[resizingIndex]) === null || _enhancedColumns$resi === void 0 ? void 0 : _enhancedColumns$resi.minWidth) || 80, initialWidth + delta);

    // Create a new array of column widths with the updated width
    var newColumnWidths = _toConsumableArray(columnWidths);
    newColumnWidths[resizingIndex] = newWidth;

    // Update the column widths state
    setColumnWidths(newColumnWidths);

    // Update our persisted ref to maintain widths during pagination
    persistedColumnWidthsRef.current = newColumnWidths;

    // Recalculate table width based on the new column widths
    var newTableWidth = newColumnWidths.reduce(function (sum, width) {
      return sum + width;
    }, 0);
    setTableWidth(newTableWidth);
  }, [resizingIndex, startX, initialWidth, enhancedColumns, columnWidths]);
  var handleMouseUp = useCallback(function () {
    setResizingIndex(null);
    setStartX(null);
    setInitialWidth(null);
  }, []);

  // Add resize event listeners
  useEffect(function () {
    if (resizingIndex !== null) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return function () {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [resizingIndex, handleMouseMove, handleMouseUp]);
  var handleResizeStart = function handleResizeStart(e, index) {
    var column = enhancedColumns[index];
    if (!column.resizable) return;
    e.preventDefault();
    e.stopPropagation();
    setResizingIndex(index);
    setStartX(e.clientX);
    setInitialWidth(columnWidths[index] || column.size || column.minWidth || 150);
  };
  var loadInitialData = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var initialData;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (dataSource) {
              _context.next = 2;
              break;
            }
            return _context.abrupt("return");
          case 2:
            _context.prev = 2;
            _context.next = 5;
            return dataSource({
              skip: 0,
              limit: defaultLimit
            });
          case 5:
            initialData = _context.sent;
            setData({
              pages: [initialData],
              meta: initialData.meta
            });
            setPageParam(1);
            _context.next = 13;
            break;
          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);
            console.error('Error loading initial data:', _context.t0);
          case 13:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[2, 10]]);
    }));
    return function loadInitialData() {
      return _ref4.apply(this, arguments);
    };
  }();
  var fetchNextPage = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var nextData;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            if (!(isFetching || !livePagination || staticData)) {
              _context2.next = 2;
              break;
            }
            return _context2.abrupt("return");
          case 2:
            setIsFetching(true);
            _context2.prev = 3;
            _context2.next = 6;
            return dataSource({
              skip: pageParam * defaultLimit,
              limit: defaultLimit
            });
          case 6:
            nextData = _context2.sent;
            // Update the data but maintain our column widths
            setData(function (prev) {
              return {
                pages: [].concat(_toConsumableArray(prev.pages), [nextData]),
                meta: nextData.meta
              };
            });
            setPageParam(function (prev) {
              return prev + 1;
            });
            _context2.next = 14;
            break;
          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](3);
            console.error('Error fetching next page:', _context2.t0);
          case 14:
            _context2.prev = 14;
            setIsFetching(false);
            return _context2.finish(14);
          case 17:
          case "end":
            return _context2.stop();
        }
      }, _callee2, null, [[3, 11, 14, 17]]);
    }));
    return function fetchNextPage() {
      return _ref5.apply(this, arguments);
    };
  }();
  var handleSelectAll = function handleSelectAll(checked, flatData) {
    if (checked) {
      var newSelected = {};
      flatData.forEach(function (row) {
        newSelected[row.id] = _objectSpread2({}, row);
      });
      setSelectedRows(newSelected);
      onSelectionChange === null || onSelectionChange === void 0 || onSelectionChange({
        data: flatData,
        selected: true,
        originalData: flatData,
        unselected: null
      });
    } else {
      setSelectedRows({});
      onSelectionChange === null || onSelectionChange === void 0 || onSelectionChange({
        data: [],
        selected: {},
        originalData: data.pages.data
      });
    }
  };
  var handleSelectRow = function handleSelectRow(checked, row, flatData) {
    var rowId = row.id;
    if (checked) {
      setSelectedRows(function (prev) {
        return _objectSpread2(_objectSpread2({}, prev), {}, _defineProperty({}, rowId, _objectSpread2({}, row)));
      });
      onSelectionChange === null || onSelectionChange === void 0 || onSelectionChange(_defineProperty(_defineProperty({
        data: _objectSpread2({}, row),
        selected: _objectSpread2(_objectSpread2({}, selectedRows), {}, _defineProperty({}, rowId, _objectSpread2({}, row)))
      }, rowId, _objectSpread2({}, row)), "originalData", _toConsumableArray(flatData)));
    } else {
      var updatedSelectedRows = _objectSpread2({}, selectedRows);
      delete updatedSelectedRows[rowId];
      setSelectedRows(updatedSelectedRows);
      onSelectionChange === null || onSelectionChange === void 0 || onSelectionChange({
        data: _objectSpread2({}, row),
        selected: _objectSpread2({}, updatedSelectedRows),
        originalData: _toConsumableArray(flatData)
      });
    }
  };
  var handleRowClick = function handleRowClick(row, index, flatData) {
    onRowClick === null || onRowClick === void 0 || onRowClick({
      data: _objectSpread2({}, row),
      dataSourceArray: flatData,
      rowIndex: index
    });
  };
  var handleScroll = function handleScroll(containerRefElement) {
    if (containerRefElement) {
      var scrollHeight = containerRefElement.scrollHeight,
        scrollTop = containerRefElement.scrollTop,
        clientHeight = containerRefElement.clientHeight;
      if (scrollHeight - scrollTop - clientHeight < 500 && !isFetching && pageParam < data.meta.totalPages) {
        fetchNextPage();
      }
    }
  };
  useEffect(function () {
    handleScroll(tableContainerRef.current);
  }, [data]);
  return /*#__PURE__*/React.createElement("div", {
    className: "bg-white relative w-full react-live-data-table"
  }, loading && /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-white/50 z-20 flex items-center justify-center"
  }, /*#__PURE__*/React.createElement("svg", {
    style: {
      animation: 'spin 1s linear infinite',
      width: '24px',
      height: '24px'
    },
    viewBox: "0 0 24 24",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, /*#__PURE__*/React.createElement("style", null, "@keyframes spin {from {transform: rotate(0deg)} to {transform: rotate(360deg)}}"), /*#__PURE__*/React.createElement("circle", {
    style: {
      opacity: 0.25
    },
    cx: "12",
    cy: "12",
    r: "10",
    stroke: "currentColor",
    strokeWidth: "4"
  }), /*#__PURE__*/React.createElement("path", {
    style: {
      opacity: 0.75
    },
    fill: "currentColor",
    d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
  }))), flatData.length === 0 && !loading ? /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-center",
    style: {
      height: height
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-gray-500"
  }, emptyText || 'No data available')) : /*#__PURE__*/React.createElement("div", {
    className: "overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    ref: tableContainerRef,
    className: "overflow-auto w-full",
    style: {
      maxHeight: maxHeight,
      height: height
    },
    onScroll: function onScroll(e) {
      return handleScroll(e.currentTarget);
    }
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full border-collapse",
    style: {
      tableLayout: 'fixed'
    }
  }, /*#__PURE__*/React.createElement("thead", {
    className: "sticky top-0 z-10 bg-blue-300",
    style: _objectSpread2({}, headerProps.style)
  }, /*#__PURE__*/React.createElement("tr", null, enhancedColumns.map(function (column, columnIndex) {
    // Use persisted column widths to ensure consistency
    var width = columnWidths[columnIndex] || column.size || column.minWidth || 150;
    return /*#__PURE__*/React.createElement("th", {
      key: column.accessorKey || column.id,
      className: "text-left font-normal h-[40px] border-b border-t border-solid border-[#e4e3e2] relative select-none ".concat(columnIndex < enhancedColumns.length - 1 ? 'border-r' : ''),
      style: {
        width: "".concat(width, "px"),
        minWidth: "".concat(width, "px"),
        maxWidth: "".concat(width, "px"),
        textAlign: column.textAlign
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center h-full overflow-hidden justify-center pl-[17px]"
    }, /*#__PURE__*/React.createElement("span", {
      className: "truncate"
    }, typeof column.header === 'function' ? column.header({
      data: flatData
    }) : column.header)), column.resizable !== false && /*#__PURE__*/React.createElement("div", {
      className: "absolute top-0 right-0 h-full w-4 flex items-center justify-center group ".concat(resizingIndex === columnIndex ? 'bg-blue-100' : 'hover:bg-blue-100', " transition-colors duration-200"),
      onMouseDown: function onMouseDown(e) {
        return handleResizeStart(e, columnIndex);
      },
      style: {
        touchAction: 'none',
        userSelect: 'none',
        cursor: 'col-resize'
      }
    }));
  }))), /*#__PURE__*/React.createElement("tbody", null, flatData.length > 0 ? flatData.map(function (row, rowIndex) {
    var isLastRow = rowIndex === flatData.length - 1;
    return /*#__PURE__*/React.createElement("tr", {
      key: row.id,
      className: "border-t ".concat(isLastRow ? 'border-b' : '', " border-gray-200 hover:bg-[#dee1f2] ").concat(selectedRows[row.id] ? 'bg-[#dee1f2]' : '', " ").concat(rowClassName, " cursor-pointer"),
      style: _objectSpread2(_objectSpread2({
        height: "".concat(rowHeights, "px")
      }, rowStyle), typeof rowStyle === 'function' ? rowStyle(row, rowIndex) : {}),
      onClick: function onClick() {
        return handleRowClick(row, rowIndex, flatData);
      }
    }, enhancedColumns.map(function (column, columnIndex) {
      var _column$cellProps, _column$cellProps2;
      // Use persisted column widths for cells as well
      var width = columnWidths[columnIndex] || column.size || column.minWidth || 150;
      return /*#__PURE__*/React.createElement("td", {
        key: column.accessorKey || column.id,
        className: "text-left font-normal ".concat(columnIndex < enhancedColumns.length - 1 ? 'border-r' : '', " ").concat((column === null || column === void 0 || (_column$cellProps = column.cellProps) === null || _column$cellProps === void 0 ? void 0 : _column$cellProps.className) || ''),
        style: _objectSpread2(_objectSpread2({
          width: "".concat(width, "px"),
          minWidth: "".concat(width, "px"),
          maxWidth: "".concat(width, "px"),
          textAlign: column === null || column === void 0 ? void 0 : column.textAlign
        }, column === null || column === void 0 || (_column$cellProps2 = column.cellProps) === null || _column$cellProps2 === void 0 ? void 0 : _column$cellProps2.style), {}, {
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap'
        })
      }, typeof column.cell === 'function' ? column.cell({
        row: row
      }) : null);
    }));
  }) : /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: enhancedColumns.length,
    className: "text-center py-4"
  }, emptyText || 'No data available')))))), resizingIndex !== null && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-40 bg-blue-50/5",
    style: {
      pointerEvents: 'none',
      userSelect: 'none',
      cursor: 'col-resize'
    }
  }));
}

export { ReactDataTable };
