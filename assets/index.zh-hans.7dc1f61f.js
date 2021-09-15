export default"# 序列化器\n\n序列化器用于将 UI 元素转换为 markdown 字符串.\n\n## 转换步骤\n\n整个转换过程几乎与解析器相反。\n\n1. 对于每一个当前的 UI 状态，都有一个对应的 prosemirror 节点树能够表示它。\n2. 这个 prosemirror 节点树将会被序列化器遍历。Milkdown 序列化器通过 node 和 mark 的定义生成。Milkdown 序列化器会把一个 prosemirror 节点树转换为一个 remark AST。\n3. 这个 remark AST 将会被传入 [remark-stringify](https://github.com/remarkjs/remark/tree/main/packages/remark-stringify) 来转换为 markdown 字符串。\n\n## 例子\n\n对于每一个 node/mark，都需要定义一个序列化器声明，它有以下结构：\n\n```typescript\nimport { nodeFactory } from '@milkdown/core';\n\nconst MyNode = nodeFactory({\n    // other props...\n    serializer = {\n        match: (node) => node.type.name === 'my-node',\n        runner: (state, node) => {\n            state.openNode('my-node').next(node.content).closeNode();\n        },\n    },\n});\n```\n\n## 序列化器声明\n\n序列化器声明有 2 个属性：\n\n-   _match_: 匹配需要当前 runner 处理的目标 remark 节点。\n\n-   _runner_:\n\n    -   Node runner:\n        函数将 prosemirror node 转换到 remark AST，他有 2 个参数：\n\n        -   _state_: 用于生成 remark AST 的工具。\n        -   _node_: 当前 runner 要处理的 prosemirror node。\n\n    -   Mark runner:\n        函数将 prosemirror mark 转换到 remark AST，他有 3 个参数：\n\n        -   _state_: 用于生成 remark AST 的工具。\n        -   _mark_: 当前 runner 要处理的 prosemirror mark。\n        -   _node_: 含有当前 mark 的 node。\n\n        > 如果 mark 的 runner 的返回值为 `true` 而不是`undefined` 或 `null`，\n        > 那么拥有这个 mark 的 node 也将由当前 runner 处理，而不会交给序列化器的其它部分。\n\n## 序列化器 state\n\n序列化器的 state 被用于生成 remark AST，\n它提供了许多有用的方法来让转换变得十分简单。\n\n### openNode & closeNode\n\n`openNode` 方法用于打开一个 remark 节点，在这之后创建的所有节点都将是被打开的 node 的子节点，直到调用`closeNode`。\n\n你可以将 `openNode` 想象为左括号，那么 `closeNode` 就是右括号。 对于有子节点的情况，你的解析器应该尽量只处理当前节点本身，然后让子节点自己的序列化器来处理它自己。\n\n参数：\n\n-   _type_: 节点 的 type 属性。\n-   _value_: 节点 的 value 属性。\n-   _props_: 节点的其它属性。\n\n这里的 props 会被展开，例如：\n\n```typescript\nopenNode('my-node', undefined, { foo: true, bar: 0 });\n// will generate:\nconst generatedCode = {\n    type: 'my-node',\n    foo: true,\n    bar: 0,\n    children: [\n        /* some children */\n    ],\n};\n```\n\n### addNode\n\n`addNode` 意味着直接添加节点而不打开或关闭它，一般用于没有子节点或需要手动处理子节点的情况。\n\n参数：\n\n-   _type_: 节点 的 type 属性。\n-   _value_: 节点 的 value 属性。\n-   _props_: 节点的其它属性。\n-   _children_: 节点的子节点，是一个节点数组。\n\n### next\n\n`next` 将节点或节点列表传回给 state，state 会找到合适的 runner（通过检查每个 node/mark 的`match`属性）来处理它。\n\n### withMark\n\n`withMark` 用于，当前节点包括 mark 时，序列化将会自动将当前节点的 mark 和相邻节点的 mark 进行合并。\n\nParameters:\n\n-   _mark_: 当前节点的 prosemirror mark。\n-   _type_: 节点 的 type 属性。\n-   _value_: 节点 的 value 属性。\n-   _props_: 节点的其它属性。\n";
