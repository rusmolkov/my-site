(() => {
  // node_modules/@vercel/speed-insights/dist/index.mjs
  var initQueue = () => {
    if (window.si) return;
    window.si = function a(...params) {
      window.siq = window.siq || [];
      window.siq.push(params);
    };
  };
  var name = "@vercel/speed-insights";
  var version = "2.0.0";
  function isBrowser() {
    return typeof window !== "undefined";
  }
  function detectEnvironment() {
    try {
      const env = "development";
      if (env === "development" || env === "test") {
        return "development";
      }
    } catch {
    }
    return "production";
  }
  function isDevelopment() {
    return detectEnvironment() === "development";
  }
  function getScriptSrc(props) {
    if (props.scriptSrc) {
      return makeAbsolute(props.scriptSrc);
    }
    if (isDevelopment()) {
      return "https://va.vercel-scripts.com/v1/speed-insights/script.debug.js";
    }
    if (props.dsn) {
      return "https://va.vercel-scripts.com/v1/speed-insights/script.js";
    }
    if (props.basePath) {
      return makeAbsolute(`${props.basePath}/speed-insights/script.js`);
    }
    return "/_vercel/speed-insights/script.js";
  }
  function loadProps(explicitProps, confString) {
    var _a;
    let props = explicitProps;
    if (confString) {
      try {
        props = {
          ...(_a = JSON.parse(confString)) == null ? void 0 : _a.speedInsights,
          ...explicitProps
        };
      } catch {
      }
    }
    const dataset = {
      sdkn: name + (props.framework ? `/${props.framework}` : ""),
      sdkv: version
    };
    if (props.sampleRate) {
      dataset.sampleRate = props.sampleRate.toString();
    }
    if (props.route) {
      dataset.route = props.route;
    }
    if (isDevelopment() && props.debug === false) {
      dataset.debug = "false";
    }
    if (props.dsn) {
      dataset.dsn = props.dsn;
    }
    if (props.endpoint) {
      dataset.endpoint = makeAbsolute(props.endpoint);
    } else if (props.basePath) {
      dataset.endpoint = makeAbsolute(`${props.basePath}/speed-insights/vitals`);
    }
    return {
      src: getScriptSrc(props),
      beforeSend: props.beforeSend,
      dataset
    };
  }
  function makeAbsolute(url) {
    return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/") ? url : `/${url}`;
  }
  function injectSpeedInsights(props = {}, confString) {
    var _a;
    if (!isBrowser() || props.route === null) return null;
    initQueue();
    const { beforeSend, src, dataset } = loadProps(props, confString);
    if (document.head.querySelector(`script[src*="${src}"]`)) return null;
    if (beforeSend) {
      (_a = window.si) == null ? void 0 : _a.call(window, "beforeSend", beforeSend);
    }
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    for (const [key, value] of Object.entries(dataset)) {
      script.dataset[key] = value;
    }
    script.onerror = () => {
      console.log(
        `[Vercel Speed Insights] Failed to load script from ${src}. Please check if any content blockers are enabled and try again.`
      );
    };
    document.head.appendChild(script);
    return {
      setRoute: (route) => {
        script.dataset.route = route ?? void 0;
      }
    };
  }

  // src/script.js
  injectSpeedInsights();
  var slots = [
    ["02", "\u0437\u0430\u043D\u044F\u0442\u043E", "booked"],
    ["04", "\u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E", "free"],
    ["06", "\u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E", "free"],
    ["09", "\u0437\u0430\u043D\u044F\u0442\u043E", "booked"],
    ["11", "\u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E", "free"],
    ["13", "\u0437\u0430\u043D\u044F\u0442\u043E", "booked"],
    ["15", "\u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E", "free"],
    ["18", "\u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E", "free"],
    ["20", "\u0437\u0430\u043D\u044F\u0442\u043E", "booked"],
    ["22", "\u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E", "free"],
    ["24", "\u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E", "free"],
    ["27", "\u0437\u0430\u043D\u044F\u0442\u043E", "booked"],
    ["29", "\u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E", "free"],
    ["30", "\u0440\u0435\u0437\u0435\u0440\u0432", "booked"]
  ];
  var grid = document.getElementById("calendar-grid");
  var yearNode = document.getElementById("year");
  var calendarDisclosure = document.getElementById("calendar-disclosure");
  function syncCalendarDisclosure() {
    if (!calendarDisclosure) return;
    if (window.matchMedia("(max-width: 780px)").matches) {
      calendarDisclosure.removeAttribute("open");
    } else {
      calendarDisclosure.setAttribute("open", "");
    }
  }
  if (grid) {
    slots.forEach(([day, label, state]) => {
      const cell = document.createElement("article");
      cell.className = `calendar-cell ${state}`;
      cell.innerHTML = `<span>${day}</span><span>${label}</span>`;
      grid.appendChild(cell);
    });
  }
  if (yearNode) {
    yearNode.textContent = (/* @__PURE__ */ new Date()).getFullYear();
  }
  syncCalendarDisclosure();
  window.addEventListener("resize", syncCalendarDisclosure);
})();
