if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return typeof component === "string" ? easycom : component;
  }
  const fontData = [
    {
      "font_class": "arrow-down",
      "unicode": ""
    },
    {
      "font_class": "arrow-left",
      "unicode": ""
    },
    {
      "font_class": "arrow-right",
      "unicode": ""
    },
    {
      "font_class": "arrow-up",
      "unicode": ""
    },
    {
      "font_class": "auth",
      "unicode": ""
    },
    {
      "font_class": "auth-filled",
      "unicode": ""
    },
    {
      "font_class": "back",
      "unicode": ""
    },
    {
      "font_class": "bars",
      "unicode": ""
    },
    {
      "font_class": "calendar",
      "unicode": ""
    },
    {
      "font_class": "calendar-filled",
      "unicode": ""
    },
    {
      "font_class": "camera",
      "unicode": ""
    },
    {
      "font_class": "camera-filled",
      "unicode": ""
    },
    {
      "font_class": "cart",
      "unicode": ""
    },
    {
      "font_class": "cart-filled",
      "unicode": ""
    },
    {
      "font_class": "chat",
      "unicode": ""
    },
    {
      "font_class": "chat-filled",
      "unicode": ""
    },
    {
      "font_class": "chatboxes",
      "unicode": ""
    },
    {
      "font_class": "chatboxes-filled",
      "unicode": ""
    },
    {
      "font_class": "chatbubble",
      "unicode": ""
    },
    {
      "font_class": "chatbubble-filled",
      "unicode": ""
    },
    {
      "font_class": "checkbox",
      "unicode": ""
    },
    {
      "font_class": "checkbox-filled",
      "unicode": ""
    },
    {
      "font_class": "checkmarkempty",
      "unicode": ""
    },
    {
      "font_class": "circle",
      "unicode": ""
    },
    {
      "font_class": "circle-filled",
      "unicode": ""
    },
    {
      "font_class": "clear",
      "unicode": ""
    },
    {
      "font_class": "close",
      "unicode": ""
    },
    {
      "font_class": "closeempty",
      "unicode": ""
    },
    {
      "font_class": "cloud-download",
      "unicode": ""
    },
    {
      "font_class": "cloud-download-filled",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload",
      "unicode": ""
    },
    {
      "font_class": "cloud-upload-filled",
      "unicode": ""
    },
    {
      "font_class": "color",
      "unicode": ""
    },
    {
      "font_class": "color-filled",
      "unicode": ""
    },
    {
      "font_class": "compose",
      "unicode": ""
    },
    {
      "font_class": "contact",
      "unicode": ""
    },
    {
      "font_class": "contact-filled",
      "unicode": ""
    },
    {
      "font_class": "down",
      "unicode": ""
    },
    {
      "font_class": "bottom",
      "unicode": ""
    },
    {
      "font_class": "download",
      "unicode": ""
    },
    {
      "font_class": "download-filled",
      "unicode": ""
    },
    {
      "font_class": "email",
      "unicode": ""
    },
    {
      "font_class": "email-filled",
      "unicode": ""
    },
    {
      "font_class": "eye",
      "unicode": ""
    },
    {
      "font_class": "eye-filled",
      "unicode": ""
    },
    {
      "font_class": "eye-slash",
      "unicode": ""
    },
    {
      "font_class": "eye-slash-filled",
      "unicode": ""
    },
    {
      "font_class": "fire",
      "unicode": ""
    },
    {
      "font_class": "fire-filled",
      "unicode": ""
    },
    {
      "font_class": "flag",
      "unicode": ""
    },
    {
      "font_class": "flag-filled",
      "unicode": ""
    },
    {
      "font_class": "folder-add",
      "unicode": ""
    },
    {
      "font_class": "folder-add-filled",
      "unicode": ""
    },
    {
      "font_class": "font",
      "unicode": ""
    },
    {
      "font_class": "forward",
      "unicode": ""
    },
    {
      "font_class": "gear",
      "unicode": ""
    },
    {
      "font_class": "gear-filled",
      "unicode": ""
    },
    {
      "font_class": "gift",
      "unicode": ""
    },
    {
      "font_class": "gift-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-down",
      "unicode": ""
    },
    {
      "font_class": "hand-down-filled",
      "unicode": ""
    },
    {
      "font_class": "hand-up",
      "unicode": ""
    },
    {
      "font_class": "hand-up-filled",
      "unicode": ""
    },
    {
      "font_class": "headphones",
      "unicode": ""
    },
    {
      "font_class": "heart",
      "unicode": ""
    },
    {
      "font_class": "heart-filled",
      "unicode": ""
    },
    {
      "font_class": "help",
      "unicode": ""
    },
    {
      "font_class": "help-filled",
      "unicode": ""
    },
    {
      "font_class": "home",
      "unicode": ""
    },
    {
      "font_class": "home-filled",
      "unicode": ""
    },
    {
      "font_class": "image",
      "unicode": ""
    },
    {
      "font_class": "image-filled",
      "unicode": ""
    },
    {
      "font_class": "images",
      "unicode": ""
    },
    {
      "font_class": "images-filled",
      "unicode": ""
    },
    {
      "font_class": "info",
      "unicode": ""
    },
    {
      "font_class": "info-filled",
      "unicode": ""
    },
    {
      "font_class": "left",
      "unicode": ""
    },
    {
      "font_class": "link",
      "unicode": ""
    },
    {
      "font_class": "list",
      "unicode": ""
    },
    {
      "font_class": "location",
      "unicode": ""
    },
    {
      "font_class": "location-filled",
      "unicode": ""
    },
    {
      "font_class": "locked",
      "unicode": ""
    },
    {
      "font_class": "locked-filled",
      "unicode": ""
    },
    {
      "font_class": "loop",
      "unicode": ""
    },
    {
      "font_class": "mail-open",
      "unicode": ""
    },
    {
      "font_class": "mail-open-filled",
      "unicode": ""
    },
    {
      "font_class": "map",
      "unicode": ""
    },
    {
      "font_class": "map-filled",
      "unicode": ""
    },
    {
      "font_class": "map-pin",
      "unicode": ""
    },
    {
      "font_class": "map-pin-ellipse",
      "unicode": ""
    },
    {
      "font_class": "medal",
      "unicode": ""
    },
    {
      "font_class": "medal-filled",
      "unicode": ""
    },
    {
      "font_class": "mic",
      "unicode": ""
    },
    {
      "font_class": "mic-filled",
      "unicode": ""
    },
    {
      "font_class": "micoff",
      "unicode": ""
    },
    {
      "font_class": "micoff-filled",
      "unicode": ""
    },
    {
      "font_class": "minus",
      "unicode": ""
    },
    {
      "font_class": "minus-filled",
      "unicode": ""
    },
    {
      "font_class": "more",
      "unicode": ""
    },
    {
      "font_class": "more-filled",
      "unicode": ""
    },
    {
      "font_class": "navigate",
      "unicode": ""
    },
    {
      "font_class": "navigate-filled",
      "unicode": ""
    },
    {
      "font_class": "notification",
      "unicode": ""
    },
    {
      "font_class": "notification-filled",
      "unicode": ""
    },
    {
      "font_class": "paperclip",
      "unicode": ""
    },
    {
      "font_class": "paperplane",
      "unicode": ""
    },
    {
      "font_class": "paperplane-filled",
      "unicode": ""
    },
    {
      "font_class": "person",
      "unicode": ""
    },
    {
      "font_class": "person-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled",
      "unicode": ""
    },
    {
      "font_class": "personadd-filled-copy",
      "unicode": ""
    },
    {
      "font_class": "phone",
      "unicode": ""
    },
    {
      "font_class": "phone-filled",
      "unicode": ""
    },
    {
      "font_class": "plus",
      "unicode": ""
    },
    {
      "font_class": "plus-filled",
      "unicode": ""
    },
    {
      "font_class": "plusempty",
      "unicode": ""
    },
    {
      "font_class": "pulldown",
      "unicode": ""
    },
    {
      "font_class": "pyq",
      "unicode": ""
    },
    {
      "font_class": "qq",
      "unicode": ""
    },
    {
      "font_class": "redo",
      "unicode": ""
    },
    {
      "font_class": "redo-filled",
      "unicode": ""
    },
    {
      "font_class": "refresh",
      "unicode": ""
    },
    {
      "font_class": "refresh-filled",
      "unicode": ""
    },
    {
      "font_class": "refreshempty",
      "unicode": ""
    },
    {
      "font_class": "reload",
      "unicode": ""
    },
    {
      "font_class": "right",
      "unicode": ""
    },
    {
      "font_class": "scan",
      "unicode": ""
    },
    {
      "font_class": "search",
      "unicode": ""
    },
    {
      "font_class": "settings",
      "unicode": ""
    },
    {
      "font_class": "settings-filled",
      "unicode": ""
    },
    {
      "font_class": "shop",
      "unicode": ""
    },
    {
      "font_class": "shop-filled",
      "unicode": ""
    },
    {
      "font_class": "smallcircle",
      "unicode": ""
    },
    {
      "font_class": "smallcircle-filled",
      "unicode": ""
    },
    {
      "font_class": "sound",
      "unicode": ""
    },
    {
      "font_class": "sound-filled",
      "unicode": ""
    },
    {
      "font_class": "spinner-cycle",
      "unicode": ""
    },
    {
      "font_class": "staff",
      "unicode": ""
    },
    {
      "font_class": "staff-filled",
      "unicode": ""
    },
    {
      "font_class": "star",
      "unicode": ""
    },
    {
      "font_class": "star-filled",
      "unicode": ""
    },
    {
      "font_class": "starhalf",
      "unicode": ""
    },
    {
      "font_class": "trash",
      "unicode": ""
    },
    {
      "font_class": "trash-filled",
      "unicode": ""
    },
    {
      "font_class": "tune",
      "unicode": ""
    },
    {
      "font_class": "tune-filled",
      "unicode": ""
    },
    {
      "font_class": "undo",
      "unicode": ""
    },
    {
      "font_class": "undo-filled",
      "unicode": ""
    },
    {
      "font_class": "up",
      "unicode": ""
    },
    {
      "font_class": "top",
      "unicode": ""
    },
    {
      "font_class": "upload",
      "unicode": ""
    },
    {
      "font_class": "upload-filled",
      "unicode": ""
    },
    {
      "font_class": "videocam",
      "unicode": ""
    },
    {
      "font_class": "videocam-filled",
      "unicode": ""
    },
    {
      "font_class": "vip",
      "unicode": ""
    },
    {
      "font_class": "vip-filled",
      "unicode": ""
    },
    {
      "font_class": "wallet",
      "unicode": ""
    },
    {
      "font_class": "wallet-filled",
      "unicode": ""
    },
    {
      "font_class": "weibo",
      "unicode": ""
    },
    {
      "font_class": "weixin",
      "unicode": ""
    }
  ];
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const getVal = (val) => {
    const reg = /^[0-9]*$/g;
    return typeof val === "number" || reg.test(val) ? val + "px" : val;
  };
  const _sfc_main$3 = {
    name: "UniIcons",
    emits: ["click"],
    props: {
      type: {
        type: String,
        default: ""
      },
      color: {
        type: String,
        default: "#333333"
      },
      size: {
        type: [Number, String],
        default: 16
      },
      customPrefix: {
        type: String,
        default: ""
      },
      fontFamily: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        icons: fontData
      };
    },
    computed: {
      unicode() {
        let code = this.icons.find((v) => v.font_class === this.type);
        if (code) {
          return code.unicode;
        }
        return "";
      },
      iconSize() {
        return getVal(this.size);
      },
      styleObj() {
        if (this.fontFamily !== "") {
          return `color: ${this.color}; font-size: ${this.iconSize}; font-family: ${this.fontFamily};`;
        }
        return `color: ${this.color}; font-size: ${this.iconSize};`;
      }
    },
    methods: {
      _onClick() {
        this.$emit("click");
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "text",
      {
        style: vue.normalizeStyle($options.styleObj),
        class: vue.normalizeClass(["uni-icons", ["uniui-" + $props.type, $props.customPrefix, $props.customPrefix ? $props.type : ""]]),
        onClick: _cache[0] || (_cache[0] = (...args) => $options._onClick && $options._onClick(...args))
      },
      [
        vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__scopeId", "data-v-d31e1c47"], ["__file", "D:/mygitee/项目大全/pickUpCode/取件码/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  const _sfc_main$2 = {
    name: "EditDialog",
    props: {
      show: {
        type: Boolean,
        default: false
      },
      value: {
        type: String,
        default: ""
      }
    },
    data() {
      return {
        inputValue: ""
      };
    },
    watch: {
      show(val) {
        if (val) {
          this.inputValue = this.value;
        }
      }
    },
    methods: {
      handleMaskClick() {
        this.$emit("update:show", false);
      },
      handleCancel() {
        this.$emit("update:show", false);
      },
      handleConfirm() {
        if (this.inputValue.trim()) {
          this.$emit("confirm", this.inputValue);
          this.$emit("update:show", false);
        }
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return $props.show ? (vue.openBlock(), vue.createElementBlock("view", {
      key: 0,
      class: "dialog-mask",
      onClick: _cache[4] || (_cache[4] = (...args) => $options.handleMaskClick && $options.handleMaskClick(...args))
    }, [
      vue.createElementVNode("view", {
        class: "dialog-content",
        onClick: _cache[3] || (_cache[3] = vue.withModifiers(() => {
        }, ["stop"]))
      }, [
        vue.createElementVNode("view", { class: "dialog-header" }, [
          vue.createElementVNode("text", { class: "dialog-title" }, "修改取件码")
        ]),
        vue.createElementVNode("view", { class: "dialog-body" }, [
          vue.withDirectives(vue.createElementVNode(
            "input",
            {
              class: "dialog-input",
              type: "number",
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.inputValue = $event),
              placeholder: "请输入新的取件码"
            },
            null,
            512
            /* NEED_PATCH */
          ), [
            [vue.vModelText, $data.inputValue]
          ])
        ]),
        vue.createElementVNode("view", { class: "dialog-footer" }, [
          vue.createElementVNode("text", {
            class: "dialog-btn cancel",
            onClick: _cache[1] || (_cache[1] = (...args) => $options.handleCancel && $options.handleCancel(...args))
          }, "取消"),
          vue.createElementVNode("text", {
            class: "dialog-btn confirm",
            onClick: _cache[2] || (_cache[2] = (...args) => $options.handleConfirm && $options.handleConfirm(...args))
          }, "确定")
        ])
      ])
    ])) : vue.createCommentVNode("v-if", true);
  }
  const EditDialog = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-90e7d67e"], ["__file", "D:/mygitee/项目大全/pickUpCode/取件码/components/EditDialog.vue"]]);
  var isIos;
  isIos = plus.os.name == "iOS";
  function judgeIosPermissionPush() {
    var result = false;
    var UIApplication = plus.ios.import("UIApplication");
    var app = UIApplication.sharedApplication();
    var enabledTypes = 0;
    if (app.currentUserNotificationSettings) {
      var settings = app.currentUserNotificationSettings();
      enabledTypes = settings.plusGetAttribute("types");
      formatAppLog("log", "at js_sdk/wa-permission/permission.js:19", "enabledTypes1:" + enabledTypes);
      if (enabledTypes == 0) {
        formatAppLog("log", "at js_sdk/wa-permission/permission.js:21", "推送权限没有开启");
      } else {
        result = true;
        formatAppLog("log", "at js_sdk/wa-permission/permission.js:24", "已经开启推送功能!");
      }
      plus.ios.deleteObject(settings);
    } else {
      enabledTypes = app.enabledRemoteNotificationTypes();
      if (enabledTypes == 0) {
        formatAppLog("log", "at js_sdk/wa-permission/permission.js:30", "推送权限没有开启!");
      } else {
        result = true;
        formatAppLog("log", "at js_sdk/wa-permission/permission.js:33", "已经开启推送功能!");
      }
      formatAppLog("log", "at js_sdk/wa-permission/permission.js:35", "enabledTypes2:" + enabledTypes);
    }
    plus.ios.deleteObject(app);
    plus.ios.deleteObject(UIApplication);
    return result;
  }
  function judgeIosPermissionLocation() {
    var result = false;
    var cllocationManger = plus.ios.import("CLLocationManager");
    var status = cllocationManger.authorizationStatus();
    result = status != 2;
    formatAppLog("log", "at js_sdk/wa-permission/permission.js:48", "定位权限开启：" + result);
    plus.ios.deleteObject(cllocationManger);
    return result;
  }
  function judgeIosPermissionRecord() {
    var result = false;
    var avaudiosession = plus.ios.import("AVAudioSession");
    var avaudio = avaudiosession.sharedInstance();
    var permissionStatus = avaudio.recordPermission();
    formatAppLog("log", "at js_sdk/wa-permission/permission.js:70", "permissionStatus:" + permissionStatus);
    if (permissionStatus == 1684369017 || permissionStatus == 1970168948) {
      formatAppLog("log", "at js_sdk/wa-permission/permission.js:72", "麦克风权限没有开启");
    } else {
      result = true;
      formatAppLog("log", "at js_sdk/wa-permission/permission.js:75", "麦克风权限已经开启");
    }
    plus.ios.deleteObject(avaudiosession);
    return result;
  }
  function judgeIosPermissionCamera() {
    var result = false;
    var AVCaptureDevice = plus.ios.import("AVCaptureDevice");
    var authStatus = AVCaptureDevice.authorizationStatusForMediaType("vide");
    formatAppLog("log", "at js_sdk/wa-permission/permission.js:86", "authStatus:" + authStatus);
    if (authStatus == 3) {
      result = true;
      formatAppLog("log", "at js_sdk/wa-permission/permission.js:89", "相机权限已经开启");
    } else {
      formatAppLog("log", "at js_sdk/wa-permission/permission.js:91", "相机权限没有开启");
    }
    plus.ios.deleteObject(AVCaptureDevice);
    return result;
  }
  function judgeIosPermissionPhotoLibrary() {
    var result = false;
    var PHPhotoLibrary = plus.ios.import("PHPhotoLibrary");
    var authStatus = PHPhotoLibrary.authorizationStatus();
    formatAppLog("log", "at js_sdk/wa-permission/permission.js:102", "authStatus:" + authStatus);
    if (authStatus == 3) {
      result = true;
      formatAppLog("log", "at js_sdk/wa-permission/permission.js:105", "相册权限已经开启");
    } else {
      formatAppLog("log", "at js_sdk/wa-permission/permission.js:107", "相册权限没有开启");
    }
    plus.ios.deleteObject(PHPhotoLibrary);
    return result;
  }
  function judgeIosPermissionContact() {
    var result = false;
    var CNContactStore = plus.ios.import("CNContactStore");
    var cnAuthStatus = CNContactStore.authorizationStatusForEntityType(0);
    if (cnAuthStatus == 3) {
      result = true;
      formatAppLog("log", "at js_sdk/wa-permission/permission.js:120", "通讯录权限已经开启");
    } else {
      formatAppLog("log", "at js_sdk/wa-permission/permission.js:122", "通讯录权限没有开启");
    }
    plus.ios.deleteObject(CNContactStore);
    return result;
  }
  function judgeIosPermissionCalendar() {
    var result = false;
    var EKEventStore = plus.ios.import("EKEventStore");
    var ekAuthStatus = EKEventStore.authorizationStatusForEntityType(0);
    if (ekAuthStatus == 3) {
      result = true;
      formatAppLog("log", "at js_sdk/wa-permission/permission.js:135", "日历权限已经开启");
    } else {
      formatAppLog("log", "at js_sdk/wa-permission/permission.js:137", "日历权限没有开启");
    }
    plus.ios.deleteObject(EKEventStore);
    return result;
  }
  function judgeIosPermissionMemo() {
    var result = false;
    var EKEventStore = plus.ios.import("EKEventStore");
    var ekAuthStatus = EKEventStore.authorizationStatusForEntityType(1);
    if (ekAuthStatus == 3) {
      result = true;
      formatAppLog("log", "at js_sdk/wa-permission/permission.js:150", "备忘录权限已经开启");
    } else {
      formatAppLog("log", "at js_sdk/wa-permission/permission.js:152", "备忘录权限没有开启");
    }
    plus.ios.deleteObject(EKEventStore);
    return result;
  }
  function requestAndroidPermission(permissionID) {
    return new Promise((resolve, reject) => {
      plus.android.requestPermissions(
        [permissionID],
        // 理论上支持多个权限同时查询，但实际上本函数封装只处理了一个权限的情况。有需要的可自行扩展封装
        function(resultObj) {
          var result = 0;
          for (var i = 0; i < resultObj.granted.length; i++) {
            var grantedPermission = resultObj.granted[i];
            formatAppLog("log", "at js_sdk/wa-permission/permission.js:167", "已获取的权限：" + grantedPermission);
            result = 1;
          }
          for (var i = 0; i < resultObj.deniedPresent.length; i++) {
            var deniedPresentPermission = resultObj.deniedPresent[i];
            formatAppLog("log", "at js_sdk/wa-permission/permission.js:172", "拒绝本次申请的权限：" + deniedPresentPermission);
            result = 0;
          }
          for (var i = 0; i < resultObj.deniedAlways.length; i++) {
            var deniedAlwaysPermission = resultObj.deniedAlways[i];
            formatAppLog("log", "at js_sdk/wa-permission/permission.js:177", "永久拒绝申请的权限：" + deniedAlwaysPermission);
            result = -1;
          }
          resolve(result);
        },
        function(error) {
          formatAppLog("log", "at js_sdk/wa-permission/permission.js:187", "申请权限错误：" + error.code + " = " + error.message);
          resolve({
            code: error.code,
            message: error.message
          });
        }
      );
    });
  }
  function judgeIosPermission(permissionID) {
    if (permissionID == "location") {
      return judgeIosPermissionLocation();
    } else if (permissionID == "camera") {
      return judgeIosPermissionCamera();
    } else if (permissionID == "photoLibrary") {
      return judgeIosPermissionPhotoLibrary();
    } else if (permissionID == "record") {
      return judgeIosPermissionRecord();
    } else if (permissionID == "push") {
      return judgeIosPermissionPush();
    } else if (permissionID == "contact") {
      return judgeIosPermissionContact();
    } else if (permissionID == "calendar") {
      return judgeIosPermissionCalendar();
    } else if (permissionID == "memo") {
      return judgeIosPermissionMemo();
    }
    return false;
  }
  function gotoAppPermissionSetting() {
    if (isIos) {
      var UIApplication = plus.ios.import("UIApplication");
      var application2 = UIApplication.sharedApplication();
      var NSURL2 = plus.ios.import("NSURL");
      var setting2 = NSURL2.URLWithString("app-settings:");
      application2.openURL(setting2);
      plus.ios.deleteObject(setting2);
      plus.ios.deleteObject(NSURL2);
      plus.ios.deleteObject(application2);
    } else {
      var Intent = plus.android.importClass("android.content.Intent");
      var Settings = plus.android.importClass("android.provider.Settings");
      var Uri = plus.android.importClass("android.net.Uri");
      var mainActivity = plus.android.runtimeMainActivity();
      var intent = new Intent();
      intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
      var uri = Uri.fromParts("package", mainActivity.getPackageName(), null);
      intent.setData(uri);
      mainActivity.startActivity(intent);
    }
  }
  function checkSystemEnableLocation() {
    if (isIos) {
      var result = false;
      var cllocationManger = plus.ios.import("CLLocationManager");
      var result = cllocationManger.locationServicesEnabled();
      formatAppLog("log", "at js_sdk/wa-permission/permission.js:253", "系统定位开启:" + result);
      plus.ios.deleteObject(cllocationManger);
      return result;
    } else {
      var context = plus.android.importClass("android.content.Context");
      var locationManager = plus.android.importClass("android.location.LocationManager");
      var main = plus.android.runtimeMainActivity();
      var mainSvr = main.getSystemService(context.LOCATION_SERVICE);
      var result = mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER);
      formatAppLog("log", "at js_sdk/wa-permission/permission.js:262", "系统定位开启:" + result);
      return result;
    }
  }
  const permision = {
    judgeIosPermission,
    requestAndroidPermission,
    checkSystemEnableLocation,
    gotoAppPermissionSetting
  };
  function parseTime(timestamp) {
    var date = new Date(parseInt(timestamp));
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, "0");
    var day = date.getDate().toString().padStart(2, "0");
    var hours = date.getHours().toString().padStart(2, "0");
    var minutes = date.getMinutes().toString().padStart(2, "0");
    var seconds = date.getSeconds().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  const yizhanIcon = "/static/yizhan.png";
  const _sfc_main$1 = {
    components: {
      EditDialog
    },
    data() {
      return {
        newCode: "",
        packageCodes: [],
        showEditDialog: false,
        editingItem: null,
        editingCode: "",
        readDayCount: 4,
        // 默认读取当天的短信
        dateShowActions: {},
        // 添加日期操作菜单的显示状态
        yizhanIcon,
        version: "1.0.0"
        // 默认版本号
      };
    },
    computed: {
      today() {
        const date = /* @__PURE__ */ new Date();
        return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
      },
      groupedCodes() {
        const groups = {};
        this.packageCodes.forEach((item) => {
          const date = new Date(item.date);
          const formattedDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
          if (!groups[formattedDate]) {
            groups[formattedDate] = {};
          }
          const address = item.address || "未知地址";
          if (!groups[formattedDate][address]) {
            groups[formattedDate][address] = [];
          }
          groups[formattedDate][address].push(item);
        });
        const sortedGroups = Object.entries(groups).sort((a, b) => {
          return new Date(b[0].replace(/(\d+)年(\d+)月(\d+)日/, "$1-$2-$3")) - new Date(a[0].replace(/(\d+)年(\d+)月(\d+)日/, "$1-$2-$3"));
        });
        const sortedGroupsObj = {};
        sortedGroups.forEach(([date, addressGroups]) => {
          sortedGroupsObj[date] = addressGroups;
        });
        return sortedGroupsObj;
      }
    },
    created() {
      try {
        const savedCodes = uni.getStorageSync("packageCodes");
        if (savedCodes) {
          const codes = JSON.parse(savedCodes);
          codes.forEach((item) => {
            if (!item.hasOwnProperty("showActions")) {
              this.$set(item, "showActions", false);
            }
          });
          this.packageCodes = codes;
        }
      } catch (e) {
        formatAppLog("error", "at pages/index/index.vue:255", "读取缓存失败:", e);
      }
      document.addEventListener("click", () => {
        this.packageCodes.forEach((item) => {
          if (item.showActions) {
            item.showActions = false;
          }
        });
        Object.keys(this.dateShowActions).forEach((key) => {
          if (this.dateShowActions[key]) {
            this.$set(this.dateShowActions, key, false);
          }
        });
      });
      this.getAppVersion();
    },
    methods: {
      saveToStorage() {
        try {
          uni.setStorageSync("packageCodes", JSON.stringify(this.packageCodes));
        } catch (e) {
          formatAppLog("error", "at pages/index/index.vue:281", "保存缓存失败:", e);
        }
      },
      vibrateShort() {
        if (uni.getSystemInfoSync().platform !== "web") {
          uni.vibrateShort({
            success: function() {
              formatAppLog("log", "at pages/index/index.vue:289", "震动成功");
            },
            fail: function() {
              formatAppLog("log", "at pages/index/index.vue:292", "震动失败");
            }
          });
        }
      },
      addCode() {
        this.vibrateShort();
        if (!this.newCode)
          return;
        const newCode = this.newCode.replace(/\s/g, "");
        const today = (/* @__PURE__ */ new Date()).toLocaleDateString();
        const isDuplicate = this.packageCodes.some((item) => {
          const itemDate = new Date(item.date).toLocaleDateString();
          return itemDate === today && item.code === newCode;
        });
        if (isDuplicate) {
          uni.showToast({
            title: "今日已添加该取件码",
            icon: "none",
            duration: 2e3
          });
          return;
        }
        const now = (/* @__PURE__ */ new Date()).toLocaleString();
        const newItem = {
          code: this.newCode.replace(/\s/g, ""),
          date: now,
          sendDate: parseTime((/* @__PURE__ */ new Date()).getTime()),
          company: "手动添加",
          address: "手动添加",
          isPicked: false,
          showActions: false,
          // 添加 showActions 属性
          isManual: true
        };
        this.packageCodes.unshift(newItem);
        this.saveToStorage();
        this.newCode = "";
      },
      editCode(item) {
        this.vibrateShort();
        this.editingItem = item;
        this.editingCode = item.code;
        this.showEditDialog = true;
        item.showActions = false;
      },
      handleEditConfirm(value) {
        if (!this.editingItem)
          return;
        const newCode = value.replace(/\s/g, "");
        const editingDate = new Date(this.editingItem.date).toLocaleDateString();
        if (newCode === this.editingItem.code) {
          this.editingItem = null;
          this.editingCode = "";
          return;
        }
        const isDuplicate = this.packageCodes.some((item) => {
          const itemDate = new Date(item.date).toLocaleDateString();
          return itemDate === editingDate && item.code === newCode && item !== this.editingItem;
        });
        if (isDuplicate) {
          uni.showToast({
            title: "该日期已存在相同取件码",
            icon: "none",
            duration: 2e3
          });
          return;
        }
        this.editingItem.code = newCode;
        this.saveToStorage();
        this.editingItem = null;
        this.editingCode = "";
      },
      deleteCode(item) {
        this.vibrateShort();
        const newPackageCodes = this.packageCodes.filter((code) => code !== item);
        this.$set(this, "packageCodes", newPackageCodes);
        this.saveToStorage();
      },
      togglePicked(item) {
        this.vibrateShort();
        item.isPicked = !item.isPicked;
        this.saveToStorage();
      },
      getPendingCount(addressGroups) {
        return Object.values(addressGroups).flat().filter((item) => !item.isPicked).length;
      },
      getTextBeforeNumber(str) {
        return str.split(/\d+/)[0];
      },
      getNumber(str) {
        const match = str.match(/\d+/);
        return match ? match[0] : "";
      },
      getTextAfterNumber(str) {
        const parts = str.split(/\d+/);
        return parts.length > 1 ? parts[1] : "";
      },
      formatCode(code) {
        if (/^\d{8}$/.test(code)) {
          return code.replace(/(\d{4})(?=\d)/g, "$1 ");
        }
        return code;
      },
      async readSms() {
        this.vibrateShort();
        let that = this;
        var result = await permision.requestAndroidPermission(
          "android.permission.READ_SMS"
        );
        var msgList = [];
        if (result == 1) {
          var main = plus.android.runtimeMainActivity();
          var Uri = plus.android.importClass("android.net.Uri");
          var uri = Uri.parse("content://sms/");
          var cr = main.getContentResolver();
          plus.android.importClass(cr);
          uni.showLoading({
            title: "匹配短信記錄中.."
          });
          try {
            const now = /* @__PURE__ */ new Date();
            const fourDaysAgo = new Date(now);
            fourDaysAgo.setDate(now.getDate() - this.readDayCount);
            fourDaysAgo.setHours(0, 0, 1, 0);
            const startTime = fourDaysAgo.getTime();
            var selection = "date > " + startTime;
            var cur = cr.query(uri, null, selection, null, null);
            plus.android.importClass(cur);
            if (cur.moveToFirst()) {
              do {
                let newObj = {};
                var index_Address = cur.getColumnIndex("address");
                var address = cur.getString(index_Address);
                newObj.telphone = address;
                var index_Body = cur.getColumnIndex("body");
                var body = cur.getString(index_Body);
                newObj.content = body;
                if (body.includes("兔喜生活") || body.includes("递管家")) {
                  var index_Type = cur.getColumnIndex("type");
                  var type = cur.getString(index_Type);
                  newObj.type = type == 1 ? "接收" : "發送";
                  var smsDate = cur.getString(cur.getColumnIndex("date"));
                  smsDate = parseTime(smsDate);
                  newObj.sendDate = smsDate;
                  let extractInfo = await that.extractInfoStrict(body);
                  newObj.company = extractInfo.company;
                  newObj.address = extractInfo.address;
                  newObj.code = extractInfo.code;
                  msgList.push(newObj);
                }
              } while (cur.moveToNext());
            }
            cur.close();
            that.dyAddCode(msgList);
            uni.hideLoading();
          } catch (e) {
            formatAppLog("log", "at pages/index/index.vue:486", "获取短信失败", e);
            uni.hideLoading();
          }
        } else {
          uni.showToast({
            title: "请授权读取短信,仅用于匹配取件码",
            icon: "none"
          });
          setTimeout(() => {
            uni.hideToast();
          }, 3e3);
        }
      },
      extractInfoStrict(text) {
        const regexDiGuanjia = /您的([^已]+)已到([^，]+)，(?:请凭取件码|凭取件码|凭码|取件码)(\d{8})(?:到|取|有问题联系)/;
        const regexTuXilife = /您的([^，]+)包裹已到([^，]+)，凭([^，]+)来取/;
        if (text.includes("递管家")) {
          const matchDiGuanjia = text.match(regexDiGuanjia);
          if (matchDiGuanjia) {
            return {
              company: matchDiGuanjia[1],
              address: matchDiGuanjia[2],
              code: matchDiGuanjia[3]
            };
          }
        }
        if (text.includes("兔喜生活")) {
          const matchTuXilife = text.match(regexTuXilife);
          if (matchTuXilife) {
            formatAppLog("log", "at pages/index/index.vue:522", "兔喜生活匹配结果:", matchTuXilife);
            return {
              company: matchTuXilife[1],
              address: matchTuXilife[2],
              code: matchTuXilife[3]
            };
          }
        }
        return {
          code: ""
        };
      },
      dyAddCode(msgList) {
        for (let item of msgList) {
          if (this.packageCodes.some((i) => i.code === item.code)) {
            continue;
          }
          const newItem = {
            code: item.code,
            date: new Date(item.sendDate).toLocaleString(),
            sendDate: item.sendDate,
            company: item.company || "",
            address: item.address || "",
            isPicked: false,
            showActions: false
            // 添加 showActions 属性
          };
          this.packageCodes.unshift(newItem);
          this.saveToStorage();
        }
      },
      toggleMoreActions(item) {
        this.vibrateShort();
        if (!item.hasOwnProperty("showActions")) {
          this.$set(item, "showActions", false);
        }
        this.packageCodes.forEach((code) => {
          if (code !== item && code.showActions) {
            this.$set(code, "showActions", false);
          }
        });
        this.$set(item, "showActions", !item.showActions);
      },
      toggleDateActions(date) {
        this.vibrateShort();
        Object.keys(this.dateShowActions).forEach((key) => {
          if (key !== date && this.dateShowActions[key]) {
            this.$set(this.dateShowActions, key, false);
          }
        });
        this.$set(this.dateShowActions, date, !this.dateShowActions[date]);
      },
      deleteDate(date, group) {
        this.vibrateShort();
        uni.showModal({
          title: "确认删除",
          content: `是否删除 ${date} 的所有取件码？`,
          success: (res) => {
            if (res.confirm) {
              this.packageCodes = this.packageCodes.filter((item) => {
                const itemDate = new Date(item.date);
                const formattedDate = `${itemDate.getFullYear()}年${itemDate.getMonth() + 1}月${itemDate.getDate()}日`;
                return formattedDate !== date;
              });
              this.saveToStorage();
            }
            this.$set(this.dateShowActions, date, false);
          }
        });
      },
      getCompanyShortName(company) {
        if (!company)
          return "";
        if (/^[a-zA-Z\s]+$/.test(company)) {
          return company.trim().split(/\s+/)[0].substring(0, 2).toUpperCase();
        }
        return company.substring(0, 2);
      },
      isLastItem(item) {
        for (const [date, addressGroups] of Object.entries(this.groupedCodes)) {
          for (const [address, items] of Object.entries(addressGroups)) {
            if (items.includes(item) && items.indexOf(item) === items.length - 1) {
              return true;
            }
          }
        }
        return false;
      },
      clearInput() {
        this.vibrateShort();
        this.newCode = "";
      },
      getAppVersion() {
        try {
          this.version = plus.runtime.version;
        } catch (e) {
          formatAppLog("error", "at pages/index/index.vue:639", "获取版本号失败:", e);
        }
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    const _component_edit_dialog = vue.resolveComponent("edit-dialog");
    return vue.openBlock(), vue.createElementBlock("view", { class: "page-wrapper" }, [
      vue.createElementVNode("view", { class: "page-bg" }),
      vue.createElementVNode("view", { class: "container" }, [
        vue.createElementVNode("view", { class: "title-wrapper" }, [
          vue.createElementVNode("text", { class: "title" }, "取件码工具"),
          vue.createElementVNode(
            "text",
            { class: "version-text" },
            "V" + vue.toDisplayString($data.version),
            1
            /* TEXT */
          )
        ]),
        vue.createCommentVNode(" 输入区域 "),
        vue.createElementVNode("view", { class: "card input-card" }, [
          vue.createElementVNode("view", { class: "input-area" }, [
            vue.createElementVNode("view", { class: "input-wrapper" }, [
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  class: "code-input",
                  "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.newCode = $event),
                  type: "number",
                  placeholder: "请输入取件码"
                },
                null,
                512
                /* NEED_PATCH */
              ), [
                [vue.vModelText, $data.newCode]
              ]),
              $data.newCode ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "clear-btn",
                onClick: _cache[1] || (_cache[1] = (...args) => $options.clearInput && $options.clearInput(...args))
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "clear",
                  size: "14",
                  color: "#999"
                })
              ])) : vue.createCommentVNode("v-if", true)
            ]),
            vue.createElementVNode("button", {
              class: "add-btn",
              onClick: _cache[2] || (_cache[2] = (...args) => $options.addCode && $options.addCode(...args))
            }, [
              vue.createVNode(_component_uni_icons, {
                type: "plusempty",
                size: "18",
                color: "#fff"
              }),
              vue.createElementVNode("text", null, "添加")
            ]),
            vue.createElementVNode("button", {
              class: "read-sms-btn",
              onClick: _cache[3] || (_cache[3] = (...args) => $options.readSms && $options.readSms(...args))
            }, [
              vue.createVNode(_component_uni_icons, {
                type: "refresh",
                size: "18",
                color: "#1673ff"
              }),
              vue.createElementVNode("text", null, "自动匹配")
            ])
          ])
        ]),
        vue.createCommentVNode(" 日期显示 "),
        vue.createCommentVNode(' <view class="card">\r\n        <view class="date-display">\r\n          <text class="date-label">今天是:</text>\r\n          <text class="date">{{ today }}</text>\r\n        </view>\r\n      </view> '),
        vue.createCommentVNode(" 按日期分组的取件码列表 "),
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($options.groupedCodes, (dateGroup, date) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              key: date,
              class: "card code-card"
            }, [
              vue.createElementVNode("view", { class: "card-header" }, [
                vue.createElementVNode(
                  "text",
                  { class: "card-title" },
                  vue.toDisplayString(date),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode("view", { class: "header-right" }, [
                  vue.createElementVNode("text", { class: "card-extra" }, [
                    vue.createElementVNode(
                      "text",
                      { class: "pending-count" },
                      vue.toDisplayString($options.getPendingCount(dateGroup)),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("text", null, "个待取件")
                  ]),
                  vue.createCommentVNode(" 添加日期卡片的更多操作按钮 "),
                  vue.createElementVNode("view", { class: "date-more-actions" }, [
                    vue.createElementVNode("view", {
                      class: "more-btn",
                      onClick: vue.withModifiers(($event) => $options.toggleDateActions(date), ["stop"])
                    }, [
                      vue.createElementVNode("view", { class: "dots" }, [
                        vue.createElementVNode("view", { class: "dot" }),
                        vue.createElementVNode("view", { class: "dot" }),
                        vue.createElementVNode("view", { class: "dot" })
                      ])
                    ], 8, ["onClick"]),
                    vue.createCommentVNode(" 日期卡片的操作菜单 "),
                    $data.dateShowActions[date] ? (vue.openBlock(), vue.createElementBlock(
                      "view",
                      {
                        key: 0,
                        class: vue.normalizeClass(["action-menu", { "menu-up": $options.isLastItem(dateGroup) }])
                      },
                      [
                        vue.createElementVNode("view", {
                          class: "action-item delete",
                          onClick: vue.withModifiers(($event) => $options.deleteDate(date, dateGroup), ["stop"])
                        }, [
                          vue.createVNode(_component_uni_icons, {
                            type: "trash",
                            size: "16"
                          }),
                          vue.createElementVNode("text", null, "删除")
                        ], 8, ["onClick"])
                      ],
                      2
                      /* CLASS */
                    )) : vue.createCommentVNode("v-if", true)
                  ])
                ])
              ]),
              vue.createElementVNode("view", { class: "code-list" }, [
                vue.createCommentVNode(" 按地址分组显示 "),
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(dateGroup, (items, address) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      key: address,
                      class: "address-group"
                    }, [
                      vue.createElementVNode("view", { class: "address-header" }, [
                        vue.createElementVNode("image", {
                          class: "address-icon",
                          src: $data.yizhanIcon,
                          mode: "aspectFit"
                        }, null, 8, ["src"]),
                        vue.createElementVNode(
                          "text",
                          { class: "address-text" },
                          vue.toDisplayString(address),
                          1
                          /* TEXT */
                        )
                      ]),
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(items, (item, index) => {
                          return vue.openBlock(), vue.createElementBlock("view", {
                            class: "code-item",
                            key: index
                          }, [
                            vue.createElementVNode(
                              "view",
                              {
                                class: vue.normalizeClass(["code-content", { picked: item.isPicked }])
                              },
                              [
                                vue.createElementVNode("view", { class: "code-main" }, [
                                  vue.createElementVNode(
                                    "view",
                                    {
                                      class: vue.normalizeClass(["company-icon", { picked: item.isPicked }])
                                    },
                                    vue.toDisplayString($options.getCompanyShortName(item.company)),
                                    3
                                    /* TEXT, CLASS */
                                  ),
                                  vue.createElementVNode("view", { class: "code-info" }, [
                                    vue.createElementVNode(
                                      "view",
                                      { class: "code-text" },
                                      vue.toDisplayString($options.formatCode(item.code)),
                                      1
                                      /* TEXT */
                                    ),
                                    vue.createElementVNode(
                                      "view",
                                      {
                                        class: vue.normalizeClass(["code-desc", { picked: item.isPicked }])
                                      },
                                      [
                                        vue.createElementVNode(
                                          "text",
                                          null,
                                          vue.toDisplayString(item.sendDate ? item.sendDate.split(" ")[1] : "") + " " + vue.toDisplayString(item.isManual ? "添加" : "进站"),
                                          1
                                          /* TEXT */
                                        )
                                      ],
                                      2
                                      /* CLASS */
                                    )
                                  ])
                                ])
                              ],
                              2
                              /* CLASS */
                            ),
                            vue.createElementVNode("view", { class: "right-actions" }, [
                              vue.createCommentVNode(" 已取按钮 "),
                              vue.createElementVNode("view", {
                                class: vue.normalizeClass(["picked-btn", { "is-picked": item.isPicked }]),
                                onClick: ($event) => $options.togglePicked(item)
                              }, [
                                vue.createElementVNode(
                                  "text",
                                  null,
                                  vue.toDisplayString(item.isPicked ? "已取" : "取件"),
                                  1
                                  /* TEXT */
                                ),
                                item.isPicked ? (vue.openBlock(), vue.createElementBlock("text", {
                                  key: 0,
                                  class: "picked-icon"
                                }, "✓")) : vue.createCommentVNode("v-if", true)
                              ], 10, ["onClick"]),
                              vue.createCommentVNode(" 更多操作按钮 "),
                              vue.createElementVNode("view", { class: "more-actions" }, [
                                vue.createElementVNode("view", {
                                  class: "more-btn",
                                  onClick: vue.withModifiers(($event) => $options.toggleMoreActions(item), ["stop"])
                                }, [
                                  vue.createElementVNode("view", { class: "dots" }, [
                                    vue.createElementVNode("view", { class: "dot" }),
                                    vue.createElementVNode("view", { class: "dot" }),
                                    vue.createElementVNode("view", { class: "dot" })
                                  ])
                                ], 8, ["onClick"]),
                                vue.createCommentVNode(" 操作菜单 "),
                                item.showActions ? (vue.openBlock(), vue.createElementBlock(
                                  "view",
                                  {
                                    key: 0,
                                    class: vue.normalizeClass(["action-menu", { "menu-up": $options.isLastItem(item) }])
                                  },
                                  [
                                    vue.createElementVNode("view", {
                                      class: "action-item",
                                      onClick: vue.withModifiers(($event) => $options.editCode(item), ["stop"])
                                    }, [
                                      vue.createVNode(_component_uni_icons, {
                                        type: "compose",
                                        size: "16"
                                      }),
                                      vue.createElementVNode("text", null, "修改")
                                    ], 8, ["onClick"]),
                                    vue.createElementVNode("view", {
                                      class: "action-item delete",
                                      onClick: vue.withModifiers(($event) => $options.deleteCode(item), ["stop"])
                                    }, [
                                      vue.createVNode(_component_uni_icons, {
                                        type: "trash",
                                        size: "16"
                                      }),
                                      vue.createElementVNode("text", null, "删除")
                                    ], 8, ["onClick"])
                                  ],
                                  2
                                  /* CLASS */
                                )) : vue.createCommentVNode("v-if", true)
                              ])
                            ])
                          ]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ]),
      vue.createCommentVNode(" 添加 Dialog 组件 "),
      vue.createVNode(_component_edit_dialog, {
        show: $data.showEditDialog,
        "onUpdate:show": _cache[4] || (_cache[4] = ($event) => $data.showEditDialog = $event),
        value: $data.editingCode,
        onConfirm: $options.handleEditConfirm
      }, null, 8, ["show", "value", "onConfirm"])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "D:/mygitee/项目大全/pickUpCode/取件码/pages/index/index.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("warn", "at App.vue:4", "当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！");
      formatAppLog("log", "at App.vue:5", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:8", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:11", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "D:/mygitee/项目大全/pickUpCode/取件码/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
