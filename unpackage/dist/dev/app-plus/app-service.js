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
  const global2 = uni.requireGlobal();
  ArrayBuffer = global2.ArrayBuffer;
  Int8Array = global2.Int8Array;
  Uint8Array = global2.Uint8Array;
  Uint8ClampedArray = global2.Uint8ClampedArray;
  Int16Array = global2.Int16Array;
  Uint16Array = global2.Uint16Array;
  Int32Array = global2.Int32Array;
  Uint32Array = global2.Uint32Array;
  Float32Array = global2.Float32Array;
  Float64Array = global2.Float64Array;
  BigInt64Array = global2.BigInt64Array;
  BigUint64Array = global2.BigUint64Array;
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
  const _sfc_main$c = {
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
  function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
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
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$b], ["__scopeId", "data-v-d31e1c47"], ["__file", "D:/mygitee/项目大全/pickUpCode/取件码/uni_modules/uni-icons/components/uni-icons/uni-icons.vue"]]);
  const _sfc_main$b = {
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
  function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
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
              type: "text",
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
  const EditDialog = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$a], ["__scopeId", "data-v-90e7d67e"], ["__file", "D:/mygitee/项目大全/pickUpCode/取件码/components/EditDialog.vue"]]);
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
  const _sfc_main$a = {
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
        formatAppLog("error", "at pages/index/index.vue:253", "读取缓存失败:", e);
      }
      this.getAppVersion();
    },
    methods: {
      saveToStorage() {
        try {
          uni.setStorageSync("packageCodes", JSON.stringify(this.packageCodes));
        } catch (e) {
          formatAppLog("error", "at pages/index/index.vue:264", "保存缓存失败:", e);
        }
      },
      vibrateShort() {
        if (uni.getSystemInfoSync().platform !== "web") {
          uni.vibrateShort({
            success: function() {
              formatAppLog("log", "at pages/index/index.vue:272", "震动成功");
            },
            fail: function() {
              formatAppLog("log", "at pages/index/index.vue:275", "震动失败");
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
      // 使用匹配规则提取信息
      extractInfoByRules(content) {
        const info = {
          code: "",
          express: "",
          address: ""
        };
        const rulesList = JSON.parse(uni.getStorageSync("matchRulesList") || "[]");
        const enabledRule = rulesList.find((rule) => rule.enabled);
        if (!enabledRule) {
          return info;
        }
        Object.keys(enabledRule.rules).forEach((key) => {
          const rule = enabledRule.rules[key];
          if (rule.start && rule.end) {
            const startIndex = content.indexOf(rule.start);
            const endIndex = content.indexOf(rule.end, startIndex + rule.start.length);
            if (startIndex !== -1 && endIndex !== -1) {
              info[key] = content.substring(startIndex + rule.start.length, endIndex).trim();
            }
          }
        });
        return info;
      },
      // 读取短信
      async readSms() {
        this.vibrateShort();
        if (plus.os.name === "Android") {
          var result = await permision.requestAndroidPermission("android.permission.READ_SMS");
          if (result == 1) {
            var main = plus.android.runtimeMainActivity();
            var Uri = plus.android.importClass("android.net.Uri");
            var uri = Uri.parse("content://sms/");
            var cr = main.getContentResolver();
            plus.android.importClass(cr);
            uni.showLoading({
              title: "匹配短信记录中.."
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
                let msgList = [];
                do {
                  let newObj = {};
                  var index_Address = cur.getColumnIndex("address");
                  var address = cur.getString(index_Address);
                  newObj.telphone = address;
                  var index_Body = cur.getColumnIndex("body");
                  var body = cur.getString(index_Body);
                  newObj.content = body;
                  var smsDate = cur.getString(cur.getColumnIndex("date"));
                  smsDate = parseTime(smsDate);
                  newObj.sendDate = smsDate;
                  let extractInfo = this.extractInfoByRules(body);
                  if (extractInfo.code) {
                    newObj.code = extractInfo.code;
                    newObj.company = extractInfo.express || "未知快递";
                    newObj.address = extractInfo.address || "未知地址";
                    msgList.push(newObj);
                  }
                } while (cur.moveToNext());
                this.dyAddCode(msgList);
              }
              cur.close();
              uni.hideLoading();
            } catch (e) {
              formatAppLog("error", "at pages/index/index.vue:496", "获取短信失败", e);
              uni.hideLoading();
              uni.showToast({
                title: "读取短信失败",
                icon: "none"
              });
            }
          } else {
            uni.showToast({
              title: "请授权读取短信权限",
              icon: "none"
            });
          }
        }
      },
      // 动态添加取件码
      dyAddCode(msgList) {
        for (let item of msgList) {
          if (this.packageCodes.some((i) => i.code === item.code)) {
            continue;
          }
          const newItem = {
            code: item.code,
            date: new Date(item.sendDate).toLocaleString(),
            sendDate: item.sendDate,
            company: item.company,
            address: item.address,
            isPicked: false,
            showActions: false
          };
          this.packageCodes.unshift(newItem);
          this.saveToStorage();
        }
        if (msgList.length === 0) {
          uni.showToast({
            title: "暂无匹配结果",
            icon: "none"
          });
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
          formatAppLog("error", "at pages/index/index.vue:624", "获取版本号失败:", e);
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
  function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    const _component_edit_dialog = vue.resolveComponent("edit-dialog");
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "page-wrapper",
      onClick: _cache[5] || (_cache[5] = (...args) => $options.handlePageClick && $options.handlePageClick(...args))
    }, [
      vue.createElementVNode("view", { class: "page-bg" }),
      vue.createElementVNode("view", { class: "container" }, [
        vue.createElementVNode("view", { class: "title-wrapper" }, [
          vue.createElementVNode("text", { class: "title" }, "取件列表")
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
                  type: "text",
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
                                        size: "16",
                                        color: "#ff0000"
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
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$9], ["__file", "D:/mygitee/项目大全/pickUpCode/取件码/pages/index/index.vue"]]);
  const taobao = "/static/images/taobao.png";
  const jingdong = "/static/images/jd.png";
  const pinduoduo = "/static/images/pinduoduo.png";
  const douyin = "/static/images/douyin.png";
  const weipinhui = "/static/images/weipinhui.png";
  const xiaohongshu = "/static/images/xiaohongshu.png";
  const alibaba = "/static/images/1688.png";
  const other = "/static/images/other.png";
  const _imports_0$2 = "/static/images/package-illustration.png";
  const _sfc_main$9 = {
    data() {
      return {
        version: "1.0.0",
        taobao,
        jingdong,
        pinduoduo,
        douyin,
        weipinhui,
        xiaohongshu,
        alibaba,
        other,
        tableData: [],
        platforms: ["淘宝", "京东", "拼多多", "抖音", "唯品会", "小红书", "1688", "其他"],
        menuStyle: {
          top: "0px",
          right: "25px"
        },
        autoFocus: false
      };
    },
    methods: {
      formatDate(date) {
        const [year, month, day] = date.split("-");
        return `${year}年${parseInt(month)}月${parseInt(day)}日`;
      },
      getPlatformAmount(items) {
        return items.reduce((sum, item) => {
          const price = parseFloat(item.price || "0");
          return sum + (isNaN(price) ? 0 : price);
        }, 0).toFixed(2);
      },
      toggleMoreActions(item, date) {
        this.vibrateShort();
        this.tableData.forEach((group) => {
          group.list.forEach((goods) => {
            if (goods !== item) {
              this.$set(goods, "showActions", false);
            }
          });
        });
        this.$set(item, "showActions", !item.showActions);
      },
      showAddPackage() {
        this.vibrateShort();
        uni.navigateTo({
          url: "/pages/packages/edit",
          animationType: "slide-in-right",
          animationDuration: 300
        });
      },
      showEditPackage(item, date) {
        this.vibrateShort();
        uni.setStorageSync("editData", JSON.stringify({
          item,
          date,
          index: this.tableData.find((group) => group.date === date).list.findIndex((i) => i === item)
        }));
        this.$set(item, "showActions", false);
        uni.navigateTo({
          url: "/pages/packages/edit?type=edit"
        });
      },
      handlePageClick() {
        this.tableData.forEach((group) => {
          group.list.forEach((item) => {
            if (item.showActions) {
              this.$set(item, "showActions", false);
            }
          });
        });
      },
      clearData() {
        this.tableData = [];
        try {
          uni.removeStorageSync("packageData");
        } catch (e) {
          formatAppLog("error", "at pages/packages/index.vue:231", "清除缓存失败:", e);
        }
      },
      confirmDeleteDateGroup(date) {
        this.vibrateShort();
        uni.showModal({
          title: "确认删除",
          content: "是否删除该日期下的所有包裹？",
          confirmColor: "#ff5a5f",
          success: (res) => {
            if (res.confirm) {
              this.deleteDateGroup(date);
            }
          }
        });
      },
      deleteDateGroup(date) {
        this.vibrateShort();
        const dateIndex = this.tableData.findIndex(
          (group) => group.date === date
        );
        if (dateIndex !== -1) {
          this.tableData.splice(dateIndex, 1);
          this.saveData();
        }
      },
      getCheckedCount(list) {
        return list.filter((item) => item.checked).length;
      },
      handlePackageSubmit({ data, isEdit, editDate, editIndex }) {
        const platformIcon = this.getPlatformIcon(data.platform);
        const packageData = {
          ...data,
          price: data.price || "0.00",
          platformIcon,
          showActions: false
        };
        if (isEdit) {
          if (editDate === data.date) {
            const dateGroup = this.tableData.find(
              (group) => group.date === editDate
            );
            if (dateGroup && editIndex !== -1) {
              this.$set(dateGroup.list, editIndex, packageData);
            }
          } else {
            const oldDateGroup = this.tableData.find(
              (group) => group.date === editDate
            );
            if (oldDateGroup && editIndex !== -1) {
              oldDateGroup.list.splice(editIndex, 1);
              if (oldDateGroup.list.length === 0) {
                const index = this.tableData.findIndex(
                  (group) => group.date === editDate
                );
                if (index !== -1) {
                  this.tableData.splice(index, 1);
                }
              }
            }
            let newDateGroup = this.tableData.find(
              (group) => group.date === data.date
            );
            if (!newDateGroup) {
              newDateGroup = {
                date: data.date,
                list: []
              };
              const index = this.tableData.findIndex(
                (group) => group.date < data.date
              );
              if (index === -1) {
                this.tableData.push(newDateGroup);
              } else {
                this.tableData.splice(index, 0, newDateGroup);
              }
            }
            newDateGroup.list.unshift(packageData);
          }
        } else {
          let dateGroup = this.tableData.find(
            (group) => group.date === data.date
          );
          if (!dateGroup) {
            dateGroup = {
              date: data.date,
              list: []
            };
            const index = this.tableData.findIndex(
              (group) => group.date < data.date
            );
            if (index === -1) {
              this.tableData.push(dateGroup);
            } else {
              this.tableData.splice(index, 0, dateGroup);
            }
          }
          dateGroup.list.unshift(packageData);
        }
        this.saveData();
      },
      getPlatformIcon(platform) {
        const icons = {
          淘宝: this.taobao,
          京东: this.jingdong,
          拼多多: this.pinduoduo,
          抖音: this.douyin,
          唯品会: this.weipinhui,
          小红书: this.xiaohongshu,
          "1688": this.alibaba,
          其他: this.other
        };
        return icons[platform] || this.other;
      },
      groupByPlatform(list) {
        const groups = {};
        list.forEach((item) => {
          if (!groups[item.platform]) {
            groups[item.platform] = [];
          }
          groups[item.platform].push(item);
        });
        return groups;
      },
      saveData() {
        try {
          uni.setStorageSync("packageData", JSON.stringify(this.tableData));
        } catch (e) {
          formatAppLog("error", "at pages/packages/index.vue:375", "保存数据失败:", e);
        }
      },
      loadData() {
        try {
          const data = uni.getStorageSync("packageData");
          if (data) {
            this.tableData = JSON.parse(data);
          }
        } catch (e) {
          formatAppLog("error", "at pages/packages/index.vue:385", "读取数据失败:", e);
        }
      },
      toggleCheck(item) {
        this.vibrateShort();
        this.$set(item, "checked", !item.checked);
        this.saveData();
      },
      deletePackage(item, date) {
        this.vibrateShort();
        this.$set(item, "showActions", false);
        const dateGroup = this.tableData.find((group) => group.date === date);
        if (dateGroup) {
          const index = dateGroup.list.findIndex((i) => i === item);
          if (index !== -1) {
            dateGroup.list.splice(index, 1);
            if (dateGroup.list.length === 0) {
              const groupIndex = this.tableData.findIndex(
                (group) => group.date === date
              );
              if (groupIndex !== -1) {
                this.tableData.splice(groupIndex, 1);
              }
            }
            this.saveData();
          }
        }
      },
      vibrateShort() {
        uni.vibrateShort({
          success: function() {
            formatAppLog("log", "at pages/packages/index.vue:423", "振动成功");
          }
        });
      },
      isLastItem(item) {
        const query = uni.createSelectorQuery();
        let isUp = false;
        query.select(".goods-actions").boundingClientRect((data) => {
          if (data) {
            const windowHeight = uni.getSystemInfoSync().windowHeight;
            isUp = windowHeight - data.bottom < 300;
          }
        }).exec();
        return isUp;
      }
    },
    created() {
      this.loadData();
    }
  };
  function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", {
      class: "page-wrapper",
      onClick: _cache[1] || (_cache[1] = (...args) => $options.handlePageClick && $options.handlePageClick(...args))
    }, [
      vue.createElementVNode("view", { class: "page-bg" }),
      vue.createCommentVNode(" 添加插画装饰 "),
      vue.createElementVNode("view", { class: "header-illustration" }, [
        vue.createElementVNode("image", {
          class: "illustration",
          src: _imports_0$2,
          mode: "aspectFit"
        })
      ]),
      vue.createElementVNode("view", { class: "container" }, [
        vue.createElementVNode("view", { class: "title-wrapper" }, [
          vue.createElementVNode("text", { class: "title" }, "包裹记录"),
          vue.createCommentVNode(' <view class="header-right">\r\n          <text class="clear-btn" @click.stop="clearData">清空</text>\r\n        </view> ')
        ]),
        vue.createCommentVNode(" 日期时间轴 "),
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.tableData, (item) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "timeline",
              key: item.date
            }, [
              vue.createElementVNode("view", { class: "timeline-date" }, [
                vue.createElementVNode(
                  "text",
                  null,
                  vue.toDisplayString($options.formatDate(item.date)),
                  1
                  /* TEXT */
                )
              ]),
              vue.createCommentVNode(" 添加统计信息 "),
              vue.createElementVNode("view", { class: "date-stats" }, [
                vue.createElementVNode(
                  "text",
                  null,
                  "记录了" + vue.toDisplayString(item.list.length) + "个包裹，" + vue.toDisplayString($options.getCheckedCount(item.list)) + "个已签收",
                  1
                  /* TEXT */
                )
              ]),
              vue.createCommentVNode(" 平台卡片组 "),
              vue.createElementVNode("view", { class: "platform-cards" }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.groupByPlatform(item.list), (platformItems, platform) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "platform-card",
                      key: platform
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
                        ),
                        vue.createElementVNode(
                          "text",
                          { class: "platform-amount" },
                          "¥" + vue.toDisplayString($options.getPlatformAmount(platformItems)),
                          1
                          /* TEXT */
                        )
                      ]),
                      vue.createElementVNode("view", { class: "goods-list" }, [
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList(platformItems, (list, index) => {
                            return vue.openBlock(), vue.createElementBlock("view", {
                              class: "goods-item",
                              key: index
                            }, [
                              vue.createElementVNode("view", { class: "goods-content" }, [
                                vue.createElementVNode("checkbox", {
                                  value: list.id,
                                  checked: list.checked,
                                  onClick: ($event) => $options.toggleCheck(list),
                                  color: "#1673ff"
                                }, null, 8, ["value", "checked", "onClick"]),
                                vue.createElementVNode("view", { class: "goods-info" }, [
                                  vue.createElementVNode(
                                    "text",
                                    { class: "goods-name text-ellipsis" },
                                    vue.toDisplayString(list.name),
                                    1
                                    /* TEXT */
                                  )
                                ]),
                                vue.createElementVNode(
                                  "text",
                                  { class: "goods-price" },
                                  vue.toDisplayString(list.price),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              vue.createElementVNode("view", { class: "goods-actions" }, [
                                vue.createElementVNode("view", {
                                  class: "more-btn",
                                  onClick: vue.withModifiers(($event) => $options.toggleMoreActions(list, item.date), ["stop"])
                                }, [
                                  vue.createElementVNode("view", { class: "dots" }, [
                                    vue.createElementVNode("view", { class: "dot" }),
                                    vue.createElementVNode("view", { class: "dot" }),
                                    vue.createElementVNode("view", { class: "dot" })
                                  ])
                                ], 8, ["onClick"]),
                                vue.createCommentVNode(" 操作菜单 "),
                                list.showActions ? (vue.openBlock(), vue.createElementBlock(
                                  "view",
                                  {
                                    key: 0,
                                    class: vue.normalizeClass(["action-menu", { "menu-up": $options.isLastItem(list) }])
                                  },
                                  [
                                    vue.createElementVNode("view", {
                                      class: "action-item",
                                      onClick: vue.withModifiers(($event) => $options.showEditPackage(list, item.date), ["stop"])
                                    }, [
                                      vue.createVNode(_component_uni_icons, {
                                        type: "compose",
                                        size: "16",
                                        color: "#666"
                                      }),
                                      vue.createElementVNode("text", null, "修改")
                                    ], 8, ["onClick"]),
                                    vue.createElementVNode("view", {
                                      class: "action-item delete",
                                      onClick: vue.withModifiers(($event) => $options.deletePackage(list, item.date), ["stop"])
                                    }, [
                                      vue.createVNode(_component_uni_icons, {
                                        type: "trash",
                                        size: "16",
                                        color: "#ff0000"
                                      }),
                                      vue.createElementVNode("text", { style: { "color": "#ff0000" } }, "删除")
                                    ], 8, ["onClick"])
                                  ],
                                  2
                                  /* CLASS */
                                )) : vue.createCommentVNode("v-if", true)
                              ])
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
              vue.createCommentVNode(" 删除按钮移到这里 "),
              vue.createElementVNode("view", {
                class: "date-delete-wrapper",
                onClick: ($event) => $options.confirmDeleteDateGroup(item.date)
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "trash",
                  size: "16"
                }),
                vue.createElementVNode("view", null, "删除")
              ], 8, ["onClick"])
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
      vue.createCommentVNode(" 添加底部占位区域 "),
      vue.createElementVNode("view", { class: "bottom-safe-area" })
    ]);
  }
  const PagesPackagesIndex = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$8], ["__file", "D:/mygitee/项目大全/pickUpCode/取件码/pages/packages/index.vue"]]);
  let Calendar$1 = class Calendar {
    constructor({
      selected,
      startDate,
      endDate,
      range
    } = {}) {
      this.date = this.getDateObj(/* @__PURE__ */ new Date());
      this.selected = selected || [];
      this.startDate = startDate;
      this.endDate = endDate;
      this.range = range;
      this.cleanMultipleStatus();
      this.weeks = {};
      this.lastHover = false;
    }
    /**
     * 设置日期
     * @param {Object} date
     */
    setDate(date) {
      const selectDate = this.getDateObj(date);
      this.getWeeks(selectDate.fullDate);
    }
    /**
     * 清理多选状态
     */
    cleanMultipleStatus() {
      this.multipleStatus = {
        before: "",
        after: "",
        data: []
      };
    }
    setStartDate(startDate) {
      this.startDate = startDate;
    }
    setEndDate(endDate) {
      this.endDate = endDate;
    }
    getPreMonthObj(date) {
      date = fixIosDateFormat(date);
      date = new Date(date);
      const oldMonth = date.getMonth();
      date.setMonth(oldMonth - 1);
      const newMonth = date.getMonth();
      if (oldMonth !== 0 && newMonth - oldMonth === 0) {
        date.setMonth(newMonth - 1);
      }
      return this.getDateObj(date);
    }
    getNextMonthObj(date) {
      date = fixIosDateFormat(date);
      date = new Date(date);
      const oldMonth = date.getMonth();
      date.setMonth(oldMonth + 1);
      const newMonth = date.getMonth();
      if (newMonth - oldMonth > 1) {
        date.setMonth(newMonth - 1);
      }
      return this.getDateObj(date);
    }
    /**
     * 获取指定格式Date对象
     */
    getDateObj(date) {
      date = fixIosDateFormat(date);
      date = new Date(date);
      return {
        fullDate: getDate(date),
        year: date.getFullYear(),
        month: addZero(date.getMonth() + 1),
        date: addZero(date.getDate()),
        day: date.getDay()
      };
    }
    /**
     * 获取上一个月日期集合
     */
    getPreMonthDays(amount, dateObj) {
      const result = [];
      for (let i = amount - 1; i >= 0; i--) {
        const month = dateObj.month - 1;
        result.push({
          date: new Date(dateObj.year, month, -i).getDate(),
          month,
          disable: true
        });
      }
      return result;
    }
    /**
     * 获取本月日期集合
     */
    getCurrentMonthDays(amount, dateObj) {
      const result = [];
      const fullDate = this.date.fullDate;
      for (let i = 1; i <= amount; i++) {
        const currentDate = `${dateObj.year}-${dateObj.month}-${addZero(i)}`;
        const isToday = fullDate === currentDate;
        const info = this.selected && this.selected.find((item) => {
          if (this.dateEqual(currentDate, item.date)) {
            return item;
          }
        });
        if (this.startDate) {
          dateCompare(this.startDate, currentDate);
        }
        if (this.endDate) {
          dateCompare(currentDate, this.endDate);
        }
        let multiples = this.multipleStatus.data;
        let multiplesStatus = -1;
        if (this.range && multiples) {
          multiplesStatus = multiples.findIndex((item) => {
            return this.dateEqual(item, currentDate);
          });
        }
        const checked = multiplesStatus !== -1;
        result.push({
          fullDate: currentDate,
          year: dateObj.year,
          date: i,
          multiple: this.range ? checked : false,
          beforeMultiple: this.isLogicBefore(currentDate, this.multipleStatus.before, this.multipleStatus.after),
          afterMultiple: this.isLogicAfter(currentDate, this.multipleStatus.before, this.multipleStatus.after),
          month: dateObj.month,
          disable: this.startDate && !dateCompare(this.startDate, currentDate) || this.endDate && !dateCompare(
            currentDate,
            this.endDate
          ),
          isToday,
          userChecked: false,
          extraInfo: info
        });
      }
      return result;
    }
    /**
     * 获取下一个月日期集合
     */
    _getNextMonthDays(amount, dateObj) {
      const result = [];
      const month = dateObj.month + 1;
      for (let i = 1; i <= amount; i++) {
        result.push({
          date: i,
          month,
          disable: true
        });
      }
      return result;
    }
    /**
     * 获取当前日期详情
     * @param {Object} date
     */
    getInfo(date) {
      if (!date) {
        date = /* @__PURE__ */ new Date();
      }
      return this.calendar.find((item) => item.fullDate === this.getDateObj(date).fullDate);
    }
    /**
     * 比较时间是否相等
     */
    dateEqual(before, after) {
      before = new Date(fixIosDateFormat(before));
      after = new Date(fixIosDateFormat(after));
      return before.valueOf() === after.valueOf();
    }
    /**
     *  比较真实起始日期
     */
    isLogicBefore(currentDate, before, after) {
      let logicBefore = before;
      if (before && after) {
        logicBefore = dateCompare(before, after) ? before : after;
      }
      return this.dateEqual(logicBefore, currentDate);
    }
    isLogicAfter(currentDate, before, after) {
      let logicAfter = after;
      if (before && after) {
        logicAfter = dateCompare(before, after) ? after : before;
      }
      return this.dateEqual(logicAfter, currentDate);
    }
    /**
     * 获取日期范围内所有日期
     * @param {Object} begin
     * @param {Object} end
     */
    geDateAll(begin, end) {
      var arr = [];
      var ab = begin.split("-");
      var ae = end.split("-");
      var db = /* @__PURE__ */ new Date();
      db.setFullYear(ab[0], ab[1] - 1, ab[2]);
      var de = /* @__PURE__ */ new Date();
      de.setFullYear(ae[0], ae[1] - 1, ae[2]);
      var unixDb = db.getTime() - 24 * 60 * 60 * 1e3;
      var unixDe = de.getTime() - 24 * 60 * 60 * 1e3;
      for (var k = unixDb; k <= unixDe; ) {
        k = k + 24 * 60 * 60 * 1e3;
        arr.push(this.getDateObj(new Date(parseInt(k))).fullDate);
      }
      return arr;
    }
    /**
     *  获取多选状态
     */
    setMultiple(fullDate) {
      if (!this.range)
        return;
      let {
        before,
        after
      } = this.multipleStatus;
      if (before && after) {
        if (!this.lastHover) {
          this.lastHover = true;
          return;
        }
        this.multipleStatus.before = fullDate;
        this.multipleStatus.after = "";
        this.multipleStatus.data = [];
        this.multipleStatus.fulldate = "";
        this.lastHover = false;
      } else {
        if (!before) {
          this.multipleStatus.before = fullDate;
          this.multipleStatus.after = void 0;
          this.lastHover = false;
        } else {
          this.multipleStatus.after = fullDate;
          if (dateCompare(this.multipleStatus.before, this.multipleStatus.after)) {
            this.multipleStatus.data = this.geDateAll(this.multipleStatus.before, this.multipleStatus.after);
          } else {
            this.multipleStatus.data = this.geDateAll(this.multipleStatus.after, this.multipleStatus.before);
          }
          this.lastHover = true;
        }
      }
      this.getWeeks(fullDate);
    }
    /**
     *  鼠标 hover 更新多选状态
     */
    setHoverMultiple(fullDate) {
      if (!this.range || this.lastHover)
        return;
      const {
        before
      } = this.multipleStatus;
      if (!before) {
        this.multipleStatus.before = fullDate;
      } else {
        this.multipleStatus.after = fullDate;
        if (dateCompare(this.multipleStatus.before, this.multipleStatus.after)) {
          this.multipleStatus.data = this.geDateAll(this.multipleStatus.before, this.multipleStatus.after);
        } else {
          this.multipleStatus.data = this.geDateAll(this.multipleStatus.after, this.multipleStatus.before);
        }
      }
      this.getWeeks(fullDate);
    }
    /**
     * 更新默认值多选状态
     */
    setDefaultMultiple(before, after) {
      this.multipleStatus.before = before;
      this.multipleStatus.after = after;
      if (before && after) {
        if (dateCompare(before, after)) {
          this.multipleStatus.data = this.geDateAll(before, after);
          this.getWeeks(after);
        } else {
          this.multipleStatus.data = this.geDateAll(after, before);
          this.getWeeks(before);
        }
      }
    }
    /**
     * 获取每周数据
     * @param {Object} dateData
     */
    getWeeks(dateData) {
      const {
        year,
        month
      } = this.getDateObj(dateData);
      const preMonthDayAmount = new Date(year, month - 1, 1).getDay();
      const preMonthDays = this.getPreMonthDays(preMonthDayAmount, this.getDateObj(dateData));
      const currentMonthDayAmount = new Date(year, month, 0).getDate();
      const currentMonthDays = this.getCurrentMonthDays(currentMonthDayAmount, this.getDateObj(dateData));
      const nextMonthDayAmount = 42 - preMonthDayAmount - currentMonthDayAmount;
      const nextMonthDays = this._getNextMonthDays(nextMonthDayAmount, this.getDateObj(dateData));
      const calendarDays = [...preMonthDays, ...currentMonthDays, ...nextMonthDays];
      const weeks = new Array(6);
      for (let i = 0; i < calendarDays.length; i++) {
        const index = Math.floor(i / 7);
        if (!weeks[index]) {
          weeks[index] = new Array(7);
        }
        weeks[index][i % 7] = calendarDays[i];
      }
      this.calendar = calendarDays;
      this.weeks = weeks;
    }
  };
  function getDateTime(date, hideSecond) {
    return `${getDate(date)} ${getTime(date, hideSecond)}`;
  }
  function getDate(date) {
    date = fixIosDateFormat(date);
    date = new Date(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${addZero(month)}-${addZero(day)}`;
  }
  function getTime(date, hideSecond) {
    date = fixIosDateFormat(date);
    date = new Date(date);
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return hideSecond ? `${addZero(hour)}:${addZero(minute)}` : `${addZero(hour)}:${addZero(minute)}:${addZero(second)}`;
  }
  function addZero(num) {
    if (num < 10) {
      num = `0${num}`;
    }
    return num;
  }
  function getDefaultSecond(hideSecond) {
    return hideSecond ? "00:00" : "00:00:00";
  }
  function dateCompare(startDate, endDate) {
    startDate = new Date(fixIosDateFormat(startDate));
    endDate = new Date(fixIosDateFormat(endDate));
    return startDate <= endDate;
  }
  function checkDate(date) {
    const dateReg = /((19|20)\d{2})(-|\/)\d{1,2}(-|\/)\d{1,2}/g;
    return date.match(dateReg);
  }
  const dateTimeReg = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])( [0-5]?[0-9]:[0-5]?[0-9](:[0-5]?[0-9])?)?$/;
  function fixIosDateFormat(value) {
    if (typeof value === "string" && dateTimeReg.test(value)) {
      value = value.replace(/-/g, "/");
    }
    return value;
  }
  const _sfc_main$8 = {
    props: {
      weeks: {
        type: Object,
        default() {
          return {};
        }
      },
      calendar: {
        type: Object,
        default: () => {
          return {};
        }
      },
      selected: {
        type: Array,
        default: () => {
          return [];
        }
      },
      checkHover: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      choiceDate(weeks) {
        this.$emit("change", weeks);
      },
      handleMousemove(weeks) {
        this.$emit("handleMouse", weeks);
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["uni-calendar-item__weeks-box", {
          "uni-calendar-item--disable": $props.weeks.disable,
          "uni-calendar-item--before-checked-x": $props.weeks.beforeMultiple,
          "uni-calendar-item--multiple": $props.weeks.multiple,
          "uni-calendar-item--after-checked-x": $props.weeks.afterMultiple
        }]),
        onClick: _cache[0] || (_cache[0] = ($event) => $options.choiceDate($props.weeks)),
        onMouseenter: _cache[1] || (_cache[1] = ($event) => $options.handleMousemove($props.weeks))
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["uni-calendar-item__weeks-box-item", {
              "uni-calendar-item--checked": $props.calendar.fullDate === $props.weeks.fullDate && ($props.calendar.userChecked || !$props.checkHover),
              "uni-calendar-item--checked-range-text": $props.checkHover,
              "uni-calendar-item--before-checked": $props.weeks.beforeMultiple,
              "uni-calendar-item--multiple": $props.weeks.multiple,
              "uni-calendar-item--after-checked": $props.weeks.afterMultiple,
              "uni-calendar-item--disable": $props.weeks.disable
            }])
          },
          [
            $props.selected && $props.weeks.extraInfo ? (vue.openBlock(), vue.createElementBlock("text", {
              key: 0,
              class: "uni-calendar-item__weeks-box-circle"
            })) : vue.createCommentVNode("v-if", true),
            vue.createElementVNode(
              "text",
              { class: "uni-calendar-item__weeks-box-text uni-calendar-item__weeks-box-text-disable uni-calendar-item--checked-text" },
              vue.toDisplayString($props.weeks.date),
              1
              /* TEXT */
            )
          ],
          2
          /* CLASS */
        ),
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass({ "uni-calendar-item--today": $props.weeks.isToday })
          },
          null,
          2
          /* CLASS */
        )
      ],
      34
      /* CLASS, NEED_HYDRATION */
    );
  }
  const calendarItem = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$7], ["__scopeId", "data-v-3c762a01"], ["__file", "D:/mygitee/项目大全/pickUpCode/取件码/uni_modules/uni-datetime-picker/components/uni-datetime-picker/calendar-item.vue"]]);
  const isObject = (val) => val !== null && typeof val === "object";
  const defaultDelimiters = ["{", "}"];
  class BaseFormatter {
    constructor() {
      this._caches = /* @__PURE__ */ Object.create(null);
    }
    interpolate(message, values, delimiters = defaultDelimiters) {
      if (!values) {
        return [message];
      }
      let tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }
  const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
  const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
  function parse(format, [startDelimiter, endDelimiter]) {
    const tokens = [];
    let position = 0;
    let text = "";
    while (position < format.length) {
      let char = format[position++];
      if (char === startDelimiter) {
        if (text) {
          tokens.push({ type: "text", value: text });
        }
        text = "";
        let sub = "";
        char = format[position++];
        while (char !== void 0 && char !== endDelimiter) {
          sub += char;
          char = format[position++];
        }
        const isClosed = char === endDelimiter;
        const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
        tokens.push({ value: sub, type });
      } else {
        text += char;
      }
    }
    text && tokens.push({ type: "text", value: text });
    return tokens;
  }
  function compile(tokens, values) {
    const compiled = [];
    let index = 0;
    const mode = Array.isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
    if (mode === "unknown") {
      return compiled;
    }
    while (index < tokens.length) {
      const token = tokens[index];
      switch (token.type) {
        case "text":
          compiled.push(token.value);
          break;
        case "list":
          compiled.push(values[parseInt(token.value, 10)]);
          break;
        case "named":
          if (mode === "named") {
            compiled.push(values[token.value]);
          } else {
            {
              console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
            }
          }
          break;
        case "unknown":
          {
            console.warn(`Detect 'unknown' type of token!`);
          }
          break;
      }
      index++;
    }
    return compiled;
  }
  const LOCALE_ZH_HANS = "zh-Hans";
  const LOCALE_ZH_HANT = "zh-Hant";
  const LOCALE_EN = "en";
  const LOCALE_FR = "fr";
  const LOCALE_ES = "es";
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  const hasOwn = (val, key) => hasOwnProperty.call(val, key);
  const defaultFormatter = new BaseFormatter();
  function include(str, parts) {
    return !!parts.find((part) => str.indexOf(part) !== -1);
  }
  function startsWith(str, parts) {
    return parts.find((part) => str.indexOf(part) === 0);
  }
  function normalizeLocale(locale, messages) {
    if (!locale) {
      return;
    }
    locale = locale.trim().replace(/_/g, "-");
    if (messages && messages[locale]) {
      return locale;
    }
    locale = locale.toLowerCase();
    if (locale === "chinese") {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("zh") === 0) {
      if (locale.indexOf("-hans") > -1) {
        return LOCALE_ZH_HANS;
      }
      if (locale.indexOf("-hant") > -1) {
        return LOCALE_ZH_HANT;
      }
      if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
        return LOCALE_ZH_HANT;
      }
      return LOCALE_ZH_HANS;
    }
    let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
    if (messages && Object.keys(messages).length > 0) {
      locales = Object.keys(messages);
    }
    const lang = startsWith(locale, locales);
    if (lang) {
      return lang;
    }
  }
  class I18n {
    constructor({ locale, fallbackLocale, messages, watcher, formater: formater2 }) {
      this.locale = LOCALE_EN;
      this.fallbackLocale = LOCALE_EN;
      this.message = {};
      this.messages = {};
      this.watchers = [];
      if (fallbackLocale) {
        this.fallbackLocale = fallbackLocale;
      }
      this.formater = formater2 || defaultFormatter;
      this.messages = messages || {};
      this.setLocale(locale || LOCALE_EN);
      if (watcher) {
        this.watchLocale(watcher);
      }
    }
    setLocale(locale) {
      const oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      if (oldLocale !== this.locale) {
        this.watchers.forEach((watcher) => {
          watcher(this.locale, oldLocale);
        });
      }
    }
    getLocale() {
      return this.locale;
    }
    watchLocale(fn) {
      const index = this.watchers.push(fn) - 1;
      return () => {
        this.watchers.splice(index, 1);
      };
    }
    add(locale, message, override = true) {
      const curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach((key) => {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
    f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join("");
    }
    t(key, locale, values) {
      let message = this.message;
      if (typeof locale === "string") {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
        return key;
      }
      return this.formater.interpolate(message[key], values).join("");
    }
  }
  function watchAppLocale(appVm, i18n) {
    if (appVm.$watchLocale) {
      appVm.$watchLocale((newLocale) => {
        i18n.setLocale(newLocale);
      });
    } else {
      appVm.$watch(() => appVm.$locale, (newLocale) => {
        i18n.setLocale(newLocale);
      });
    }
  }
  function getDefaultLocale() {
    if (typeof uni !== "undefined" && uni.getLocale) {
      return uni.getLocale();
    }
    if (typeof global !== "undefined" && global.getLocale) {
      return global.getLocale();
    }
    return LOCALE_EN;
  }
  function initVueI18n(locale, messages = {}, fallbackLocale, watcher) {
    if (typeof locale !== "string") {
      const options = [
        messages,
        locale
      ];
      locale = options[0];
      messages = options[1];
    }
    if (typeof locale !== "string") {
      locale = getDefaultLocale();
    }
    if (typeof fallbackLocale !== "string") {
      fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
    }
    const i18n = new I18n({
      locale,
      fallbackLocale,
      messages,
      watcher
    });
    let t2 = (key, values) => {
      if (typeof getApp !== "function") {
        t2 = function(key2, values2) {
          return i18n.t(key2, values2);
        };
      } else {
        let isWatchedAppLocale = false;
        t2 = function(key2, values2) {
          const appVm = getApp().$vm;
          if (appVm) {
            appVm.$locale;
            if (!isWatchedAppLocale) {
              isWatchedAppLocale = true;
              watchAppLocale(appVm, i18n);
            }
          }
          return i18n.t(key2, values2);
        };
      }
      return t2(key, values);
    };
    return {
      i18n,
      f(message, values, delimiters) {
        return i18n.f(message, values, delimiters);
      },
      t(key, values) {
        return t2(key, values);
      },
      add(locale2, message, override = true) {
        return i18n.add(locale2, message, override);
      },
      watch(fn) {
        return i18n.watchLocale(fn);
      },
      getLocale() {
        return i18n.getLocale();
      },
      setLocale(newLocale) {
        return i18n.setLocale(newLocale);
      }
    };
  }
  const en = {
    "uni-datetime-picker.selectDate": "select date",
    "uni-datetime-picker.selectTime": "select time",
    "uni-datetime-picker.selectDateTime": "select date and time",
    "uni-datetime-picker.startDate": "start date",
    "uni-datetime-picker.endDate": "end date",
    "uni-datetime-picker.startTime": "start time",
    "uni-datetime-picker.endTime": "end time",
    "uni-datetime-picker.ok": "ok",
    "uni-datetime-picker.clear": "clear",
    "uni-datetime-picker.cancel": "cancel",
    "uni-datetime-picker.year": "-",
    "uni-datetime-picker.month": "",
    "uni-calender.MON": "MON",
    "uni-calender.TUE": "TUE",
    "uni-calender.WED": "WED",
    "uni-calender.THU": "THU",
    "uni-calender.FRI": "FRI",
    "uni-calender.SAT": "SAT",
    "uni-calender.SUN": "SUN",
    "uni-calender.confirm": "confirm"
  };
  const zhHans = {
    "uni-datetime-picker.selectDate": "选择日期",
    "uni-datetime-picker.selectTime": "选择时间",
    "uni-datetime-picker.selectDateTime": "选择日期时间",
    "uni-datetime-picker.startDate": "开始日期",
    "uni-datetime-picker.endDate": "结束日期",
    "uni-datetime-picker.startTime": "开始时间",
    "uni-datetime-picker.endTime": "结束时间",
    "uni-datetime-picker.ok": "确定",
    "uni-datetime-picker.clear": "清除",
    "uni-datetime-picker.cancel": "取消",
    "uni-datetime-picker.year": "年",
    "uni-datetime-picker.month": "月",
    "uni-calender.SUN": "日",
    "uni-calender.MON": "一",
    "uni-calender.TUE": "二",
    "uni-calender.WED": "三",
    "uni-calender.THU": "四",
    "uni-calender.FRI": "五",
    "uni-calender.SAT": "六",
    "uni-calender.confirm": "确认"
  };
  const zhHant = {
    "uni-datetime-picker.selectDate": "選擇日期",
    "uni-datetime-picker.selectTime": "選擇時間",
    "uni-datetime-picker.selectDateTime": "選擇日期時間",
    "uni-datetime-picker.startDate": "開始日期",
    "uni-datetime-picker.endDate": "結束日期",
    "uni-datetime-picker.startTime": "開始时间",
    "uni-datetime-picker.endTime": "結束时间",
    "uni-datetime-picker.ok": "確定",
    "uni-datetime-picker.clear": "清除",
    "uni-datetime-picker.cancel": "取消",
    "uni-datetime-picker.year": "年",
    "uni-datetime-picker.month": "月",
    "uni-calender.SUN": "日",
    "uni-calender.MON": "一",
    "uni-calender.TUE": "二",
    "uni-calender.WED": "三",
    "uni-calender.THU": "四",
    "uni-calender.FRI": "五",
    "uni-calender.SAT": "六",
    "uni-calender.confirm": "確認"
  };
  const i18nMessages = {
    en,
    "zh-Hans": zhHans,
    "zh-Hant": zhHant
  };
  const {
    t: t$1
  } = initVueI18n(i18nMessages);
  const _sfc_main$7 = {
    name: "UniDatetimePicker",
    data() {
      return {
        indicatorStyle: `height: 50px;`,
        visible: false,
        fixNvueBug: {},
        dateShow: true,
        timeShow: true,
        title: "日期和时间",
        // 输入框当前时间
        time: "",
        // 当前的年月日时分秒
        year: 1920,
        month: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        // 起始时间
        startYear: 1920,
        startMonth: 1,
        startDay: 1,
        startHour: 0,
        startMinute: 0,
        startSecond: 0,
        // 结束时间
        endYear: 2120,
        endMonth: 12,
        endDay: 31,
        endHour: 23,
        endMinute: 59,
        endSecond: 59
      };
    },
    options: {
      virtualHost: true
    },
    props: {
      type: {
        type: String,
        default: "datetime"
      },
      value: {
        type: [String, Number],
        default: ""
      },
      modelValue: {
        type: [String, Number],
        default: ""
      },
      start: {
        type: [Number, String],
        default: ""
      },
      end: {
        type: [Number, String],
        default: ""
      },
      returnType: {
        type: String,
        default: "string"
      },
      disabled: {
        type: [Boolean, String],
        default: false
      },
      border: {
        type: [Boolean, String],
        default: true
      },
      hideSecond: {
        type: [Boolean, String],
        default: false
      }
    },
    watch: {
      modelValue: {
        handler(newVal) {
          if (newVal) {
            this.parseValue(fixIosDateFormat(newVal));
            this.initTime(false);
          } else {
            this.time = "";
            this.parseValue(Date.now());
          }
        },
        immediate: true
      },
      type: {
        handler(newValue) {
          if (newValue === "date") {
            this.dateShow = true;
            this.timeShow = false;
            this.title = "日期";
          } else if (newValue === "time") {
            this.dateShow = false;
            this.timeShow = true;
            this.title = "时间";
          } else {
            this.dateShow = true;
            this.timeShow = true;
            this.title = "日期和时间";
          }
        },
        immediate: true
      },
      start: {
        handler(newVal) {
          this.parseDatetimeRange(fixIosDateFormat(newVal), "start");
        },
        immediate: true
      },
      end: {
        handler(newVal) {
          this.parseDatetimeRange(fixIosDateFormat(newVal), "end");
        },
        immediate: true
      },
      // 月、日、时、分、秒可选范围变化后，检查当前值是否在范围内，不在则当前值重置为可选范围第一项
      months(newVal) {
        this.checkValue("month", this.month, newVal);
      },
      days(newVal) {
        this.checkValue("day", this.day, newVal);
      },
      hours(newVal) {
        this.checkValue("hour", this.hour, newVal);
      },
      minutes(newVal) {
        this.checkValue("minute", this.minute, newVal);
      },
      seconds(newVal) {
        this.checkValue("second", this.second, newVal);
      }
    },
    computed: {
      // 当前年、月、日、时、分、秒选择范围
      years() {
        return this.getCurrentRange("year");
      },
      months() {
        return this.getCurrentRange("month");
      },
      days() {
        return this.getCurrentRange("day");
      },
      hours() {
        return this.getCurrentRange("hour");
      },
      minutes() {
        return this.getCurrentRange("minute");
      },
      seconds() {
        return this.getCurrentRange("second");
      },
      // picker 当前值数组
      ymd() {
        return [this.year - this.minYear, this.month - this.minMonth, this.day - this.minDay];
      },
      hms() {
        return [this.hour - this.minHour, this.minute - this.minMinute, this.second - this.minSecond];
      },
      // 当前 date 是 start
      currentDateIsStart() {
        return this.year === this.startYear && this.month === this.startMonth && this.day === this.startDay;
      },
      // 当前 date 是 end
      currentDateIsEnd() {
        return this.year === this.endYear && this.month === this.endMonth && this.day === this.endDay;
      },
      // 当前年、月、日、时、分、秒的最小值和最大值
      minYear() {
        return this.startYear;
      },
      maxYear() {
        return this.endYear;
      },
      minMonth() {
        if (this.year === this.startYear) {
          return this.startMonth;
        } else {
          return 1;
        }
      },
      maxMonth() {
        if (this.year === this.endYear) {
          return this.endMonth;
        } else {
          return 12;
        }
      },
      minDay() {
        if (this.year === this.startYear && this.month === this.startMonth) {
          return this.startDay;
        } else {
          return 1;
        }
      },
      maxDay() {
        if (this.year === this.endYear && this.month === this.endMonth) {
          return this.endDay;
        } else {
          return this.daysInMonth(this.year, this.month);
        }
      },
      minHour() {
        if (this.type === "datetime") {
          if (this.currentDateIsStart) {
            return this.startHour;
          } else {
            return 0;
          }
        }
        if (this.type === "time") {
          return this.startHour;
        }
      },
      maxHour() {
        if (this.type === "datetime") {
          if (this.currentDateIsEnd) {
            return this.endHour;
          } else {
            return 23;
          }
        }
        if (this.type === "time") {
          return this.endHour;
        }
      },
      minMinute() {
        if (this.type === "datetime") {
          if (this.currentDateIsStart && this.hour === this.startHour) {
            return this.startMinute;
          } else {
            return 0;
          }
        }
        if (this.type === "time") {
          if (this.hour === this.startHour) {
            return this.startMinute;
          } else {
            return 0;
          }
        }
      },
      maxMinute() {
        if (this.type === "datetime") {
          if (this.currentDateIsEnd && this.hour === this.endHour) {
            return this.endMinute;
          } else {
            return 59;
          }
        }
        if (this.type === "time") {
          if (this.hour === this.endHour) {
            return this.endMinute;
          } else {
            return 59;
          }
        }
      },
      minSecond() {
        if (this.type === "datetime") {
          if (this.currentDateIsStart && this.hour === this.startHour && this.minute === this.startMinute) {
            return this.startSecond;
          } else {
            return 0;
          }
        }
        if (this.type === "time") {
          if (this.hour === this.startHour && this.minute === this.startMinute) {
            return this.startSecond;
          } else {
            return 0;
          }
        }
      },
      maxSecond() {
        if (this.type === "datetime") {
          if (this.currentDateIsEnd && this.hour === this.endHour && this.minute === this.endMinute) {
            return this.endSecond;
          } else {
            return 59;
          }
        }
        if (this.type === "time") {
          if (this.hour === this.endHour && this.minute === this.endMinute) {
            return this.endSecond;
          } else {
            return 59;
          }
        }
      },
      /**
       * for i18n
       */
      selectTimeText() {
        return t$1("uni-datetime-picker.selectTime");
      },
      okText() {
        return t$1("uni-datetime-picker.ok");
      },
      clearText() {
        return t$1("uni-datetime-picker.clear");
      },
      cancelText() {
        return t$1("uni-datetime-picker.cancel");
      }
    },
    mounted() {
    },
    methods: {
      /**
       * @param {Object} item
       * 小于 10 在前面加个 0
       */
      lessThanTen(item) {
        return item < 10 ? "0" + item : item;
      },
      /**
       * 解析时分秒字符串，例如：00:00:00
       * @param {String} timeString
       */
      parseTimeType(timeString) {
        if (timeString) {
          let timeArr = timeString.split(":");
          this.hour = Number(timeArr[0]);
          this.minute = Number(timeArr[1]);
          this.second = Number(timeArr[2]);
        }
      },
      /**
       * 解析选择器初始值，类型可以是字符串、时间戳，例如：2000-10-02、'08:30:00'、 1610695109000
       * @param {String | Number} datetime
       */
      initPickerValue(datetime) {
        let defaultValue = null;
        if (datetime) {
          defaultValue = this.compareValueWithStartAndEnd(datetime, this.start, this.end);
        } else {
          defaultValue = Date.now();
          defaultValue = this.compareValueWithStartAndEnd(defaultValue, this.start, this.end);
        }
        this.parseValue(defaultValue);
      },
      /**
       * 初始值规则：
       * - 用户设置初始值 value
       * 	- 设置了起始时间 start、终止时间 end，并 start < value < end，初始值为 value， 否则初始值为 start
       * 	- 只设置了起始时间 start，并 start < value，初始值为 value，否则初始值为 start
       * 	- 只设置了终止时间 end，并 value < end，初始值为 value，否则初始值为 end
       * 	- 无起始终止时间，则初始值为 value
       * - 无初始值 value，则初始值为当前本地时间 Date.now()
       * @param {Object} value
       * @param {Object} dateBase
       */
      compareValueWithStartAndEnd(value, start, end) {
        let winner = null;
        value = this.superTimeStamp(value);
        start = this.superTimeStamp(start);
        end = this.superTimeStamp(end);
        if (start && end) {
          if (value < start) {
            winner = new Date(start);
          } else if (value > end) {
            winner = new Date(end);
          } else {
            winner = new Date(value);
          }
        } else if (start && !end) {
          winner = start <= value ? new Date(value) : new Date(start);
        } else if (!start && end) {
          winner = value <= end ? new Date(value) : new Date(end);
        } else {
          winner = new Date(value);
        }
        return winner;
      },
      /**
       * 转换为可比较的时间戳，接受日期、时分秒、时间戳
       * @param {Object} value
       */
      superTimeStamp(value) {
        let dateBase = "";
        if (this.type === "time" && value && typeof value === "string") {
          const now = /* @__PURE__ */ new Date();
          const year = now.getFullYear();
          const month = now.getMonth() + 1;
          const day = now.getDate();
          dateBase = year + "/" + month + "/" + day + " ";
        }
        if (Number(value)) {
          value = parseInt(value);
          dateBase = 0;
        }
        return this.createTimeStamp(dateBase + value);
      },
      /**
       * 解析默认值 value，字符串、时间戳
       * @param {Object} defaultTime
       */
      parseValue(value) {
        if (!value) {
          return;
        }
        if (this.type === "time" && typeof value === "string") {
          this.parseTimeType(value);
        } else {
          let defaultDate = null;
          defaultDate = new Date(value);
          if (this.type !== "time") {
            this.year = defaultDate.getFullYear();
            this.month = defaultDate.getMonth() + 1;
            this.day = defaultDate.getDate();
          }
          if (this.type !== "date") {
            this.hour = defaultDate.getHours();
            this.minute = defaultDate.getMinutes();
            this.second = defaultDate.getSeconds();
          }
        }
        if (this.hideSecond) {
          this.second = 0;
        }
      },
      /**
       * 解析可选择时间范围 start、end，年月日字符串、时间戳
       * @param {Object} defaultTime
       */
      parseDatetimeRange(point, pointType) {
        if (!point) {
          if (pointType === "start") {
            this.startYear = 1920;
            this.startMonth = 1;
            this.startDay = 1;
            this.startHour = 0;
            this.startMinute = 0;
            this.startSecond = 0;
          }
          if (pointType === "end") {
            this.endYear = 2120;
            this.endMonth = 12;
            this.endDay = 31;
            this.endHour = 23;
            this.endMinute = 59;
            this.endSecond = 59;
          }
          return;
        }
        if (this.type === "time") {
          const pointArr = point.split(":");
          this[pointType + "Hour"] = Number(pointArr[0]);
          this[pointType + "Minute"] = Number(pointArr[1]);
          this[pointType + "Second"] = Number(pointArr[2]);
        } else {
          if (!point) {
            pointType === "start" ? this.startYear = this.year - 60 : this.endYear = this.year + 60;
            return;
          }
          if (Number(point)) {
            point = parseInt(point);
          }
          const hasTime = /[0-9]:[0-9]/;
          if (this.type === "datetime" && pointType === "end" && typeof point === "string" && !hasTime.test(
            point
          )) {
            point = point + " 23:59:59";
          }
          const pointDate = new Date(point);
          this[pointType + "Year"] = pointDate.getFullYear();
          this[pointType + "Month"] = pointDate.getMonth() + 1;
          this[pointType + "Day"] = pointDate.getDate();
          if (this.type === "datetime") {
            this[pointType + "Hour"] = pointDate.getHours();
            this[pointType + "Minute"] = pointDate.getMinutes();
            this[pointType + "Second"] = pointDate.getSeconds();
          }
        }
      },
      // 获取 年、月、日、时、分、秒 当前可选范围
      getCurrentRange(value) {
        const range = [];
        for (let i = this["min" + this.capitalize(value)]; i <= this["max" + this.capitalize(value)]; i++) {
          range.push(i);
        }
        return range;
      },
      // 字符串首字母大写
      capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
      },
      // 检查当前值是否在范围内，不在则当前值重置为可选范围第一项
      checkValue(name, value, values) {
        if (values.indexOf(value) === -1) {
          this[name] = values[0];
        }
      },
      // 每个月的实际天数
      daysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
      },
      /**
       * 生成时间戳
       * @param {Object} time
       */
      createTimeStamp(time) {
        if (!time)
          return;
        if (typeof time === "number") {
          return time;
        } else {
          time = time.replace(/-/g, "/");
          if (this.type === "date") {
            time = time + " 00:00:00";
          }
          return Date.parse(time);
        }
      },
      /**
       * 生成日期或时间的字符串
       */
      createDomSting() {
        const yymmdd = this.year + "-" + this.lessThanTen(this.month) + "-" + this.lessThanTen(this.day);
        let hhmmss = this.lessThanTen(this.hour) + ":" + this.lessThanTen(this.minute);
        if (!this.hideSecond) {
          hhmmss = hhmmss + ":" + this.lessThanTen(this.second);
        }
        if (this.type === "date") {
          return yymmdd;
        } else if (this.type === "time") {
          return hhmmss;
        } else {
          return yymmdd + " " + hhmmss;
        }
      },
      /**
       * 初始化返回值，并抛出 change 事件
       */
      initTime(emit = true) {
        this.time = this.createDomSting();
        if (!emit)
          return;
        if (this.returnType === "timestamp" && this.type !== "time") {
          this.$emit("change", this.createTimeStamp(this.time));
          this.$emit("input", this.createTimeStamp(this.time));
          this.$emit("update:modelValue", this.createTimeStamp(this.time));
        } else {
          this.$emit("change", this.time);
          this.$emit("input", this.time);
          this.$emit("update:modelValue", this.time);
        }
      },
      /**
       * 用户选择日期或时间更新 data
       * @param {Object} e
       */
      bindDateChange(e) {
        const val = e.detail.value;
        this.year = this.years[val[0]];
        this.month = this.months[val[1]];
        this.day = this.days[val[2]];
      },
      bindTimeChange(e) {
        const val = e.detail.value;
        this.hour = this.hours[val[0]];
        this.minute = this.minutes[val[1]];
        this.second = this.seconds[val[2]];
      },
      /**
       * 初始化弹出层
       */
      initTimePicker() {
        if (this.disabled)
          return;
        const value = fixIosDateFormat(this.time);
        this.initPickerValue(value);
        this.visible = !this.visible;
      },
      /**
       * 触发或关闭弹框
       */
      tiggerTimePicker(e) {
        this.visible = !this.visible;
      },
      /**
       * 用户点击“清空”按钮，清空当前值
       */
      clearTime() {
        this.time = "";
        this.$emit("change", this.time);
        this.$emit("input", this.time);
        this.$emit("update:modelValue", this.time);
        this.tiggerTimePicker();
      },
      /**
       * 用户点击“确定”按钮
       */
      setTime() {
        this.initTime();
        this.tiggerTimePicker();
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-datetime-picker" }, [
      vue.createElementVNode("view", {
        onClick: _cache[0] || (_cache[0] = (...args) => $options.initTimePicker && $options.initTimePicker(...args))
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uni-datetime-picker-timebox-pointer", { "uni-datetime-picker-disabled": $props.disabled, "uni-datetime-picker-timebox": $props.border }])
            },
            [
              vue.createElementVNode(
                "text",
                { class: "uni-datetime-picker-text" },
                vue.toDisplayString($data.time),
                1
                /* TEXT */
              ),
              !$data.time ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-datetime-picker-time"
              }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-datetime-picker-text" },
                  vue.toDisplayString($options.selectTimeText),
                  1
                  /* TEXT */
                )
              ])) : vue.createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          )
        ], true)
      ]),
      $data.visible ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        id: "mask",
        class: "uni-datetime-picker-mask",
        onClick: _cache[1] || (_cache[1] = (...args) => $options.tiggerTimePicker && $options.tiggerTimePicker(...args))
      })) : vue.createCommentVNode("v-if", true),
      $data.visible ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 1,
          class: vue.normalizeClass(["uni-datetime-picker-popup", [$data.dateShow && $data.timeShow ? "" : "fix-nvue-height"]]),
          style: vue.normalizeStyle($data.fixNvueBug)
        },
        [
          vue.createElementVNode("view", { class: "uni-title" }, [
            vue.createElementVNode(
              "text",
              { class: "uni-datetime-picker-text" },
              vue.toDisplayString($options.selectTimeText),
              1
              /* TEXT */
            )
          ]),
          $data.dateShow ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 0,
            class: "uni-datetime-picker__container-box"
          }, [
            vue.createElementVNode("picker-view", {
              class: "uni-datetime-picker-view",
              "indicator-style": $data.indicatorStyle,
              value: $options.ymd,
              onChange: _cache[2] || (_cache[2] = (...args) => $options.bindDateChange && $options.bindDateChange(...args))
            }, [
              vue.createElementVNode("picker-view-column", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.years, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "uni-datetime-picker-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "uni-datetime-picker-item" },
                        vue.toDisplayString($options.lessThanTen(item)),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              vue.createElementVNode("picker-view-column", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.months, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "uni-datetime-picker-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "uni-datetime-picker-item" },
                        vue.toDisplayString($options.lessThanTen(item)),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              vue.createElementVNode("picker-view-column", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.days, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "uni-datetime-picker-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "uni-datetime-picker-item" },
                        vue.toDisplayString($options.lessThanTen(item)),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])
            ], 40, ["indicator-style", "value"]),
            vue.createCommentVNode(" 兼容 nvue 不支持伪类 "),
            vue.createElementVNode("text", { class: "uni-datetime-picker-sign sign-left" }, "-"),
            vue.createElementVNode("text", { class: "uni-datetime-picker-sign sign-right" }, "-")
          ])) : vue.createCommentVNode("v-if", true),
          $data.timeShow ? (vue.openBlock(), vue.createElementBlock("view", {
            key: 1,
            class: "uni-datetime-picker__container-box"
          }, [
            vue.createElementVNode("picker-view", {
              class: vue.normalizeClass(["uni-datetime-picker-view", [$props.hideSecond ? "time-hide-second" : ""]]),
              "indicator-style": $data.indicatorStyle,
              value: $options.hms,
              onChange: _cache[3] || (_cache[3] = (...args) => $options.bindTimeChange && $options.bindTimeChange(...args))
            }, [
              vue.createElementVNode("picker-view-column", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.hours, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "uni-datetime-picker-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "uni-datetime-picker-item" },
                        vue.toDisplayString($options.lessThanTen(item)),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              vue.createElementVNode("picker-view-column", null, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.minutes, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "uni-datetime-picker-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "uni-datetime-picker-item" },
                        vue.toDisplayString($options.lessThanTen(item)),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              !$props.hideSecond ? (vue.openBlock(), vue.createElementBlock("picker-view-column", { key: 0 }, [
                (vue.openBlock(true), vue.createElementBlock(
                  vue.Fragment,
                  null,
                  vue.renderList($options.seconds, (item, index) => {
                    return vue.openBlock(), vue.createElementBlock("view", {
                      class: "uni-datetime-picker-item",
                      key: index
                    }, [
                      vue.createElementVNode(
                        "text",
                        { class: "uni-datetime-picker-item" },
                        vue.toDisplayString($options.lessThanTen(item)),
                        1
                        /* TEXT */
                      )
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : vue.createCommentVNode("v-if", true)
            ], 42, ["indicator-style", "value"]),
            vue.createCommentVNode(" 兼容 nvue 不支持伪类 "),
            vue.createElementVNode(
              "text",
              {
                class: vue.normalizeClass(["uni-datetime-picker-sign", [$props.hideSecond ? "sign-center" : "sign-left"]])
              },
              ":",
              2
              /* CLASS */
            ),
            !$props.hideSecond ? (vue.openBlock(), vue.createElementBlock("text", {
              key: 0,
              class: "uni-datetime-picker-sign sign-right"
            }, ":")) : vue.createCommentVNode("v-if", true)
          ])) : vue.createCommentVNode("v-if", true),
          vue.createElementVNode("view", { class: "uni-datetime-picker-btn" }, [
            vue.createElementVNode("view", {
              onClick: _cache[4] || (_cache[4] = (...args) => $options.clearTime && $options.clearTime(...args))
            }, [
              vue.createElementVNode(
                "text",
                { class: "uni-datetime-picker-btn-text" },
                vue.toDisplayString($options.clearText),
                1
                /* TEXT */
              )
            ]),
            vue.createElementVNode("view", { class: "uni-datetime-picker-btn-group" }, [
              vue.createElementVNode("view", {
                class: "uni-datetime-picker-cancel",
                onClick: _cache[5] || (_cache[5] = (...args) => $options.tiggerTimePicker && $options.tiggerTimePicker(...args))
              }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-datetime-picker-btn-text" },
                  vue.toDisplayString($options.cancelText),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", {
                onClick: _cache[6] || (_cache[6] = (...args) => $options.setTime && $options.setTime(...args))
              }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-datetime-picker-btn-text" },
                  vue.toDisplayString($options.okText),
                  1
                  /* TEXT */
                )
              ])
            ])
          ])
        ],
        6
        /* CLASS, STYLE */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const TimePicker = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$6], ["__scopeId", "data-v-1d532b70"], ["__file", "D:/mygitee/项目大全/pickUpCode/取件码/uni_modules/uni-datetime-picker/components/uni-datetime-picker/time-picker.vue"]]);
  const {
    t
  } = initVueI18n(i18nMessages);
  const _sfc_main$6 = {
    components: {
      calendarItem,
      timePicker: TimePicker
    },
    options: {
      virtualHost: true
    },
    props: {
      date: {
        type: String,
        default: ""
      },
      defTime: {
        type: [String, Object],
        default: ""
      },
      selectableTimes: {
        type: [Object],
        default() {
          return {};
        }
      },
      selected: {
        type: Array,
        default() {
          return [];
        }
      },
      startDate: {
        type: String,
        default: ""
      },
      endDate: {
        type: String,
        default: ""
      },
      startPlaceholder: {
        type: String,
        default: ""
      },
      endPlaceholder: {
        type: String,
        default: ""
      },
      range: {
        type: Boolean,
        default: false
      },
      hasTime: {
        type: Boolean,
        default: false
      },
      insert: {
        type: Boolean,
        default: true
      },
      showMonth: {
        type: Boolean,
        default: true
      },
      clearDate: {
        type: Boolean,
        default: true
      },
      checkHover: {
        type: Boolean,
        default: true
      },
      hideSecond: {
        type: [Boolean],
        default: false
      },
      pleStatus: {
        type: Object,
        default() {
          return {
            before: "",
            after: "",
            data: [],
            fulldate: ""
          };
        }
      },
      defaultValue: {
        type: [String, Object, Array],
        default: ""
      }
    },
    data() {
      return {
        show: false,
        weeks: [],
        calendar: {},
        nowDate: {},
        aniMaskShow: false,
        firstEnter: true,
        time: "",
        timeRange: {
          startTime: "",
          endTime: ""
        },
        tempSingleDate: "",
        tempRange: {
          before: "",
          after: ""
        }
      };
    },
    watch: {
      date: {
        immediate: true,
        handler(newVal) {
          if (!this.range) {
            this.tempSingleDate = newVal;
            setTimeout(() => {
              this.init(newVal);
            }, 100);
          }
        }
      },
      defTime: {
        immediate: true,
        handler(newVal) {
          if (!this.range) {
            this.time = newVal;
          } else {
            this.timeRange.startTime = newVal.start;
            this.timeRange.endTime = newVal.end;
          }
        }
      },
      startDate(val) {
        if (!this.cale) {
          return;
        }
        this.cale.setStartDate(val);
        this.cale.setDate(this.nowDate.fullDate);
        this.weeks = this.cale.weeks;
      },
      endDate(val) {
        if (!this.cale) {
          return;
        }
        this.cale.setEndDate(val);
        this.cale.setDate(this.nowDate.fullDate);
        this.weeks = this.cale.weeks;
      },
      selected(newVal) {
        if (!this.cale) {
          return;
        }
        this.cale.setSelectInfo(this.nowDate.fullDate, newVal);
        this.weeks = this.cale.weeks;
      },
      pleStatus: {
        immediate: true,
        handler(newVal) {
          const {
            before,
            after,
            fulldate,
            which
          } = newVal;
          this.tempRange.before = before;
          this.tempRange.after = after;
          setTimeout(() => {
            if (fulldate) {
              this.cale.setHoverMultiple(fulldate);
              if (before && after) {
                this.cale.lastHover = true;
                if (this.rangeWithinMonth(after, before))
                  return;
                this.setDate(before);
              } else {
                this.cale.setMultiple(fulldate);
                this.setDate(this.nowDate.fullDate);
                this.calendar.fullDate = "";
                this.cale.lastHover = false;
              }
            } else {
              if (!this.cale) {
                return;
              }
              this.cale.setDefaultMultiple(before, after);
              if (which === "left" && before) {
                this.setDate(before);
                this.weeks = this.cale.weeks;
              } else if (after) {
                this.setDate(after);
                this.weeks = this.cale.weeks;
              }
              this.cale.lastHover = true;
            }
          }, 16);
        }
      }
    },
    computed: {
      timepickerStartTime() {
        const activeDate = this.range ? this.tempRange.before : this.calendar.fullDate;
        return activeDate === this.startDate ? this.selectableTimes.start : "";
      },
      timepickerEndTime() {
        const activeDate = this.range ? this.tempRange.after : this.calendar.fullDate;
        return activeDate === this.endDate ? this.selectableTimes.end : "";
      },
      /**
       * for i18n
       */
      selectDateText() {
        return t("uni-datetime-picker.selectDate");
      },
      startDateText() {
        return this.startPlaceholder || t("uni-datetime-picker.startDate");
      },
      endDateText() {
        return this.endPlaceholder || t("uni-datetime-picker.endDate");
      },
      okText() {
        return t("uni-datetime-picker.ok");
      },
      yearText() {
        return t("uni-datetime-picker.year");
      },
      monthText() {
        return t("uni-datetime-picker.month");
      },
      MONText() {
        return t("uni-calender.MON");
      },
      TUEText() {
        return t("uni-calender.TUE");
      },
      WEDText() {
        return t("uni-calender.WED");
      },
      THUText() {
        return t("uni-calender.THU");
      },
      FRIText() {
        return t("uni-calender.FRI");
      },
      SATText() {
        return t("uni-calender.SAT");
      },
      SUNText() {
        return t("uni-calender.SUN");
      },
      confirmText() {
        return t("uni-calender.confirm");
      }
    },
    created() {
      this.cale = new Calendar$1({
        selected: this.selected,
        startDate: this.startDate,
        endDate: this.endDate,
        range: this.range
      });
      this.init(this.date);
    },
    methods: {
      leaveCale() {
        this.firstEnter = true;
      },
      handleMouse(weeks) {
        if (weeks.disable)
          return;
        if (this.cale.lastHover)
          return;
        let {
          before,
          after
        } = this.cale.multipleStatus;
        if (!before)
          return;
        this.calendar = weeks;
        this.cale.setHoverMultiple(this.calendar.fullDate);
        this.weeks = this.cale.weeks;
        if (this.firstEnter) {
          this.$emit("firstEnterCale", this.cale.multipleStatus);
          this.firstEnter = false;
        }
      },
      rangeWithinMonth(A, B) {
        const [yearA, monthA] = A.split("-");
        const [yearB, monthB] = B.split("-");
        return yearA === yearB && monthA === monthB;
      },
      // 蒙版点击事件
      maskClick() {
        this.close();
        this.$emit("maskClose");
      },
      clearCalender() {
        if (this.range) {
          this.timeRange.startTime = "";
          this.timeRange.endTime = "";
          this.tempRange.before = "";
          this.tempRange.after = "";
          this.cale.multipleStatus.before = "";
          this.cale.multipleStatus.after = "";
          this.cale.multipleStatus.data = [];
          this.cale.lastHover = false;
        } else {
          this.time = "";
          this.tempSingleDate = "";
        }
        this.calendar.fullDate = "";
        this.setDate(/* @__PURE__ */ new Date());
      },
      bindDateChange(e) {
        const value = e.detail.value + "-1";
        this.setDate(value);
      },
      /**
       * 初始化日期显示
       * @param {Object} date
       */
      init(date) {
        if (!this.cale) {
          return;
        }
        this.cale.setDate(date || /* @__PURE__ */ new Date());
        this.weeks = this.cale.weeks;
        this.nowDate = this.cale.getInfo(date);
        this.calendar = {
          ...this.nowDate
        };
        if (!date) {
          this.calendar.fullDate = "";
          if (this.defaultValue && !this.range) {
            const defaultDate = new Date(this.defaultValue);
            const fullDate = getDate(defaultDate);
            const year = defaultDate.getFullYear();
            const month = defaultDate.getMonth() + 1;
            const date2 = defaultDate.getDate();
            const day = defaultDate.getDay();
            this.calendar = {
              fullDate,
              year,
              month,
              date: date2,
              day
            }, this.tempSingleDate = fullDate;
            this.time = getTime(defaultDate, this.hideSecond);
          }
        }
      },
      /**
       * 打开日历弹窗
       */
      open() {
        if (this.clearDate && !this.insert) {
          this.cale.cleanMultipleStatus();
          this.init(this.date);
        }
        this.show = true;
        this.$nextTick(() => {
          setTimeout(() => {
            this.aniMaskShow = true;
          }, 50);
        });
      },
      /**
       * 关闭日历弹窗
       */
      close() {
        this.aniMaskShow = false;
        this.$nextTick(() => {
          setTimeout(() => {
            this.show = false;
            this.$emit("close");
          }, 300);
        });
      },
      /**
       * 确认按钮
       */
      confirm() {
        this.setEmit("confirm");
        this.close();
      },
      /**
       * 变化触发
       */
      change(isSingleChange) {
        if (!this.insert && !isSingleChange)
          return;
        this.setEmit("change");
      },
      /**
       * 选择月份触发
       */
      monthSwitch() {
        let {
          year,
          month
        } = this.nowDate;
        this.$emit("monthSwitch", {
          year,
          month: Number(month)
        });
      },
      /**
       * 派发事件
       * @param {Object} name
       */
      setEmit(name) {
        if (!this.range) {
          if (!this.calendar.fullDate) {
            this.calendar = this.cale.getInfo(/* @__PURE__ */ new Date());
            this.tempSingleDate = this.calendar.fullDate;
          }
          if (this.hasTime && !this.time) {
            this.time = getTime(/* @__PURE__ */ new Date(), this.hideSecond);
          }
        }
        let {
          year,
          month,
          date,
          fullDate,
          extraInfo
        } = this.calendar;
        this.$emit(name, {
          range: this.cale.multipleStatus,
          year,
          month,
          date,
          time: this.time,
          timeRange: this.timeRange,
          fulldate: fullDate,
          extraInfo: extraInfo || {}
        });
      },
      /**
       * 选择天触发
       * @param {Object} weeks
       */
      choiceDate(weeks) {
        if (weeks.disable)
          return;
        this.calendar = weeks;
        this.calendar.userChecked = true;
        this.cale.setMultiple(this.calendar.fullDate, true);
        this.weeks = this.cale.weeks;
        this.tempSingleDate = this.calendar.fullDate;
        const beforeDate = new Date(this.cale.multipleStatus.before).getTime();
        const afterDate = new Date(this.cale.multipleStatus.after).getTime();
        if (beforeDate > afterDate && afterDate) {
          this.tempRange.before = this.cale.multipleStatus.after;
          this.tempRange.after = this.cale.multipleStatus.before;
        } else {
          this.tempRange.before = this.cale.multipleStatus.before;
          this.tempRange.after = this.cale.multipleStatus.after;
        }
        this.change(true);
      },
      changeMonth(type) {
        let newDate;
        if (type === "pre") {
          newDate = this.cale.getPreMonthObj(this.nowDate.fullDate).fullDate;
        } else if (type === "next") {
          newDate = this.cale.getNextMonthObj(this.nowDate.fullDate).fullDate;
        }
        this.setDate(newDate);
        this.monthSwitch();
      },
      /**
       * 设置日期
       * @param {Object} date
       */
      setDate(date) {
        this.cale.setDate(date);
        this.weeks = this.cale.weeks;
        this.nowDate = this.cale.getInfo(date);
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_calendar_item = vue.resolveComponent("calendar-item");
    const _component_time_picker = vue.resolveComponent("time-picker");
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "uni-calendar",
        onMouseleave: _cache[9] || (_cache[9] = (...args) => $options.leaveCale && $options.leaveCale(...args))
      },
      [
        !$props.insert && $data.show ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: vue.normalizeClass(["uni-calendar__mask", { "uni-calendar--mask-show": $data.aniMaskShow }]),
            onClick: _cache[0] || (_cache[0] = (...args) => $options.maskClick && $options.maskClick(...args))
          },
          null,
          2
          /* CLASS */
        )) : vue.createCommentVNode("v-if", true),
        $props.insert || $data.show ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 1,
            class: vue.normalizeClass(["uni-calendar__content", { "uni-calendar--fixed": !$props.insert, "uni-calendar--ani-show": $data.aniMaskShow, "uni-calendar__content-mobile": $data.aniMaskShow }])
          },
          [
            vue.createElementVNode(
              "view",
              {
                class: vue.normalizeClass(["uni-calendar__header", { "uni-calendar__header-mobile": !$props.insert }])
              },
              [
                vue.createElementVNode("view", {
                  class: "uni-calendar__header-btn-box",
                  onClick: _cache[1] || (_cache[1] = vue.withModifiers(($event) => $options.changeMonth("pre"), ["stop"]))
                }, [
                  vue.createElementVNode("view", { class: "uni-calendar__header-btn uni-calendar--left" })
                ]),
                vue.createElementVNode("picker", {
                  mode: "date",
                  value: $props.date,
                  fields: "month",
                  onChange: _cache[2] || (_cache[2] = (...args) => $options.bindDateChange && $options.bindDateChange(...args))
                }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__header-text" },
                    vue.toDisplayString(($data.nowDate.year || "") + $options.yearText + ($data.nowDate.month || "") + $options.monthText),
                    1
                    /* TEXT */
                  )
                ], 40, ["value"]),
                vue.createElementVNode("view", {
                  class: "uni-calendar__header-btn-box",
                  onClick: _cache[3] || (_cache[3] = vue.withModifiers(($event) => $options.changeMonth("next"), ["stop"]))
                }, [
                  vue.createElementVNode("view", { class: "uni-calendar__header-btn uni-calendar--right" })
                ]),
                !$props.insert ? (vue.openBlock(), vue.createElementBlock("view", {
                  key: 0,
                  class: "dialog-close",
                  onClick: _cache[4] || (_cache[4] = (...args) => $options.maskClick && $options.maskClick(...args))
                }, [
                  vue.createElementVNode("view", {
                    class: "dialog-close-plus",
                    "data-id": "close"
                  }),
                  vue.createElementVNode("view", {
                    class: "dialog-close-plus dialog-close-rotate",
                    "data-id": "close"
                  })
                ])) : vue.createCommentVNode("v-if", true)
              ],
              2
              /* CLASS */
            ),
            vue.createElementVNode("view", { class: "uni-calendar__box" }, [
              $props.showMonth ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-calendar__box-bg"
              }, [
                vue.createElementVNode(
                  "text",
                  { class: "uni-calendar__box-bg-text" },
                  vue.toDisplayString($data.nowDate.month),
                  1
                  /* TEXT */
                )
              ])) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", {
                class: "uni-calendar__weeks",
                style: { "padding-bottom": "7px" }
              }, [
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.SUNText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.MONText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.TUEText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.WEDText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.THUText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.FRIText),
                    1
                    /* TEXT */
                  )
                ]),
                vue.createElementVNode("view", { class: "uni-calendar__weeks-day" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "uni-calendar__weeks-day-text" },
                    vue.toDisplayString($options.SATText),
                    1
                    /* TEXT */
                  )
                ])
              ]),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.weeks, (item, weekIndex) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    class: "uni-calendar__weeks",
                    key: weekIndex
                  }, [
                    (vue.openBlock(true), vue.createElementBlock(
                      vue.Fragment,
                      null,
                      vue.renderList(item, (weeks, weeksIndex) => {
                        return vue.openBlock(), vue.createElementBlock("view", {
                          class: "uni-calendar__weeks-item",
                          key: weeksIndex
                        }, [
                          vue.createVNode(_component_calendar_item, {
                            class: "uni-calendar-item--hook",
                            weeks,
                            calendar: $data.calendar,
                            selected: $props.selected,
                            checkHover: $props.range,
                            onChange: $options.choiceDate,
                            onHandleMouse: $options.handleMouse
                          }, null, 8, ["weeks", "calendar", "selected", "checkHover", "onChange", "onHandleMouse"])
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
            ]),
            !$props.insert && !$props.range && $props.hasTime ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "uni-date-changed uni-calendar--fixed-top",
              style: { "padding": "0 80px" }
            }, [
              vue.createElementVNode(
                "view",
                { class: "uni-date-changed--time-date" },
                vue.toDisplayString($data.tempSingleDate ? $data.tempSingleDate : $options.selectDateText),
                1
                /* TEXT */
              ),
              vue.createVNode(_component_time_picker, {
                type: "time",
                start: $options.timepickerStartTime,
                end: $options.timepickerEndTime,
                modelValue: $data.time,
                "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.time = $event),
                disabled: !$data.tempSingleDate,
                border: false,
                "hide-second": $props.hideSecond,
                class: "time-picker-style"
              }, null, 8, ["start", "end", "modelValue", "disabled", "hide-second"])
            ])) : vue.createCommentVNode("v-if", true),
            !$props.insert && $props.range && $props.hasTime ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 1,
              class: "uni-date-changed uni-calendar--fixed-top"
            }, [
              vue.createElementVNode("view", { class: "uni-date-changed--time-start" }, [
                vue.createElementVNode(
                  "view",
                  { class: "uni-date-changed--time-date" },
                  vue.toDisplayString($data.tempRange.before ? $data.tempRange.before : $options.startDateText),
                  1
                  /* TEXT */
                ),
                vue.createVNode(_component_time_picker, {
                  type: "time",
                  start: $options.timepickerStartTime,
                  modelValue: $data.timeRange.startTime,
                  "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => $data.timeRange.startTime = $event),
                  border: false,
                  "hide-second": $props.hideSecond,
                  disabled: !$data.tempRange.before,
                  class: "time-picker-style"
                }, null, 8, ["start", "modelValue", "hide-second", "disabled"])
              ]),
              vue.createElementVNode("view", { style: { "line-height": "50px" } }, [
                vue.createVNode(_component_uni_icons, {
                  type: "arrowthinright",
                  color: "#999"
                })
              ]),
              vue.createElementVNode("view", { class: "uni-date-changed--time-end" }, [
                vue.createElementVNode(
                  "view",
                  { class: "uni-date-changed--time-date" },
                  vue.toDisplayString($data.tempRange.after ? $data.tempRange.after : $options.endDateText),
                  1
                  /* TEXT */
                ),
                vue.createVNode(_component_time_picker, {
                  type: "time",
                  end: $options.timepickerEndTime,
                  modelValue: $data.timeRange.endTime,
                  "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.timeRange.endTime = $event),
                  border: false,
                  "hide-second": $props.hideSecond,
                  disabled: !$data.tempRange.after,
                  class: "time-picker-style"
                }, null, 8, ["end", "modelValue", "hide-second", "disabled"])
              ])
            ])) : vue.createCommentVNode("v-if", true),
            !$props.insert ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 2,
              class: "uni-date-changed uni-date-btn--ok"
            }, [
              vue.createElementVNode(
                "view",
                {
                  class: "uni-datetime-picker--btn",
                  onClick: _cache[8] || (_cache[8] = (...args) => $options.confirm && $options.confirm(...args))
                },
                vue.toDisplayString($options.confirmText),
                1
                /* TEXT */
              )
            ])) : vue.createCommentVNode("v-if", true)
          ],
          2
          /* CLASS */
        )) : vue.createCommentVNode("v-if", true)
      ],
      32
      /* NEED_HYDRATION */
    );
  }
  const Calendar = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$5], ["__scopeId", "data-v-1d379219"], ["__file", "D:/mygitee/项目大全/pickUpCode/取件码/uni_modules/uni-datetime-picker/components/uni-datetime-picker/calendar.vue"]]);
  const _sfc_main$5 = {
    name: "UniDatetimePicker",
    options: {
      virtualHost: true
    },
    components: {
      Calendar,
      TimePicker
    },
    data() {
      return {
        isRange: false,
        hasTime: false,
        displayValue: "",
        inputDate: "",
        calendarDate: "",
        pickerTime: "",
        calendarRange: {
          startDate: "",
          startTime: "",
          endDate: "",
          endTime: ""
        },
        displayRangeValue: {
          startDate: "",
          endDate: ""
        },
        tempRange: {
          startDate: "",
          startTime: "",
          endDate: "",
          endTime: ""
        },
        // 左右日历同步数据
        startMultipleStatus: {
          before: "",
          after: "",
          data: [],
          fulldate: ""
        },
        endMultipleStatus: {
          before: "",
          after: "",
          data: [],
          fulldate: ""
        },
        pickerVisible: false,
        pickerPositionStyle: null,
        isEmitValue: false,
        isPhone: false,
        isFirstShow: true,
        i18nT: () => {
        }
      };
    },
    props: {
      type: {
        type: String,
        default: "datetime"
      },
      value: {
        type: [String, Number, Array, Date],
        default: ""
      },
      modelValue: {
        type: [String, Number, Array, Date],
        default: ""
      },
      start: {
        type: [Number, String],
        default: ""
      },
      end: {
        type: [Number, String],
        default: ""
      },
      returnType: {
        type: String,
        default: "string"
      },
      placeholder: {
        type: String,
        default: ""
      },
      startPlaceholder: {
        type: String,
        default: ""
      },
      endPlaceholder: {
        type: String,
        default: ""
      },
      rangeSeparator: {
        type: String,
        default: "-"
      },
      border: {
        type: [Boolean],
        default: true
      },
      disabled: {
        type: [Boolean],
        default: false
      },
      clearIcon: {
        type: [Boolean],
        default: true
      },
      hideSecond: {
        type: [Boolean],
        default: false
      },
      defaultValue: {
        type: [String, Object, Array],
        default: ""
      }
    },
    watch: {
      type: {
        immediate: true,
        handler(newVal) {
          this.hasTime = newVal.indexOf("time") !== -1;
          this.isRange = newVal.indexOf("range") !== -1;
        }
      },
      modelValue: {
        immediate: true,
        handler(newVal) {
          if (this.isEmitValue) {
            this.isEmitValue = false;
            return;
          }
          this.initPicker(newVal);
        }
      },
      start: {
        immediate: true,
        handler(newVal) {
          if (!newVal)
            return;
          this.calendarRange.startDate = getDate(newVal);
          if (this.hasTime) {
            this.calendarRange.startTime = getTime(newVal);
          }
        }
      },
      end: {
        immediate: true,
        handler(newVal) {
          if (!newVal)
            return;
          this.calendarRange.endDate = getDate(newVal);
          if (this.hasTime) {
            this.calendarRange.endTime = getTime(newVal, this.hideSecond);
          }
        }
      }
    },
    computed: {
      timepickerStartTime() {
        const activeDate = this.isRange ? this.tempRange.startDate : this.inputDate;
        return activeDate === this.calendarRange.startDate ? this.calendarRange.startTime : "";
      },
      timepickerEndTime() {
        const activeDate = this.isRange ? this.tempRange.endDate : this.inputDate;
        return activeDate === this.calendarRange.endDate ? this.calendarRange.endTime : "";
      },
      mobileCalendarTime() {
        const timeRange = {
          start: this.tempRange.startTime,
          end: this.tempRange.endTime
        };
        return this.isRange ? timeRange : this.pickerTime;
      },
      mobSelectableTime() {
        return {
          start: this.calendarRange.startTime,
          end: this.calendarRange.endTime
        };
      },
      datePopupWidth() {
        return this.isRange ? 653 : 301;
      },
      /**
       * for i18n
       */
      singlePlaceholderText() {
        return this.placeholder || (this.type === "date" ? this.selectDateText : this.selectDateTimeText);
      },
      startPlaceholderText() {
        return this.startPlaceholder || this.startDateText;
      },
      endPlaceholderText() {
        return this.endPlaceholder || this.endDateText;
      },
      selectDateText() {
        return this.i18nT("uni-datetime-picker.selectDate");
      },
      selectDateTimeText() {
        return this.i18nT("uni-datetime-picker.selectDateTime");
      },
      selectTimeText() {
        return this.i18nT("uni-datetime-picker.selectTime");
      },
      startDateText() {
        return this.startPlaceholder || this.i18nT("uni-datetime-picker.startDate");
      },
      startTimeText() {
        return this.i18nT("uni-datetime-picker.startTime");
      },
      endDateText() {
        return this.endPlaceholder || this.i18nT("uni-datetime-picker.endDate");
      },
      endTimeText() {
        return this.i18nT("uni-datetime-picker.endTime");
      },
      okText() {
        return this.i18nT("uni-datetime-picker.ok");
      },
      clearText() {
        return this.i18nT("uni-datetime-picker.clear");
      },
      showClearIcon() {
        return this.clearIcon && !this.disabled && (this.displayValue || this.displayRangeValue.startDate && this.displayRangeValue.endDate);
      }
    },
    created() {
      this.initI18nT();
      this.platform();
    },
    methods: {
      initI18nT() {
        const vueI18n = initVueI18n(i18nMessages);
        this.i18nT = vueI18n.t;
      },
      initPicker(newVal) {
        if (!newVal && !this.defaultValue || Array.isArray(newVal) && !newVal.length) {
          this.$nextTick(() => {
            this.clear(false);
          });
          return;
        }
        if (!Array.isArray(newVal) && !this.isRange) {
          if (newVal) {
            this.displayValue = this.inputDate = this.calendarDate = getDate(newVal);
            if (this.hasTime) {
              this.pickerTime = getTime(newVal, this.hideSecond);
              this.displayValue = `${this.displayValue} ${this.pickerTime}`;
            }
          } else if (this.defaultValue) {
            this.inputDate = this.calendarDate = getDate(this.defaultValue);
            if (this.hasTime) {
              this.pickerTime = getTime(this.defaultValue, this.hideSecond);
            }
          }
        } else {
          const [before, after] = newVal;
          if (!before && !after)
            return;
          const beforeDate = getDate(before);
          const beforeTime = getTime(before, this.hideSecond);
          const afterDate = getDate(after);
          const afterTime = getTime(after, this.hideSecond);
          const startDate = beforeDate;
          const endDate = afterDate;
          this.displayRangeValue.startDate = this.tempRange.startDate = startDate;
          this.displayRangeValue.endDate = this.tempRange.endDate = endDate;
          if (this.hasTime) {
            this.displayRangeValue.startDate = `${beforeDate} ${beforeTime}`;
            this.displayRangeValue.endDate = `${afterDate} ${afterTime}`;
            this.tempRange.startTime = beforeTime;
            this.tempRange.endTime = afterTime;
          }
          const defaultRange = {
            before: beforeDate,
            after: afterDate
          };
          this.startMultipleStatus = Object.assign({}, this.startMultipleStatus, defaultRange, {
            which: "right"
          });
          this.endMultipleStatus = Object.assign({}, this.endMultipleStatus, defaultRange, {
            which: "left"
          });
        }
      },
      updateLeftCale(e) {
        const left = this.$refs.left;
        left.cale.setHoverMultiple(e.after);
        left.setDate(this.$refs.left.nowDate.fullDate);
      },
      updateRightCale(e) {
        const right = this.$refs.right;
        right.cale.setHoverMultiple(e.after);
        right.setDate(this.$refs.right.nowDate.fullDate);
      },
      platform() {
        if (typeof navigator !== "undefined") {
          this.isPhone = navigator.userAgent.toLowerCase().indexOf("mobile") !== -1;
          return;
        }
        const {
          windowWidth
        } = uni.getSystemInfoSync();
        this.isPhone = windowWidth <= 500;
        this.windowWidth = windowWidth;
      },
      show() {
        this.$emit("show");
        if (this.disabled) {
          return;
        }
        this.platform();
        if (this.isPhone) {
          setTimeout(() => {
            this.$refs.mobile.open();
          }, 0);
          return;
        }
        this.pickerPositionStyle = {
          top: "10px"
        };
        const dateEditor = uni.createSelectorQuery().in(this).select(".uni-date-editor");
        dateEditor.boundingClientRect((rect) => {
          if (this.windowWidth - rect.left < this.datePopupWidth) {
            this.pickerPositionStyle.right = 0;
          }
        }).exec();
        setTimeout(() => {
          this.pickerVisible = !this.pickerVisible;
          if (!this.isPhone && this.isRange && this.isFirstShow) {
            this.isFirstShow = false;
            const {
              startDate,
              endDate
            } = this.calendarRange;
            if (startDate && endDate) {
              if (this.diffDate(startDate, endDate) < 30) {
                this.$refs.right.changeMonth("pre");
              }
            } else {
              if (this.isPhone) {
                this.$refs.right.cale.lastHover = false;
              }
            }
          }
        }, 50);
      },
      close() {
        setTimeout(() => {
          this.pickerVisible = false;
          this.$emit("maskClick", this.value);
          this.$refs.mobile && this.$refs.mobile.close();
        }, 20);
      },
      setEmit(value) {
        if (this.returnType === "timestamp" || this.returnType === "date") {
          if (!Array.isArray(value)) {
            if (!this.hasTime) {
              value = value + " 00:00:00";
            }
            value = this.createTimestamp(value);
            if (this.returnType === "date") {
              value = new Date(value);
            }
          } else {
            if (!this.hasTime) {
              value[0] = value[0] + " 00:00:00";
              value[1] = value[1] + " 00:00:00";
            }
            value[0] = this.createTimestamp(value[0]);
            value[1] = this.createTimestamp(value[1]);
            if (this.returnType === "date") {
              value[0] = new Date(value[0]);
              value[1] = new Date(value[1]);
            }
          }
        }
        this.$emit("update:modelValue", value);
        this.$emit("input", value);
        this.$emit("change", value);
        this.isEmitValue = true;
      },
      createTimestamp(date) {
        date = fixIosDateFormat(date);
        return Date.parse(new Date(date));
      },
      singleChange(e) {
        this.calendarDate = this.inputDate = e.fulldate;
        if (this.hasTime)
          return;
        this.confirmSingleChange();
      },
      confirmSingleChange() {
        if (!checkDate(this.inputDate)) {
          const now = /* @__PURE__ */ new Date();
          this.calendarDate = this.inputDate = getDate(now);
          this.pickerTime = getTime(now, this.hideSecond);
        }
        let startLaterInputDate = false;
        let startDate, startTime;
        if (this.start) {
          let startString = this.start;
          if (typeof this.start === "number") {
            startString = getDateTime(this.start, this.hideSecond);
          }
          [startDate, startTime] = startString.split(" ");
          if (this.start && !dateCompare(startDate, this.inputDate)) {
            startLaterInputDate = true;
            this.inputDate = startDate;
          }
        }
        let endEarlierInputDate = false;
        let endDate, endTime;
        if (this.end) {
          let endString = this.end;
          if (typeof this.end === "number") {
            endString = getDateTime(this.end, this.hideSecond);
          }
          [endDate, endTime] = endString.split(" ");
          if (this.end && !dateCompare(this.inputDate, endDate)) {
            endEarlierInputDate = true;
            this.inputDate = endDate;
          }
        }
        if (this.hasTime) {
          if (startLaterInputDate) {
            this.pickerTime = startTime || getDefaultSecond(this.hideSecond);
          }
          if (endEarlierInputDate) {
            this.pickerTime = endTime || getDefaultSecond(this.hideSecond);
          }
          if (!this.pickerTime) {
            this.pickerTime = getTime(Date.now(), this.hideSecond);
          }
          this.displayValue = `${this.inputDate} ${this.pickerTime}`;
        } else {
          this.displayValue = this.inputDate;
        }
        this.setEmit(this.displayValue);
        this.pickerVisible = false;
      },
      leftChange(e) {
        const {
          before,
          after
        } = e.range;
        this.rangeChange(before, after);
        const obj = {
          before: e.range.before,
          after: e.range.after,
          data: e.range.data,
          fulldate: e.fulldate
        };
        this.startMultipleStatus = Object.assign({}, this.startMultipleStatus, obj);
        this.$emit("calendarClick", e);
      },
      rightChange(e) {
        const {
          before,
          after
        } = e.range;
        this.rangeChange(before, after);
        const obj = {
          before: e.range.before,
          after: e.range.after,
          data: e.range.data,
          fulldate: e.fulldate
        };
        this.endMultipleStatus = Object.assign({}, this.endMultipleStatus, obj);
        this.$emit("calendarClick", e);
      },
      mobileChange(e) {
        if (this.isRange) {
          const {
            before,
            after
          } = e.range;
          if (!before) {
            return;
          }
          this.handleStartAndEnd(before, after, true);
          if (this.hasTime) {
            const {
              startTime,
              endTime
            } = e.timeRange;
            this.tempRange.startTime = startTime;
            this.tempRange.endTime = endTime;
          }
          this.confirmRangeChange();
        } else {
          if (this.hasTime) {
            this.displayValue = e.fulldate + " " + e.time;
          } else {
            this.displayValue = e.fulldate;
          }
          this.setEmit(this.displayValue);
        }
        this.$refs.mobile.close();
      },
      rangeChange(before, after) {
        if (!(before && after))
          return;
        this.handleStartAndEnd(before, after, true);
        if (this.hasTime)
          return;
        this.confirmRangeChange();
      },
      confirmRangeChange() {
        if (!this.tempRange.startDate || !this.tempRange.endDate) {
          this.pickerVisible = false;
          return;
        }
        if (!checkDate(this.tempRange.startDate)) {
          this.tempRange.startDate = getDate(Date.now());
        }
        if (!checkDate(this.tempRange.endDate)) {
          this.tempRange.endDate = getDate(Date.now());
        }
        let start, end;
        let startDateLaterRangeStartDate = false;
        let startDateLaterRangeEndDate = false;
        let startDate, startTime;
        if (this.start) {
          let startString = this.start;
          if (typeof this.start === "number") {
            startString = getDateTime(this.start, this.hideSecond);
          }
          [startDate, startTime] = startString.split(" ");
          if (this.start && !dateCompare(this.start, this.tempRange.startDate)) {
            startDateLaterRangeStartDate = true;
            this.tempRange.startDate = startDate;
          }
          if (this.start && !dateCompare(this.start, this.tempRange.endDate)) {
            startDateLaterRangeEndDate = true;
            this.tempRange.endDate = startDate;
          }
        }
        let endDateEarlierRangeStartDate = false;
        let endDateEarlierRangeEndDate = false;
        let endDate, endTime;
        if (this.end) {
          let endString = this.end;
          if (typeof this.end === "number") {
            endString = getDateTime(this.end, this.hideSecond);
          }
          [endDate, endTime] = endString.split(" ");
          if (this.end && !dateCompare(this.tempRange.startDate, this.end)) {
            endDateEarlierRangeStartDate = true;
            this.tempRange.startDate = endDate;
          }
          if (this.end && !dateCompare(this.tempRange.endDate, this.end)) {
            endDateEarlierRangeEndDate = true;
            this.tempRange.endDate = endDate;
          }
        }
        if (!this.hasTime) {
          start = this.displayRangeValue.startDate = this.tempRange.startDate;
          end = this.displayRangeValue.endDate = this.tempRange.endDate;
        } else {
          if (startDateLaterRangeStartDate) {
            this.tempRange.startTime = startTime || getDefaultSecond(this.hideSecond);
          } else if (endDateEarlierRangeStartDate) {
            this.tempRange.startTime = endTime || getDefaultSecond(this.hideSecond);
          }
          if (!this.tempRange.startTime) {
            this.tempRange.startTime = getTime(Date.now(), this.hideSecond);
          }
          if (startDateLaterRangeEndDate) {
            this.tempRange.endTime = startTime || getDefaultSecond(this.hideSecond);
          } else if (endDateEarlierRangeEndDate) {
            this.tempRange.endTime = endTime || getDefaultSecond(this.hideSecond);
          }
          if (!this.tempRange.endTime) {
            this.tempRange.endTime = getTime(Date.now(), this.hideSecond);
          }
          start = this.displayRangeValue.startDate = `${this.tempRange.startDate} ${this.tempRange.startTime}`;
          end = this.displayRangeValue.endDate = `${this.tempRange.endDate} ${this.tempRange.endTime}`;
        }
        if (!dateCompare(start, end)) {
          [start, end] = [end, start];
        }
        this.displayRangeValue.startDate = start;
        this.displayRangeValue.endDate = end;
        const displayRange = [start, end];
        this.setEmit(displayRange);
        this.pickerVisible = false;
      },
      handleStartAndEnd(before, after, temp = false) {
        if (!before)
          return;
        if (!after)
          after = before;
        const type = temp ? "tempRange" : "range";
        const isStartEarlierEnd = dateCompare(before, after);
        this[type].startDate = isStartEarlierEnd ? before : after;
        this[type].endDate = isStartEarlierEnd ? after : before;
      },
      /**
       * 比较时间大小
       */
      dateCompare(startDate, endDate) {
        startDate = new Date(startDate.replace("-", "/").replace("-", "/"));
        endDate = new Date(endDate.replace("-", "/").replace("-", "/"));
        return startDate <= endDate;
      },
      /**
       * 比较时间差
       */
      diffDate(startDate, endDate) {
        startDate = new Date(startDate.replace("-", "/").replace("-", "/"));
        endDate = new Date(endDate.replace("-", "/").replace("-", "/"));
        const diff = (endDate - startDate) / (24 * 60 * 60 * 1e3);
        return Math.abs(diff);
      },
      clear(needEmit = true) {
        if (!this.isRange) {
          this.displayValue = "";
          this.inputDate = "";
          this.pickerTime = "";
          if (this.isPhone) {
            this.$refs.mobile && this.$refs.mobile.clearCalender();
          } else {
            this.$refs.pcSingle && this.$refs.pcSingle.clearCalender();
          }
          if (needEmit) {
            this.$emit("change", "");
            this.$emit("input", "");
            this.$emit("update:modelValue", "");
          }
        } else {
          this.displayRangeValue.startDate = "";
          this.displayRangeValue.endDate = "";
          this.tempRange.startDate = "";
          this.tempRange.startTime = "";
          this.tempRange.endDate = "";
          this.tempRange.endTime = "";
          if (this.isPhone) {
            this.$refs.mobile && this.$refs.mobile.clearCalender();
          } else {
            this.$refs.left && this.$refs.left.clearCalender();
            this.$refs.right && this.$refs.right.clearCalender();
            this.$refs.right && this.$refs.right.changeMonth("next");
          }
          if (needEmit) {
            this.$emit("change", []);
            this.$emit("input", []);
            this.$emit("update:modelValue", []);
          }
        }
      },
      calendarClick(e) {
        this.$emit("calendarClick", e);
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    const _component_time_picker = vue.resolveComponent("time-picker");
    const _component_Calendar = vue.resolveComponent("Calendar");
    return vue.openBlock(), vue.createElementBlock("view", { class: "uni-date" }, [
      vue.createElementVNode("view", {
        class: "uni-date-editor",
        onClick: _cache[1] || (_cache[1] = (...args) => $options.show && $options.show(...args))
      }, [
        vue.renderSlot(_ctx.$slots, "default", {}, () => [
          vue.createElementVNode(
            "view",
            {
              class: vue.normalizeClass(["uni-date-editor--x", { "uni-date-editor--x__disabled": $props.disabled, "uni-date-x--border": $props.border }])
            },
            [
              !$data.isRange ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-date-x uni-date-single"
              }, [
                vue.createVNode(_component_uni_icons, {
                  class: "icon-calendar",
                  type: "calendar",
                  color: "#c0c4cc",
                  size: "22"
                }),
                vue.createElementVNode(
                  "view",
                  { class: "uni-date__x-input" },
                  vue.toDisplayString($data.displayValue || $options.singlePlaceholderText),
                  1
                  /* TEXT */
                )
              ])) : (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "uni-date-x uni-date-range"
              }, [
                vue.createVNode(_component_uni_icons, {
                  class: "icon-calendar",
                  type: "calendar",
                  color: "#c0c4cc",
                  size: "22"
                }),
                vue.createElementVNode(
                  "view",
                  { class: "uni-date__x-input text-center" },
                  vue.toDisplayString($data.displayRangeValue.startDate || $options.startPlaceholderText),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "range-separator" },
                  vue.toDisplayString($props.rangeSeparator),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "view",
                  { class: "uni-date__x-input text-center" },
                  vue.toDisplayString($data.displayRangeValue.endDate || $options.endPlaceholderText),
                  1
                  /* TEXT */
                )
              ])),
              $options.showClearIcon ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 2,
                class: "uni-date__icon-clear",
                onClick: _cache[0] || (_cache[0] = vue.withModifiers((...args) => $options.clear && $options.clear(...args), ["stop"]))
              }, [
                vue.createVNode(_component_uni_icons, {
                  type: "clear",
                  color: "#c0c4cc",
                  size: "22"
                })
              ])) : vue.createCommentVNode("v-if", true)
            ],
            2
            /* CLASS */
          )
        ], true)
      ]),
      vue.withDirectives(vue.createElementVNode(
        "view",
        {
          class: "uni-date-mask--pc",
          onClick: _cache[2] || (_cache[2] = (...args) => $options.close && $options.close(...args))
        },
        null,
        512
        /* NEED_PATCH */
      ), [
        [vue.vShow, $data.pickerVisible]
      ]),
      !$data.isPhone ? vue.withDirectives((vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          ref: "datePicker",
          class: "uni-date-picker__container"
        },
        [
          !$data.isRange ? (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 0,
              class: "uni-date-single--x",
              style: vue.normalizeStyle($data.pickerPositionStyle)
            },
            [
              vue.createElementVNode("view", { class: "uni-popper__arrow" }),
              $data.hasTime ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "uni-date-changed popup-x-header"
              }, [
                vue.withDirectives(vue.createElementVNode("input", {
                  class: "uni-date__input text-center",
                  type: "text",
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.inputDate = $event),
                  placeholder: $options.selectDateText
                }, null, 8, ["placeholder"]), [
                  [vue.vModelText, $data.inputDate]
                ]),
                vue.createVNode(_component_time_picker, {
                  type: "time",
                  modelValue: $data.pickerTime,
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.pickerTime = $event),
                  border: false,
                  disabled: !$data.inputDate,
                  start: $options.timepickerStartTime,
                  end: $options.timepickerEndTime,
                  hideSecond: $props.hideSecond,
                  style: { "width": "100%" }
                }, {
                  default: vue.withCtx(() => [
                    vue.withDirectives(vue.createElementVNode("input", {
                      class: "uni-date__input text-center",
                      type: "text",
                      "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => $data.pickerTime = $event),
                      placeholder: $options.selectTimeText,
                      disabled: !$data.inputDate
                    }, null, 8, ["placeholder", "disabled"]), [
                      [vue.vModelText, $data.pickerTime]
                    ])
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["modelValue", "disabled", "start", "end", "hideSecond"])
              ])) : vue.createCommentVNode("v-if", true),
              vue.createVNode(_component_Calendar, {
                ref: "pcSingle",
                showMonth: false,
                "start-date": $data.calendarRange.startDate,
                "end-date": $data.calendarRange.endDate,
                date: $data.calendarDate,
                onChange: $options.singleChange,
                "default-value": $props.defaultValue,
                style: { "padding": "0 8px" }
              }, null, 8, ["start-date", "end-date", "date", "onChange", "default-value"]),
              $data.hasTime ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "popup-x-footer"
              }, [
                vue.createElementVNode(
                  "text",
                  {
                    class: "confirm-text",
                    onClick: _cache[6] || (_cache[6] = (...args) => $options.confirmSingleChange && $options.confirmSingleChange(...args))
                  },
                  vue.toDisplayString($options.okText),
                  1
                  /* TEXT */
                )
              ])) : vue.createCommentVNode("v-if", true)
            ],
            4
            /* STYLE */
          )) : (vue.openBlock(), vue.createElementBlock(
            "view",
            {
              key: 1,
              class: "uni-date-range--x",
              style: vue.normalizeStyle($data.pickerPositionStyle)
            },
            [
              vue.createElementVNode("view", { class: "uni-popper__arrow" }),
              $data.hasTime ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "popup-x-header uni-date-changed"
              }, [
                vue.createElementVNode("view", { class: "popup-x-header--datetime" }, [
                  vue.withDirectives(vue.createElementVNode("input", {
                    class: "uni-date__input uni-date-range__input",
                    type: "text",
                    "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.tempRange.startDate = $event),
                    placeholder: $options.startDateText
                  }, null, 8, ["placeholder"]), [
                    [vue.vModelText, $data.tempRange.startDate]
                  ]),
                  vue.createVNode(_component_time_picker, {
                    type: "time",
                    modelValue: $data.tempRange.startTime,
                    "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $data.tempRange.startTime = $event),
                    start: $options.timepickerStartTime,
                    border: false,
                    disabled: !$data.tempRange.startDate,
                    hideSecond: $props.hideSecond
                  }, {
                    default: vue.withCtx(() => [
                      vue.withDirectives(vue.createElementVNode("input", {
                        class: "uni-date__input uni-date-range__input",
                        type: "text",
                        "onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => $data.tempRange.startTime = $event),
                        placeholder: $options.startTimeText,
                        disabled: !$data.tempRange.startDate
                      }, null, 8, ["placeholder", "disabled"]), [
                        [vue.vModelText, $data.tempRange.startTime]
                      ])
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["modelValue", "start", "disabled", "hideSecond"])
                ]),
                vue.createVNode(_component_uni_icons, {
                  type: "arrowthinright",
                  color: "#999",
                  style: { "line-height": "40px" }
                }),
                vue.createElementVNode("view", { class: "popup-x-header--datetime" }, [
                  vue.withDirectives(vue.createElementVNode("input", {
                    class: "uni-date__input uni-date-range__input",
                    type: "text",
                    "onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => $data.tempRange.endDate = $event),
                    placeholder: $options.endDateText
                  }, null, 8, ["placeholder"]), [
                    [vue.vModelText, $data.tempRange.endDate]
                  ]),
                  vue.createVNode(_component_time_picker, {
                    type: "time",
                    modelValue: $data.tempRange.endTime,
                    "onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => $data.tempRange.endTime = $event),
                    end: $options.timepickerEndTime,
                    border: false,
                    disabled: !$data.tempRange.endDate,
                    hideSecond: $props.hideSecond
                  }, {
                    default: vue.withCtx(() => [
                      vue.withDirectives(vue.createElementVNode("input", {
                        class: "uni-date__input uni-date-range__input",
                        type: "text",
                        "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $data.tempRange.endTime = $event),
                        placeholder: $options.endTimeText,
                        disabled: !$data.tempRange.endDate
                      }, null, 8, ["placeholder", "disabled"]), [
                        [vue.vModelText, $data.tempRange.endTime]
                      ])
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["modelValue", "end", "disabled", "hideSecond"])
                ])
              ])) : vue.createCommentVNode("v-if", true),
              vue.createElementVNode("view", { class: "popup-x-body" }, [
                vue.createVNode(_component_Calendar, {
                  ref: "left",
                  showMonth: false,
                  "start-date": $data.calendarRange.startDate,
                  "end-date": $data.calendarRange.endDate,
                  range: true,
                  pleStatus: $data.endMultipleStatus,
                  onChange: $options.leftChange,
                  onFirstEnterCale: $options.updateRightCale,
                  style: { "padding": "0 8px" }
                }, null, 8, ["start-date", "end-date", "pleStatus", "onChange", "onFirstEnterCale"]),
                vue.createVNode(_component_Calendar, {
                  ref: "right",
                  showMonth: false,
                  "start-date": $data.calendarRange.startDate,
                  "end-date": $data.calendarRange.endDate,
                  range: true,
                  onChange: $options.rightChange,
                  pleStatus: $data.startMultipleStatus,
                  onFirstEnterCale: $options.updateLeftCale,
                  style: { "padding": "0 8px", "border-left": "1px solid #F1F1F1" }
                }, null, 8, ["start-date", "end-date", "onChange", "pleStatus", "onFirstEnterCale"])
              ]),
              $data.hasTime ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "popup-x-footer"
              }, [
                vue.createElementVNode(
                  "text",
                  {
                    onClick: _cache[13] || (_cache[13] = (...args) => $options.clear && $options.clear(...args))
                  },
                  vue.toDisplayString($options.clearText),
                  1
                  /* TEXT */
                ),
                vue.createElementVNode(
                  "text",
                  {
                    class: "confirm-text",
                    onClick: _cache[14] || (_cache[14] = (...args) => $options.confirmRangeChange && $options.confirmRangeChange(...args))
                  },
                  vue.toDisplayString($options.okText),
                  1
                  /* TEXT */
                )
              ])) : vue.createCommentVNode("v-if", true)
            ],
            4
            /* STYLE */
          ))
        ],
        512
        /* NEED_PATCH */
      )), [
        [vue.vShow, $data.pickerVisible]
      ]) : vue.createCommentVNode("v-if", true),
      $data.isPhone ? (vue.openBlock(), vue.createBlock(_component_Calendar, {
        key: 1,
        ref: "mobile",
        clearDate: false,
        date: $data.calendarDate,
        defTime: $options.mobileCalendarTime,
        "start-date": $data.calendarRange.startDate,
        "end-date": $data.calendarRange.endDate,
        selectableTimes: $options.mobSelectableTime,
        startPlaceholder: $props.startPlaceholder,
        endPlaceholder: $props.endPlaceholder,
        "default-value": $props.defaultValue,
        pleStatus: $data.endMultipleStatus,
        showMonth: false,
        range: $data.isRange,
        hasTime: $data.hasTime,
        insert: false,
        hideSecond: $props.hideSecond,
        onConfirm: $options.mobileChange,
        onMaskClose: $options.close,
        onChange: $options.calendarClick
      }, null, 8, ["date", "defTime", "start-date", "end-date", "selectableTimes", "startPlaceholder", "endPlaceholder", "default-value", "pleStatus", "range", "hasTime", "hideSecond", "onConfirm", "onMaskClose", "onChange"])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$4], ["__scopeId", "data-v-9802168a"], ["__file", "D:/mygitee/项目大全/pickUpCode/取件码/uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.vue"]]);
  const _sfc_main$4 = {
    data() {
      return {
        isEdit: false,
        editDate: "",
        editIndex: -1,
        formData: {
          platform: "淘宝",
          name: "",
          price: "",
          time: "",
          checked: false,
          date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
        },
        platforms: ["淘宝", "京东", "拼多多", "抖音", "唯品会", "小红书", "1688", "其他"],
        taobao,
        jingdong,
        pinduoduo,
        douyin,
        weipinhui,
        xiaohongshu,
        alibaba,
        other
      };
    },
    onLoad(options) {
      if (options.type === "edit") {
        this.isEdit = true;
        const editData = uni.getStorageSync("editData");
        if (editData) {
          const data = JSON.parse(editData);
          this.formData = { ...data.item };
          this.editDate = data.date;
          this.editIndex = data.index;
          uni.removeStorageSync("editData");
        }
      } else {
        this.formData.time = this.getCurrentTime();
      }
    },
    methods: {
      vibrateShort() {
        uni.vibrateShort({
          success: function() {
            formatAppLog("log", "at pages/packages/edit.vue:130", "振动成功");
          }
        });
      },
      selectPlatform(platform) {
        this.formData.platform = platform;
        this.vibrateShort();
      },
      getCurrentTime() {
        const now = /* @__PURE__ */ new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        return `${hours}:${minutes}`;
      },
      getPlatformIcon(platform) {
        const icons = {
          淘宝: this.taobao,
          京东: this.jingdong,
          拼多多: this.pinduoduo,
          抖音: this.douyin,
          唯品会: this.weipinhui,
          小红书: this.xiaohongshu,
          "1688": this.alibaba,
          其他: this.other
        };
        return icons[platform] || this.other;
      },
      formatDate(dateStr) {
        const [year, month, day] = dateStr.split("-");
        return `${year}年${parseInt(month)}月${parseInt(day)}日`;
      },
      handleDateChange(value) {
        this.formData.date = value;
        this.vibrateShort();
      },
      submitForm() {
        if (!this.formData.name) {
          uni.showToast({
            title: "请输入商品名称",
            icon: "none"
          });
          return;
        }
        const pages = getCurrentPages();
        const prevPage = pages[pages.length - 2];
        if (prevPage) {
          prevPage.$vm.handlePackageSubmit({
            data: {
              platform: this.formData.platform,
              name: this.formData.name,
              price: this.formData.price,
              time: this.formData.time,
              checked: this.formData.checked,
              date: this.formData.date
            },
            isEdit: this.isEdit,
            editDate: this.editDate,
            editIndex: this.editIndex
          });
        }
        setTimeout(() => {
          uni.navigateBack({
            delta: 1,
            animationType: "slide-out-right",
            animationDuration: 300,
            success: () => {
              formatAppLog("log", "at pages/packages/edit.vue:201", "返回成功");
            },
            fail: (err) => {
              formatAppLog("error", "at pages/packages/edit.vue:204", "返回失败:", err);
              uni.redirectTo({
                url: "/pages/packages/index",
                animationType: "slide-out-right",
                animationDuration: 300
              });
            }
          });
        }, 50);
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    const _component_uni_datetime_picker = resolveEasycom(vue.resolveDynamicComponent("uni-datetime-picker"), __easycom_1);
    return vue.openBlock(), vue.createElementBlock("view", { class: "page-wrapper" }, [
      vue.createElementVNode("view", { class: "page-bg" }),
      vue.createElementVNode("view", { class: "container" }, [
        vue.createElementVNode("view", { class: "form-content" }, [
          vue.createCommentVNode(" 平台选择 "),
          vue.createElementVNode("view", { class: "platform-select" }, [
            vue.createElementVNode("text", { class: "label" }, "选择平台"),
            vue.createElementVNode("view", { class: "platform-cards" }, [
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList($data.platforms, (platform) => {
                  return vue.openBlock(), vue.createElementBlock("view", {
                    key: platform,
                    class: vue.normalizeClass(["platform-card", { active: $data.formData.platform === platform }]),
                    onClick: ($event) => $options.selectPlatform(platform)
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
          vue.createCommentVNode(" 表单输入 "),
          vue.createElementVNode("view", { class: "form-item" }, [
            vue.createElementVNode("text", { class: "label" }, "商品名称"),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                class: "input",
                "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.formData.name = $event),
                placeholder: "请输入商品名称"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.formData.name]
            ])
          ]),
          vue.createElementVNode("view", { class: "form-item" }, [
            vue.createElementVNode("text", { class: "label" }, "价格（选填）"),
            vue.withDirectives(vue.createElementVNode(
              "input",
              {
                class: "input",
                "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.formData.price = $event),
                type: "digit",
                placeholder: "请输入价格"
              },
              null,
              512
              /* NEED_PATCH */
            ), [
              [vue.vModelText, $data.formData.price]
            ])
          ]),
          vue.createCommentVNode(" 添加日期选择 "),
          vue.createElementVNode("view", { class: "form-item" }, [
            vue.createElementVNode("text", { class: "label" }, "日期"),
            vue.createVNode(_component_uni_datetime_picker, {
              type: "date",
              modelValue: $data.formData.date,
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => $data.formData.date = $event),
              border: false,
              onChange: $options.handleDateChange
            }, {
              default: vue.withCtx(() => [
                vue.createElementVNode("view", { class: "date-picker" }, [
                  vue.createElementVNode(
                    "text",
                    { class: "date-text" },
                    vue.toDisplayString($options.formatDate($data.formData.date)),
                    1
                    /* TEXT */
                  ),
                  vue.createVNode(_component_uni_icons, {
                    type: "calendar",
                    size: "16",
                    color: "#666"
                  })
                ])
              ]),
              _: 1
              /* STABLE */
            }, 8, ["modelValue", "onChange"])
          ])
        ]),
        vue.createCommentVNode(" 底部按钮 "),
        vue.createElementVNode("view", { class: "footer" }, [
          vue.createElementVNode("button", {
            class: "submit-btn",
            onClick: _cache[3] || (_cache[3] = (...args) => $options.submitForm && $options.submitForm(...args))
          }, "确定")
        ])
      ])
    ]);
  }
  const PagesPackagesEdit = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$3], ["__file", "D:/mygitee/项目大全/pickUpCode/取件码/pages/packages/edit.vue"]]);
  const _imports_0$1 = "/static/images/avatar.png";
  const _sfc_main$3 = {
    data() {
      return {
        version: "1.0.0"
      };
    },
    onLoad(options) {
      this.getAppVersion();
    },
    methods: {
      navigateTo(url) {
        uni.navigateTo({
          url
        });
      },
      handleScan() {
        uni.scanCode({
          success: (res) => {
            formatAppLog("log", "at pages/my/index.vue:77", "扫码结果：", res);
          }
        });
      },
      getAppVersion() {
        try {
          this.version = plus.runtime.version;
        } catch (e) {
          formatAppLog("error", "at pages/my/index.vue:88", "获取版本号失败:", e);
        }
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", { class: "my-container" }, [
      vue.createCommentVNode(" 顶部区域 "),
      vue.createElementVNode("view", { class: "header" }, [
        vue.createElementVNode("view", { class: "user-info" }, [
          vue.createElementVNode("image", {
            class: "avatar",
            src: _imports_0$1,
            mode: "aspectFill"
          }),
          vue.createElementVNode("text", { class: "nickname" }, "取件码")
        ]),
        vue.createElementVNode("view", {
          class: "scan-btn",
          onClick: _cache[0] || (_cache[0] = (...args) => $options.handleScan && $options.handleScan(...args))
        }, [
          vue.createVNode(_component_uni_icons, {
            type: "scan",
            size: "24",
            color: "#fff"
          })
        ])
      ]),
      vue.createCommentVNode(" 菜单列表 "),
      vue.createElementVNode("view", { class: "content-wrapper" }, [
        vue.createElementVNode("view", { class: "menu-list" }, [
          vue.createElementVNode("view", {
            class: "menu-item",
            onClick: _cache[1] || (_cache[1] = ($event) => $options.navigateTo("/pages/my/match-rules"))
          }, [
            vue.createElementVNode("view", { class: "menu-left" }, [
              vue.createVNode(_component_uni_icons, {
                type: "settings",
                size: "20",
                color: "#1673ff"
              }),
              vue.createElementVNode("text", { class: "menu-text" }, "匹配设置")
            ]),
            vue.createVNode(_component_uni_icons, {
              type: "right",
              size: "16",
              color: "#999"
            })
          ]),
          vue.createElementVNode("view", {
            class: "menu-item",
            onClick: _cache[2] || (_cache[2] = ($event) => $options.navigateTo("/pages/my/data-export"))
          }, [
            vue.createElementVNode("view", { class: "menu-left" }, [
              vue.createVNode(_component_uni_icons, {
                type: "download",
                size: "20",
                color: "#1673ff"
              }),
              vue.createElementVNode("text", { class: "menu-text" }, "数据导出")
            ]),
            vue.createVNode(_component_uni_icons, {
              type: "right",
              size: "16",
              color: "#999"
            })
          ]),
          vue.createElementVNode("view", {
            class: "menu-item",
            onClick: _cache[3] || (_cache[3] = ($event) => $options.navigateTo("/pages/my/faq"))
          }, [
            vue.createElementVNode("view", { class: "menu-left" }, [
              vue.createVNode(_component_uni_icons, {
                type: "help",
                size: "20",
                color: "#1673ff"
              }),
              vue.createElementVNode("text", { class: "menu-text" }, "常见问题")
            ]),
            vue.createVNode(_component_uni_icons, {
              type: "right",
              size: "16",
              color: "#999"
            })
          ]),
          vue.createElementVNode("view", {
            class: "menu-item",
            onClick: _cache[4] || (_cache[4] = ($event) => $options.navigateTo("/pages/my/contact"))
          }, [
            vue.createElementVNode("view", { class: "menu-left" }, [
              vue.createVNode(_component_uni_icons, {
                type: "chat",
                size: "20",
                color: "#1673ff"
              }),
              vue.createElementVNode("text", { class: "menu-text" }, "联系作者")
            ]),
            vue.createVNode(_component_uni_icons, {
              type: "right",
              size: "16",
              color: "#999"
            })
          ])
        ]),
        vue.createElementVNode("view", { class: "version" }, [
          vue.createElementVNode(
            "text",
            null,
            "v" + vue.toDisplayString($data.version),
            1
            /* TEXT */
          )
        ])
      ])
    ]);
  }
  const PagesMyIndex = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "D:/mygitee/项目大全/pickUpCode/取件码/pages/my/index.vue"]]);
  const _sfc_main$2 = {
    data() {
      return {
        mode: "add",
        // add 或 edit
        ruleId: "",
        // 编辑时的规则ID
        ruleName: "",
        // 规则名称
        smsContent: "",
        rules: {
          code: {
            start: "",
            end: ""
          },
          express: {
            start: "",
            end: ""
          },
          address: {
            start: "",
            end: ""
          }
        },
        matchResults: {
          code: "",
          express: "",
          address: ""
        }
      };
    },
    onLoad(options) {
      this.mode = options.mode || "add";
      if (this.mode === "edit" && options.id) {
        this.ruleId = options.id;
        this.loadRule(options.id);
      }
      this.loadRules();
    },
    methods: {
      // 加载单个规则
      loadRule(id) {
        const rulesList = JSON.parse(
          uni.getStorageSync("matchRulesList") || "[]"
        );
        const rule = rulesList.find((item) => item.id === id);
        if (rule) {
          this.ruleName = rule.name;
          this.rules = rule.rules;
          this.smsContent = rule.smsContent || "";
          this.$nextTick(() => {
            this.updateMatchResults();
          });
        }
      },
      // 处理短信输入
      handleSmsInput() {
        this.updateMatchResults();
      },
      // 处理规则输入变化
      handleRuleChange() {
        this.updateMatchResults();
      },
      // 更新匹配结果
      updateMatchResults() {
        if (!this.smsContent) {
          this.matchResults = { code: "", express: "", address: "" };
          return;
        }
        Object.keys(this.rules).forEach((key) => {
          const rule = this.rules[key];
          if (rule.start && rule.end) {
            const startIndex = this.smsContent.indexOf(rule.start);
            const endIndex = this.smsContent.indexOf(
              rule.end,
              startIndex + rule.start.length
            );
            if (startIndex !== -1 && endIndex !== -1) {
              this.matchResults[key] = this.smsContent.substring(startIndex + rule.start.length, endIndex).trim();
            } else {
              this.matchResults[key] = "";
            }
          } else {
            this.matchResults[key] = "";
          }
        });
      },
      // 保存设置
      handleSave() {
        if (!this.ruleName.trim()) {
          uni.showToast({
            title: "请输入规则名称",
            icon: "none"
          });
          return;
        }
        const enabledRules = Object.entries(this.rules).filter(
          ([_, rule]) => rule.start && rule.end
        );
        if (enabledRules.length === 0) {
          uni.showToast({
            title: "请至少设置一个有效的匹配规则",
            icon: "none"
          });
          return;
        }
        const hasMatchError = enabledRules.some(([key, _]) => !this.matchResults[key]);
        if (hasMatchError) {
          uni.showToast({
            title: "存在匹配失败的规则，请检查",
            icon: "none"
          });
          return;
        }
        const rulesList = JSON.parse(
          uni.getStorageSync("matchRulesList") || "[]"
        );
        const ruleData = {
          id: this.mode === "edit" ? this.ruleId : Date.now().toString(),
          name: this.ruleName,
          rules: this.rules,
          smsContent: this.smsContent,
          enabled: true,
          createTime: (/* @__PURE__ */ new Date()).toLocaleString()
        };
        if (this.mode === "edit") {
          const index = rulesList.findIndex((item) => item.id === this.ruleId);
          if (index !== -1) {
            rulesList[index] = ruleData;
          }
        } else {
          rulesList.push(ruleData);
        }
        uni.setStorageSync("matchRulesList", JSON.stringify(rulesList));
        uni.showToast({
          title: "保存成功",
          icon: "success",
          complete: () => {
            setTimeout(() => {
              uni.navigateBack();
            }, 1e3);
          }
        });
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "match-settings" }, [
      vue.createCommentVNode(" 规则名称输入区 "),
      vue.createElementVNode("view", { class: "input-section" }, [
        vue.createElementVNode("text", { class: "section-title" }, "规则名称"),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            class: "rule-name-input",
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.ruleName = $event),
            placeholder: "请输入规则名称",
            type: "text"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $data.ruleName]
        ])
      ]),
      vue.createCommentVNode(" 短信内容输入区 "),
      vue.createElementVNode("view", { class: "input-section" }, [
        vue.createElementVNode("text", { class: "section-title" }, "短信内容"),
        vue.createElementVNode("text", { class: "section-desc" }, "请输入完整的短信内容，然后设置匹配规则"),
        vue.withDirectives(vue.createElementVNode(
          "textarea",
          {
            class: "sms-input",
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.smsContent = $event),
            placeholder: "请输入完整的短信内容",
            maxlength: -1,
            onInput: _cache[2] || (_cache[2] = (...args) => $options.handleSmsInput && $options.handleSmsInput(...args))
          },
          null,
          544
          /* NEED_HYDRATION, NEED_PATCH */
        ), [
          [vue.vModelText, $data.smsContent]
        ])
      ]),
      vue.createCommentVNode(" 匹配规则设置区 "),
      vue.createElementVNode("view", { class: "rules-section" }, [
        vue.createElementVNode("view", { class: "rules-desc" }, [
          vue.createElementVNode("text", null, "设置规则说明："),
          vue.createElementVNode("text", null, "1. 输入要匹配内容的前后文字"),
          vue.createElementVNode("text", null, "2. 系统将自动提取这两段文字之间的内容"),
          vue.createElementVNode("text", null, "3. 例如：取件码123456领取，可以输入 取件码 和 领取")
        ]),
        vue.createCommentVNode(" 取件码设置 "),
        vue.createElementVNode("view", { class: "rule-item" }, [
          vue.createElementVNode("view", { class: "rule-header" }, [
            vue.createElementVNode("text", { class: "rule-title" }, "取件码")
          ]),
          vue.createElementVNode("view", { class: "rule-content" }, [
            vue.createElementVNode("view", { class: "rule-inputs" }, [
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  type: "text",
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => $data.rules.code.start = $event),
                  placeholder: "起始文字",
                  onInput: _cache[4] || (_cache[4] = (...args) => $options.handleRuleChange && $options.handleRuleChange(...args))
                },
                null,
                544
                /* NEED_HYDRATION, NEED_PATCH */
              ), [
                [vue.vModelText, $data.rules.code.start]
              ]),
              vue.createElementVNode("text", null, "至"),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  type: "text",
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => $data.rules.code.end = $event),
                  placeholder: "结束文字",
                  onInput: _cache[6] || (_cache[6] = (...args) => $options.handleRuleChange && $options.handleRuleChange(...args))
                },
                null,
                544
                /* NEED_HYDRATION, NEED_PATCH */
              ), [
                [vue.vModelText, $data.rules.code.end]
              ])
            ]),
            $data.rules.code.start && $data.rules.code.end ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "match-result"
            }, [
              $data.matchResults.code ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 0 },
                [
                  vue.createTextVNode(" 匹配结果："),
                  vue.createElementVNode(
                    "text",
                    { class: "result-text success" },
                    vue.toDisplayString($data.matchResults.code),
                    1
                    /* TEXT */
                  )
                ],
                64
                /* STABLE_FRAGMENT */
              )) : (vue.openBlock(), vue.createElementBlock("text", {
                key: 1,
                class: "result-text error"
              }, "匹配失败，请检查规则设置"))
            ])) : vue.createCommentVNode("v-if", true)
          ])
        ]),
        vue.createCommentVNode(" 快递名称设置 "),
        vue.createElementVNode("view", { class: "rule-item" }, [
          vue.createElementVNode("view", { class: "rule-header" }, [
            vue.createElementVNode("text", { class: "rule-title" }, "快递名称")
          ]),
          vue.createElementVNode("view", { class: "rule-content" }, [
            vue.createElementVNode("view", { class: "rule-inputs" }, [
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  type: "text",
                  "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => $data.rules.express.start = $event),
                  placeholder: "起始文字",
                  onInput: _cache[8] || (_cache[8] = (...args) => $options.handleRuleChange && $options.handleRuleChange(...args))
                },
                null,
                544
                /* NEED_HYDRATION, NEED_PATCH */
              ), [
                [vue.vModelText, $data.rules.express.start]
              ]),
              vue.createElementVNode("text", null, "至"),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  type: "text",
                  "onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => $data.rules.express.end = $event),
                  placeholder: "结束文字",
                  onInput: _cache[10] || (_cache[10] = (...args) => $options.handleRuleChange && $options.handleRuleChange(...args))
                },
                null,
                544
                /* NEED_HYDRATION, NEED_PATCH */
              ), [
                [vue.vModelText, $data.rules.express.end]
              ])
            ]),
            $data.rules.express.start && $data.rules.express.end ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "match-result"
            }, [
              $data.matchResults.express ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 0 },
                [
                  vue.createTextVNode(" 匹配结果："),
                  vue.createElementVNode(
                    "text",
                    { class: "result-text success" },
                    vue.toDisplayString($data.matchResults.express),
                    1
                    /* TEXT */
                  )
                ],
                64
                /* STABLE_FRAGMENT */
              )) : (vue.openBlock(), vue.createElementBlock("text", {
                key: 1,
                class: "result-text error"
              }, "匹配失败，请检查规则设置"))
            ])) : vue.createCommentVNode("v-if", true)
          ])
        ]),
        vue.createCommentVNode(" 地址设置 "),
        vue.createElementVNode("view", { class: "rule-item" }, [
          vue.createElementVNode("view", { class: "rule-header" }, [
            vue.createElementVNode("text", { class: "rule-title" }, "地址")
          ]),
          vue.createElementVNode("view", { class: "rule-content" }, [
            vue.createElementVNode("view", { class: "rule-inputs" }, [
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  type: "text",
                  "onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => $data.rules.address.start = $event),
                  placeholder: "起始文字",
                  onInput: _cache[12] || (_cache[12] = (...args) => $options.handleRuleChange && $options.handleRuleChange(...args))
                },
                null,
                544
                /* NEED_HYDRATION, NEED_PATCH */
              ), [
                [vue.vModelText, $data.rules.address.start]
              ]),
              vue.createElementVNode("text", null, "至"),
              vue.withDirectives(vue.createElementVNode(
                "input",
                {
                  type: "text",
                  "onUpdate:modelValue": _cache[13] || (_cache[13] = ($event) => $data.rules.address.end = $event),
                  placeholder: "结束文字",
                  onInput: _cache[14] || (_cache[14] = (...args) => $options.handleRuleChange && $options.handleRuleChange(...args))
                },
                null,
                544
                /* NEED_HYDRATION, NEED_PATCH */
              ), [
                [vue.vModelText, $data.rules.address.end]
              ])
            ]),
            $data.rules.address.start && $data.rules.address.end ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "match-result"
            }, [
              $data.matchResults.address ? (vue.openBlock(), vue.createElementBlock(
                vue.Fragment,
                { key: 0 },
                [
                  vue.createTextVNode(" 匹配结果："),
                  vue.createElementVNode(
                    "text",
                    { class: "result-text success" },
                    vue.toDisplayString($data.matchResults.address),
                    1
                    /* TEXT */
                  )
                ],
                64
                /* STABLE_FRAGMENT */
              )) : (vue.openBlock(), vue.createElementBlock("text", {
                key: 1,
                class: "result-text error"
              }, "匹配失败，请检查规则设置"))
            ])) : vue.createCommentVNode("v-if", true)
          ])
        ])
      ]),
      vue.createCommentVNode(" 保存按钮 "),
      vue.createElementVNode("view", { class: "btn-section" }, [
        vue.createElementVNode("button", {
          class: "save-btn",
          onClick: _cache[15] || (_cache[15] = (...args) => $options.handleSave && $options.handleSave(...args))
        }, "保存设置")
      ])
    ]);
  }
  const PagesMyMatchSettings = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "D:/mygitee/项目大全/pickUpCode/取件码/pages/my/match-settings.vue"]]);
  const _imports_0 = "/static/images/empty.png";
  const _sfc_main$1 = {
    data() {
      return {
        rulesList: []
      };
    },
    onShow() {
      this.loadRulesList();
    },
    methods: {
      // 格式化日期
      formatDate(date) {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const day = String(d.getDate()).padStart(2, "0");
        return `${year}年${month}月${day}日`;
      },
      // 处理规则启用状态变化
      handleStatusChange(index, event) {
        const enabled = event.detail.value;
        this.rulesList[index].enabled = enabled;
        uni.setStorageSync("matchRulesList", JSON.stringify(this.rulesList));
        uni.showToast({
          title: enabled ? "规则已启用" : "规则已禁用",
          icon: "none"
        });
      },
      // 加载规则列表
      loadRulesList() {
        const savedRules = uni.getStorageSync("matchRulesList") || "[]";
        const rules = JSON.parse(savedRules);
        this.rulesList = rules.map((rule) => ({
          ...rule,
          enabled: rule.enabled !== void 0 ? rule.enabled : true,
          createTime: this.formatDate(rule.createTime)
        }));
      },
      // 添加规则
      handleAdd() {
        uni.navigateTo({
          url: "/pages/my/match-settings?mode=add"
        });
      },
      // 编辑规则
      handleEdit(rule) {
        if (!rule.enabled) {
          uni.showToast({
            title: "请先启用该规则",
            icon: "none"
          });
          return;
        }
        uni.navigateTo({
          url: `/pages/my/match-settings?mode=edit&id=${rule.id}`
        });
      },
      // 删除规则
      handleDelete(index) {
        uni.showModal({
          title: "提示",
          content: "确定要删除这条规则吗？",
          success: (res) => {
            if (res.confirm) {
              this.rulesList.splice(index, 1);
              uni.setStorageSync("matchRulesList", JSON.stringify(this.rulesList));
              uni.showToast({
                title: "删除成功",
                icon: "success"
              });
            }
          }
        });
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_uni_icons = resolveEasycom(vue.resolveDynamicComponent("uni-icons"), __easycom_0);
    return vue.openBlock(), vue.createElementBlock("view", { class: "match-rules" }, [
      vue.createCommentVNode(" 规则列表 "),
      $data.rulesList.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", {
        key: 0,
        class: "rules-list"
      }, [
        (vue.openBlock(true), vue.createElementBlock(
          vue.Fragment,
          null,
          vue.renderList($data.rulesList, (rule, index) => {
            return vue.openBlock(), vue.createElementBlock("view", {
              class: "rule-card",
              key: index
            }, [
              vue.createElementVNode("view", { class: "rule-info" }, [
                vue.createElementVNode("view", { class: "rule-header" }, [
                  vue.createElementVNode(
                    "view",
                    { class: "rule-name" },
                    vue.toDisplayString(rule.name),
                    1
                    /* TEXT */
                  ),
                  vue.createElementVNode("switch", {
                    checked: rule.enabled,
                    onChange: (e) => $options.handleStatusChange(index, e),
                    color: "#0052d9"
                  }, null, 40, ["checked", "onChange"])
                ]),
                vue.createElementVNode(
                  "view",
                  { class: "rule-time" },
                  "添加时间 " + vue.toDisplayString(rule.createTime),
                  1
                  /* TEXT */
                )
              ]),
              vue.createElementVNode("view", { class: "rule-actions" }, [
                vue.createElementVNode("view", {
                  class: "action-btn edit",
                  onClick: ($event) => $options.handleEdit(rule)
                }, [
                  vue.createVNode(_component_uni_icons, {
                    type: "compose",
                    size: "18",
                    color: "#0052d9"
                  }),
                  vue.createElementVNode("text", null, "编辑")
                ], 8, ["onClick"]),
                vue.createElementVNode("view", {
                  class: "action-btn delete",
                  onClick: ($event) => $options.handleDelete(index)
                }, [
                  vue.createVNode(_component_uni_icons, {
                    type: "trash",
                    size: "18",
                    color: "#ff4d4f"
                  }),
                  vue.createElementVNode("text", null, "删除")
                ], 8, ["onClick"])
              ])
            ]);
          }),
          128
          /* KEYED_FRAGMENT */
        ))
      ])) : (vue.openBlock(), vue.createElementBlock(
        vue.Fragment,
        { key: 1 },
        [
          vue.createCommentVNode(" 空状态 "),
          vue.createElementVNode("view", { class: "empty-state" }, [
            vue.createElementVNode("image", {
              src: _imports_0,
              mode: "aspectFit"
            }),
            vue.createElementVNode("text", null, "暂无匹配规则")
          ])
        ],
        2112
        /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
      )),
      vue.createCommentVNode(" 添加按钮 "),
      vue.createElementVNode("view", {
        class: "add-btn",
        onClick: _cache[0] || (_cache[0] = (...args) => $options.handleAdd && $options.handleAdd(...args))
      }, [
        vue.createVNode(_component_uni_icons, {
          type: "plusempty",
          size: "24",
          color: "#fff"
        })
      ])
    ]);
  }
  const PagesMyMatchRules = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "D:/mygitee/项目大全/pickUpCode/取件码/pages/my/match-rules.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/packages/index", PagesPackagesIndex);
  __definePage("pages/packages/edit", PagesPackagesEdit);
  __definePage("pages/my/index", PagesMyIndex);
  __definePage("pages/my/match-settings", PagesMyMatchSettings);
  __definePage("pages/my/match-rules", PagesMyMatchRules);
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
