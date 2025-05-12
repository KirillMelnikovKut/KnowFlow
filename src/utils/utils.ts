import { marked } from "marked";

export const convertToHtml = (markdown: string) => marked(markdown);