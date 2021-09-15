export default"# Writing Theme Plugins\n\nIn the world of milkdown, themes are also plugins. We provide a `themeFactory` helper for users to create plugins.\n\n> We use [@emotion/css](https://www.npmjs.com/package/@emotion/css) package to define styles.\n\n## Overview\n\n```typescript\nimport { themeFactory } from '@milkdown/core';\n\nconst customTheme = themeFactory({\n    font: {\n        typography: ['Roboto', 'Helvetica', 'Arial'],\n        code: ['Monaco', 'Fira Code'],\n    },\n    size: {\n        radius: '2px',\n        lineWidth: '1px',\n    },\n    color: {\n        primary: '#ff79c6',\n        secondary: '#bd93f9',\n        neutral: '#000',\n        background: '#fff',\n    },\n});\n```\n\n---\n\n## Properties\n\n### font\n\nFont defines the font in editor.\n\n-   typography\n    The font in text block, such as heading, paragraph and blockquote.\n\n-   code\n    The font in code block, such as code fence and inline code.\n\n### size\n\n-   radius\n    The size of border radius.\n\n-   lineWidth\n    Width of line in code editor, such as border and divider.\n\n### color\n\nColor palette in editor.\n\n-   primary\n    Primary color of editor. Used in large color block, such as the color bar of blockquote.\n-   secondary\n    Secondary color of editor. Used in tips area, such as link.\n-   solid\n    Color of widgets such as buttons and inputs.\n-   shadow\n    Color of shadow.\n-   line\n    Color of line.\n-   surface\n    Color of editor background.\n-   background\n    Color of other area's background, such as background of code fence and math block.\n\n### mixin\n\nMixin defines some style shortcuts for other plugins to reuse them.\n\n-   scrollbar\n    Style of scrollbar.\n-   shadow\n    Style of shadow.\n-   border\n    Style of border.\n\n### slots\n\nSlots defines not only style, but also dom elements.\n\n-   icon\n    Define how to implement icon for different icon ids.\n\nIcon ids need to be implemented:\n\n| Type      | Ids                                           |\n| --------- | --------------------------------------------- |\n| Paragraph | h1, h2, h3, quote, code, table, divider       |\n| Image     | image, brokenImage                            |\n| List      | bulletList, orderedList, taskList             |\n| Arrow     | leftArrow, rightArrow, upArrow, downArrow     |\n| Align     | alignLeft, alignRight, alignCenter            |\n| Edit      | delete, select                                |\n| Mark      | bold, italic, inlineCode, strikeThrough, link |\n| Status    | checked, unchecked, loading                   |\n\n### global\n\nInject global style for editor.\n\n## Example: NES Theme\n\n!CodeSandBox{milkdown-theme-nes-b0zmy?fontsize=14&hidenavigation=1&theme=dark&view=preview}\n";
