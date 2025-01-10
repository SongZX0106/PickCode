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
  const _sfc_main$6 = {
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
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-d31e1c47"], ["__file", "D:/mygitee/项目大全/pickUpCode/取件码/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  const _sfc_main$5 = {
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
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
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
  const EditDialog = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-90e7d67e"], ["__file", "D:/mygitee/项目大全/pickUpCode/取件码/components/EditDialog.vue"]]);
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
  const _sfc_main$4 = {
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
        formatAppLog("error", "at pages/index/index.vue:254", "读取缓存失败:", e);
      }
      this.getAppVersion();
    },
    methods: {
      saveToStorage() {
        try {
          uni.setStorageSync("packageCodes", JSON.stringify(this.packageCodes));
        } catch (e) {
          formatAppLog("error", "at pages/index/index.vue:265", "保存缓存失败:", e);
        }
      },
      vibrateShort() {
        if (uni.getSystemInfoSync().platform !== "web") {
          uni.vibrateShort({
            success: function() {
              formatAppLog("log", "at pages/index/index.vue:273", "震动成功");
            },
            fail: function() {
              formatAppLog("log", "at pages/index/index.vue:276", "震动失败");
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
            formatAppLog("log", "at pages/index/index.vue:470", "获取短信失败", e);
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
            formatAppLog("log", "at pages/index/index.vue:506", "兔喜生活匹配结果:", matchTuXilife);
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
          formatAppLog("error", "at pages/index/index.vue:623", "获取版本号失败:", e);
        }
      },
      handlePageClick() {
        this.packageCodes.forEach((item) => {
          if (item.showActions) {
            this.$set(item, "showActions", false);
          }
        });
        Object.keys(this.dateShowActions).forEach((key) => {
          if (this.dateShowActions[key]) {
            this.$set(this.dateShowActions, key, false);
          }
        });
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$1);
    const _component_edit_dialog = vue.resolveComponent("edit-dialog");
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "page-wrapper",
      onClick: _cache[5] || (_cache[5] = (...args) => $options.handlePageClick && $options.handlePageClick(...args))
    }, [
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
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__file", "D:/mygitee/项目大全/pickUpCode/取件码/pages/index/index.vue"]]);
  class MPAnimation {
    constructor(options, _this) {
      this.options = options;
      this.animation = uni.createAnimation({
        ...options
      });
      this.currentStepAnimates = {};
      this.next = 0;
      this.$ = _this;
    }
    _nvuePushAnimates(type, args) {
      let aniObj = this.currentStepAnimates[this.next];
      let styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {}
        };
      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = "";
        }
        let unit = "";
        if (type === "rotate") {
          unit = "deg";
        }
        styles.styles.transform += `${type}(${args + unit}) `;
      } else {
        styles.styles[type] = `${args}`;
      }
      this.currentStepAnimates[this.next] = styles;
    }
    _animateRun(styles = {}, config = {}) {
      let ref = this.$.$refs["ani"].ref;
      if (!ref)
        return;
      return new Promise((resolve, reject) => {
        nvueAnimation.transition(ref, {
          styles,
          ...config
        }, (res) => {
          resolve();
        });
      });
    }
    _nvueNextAnimate(animates, step = 0, fn) {
      let obj = animates[step];
      if (obj) {
        let {
          styles,
          config
        } = obj;
        this._animateRun(styles, config).then(() => {
          step += 1;
          this._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === "function" && fn();
        this.isEnd = true;
      }
    }
    step(config = {}) {
      this.animation.step(config);
      return this;
    }
    run(fn) {
      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(() => {
        typeof fn === "function" && fn();
      }, this.$.durationTime);
    }
  }
  const animateTypes1 = [
    "matrix",
    "matrix3d",
    "rotate",
    "rotate3d",
    "rotateX",
    "rotateY",
    "rotateZ",
    "scale",
    "scale3d",
    "scaleX",
    "scaleY",
    "scaleZ",
    "skew",
    "skewX",
    "skewY",
    "translate",
    "translate3d",
    "translateX",
    "translateY",
    "translateZ"
  ];
  const animateTypes2 = ["opacity", "backgroundColor"];
  const animateTypes3 = ["width", "height", "left", "right", "top", "bottom"];
  animateTypes1.concat(animateTypes2, animateTypes3).forEach((type) => {
    MPAnimation.prototype[type] = function(...args) {
      this.animation[type](...args);
      return this;
    };
  });
  function createAnimation(option, _this) {
    if (!_this)
      return;
    clearTimeout(_this.timer);
    return new MPAnimation(option, _this);
  }
  const _sfc_main$3 = {
    name: "uniTransition",
    emits: ["click", "change"],
    props: {
      show: {
        type: Boolean,
        default: false
      },
      modeClass: {
        type: [Array, String],
        default() {
          return "fade";
        }
      },
      duration: {
        type: Number,
        default: 300
      },
      styles: {
        type: Object,
        default() {
          return {};
        }
      },
      customClass: {
        type: String,
        default: ""
      },
      onceRender: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isShow: false,
        transform: "",
        opacity: 1,
        animationData: {},
        durationTime: 300,
        config: {}
      };
    },
    watch: {
      show: {
        handler(newVal) {
          if (newVal) {
            this.open();
          } else {
            if (this.isShow) {
              this.close();
            }
          }
        },
        immediate: true
      }
    },
    computed: {
      // 生成样式数据
      stylesObject() {
        let styles = {
          ...this.styles,
          "transition-duration": this.duration / 1e3 + "s"
        };
        let transform = "";
        for (let i in styles) {
          let line = this.toLine(i);
          transform += line + ":" + styles[i] + ";";
        }
        return transform;
      },
      // 初始化动画条件
      transformStyles() {
        return "transform:" + this.transform + ";opacity:" + this.opacity + ";" + this.stylesObject;
      }
    },
    created() {
      this.config = {
        duration: this.duration,
        timingFunction: "ease",
        transformOrigin: "50% 50%",
        delay: 0
      };
      this.durationTime = this.duration;
    },
    methods: {
      /**
       *  ref 触发 初始化动画
       */
      init(obj = {}) {
        if (obj.duration) {
          this.durationTime = obj.duration;
        }
        this.animation = createAnimation(Object.assign(this.config, obj), this);
      },
      /**
       * 点击组件触发回调
       */
      onClick() {
        this.$emit("click", {
          detail: this.isShow
        });
      },
      /**
       * ref 触发 动画分组
       * @param {Object} obj
       */
      step(obj, config = {}) {
        if (!this.animation)
          return;
        for (let i in obj) {
          try {
            if (typeof obj[i] === "object") {
              this.animation[i](...obj[i]);
            } else {
              this.animation[i](obj[i]);
            }
          } catch (e) {
            formatAppLog("error", "at uni_modules/uni-transition/components/uni-transition/uni-transition.vue:148", `方法 ${i} 不存在`);
          }
        }
        this.animation.step(config);
        return this;
      },
      /**
       *  ref 触发 执行动画
       */
      run(fn) {
        if (!this.animation)
          return;
        this.animation.run(fn);
      },
      // 开始过度动画
      open() {
        clearTimeout(this.timer);
        this.transform = "";
        this.isShow = true;
        let { opacity, transform } = this.styleInit(false);
        if (typeof opacity !== "undefined") {
          this.opacity = opacity;
        }
        this.transform = transform;
        this.$nextTick(() => {
          this.timer = setTimeout(() => {
            this.animation = createAnimation(this.config, this);
            this.tranfromInit(false).step();
            this.animation.run();
            this.$emit("change", {
              detail: this.isShow
            });
          }, 20);
        });
      },
      // 关闭过度动画
      close(type) {
        if (!this.animation)
          return;
        this.tranfromInit(true).step().run(() => {
          this.isShow = false;
          this.animationData = null;
          this.animation = null;
          let { opacity, transform } = this.styleInit(false);
          this.opacity = opacity || 1;
          this.transform = transform;
          this.$emit("change", {
            detail: this.isShow
          });
        });
      },
      // 处理动画开始前的默认样式
      styleInit(type) {
        let styles = {
          transform: ""
        };
        let buildStyle = (type2, mode) => {
          if (mode === "fade") {
            styles.opacity = this.animationType(type2)[mode];
          } else {
            styles.transform += this.animationType(type2)[mode] + " ";
          }
        };
        if (typeof this.modeClass === "string") {
          buildStyle(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildStyle(type, mode);
          });
        }
        return styles;
      },
      // 处理内置组合动画
      tranfromInit(type) {
        let buildTranfrom = (type2, mode) => {
          let aniNum = null;
          if (mode === "fade") {
            aniNum = type2 ? 0 : 1;
          } else {
            aniNum = type2 ? "-100%" : "0";
            if (mode === "zoom-in") {
              aniNum = type2 ? 0.8 : 1;
            }
            if (mode === "zoom-out") {
              aniNum = type2 ? 1.2 : 1;
            }
            if (mode === "slide-right") {
              aniNum = type2 ? "100%" : "0";
            }
            if (mode === "slide-bottom") {
              aniNum = type2 ? "100%" : "0";
            }
          }
          this.animation[this.animationMode()[mode]](aniNum);
        };
        if (typeof this.modeClass === "string") {
          buildTranfrom(type, this.modeClass);
        } else {
          this.modeClass.forEach((mode) => {
            buildTranfrom(type, mode);
          });
        }
        return this.animation;
      },
      animationType(type) {
        return {
          fade: type ? 0 : 1,
          "slide-top": `translateY(${type ? "0" : "-100%"})`,
          "slide-right": `translateX(${type ? "0" : "100%"})`,
          "slide-bottom": `translateY(${type ? "0" : "100%"})`,
          "slide-left": `translateX(${type ? "0" : "-100%"})`,
          "zoom-in": `scaleX(${type ? 1 : 0.8}) scaleY(${type ? 1 : 0.8})`,
          "zoom-out": `scaleX(${type ? 1 : 1.2}) scaleY(${type ? 1 : 1.2})`
        };
      },
      // 内置动画类型与实际动画对应字典
      animationMode() {
        return {
          fade: "opacity",
          "slide-top": "translateY",
          "slide-right": "translateX",
          "slide-bottom": "translateY",
          "slide-left": "translateX",
          "zoom-in": "scale",
          "zoom-out": "scale"
        };
      },
      // 驼峰转中横线
      toLine(name) {
        return name.replace(/([A-Z])/g, "-$1").toLowerCase();
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.withDirectives((vue.openBlock(), vue.createElementBlock("view", {
      ref: "ani",
      animation: $data.animationData,
      class: vue.normalizeClass($props.customClass),
      style: vue.normalizeStyle($options.transformStyles),
      onClick: _cache[0] || (_cache[0] = (...args) => $options.onClick && $options.onClick(...args))
    }, [
      vue.renderSlot(_ctx.$slots, "default")
    ], 14, ["animation"])), [
      [vue.vShow, $data.isShow]
    ]);
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "D:/mygitee/项目大全/pickUpCode/取件码/uni_modules/uni-transition/components/uni-transition/uni-transition.vue"]]);
  const _sfc_main$2 = {
    name: "uniPopup",
    components: {},
    emits: ["change", "maskClick"],
    props: {
      // 开启动画
      animation: {
        type: Boolean,
        default: true
      },
      // 弹出层类型，可选值，top: 顶部弹出层；bottom：底部弹出层；center：全屏弹出层
      // message: 消息提示 ; dialog : 对话框
      type: {
        type: String,
        default: "center"
      },
      // maskClick
      isMaskClick: {
        type: Boolean,
        default: null
      },
      // TODO 2 个版本后废弃属性 ，使用 isMaskClick
      maskClick: {
        type: Boolean,
        default: null
      },
      backgroundColor: {
        type: String,
        default: "none"
      },
      safeArea: {
        type: Boolean,
        default: true
      },
      maskBackgroundColor: {
        type: String,
        default: "rgba(0, 0, 0, 0.4)"
      },
      borderRadius: {
        type: String
      }
    },
    watch: {
      /**
       * 监听type类型
       */
      type: {
        handler: function(type) {
          if (!this.config[type])
            return;
          this[this.config[type]](true);
        },
        immediate: true
      },
      isDesktop: {
        handler: function(newVal) {
          if (!this.config[newVal])
            return;
          this[this.config[this.type]](true);
        },
        immediate: true
      },
      /**
       * 监听遮罩是否可点击
       * @param {Object} val
       */
      maskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      isMaskClick: {
        handler: function(val) {
          this.mkclick = val;
        },
        immediate: true
      },
      // H5 下禁止底部滚动
      showPopup(show) {
      }
    },
    data() {
      return {
        duration: 300,
        ani: [],
        showPopup: false,
        showTrans: false,
        popupWidth: 0,
        popupHeight: 0,
        config: {
          top: "top",
          bottom: "bottom",
          center: "center",
          left: "left",
          right: "right",
          message: "top",
          dialog: "center",
          share: "bottom"
        },
        maskClass: {
          position: "fixed",
          bottom: 0,
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(0, 0, 0, 0.4)"
        },
        transClass: {
          backgroundColor: "transparent",
          borderRadius: this.borderRadius || "0",
          position: "fixed",
          left: 0,
          right: 0
        },
        maskShow: true,
        mkclick: true,
        popupstyle: "top"
      };
    },
    computed: {
      getStyles() {
        let res = { backgroundColor: this.bg };
        if (this.borderRadius || "0") {
          res = Object.assign(res, { borderRadius: this.borderRadius });
        }
        return res;
      },
      isDesktop() {
        return this.popupWidth >= 500 && this.popupHeight >= 500;
      },
      bg() {
        if (this.backgroundColor === "" || this.backgroundColor === "none") {
          return "transparent";
        }
        return this.backgroundColor;
      }
    },
    mounted() {
      const fixSize = () => {
        const {
          windowWidth,
          windowHeight,
          windowTop,
          safeArea,
          screenHeight,
          safeAreaInsets
        } = uni.getSystemInfoSync();
        this.popupWidth = windowWidth;
        this.popupHeight = windowHeight + (windowTop || 0);
        if (safeArea && this.safeArea) {
          this.safeAreaInsets = safeAreaInsets.bottom;
        } else {
          this.safeAreaInsets = 0;
        }
      };
      fixSize();
    },
    // TODO vue3
    unmounted() {
      this.setH5Visible();
    },
    activated() {
      this.setH5Visible(!this.showPopup);
    },
    deactivated() {
      this.setH5Visible(true);
    },
    created() {
      if (this.isMaskClick === null && this.maskClick === null) {
        this.mkclick = true;
      } else {
        this.mkclick = this.isMaskClick !== null ? this.isMaskClick : this.maskClick;
      }
      if (this.animation) {
        this.duration = 300;
      } else {
        this.duration = 0;
      }
      this.messageChild = null;
      this.clearPropagation = false;
      this.maskClass.backgroundColor = this.maskBackgroundColor;
    },
    methods: {
      setH5Visible(visible = true) {
      },
      /**
       * 公用方法，不显示遮罩层
       */
      closeMask() {
        this.maskShow = false;
      },
      /**
       * 公用方法，遮罩层禁止点击
       */
      disableMask() {
        this.mkclick = false;
      },
      // TODO nvue 取消冒泡
      clear(e) {
        e.stopPropagation();
        this.clearPropagation = true;
      },
      open(direction) {
        if (this.showPopup) {
          return;
        }
        let innerType = ["top", "center", "bottom", "left", "right", "message", "dialog", "share"];
        if (!(direction && innerType.indexOf(direction) !== -1)) {
          direction = this.type;
        }
        if (!this.config[direction]) {
          formatAppLog("error", "at uni_modules/uni-popup/components/uni-popup/uni-popup.vue:298", "缺少类型：", direction);
          return;
        }
        this[this.config[direction]]();
        this.$emit("change", {
          show: true,
          type: direction
        });
      },
      close(type) {
        this.showTrans = false;
        this.$emit("change", {
          show: false,
          type: this.type
        });
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.showPopup = false;
        }, 300);
      },
      // TODO 处理冒泡事件，头条的冒泡事件有问题 ，先这样兼容
      touchstart() {
        this.clearPropagation = false;
      },
      onTap() {
        if (this.clearPropagation) {
          this.clearPropagation = false;
          return;
        }
        this.$emit("maskClick");
        if (!this.mkclick)
          return;
        this.close();
      },
      /**
       * 顶部弹出样式处理
       */
      top(type) {
        this.popupstyle = this.isDesktop ? "fixforpc-top" : "top";
        this.ani = ["slide-top"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
        this.$nextTick(() => {
          if (this.messageChild && this.type === "message") {
            this.messageChild.timerClose();
          }
        });
      },
      /**
       * 底部弹出样式处理
       */
      bottom(type) {
        this.popupstyle = "bottom";
        this.ani = ["slide-bottom"];
        this.transClass = {
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: this.safeAreaInsets + "px",
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      /**
       * 中间弹出样式处理
       */
      center(type) {
        this.popupstyle = "center";
        this.ani = ["zoom-out", "fade"];
        this.transClass = {
          position: "fixed",
          display: "flex",
          flexDirection: "column",
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: this.borderRadius || "0"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      left(type) {
        this.popupstyle = "left";
        this.ani = ["slide-left"];
        this.transClass = {
          position: "fixed",
          left: 0,
          bottom: 0,
          top: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0",
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      },
      right(type) {
        this.popupstyle = "right";
        this.ani = ["slide-right"];
        this.transClass = {
          position: "fixed",
          bottom: 0,
          right: 0,
          top: 0,
          backgroundColor: this.bg,
          borderRadius: this.borderRadius || "0",
          display: "flex",
          flexDirection: "column"
        };
        if (type)
          return;
        this.showPopup = true;
        this.showTrans = true;
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_transition = resolveEasycom(vue.resolveDynamicComponent("uni-transition"), __easycom_0);
    return $data.showPopup ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["uni-popup", [$data.popupstyle, $options.isDesktop ? "fixforpc-z-index" : ""]])
      },
      [
        vue.createElementVNode(
          "view",
          {
            onTouchstart: _cache[1] || (_cache[1] = (...args) => $options.touchstart && $options.touchstart(...args))
          },
          [
            $data.maskShow ? (vue.openBlock(), vue.createBlock(_component_uni_transition, {
              key: "1",
              name: "mask",
              "mode-class": "fade",
              styles: $data.maskClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, null, 8, ["styles", "duration", "show", "onClick"])) : vue.createCommentVNode("v-if", true),
            vue.createVNode(_component_uni_transition, {
              key: "2",
              "mode-class": $data.ani,
              name: "content",
              styles: $data.transClass,
              duration: $data.duration,
              show: $data.showTrans,
              onClick: $options.onTap
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode(
                  "view",
                  {
                    class: vue.normalizeClass(["uni-popup__wrapper", [$data.popupstyle]]),
                    style: vue.normalizeStyle($options.getStyles),
                    onClick: _cache[0] || (_cache[0] = (...args) => $options.clear && $options.clear(...args))
                  },
                  [
                    vue.renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ],
                  6
                  /* CLASS, STYLE */
                )
              ]),
              _: 3
              /* FORWARDED */
            }, 8, ["mode-class", "styles", "duration", "show", "onClick"])
          ],
          32
          /* NEED_HYDRATION */
        )
      ],
      2
      /* CLASS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__scopeId", "data-v-4dd3c44b"], ["__file", "D:/mygitee/项目大全/pickUpCode/取件码/uni_modules/uni-popup/components/uni-popup/uni-popup.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {
        packages: [],
        platforms: ["淘宝", "京东", "拼多多", "其他"],
        platformIndex: 0,
        newPackage: {
          platform: "",
          name: "",
          price: ""
        },
        version: "1.0.0"
      };
    },
    computed: {
      groupedPackages() {
        const groups = {};
        this.packages.forEach((item) => {
          const date = new Date(item.date);
          const formattedDate = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
          if (!groups[formattedDate]) {
            groups[formattedDate] = {};
          }
          const platform = item.platform;
          if (!groups[formattedDate][platform]) {
            groups[formattedDate][platform] = [];
          }
          groups[formattedDate][platform].push(item);
        });
        return this.sortGroupsByDate(groups);
      }
    },
    methods: {
      showAddPackage() {
        this.vibrateShort();
        this.resetForm();
        this.$refs.popup.open();
      },
      hideAddPackage() {
        this.$refs.popup.close();
        this.resetForm();
      },
      resetForm() {
        this.platformIndex = 0;
        this.newPackage = {
          platform: this.platforms[0],
          name: "",
          price: ""
        };
      },
      onPlatformChange(e) {
        this.platformIndex = e.detail.value;
        this.newPackage.platform = this.platforms[this.platformIndex];
      },
      addPackage() {
        if (!this.newPackage.platform || !this.newPackage.name || !this.newPackage.price) {
          uni.showToast({
            title: "请填写完整信息",
            icon: "none"
          });
          return;
        }
        const packageItem = {
          ...this.newPackage,
          date: (/* @__PURE__ */ new Date()).toLocaleString(),
          showActions: false
        };
        this.packages.unshift(packageItem);
        this.saveToStorage();
        this.hideAddPackage();
        this.vibrateShort();
      },
      getPlatformIcon(platform) {
        const icons = {
          淘宝: "/static/images/taobao.png",
          京东: "/static/images/jd.png",
          拼多多: "/static/images/pinduoduo.png",
          其他: "/static/images/other.png"
        };
        return icons[platform] || icons["其他"];
      },
      getTotalAmount(dateGroup) {
        let total = 0;
        Object.values(dateGroup).forEach((items) => {
          items.forEach((item) => {
            total += parseFloat(item.price) || 0;
          });
        });
        return total.toFixed(2);
      },
      handlePageClick() {
        this.packages.forEach((item) => {
          if (item.showActions) {
            this.$set(item, "showActions", false);
          }
        });
      },
      sortGroupsByDate(groups) {
        const sortedGroups = Object.entries(groups).sort((a, b) => {
          return new Date(b[0].replace(/(\d+)年(\d+)月(\d+)日/, "$1-$2-$3")) - new Date(a[0].replace(/(\d+)年(\d+)月(\d+)日/, "$1-$2-$3"));
        });
        const sortedGroupsObj = {};
        sortedGroups.forEach(([date, platformGroups]) => {
          sortedGroupsObj[date] = platformGroups;
        });
        return sortedGroupsObj;
      },
      vibrateShort() {
        if (uni.getSystemInfoSync().platform !== "web") {
          uni.vibrateShort({
            success: function() {
              formatAppLog("log", "at pages/packages/index.vue:307", "震动成功");
            },
            fail: function() {
              formatAppLog("log", "at pages/packages/index.vue:310", "震动失败");
            }
          });
        }
      },
      saveToStorage() {
        try {
          uni.setStorageSync("packages", JSON.stringify(this.packages));
        } catch (e) {
          formatAppLog("error", "at pages/packages/index.vue:319", "保存缓存失败:", e);
        }
      },
      getAppVersion() {
        try {
          this.version = plus.runtime.version;
        } catch (e) {
          formatAppLog("error", "at pages/packages/index.vue:327", "获取版本号失败:", e);
        }
      },
      isLastItem(item) {
        for (const [date, platformGroups] of Object.entries(
          this.groupedPackages
        )) {
          for (const [platform, items] of Object.entries(platformGroups)) {
            if (items.includes(item) && items.indexOf(item) === items.length - 1) {
              return true;
            }
          }
        }
        return false;
      },
      toggleMoreActions(item) {
        this.vibrateShort();
        if (!item.hasOwnProperty("showActions")) {
          this.$set(item, "showActions", false);
        }
        this.packages.forEach((pkg) => {
          if (pkg !== item && pkg.showActions) {
            this.$set(pkg, "showActions", false);
          }
        });
        this.$set(item, "showActions", !item.showActions);
      },
      editPackage(item) {
        this.vibrateShort();
        uni.showToast({
          title: "编辑功能开发中",
          icon: "none"
        });
      },
      deletePackage(item) {
        this.vibrateShort();
        uni.showModal({
          title: "确认删除",
          content: "是否删除该包裹记录？",
          success: (res) => {
            if (res.confirm) {
              this.packages = this.packages.filter((pkg) => pkg !== item);
              this.saveToStorage();
            }
          }
        });
      },
      formatPrice(price) {
        return parseFloat(price).toFixed(2);
      },
      formatTime(date) {
        const d = new Date(date);
        const hours = d.getHours().toString().padStart(2, "0");
        const minutes = d.getMinutes().toString().padStart(2, "0");
        return `${hours}:${minutes}`;
      },
      selectPlatform(index) {
        this.platformIndex = index;
        this.newPackage.platform = this.platforms[index];
        this.vibrateShort();
      },
      focusPriceInput() {
        this.$nextTick(() => {
          const priceInput = this.$refs.priceInput;
          if (priceInput) {
            priceInput.focus();
          }
        });
      }
    },
    created() {
      try {
        const savedPackages = uni.getStorageSync("packages");
        if (savedPackages) {
          this.packages = JSON.parse(savedPackages);
        }
      } catch (e) {
        formatAppLog("error", "at pages/packages/index.vue:416", "读取缓存失败:", e);
      }
      this.getAppVersion();
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0$1);
    const _component_uni_popup = resolveEasycom(vue.resolveDynamicComponent("uni-popup"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "page-wrapper",
      onClick: _cache[6] || (_cache[6] = (...args) => $options.handlePageClick && $options.handlePageClick(...args))
    }, [
      vue.createElementVNode("view", { class: "page-bg" }),
      vue.createElementVNode("view", { class: "container" }, [
        vue.createElementVNode("view", { class: "title-wrapper" }, [
          vue.createElementVNode("text", { class: "title" }, "包裹记录"),
          vue.createElementVNode(
            "text",
            { class: "version-text" },
            "V" + vue.toDisplayString($data.version),
            1
            /* TEXT */
          )
        ]),
        vue.createCommentVNode(" 包裹列表 "),
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($options.groupedPackages, (dateGroup, date) => {
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
                      vue.toDisplayString($options.getTotalAmount(dateGroup)),
                      1
                      /* TEXT */
                    ),
                    vue.createElementVNode("text", null, "元")
                  ])
                ])
              ]),
              vue.createElementVNode("view", { class: "code-list" }, [
                vue.createCommentVNode(" 按平台分组显示 "),
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList(dateGroup, (items, platform) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      key: platform,
                      class: "platform-group"
                    }, [
                      vue.createElementVNode("view", { class: "platform-header" }, [
                        vue.createElementVNode("image", {
                          class: "platform-icon",
                          src: $options.getPlatformIcon(platform),
                          mode: "aspectFit"
                        }, null, 8, ["src"]),
                        vue.createElementVNode(
                          "text",
                          { class: "platform-name" },
                          vue.toDisplayString(platform),
                          1
                          /* TEXT */
                        )
                      ]),
                      (vue.openBlock(true), vue.createElementBlock(
                        vue.Fragment,
                        null,
                        vue.renderList(items, (item, index) => {
                          return vue.openBlock(), vue.createElementBlock("view", {
                            class: "package-item",
                            key: index
                          }, [
                            vue.createElementVNode("view", { class: "package-content" }, [
                              vue.createElementVNode(
                                "view",
                                { class: "package-name text-ellipsis" },
                                vue.toDisplayString(item.name),
                                1
                                /* TEXT */
                              ),
                              vue.createElementVNode("view", { class: "package-meta" }, [
                                vue.createElementVNode(
                                  "text",
                                  { class: "package-time" },
                                  vue.toDisplayString($options.formatTime(item.date)),
                                  1
                                  /* TEXT */
                                )
                              ])
                            ]),
                            vue.createElementVNode("view", { class: "package-actions" }, [
                              vue.createElementVNode(
                                "view",
                                { class: "package-price" },
                                vue.toDisplayString($options.formatPrice(item.price)),
                                1
                                /* TEXT */
                              ),
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
                                      onClick: vue.withModifiers(($event) => $options.editPackage(item), ["stop"])
                                    }, [
                                      vue.createVNode(_component_uni_icons, {
                                        type: "compose",
                                        size: "16"
                                      }),
                                      vue.createElementVNode("text", null, "修改")
                                    ], 8, ["onClick"]),
                                    vue.createElementVNode("view", {
                                      class: "action-item delete",
                                      onClick: vue.withModifiers(($event) => $options.deletePackage(item), ["stop"])
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
      vue.createCommentVNode(" 添加按钮 "),
      vue.createElementVNode("view", {
        class: "add-package-btn",
        onClick: _cache[0] || (_cache[0] = (...args) => $options.showAddPackage && $options.showAddPackage(...args))
      }, [
        vue.createVNode(_component_uni_icons, {
          type: "plusempty",
          size: "24",
          color: "#fff"
        })
      ]),
      vue.createCommentVNode(" 添加包裹弹出层 "),
      vue.createVNode(
        _component_uni_popup,
        {
          ref: "popup",
          type: "bottom"
        },
        {
          default: vue.withCtx(() => [
            vue.createElementVNode("view", { class: "popup-content" }, [
              vue.createElementVNode("view", { class: "popup-header" }, [
                vue.createElementVNode("text", { class: "popup-title" }, "添加包裹"),
                vue.createElementVNode("view", {
                  class: "close-btn",
                  onClick: _cache[1] || (_cache[1] = (...args) => $options.hideAddPackage && $options.hideAddPackage(...args))
                }, [
                  vue.createVNode(_component_uni_icons, {
                    type: "close",
                    size: "20",
                    color: "#999"
                  })
                ])
              ]),
              vue.createElementVNode("view", { class: "popup-body" }, [
                vue.createCommentVNode(" 平台选择卡片 "),
                vue.createElementVNode("view", { class: "platform-select" }, [
                  vue.createElementVNode("text", { class: "label" }, "选择平台"),
                  vue.createElementVNode("view", { class: "platform-cards" }, [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList($data.platforms, (platform, index) => {
                        return vue.openBlock(), vue.createElementBlock("view", {
                          key: platform,
                          class: vue.normalizeClass(["platform-card", { active: $data.platformIndex === index }]),
                          onClick: ($event) => $options.selectPlatform(index)
                        }, [
                          vue.createElementVNode("image", {
                            class: "platform-icon",
                            src: $options.getPlatformIcon(platform),
                            mode: "aspectFit"
                          }, null, 8, ["src"]),
                          vue.createElementVNode(
                            "text",
                            { class: "platform-name" },
                            vue.toDisplayString(platform),
                            1
                            /* TEXT */
                          )
                        ], 10, ["onClick"]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])
                ]),
                vue.createCommentVNode(" 表单输入区域 "),
                vue.createElementVNode("view", { class: "form-inputs" }, [
                  vue.createElementVNode("view", { class: "form-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "商品名称"),
                    vue.withDirectives(vue.createElementVNode(
                      "input",
                      {
                        class: "input",
                        "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.newPackage.name = $event),
                        placeholder: "请输入商品名称",
                        "confirm-type": "next",
                        onConfirm: _cache[3] || (_cache[3] = (...args) => $options.focusPriceInput && $options.focusPriceInput(...args))
                      },
                      null,
                      544
                      /* NEED_HYDRATION, NEED_PATCH */
                    ), [
                      [vue.vModelText, $data.newPackage.name]
                    ])
                  ]),
                  vue.createElementVNode("view", { class: "form-item" }, [
                    vue.createElementVNode("text", { class: "label" }, "价格"),
                    vue.withDirectives(vue.createElementVNode(
                      "input",
                      {
                        class: "input",
                        "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.newPackage.price = $event),
                        type: "digit",
                        placeholder: "请输入价格",
                        ref: "priceInput"
                      },
                      null,
                      512
                      /* NEED_PATCH */
                    ), [
                      [vue.vModelText, $data.newPackage.price]
                    ])
                  ])
                ])
              ]),
              vue.createElementVNode("view", { class: "popup-footer" }, [
                vue.createElementVNode("button", {
                  class: "submit-btn",
                  onClick: _cache[5] || (_cache[5] = (...args) => $options.addPackage && $options.addPackage(...args))
                }, "确定")
              ])
            ])
          ]),
          _: 1
          /* STABLE */
        },
        512
        /* NEED_PATCH */
      )
    ]);
  }
  const PagesPackagesIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "D:/mygitee/项目大全/pickUpCode/取件码/pages/packages/index.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/packages/index", PagesPackagesIndex);
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
