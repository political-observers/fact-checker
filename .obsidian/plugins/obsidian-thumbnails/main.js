/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// main.ts
__export(exports, {
  default: () => ThumbyPlugin
});
var import_obsidian2 = __toModule(require("obsidian"));

// settings.ts
var import_obsidian = __toModule(require("obsidian"));
var ThumbySettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Thumbnails Settings" });
    console.log(this.plugin.settings);
    new import_obsidian.Setting(containerEl).setName("Save Thumbnail Info").setDesc("Save thumbnail information inside your note, so they work offline").addToggle((toggle) => toggle.setValue(this.plugin.settings.storeInfo).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.storeInfo = value;
      yield this.plugin.saveSettings();
      this.display();
    })));
    if (this.plugin.settings.storeInfo) {
      new import_obsidian.Setting(containerEl).setName("Save Images").setDesc("Save thumbnail images locally in vault").addToggle((toggle) => toggle.setValue(this.plugin.settings.saveImages).onChange((value) => __async(this, null, function* () {
        this.plugin.settings.saveImages = value;
        yield this.plugin.saveSettings();
        this.display();
      })));
      if (this.plugin.settings.saveImages) {
        new import_obsidian.Setting(containerEl).setName("Image Location").setDesc("Where thumbnail images should be saved").addDropdown((dropdown) => dropdown.addOption("defaultAttachment", "Default attachment location").addOption("specifiedFolder", "In the folder specified below").setValue(this.plugin.settings.imageLocation).onChange((value) => __async(this, null, function* () {
          this.plugin.settings.imageLocation = value;
          this.display();
          yield this.plugin.saveSettings();
        })));
        if (this.plugin.settings.imageLocation === "defaultAttachment") {
          const attachmentLocation = this.app.vault.getConfig("attachmentFolderPath");
          new import_obsidian.Setting(containerEl).setName("Default attachment location").setDesc("Options > Files & Links > Default location for new attachments").addText((text) => text.setValue(attachmentLocation).setDisabled(true)).setClass("default-attachment-info");
        } else if (this.plugin.settings.imageLocation === "specifiedFolder") {
          new import_obsidian.Setting(containerEl).setName("Image Folder").setDesc("The folder where thumbnail images should be saved").addText((text) => text.setPlaceholder("ex: Files/Thumbnails").setValue(this.plugin.settings.imageFolder).onChange((value) => __async(this, null, function* () {
            this.plugin.settings.imageFolder = value;
            yield this.plugin.saveSettings();
          })));
        }
      }
    }
    new import_obsidian.Setting(containerEl).setName("Responsive Card-Style Thumbnails").setDesc("Switch to card-style thumbnails for narrow screens").addToggle((toggle) => toggle.setValue(this.plugin.settings.responsiveCardStyle).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.responsiveCardStyle = value;
      yield this.plugin.saveSettings();
      this.display();
    })));
    new import_obsidian.Setting(containerEl).setName("YouTube API Key (optional)").setDesc("An API Key for the YouTube Data API").addExtraButton((btn) => btn.setIcon("info").setTooltip("A few videos have been discovered that can't be found the normal way. If you provide an API key for the YouTube Data API, this plugin will use the API as a backup.", { placement: "top" }).setDisabled(true)).addText((text) => text.setValue(this.plugin.settings.youtubeApiKey).onChange((value) => __async(this, null, function* () {
      this.plugin.settings.youtubeApiKey = value;
      yield this.plugin.saveSettings();
    })));
  }
};

// main.ts
var DEFAULT_SETTINGS = {
  storeInfo: false,
  saveImages: false,
  imageLocation: "defaultAttachment",
  imageFolder: "",
  responsiveCardStyle: true,
  youtubeApiKey: ""
};
var URL_TYPES = {
  youtube: [
    { match: "https://www.youtube.com/watch?v=", idPattern: /v=([-\w\d]+)/ },
    { match: "https://youtu.be/", idPattern: /youtu.be\/([-\w\d]+)/ },
    { match: "youtube.com/shorts/", idPattern: /shorts\/([-\w\d]+)/ },
    { match: "youtube.com/live/", idPattern: /live\/(\w+)/ }
  ],
  vimeo: [
    { match: "https://vimeo.com/", idPattern: /vimeo.com\/([\w\d]+)/ }
  ]
};
var ThumbyPlugin = class extends import_obsidian2.Plugin {
  loadSettings() {
    return __async(this, null, function* () {
      this.settings = Object.assign({}, DEFAULT_SETTINGS, yield this.loadData());
    });
  }
  saveSettings() {
    return __async(this, null, function* () {
      yield this.saveData(this.settings);
      const editors = document.querySelectorAll(".cm-editor");
      for (const key in editors) {
        if (Object.prototype.hasOwnProperty.call(editors, key)) {
          const editor = editors[key];
          this.responsiveCardCheck(editor);
        }
      }
    });
  }
  responsiveCardCheck(editor) {
    const vidBlocks = editor.querySelectorAll(".block-language-vid");
    for (const key in vidBlocks) {
      if (Object.prototype.hasOwnProperty.call(vidBlocks, key)) {
        const block = vidBlocks[key];
        if (this.settings.responsiveCardStyle && block && block.offsetWidth < 370) {
          block.addClass("thumbnail-card-style");
        } else {
          block.removeClass("thumbnail-card-style");
        }
      }
    }
  }
  onload() {
    return __async(this, null, function* () {
      yield this.loadSettings();
      this.addSettingTab(new ThumbySettingTab(this.app, this));
      this.editorObserver = new ResizeObserver((entries) => {
        for (const editor of entries) {
          this.responsiveCardCheck(editor.target);
        }
      });
      const editors = document.querySelectorAll(".cm-editor");
      for (const key in editors) {
        if (Object.prototype.hasOwnProperty.call(editors, key)) {
          const editor = editors[key];
          this.editorObserver.observe(editor);
        }
      }
      this.registerMarkdownCodeBlockProcessor("vid", (source, el, ctx) => __async(this, null, function* () {
        var _a, _b, _c;
        this.createDummyBlock(el);
        const sourceLines = source.trim().split("\n");
        const url = sourceLines[0];
        let info;
        if (this.settings.storeInfo) {
          info = this.parseStoredInfo(source);
        }
        if (!this.settings.storeInfo || !info.infoStored) {
          info = yield this.getVideoInfo(url);
        }
        if (info.networkError && !info.infoStored) {
          this.removeDummyBlock(el);
          const url2 = source.trim().split("\n")[0];
          el.createEl("a", { text: url2, href: url2 });
          return;
        }
        const sourcePath = typeof ctx == "string" ? ctx : (_c = (_b = ctx == null ? void 0 : ctx.sourcePath) != null ? _b : (_a = this.app.workspace.getActiveFile()) == null ? void 0 : _a.path) != null ? _c : "";
        if (!info.vidFound) {
          const component = new import_obsidian2.MarkdownRenderChild(el);
          this.removeDummyBlock(el);
          import_obsidian2.MarkdownRenderer.renderMarkdown(`>[!WARNING] Cannot find video
>${info.url}`, el, sourcePath, component);
          return;
        }
        if (this.hasManyUrls(sourceLines)) {
          const component = new import_obsidian2.MarkdownRenderChild(el);
          this.removeDummyBlock(el);
          import_obsidian2.MarkdownRenderer.renderMarkdown(`>[!WARNING] Cannot accept multiple URLs yet`, el, sourcePath, component);
          return;
        }
        if (this.settings.storeInfo && !info.infoStored) {
          this.storeVideoInfo(info, el, ctx);
        }
        if (!this.settings.storeInfo && sourceLines.length > 1) {
          this.removeStoredInfo(info, el, ctx);
        }
        this.removeDummyBlock(el);
        this.createThumbnail(el, info);
      }));
      this.addCommand({
        id: "insert-thumbnail-from-clipboard",
        name: "Insert thumbnail from URL in clipboard",
        editorCallback: (editor, view) => __async(this, null, function* () {
          const clipText = yield navigator.clipboard.readText();
          const id = yield this.getVideoId(clipText);
          if (id === "") {
            new import_obsidian2.Notice("No valid video in clipboard", 2e3);
            return;
          }
          editor.replaceSelection(`\`\`\`vid
${clipText}
\`\`\``);
        })
      });
      this.addCommand({
        id: "insert-video-title-link",
        name: "Insert link with video title from URL in clipboard",
        editorCallback: (editor, view) => __async(this, null, function* () {
          const clipText = yield navigator.clipboard.readText();
          const id = yield this.getVideoId(clipText);
          if (id === "") {
            new import_obsidian2.Notice("No valid video in clipboard", 2e3);
            return;
          }
          const info = yield this.getVideoInfo(clipText);
          editor.replaceSelection(`[${info.title}](${info.url})`);
        })
      });
    });
  }
  onunload() {
    this.editorObserver.disconnect();
  }
  hasManyUrls(lines) {
    return lines.length > 1 && lines.every((e) => /^((https*:\/\/)|(www\.))+\S*$/.test(e.trim()));
  }
  createThumbnail(el, info) {
    let thumbnailUrl = info.thumbnail;
    if (this.pathIsLocal(thumbnailUrl)) {
      const file = this.app.vault.getAbstractFileByPath(thumbnailUrl);
      if (file) {
        thumbnailUrl = this.app.vault.getResourcePath(file);
      }
    }
    const container = el.createEl("a", { href: info.url });
    container.addClass("thumbnail");
    container.createEl("img", { attr: { "src": thumbnailUrl } }).addClass("thumbnail-img");
    const textBox = container.createDiv();
    textBox.addClass("thumbnail-text");
    textBox.createDiv({ text: info.title, title: info.title }).addClass("thumbnail-title");
    textBox.createEl("a", { text: info.author, href: info.authorUrl, title: info.author }).addClass("thumbnail-author");
    const timestamp = this.getTimestamp(info.url);
    if (timestamp !== "") {
      container.createDiv({ text: timestamp }).addClass("timestamp");
    }
  }
  createDummyBlock(el) {
    const container = el.createDiv();
    container.addClass("dummy-container");
  }
  removeDummyBlock(el) {
    const dummy = el.querySelector(".dummy-container");
    if (dummy) {
      el.removeChild(dummy);
    }
  }
  getTimestamp(url) {
    let tIndex = url.indexOf("?t=");
    if (tIndex === -1) {
      tIndex = url.indexOf("&t=");
    }
    if (tIndex === -1) {
      tIndex = url.indexOf("#t=");
    }
    if (tIndex === -1) {
      return "";
    }
    const search = /[?&#]t=(?:(\d+)h)*(?:(\d+)m)*(?:(\d+)s)*(\d+)*/.exec(url);
    search.shift();
    const times = search.map((v) => parseInt(v) || 0);
    let seconds = times.pop();
    if (times[2] > 59) {
      seconds = times[2];
    }
    if (seconds) {
      times[2] = seconds % 60;
      times[1] = Math.floor(seconds / 60) % 60;
      times[0] = Math.floor(seconds / 3600);
    }
    const secStr = String(times[2]).padStart(2, "0");
    let minStr = String(times[1]);
    const hrStr = String(times[0]);
    let timeStr = `${minStr}:${secStr}`;
    if (times[0]) {
      minStr = minStr.padStart(2, "0");
      timeStr = `${hrStr}:${minStr}:${secStr}`;
    }
    return timeStr;
  }
  pathIsLocal(path) {
    return path.indexOf("https://") !== 0;
  }
  parseStoredInfo(source) {
    const info = {
      url: "",
      thumbnail: "",
      title: "",
      author: "",
      authorUrl: "",
      vidFound: false,
      networkError: false,
      infoStored: false,
      imageSaved: false
    };
    const input = source.trim().split("\n");
    if (input.length !== 5) {
      return info;
    }
    const parsedInput = {
      Url: "",
      Title: "",
      Author: "",
      Thumbnail: "",
      AuthorUrl: ""
    };
    for (const [i, line] of input.entries()) {
      if (i !== 0) {
        const matches = line.match(/(\w+): (.+)/);
        if (matches === null) {
          return info;
        }
        const key = matches[1];
        const val = matches[2];
        parsedInput[key] = val;
      } else {
        parsedInput["Url"] = input[0];
      }
    }
    for (const key in parsedInput) {
      if (Object.prototype.hasOwnProperty.call(parsedInput, key)) {
        const value = parsedInput[key];
        if (!value || value === "") {
          return info;
        }
      }
    }
    info.url = parsedInput["Url"];
    info.title = parsedInput["Title"];
    info.author = parsedInput["Author"];
    info.thumbnail = parsedInput["Thumbnail"];
    info.authorUrl = parsedInput["AuthorUrl"];
    info.vidFound = true;
    if (this.pathIsLocal(info.thumbnail)) {
      const existingFile = this.app.vault.getAbstractFileByPath(info.thumbnail);
      if (existingFile) {
        info.imageSaved = true;
      } else if (this.settings.saveImages) {
        return info;
      }
      if (!this.settings.saveImages) {
        return info;
      }
    } else if (this.settings.saveImages) {
      return info;
    }
    info.infoStored = true;
    return info;
  }
  storeVideoInfo(info, el, ctx) {
    return __async(this, null, function* () {
      const section = ctx.getSectionInfo(el);
      if (!section) {
        return;
      }
      if (this.settings.saveImages && !info.imageSaved) {
        info.thumbnail = yield this.saveImage(info);
      }
      const content = `\`\`\`vid
${info.url}
Title: ${info.title}
Author: ${info.author}
Thumbnail: ${info.thumbnail}
AuthorUrl: ${info.authorUrl}
\`\`\``;
      const view = this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
      if (view) {
        const startPos = {
          line: section.lineStart,
          ch: 0
        };
        const endPos = {
          line: section.lineEnd,
          ch: view.editor.getLine(section.lineEnd).length
        };
        view.editor.replaceRange(content, startPos, endPos);
      }
    });
  }
  saveImage(info) {
    return __async(this, null, function* () {
      const id = yield this.getVideoId(info.url);
      let filePath = "";
      const currentNote = this.app.workspace.getActiveFile();
      if (this.settings.imageLocation === "specifiedFolder") {
        filePath = `${this.settings.imageFolder}/${id}.jpg`;
      } else {
        filePath = yield this.app.vault.getAvailablePathForAttachments(id, "jpg", currentNote);
        const pathRegex = /(.*) \d+\.jpg/;
        filePath = filePath.replace(pathRegex, "$1.jpg");
      }
      const existingFile = this.app.vault.getAbstractFileByPath(filePath);
      if (existingFile) {
        return existingFile.path;
      }
      const folderMatch = filePath.match(/(.+)\/.+\.jpg/);
      if (folderMatch) {
        const folderPath = folderMatch[1];
        const existingFolder = this.app.vault.getAbstractFileByPath(folderPath);
        if (this.settings.imageLocation === "specifiedFolder" && !existingFolder) {
          new import_obsidian2.Notice(`Thumbnails: The folder you specified (${this.settings.imageFolder}) does not exist.`);
          return info.thumbnail;
        }
      }
      const reqParam = {
        url: info.thumbnail
      };
      let file;
      try {
        const req = yield (0, import_obsidian2.requestUrl)(reqParam);
        if (req.status === 200) {
          file = yield this.app.vault.createBinary(filePath, req.arrayBuffer);
        } else {
        }
      } catch (error) {
        console.log(error);
        return info.thumbnail;
      }
      if (file) {
        const localUrl = file.path;
        return localUrl;
      }
      return info.thumbnail;
    });
  }
  getTrimmedResourcePath(file) {
    const path = this.app.vault.getResourcePath(file);
    const endPos = path.indexOf(".jpg") + 4;
    return path.substring(0, endPos);
  }
  removeStoredInfo(info, el, ctx) {
    const section = ctx.getSectionInfo(el);
    if (!section) {
      return;
    }
    const content = `\`\`\`vid
${info.url}
\`\`\``;
    const view = this.app.workspace.getActiveViewOfType(import_obsidian2.MarkdownView);
    if (view) {
      const startPos = {
        line: section.lineStart,
        ch: 0
      };
      const endPos = {
        line: section.lineEnd,
        ch: view.editor.getLine(section.lineEnd).length
      };
      view.editor.replaceRange(content, startPos, endPos);
    }
  }
  getVideoInfo(url) {
    return __async(this, null, function* () {
      const info = {
        url,
        thumbnail: "",
        title: "",
        author: "",
        authorUrl: "",
        vidFound: false,
        networkError: false,
        infoStored: false,
        imageSaved: false
      };
      let reqUrl = "";
      let isYoutube = false;
      for (const type of URL_TYPES.youtube) {
        if (url.includes(type.match)) {
          isYoutube = true;
        }
      }
      let isVimeo = false;
      for (const type of URL_TYPES.vimeo) {
        if (url.includes(type.match)) {
          isVimeo = true;
        }
      }
      if (isYoutube) {
        reqUrl = `https://www.youtube.com/oembed?format=json&url=${url}`;
      } else if (isVimeo) {
        reqUrl = `https://vimeo.com/api/oembed.json?url=${url}`;
      } else {
        return info;
      }
      try {
        const reqParam = {
          url: reqUrl,
          throw: false
        };
        const res = yield (0, import_obsidian2.requestUrl)(reqParam);
        if (res.status === 200) {
          info.title = res.json.title;
          info.author = res.json.author_name;
          info.authorUrl = res.json.author_url;
          info.vidFound = true;
        } else if (this.settings.youtubeApiKey && isYoutube) {
          console.log("Thumbnails: Oembed failed, using YouTube API");
          const videoId = yield this.getVideoId(url);
          const youtubeUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${this.settings.youtubeApiKey}`;
          const youtubeReqParam = {
            url: youtubeUrl,
            throw: false
          };
          const youtubeApiRes = yield (0, import_obsidian2.requestUrl)(youtubeReqParam);
          if (youtubeApiRes.status === 200) {
            const vidSnippet = youtubeApiRes.json.items[0].snippet;
            info.authorUrl = "javascript:void(0)";
            const channelQueryUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${vidSnippet.channelId}&key=${this.settings.youtubeApiKey}`;
            const channelQueryParam = {
              url: channelQueryUrl,
              throw: false
            };
            const channelQueryRes = yield (0, import_obsidian2.requestUrl)(channelQueryParam);
            if (channelQueryRes.status === 200) {
              const channelSnippet = channelQueryRes.json.items[0].snippet;
              const channelCustomUrl = channelSnippet.customUrl;
              const channelUrl = `https://www.youtube.com/${channelCustomUrl}`;
              info.authorUrl = channelUrl;
            }
            info.title = vidSnippet.title;
            info.author = vidSnippet.channelTitle;
            info.vidFound = true;
          }
        }
        if (info.vidFound) {
          if (isYoutube) {
            const videoId = yield this.getVideoId(url);
            info.thumbnail = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;
          } else {
            info.thumbnail = res.json.thumbnail_url;
          }
        }
      } catch (error) {
        console.error(error);
        info.networkError = true;
      }
      return info;
    });
  }
  getVideoId(url) {
    return __async(this, null, function* () {
      let id = "";
      for (const type of URL_TYPES.youtube) {
        if (url.includes(type.match)) {
          const matches = url.match(type.idPattern);
          if (matches !== null) {
            id = matches[1];
          }
        }
      }
      const vimeoType = URL_TYPES.vimeo[0];
      if (url.includes(vimeoType.match)) {
        const matches = url.match(vimeoType.idPattern);
        if (matches !== null) {
          id = matches[1];
          if (!/^[0-9]+$/.exec(id)) {
            id = yield this.fetchVimeoVideoId(url);
          }
        }
      }
      return id;
    });
  }
  fetchVimeoVideoId(url) {
    return __async(this, null, function* () {
      let id = "";
      try {
        const reqParam = {
          url: `https://vimeo.com/api/oembed.json?url=${url}`
        };
        const res = yield (0, import_obsidian2.requestUrl)(reqParam);
        if (res.status === 200 && res.json.video_id) {
          id = res.json.video_id.toString();
        }
      } catch (error) {
        console.error(error);
      }
      return id;
    });
  }
};

/* nosourcemap */