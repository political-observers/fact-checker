/*
THIS IS A GENERATED/BUNDLED FILE BY ROLLUP
if you want to view the source visit the plugins github repository
*/

'use strict';

var obsidian = require('obsidian');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const labeledRegex = /^[ \t]*date:(.+?)(?:^[ \t]*title:(.+?))?(?:^[ \t]*content:(.+?))?(?=^[ \t]*date:)/gimsu;
const timelineLabeledParser = (source) => {
    source += "\ndate: ";
    let sourceMatch;
    const parsed = [];
    while ((sourceMatch = labeledRegex.exec(source)) !== null) {
        parsed.push({
            time: sourceMatch[1],
            title: sourceMatch[2],
            description: sourceMatch[3]
        });
    }
    return parsed;
};
const timelineParser = (source) => {
    const sourceSplitted = source.split(/^\s*\+ ?/gm).slice(1);
    sourceSplitted.push("", "");
    const parsed = [];
    const counter = sourceSplitted.length - (sourceSplitted.length % 3);
    for (let i = 0; i < counter; i += 3) {
        parsed.push({
            time: sourceSplitted[i],
            title: sourceSplitted[i + 1],
            description: sourceSplitted[i + 2]
        });
    }
    return parsed;
};
const toExport = [
    { tag: "timeline", parser: timelineParser },
    { tag: "timeline-labeled", parser: timelineLabeledParser },
];

class TimelineElement {
    constructor(root, sourcePath) {
        this.addEvent = (info) => {
            Object.entries(info).map(([key, val]) => {
                const element = this.root.createDiv({ cls: key });
                const text = val;
                obsidian.MarkdownRenderer.renderMarkdown(text, element, this.sourcePath, null);
                return [key, element];
            });
        };
        this.getElement = () => this.root;
        this.root = root.createDiv({ cls: 'timeline' });
        this.sourcePath = sourcePath;
    }
}

const classRegex = /(?<=^\s*)\[.+?\]/gs;
const toClassArray = (input) => {
    input = input.trim();
    if (input[0] != "[" || input[input.length - 1] != "]")
        return [];
    return input
        .substring(1, input.length - 1)
        .trim()
        .split(/\s*,\s*/);
};
class TimelinePlugin extends obsidian.Plugin {
    constructor() {
        super(...arguments);
        this.onload = () => __awaiter(this, void 0, void 0, function* () {
            toExport.forEach(({ tag, parser }) => {
                this.registerMarkdownCodeBlockProcessor(tag, (source, root, ctx) => {
                    const timelineElement = new TimelineElement(root, ctx.sourcePath);
                    const el = timelineElement.getElement();
                    el.addClass("timeline");
                    const classMatch = source.match(classRegex);
                    if (classMatch !== null) {
                        const classes = toClassArray(classMatch[0]);
                        el.addClasses(classes);
                    }
                    const events = parser(source);
                    events.forEach(e => timelineElement.addEvent(e));
                });
            });
            console.log("timeline load");
        });
        this.onunload = () => __awaiter(this, void 0, void 0, function* () {
            console.log("timeline onunload");
        });
    }
}

module.exports = TimelinePlugin;


/* nosourcemap */